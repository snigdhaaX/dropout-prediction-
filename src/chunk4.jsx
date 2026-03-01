const InterventionsPanel = ({ students }) => {
    const [interventions, setInterventions] = useState([
        { id: 1, studentId: "S001", type: "Parent Meeting", status: "PENDING", date: "Today", assigned: "Dr. Ramesh Iyer" },
        { id: 2, studentId: "S002", type: "Counseling", status: "ACTIVE", date: "Tomorrow", assigned: "Prof. Anjali Desai" },
        { id: 3, studentId: "S008", type: "Study Plan", status: "PENDING", date: "Oct 12", assigned: "Prof. Anjali Desai" },
        { id: 4, studentId: "S010", type: "Remedial Class", status: "COMPLETE", date: "Oct 05", assigned: "Dr. Suresh Nair" },
        { id: 5, studentId: "S013", type: "Mentor Check-in", status: "ACTIVE", date: "Oct 15", assigned: "Dr. Ramesh Iyer" }
    ]);

    const markComplete = (id) => {
        setInterventions(prev => prev.map(inv => inv.id === id ? { ...inv, status: "COMPLETE" } : inv));
    };

    const active = interventions.filter(i => i.status === "ACTIVE").length;
    const pending = interventions.filter(i => i.status === "PENDING").length;
    const complete = interventions.filter(i => i.status === "COMPLETE").length;

    return (
        <div className="p-6 animate-page max-w-7xl mx-auto">
            <HeaderUnderline title="Intervention Command Center" />

            <div className="flex gap-4 mb-6">
                <Card delay={0.1} className="flex-1 min-w-[150px]" style={{
    animationName: 'staggerFadeUp',
    animationDuration: '260ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
    animationDelay: '0s'
  }}>
                    <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-white" /> Total Logged
                    </div>
                    <div className="text-3xl font-bold text-white">{interventions.length}</div>
                </Card>
                <Card delay={0.2} className="flex-1 min-w-[150px] border-amber-500/30" style={{
    animationName: 'staggerFadeUp',
    animationDuration: '260ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
    animationDelay: '0.06s'
  }}>
                    <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" /> Pending
                    </div>
                    <div className="text-3xl font-bold text-amber-500">{pending}</div>
                </Card>
                <Card delay={0.3} className="flex-1 min-w-[150px] border-[#BFA14A]/30" style={{
    animationName: 'staggerFadeUp',
    animationDuration: '260ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
    animationDelay: '0.12s'
  }}>
                    <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#BFA14A]" /> Active
                    </div>
                    <div className="text-3xl font-bold text-[#BFA14A]">{active}</div>
                </Card>
                <Card delay={0.4} className="flex-1 min-w-[150px] border-green-500/30" style={{
    animationName: 'staggerFadeUp',
    animationDuration: '260ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
    animationDelay: '0.18s'
  }}>
                    <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Completed
                    </div>
                    <div className="text-3xl font-bold text-green-500">{complete}</div>
                </Card>
            </div>

            <Card tier={2} delay={0.5} className="p-0 overflow-hidden">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="border-b border-white/5 text-gray-400 text-sm">
                            <th className="p-4 font-semibold">Student</th>
                            <th className="p-4 font-semibold">Risk Level</th>
                            <th className="p-4 font-semibold">Intervention Type</th>
                            <th className="p-4 font-semibold">Assigned Faculty</th>
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold text-center">Status</th>
                            <th className="p-4 font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {interventions.map((inv, idx) => {
                            const s = students.find(x => x.id === inv.studentId);
                            if (!s) return null;
                            const risk = calculateRiskScore(s);
                            const color = getLevelColor(risk.level);
                            return (
                                <tr key={inv.id} className={`border-b border-white/5 transition-all duration-500 hover:bg-white/5 ${inv.status === "COMPLETE" ? "opacity-50" : ""}`}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-[#0B0B0C] border"
                                                style={{ borderColor: risk.level === "SAFE" ? 'rgba(191,161,74,0.26)' : color, color: color }}>
                                                {s.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="font-bold text-white">{s.name}</div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-xs font-bold" style={{ color: color }}>{risk.level}</div>
                                    </td>
                                    <td className="p-4 font-medium">{inv.type}</td>
                                    <td className="p-4 text-gray-300">{inv.assigned}</td>
                                    <td className="p-4 text-gray-300">{inv.date}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${inv.status === "PENDING" ? "text-amber-500 border-amber-500/20 bg-amber-500/10" : inv.status === "ACTIVE" ? "text-[#BFA14A] border-[#BFA14A]/[0.18] bg-[#BFA14A]/[0.08]" : "text-green-500 border-green-500/20 bg-green-500/10"}`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {inv.status !== "COMPLETE" ? (
                                            <button onClick={() => markComplete(inv.id)} className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-1 mx-auto text-white">
                                                <CheckCircle2 className="w-4 h-4" /> Resolve
                                            </button>
                                        ) : (
                                            <span className="text-xs text-gray-500 font-semibold px-3 py-1.5 inline-block">RESOLVED</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
            <Footer />
        </div>
    );
};

const App = () => {
    const [currentPage, setCurrentPage] = useState("login");
    const [currentRole, setCurrentRole] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showInterventionModal, setShowInterventionModal] = useState(false);
    const [pageVisible, setPageVisible] = useState(true);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const scoreIntervalRef = useRef(null);

    const [students] = useState(() => generateStudents());

    const navigateTo = (targetPage, studentObj = null) => {
    setPageVisible(false);
    setTimeout(() => {
      setCurrentPage(targetPage);
      if (studentObj !== null) setSelectedStudent(studentObj);
      setPageVisible(true);
    }, 200);
  };

  const openStudentDetail = (student) => {
    navigateTo('student', student);
    setSkeletonLoading(true);
    setDisplayScore(0);
    setTimeout(() => {
      setSkeletonLoading(false);
    }, 600);
  };

  useEffect(() => {
    if (!selectedStudent || skeletonLoading) return;
    const target = selectedStudent.riskScore || calculateRiskScore(selectedStudent).score;
    let current = 0;
    clearInterval(scoreIntervalRef.current);
    scoreIntervalRef.current = setInterval(() => {
      current += Math.ceil((target - current) / 6);
      if (current >= target) {
        current = target;
        clearInterval(scoreIntervalRef.current);
      }
      setDisplayScore(current);
    }, 18);
    return () => clearInterval(scoreIntervalRef.current);
  }, [selectedStudent, skeletonLoading]);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleLogin = (role) => {
        setCurrentRole(role);
        if (role === "admin") setCurrentPage("admin");
        else if (role === "faculty") setCurrentPage("faculty");
        else setCurrentPage("admin");
    };

    const handleLogout = () => {
        navigateTo("login"); setCurrentRole(null); setSelectedStudent(null);
    };

    const handleNavigate = (page) => { navigateTo(page); setSelectedStudent(null); };

    const InterventionModal = () => (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
       style={{
         background:'rgba(0,0,0,0.55)',
         backdropFilter:'blur(6px)',
         animation:'overlayFadeIn 200ms ease forwards'
       }}>
            <Card tier={3} className="w-full max-w-lg p-8 relative border-amber-500/30" style={{animation:'modalScaleIn 220ms ease forwards'}}>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Zap className="w-6 h-6 text-amber-500" /> Trigger Action</h3>
                <p className="text-gray-400 mb-6">Select automated intervention for {selectedStudent?.name}</p>

                <div className="space-y-3 mb-8">
                    <button className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-amber-500 flex justify-between items-center bg-white/5 transition-colors">
                        <div>
                            <div className="font-bold text-white">Schedule Parent Meeting</div>
                            <div className="text-xs text-gray-400">Send auto-email to parents and block calendar</div>
                        </div>
                        <Users className="text-amber-500 w-5 h-5" />
                    </button>
                    <button className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-[#BFA14A] flex justify-between items-center bg-white/5 transition-colors">
                        <div>
                            <div className="font-bold text-white">Assign to Remedial Cluster</div>
                            <div className="text-xs text-gray-400">Add student to upcoming remedial sessions</div>
                        </div>
                        <BookOpen className="text-[#BFA14A] w-5 h-5" />
                    </button>
                </div>

                <div className="flex gap-4">
                    <button onClick={() => setShowInterventionModal(false)} className="flex-1 py-3 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
                        Cancel
                    </button>
                    <button onClick={() => { setShowInterventionModal(false); showToast('✓ Intervention triggered successfully.'); }} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 text-white font-bold hover:opacity-90 transition-opacity">
                        Confirm Action
                    </button>
                </div>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen text-white relative">
            <div className="ambient-glow-topLeft"></div>
            <div className="ambient-glow-topRight"></div>

            {currentPage !== "login" && (
                <nav className="w-full border-b border-white/10 bg-[#0B0B0C]/80 backdrop-blur-lg sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('admin')} style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A88C3D] to-[#BFA14A] flex items-center justify-center">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20, background: 'linear-gradient(135deg,#A88C3D,#BFA14A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>Continuum</span>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Sans', letterSpacing: '0.5px', marginTop: 1, lineHeight: 1 }}>Academic Stability Engine</div>
                            </div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(197,25,45,0.1)', border: '1px solid rgba(197,25,45,0.3)', borderRadius: 20, padding: '3px 10px', marginLeft: 12 }}>
                                <span style={{ width: 6, height: 6, borderRadius: 3, background: '#C5192D', display: 'inline-block' }}></span>
                                <span style={{ fontSize: 10, color: '#C5192D', fontFamily: 'DM Sans', fontWeight: 500, letterSpacing: '0.3px' }}>SDG 4 – Quality Education</span>
                            </div>
                        </div>

                        <div className="flex flex-1 justify-center max-w-lg">
                            <div className="flex gap-8 px-4 w-full">
                                <button
                                    onClick={() => handleNavigate("admin")}
                                    className={`py-5 font-semibold text-sm transition-colors nav-tab ${currentPage === "admin" ? "text-white active" : "text-gray-400 hover:text-white"}`}
                                >
                                    <LayoutDashboard className="w-4 h-4 inline-block mr-1.5 -mt-0.5" /> Dashboard
                                </button>
                                <button
                                    onClick={() => handleNavigate("faculty")}
                                    className={`py-5 font-semibold text-sm transition-colors nav-tab ${currentPage === "faculty" || currentPage === "student" ? "text-white active" : "text-gray-400 hover:text-white"}`}
                                >
                                    <Users className="w-4 h-4 inline-block mr-1.5 -mt-0.5" /> Students
                                </button>
                                <button
                                    onClick={() => handleNavigate("interventions")}
                                    className={`py-5 font-semibold text-sm transition-colors nav-tab ${currentPage === "interventions" ? "text-white active" : "text-gray-400 hover:text-white"}`}
                                >
                                    <ShieldAlert className="w-4 h-4 inline-block mr-1.5 -mt-0.5" /> Interventions
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-red-500"></div>
                                <span className="text-xs font-bold uppercase tracking-wider">{currentRole}</span>
                            </div>
                            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </nav>
            )}

            <main className="relative z-10 min-h-[calc(100vh-64px)] overflow-x-hidden">
        <div style={{
          opacity: pageVisible ? 1 : 0,
          transform: pageVisible ? 'translateX(0px)' : 'translateX(12px)',
          transition: pageVisible ? 'opacity 250ms ease, transform 250ms ease' : 'opacity 200ms ease, transform 200ms ease',
          willChange: 'opacity, transform'
        }}>
          
                {currentPage === "login" && <LoginPage onLogin={handleLogin} />}
                {currentPage === "admin" && <AdminDashboard students={students} onNavigate={handleNavigate} />}
                {currentPage === "faculty" && <FacultyDashboard students={students} onSelectStudent={(s) => openStudentDetail(s)} />}
                {currentPage === "student" && selectedStudent && <StudentDetail 
    student={selectedStudent} 
    onBack={() => navigateTo("faculty")} 
    onInterventionReq={() => setShowInterventionModal(true)} 
    showToast={showToast}
    skeletonLoading={skeletonLoading}
    displayScore={displayScore}
  />}
                {currentPage === "interventions" && <InterventionsPanel students={students} />}
            
        </div>
      </main>

            {showInterventionModal && <InterventionModal />}

            {counselingToast && (
                <div style={{
                    position: 'fixed', bottom: 24, right: 24,
                    background: 'rgba(16,185,129,0.92)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(16,185,129,0.4)',
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: 10,
                    fontSize: 13,
                    fontFamily: 'DM Sans',
                    display: 'flex', alignItems: 'center', gap: 8,
                    zIndex: 9999,
                    animation: 'fadeSlideUp 0.3s ease'
                }}>
                    <CheckCircle2 size={14} /> Counseling referral logged
                </div>
            )}
        </div>
    );
};

export default App;
