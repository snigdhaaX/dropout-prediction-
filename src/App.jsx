import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  ShieldAlert, BookOpen, GraduationCap, Users, LayoutDashboard,
  AlertTriangle, TrendingUp, TrendingDown, Minus, ChevronRight,
  ArrowLeft, Brain, Activity, Clock, LogOut, CheckCircle2, Search,
  Filter, MoreVertical, ShieldCheck, Zap
} from 'lucide-react';

const TOTAL_STUDENTS = 15;

const generateStudents = () => {
  return [
    {
      id: "S101", name: "Aryan Mehta", dept: "CSE", sem: 6,
      attendance: [92, 85, 78, 71, 65], marks: [82, 78, 71, 63, 56],
      lmsLogins: [18, 14, 9, 4, 2], assignmentDelays: 5,
      behaviorIncidents: 1, competitions: 0, prevGPA: 7.8,
      facultyAdvisor: "Dr. Ramesh Iyer"
    },
    {
      id: "S102", name: "Rehman Ali", dept: "ECE", sem: 4,
      attendance: [68, 65, 62, 60, 58], marks: [45, 48, 42, 44, 41],
      lmsLogins: [3, 2, 4, 2, 1], assignmentDelays: 7,
      behaviorIncidents: 3, competitions: 0, prevGPA: 5.2,
      facultyAdvisor: "Prof. Anjali Desai"
    },
    {
      id: "S103", name: "Sneha Reddy", dept: "MECH", sem: 4,
      attendance: [80, 78, 82, 76, 79], marks: [65, 62, 68, 61, 64],
      lmsLogins: [10, 8, 11, 7, 9], assignmentDelays: 3,
      behaviorIncidents: 1, competitions: 1, prevGPA: 6.5,
      facultyAdvisor: "Dr. Suresh Nair"
    },
    {
      id: "S104", name: "Kavya Sharma", dept: "CSE", sem: 2,
      attendance: [60, 65, 70, 75, 80], marks: [50, 55, 60, 65, 68],
      lmsLogins: [5, 8, 11, 14, 16], assignmentDelays: 2,
      behaviorIncidents: 0, competitions: 1, prevGPA: 5.8,
      facultyAdvisor: "Dr. Ramesh Iyer"
    },
    {
      id: "S105", name: "Priya Singh", dept: "CSE", sem: 6,
      attendance: [96, 97, 95, 98, 96], marks: [91, 88, 93, 90, 92],
      lmsLogins: [22, 24, 21, 23, 25], assignmentDelays: 0,
      behaviorIncidents: 0, competitions: 3, prevGPA: 9.4,
      facultyAdvisor: "Dr. Meera Pillai"
    },
    {
      id: "S106", name: "Rohit Verma", dept: "CIVIL", sem: 4,
      attendance: [88, 87, 89, 86, 88], marks: [72, 74, 70, 73, 72],
      lmsLogins: [14, 12, 15, 13, 14], assignmentDelays: 1,
      behaviorIncidents: 0, competitions: 1, prevGPA: 7.1,
      facultyAdvisor: "Prof. Kiran Bhat"
    },
    {
      id: "S107", name: "Divya Krishnan", dept: "MBA", sem: 2,
      attendance: [82, 79, 76, 73, 70], marks: [68, 65, 62, 60, 58],
      lmsLogins: [12, 10, 8, 6, 5], assignmentDelays: 3,
      behaviorIncidents: 0, competitions: 0, prevGPA: 6.8,
      facultyAdvisor: "Dr. Priya Menon"
    },
    {
      id: "S108", name: "Rahul Joshi", dept: "ECE", sem: 6,
      attendance: [90, 84, 76, 68, 61], marks: [80, 74, 65, 58, 52],
      lmsLogins: [16, 12, 8, 5, 3], assignmentDelays: 4,
      behaviorIncidents: 2, competitions: 0, prevGPA: 7.4,
      facultyAdvisor: "Prof. Anjali Desai"
    },
    {
      id: "S109", name: "Meera Nambiar", dept: "CSE", sem: 4,
      attendance: [93, 94, 92, 95, 93], marks: [85, 87, 83, 88, 86],
      lmsLogins: [20, 19, 21, 20, 22], assignmentDelays: 0,
      behaviorIncidents: 0, competitions: 2, prevGPA: 8.7,
      facultyAdvisor: "Dr. Meera Pillai"
    },
    {
      id: "S110", name: "Saurabh Patil", dept: "MECH", sem: 6,
      attendance: [70, 67, 64, 61, 58], marks: [55, 52, 48, 45, 42],
      lmsLogins: [6, 4, 3, 2, 2], assignmentDelays: 6,
      behaviorIncidents: 2, competitions: 0, prevGPA: 5.5,
      facultyAdvisor: "Dr. Suresh Nair"
    },
    {
      id: "S111", name: "Ananya Iyer", dept: "MBA", sem: 4,
      attendance: [72, 75, 77, 79, 81], marks: [58, 61, 63, 65, 67],
      lmsLogins: [7, 9, 11, 12, 14], assignmentDelays: 2,
      behaviorIncidents: 1, competitions: 1, prevGPA: 6.2,
      facultyAdvisor: "Dr. Priya Menon"
    },
    {
      id: "S112", name: "Zaid Qureshi", dept: "CIVIL", sem: 2,
      attendance: [89, 91, 88, 90, 92], marks: [76, 78, 74, 79, 77],
      lmsLogins: [15, 17, 14, 16, 18], assignmentDelays: 1,
      behaviorIncidents: 0, competitions: 2, prevGPA: 7.5,
      facultyAdvisor: "Prof. Kiran Bhat"
    },
    {
      id: "S113", name: "Ishaan Garg", dept: "CSE", sem: 2,
      attendance: [75, 70, 65, 60, 55], marks: [60, 55, 50, 45, 40],
      lmsLogins: [8, 6, 5, 3, 2], assignmentDelays: 5,
      behaviorIncidents: 1, competitions: 0, prevGPA: 6.0,
      facultyAdvisor: "Dr. Ramesh Iyer"
    },
    {
      id: "S114", name: "Tanvi Das", dept: "ECE", sem: 4,
      attendance: [84, 81, 79, 77, 75], marks: [70, 67, 65, 63, 62],
      lmsLogins: [11, 9, 8, 7, 6], assignmentDelays: 3,
      behaviorIncidents: 0, competitions: 1, prevGPA: 6.9,
      facultyAdvisor: "Prof. Anjali Desai"
    },
    {
      id: "S115", name: "Vikram Rathi", dept: "CIVIL", sem: 6,
      attendance: [91, 92, 93, 94, 95], marks: [80, 82, 83, 85, 87],
      lmsLogins: [17, 18, 19, 20, 21], assignmentDelays: 0,
      behaviorIncidents: 0, competitions: 3, prevGPA: 8.2,
      facultyAdvisor: "Prof. Kiran Bhat"
    }
  ];
};

