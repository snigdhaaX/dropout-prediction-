const LoginPage = ({ onLogin }) => {
    const [role, setRole] = useState("Admin");

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute rounded-full" style={{
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        backgroundColor: Math.random() > 0.5 ? '#BFA14A' : '#A88C3D',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.3 * 0.85,
                        animation: `float ${Math.random() * 4 + 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`
                    }} />
                ))}
            </div>

            <div className="card-tier-3 p-10 w-full max-w-md animate-fade-up z-10 flex flex-col items-center shadow-2xl relative">
                <div className="absolute -top-12 w-24 h-24 bg-[#BFA14A]/[0.18] rounded-full blur-3xl"></div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#BFA14A] to-[#A88C3D] flex items-center justify-center mb-4 relative z-10 block">
                    <Brain className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-extrabold mb-2 text-gradient tracking-tight relative z-10">Continuum</h1>
                <p className="text-gray-400 mb-8 font-medium relative z-10">Academic Intelligence Platform</p>

                <div className="flex w-full bg-white/5 p-1 rounded-xl mb-6 relative z-10">
                    {["Admin", "Faculty", "Student"].map(r => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${role === r ? "bg-gradient-to-r from-[#BFA14A] to-[#A88C3D] text-white shadow-lg" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                <div className="w-full space-y-4 mb-8 relative z-10">
                    <div>
                        <input type="text" placeholder="Email Address"
                            className="w-full bg-[#0B0B0C]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA14A]/30 transition-colors"
                            defaultValue={`demo@academiq.edu`}
                        />
                    </div>
                    <div>
                        <input type="password" placeholder="Password"
                            className="w-full bg-[#0B0B0C]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA14A]/30 transition-colors"
                            defaultValue="password"
                        />
                    </div>
                </div>

                <button
                    onClick={() => onLogin(role.toLowerCase())}
                    onMouseEnter={e => {   e.currentTarget.style.transform = 'translateY(-2px)';   e.currentTarget.style.transition = 'all 0.25s ease';   e.currentTarget.style.boxShadow = '0 6px 18px rgba(191,161,74,0.16)'; }} onMouseLeave={e => {   e.currentTarget.style.transform = 'translateY(0px)';   e.currentTarget.style.boxShadow = 'none'; }} className="w-full btn-gradient py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 relative z-10"
                >
                    Access Platform <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="absolute bottom-8 text-sm text-gray-500 font-medium tracking-widest uppercase">
                Powered by Predictive AI
            </div>
        </div>
    );
};

const AdminDashboard = ({ students, onNavigate }) => {
    const data = useMemo(() => {
        let risks = students.map(s => calculateRiskScore(s));
        let high = risks.filter(r => r.level === "HIGH").length;
        let moderate = risks.filter(r => r.level === "MODERATE").length;
        let safe = risks.filter(r => r.level === "SAFE").length;
        let avg = Math.round(risks.reduce((acc, r) => acc + r.score, 0) / risks.length);

        let depts = {};
        students.forEach((s, i) => {
            depts[s.dept] = depts[s.dept] || { name: s.dept, score: 0, count: 0 };
            depts[s.dept].score += risks[i].score;
            depts[s.dept].count += 1;
        });
        let deptChart = Object.values(depts).map(d => ({ name: d.name, limit: Math.round(d.score / d.count) }));

        const dropoutData = [
            { name: 'Aug', prob: 2 }, { name: 'Sep', prob: 4 }, { name: 'Oct', prob: 7 },
            { name: 'Nov', prob: 12 }, { name: 'Dec', prob: 18 }, { name: 'Jan', prob: 15 }
        ];

        const pieData = [
            { name: 'Safe', value: safe, color: '#BFA14A' },
            { name: 'Moderate', value: moderate, color: '#F59E0B' },
            { name: 'High Risk', value: high, color: '#EF4444' }
        ];

        return { high, moderate, safe, avg, deptChart, dropoutData, pieData };
    }, [students]);

    return (
        <div className="p-6 animate-page max-w-7xl mx-auto">
            <HeaderUnderline title="Institution Overview" />

            <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6">
                <Card delay={0.1} className="w-full md:w-1/3 min-w-[200px]" style={{
    animationName: 'staggerFadeUp',
    animationDuration: '260ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
    animationDelay: '0s'
  }}>
                    <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#BFA14A]" /> Total Students
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{TOTAL_STUDENTS}</div>
                    <div className="h-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[{ v: 10 }, { v: 12 }, { v: 11 }, { v: 14 }, { v: 15 }]}>
                                <Line type="monotone" dataKey="v" stroke="#BFA14A" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card delay={0.2} className="w-full md:w-1/4 risk-pulse relative overflow-hidden bg-red-500/5 border-red-500/20" style={{
    animationName: 'staggerFadeUp',
    animationDuration: '260ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
    animationDelay: '0.06s'
  }}
                    onClick={() => onNavigate('faculty')}>
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-red-500/20 rounded-full blur-xl"></div>
                    <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" /> High Risk Count
                    </div>
                    <div className="text-4xl font-bold text-red-500">{data.high}</div>
                    <div className="text-xs text-red-400 mt-2">+2 since last week</div>
                </Card>

                <Card delay={0.3} className="w-full md:w-1/5 bg-amber-500/5 border-amber-500/20" style={{
    animationName: 'staggerFadeUp',
    animationDuration: '260ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
    animationDelay: '0.12s'
  }}
                    onClick={() => onNavigate('interventions')}>
                    <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-amber-500" /> Interventions
                    </div>
                    <div className="text-4xl font-bold text-amber-500">8</div>
                    <div className="text-xs text-amber-400 mt-2">4 pending review</div>
                </Card>

                <Card delay={0.4} className="w-full md:w-1/4" style={{
    animationName: 'staggerFadeUp',
    animationDuration: '260ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
    animationDelay: '0.18s'
  }}>
                    <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                        <Brain className="w-4 h-4 text-purple-400" /> Avg Risk Score
                    </div>
                    <div className="text-4xl font-bold text-purple-400">{data.avg}</div>
                    <div className="text-xs text-purple-300 mt-2">Overall stability</div>
                </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-[60%] space-y-6">
                    <Card tier={2} delay={0.5} className="h-80 flex flex-col">
                        <h3 className="text-lg font-semibold mb-4 px-2">Department Risk Profile (Avg Score)</h3>
                        <div className="flex-1 animate-chart">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.deptChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid stroke="#1E2A3A" strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" stroke="#4A5568" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#4A5568" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                    <Bar dataKey="limit" radius={[4, 4, 0, 0]}>
                                        {data.deptChart.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.limit > 60 ? '#EF4444' : entry.limit > 40 ? '#F59E0B' : '#BFA14A'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card tier={2} delay={0.6} className="h-64 flex flex-col">
                        <h3 className="text-lg font-semibold mb-4 px-2">Probable Attrition Rate (6 Months)</h3>
                        <div className="flex-1 animate-chart">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.dropoutData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="dropoutGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid stroke="#1E2A3A" strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" stroke="#4A5568" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#4A5568" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <RechartsTooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="prob" name="Dropout %" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#dropoutGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                <div className="w-full lg:w-[40%] space-y-6">
                    <Card tier={2} delay={0.7} className="h-[22rem] flex flex-col relative overflow-hidden">
                        <h3 className="text-lg font-semibold mb-2 px-2">Risk Distribution</h3>
                        <div className="flex-1 animate-chart relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.pieData}
                                        cx="50%" cy="50%"
                                        innerRadius={60} outerRadius={80}
                                        paddingAngle={5} dataKey="value"
                                        stroke="none"
                                    >
                                        {data.pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none pb-8">
                                <span className="text-3xl font-bold">{TOTAL_STUDENTS}</span>
                                <span className="text-xs text-gray-400">Total</span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 mt-2 px-4 pb-2">
                            {data.pieData.map((d, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                                    <span className="text-sm text-gray-300">{d.name} <span className="font-bold text-white ml-1">{d.value}</span></span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card tier={2} delay={0.8} className="flex-1 h-64 overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-400" /> Recent Alerts</h3>
                        <div className="space-y-4">
                            <div className="animate-fade-up relative pl-4 border-l-2 border-red-500" style={{ animationDelay: '0.9s' }}>
                                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]"></div>
                                <p className="text-sm font-medium">Aryan Mehta crossed HIGH RISK threshold</p>
                                <p className="text-xs text-gray-500">2 min ago</p>
                            </div>
                            <div className="animate-fade-up relative pl-4 border-l-2 border-red-500" style={{ animationDelay: '1.0s' }}>
                                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]"></div>
                                <p className="text-sm font-medium">Rehan Shaikh marked 3rd behavioral incident</p>
                                <p className="text-xs text-gray-500">1 hour ago</p>
                            </div>
                            <div className="animate-fade-up relative pl-4 border-l-2 border-[#BFA14A]" style={{ animationDelay: '1.1s' }}>
                                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#BFA14A] shadow-[0_0_8px_rgba(191,161,74,1)]"></div>
                                <p className="text-sm font-medium">Kavya Nair shows strong recovery trend</p>
                                <p className="text-xs text-gray-500">3 hours ago</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div style={{ marginTop: 48 }}>
                <div style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                    SDG 4 Education Impact Metrics
                </div>
                <div style={{ height: 2, borderRadius: 1, background: 'linear-gradient(90deg, #C5192D, transparent)', width: 0, animation: 'expandLine 1s 0.2s ease forwards', marginTop: 8 }}></div>

                <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
                    <Card tier={1} className="flex-1 min-w-[200px]" style={{ borderLeft: '3px solid #10B981' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                            <TrendingDownIcon size={20} color="#10B981" /> Projected Dropout Reduction
                        </div>
                        <div style={{ fontFamily: 'Syne', fontSize: 28, color: '#10B981', marginBottom: 4 }}>34%</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>vs. pre-intervention baseline</div>
                    </Card>

                    <Card tier={1} className="flex-1 min-w-[200px]" style={{ borderLeft: '3px solid #BFA14A' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                            <Users size={20} color="#BFA14A" /> Stabilized This Quarter
                        </div>
                        <div style={{ fontFamily: 'Syne', fontSize: 28, color: '#BFA14A', marginBottom: 4 }}>8 Students</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>Moved from HIGH/MODERATE → SAFE</div>

                        <div style={{ display: 'flex' }}>
                            {students.slice(0, 8).map((s, i) => (
                                <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(191,161,74,0.18)', border: '1px solid rgba(191,161,74,0.3)', fontSize: 8, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: i === 0 ? 0 : -6 }}>
                                    {s.name[0]}
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card tier={1} className="flex-1 min-w-[200px]" style={{ borderLeft: '3px solid #A88C3D' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                            <BarChart2 size={20} color="#A88C3D" /> Retention Improvement
                        </div>
                        <div style={{ fontFamily: 'Syne', fontSize: 28, color: '#A88C3D', marginBottom: 4 }}>+18.6%</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>Semester-over-semester growth</div>
                    </Card>

                    <Card tier={1} className="flex-1 min-w-[200px]" style={{ borderLeft: '3px solid #F59E0B' }} title="Based on avg lifetime earning loss per dropout × students stabilized">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                            <IndianRupee size={20} color="#F59E0B" /> Economic Impact Prevented
                        </div>
                        <div style={{ fontFamily: 'Syne', fontSize: 28, color: '#F59E0B', marginBottom: 4 }}>₹14.2L</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>Estimated lost productivity avoided</div>
                    </Card>
                </div>

                <div style={{ marginTop: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '20px 24px' }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>SDG 4 Target Progress — Institution Level</div>

                    <div style={{ marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                            <span>Equitable Quality Education Access</span>
                            <span>68%</span>
                        </div>
                        <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', width: '100%' }}>
                            <div style={{ height: 8, borderRadius: 4, background: '#C5192D', width: '68%', transition: 'width 1s ease 0.3s' }}></div>
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                            <span>Dropout Prevention Effectiveness</span>
                            <span>74%</span>
                        </div>
                        <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', width: '100%' }}>
                            <div style={{ height: 8, borderRadius: 4, background: '#C5192D', width: '74%', transition: 'width 1s ease 0.3s' }}></div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 12, marginTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 24, height: 24, borderRadius: 12, background: '#C5192D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', fontFamily: 'Syne' }}>4</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>Data aligned with UNESCO SDG 4 monitoring framework</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
