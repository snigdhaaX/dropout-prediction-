const FacultyDashboard = ({ students, onSelectStudent }) => {
    const [filterDept, setFilterDept] = useState("All");
    const [filterRisk, setFilterRisk] = useState("All");
    const [search, setSearch] = useState("");

    const processed = useMemo(() => {
        return students
            .map(s => ({ ...s, risk: calculateRiskScore(s) }))
            .filter(s => filterDept === "All" || s.dept === filterDept)
            .filter(s => filterRisk === "All" || s.risk.level === filterRisk)
            .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => b.risk.score - a.risk.score);
    }, [students, filterDept, filterRisk, search]);

    return (
        <div className="p-6 animate-page max-w-7xl mx-auto">
            <HeaderUnderline title="Student Risk Monitor" />

            <div className="flex flex-wrap gap-4 mb-6 items-center w-full pl-4">
                <div className="relative flex-1 min-w-[250px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text" placeholder="Search by name or ID..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full bg-[#0B0B0C]/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA14A]/50 transition-colors backdrop-blur-md"
                    />
                </div>

                <div className="flex gap-2">
                    {["All", "HIGH", "MODERATE", "SAFE"].map(r => (
                        <button key={r} onClick={() => setFilterRisk(r)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filterRisk === r ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                {r !== "All" && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getLevelColor(r) }}></div>}
                                {r === "All" ? "All Risks" : r}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <Card tier={2} className="p-0 overflow-hidden ml-4">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/5 text-gray-400 text-sm">
                                <th className="p-4 font-semibold w-12 text-center">#</th>
                                <th className="p-4 font-semibold">Student</th>
                                <th className="p-4 font-semibold">Dept</th>
                                <th className="p-4 font-semibold text-center">Sem</th>
                                <th className="p-4 font-semibold text-center">Risk Score ⬇</th>
                                <th className="p-4 font-semibold">Risk Level</th>
                                <th className="p-4 font-semibold text-center">Trend</th>
                                <th className="p-4 font-semibold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processed.map((s, idx) => {
                                const isHigh = s.risk.level === "HIGH";
                                const isSafe = s.risk.level === "SAFE";
                                return (
                                    <tr key={s.id} className={`border-b border-white/5 smart-table-row risk-${s.risk.level.toLowerCase()}`}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateX(3px)';
      e.currentTarget.style.transition = 'all 0.2s ease';
      e.currentTarget.style.background = 'rgba(191,161,74,0.04)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateX(0px)';
      e.currentTarget.style.background = 'transparent';
    }}
  >
                                        <td className="p-4 text-center text-gray-500">{idx + 1}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-[#0B0B0C]"
                                                    style={{ border: `2px solid ${isSafe ? 'rgba(191,161,74,0.26)' : getLevelColor(s.risk.level)}`, color: getLevelColor(s.risk.level) }}>
                                                    {s.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="font-bold">{s.name}</div>
                                                    <div className="text-xs text-gray-500">{s.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-300">{s.dept}</td>
                                        <td className="p-4 text-center text-gray-300">{s.sem}</td>
                                        <td className="p-4 text-center">
                                            <div className="inline-block px-3 py-1 rounded-full risk-cell font-bold"
                                                style={{ backgroundColor: isSafe ? 'rgba(191,161,74,0.18)' : `${getLevelColor(s.risk.level)}20`, color: getLevelColor(s.risk.level) }}>
                                                {s.risk.score}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${isHigh ? 'risk-pulse' : ''}`}
                                                style={{ borderColor: isSafe ? 'rgba(191,161,74,0.24)' : getLevelColor(s.risk.level), color: getLevelColor(s.risk.level), backgroundColor: isSafe ? 'rgba(191,161,74,0.08)' : `${getLevelColor(s.risk.level)}10` }}>
                                                {s.risk.level}
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            {s.risk.trend === 'declining' && <TrendingDown className="w-5 h-5 mx-auto text-red-500" />}
                                            {s.risk.trend === 'improving' && <TrendingUp className="w-5 h-5 mx-auto text-[#BFA14A]" />}
                                            {s.risk.trend === 'stable' && <Minus className="w-5 h-5 mx-auto text-gray-400" />}
                                            {s.risk.trend === 'mixed' && <Activity className="w-5 h-5 mx-auto text-amber-500" />}
                                        </td>
                                        <td className="p-4 text-center align-middle">
                                            <button
                                                onClick={() => onSelectStudent(s)}
                                                onMouseEnter={e => {   e.currentTarget.style.transform = 'translateY(-2px)';   e.currentTarget.style.transition = 'all 0.25s ease';   e.currentTarget.style.boxShadow = '0 6px 18px rgba(191,161,74,0.16)'; }} onMouseLeave={e => {   e.currentTarget.style.transform = 'translateY(0px)';   e.currentTarget.style.boxShadow = 'none'; }} className="action-btn px-4 py-1.5 btn-gradient rounded-lg text-sm font-bold text-white shadow-md mx-auto inline-block opacity-0 transition-opacity"
                                            >
                                                View Profile
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Footer />
        </div>
    );
};

const StudentDetail = ({ student, onBack, onInterventionReq, setCounselingToast, skeletonLoading, displayScore, showToast }) => {
    
    const risk = useMemo(() => calculateRiskScore(student), [student]);
    const color = getLevelColor(risk.level);
    const isHigh = risk.level === "HIGH";
    const isSafe = risk.level === "SAFE";

    const [scoreDisplay, setScoreDisplay] = useState(0);

    useEffect(() => {
        let timer1 = setTimeout(() => setLoading(false), 1000);

        let start = 0;
        const end = risk.score;
        const duration = 1500;
        const incrementTime = Math.max(10, Math.floor(duration / end));

        let counter = setInterval(() => {
            start += 1;
            setScoreDisplay(current => {
                if (current >= end) {
                    clearInterval(counter);
                    return end;
                }
                return current + 1;
            });
        }, incrementTime);

        return () => {
            clearTimeout(timer1);
            clearInterval(counter);
        };
    }, [risk.score]);

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = skeletonLoading ? circumference : circumference - (displayScore / 100) * circumference;

    const shapData = [
        { factor: 'Attendance', value: risk.breakdown.attendance, type: 'risk' },
        { factor: 'Recent Marks', value: risk.breakdown.marks, type: 'risk' },
        { factor: 'LMS Inactivity', value: risk.breakdown.lms, type: 'risk' },
        { factor: 'Assignments', value: risk.breakdown.assignments, type: 'risk' },
        { factor: 'Behavior', value: risk.breakdown.behavior, type: 'risk' },
        { factor: 'Co-curriculars', value: -risk.breakdown.competitions, type: 'safe' }
    ].filter(d => d.value !== 0).sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

    const attData = student.attendance.map((v, i) => ({ week: `W${i + 1}`, val: v }));
    const marksData = student.marks.map((v, i) => ({ test: `T${i + 1}`, val: v }));

    return (
        <div className="p-6 animate-page max-w-7xl mx-auto pb-20">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5" /> Back to Students
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 relative">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-3xl bg-[#0B0B0C] shadow-2xl relative"
                        style={{ border: `3px solid ${isSafe ? 'rgba(191,161,74,0.26)' : color}`, color: color }}>
                        {student.name.split(' ').map(n => n[0]).join('')}
                        {isHigh && <div className="absolute inset-0 rounded-full blur-md opacity-50" style={{ backgroundColor: color }}></div>}
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold mb-2 tracking-tight flex items-center">{student.name}</h1>
                        <div className="flex gap-3 text-sm">
                            <span className="text-gray-400">ID: <span className="text-white font-medium">{student.id}</span></span>
                            <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300 font-medium">{student.dept}</span>
                            <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300 font-medium">Sem {student.sem}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-end gap-6 ml-auto">
                    <div className="text-right">
                        <div className="text-sm text-gray-400 mb-1">Faculty Advisor</div>
                        <div className="font-semibold">{student.facultyAdvisor}</div>
                        <div className="text-xs text-gray-500 mt-1">Prev GPA: {student.prevGPA}</div>
                    </div>

                    <div className={`px-6 py-3 rounded-2xl border-2 shadow-lg flex items-center justify-center font-extrabold text-xl tracking-wider ${isHigh ? 'risk-pulse' : ''}`}
                        style={{ borderColor: isSafe ? 'rgba(191,161,74,0.24)' : color, color: color, backgroundColor: isSafe ? 'rgba(191,161,74,0.10)' : `${color}15`, textShadow: isSafe ? 'none' : `0 0 10px ${color}` }}>
                        {risk.level} RISK
                    </div>
                </div>
            </div>

            <HeaderUnderline title="Risk Intelligence" />

            {loading ? (
                <div className="h-[400px] rounded-2xl w-full shimmer-loading mb-8 border border-white/5"></div>
            ) : (
                <>
                    <div className="flex flex-col lg:flex-row gap-6 mb-8">
                        <Card tier={3} delay={0.1} className="w-full lg:w-1/3 flex flex-col items-center justify-center py-8 relative overflow-hidden">
                            {isHigh && <div className="risk-meter-glow-high"></div>}
                            {isSafe && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(191,161,74,0.13)_0%,transparent_70%)] pointer-events-none"></div>}

                            <div className={`relative w-48 h-48 flex items-center justify-center ${isHigh ? 'risk-vibrate' : ''}`}>
                                <svg width="200" height="200" className="absolute -rotate-90 transform">
                                    <circle cx="100" cy="100" r={radius} fill="none" stroke="#1E2A3A" strokeWidth="12" />
                                    <circle
                                        cx="100" cy="100" r={radius} fill="none"
                                        stroke={color} strokeWidth="12" strokeLinecap="round"
                                        strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                                        style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                                    />
                                </svg>
                                <div className="text-center">
                                    <div className="text-5xl font-black" style={{ color: color, textShadow: isHigh ? `0 0 15px ${color}` : 'none' }}>
                                        {displayScore}
                                    </div>
                                    <div className="text-sm text-gray-400 font-bold tracking-widest uppercase mt-1">Score</div>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <div className="text-xl font-bold mb-2" style={{ color: color }}>{risk.level}</div>
                                <div className="text-sm text-gray-400 px-4">
                                    Multi-dimensional analysis based on attendance, academics, behavior, and engagement.
                                </div>
                            </div>
                        </Card>

                        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card tier={2} delay={0.2} className="h-48 flex flex-col">
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">Attendance Trend</h3>
                                <div className="flex-1 -ml-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={attData}>
                                            <CartesianGrid stroke="#1E2A3A" strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="week" stroke="#4A5568" tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                            <RechartsTooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="val" stroke="#BFA14A" strokeWidth={3} dot={{ r: 4, fill: '#BFA14A', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            <Card tier={2} delay={0.3} className="h-48 flex flex-col">
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">Academic Performance</h3>
                                <div className="flex-1 -ml-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={marksData}>
                                            <CartesianGrid stroke="#1E2A3A" strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="test" stroke="#4A5568" tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                            <RechartsTooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="val" stroke={risk.breakdown.marks > 10 ? '#EF4444' : '#BFA14A'} strokeWidth={3} dot={{ r: 4 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            <Card tier={2} delay={0.4} className="h-40 flex flex-col justify-center text-center">
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">LMS Engagement</h3>
                                <div className="text-3xl font-bold text-white">
                                    {Math.round((student.lmsLogins[3] + student.lmsLogins[4]) / 2)}
                                    <span className="text-sm text-gray-500 font-normal ml-2">logins/week</span>
                                </div>
                            </Card>

                            <Card tier={2} delay={0.5} className="h-40 flex flex-col justify-center text-center">
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">Behavior & Delays</h3>
                                <div className="flex justify-around items-center w-full px-4 mt-2">
                                    <div>
                                        <div className="text-2xl font-bold text-amber-500">{student.assignmentDelays}</div>
                                        <div className="text-xs text-gray-500">Late Subs</div>
                                    </div>
                                    <div className="w-px h-10 bg-white/10"></div>
                                    <div>
                                        <div className="text-2xl font-bold text-red-500">{student.behaviorIncidents}</div>
                                        <div className="text-xs text-gray-500">Incidents</div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    <Card tier={3} delay={0.6} className="w-full mb-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">🧠 Why This Risk Score?</h3>
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="w-full lg:w-1/2 h-64 animate-chart">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={shapData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                                        <CartesianGrid stroke="#1E2A3A" strokeDasharray="3 3" horizontal={true} vertical={false} />
                                        <XAxis type="number" stroke="#4A5568" tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                        <YAxis dataKey="factor" type="category" stroke="#4A5568" width={120} tick={{ fill: '#D1D5DB', fontSize: 11 }} axisLine={false} tickLine={false} />
                                        <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                            {shapData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.type === 'risk' ? '#EF4444' : '#BFA14A'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 pr-4">
                                {shapData.map((d, i) => (
                                    <div key={i} className="flex items-start gap-3 animate-fade-up" style={{ animationDelay: `${0.7 + i * 0.1}s` }}>
                                        <div className="mt-0.5">
                                            {d.type === 'risk' ? <TrendingDown className="w-5 h-5 text-red-500" /> : <TrendingUp className="w-5 h-5 text-[#BFA14A]" />}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{d.factor}</div>
                                            <div className="text-xs text-gray-400">
                                                {d.value > 0 ? `Contributes +${d.value} pts to risk score` : `Reduces risk score by ${Math.abs(d.value)} pts`}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* NEW WAVE 1 PANELS */}

                    {/* Panel A: Financial Risk Index */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: 20, padding: 24, marginBottom: 24 }}>
                        <div style={{ fontFamily: 'Syne', fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>💰 Financial Risk Index</div>
                        <div style={{ height: 2, borderRadius: 1, background: 'linear-gradient(90deg, #BFA14A, transparent)', width: 0, animation: 'expandLine 1s 0.2s ease forwards', marginBottom: 24 }}></div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                            <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.05)', paddingRight: 16 }}>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Fee Status</div>
                                <span style={{
                                    background: student.financial.feeStatus === "Paid" ? 'rgba(16,185,129,0.12)' : student.financial.feeStatus === "Pending" ? 'rgba(239,68,68,0.12)' : 'rgba(191,161,74,0.12)',
                                    border: `1px solid ${student.financial.feeStatus === "Paid" ? 'rgba(16,185,129,0.3)' : student.financial.feeStatus === "Pending" ? 'rgba(239,68,68,0.3)' : 'rgba(191,161,74,0.3)'}`,
                                    color: student.financial.feeStatus === "Paid" ? '#10B981' : student.financial.feeStatus === "Pending" ? '#EF4444' : '#BFA14A',
                                    borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 500, display: 'inline-block'
                                }}>
                                    {student.financial.feeStatus}
                                </span>
                            </div>
                            <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.05)', paddingRight: 16 }}>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Financial Vulnerability</div>
                                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, width: '100%', marginBottom: 4 }}>
                                    <div style={{
                                        height: 6, borderRadius: 3, width: `${student.financial.vulnerabilityScore}%`,
                                        background: student.financial.vulnerabilityScore <= 30 ? '#10B981' : student.financial.vulnerabilityScore <= 60 ? '#F59E0B' : '#EF4444',
                                        transition: 'width 1s ease 0.3s'
                                    }}></div>
                                </div>
                                <div style={{ textAlign: 'right', fontSize: 13, color: student.financial.vulnerabilityScore <= 30 ? '#10B981' : student.financial.vulnerabilityScore <= 60 ? '#F59E0B' : '#EF4444' }}>
                                    {student.financial.vulnerabilityScore}
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Scholarship Status</div>
                                {student.financial.scholarshipEligible ? (
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10B981', fontSize: 13 }}><CheckCircle2 size={14} color="#10B981" /> Eligible</div>
                                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{student.financial.scholarshipType}</div>
                                    </div>
                                ) : (
                                    <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>Not Eligible</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Panel B: Socio-Economic Profile */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: 20, padding: 24, marginBottom: 24 }}>
                        <div style={{ fontFamily: 'Syne', fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>🏘️ Socio-Economic Profile</div>
                        <div style={{ height: 2, borderRadius: 1, background: 'linear-gradient(90deg, #BFA14A, transparent)', width: 0, animation: 'expandLine 1s 0.2s ease forwards', marginBottom: 24 }}></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Wallet size={16} />
                                <div>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Parent Income</div>
                                    <div style={{
                                        fontSize: 13,
                                        color: student.socioEconomic.parentIncomeBracket === "Below 1L" ? '#EF4444' : student.socioEconomic.parentIncomeBracket === "1L-3L" ? '#F59E0B' : student.socioEconomic.parentIncomeBracket === "3L-6L" ? 'rgba(255,255,255,0.7)' : '#10B981'
                                    }}>{student.socioEconomic.parentIncomeBracket}</div>
                                </div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <MapPin size={16} />
                                <div>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Location</div>
                                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
                                        {student.socioEconomic.location === "Rural" && <span style={{ width: 6, height: 6, borderRadius: 3, background: '#F59E0B', display: 'inline-block', marginRight: 6 }}></span>}
                                        {student.socioEconomic.location}
                                    </div>
                                </div>
                            </div>
                            {student.socioEconomic.firstGenerationLearner ? (
                                <div style={{ gridColumn: 'span 2', background: 'rgba(191,161,74,0.07)', border: '1px solid rgba(191,161,74,0.20)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <Star size={16} color="#BFA14A" />
                                    <div>
                                        <div style={{ color: '#BFA14A', fontWeight: 600, fontSize: 13 }}>First-Generation Learner</div>
                                        <div style={{ fontSize: 11, color: 'rgba(191,161,74,0.45)' }}>Eligible for additional institutional support</div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <Users size={16} color="rgba(255,255,255,0.3)" />
                                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Standard Enrollment</div>
                                </div>
                            )}
                            {student.socioEconomic.genderRiskFlag && (
                                <div style={{ gridColumn: student.socioEconomic.firstGenerationLearner ? 'span 1' : 'span 1', background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.2)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <Shield size={16} color="#F472B6" />
                                    <div>
                                        <div style={{ color: '#F472B6', fontSize: 13 }}>Gender Equity Flag</div>
                                        <div style={{ fontSize: 11, color: 'rgba(244,114,182,0.6)' }}>Support resources available</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Panel C: Dropout Risk Prediction */}
                    <div style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: `1px solid ${isHigh ? 'rgba(239,68,68,0.25)' : risk.level === "MODERATE" ? 'rgba(245,158,11,0.2)' : 'rgba(191,161,74,0.15)'}`,
                        backdropFilter: 'blur(20px)', borderRadius: 20, padding: 24, marginBottom: 24
                    }}>
                        <div style={{ fontFamily: 'Syne', fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>⏱️ Dropout Risk Prediction</div>
                        <div style={{ height: 2, borderRadius: 1, background: 'linear-gradient(90deg, #BFA14A, transparent)', width: 0, animation: 'expandLine 1s 0.2s ease forwards', marginBottom: 24 }}></div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                            <div style={{ flex: '0 0 60%' }}>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Projected Dropout Risk Window</div>
                                <div style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 700, color: color }}>
                                    {student.dropoutRiskWindow}
                                </div>
                                <div style={{
                                    fontSize: 12, marginTop: 4,
                                    color: isHigh ? 'rgba(239,68,68,0.8)' : risk.level === "MODERATE" ? 'rgba(245,158,11,0.8)' : 'rgba(191,161,74,0.8)'
                                }}>
                                    {isHigh ? '⚠ Immediate intervention required' : risk.level === "MODERATE" ? '↑ Monitoring escalation recommended' : '✓ Student trajectory is stable'}
                                </div>
                                <div style={{ marginTop: 16 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                                        <span>Now</span>
                                        <span>12 months</span>
                                    </div>
                                    <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, position: 'relative', marginTop: 4 }}>
                                        <div style={{
                                            height: 4, borderRadius: 2, background: color, position: 'absolute', left: 0,
                                            width: student.dropoutRiskWindow === "1–3 Months" ? '20%' : student.dropoutRiskWindow === "3–6 Months" ? '40%' : student.dropoutRiskWindow === "6–12 Months" ? '70%' : '0%',
                                            transition: 'width 1s ease 0.4s'
                                        }}></div>
                                        <div style={{
                                            width: 10, height: 10, borderRadius: 5, background: color, position: 'absolute', top: -3,
                                            left: student.dropoutRiskWindow === "1–3 Months" ? '20%' : student.dropoutRiskWindow === "3–6 Months" ? '40%' : student.dropoutRiskWindow === "6–12 Months" ? '70%' : '0%',
                                            boxShadow: isSafe ? 'none' : `0 0 8px ${color}`
                                        }}></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ flex: '0 0 40%' }}>
                                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Confidence Level</div>
                                    <div style={{ fontFamily: 'Syne', fontSize: 32, fontWeight: 700, color: color }}>
                                        {isHigh ? '87%' : risk.level === "MODERATE" ? '71%' : '94%'}
                                    </div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>Model accuracy</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>Based on 6-dimension analysis</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel D: Mental Health & Wellbeing */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: 20, padding: 24, marginBottom: 24 }}>
                        <div style={{ fontFamily: 'Syne', fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>🧠 Mental Health & Wellbeing</div>
                        <div style={{ height: 2, borderRadius: 1, background: 'linear-gradient(90deg, #BFA14A, transparent)', width: 0, animation: 'expandLine 1s 0.2s ease forwards', marginBottom: 24 }}></div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                            <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 12, textAlign: 'center' }}>Behavioral Stress Index</div>
                                <svg viewBox="0 0 80 80" width="80" height="80">
                                    <circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
                                    <circle cx="40" cy="40" r="30"
                                        stroke={student.mentalHealth.behavioralStressIndex <= 30 ? '#10B981' : student.mentalHealth.behavioralStressIndex <= 60 ? '#F59E0B' : '#EF4444'}
                                        strokeWidth="6" fill="none" strokeDasharray="188"
                                        strokeDashoffset={188 - (student.mentalHealth.behavioralStressIndex / 100 * 188)}
                                        strokeLinecap="round" transform="rotate(-90)" transformOrigin="center"
                                        style={{ transition: 'stroke-dashoffset 1.2s ease 0.2s' }} />
                                    <text x="40" y="45" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">{student.mentalHealth.behavioralStressIndex}</text>
                                </svg>
                                <div style={{
                                    padding: '3px 10px', borderRadius: 12, fontSize: 11, textAlign: 'center', marginTop: 8,
                                    background: student.mentalHealth.stressCategory === "Low" ? 'rgba(16,185,129,0.12)' : student.mentalHealth.stressCategory === "Moderate" ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
                                    color: student.mentalHealth.stressCategory === "Low" ? '#10B981' : student.mentalHealth.stressCategory === "Moderate" ? '#F59E0B' : '#EF4444'
                                }}>
                                    {student.mentalHealth.stressCategory}
                                </div>
                            </div>
                            <div style={{ flex: '0 0 60%' }}>
                                {student.mentalHealth.counselingRecommended ? (
                                    <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 12, padding: 16 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <Bell size={14} color="#F59E0B" />
                                            <div style={{ fontSize: 13, fontWeight: 600, color: '#F59E0B' }}>Counseling Recommended</div>
                                        </div>
                                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginTop: 8 }}>
                                            Student exhibits elevated stress indicators. A counseling session is recommended within the next 2 weeks.
                                        </div>
                                        <button
                                            onClick={() => {
                                                showToast('✓ Counseling referral logged');
                                            }}
                                            style={{ marginTop: 12, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B', borderRadius: 8, padding: '8px 16px', fontSize: 12, cursor: 'pointer', transition: 'background 0.2s ease' }}
                                            onMouseOver={(e) => e.target.style.background = 'rgba(245,158,11,0.25)'}
                                            onMouseOut={(e) => e.target.style.background = 'rgba(245,158,11,0.15)'}
                                        >
                                            Schedule Counseling
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: 12, padding: 16 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <CheckCircle2 size={14} color="#10B981" />
                                            <div style={{ fontSize: 13, color: '#10B981' }}>No Immediate Concern</div>
                                        </div>
                                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
                                            Behavioral indicators are within normal range. Continue standard monitoring.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 relative">
                        <HeaderUnderline title="⚡ Active Interventions" />
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                            {isHigh ? (
                                <>
                                    <Card tier={2} delay={0.7} className="min-w-[280px] snap-center border-l-4 border-l-red-500 flex-shrink-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                                <Users className="w-5 h-5 text-red-500" />
                                            </div>
                                            <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold">URGENT</span>
                                        </div>
                                        <div className="font-bold text-lg mb-1">Parent Meeting</div>
                                        <div className="text-sm text-gray-400">Schedule immediate call with parents regarding attendance drop.</div>
                                    </Card>
                                </>
                            ) : risk.level === "MODERATE" ? (
                                <Card tier={2} delay={0.7} className="min-w-[280px] snap-center border-l-4 border-l-amber-500 flex-shrink-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-amber-500" />
                                        </div>
                                    </div>
                                    <div className="font-bold text-lg mb-1">Remedial Classes</div>
                                    <div className="text-sm text-gray-400">Provide structured study plan for core subjects.</div>
                                </Card>
                            ) : (
                                <Card tier={2} delay={0.7} className="min-w-[280px] snap-center border-l-4 border-l-[#BFA14A] flex-shrink-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="w-10 h-10 rounded-full bg-[#BFA14A]/[0.18] flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5 text-[#BFA14A]" />
                                        </div>
                                    </div>
                                    <div className="font-bold text-lg mb-1">General Monitoring</div>
                                    <div className="text-sm text-gray-400">Student is performing well. Maintain standard check-ins.</div>
                                </Card>
                            )}
                        </div>
                        <button onClick={onInterventionReq} onMouseEnter={e => {   e.currentTarget.style.transform = 'translateY(-2px)';   e.currentTarget.style.transition = 'all 0.25s ease';   e.currentTarget.style.boxShadow = '0 6px 18px rgba(191,161,74,0.16)'; }} onMouseLeave={e => {   e.currentTarget.style.transform = 'translateY(0px)';   e.currentTarget.style.boxShadow = 'none'; }} className="mt-6 btn-gradient px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                            <Zap className="w-5 h-5" /> Trigger New Intervention
                        </button>
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
};