const calculateRiskScore = (student) => {
  let att = student.attendance;
  let attScore = att[4] < 75 ? 25 : att[4] < 85 ? 15 : 5;
  let attDeclining = att[2] > att[3] && att[3] > att[4];
  if (attDeclining) attScore = Math.min(attScore + 5, 25);

  let marks = student.marks;
  let mScore = marks[4] < 50 ? 25 : marks[4] < 65 ? 15 : marks[4] < 75 ? 8 : 3;
  let mDeclining = marks[2] > marks[3] && marks[3] > marks[4];
  if (mDeclining) mScore = Math.min(mScore + 5, 25);

  let recentLMS = (student.lmsLogins[3] + student.lmsLogins[4]) / 2;
  let lmsScore = recentLMS < 3 ? 20 : recentLMS < 7 ? 12 : recentLMS < 14 ? 5 : 2;

  let d = student.assignmentDelays;
  let aScore = d === 0 ? 0 : d <= 2 ? 5 : d <= 4 ? 10 : 15;

  let b = student.behaviorIncidents;
  let bScore = b === 0 ? 0 : b === 1 ? 4 : b === 2 ? 7 : 10;

  let cScore = student.competitions === 0 ? 5 : student.competitions === 1 ? 3 : 0;

  let total = Math.min(attScore + mScore + lmsScore + aScore + bScore + cScore, 100);
  let level = total <= 30 ? "SAFE" : total <= 60 ? "MODERATE" : "HIGH";

  let trend = (attDeclining && mDeclining) ? "declining" :
    (!attDeclining && !mDeclining) ? "stable" : "mixed";
  if (total <= 30 && trend === "stable") trend = "improving";

  return {
    score: total, level,
    breakdown: {
      attendance: attScore, marks: mScore, lms: lmsScore,
      assignments: aScore, behavior: bScore, competitions: cScore
    },
    trend
  };
};

const getLevelColor = (level) => {
  if (level === "SAFE") return "#00D4FF";
  if (level === "MODERATE") return "#F59E0B";
  return "#EF4444";
};


const HeaderUnderline = ({ title }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold tracking-wide">{title}</h2>
    <div className="header-underline"></div>
  </div>
);

const Card = ({ children, tier = 1, className = "", delay = 0, onClick }) => (
  <div
    onClick={onClick}
    className={`card-tier-${tier} hover-lift p-5 animate-fade-up ${className} ${onClick ? 'cursor-pointer' : ''}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0A0F1E] bg-opacity-90 border border-white/10 backdrop-blur-md rounded-lg p-3 text-white shadow-xl">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></div>
            <span className="opacity-80">{entry.name || 'Value'}:</span>
            <span className="font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};


const LoginPage = ({ onLogin }) => {
  const [role, setRole] = useState("Admin");

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: Math.random() > 0.5 ? '#00D4FF' : '#7B6EF6',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
            animation: `float ${Math.random() * 4 + 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }} />
        ))}
      </div>

      <div className="card-tier-3 p-10 w-full max-w-md animate-fade-up z-10 flex flex-col items-center shadow-2xl relative">
        <div className="absolute -top-12 w-24 h-24 bg-[#00D4FF]/20 rounded-full blur-3xl"></div>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B6EF6] flex items-center justify-center mb-4 relative z-10 block">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold mb-2 text-gradient tracking-tight relative z-10">AcademiQ</h1>
        <p className="text-gray-400 mb-8 font-medium relative z-10">Academic Intelligence Platform</p>

        <div className="flex w-full bg-white/5 p-1 rounded-xl mb-6 relative z-10">
          {["Admin", "Faculty", "Student"].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${role === r ? "bg-gradient-to-r from-[#00D4FF] to-[#7B6EF6] text-white shadow-lg" : "text-gray-400 hover:text-white"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="w-full space-y-4 mb-8 relative z-10">
          <div>
            <input type="text" placeholder="Email Address"
              className="w-full bg-[#0A0F1E]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
              defaultValue={`demo@academiq.edu`}
            />
          </div>
          <div>
            <input type="password" placeholder="Password"
              className="w-full bg-[#0A0F1E]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
              defaultValue="password"
            />
          </div>
        </div>

        <button
          onClick={() => onLogin(role.toLowerCase())}
          className="w-full btn-gradient py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 relative z-10"
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
      { name: 'Safe', value: safe, color: '#00D4FF' },
      { name: 'Moderate', value: moderate, color: '#F59E0B' },
      { name: 'High Risk', value: high, color: '#EF4444' }
    ];

    return { high, moderate, safe, avg, deptChart, dropoutData, pieData };
  }, [students]);

  return (
    <div className="p-6 animate-page max-w-7xl mx-auto">
      <HeaderUnderline title="Institution Overview" />

      <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6">
        <Card delay={0.1} className="w-full md:w-1/3 min-w-[200px]">
          <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#00D4FF]" /> Total Students
          </div>
          <div className="text-3xl font-bold text-white mb-2">{TOTAL_STUDENTS}</div>
          <div className="h-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[{ v: 10 }, { v: 12 }, { v: 11 }, { v: 14 }, { v: 15 }]}>
                <Line type="monotone" dataKey="v" stroke="#00D4FF" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card delay={0.2} className="w-full md:w-1/4 risk-pulse relative overflow-hidden bg-red-500/5 border-red-500/20"
          onClick={() => onNavigate('faculty')}>
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-red-500/20 rounded-full blur-xl"></div>
          <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" /> High Risk Count
          </div>
          <div className="text-4xl font-bold text-red-500">{data.high}</div>
          <div className="text-xs text-red-400 mt-2">+2 since last week</div>
        </Card>

        <Card delay={0.3} className="w-full md:w-1/5 bg-amber-500/5 border-amber-500/20"
          onClick={() => onNavigate('interventions')}>
          <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-500" /> Interventions
          </div>
          <div className="text-4xl font-bold text-amber-500">8</div>
          <div className="text-xs text-amber-400 mt-2">4 pending review</div>
        </Card>

        <Card delay={0.4} className="w-full md:w-1/4">
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
                      <Cell key={`cell-${index}`} fill={entry.limit > 60 ? '#EF4444' : entry.limit > 40 ? '#F59E0B' : '#00D4FF'} />
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
                <p className="text-sm font-medium">Rehman Ali marked 3rd behavioral incident</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
              <div className="animate-fade-up relative pl-4 border-l-2 border-[#00D4FF]" style={{ animationDelay: '1.1s' }}>
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_8px_rgba(0,212,255,1)]"></div>
                <p className="text-sm font-medium">Kavya Sharma shows strong recovery trend</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};


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
            className="w-full bg-[#0A0F1E]/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]/50 transition-colors backdrop-blur-md"
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
                return (
                  <tr key={s.id} className={`border-b border-white/5 smart-table-row risk-${s.risk.level.toLowerCase()}`}>
                    <td className="p-4 text-center text-gray-500">{idx + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-[#0A0F1E]"
                          style={{ border: `2px solid ${getLevelColor(s.risk.level)}`, color: getLevelColor(s.risk.level) }}>
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
                        style={{ backgroundColor: `${getLevelColor(s.risk.level)}20`, color: getLevelColor(s.risk.level) }}>
                        {s.risk.score}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${isHigh ? 'risk-pulse' : ''}`}
                        style={{ borderColor: getLevelColor(s.risk.level), color: getLevelColor(s.risk.level), backgroundColor: `${getLevelColor(s.risk.level)}10` }}>
                        {s.risk.level}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      {s.risk.trend === 'declining' && <TrendingDown className="w-5 h-5 mx-auto text-red-500" />}
                      {s.risk.trend === 'improving' && <TrendingUp className="w-5 h-5 mx-auto text-[#00D4FF]" />}
                      {s.risk.trend === 'stable' && <Minus className="w-5 h-5 mx-auto text-gray-400" />}
                      {s.risk.trend === 'mixed' && <Activity className="w-5 h-5 mx-auto text-amber-500" />}
                    </td>
                    <td className="p-4 text-center align-middle">
                      <button
                        onClick={() => onSelectStudent(s)}
                        className="action-btn px-4 py-1.5 btn-gradient rounded-lg text-sm font-bold text-white shadow-md mx-auto inline-block opacity-0 transition-opacity"
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
    </div>
  );
};


const StudentDetail = ({ student, onBack, onInterventionReq }) => {
  const [loading, setLoading] = useState(true);
  const risk = useMemo(() => calculateRiskScore(student), [student]);
  const color = getLevelColor(risk.level);
  const isHigh = risk.level === "HIGH";

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
  const strokeDashoffset = loading ? circumference : circumference - (risk.score / 100) * circumference;

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
          <div className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-3xl bg-[#0A0F1E] shadow-2xl relative"
            style={{ border: `3px solid ${color}`, color: color }}>
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
            style={{ borderColor: color, color: color, backgroundColor: `${color}15`, textShadow: `0 0 10px ${color}` }}>
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
                    {scoreDisplay}
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
                      <Line type="monotone" dataKey="val" stroke="#00D4FF" strokeWidth={3} dot={{ r: 4, fill: '#00D4FF', strokeWidth: 0 }} activeDot={{ r: 6 }} />
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
                      <Line type="monotone" dataKey="val" stroke={risk.breakdown.marks > 10 ? '#EF4444' : '#00D4FF'} strokeWidth={3} dot={{ r: 4 }} />
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
                        <Cell key={`cell-${index}`} fill={entry.type === 'risk' ? '#EF4444' : '#00D4FF'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 pr-4">
                {shapData.map((d, i) => (
                  <div key={i} className="flex items-start gap-3 animate-fade-up" style={{ animationDelay: `${0.7 + i * 0.1}s` }}>
                    <div className="mt-0.5">
                      {d.type === 'risk' ? <TrendingDown className="w-5 h-5 text-red-500" /> : <TrendingUp className="w-5 h-5 text-[#00D4FF]" />}
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
                <Card tier={2} delay={0.7} className="min-w-[280px] snap-center border-l-4 border-l-[#00D4FF] flex-shrink-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#00D4FF]/20 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                  </div>
                  <div className="font-bold text-lg mb-1">General Monitoring</div>
                  <div className="text-sm text-gray-400">Student is performing well. Maintain standard check-ins.</div>
                </Card>
              )}
            </div>
            <button onClick={onInterventionReq} className="mt-6 btn-gradient px-6 py-3 rounded-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5" /> Trigger New Intervention
            </button>
          </div>
        </>
      )}
    </div>
  );
};


const InterventionsPanel = ({ students }) => {
  const [interventions, setInterventions] = useState([
    { id: 1, studentId: "S101", type: "Parent Meeting", status: "PENDING", date: "Today", assigned: "Dr. Ramesh Iyer" },
    { id: 2, studentId: "S102", type: "Counseling", status: "ACTIVE", date: "Tomorrow", assigned: "Prof. Anjali Desai" },
    { id: 3, studentId: "S108", type: "Study Plan", status: "PENDING", date: "Oct 12", assigned: "Prof. Anjali Desai" },
    { id: 4, studentId: "S110", type: "Remedial Class", status: "COMPLETE", date: "Oct 05", assigned: "Dr. Suresh Nair" },
    { id: 5, studentId: "S113", type: "Mentor Check-in", status: "ACTIVE", date: "Oct 15", assigned: "Dr. Ramesh Iyer" }
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
        <Card delay={0.1} className="flex-1 min-w-[150px]">
          <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
            <Activity className="w-4 h-4 text-white" /> Total Logged
          </div>
          <div className="text-3xl font-bold text-white">{interventions.length}</div>
        </Card>
        <Card delay={0.2} className="flex-1 min-w-[150px] border-amber-500/30">
          <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" /> Pending
          </div>
          <div className="text-3xl font-bold text-amber-500">{pending}</div>
        </Card>
        <Card delay={0.3} className="flex-1 min-w-[150px] border-[#00D4FF]/30">
          <div className="text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00D4FF]" /> Active
          </div>
          <div className="text-3xl font-bold text-[#00D4FF]">{active}</div>
        </Card>
        <Card delay={0.4} className="flex-1 min-w-[150px] border-green-500/30">
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
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-[#0A0F1E] border"
                        style={{ borderColor: color, color: color }}>
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
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${inv.status === "PENDING" ? "text-amber-500 border-amber-500/20 bg-amber-500/10" : inv.status === "ACTIVE" ? "text-[#00D4FF] border-[#00D4FF]/20 bg-[#00D4FF]/10" : "text-green-500 border-green-500/20 bg-green-500/10"}`}>
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
    </div>
  );
};


const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [currentRole, setCurrentRole] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showInterventionModal, setShowInterventionModal] = useState(false);

  const [students] = useState(() => generateStudents());

  const handleLogin = (role) => {
    setCurrentRole(role);
    if (role === "admin") setCurrentPage("admin");
    else if (role === "faculty") setCurrentPage("faculty");
    else setCurrentPage("admin");
  };

  const handleLogout = () => {
    setCurrentPage("login");
    setCurrentRole(null);
    setSelectedStudent(null);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedStudent(null);
  };

  const InterventionModal = () => (
    <div className="fixed inset-0 bg-[#0A0F1E]/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 animate-fade-up">
      <Card tier={3} className="w-full max-w-lg p-8 relative border-amber-500/30">
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
          <button className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-[#00D4FF] flex justify-between items-center bg-white/5 transition-colors">
            <div>
              <div className="font-bold text-white">Assign to Remedial Cluster</div>
              <div className="text-xs text-gray-400">Add student to upcoming remedial sessions</div>
            </div>
            <BookOpen className="text-[#00D4FF] w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-4">
          <button onClick={() => setShowInterventionModal(false)} className="flex-1 py-3 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button onClick={() => {
            setShowInterventionModal(false);
            alert("Intervention triggered successfully.");
          }} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 text-white font-bold hover:opacity-90 transition-opacity">
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
        <nav className="w-full border-b border-white/10 bg-[#0A0F1E]/80 backdrop-blur-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('admin')}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B6EF6] flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-gradient tracking-tight">AcademiQ</span>
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
        {currentPage === "login" && <LoginPage onLogin={handleLogin} />}
        {currentPage === "admin" && <AdminDashboard students={students} onNavigate={handleNavigate} />}
        {currentPage === "faculty" && <FacultyDashboard students={students} onSelectStudent={(s) => { setSelectedStudent(s); setCurrentPage("student"); }} />}
        {currentPage === "student" && selectedStudent && <StudentDetail student={selectedStudent} onBack={() => setCurrentPage("faculty")} onInterventionReq={() => setShowInterventionModal(true)} />}
        {currentPage === "interventions" && <InterventionsPanel students={students} />}
      </main>

      {showInterventionModal && <InterventionModal />}
    </div>
  );
};

export default App;

