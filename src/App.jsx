import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
    ShieldAlert, BookOpen, GraduationCap, Users, LayoutDashboard,
    AlertTriangle, TrendingUp, TrendingDown, Minus, ChevronRight,
    ArrowLeft, Brain, Activity, Clock, LogOut, CheckCircle2, Search,
    Filter, MoreVertical, ShieldCheck, Zap, Wallet, MapPin, Star, Shield, TrendingDown as TrendingDownIcon, BarChart2, IndianRupee, Bell,
    Sun, Moon, Eye, EyeOff
} from 'lucide-react';

const TOTAL_STUDENTS = 15;

const calculateDropoutWindow = (riskScore) => {
    if (riskScore >= 75) return "1–3 Months";
    if (riskScore >= 60) return "3–6 Months";
    if (riskScore >= 40) return "6–12 Months";
    return "Not Predicted";
};

const generateStudents = () => {
    const students = [
        {
            id: "S001", name: "Aryan Mehta", dept: "CSE", sem: 6,
            attendance: [92, 85, 78, 71, 65], marks: [82, 78, 71, 63, 56],
            lmsLogins: [18, 14, 9, 4, 2], assignmentDelays: 5,
            behaviorIncidents: 1, competitions: 0, prevGPA: 7.8,
            facultyAdvisor: "Dr. Ramesh Iyer",
            financial: { feeStatus: "Pending", vulnerabilityScore: 72, scholarshipEligible: true, scholarshipType: "Need-based" },
            socioEconomic: { parentIncomeBracket: "1L-3L", location: "Rural", firstGenerationLearner: true, genderRiskFlag: false },
            mentalHealth: { behavioralStressIndex: 78, counselingRecommended: true, stressCategory: "High" }
        },
        {
            id: "S002", name: "Rehan Shaikh", dept: "ECE", sem: 4,
            attendance: [68, 65, 62, 60, 58], marks: [45, 48, 42, 44, 41],
            lmsLogins: [3, 2, 4, 2, 1], assignmentDelays: 7,
            behaviorIncidents: 3, competitions: 0, prevGPA: 5.2,
            facultyAdvisor: "Prof. Anjali Desai",
            financial: { feeStatus: "Pending", vulnerabilityScore: 85, scholarshipEligible: true, scholarshipType: "Need-based" },
            socioEconomic: { parentIncomeBracket: "Below 1L", location: "Rural", firstGenerationLearner: true, genderRiskFlag: false },
            mentalHealth: { behavioralStressIndex: 82, counselingRecommended: true, stressCategory: "High" }
        },
        {
            id: "S003", name: "Sneha Patil", dept: "MECH", sem: 4,
            attendance: [80, 78, 82, 76, 79], marks: [65, 62, 68, 61, 64],
            lmsLogins: [10, 8, 11, 7, 9], assignmentDelays: 3,
            behaviorIncidents: 1, competitions: 1, prevGPA: 6.5,
            facultyAdvisor: "Dr. Suresh Nair",
            financial: { feeStatus: "Paid", vulnerabilityScore: 45, scholarshipEligible: false, scholarshipType: "None" },
            socioEconomic: { parentIncomeBracket: "3L-6L", location: "Semi-Urban", firstGenerationLearner: false, genderRiskFlag: true },
            mentalHealth: { behavioralStressIndex: 52, counselingRecommended: false, stressCategory: "Moderate" }
        },
        {
            id: "S004", name: "Kavya Nair", dept: "CSE", sem: 2,
            attendance: [60, 65, 70, 75, 80], marks: [50, 55, 60, 65, 68],
            lmsLogins: [5, 8, 11, 14, 16], assignmentDelays: 2,
            behaviorIncidents: 0, competitions: 1, prevGPA: 5.8,
            facultyAdvisor: "Dr. Ramesh Iyer",
            financial: { feeStatus: "Paid", vulnerabilityScore: 38, scholarshipEligible: true, scholarshipType: "Merit" },
            socioEconomic: { parentIncomeBracket: "3L-6L", location: "Semi-Urban", firstGenerationLearner: true, genderRiskFlag: true },
            mentalHealth: { behavioralStressIndex: 44, counselingRecommended: false, stressCategory: "Moderate" }
        },
        {
            id: "S005", name: "Priya Sharma", dept: "CSE", sem: 6,
            attendance: [96, 97, 95, 98, 96], marks: [91, 88, 93, 90, 92],
            lmsLogins: [22, 24, 21, 23, 25], assignmentDelays: 0,
            behaviorIncidents: 0, competitions: 3, prevGPA: 9.4,
            facultyAdvisor: "Dr. Meera Pillai",
            financial: { feeStatus: "Paid", vulnerabilityScore: 10, scholarshipEligible: true, scholarshipType: "Merit" },
            socioEconomic: { parentIncomeBracket: "Above 6L", location: "Urban", firstGenerationLearner: false, genderRiskFlag: false },
            mentalHealth: { behavioralStressIndex: 18, counselingRecommended: false, stressCategory: "Low" }
        },
        {
            id: "S006", name: "Rohit Verma", dept: "CIVIL", sem: 4,
            attendance: [88, 87, 89, 86, 88], marks: [72, 74, 70, 73, 72],
            lmsLogins: [14, 12, 15, 13, 14], assignmentDelays: 1,
            behaviorIncidents: 0, competitions: 1, prevGPA: 7.1,
            facultyAdvisor: "Prof. Kiran Bhat",
            financial: { feeStatus: "Paid", vulnerabilityScore: 22, scholarshipEligible: false, scholarshipType: "None" },
            socioEconomic: { parentIncomeBracket: "3L-6L", location: "Urban", firstGenerationLearner: false, genderRiskFlag: false },
            mentalHealth: { behavioralStressIndex: 25, counselingRecommended: false, stressCategory: "Low" }
        },
        {
            id: "S007", name: "Divya Krishnan", dept: "MBA", sem: 2,
            attendance: [82, 79, 76, 73, 70], marks: [68, 65, 62, 60, 58],
            lmsLogins: [12, 10, 8, 6, 5], assignmentDelays: 3,
            behaviorIncidents: 0, competitions: 0, prevGPA: 6.8,
            facultyAdvisor: "Dr. Priya Menon",
            financial: { feeStatus: "Pending", vulnerabilityScore: 55, scholarshipEligible: true, scholarshipType: "Need-based" },
            socioEconomic: { parentIncomeBracket: "1L-3L", location: "Semi-Urban", firstGenerationLearner: true, genderRiskFlag: true },
            mentalHealth: { behavioralStressIndex: 60, counselingRecommended: true, stressCategory: "Moderate" }
        },
        {
            id: "S008", name: "Aditya Joshi", dept: "ECE", sem: 6,
            attendance: [90, 84, 76, 68, 61], marks: [80, 74, 65, 58, 52],
            lmsLogins: [16, 12, 8, 5, 3], assignmentDelays: 4,
            behaviorIncidents: 2, competitions: 0, prevGPA: 7.4,
            facultyAdvisor: "Prof. Anjali Desai",
            financial: { feeStatus: "Paid", vulnerabilityScore: 40, scholarshipEligible: false, scholarshipType: "None" },
            socioEconomic: { parentIncomeBracket: "3L-6L", location: "Urban", firstGenerationLearner: false, genderRiskFlag: false },
            mentalHealth: { behavioralStressIndex: 88, counselingRecommended: true, stressCategory: "High" }
        },
        {
            id: "S009", name: "Meera Nambiar", dept: "CSE", sem: 4,
            attendance: [93, 94, 92, 95, 93], marks: [85, 87, 83, 88, 86],
            lmsLogins: [20, 19, 21, 20, 22], assignmentDelays: 0,
            behaviorIncidents: 0, competitions: 2, prevGPA: 8.7,
            facultyAdvisor: "Dr. Meera Pillai",
            financial: { feeStatus: "Paid", vulnerabilityScore: 12, scholarshipEligible: true, scholarshipType: "Merit" },
            socioEconomic: { parentIncomeBracket: "Above 6L", location: "Urban", firstGenerationLearner: false, genderRiskFlag: false },
            mentalHealth: { behavioralStressIndex: 15, counselingRecommended: false, stressCategory: "Low" }
        },
        {
            id: "S010", name: "Saurabh Tiwari", dept: "MECH", sem: 6,
            attendance: [70, 67, 64, 61, 58], marks: [55, 52, 48, 45, 42],
            lmsLogins: [6, 4, 3, 2, 2], assignmentDelays: 6,
            behaviorIncidents: 2, competitions: 0, prevGPA: 5.5,
            facultyAdvisor: "Dr. Suresh Nair",
            financial: { feeStatus: "Pending", vulnerabilityScore: 80, scholarshipEligible: true, scholarshipType: "Need-based" },
            socioEconomic: { parentIncomeBracket: "Below 1L", location: "Rural", firstGenerationLearner: true, genderRiskFlag: false },
            mentalHealth: { behavioralStressIndex: 75, counselingRecommended: true, stressCategory: "High" }
        },
        {
            id: "S011", name: "Ananya Singh", dept: "MBA", sem: 4,
            attendance: [72, 75, 77, 79, 81], marks: [58, 61, 63, 65, 67],
            lmsLogins: [7, 9, 11, 12, 14], assignmentDelays: 2,
            behaviorIncidents: 1, competitions: 1, prevGPA: 6.2,
            facultyAdvisor: "Dr. Priya Menon",
            financial: { feeStatus: "Paid", vulnerabilityScore: 35, scholarshipEligible: false, scholarshipType: "None" },
            socioEconomic: { parentIncomeBracket: "3L-6L", location: "Semi-Urban", firstGenerationLearner: false, genderRiskFlag: true },
            mentalHealth: { behavioralStressIndex: 42, counselingRecommended: false, stressCategory: "Moderate" }
        },
        {
            id: "S012", name: "Farhan Qureshi", dept: "CIVIL", sem: 2,
            attendance: [89, 91, 88, 90, 92], marks: [76, 78, 74, 79, 77],
            lmsLogins: [15, 17, 14, 16, 18], assignmentDelays: 1,
            behaviorIncidents: 0, competitions: 2, prevGPA: 7.5,
            facultyAdvisor: "Prof. Kiran Bhat",
            financial: { feeStatus: "Paid", vulnerabilityScore: 20, scholarshipEligible: false, scholarshipType: "None" },
            socioEconomic: { parentIncomeBracket: "3L-6L", location: "Urban", firstGenerationLearner: false, genderRiskFlag: false },
            mentalHealth: { behavioralStressIndex: 22, counselingRecommended: false, stressCategory: "Low" }
        },
        {
            id: "S013", name: "Ishaan Malhotra", dept: "CSE", sem: 2,
            attendance: [75, 70, 65, 60, 55], marks: [60, 55, 50, 45, 40],
            lmsLogins: [8, 6, 5, 3, 2], assignmentDelays: 5,
            behaviorIncidents: 1, competitions: 0, prevGPA: 6.0,
            facultyAdvisor: "Dr. Ramesh Iyer",
            financial: { feeStatus: "Pending", vulnerabilityScore: 65, scholarshipEligible: true, scholarshipType: "Need-based" },
            socioEconomic: { parentIncomeBracket: "1L-3L", location: "Rural", firstGenerationLearner: true, genderRiskFlag: false },
            mentalHealth: { behavioralStressIndex: 70, counselingRecommended: true, stressCategory: "High" }
        },
        {
            id: "S014", name: "Tanvi Kulkarni", dept: "ECE", sem: 4,
            attendance: [84, 81, 79, 77, 75], marks: [70, 67, 65, 63, 62],
            lmsLogins: [11, 9, 8, 7, 6], assignmentDelays: 3,
            behaviorIncidents: 0, competitions: 1, prevGPA: 6.9,
            facultyAdvisor: "Prof. Anjali Desai",
            financial: { feeStatus: "Paid", vulnerabilityScore: 42, scholarshipEligible: false, scholarshipType: "None" },
            socioEconomic: { parentIncomeBracket: "3L-6L", location: "Semi-Urban", firstGenerationLearner: false, genderRiskFlag: true },
            mentalHealth: { behavioralStressIndex: 48, counselingRecommended: false, stressCategory: "Moderate" }
        },
        {
            id: "S015", name: "Vikram Reddy", dept: "CIVIL", sem: 6,
            attendance: [91, 92, 93, 94, 95], marks: [80, 82, 83, 85, 87],
            lmsLogins: [17, 18, 19, 20, 21], assignmentDelays: 0,
            behaviorIncidents: 0, competitions: 3, prevGPA: 8.2,
            facultyAdvisor: "Prof. Kiran Bhat",
            financial: { feeStatus: "Paid", vulnerabilityScore: 15, scholarshipEligible: true, scholarshipType: "Merit" },
            socioEconomic: { parentIncomeBracket: "Above 6L", location: "Urban", firstGenerationLearner: false, genderRiskFlag: false },
            mentalHealth: { behavioralStressIndex: 20, counselingRecommended: false, stressCategory: "Low" }
        }
    ];

    return students.map(s => {
        let risk = calculateRiskScore(s);
        s.dropoutRiskWindow = calculateDropoutWindow(risk.score);
        s.riskScore = risk.score;
        return s;
    });
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

const getLevelColor = (level) => { if (level === "SAFE") return "#4DA3FF"; if (level === "MODERATE") return "#F59E0B"; return "#EF4444"; };

const getBadgeStyle = (level) => {
    if (level === "SAFE") return { background: 'rgba(107,191,138,0.12)', border: '1px solid rgba(107,191,138,0.35)', color: '#E5E7EB' };
    if (level === "MODERATE") return { background: 'rgba(242,184,75,0.12)', border: '1px solid rgba(242,184,75,0.35)', color: '#E5E7EB' };
    return { background: 'rgba(228,87,87,0.12)', border: '1px solid rgba(228,87,87,0.35)', color: '#E5E7EB' };
};
const HeaderUnderline = ({ title }) => (
    <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-wide">{title}</h2>
        <div className="header-underline"></div>
    </div>
);

const Card = ({ children, tier = 1, className = "", delay = 0, onClick, title }) => (
    <div
        onClick={onClick}
        title={title}
        className={`card-tier-${tier} hover-lift p-5 animate-fade-up ${className} ${onClick ? 'cursor-pointer' : ''}`}
        style={{ animationDelay: `${delay}s` }}
    >
        {children}
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-white dark:bg-[#0B0B0C] border border-gray-200 dark:border-white/10 backdrop-blur-md rounded-lg p-3 text-gray-900 dark:text-white shadow-xl">
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

const Footer = () => (
    <div style={{
        borderTop: '1px solid rgba(77,163,255,0.09)',
        background: 'rgba(255,255,255,0.01)',
        padding: '14px 32px',
        textAlign: 'center',
        marginTop: 48,
        fontFamily: 'DM Sans',
        fontSize: 11,
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: '0.3px'
    }}>


        {' | '}Hackspace © 2025
    </div>
);


const ResetPassword = ({ onBack }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pwdError, setPwdError] = useState('');

    const validatePassword = (pwd) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(pwd)) {
            setPwdError("Password must contain at least 8 characters including uppercase, lowercase, number and special symbol.");
            return false;
        }
        setPwdError("");
        return true;
    };

    const handleReset = (e) => {
        e.preventDefault();
        if (validatePassword(password) && password === confirmPassword) {
            console.log("Password reset successful");
            onBack();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            <div className="card-tier-3 p-10 w-full max-w-md animate-fade-up z-10 flex flex-col items-center shadow-2xl relative">
                <h2 className="text-2xl text-gray-900 dark:text-white font-bold mb-6 text-center">Reset Password</h2>
                <form onSubmit={handleReset} className="w-full">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full bg-[#0B0B0C]/50 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white p-3 rounded-xl mb-4 focus:ring-2 mt-4 transition-colors focus:border-[#4DA3FF]/30 outline-none"
                        required
                    />
                    <div className="relative mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            placeholder="New Password"
                            className="w-full bg-[#0B0B0C]/50 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white p-3 rounded-xl pr-10 focus:ring-2 transition-colors focus:border-[#4DA3FF]/30 outline-none"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-slate-400 hover:text-gray-900 dark:text-white transition"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {pwdError && <p className="text-red-400 text-xs mt-1">{pwdError}</p>}
                    </div>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm New Password"
                        className="w-full bg-[#0B0B0C]/50 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white p-3 rounded-xl mb-6 transition-colors focus:border-[#4DA3FF]/30 outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full btn-gradient py-3 rounded-xl font-bold text-lg mb-3"
                    >
                        Update Password
                    </button>
                    <button
                        type="button"
                        className="w-full bg-slate-700 hover:bg-slate-600 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-xl transition border border-slate-600"
                        onClick={onBack}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

const LoginPage = ({ onLogin, onForgotPassword }) => {
    const [role, setRole] = useState("Admin");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [pwdError, setPwdError] = useState("");

    const validatePassword = (pwd) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(pwd)) {
            setPwdError("Password must contain at least 8 characters including uppercase, lowercase, number and special symbol.");
            return false;
        }
        setPwdError("");
        return true;
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute rounded-full subtle-particles" style={{
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        backgroundColor: Math.random() > 0.5 ? '#4DA3FF' : '#8CC7FF',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.3 * 0.85,
                        animation: `float ${Math.random() * 4 + 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`
                    }} />
                ))}
            </div>

            <div className="card-tier-3 p-10 w-full max-w-md animate-fade-up z-10 flex flex-col items-center shadow-2xl relative">
                <div className="absolute -top-12 w-24 h-24 bg-[#4DA3FF]/[0.18] rounded-full blur-3xl"></div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4DA3FF] to-[#8CC7FF] flex items-center justify-center mb-4 relative z-10 block">
                    <Brain className="w-8 h-8 text-gray-900 dark:text-white" />
                </div>
                <h1 className="text-4xl font-extrabold mb-2 text-gradient tracking-tight relative z-10">Hackspace</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium relative z-10">Academic Intelligence Platform</p>

                <div className="flex w-full bg-white/5 p-1 rounded-xl mb-6 relative z-10">
                    {["Admin", "Faculty", "Parent", "Student"].map(r => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${role === r ? "bg-gradient-to-r from-[#4DA3FF] to-[#8CC7FF] text-gray-900 dark:text-white shadow-lg" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-900 dark:text-white"
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                <div className="w-full space-y-4 mb-8 relative z-10">
                    <div>
                        <input type="text" placeholder="Email Address"
                            className="w-full bg-[#0B0B0C]/50 border border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-[#4DA3FF]/30 transition-colors"
                            defaultValue={`demo@academiq.edu`}
                        />
                    </div>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Password"
                            className="w-full bg-[#0B0B0C]/50 border border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 flex items-center pr-10 focus:outline-none focus:border-[#4DA3FF]/30 transition-colors"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value); }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-slate-400 hover:text-gray-900 dark:text-white transition"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {pwdError && <p className="text-red-400 text-xs mt-1">{pwdError}</p>}
                    </div>
                </div>

                <button
                    onClick={() => { if (!pwdError && password) onLogin(role.toLowerCase()); }}
                    disabled={!!pwdError || !password}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.transition = 'all 0.25s ease'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(77,163,255,0.16)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.boxShadow = 'none'; }} className={`w-full ${pwdError || !password ? 'bg-gray-600 opacity-60' : 'btn-gradient'} py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 relative z-10 mb-3`}
                >
                    Login <ChevronRight className="w-5 h-5" />
                </button>
                <button
                    onClick={() => { }}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-xl transition border border-slate-600 z-10 relative mb-2"
                >
                    Sign Up
                </button>
                <button
                    type="button"
                    className="text-sm text-blue-400 hover:text-blue-300 mt-2 text-center transition z-10 relative"
                    onClick={onForgotPassword}
                >
                    Forgot Password?
                </button>
            </div>

            <div className="absolute bottom-8 text-sm text-gray-500 font-medium tracking-widest uppercase">
                Powered by Predictive AI
            </div>
        </div>
    );
};

const AdminDashboard = ({ students, onNavigate, currentStudentId, animatedStats, adminLoading, can, role }) => {
    const [loading, setLoading] = useState(false);

    const handleSync = async () => {
        setLoading(true);
        try {
            const formattedData = students.map(s => {
                // Approximate mapping to required AI columns
                return {
                    "student_id": s.id,
                    "student_name": s.name,
                    "Age at enrollment": 18 + (s.sem / 2),
                    "Gender": s.socioEconomic?.genderRiskFlag ? 1 : 0,
                    "Tuition fees up to date": s.financial?.feeStatus === "Paid" ? 1 : 0,
                    "Scholarship holder": s.financial?.scholarshipEligible ? 1 : 0,
                    "Debtor": s.financial?.feeStatus === "Pending" ? 1 : 0,
                    "Curricular units 1st sem (enrolled)": 6,
                    "Curricular units 1st sem (evaluations)": 6,
                    "Curricular units 1st sem (approved)": s.marks[4] > 50 ? 6 : 4,
                    "Previous qualification": 1,
                    "Application mode": 1,
                    "attendance": s.attendance[4],
                    "internal_1": s.marks[3] / 5, // Normalize 100-scale to 20-scale
                    "internal_2": s.marks[4] / 5
                };
            });

            const response = await fetch("http://127.0.0.1:8000/predict_and_sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData)
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Success! Checked AI predictions and synced ${result.records_synced || formattedData.length} active students to Supabase.`);
            } else {
                alert("Database Sync Failed. Check the backend connection.");
            }
        } catch (err) {
            alert("Backend Connection Error. Please ensure your Python FastAPI server (uvicorn) is running.");
        } finally {
            setLoading(false);
        }
    };

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
            { name: 'Safe', value: safe, color: '#4DA3FF' },
            { name: 'Moderate', value: moderate, color: '#F59E0B' },
            { name: 'High Risk', value: high, color: '#EF4444' }
        ];

        const monthlyAtt = [
            { week: "Week 1", value: 80 },
            { week: "Week 2", value: 68 },
            { week: "Week 3", value: 74 },
            { week: "Week 4", value: 64 }
        ];

        return { high, moderate, safe, avg, deptChart, dropoutData, pieData, monthlyAtt };
    }, [students]);

    return (
        <div className="p-6 animate-page max-w-7xl mx-auto">
            {can('canViewFullAnalytics') ? (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold tracking-wide">Institution Overview</h2>
                        <button
                            onClick={handleSync}
                            disabled={loading}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${loading ? 'bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#4DA3FF] to-[#8CC7FF] text-gray-900 dark:text-white hover:shadow-lg hover:-translate-y-0.5'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
                            {loading ? "Syncing AI Data..." : "Refresh App & Sync Backend"}
                        </button>
                    </div>
                    <div className="header-underline mb-6 -mt-4"></div>

                    <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6">
                        <Card delay={0.1} className="w-full md:w-1/3 min-w-[200px]" style={{
                            animationName: 'staggerFadeUp',
                            animationDuration: '260ms',
                            animationTimingFunction: 'ease-out',
                            animationFillMode: 'both',
                            animationDelay: '0s'
                        }}>
                            <div className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#4DA3FF]" /> Total Students
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{TOTAL_STUDENTS}</div>
                        </Card>

                        <Card delay={0.2} className="w-full md:w-1/4 risk-pulse relative overflow-hidden bg-[#EF4444]/5 border-[#EF4444]/20" style={{
                            animationName: 'staggerFadeUp',
                            animationDuration: '260ms',
                            animationTimingFunction: 'ease-out',
                            animationFillMode: 'both',
                            animationDelay: '0.06s'
                        }}
                            onClick={() => onNavigate('faculty')}>
                            <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#EF4444]/20 rounded-full blur-xl"></div>
                            <div className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-[#EF4444]" /> High Risk Count
                            </div>
                            <div className="text-4xl font-bold text-[#EF4444]">{data.high}</div>
                            <div className="text-xs text-[#F87171] mt-2">+2 since last week</div>
                        </Card>

                        <Card delay={0.3} className="w-full md:w-1/5 bg-[#F59E0B]/5 border-[#F59E0B]/20" style={{
                            animationName: 'staggerFadeUp',
                            animationDuration: '260ms',
                            animationTimingFunction: 'ease-out',
                            animationFillMode: 'both',
                            animationDelay: '0.12s'
                        }}
                            onClick={() => onNavigate('interventions')}>
                            <div className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-[#4DA3FF]" /> Interventions
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">8</div>
                            <div className="text-xs text-[#4DA3FF] mt-2">4 pending review</div>
                        </Card>

                        <Card delay={0.4} className="w-full md:w-1/4" style={{
                            animationName: 'staggerFadeUp',
                            animationDuration: '260ms',
                            animationTimingFunction: 'ease-out',
                            animationFillMode: 'both',
                            animationDelay: '0.18s'
                        }}>
                            <div className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                                <Brain className="w-4 h-4 text-[#8CC7FF]" /> Avg Risk Score
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{data.avg}</div>
                            <div className="text-xs text-[#8CC7FF] mt-2 opacity-80">Overall stability</div>
                        </Card>
                    </div>

                    {role === "ADMIN" && (
                        <Card className="w-full mb-6 px-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 }}>
                            <div className="flex flex-row justify-between items-start mb-4 px-2">
                                <h3 className="text-lg font-semibold">Monthly Attendance Trend (All Students)</h3>
                                <div style={{ color: '#EF4444', fontSize: '12px' }}>
                                    ↓ Attendance dropped 16% this month
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={220}>
                                <LineChart data={data.monthlyAtt} margin={{ top: 10, right: 30, left: 30, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                                    <XAxis dataKey="week" stroke="#8CC7FF" tick={{ fill: (document.documentElement.classList.contains('dark')) ? "#9ca3af" : "#6b7280" }} tickMargin={10} axisLine={false} tickLine={false} />
                                    <YAxis domain={[60, 85]} stroke="#8CC7FF" tick={{ fill: (document.documentElement.classList.contains('dark')) ? "#9ca3af" : "#6b7280" }} axisLine={false} tickLine={false} />
                                    <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="value" stroke="#4DA3FF" strokeWidth={3} dot={{ r: 4, fill: '#8CC7FF', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#8CC7FF' }} label={{ position: 'top', fill: '#8CC7FF', fontSize: 12, formatter: (value) => `${value}%` }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    )}

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-[60%] space-y-6">
                            <Card tier={2} delay={0.5} className="h-80 flex flex-col">
                                <h3 className="text-lg font-semibold mb-4 px-2">Department Risk Profile (Avg Score)</h3>
                                <div className="flex-1 animate-chart">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data.deptChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <CartesianGrid stroke="#1E2A3A" strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" stroke="#4A5568" tick={{ fill: (document.documentElement.classList.contains('dark')) ? "#9ca3af" : "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                                            <YAxis stroke="#4A5568" tick={{ fill: (document.documentElement.classList.contains('dark')) ? "#9ca3af" : "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                                            <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                            <Bar dataKey="limit" radius={[4, 4, 0, 0]}>
                                                {data.deptChart.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.limit > 60 ? '#EF4444' : entry.limit > 40 ? '#F59E0B' : '#4DA3FF'} />
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
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Total</span>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-4 mt-2 px-4 pb-2">
                                    {data.pieData.map((d, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{d.name} <span className="font-bold text-gray-900 dark:text-white ml-1">{d.value}</span></span>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card tier={2} delay={0.8} className="flex-1 h-64 overflow-y-auto">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-[#FBBF24]" /> Recent Alerts</h3>
                                <div className="space-y-4">
                                    <div className="animate-fade-up relative pl-4 border-l-2 border-[#EF4444]" style={{ animationDelay: '0.9s' }}>
                                        <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,1)]"></div>
                                        <p className="text-sm font-medium">Aryan Mehta crossed HIGH RISK threshold</p>
                                        <p className="text-xs text-gray-500">2 min ago</p>
                                    </div>
                                    <div className="animate-fade-up relative pl-4 border-l-2 border-[#EF4444]" style={{ animationDelay: '1.0s' }}>
                                        <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,1)]"></div>
                                        <p className="text-sm font-medium">Rehan Shaikh marked 3rd behavioral incident</p>
                                        <p className="text-xs text-gray-500">1 hour ago</p>
                                    </div>
                                    <div className="animate-fade-up relative pl-4 border-l-2 border-[#4DA3FF]" style={{ animationDelay: '1.1s' }}>
                                        <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#4DA3FF] shadow-[0_0_8px_rgba(77,163,255,1)]"></div>
                                        <p className="text-sm font-medium">Kavya Nair shows strong recovery trend</p>
                                        <p className="text-xs text-gray-500">3 hours ago</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                </>
            ) : (
                <div style={{ padding: '32px 0' }}>
                    <div style={{ fontFamily: 'Syne', fontSize: 18, color: '#fff', marginBottom: 8 }}>
                        My Academic Overview
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans', marginBottom: 28 }}>
                        Showing your personal metrics only
                    </div>
                    {(() => {
                        const self = students.find(s => s.id === currentStudentId);
                        if (!self) return null;
                        const score = self.riskScore || calculateRiskScore(self).score;
                        const level = self.riskLevel || calculateRiskScore(self).level;
                        return (
                            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                                {[
                                    { label: 'Risk Score', value: score, color: level === 'HIGH' ? '#EF4444' : level === 'MODERATE' ? '#F59E0B' : '#4DA3FF' },
                                    { label: 'Attendance', value: self.attendance[4] + '%', color: '#4DA3FF' },
                                    { label: 'Last Test Score', value: self.marks[4], color: 'rgba(255,255,255,0.8)' }
                                ].map((stat, i) => (
                                    <div key={i} style={{
                                        flex: '1 1 140px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(77,163,255,0.16)',
                                        borderRadius: 14, padding: '20px',
                                        animationName: 'staggerFadeUp',
                                        animationDuration: '260ms',
                                        animationTimingFunction: 'ease-out',
                                        animationFillMode: 'both',
                                        animationDelay: `${i * 0.08}s`
                                    }}>
                                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans', letterSpacing: '0.4px', marginBottom: 10 }}>
                                            {stat.label}
                                        </div>
                                        <div style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 700, color: stat.color }}>
                                            {stat.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            )}

            {can('canViewFullAnalytics') && (
                <>
                    <div style={{
                        marginTop: 48,
                        animationName: 'staggerFadeUp',
                        animationDuration: '300ms',
                        animationTimingFunction: 'ease-out',
                        animationFillMode: 'both',
                        animationDelay: '0.20s'
                    }}>
                        <div style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                            Education Impact Metrics
                        </div>
                        <div style={{ height: 2, borderRadius: 1, background: 'linear-gradient(90deg, #C5192D, transparent)', width: 0, animation: 'expandLine 1s 0.2s ease forwards', marginTop: 8 }}></div>

                        <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
                            <Card tier={1} className="flex-1 min-w-[200px]" style={{ borderLeft: '3px solid #4DA3FF' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}>
                                    <TrendingDownIcon size={20} color="#4DA3FF" /> Projected Dropout Reduction
                                </div>
                                <div style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 600, color: '#8CC7FF', letterSpacing: 0.3, marginBottom: 4 }}>34%</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>vs. pre-intervention baseline</div>
                            </Card>

                            <Card tier={1} className="flex-1 min-w-[200px]" style={{ borderLeft: '3px solid #4DA3FF' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}>
                                    <Users size={20} color="#4DA3FF" /> Stabilized This Quarter
                                </div>
                                <div style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 600, color: '#8CC7FF', letterSpacing: 0.3, marginBottom: 4 }}>8 Students</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>Moved from HIGH/MODERATE → SAFE</div>

                                <div style={{ display: 'flex' }}>
                                    {students.slice(0, 8).map((s, i) => (
                                        <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(77,163,255,0.18)', border: '1px solid rgba(77,163,255,0.3)', fontSize: 8, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: i === 0 ? 0 : -6 }}>
                                            {s.name[0]}
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card tier={1} className="flex-1 min-w-[200px]" style={{ borderLeft: '3px solid #8CC7FF' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}>
                                    <BarChart2 size={20} color="#8CC7FF" /> Retention Improvement
                                </div>
                                <div style={{ fontFamily: 'Syne', fontSize: 28, color: '#8CC7FF', marginBottom: 4 }}>+18.6%</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>Semester-over-semester growth</div>
                            </Card>


                        </div>

                        <div style={{ marginTop: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '20px 24px' }}>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Hackspace Target Progress — Institution Level</div>



                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                                    <span>Dropout Prevention Effectiveness</span>
                                    <span style={{ fontWeight: 600, color: '#4ade80' }}>86.28%</span>
                                </div>
                                <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', width: '100%' }}>
                                    <div style={{ height: 8, borderRadius: 4, background: '#4ade80', width: '86.28%', transition: 'width 1s ease 0.3s' }}></div>
                                </div>
                            </div>


                        </div>
                    </div>
                </>
            )
            }
            <Footer />
        </div >
    );
};

const ParentDashboard = ({ students }) => {
    // Determine the child mapped to this parent. 
    // In a real application, you'd match by parentId. 
    // Since mock data lacks parentId, we gracefully pick the first student for demonstration.
    const child = students[0];
    const risk = calculateRiskScore(child);

    // Formatted metric blocks
    const attendancePercent = child.attendance[4];
    const avgScore = Math.round(child.marks.reduce((a, b) => a + b, 0) / child.marks.length);

    // Recent Performance Data formatting
    const performanceData = child.marks.map((m, i) => ({ term: `T${i + 1}`, score: m }));

    return (
        <div className="p-6 animate-page max-w-7xl mx-auto">
            <HeaderUnderline title={`Parent Portal - ${child.name}`} />

            {/* High Risk Banner Alert */}
            {risk.level === "HIGH" && (
                <div className="bg-red-900/30 border border-red-500 text-red-300 rounded-lg p-4 mb-6 animate-fade-up">
                    <div className="flex items-center gap-2 font-bold mb-1">
                        <AlertTriangle className="w-5 h-5" />
                        Attention Required
                    </div>
                    ⚠ Your child may be at academic risk. Suggested intervention recommended.
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. Student Attendance Card */}
                <Card tier={1} delay={0.1} className="flex flex-col">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold text-sm mb-4">
                        <Clock className="w-5 h-5 text-[#4DA3FF]" /> Attendance Overview
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="text-5xl font-extrabold text-[#4DA3FF] mb-2">{attendancePercent}%</div>
                        <div className="text-sm text-gray-500">Overall Attendance</div>

                        <div className="mt-6 space-y-3">
                            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                <span className="text-gray-600 dark:text-gray-400">Classes Attended</span>
                                <span className="text-gray-900 dark:text-white font-bold">{Math.round((attendancePercent / 100) * 40)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Classes Missed</span>
                                <span className="text-gray-900 dark:text-white font-bold">{40 - Math.round((attendancePercent / 100) * 40)}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 2. Academic Performance Card */}
                <Card tier={2} delay={0.2} className="flex flex-col">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold text-sm mb-4">
                        <Star className="w-5 h-5 text-[#F59E0B]" /> Academic Performance
                    </div>

                    <div className="flex items-baseline gap-2 mb-4">
                        <div className="text-4xl font-bold text-gray-900 dark:text-white">{avgScore}</div>
                        <div className="text-xs text-gray-500 font-medium">Avg Marks</div>
                    </div>

                    <div className="h-24 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performanceData}>
                                <Line type="monotone" dataKey="score" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3, fill: '#F59E0B' }} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: (document.documentElement.classList.contains('dark')) ? '#10293F' : '#ffffff', border: (document.documentElement.classList.contains('dark')) ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e7eb', color: (document.documentElement.classList.contains('dark')) ? '#ffffff' : '#111827' }}
                                    formatter={(val) => [`${val} Marks`, 'Score']}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-semibold">Latest Subjects</div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-700 dark:text-gray-300">Mathematics</span>
                            <span className="text-gray-900 dark:text-white font-bold">78/100</span>
                        </div>
                    </div>
                </Card>

                {/* 3. Risk Prediction Card */}
                <Card tier={3} delay={0.3} className="flex flex-col">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold text-sm mb-4">
                        <Shield className="w-5 h-5 text-indigo-400" /> Academic Health
                    </div>

                    <div className="text-center flex-1 flex flex-col justify-center items-center py-4">
                        {/* Dynamic Health Circle */}
                        <div className="w-32 h-32 rounded-full border-[6px] flex items-center justify-center mb-4 relative shadow-lg"
                            style={{
                                borderColor: risk.level === "SAFE" ? "#4ade80" : risk.level === "MODERATE" ? "#F59E0B" : "#EF4444",
                                backgroundColor: risk.level === "SAFE" ? "rgba(74, 222, 128, 0.1)" : risk.level === "MODERATE" ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.1)"
                            }}>
                            <div className="text-3xl font-extrabold" style={{ color: risk.level === "SAFE" ? "#4ade80" : risk.level === "MODERATE" ? "#F59E0B" : "#EF4444" }}>
                                {risk.score}
                            </div>
                        </div>

                        <div className="text-lg font-bold" style={{ color: risk.level === "SAFE" ? "#4ade80" : risk.level === "MODERATE" ? "#F59E0B" : "#EF4444" }}>
                            {risk.level === "SAFE" ? "Low Risk" : risk.level === "MODERATE" ? "Medium Risk" : "High Risk"}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Prediction Engine Score</div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const FacultyDashboard = ({ students, onSelectStudent, can, currentStudentId, openStudentDetail }) => {
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

            {can('canViewAllStudents') ? (
                <>
                    <div className="flex flex-wrap gap-4 mb-6 items-center w-full pl-4">
                        <div className="relative flex-1 min-w-[250px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 w-5 h-5" />
                            <input
                                type="text" placeholder="Search by name or ID..."
                                value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full bg-[#0B0B0C]/60 border border-gray-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-[#4DA3FF]/50 transition-colors backdrop-blur-md"
                            />
                        </div>

                        <div className="flex gap-2">
                            {["All", "HIGH", "MODERATE", "SAFE"].map(r => (
                                <button key={r} onClick={() => setFilterRisk(r)}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filterRisk === r ? 'bg-white/10 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-white/5'
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
                                    <tr className="border-b border-white/5 text-gray-500 dark:text-gray-600 dark:text-gray-400 text-sm">
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
                                                    e.currentTarget.style.background = 'rgba(77,163,255,0.04)';
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
                                                            style={getBadgeStyle(s.risk.level)}>
                                                            {s.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{s.name}</div>
                                                            <div className="text-xs text-gray-500">{s.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-gray-700 dark:text-gray-300">{s.dept}</td>
                                                <td className="p-4 text-center text-gray-700 dark:text-gray-300">{s.sem}</td>
                                                <td className="p-4 text-center">
                                                    <div className="inline-block px-3 py-1 rounded-full risk-cell font-bold"
                                                        style={getBadgeStyle(s.risk.level)}>
                                                        {s.risk.score}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${isHigh ? 'risk-pulse' : ''}`}
                                                        style={getBadgeStyle(s.risk.level)}>
                                                        {s.risk.level}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    {s.risk.trend === 'declining' && <TrendingDown className="w-5 h-5 mx-auto text-[#EF4444]" />}
                                                    {s.risk.trend === 'improving' && <TrendingUp className="w-5 h-5 mx-auto text-[#4DA3FF]" />}
                                                    {s.risk.trend === 'stable' && <Minus className="w-5 h-5 mx-auto text-gray-600 dark:text-gray-400" />}
                                                    {s.risk.trend === 'mixed' && <Activity className="w-5 h-5 mx-auto text-[#F59E0B]" />}
                                                </td>
                                                <td className="p-4 text-center align-middle">
                                                    <button
                                                        onClick={() => openStudentDetail && openStudentDetail(s) || onSelectStudent && onSelectStudent(s)}
                                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.transition = 'all 0.25s ease'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(77,163,255,0.16)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.boxShadow = 'none'; }} className="action-btn px-4 py-1.5 btn-gradient rounded-lg text-sm font-bold text-gray-900 dark:text-white shadow-md mx-auto inline-block opacity-0 transition-opacity"
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
                </>
            ) : (
                <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 0' }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans', marginBottom: 16, letterSpacing: '0.3px' }}>YOUR PROFILE</div>
                    {(() => {
                        const self = students.find(s => s.id === currentStudentId);
                        if (!self) return null;
                        const score = self.riskScore || calculateRiskScore(self).score;
                        const level = self.riskLevel || calculateRiskScore(self).level;
                        return (
                            <div
                                onClick={() => openStudentDetail && openStudentDetail(self) || onSelectStudent && onSelectStudent(self)}
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(77,163,255,0.18)', borderRadius: 16, padding: '20px 24px', cursor: 'pointer', transition: 'all 0.25s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.35),0 0 0 1px rgba(77,163,255,0.14)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <div style={{ fontFamily: 'Syne', fontSize: 16, color: '#fff', marginBottom: 4 }}>{self.name}</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans' }}>{self.dept} · Semester {self.sem}</div>
                                <div style={{ marginTop: 12, fontSize: 12, color: level === 'HIGH' ? '#EF4444' : level === 'MODERATE' ? '#F59E0B' : '#4DA3FF' }}>Risk Score: {score}</div>
                            </div>
                        );
                    })()}
                </div>
            )}
            <Footer />
        </div>
    );
};

const StudentDetail = ({ student, onBack, onInterventionReq, skeletonLoading, displayScore, showToast }) => {

    const risk = useMemo(() => calculateRiskScore(student), [student]);
    const color = getLevelColor(risk.level);
    const isHigh = risk.level === "HIGH";
    const isSafe = risk.level === "SAFE";

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = skeletonLoading ? circumference : circumference - (displayScore / 100) * circumference;

    const shapData = [
        { factor: 'Attendance', value: risk.breakdown.attendance, type: 'attendance' },
        { factor: 'Recent Marks', value: risk.breakdown.marks, type: 'marks' },
        { factor: 'LMS Inactivity', value: risk.breakdown.lms, type: 'lms' },
        { factor: 'Assignments', value: risk.breakdown.assignments, type: 'assignments' },
        { factor: 'Co-curriculars', value: -risk.breakdown.competitions, type: 'safe' }
    ].filter(d => d.value !== 0).sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

    const attData = student.attendance.map((v, i) => ({ week: `W${i + 1}`, val: v }));
    const marksData = student.marks.map((v, i) => ({ test: `T${i + 1}`, val: v }));

    return (
        <div className="p-6 animate-page max-w-7xl mx-auto pb-20">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5" /> Back to Students
            </button>

            {skeletonLoading ? (
                <div style={{ opacity: 1, transition: 'opacity 200ms ease' }}>
                    <div style={{ display: 'flex', gap: 20, marginBottom: 32 }}>
                        <div className="skeleton-block" style={{ width: 72, height: 72, borderRadius: 36 }} />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div className="skeleton-block" style={{ width: '40%', height: 18, borderRadius: 6 }} />
                            <div className="skeleton-block" style={{ width: '25%', height: 13, borderRadius: 6 }} />
                        </div>
                    </div>
                    <div className="skeleton-block" style={{ width: 180, height: 180, borderRadius: 90, margin: '0 auto 32px' }} />
                    {[1, 2, 3].map(i => (
                        <div key={i} className="skeleton-block" style={{ width: '100%', height: 96, borderRadius: 16, marginBottom: 16 }} />
                    ))}
                </div>
            ) : (
                <div style={{ opacity: skeletonLoading ? 0 : 1, transition: 'opacity 250ms ease' }}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 relative">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-3xl bg-[#0B0B0C] shadow-2xl relative"
                                style={{ border: `3px solid ${isSafe ? 'rgba(77,163,255,0.26)' : isHigh ? '#F59E0B' : color}`, color: color }}>
                                {student.name.split(' ').map(n => n[0]).join('')}
                                {isHigh && <div className="absolute inset-0 rounded-full blur-md opacity-50" style={{ backgroundColor: color }}></div>}
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold mb-2 tracking-tight flex items-center">{student.name}</h1>
                                <div className="flex gap-3 text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">ID: <span className="text-gray-900 dark:text-white font-medium">{student.id}</span></span>
                                    <span className="px-2 py-0.5 rounded bg-white/10 text-gray-700 dark:text-gray-300 font-medium">{student.dept}</span>
                                    <span className="px-2 py-0.5 rounded bg-white/10 text-gray-700 dark:text-gray-300 font-medium">Sem {student.sem}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-end gap-6 ml-auto">
                            <div className="text-right">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Faculty Advisor</div>
                                <div className="font-semibold">{student.facultyAdvisor}</div>
                                <div className="text-xs text-gray-500 mt-1">Prev GPA: {student.prevGPA}</div>
                            </div>

                            <div className={`px-6 py-3 rounded-2xl border-2 shadow-lg flex items-center justify-center font-extrabold text-xl tracking-wider ${isHigh ? 'risk-pulse' : ''}`}
                                style={{ borderColor: isSafe ? 'rgba(77,163,255,0.24)' : color, color: color, backgroundColor: isSafe ? 'rgba(77,163,255,0.10)' : `${color}15`, textShadow: isSafe ? 'none' : `0 0 10px ${color}` }}>
                                {risk.level} RISK
                            </div>
                        </div>
                    </div>

                    <HeaderUnderline title="Risk Intelligence" />
                    <div className="flex flex-col lg:flex-row gap-6 mb-8">
                        <Card tier={3} delay={0.1} className="w-full lg:w-1/3 flex flex-col items-center justify-center py-8 relative overflow-hidden">
                            {isHigh && <div className="risk-meter-glow-high"></div>}
                            {isSafe && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(77,163,255,0.13)_0%,transparent_70%)] pointer-events-none"></div>}

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
                                    <div className="text-5xl font-black" style={{ color: isHigh ? '#F59E0B' : color, textShadow: isHigh ? '0 0 25px rgba(245,158,11,0.25)' : 'none' }}>
                                        {displayScore}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 font-bold tracking-widest uppercase mt-1">Score</div>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <div className="text-xl font-bold mb-2" style={{ color: color }}>{risk.level}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 px-4">
                                    Multi-dimensional analysis based on attendance, academics, behavior, and engagement.
                                </div>
                            </div>
                        </Card>

                        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card tier={2} delay={0.2} className="h-48 flex flex-col">
                                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Attendance Trend</h3>
                                <div className="flex-1 -ml-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={attData}>
                                            <CartesianGrid stroke="#1E2A3A" strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="week" stroke="#4A5568" tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                            <RechartsTooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="val" stroke="#4DA3FF" strokeWidth={3} dot={{ r: 4, fill: '#4DA3FF', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            <Card tier={2} delay={0.3} className="h-48 flex flex-col">
                                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Academic Performance</h3>
                                <div className="flex-1 -ml-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={marksData}>
                                            <CartesianGrid stroke="#1E2A3A" strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="test" stroke="#4A5568" tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                            <RechartsTooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="val" stroke="#4DA3FF" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6, fill: "#8CC7FF" }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            <Card tier={2} delay={0.4} className="h-40 flex flex-col justify-center text-center">
                                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">LMS Engagement</h3>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {Math.round((student.lmsLogins[3] + student.lmsLogins[4]) / 2)}
                                    <span className="text-sm text-gray-500 font-normal ml-2">logins/week</span>
                                </div>
                            </Card>

                            <Card tier={2} delay={0.5} className="h-40 flex flex-col justify-center text-center">
                                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Behavior & Delays</h3>
                                <div className="flex justify-around items-center w-full px-4 mt-2">
                                    <div>
                                        <div className="text-2xl font-bold text-[#F59E0B]">{student.assignmentDelays}</div>
                                        <div className="text-xs text-gray-500">Late Subs</div>
                                    </div>
                                    <div className="w-px h-10 bg-white/10"></div>
                                    <div>
                                        <div className="text-2xl font-bold text-[#EF4444]">{student.behaviorIncidents}</div>
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
                                                <Cell key={`cell-${index}`} fill={entry.type === 'attendance' ? '#F59E0B' : entry.type === 'marks' ? '#F59E0B' : entry.type === 'lms' ? '#8CC7FF' : entry.type === 'assignments' ? '#4DA3FF' : '#34D399'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 pr-4">
                                {shapData.map((d, i) => (
                                    <div key={i} className="flex items-start gap-3 animate-fade-up" style={{ animationDelay: `${0.7 + i * 0.1}s` }}>
                                        <div className="mt-0.5">
                                            {d.type === 'risk' ? <TrendingDown className="w-5 h-5 text-[#EF4444]" /> : <TrendingUp className="w-5 h-5 text-[#4DA3FF]" />}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{d.factor}</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
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
                        <div style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 600, letterSpacing: 0.3, marginBottom: 8 }}>💰 Financial Risk Index</div>
                        <div style={{ height: 2, borderRadius: 1, background: 'linear-gradient(90deg, #4DA3FF, transparent)', width: 0, animation: 'expandLine 1s 0.2s ease forwards', marginBottom: 24 }}></div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                            <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.05)', paddingRight: 16 }}>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Fee Status</div>
                                <span style={{
                                    background: student.financial.feeStatus === "Paid" ? 'rgba(16,185,129,0.12)' : student.financial.feeStatus === "Pending" ? 'rgba(239,68,68,0.12)' : 'rgba(77,163,255,0.12)',
                                    border: `1px solid ${student.financial.feeStatus === "Paid" ? 'rgba(16,185,129,0.3)' : student.financial.feeStatus === "Pending" ? 'rgba(239,68,68,0.3)' : 'rgba(77,163,255,0.3)'}`,
                                    color: student.financial.feeStatus === "Paid" ? '#4DA3FF' : student.financial.feeStatus === "Pending" ? '#EF4444' : '#4DA3FF',
                                    borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 500, display: 'inline-block'
                                }}>
                                    {student.financial.feeStatus}
                                </span>
                            </div>
                            <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.05)', paddingRight: 16 }}>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Financial Vulnerability</div>
                                <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, width: '100%', marginBottom: 4 }}>
                                    <div style={{
                                        height: 6, borderRadius: 3, width: `${student.financial.vulnerabilityScore}%`,
                                        background: 'linear-gradient(90deg, #F59E0B, #FFD166)',
                                        transition: 'width 1s ease 0.3s'
                                    }}></div>
                                </div>
                                <div style={{ textAlign: 'right', fontSize: 13, color: student.financial.vulnerabilityScore <= 30 ? '#4DA3FF' : student.financial.vulnerabilityScore <= 60 ? '#F59E0B' : '#EF4444' }}>
                                    {student.financial.vulnerabilityScore}
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Scholarship Status</div>
                                {student.financial.scholarshipEligible ? (
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#4DA3FF', fontSize: 13 }}><CheckCircle2 size={14} color="#4DA3FF" /> Eligible</div>
                                        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{student.financial.scholarshipType}</div>
                                    </div>
                                ) : (
                                    <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>Not Eligible</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Panel B: Socio-Economic Profile */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: 20, padding: 24, marginBottom: 24 }}>
                        <div style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 600, letterSpacing: 0.3, marginBottom: 8 }}>🏘️ Socio-Economic Profile</div>
                        <div style={{ height: 2, borderRadius: 1, background: 'linear-gradient(90deg, #4DA3FF, transparent)', width: 0, animation: 'expandLine 1s 0.2s ease forwards', marginBottom: 24 }}></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Wallet size={16} />
                                <div>
                                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>Parent Income</div>
                                    <div style={{
                                        fontSize: 13,
                                        color: student.socioEconomic.parentIncomeBracket === "Below 1L" ? '#EF4444' : student.socioEconomic.parentIncomeBracket === "1L-3L" ? '#F59E0B' : student.socioEconomic.parentIncomeBracket === "3L-6L" ? 'rgba(255,255,255,0.7)' : '#4DA3FF'
                                    }}>{student.socioEconomic.parentIncomeBracket}</div>
                                </div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <MapPin size={16} />
                                <div>
                                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>Location</div>
                                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
                                        {student.socioEconomic.location === "Rural" && <span style={{ width: 6, height: 6, borderRadius: 3, background: '#F59E0B', display: 'inline-block', marginRight: 6 }}></span>}
                                        {student.socioEconomic.location}
                                    </div>
                                </div>
                            </div>
                            {student.socioEconomic.firstGenerationLearner ? (
                                <div style={{ gridColumn: 'span 2', background: 'rgba(77,163,255,0.07)', border: '1px solid rgba(77,163,255,0.20)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <Star size={16} color="#4DA3FF" />
                                    <div>
                                        <div style={{ color: '#4DA3FF', fontWeight: 600, fontSize: 13 }}>First-Generation Learner</div>
                                        <div style={{ fontSize: 11, color: 'rgba(77,163,255,0.45)' }}>Eligible for additional institutional support</div>
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
                        border: `1px solid ${isHigh ? 'rgba(239,68,68,0.25)' : risk.level === "MODERATE" ? 'rgba(245,158,11,0.2)' : 'rgba(77,163,255,0.15)'}`,
                        backdropFilter: 'blur(20px)', borderRadius: 20, padding: 24, marginBottom: 24
                    }}>
                        <div style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 600, letterSpacing: 0.3, marginBottom: 8 }}>⏱️ Dropout Risk Prediction</div>
                        <div style={{ height: 2, borderRadius: 1, background: 'linear-gradient(90deg, #4DA3FF, transparent)', width: 0, animation: 'expandLine 1s 0.2s ease forwards', marginBottom: 24 }}></div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                            <div style={{ flex: '0 0 60%' }}>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Projected Dropout Risk Window</div>
                                <div style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 700, color: color }}>
                                    {student.dropoutRiskWindow}
                                </div>
                                <div style={{
                                    fontSize: 12, marginTop: 4,
                                    color: isHigh ? 'rgba(239,68,68,0.8)' : risk.level === "MODERATE" ? 'rgba(245,158,11,0.8)' : 'rgba(77,163,255,0.8)'
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
                                            boxShadow: isSafe ? 'none' : '0 0 18px rgba(77,163,255,0.15)'
                                        }}></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ flex: '0 0 40%' }}>
                                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Confidence Level</div>
                                    <div style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 600, color: '#8CC7FF', letterSpacing: 0.3 }}>
                                        {isHigh ? '87%' : risk.level === "MODERATE" ? '71%' : '94%'}
                                    </div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>Model accuracy</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>Based on 6-dimension analysis</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel D: Stress Score */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: 20, padding: 24, marginBottom: 24 }}>
                        <div style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 600, letterSpacing: 0.3, marginBottom: 8 }}>🧠 Stress Score</div>
                        <div style={{ height: 2, borderRadius: 1, background: 'linear-gradient(90deg, #4DA3FF, transparent)', width: 0, animation: 'expandLine 1s 0.2s ease forwards', marginBottom: 24 }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Mental Stress Index</div>
                            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Syne', color: (typeof student.mentalHealth === 'object' ? student.mentalHealth.behavioralStressIndex : student.mentalHealth) <= 40 ? '#34D399' : (typeof student.mentalHealth === 'object' ? student.mentalHealth.behavioralStressIndex : student.mentalHealth) <= 70 ? '#F59E0B' : '#EF4444' }}>
                                {typeof student.mentalHealth === 'object' ? student.mentalHealth.behavioralStressIndex : student.mentalHealth} / 100
                            </div>
                            <div style={{ fontSize: 13, color: (typeof student.mentalHealth === 'object' ? student.mentalHealth.behavioralStressIndex : student.mentalHealth) <= 40 ? '#34D399' : (typeof student.mentalHealth === 'object' ? student.mentalHealth.behavioralStressIndex : student.mentalHealth) <= 70 ? '#F59E0B' : '#EF4444', fontWeight: 500 }}>
                                {(typeof student.mentalHealth === 'object' ? student.mentalHealth.behavioralStressIndex : student.mentalHealth) <= 40 ? 'Low Stress' : (typeof student.mentalHealth === 'object' ? student.mentalHealth.behavioralStressIndex : student.mentalHealth) <= 70 ? 'Moderate Stress' : 'High Stress'}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 relative">
                        <HeaderUnderline title="⚡ Active Interventions" />
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                            {isHigh ? (
                                <>
                                    <Card tier={2} delay={0.7} className="min-w-[280px] snap-center border-l-4 border-l-[#EF4444] flex-shrink-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="w-10 h-10 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
                                                <Users className="w-5 h-5 text-[#EF4444]" />
                                            </div>
                                            <span className="px-2 py-1 rounded bg-[#EF4444]/20 text-[#F87171] text-xs font-bold">URGENT</span>
                                        </div>
                                        <div className="font-bold text-lg mb-1">Parent Meeting</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Schedule immediate call with parents regarding attendance drop.</div>
                                    </Card>
                                </>
                            ) : risk.level === "MODERATE" ? (
                                <Card tier={2} delay={0.7} className="min-w-[280px] snap-center border-l-4 border-l-[#F59E0B] flex-shrink-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-[#F59E0B]" />
                                        </div>
                                    </div>
                                    <div className="font-bold text-lg mb-1">Remedial Classes</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Provide structured study plan for core subjects.</div>
                                </Card>
                            ) : (
                                <Card tier={2} delay={0.7} className="min-w-[280px] snap-center border-l-4 border-l-[#4DA3FF] flex-shrink-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="w-10 h-10 rounded-full bg-[#4DA3FF]/[0.18] flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5 text-[#4DA3FF]" />
                                        </div>
                                    </div>
                                    <div className="font-bold text-lg mb-1">General Monitoring</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Student is performing well. Maintain standard check-ins.</div>
                                </Card>
                            )}
                        </div>
                        <button onClick={onInterventionReq} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.transition = 'all 0.25s ease'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(77,163,255,0.16)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.boxShadow = 'none'; }} className="mt-6 btn-gradient px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                            <Zap className="w-5 h-5" /> Trigger New Intervention
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};


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
                    <div className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-gray-900 dark:text-white" /> Total Logged
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{interventions.length}</div>
                </Card>
                <Card delay={0.2} className="flex-1 min-w-[150px] border-[#F59E0B]/30" style={{
                    animationName: 'staggerFadeUp',
                    animationDuration: '260ms',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'both',
                    animationDelay: '0.06s'
                }}>
                    <div className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#F59E0B]" /> Pending
                    </div>
                    <div className="text-3xl font-bold text-[#F59E0B]">{pending}</div>
                </Card>
                <Card delay={0.3} className="flex-1 min-w-[150px] border-[#4DA3FF]/30" style={{
                    animationName: 'staggerFadeUp',
                    animationDuration: '260ms',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'both',
                    animationDelay: '0.12s'
                }}>
                    <div className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#4DA3FF]" /> Active
                    </div>
                    <div className="text-3xl font-bold text-[#4DA3FF]">{active}</div>
                </Card>
                <Card delay={0.4} className="flex-1 min-w-[150px] border-[#4DA3FF]/30" style={{
                    animationName: 'staggerFadeUp',
                    animationDuration: '260ms',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'both',
                    animationDelay: '0.18s'
                }}>
                    <div className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#4DA3FF]" /> Completed
                    </div>
                    <div className="text-3xl font-bold text-[#4DA3FF]">{complete}</div>
                </Card>
            </div>

            <Card tier={2} delay={0.5} className="p-0 overflow-hidden">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="border-b border-white/5 text-gray-600 dark:text-gray-400 text-sm">
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
                                                style={{ borderColor: risk.level === "SAFE" ? 'rgba(77,163,255,0.26)' : color, color: color }}>
                                                {s.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="font-bold text-gray-900 dark:text-white">{s.name}</div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-xs font-bold" style={{ color: color }}>{risk.level}</div>
                                    </td>
                                    <td className="p-4 font-medium">{inv.type}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">{inv.assigned}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">{inv.date}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${inv.status === "PENDING" ? "text-[#F59E0B] border-[#F59E0B]/20 bg-[#F59E0B]/10" : inv.status === "ACTIVE" ? "text-[#4DA3FF] border-[#4DA3FF]/[0.18] bg-[#4DA3FF]/[0.08]" : "text-[#4DA3FF] border-[#4DA3FF]/20 bg-[#4DA3FF]/10"}`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {inv.status !== "COMPLETE" ? (
                                            <button onClick={() => markComplete(inv.id)} className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-1 mx-auto text-gray-900 dark:text-white">
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

const UploadPage = ({ setStudents, showToast, role }) => {
    const isDataset = role === 'ADMIN';

    const createUploadHandler = (type) => (e) => {
        const file = e.target.files[0];
        if (!file || !file.name.endsWith('.csv')) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target.result;
                const lines = text.split('\n').map(l => l.trim()).filter(l => l);
                if (lines.length < 2) return;

                const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

                if (type === 'dataset') {
                    const reqCols = ['id', 'name', 'dept', 'semester', 'riskscore', 'risklevel'];
                    const isValid = reqCols.every(c => headers.includes(c));
                    if (!isValid) return;

                    const newStudents = lines.slice(1).map(line => {
                        const values = line.split(',');
                        const student = {};
                        headers.forEach((h, i) => {
                            student[h] = values[i]?.trim();
                        });

                        return {
                            id: student.id,
                            name: student.name,
                            dept: student.dept,
                            sem: parseInt(student.semester) || 1,
                            attendance: [80, 80, 80, 80, 80],
                            marks: [70, 70, 70, 70, 70],
                            riskScore: parseInt(student.riskscore) || 50,
                            riskLevel: student.risklevel ? student.risklevel.toUpperCase() : 'MODERATE',
                            risk: {
                                score: parseInt(student.riskscore) || 50,
                                level: student.risklevel ? student.risklevel.toUpperCase() : 'MODERATE',
                                trend: 'stable',
                                breakdown: { attendance: 0, marks: 0, lms: 0, assignments: 0, behavior: 0, competitions: 0 }
                            },
                            financialRisk: 50,
                            socioEconomic: 50,
                            mentalHealth: 50
                        };
                    });
                    setStudents(prev => [...prev, ...newStudents]);
                } else if (type === 'attendance') {
                    const reqCols = ['studentid', 'week', 'attendance'];
                    const isValid = reqCols.every(c => headers.includes(c));
                    if (!isValid) return;

                    setStudents(prev => {
                        const newStudents = [...prev];
                        lines.slice(1).forEach(line => {
                            const values = line.split(',');
                            const record = {};
                            headers.forEach((h, i) => {
                                record[h] = values[i]?.trim();
                            });

                            const index = newStudents.findIndex(s => s.id === record.studentid);
                            if (index !== -1) {
                                newStudents[index] = {
                                    ...newStudents[index],
                                    attendance: [...newStudents[index].attendance, parseInt(record.attendance)]
                                };
                            }
                        });
                        return newStudents;
                    });
                } else if (type === 'marks') {
                    const reqCols = ['studentid', 'subject', 'marks'];
                    const isValid = reqCols.every(c => headers.includes(c));
                    if (!isValid) return;

                    setStudents(prev => {
                        const newStudents = [...prev];
                        lines.slice(1).forEach(line => {
                            const values = line.split(',');
                            const record = {};
                            headers.forEach((h, i) => {
                                record[h] = values[i]?.trim();
                            });

                            const index = newStudents.findIndex(s => s.id === record.studentid);
                            if (index !== -1) {
                                newStudents[index] = {
                                    ...newStudents[index],
                                    marks: [...newStudents[index].marks, parseInt(record.marks)]
                                };
                            }
                        });
                        return newStudents;
                    });
                }

                if (showToast) showToast('✓ Data uploaded successfully');
            } catch (err) {
                console.error("CSV Parsing Error:", err);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="p-6 animate-page max-w-7xl mx-auto">
            <HeaderUnderline title={isDataset ? "Upload Student Dataset" : "Upload Academic Data"} />
            <div style={{ maxWidth: 800, margin: '0 auto', marginTop: 40, display: 'flex', flexDirection: isDataset ? 'column' : 'row', gap: 24 }}>
                {isDataset ? (
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(77,163,255,0.18)', borderRadius: 16, padding: 24, flex: 1 }}>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Upload CSV</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            Upload a bulk dataset of student records. Required columns: id, name, dept, semester, riskScore, riskLevel.
                        </p>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={createUploadHandler('dataset')}
                            className="block w-full text-sm text-gray-600 dark:text-gray-400
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-xl file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-[#4DA3FF]/10 file:text-[#4DA3FF]
                                       hover:file:bg-[#4DA3FF]/20 transition-all cursor-pointer"
                        />
                    </div>
                ) : (
                    <>
                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(77,163,255,0.18)', borderRadius: 16, padding: 24, flex: 1 }}>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Weekly Attendance</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Upload weekly attendance CSV files for student monitoring. Required columns: studentid, week, attendance.
                            </p>
                            <p className="text-xs text-slate-400 mt-2 mb-6">Supported files: CSV, PDF, PNG</p>
                            <input
                                type="file"
                                accept=".csv,.pdf,.png"
                                onChange={createUploadHandler('attendance')}
                                className="block w-full text-sm text-gray-600 dark:text-gray-400
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-xl file:border-0
                                           file:text-sm file:font-semibold
                                           file:bg-[#4DA3FF]/10 file:text-[#4DA3FF]
                                           hover:file:bg-[#4DA3FF]/20 transition-all cursor-pointer"
                            />
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(77,163,255,0.18)', borderRadius: 16, padding: 24, flex: 1 }}>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Internal Assessment</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                Upload assessment marks for student evaluation. Required columns: studentid, subject, marks.
                            </p>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={createUploadHandler('marks')}
                                className="block w-full text-sm text-gray-600 dark:text-gray-400
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-xl file:border-0
                                           file:text-sm file:font-semibold
                                           file:bg-[#4DA3FF]/10 file:text-[#4DA3FF]
                                           hover:file:bg-[#4DA3FF]/20 transition-all cursor-pointer"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const App = () => {
    const [currentPage, setCurrentPage] = useState("login");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showInterventionModal, setShowInterventionModal] = useState(false);
    const [pageVisible, setPageVisible] = useState(true);
    const [skeletonLoading, setSkeletonLoading] = useState(false);
    const [displayScore, setDisplayScore] = useState(0);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const scoreIntervalRef = useRef(null);

    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') !== 'light');

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const [role, setRole] = useState(null);
    const [currentStudentId, setCurrentStudentId] = useState("S001");
    const [animatedStats, setAnimatedStats] = useState({
        total: 0, highRisk: 0,
        interventions: 0, avgScore: 0
    });
    const statsAnimatedRef = useRef(false);
    const [adminLoading, setAdminLoading] = useState(false);

    const [students, setStudents] = useState(() => generateStudents());

    const PERMISSIONS = {
        ADMIN: {
            canViewAllStudents: true,
            canAccessStudentsPage: true,
            canAccessInterventions: true,
            canViewFullAnalytics: true,
            canOpenAnyStudent: true,
        },
        FACULTY: {
            canViewAllStudents: true,
            canAccessStudentsPage: true,
            canAccessInterventions: true,
            canViewFullAnalytics: true,
            canOpenAnyStudent: true,
        },
        STUDENT: {
            canViewAllStudents: false,
            canAccessStudentsPage: false,
            canAccessInterventions: false,
            canViewFullAnalytics: false,
            canOpenAnyStudent: false,
        }
    };
    const can = (permission) => role && PERMISSIONS[role] ? PERMISSIONS[role][permission] : false;

    const navigateTo = (targetPage, studentObj = null) => {
        if (targetPage === 'faculty' && !can('canAccessStudentsPage')) return;
        if (targetPage === 'interventions' && !can('canAccessInterventions')) return;
        if (targetPage === 'upload' && role === 'STUDENT') return;
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

    useEffect(() => {
        if (currentPage !== 'admin') return;
        setAdminLoading(true);
        const loadTimer = setTimeout(() => setAdminLoading(false), 500);

        if (statsAnimatedRef.current) return;
        statsAnimatedRef.current = true;

        const targets = {
            total: students.length,
            highRisk: students.filter(s => calculateRiskScore(s).level === 'HIGH').length,
            interventions: students.filter(s => calculateRiskScore(s).level !== 'SAFE').length,
            avgScore: Math.round(students.reduce((a, b) => a + calculateRiskScore(b).score, 0) / students.length)
        };

        const steps = 36;
        const interval = 900 / steps;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            const ease = 1 - Math.pow(1 - step / steps, 3);
            setAnimatedStats({
                total: Math.round(targets.total * ease),
                highRisk: Math.round(targets.highRisk * ease),
                interventions: Math.round(targets.interventions * ease),
                avgScore: Math.round(targets.avgScore * ease)
            });
            if (step >= steps) clearInterval(timer);
        }, interval);

        return () => {
            clearInterval(timer);
            clearTimeout(loadTimer);
        };
    }, [currentPage, students]);

    const showToast = (message) => {
        setToastMessage(message);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    const handleLogin = (loginRole) => {
        const uRole = loginRole.toUpperCase();
        setRole(uRole);
        if (uRole === "ADMIN") setCurrentPage("admin");
        else if (uRole === "FACULTY") setCurrentPage("faculty");
        else if (uRole === "PARENT") setCurrentPage("parent");
        else setCurrentPage("student");
    };

    const handleLogout = () => {
        navigateTo("login"); setRole(null); setSelectedStudent(null);
    };

    const handleNavigate = (page) => { navigateTo(page); setSelectedStudent(null); };

    const InterventionModal = () => (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
            style={{
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                animation: 'overlayFadeIn 200ms ease forwards'
            }}>
            <Card tier={3} className="w-full max-w-lg p-8 relative border-[#F59E0B]/30" style={{ animation: 'modalScaleIn 220ms ease forwards' }}>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Zap className="w-6 h-6 text-[#F59E0B]" /> Trigger Action</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Select automated intervention for {selectedStudent?.name}</p>

                <div className="space-y-3 mb-8">
                    <button className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-[#F59E0B] flex justify-between items-center bg-white/5 transition-colors">
                        <div>
                            <div className="font-bold text-gray-900 dark:text-white">Schedule Parent Meeting</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Send auto-email to parents and block calendar</div>
                        </div>
                        <Users className="text-[#F59E0B] w-5 h-5" />
                    </button>
                    <button className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-[#4DA3FF] flex justify-between items-center bg-white/5 transition-colors">
                        <div>
                            <div className="font-bold text-gray-900 dark:text-white">Assign to Remedial Cluster</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Add student to upcoming remedial sessions</div>
                        </div>
                        <BookOpen className="text-[#4DA3FF] w-5 h-5" />
                    </button>
                </div>

                <div className="flex gap-4">
                    <button onClick={() => setShowInterventionModal(false)} className="flex-1 py-3 rounded-xl border border-white/20 text-gray-900 dark:text-white font-bold hover:bg-white/5 transition-colors">
                        Cancel
                    </button>
                    <button onClick={() => { setShowInterventionModal(false); showToast('✓ Intervention triggered successfully.'); }} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-gray-900 dark:text-white font-bold hover:opacity-90 transition-opacity">
                        Confirm Action
                    </button>
                </div>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen text-gray-900 dark:text-white relative premium-grid-bg transition-colors duration-300">
            <div className="ambient-glow-topLeft"></div>
            <div className="ambient-glow-topRight"></div>

            {currentPage !== "login" && currentPage !== "reset-password" && (
                <nav className="w-full border-b border-white/10 bg-[#10293F]/80 backdrop-blur-lg sticky top-0 z-40 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('admin')} style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8CC7FF] to-[#4DA3FF] flex items-center justify-center">
                                <Brain className="w-5 h-5 text-gray-900 dark:text-white" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20, background: 'linear-gradient(135deg,#8CC7FF,#4DA3FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>Hackspace</span>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Sans', letterSpacing: '0.5px', marginTop: 1, lineHeight: 1 }}>Academic Stability Engine</div>
                            </div>

                        </div>

                        <div className="flex flex-1 justify-center max-w-lg">
                            <div className="flex gap-8 px-4 w-full">
                                {[
                                    { label: 'Dashboard', page: 'admin', always: true },
                                    { label: 'Students', page: 'faculty', show: can('canAccessStudentsPage') },
                                    { label: 'Interventions', page: 'interventions', show: can('canAccessInterventions') },
                                    { label: 'Parent Dashboard', page: 'parent', show: role === 'PARENT' },
                                    { label: 'Upload', page: 'upload', show: role === 'ADMIN' || role === 'FACULTY' }
                                ].filter(tab => tab.always || tab.show).map(tab => (
                                    <button
                                        key={tab.page}
                                        onClick={() => navigateTo(tab.page)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '8px 16px',
                                            fontSize: 13,
                                            fontFamily: 'DM Sans',
                                            color: currentPage === tab.page ? '#4DA3FF' : 'rgba(255,255,255,0.5)',
                                            borderBottom: currentPage === tab.page ? '2px solid #4DA3FF' : '2px solid transparent',
                                            transition: 'color 0.2s ease, border-color 0.2s ease',
                                            letterSpacing: '0.3px'
                                        }}
                                        onMouseEnter={e => {
                                            if (currentPage !== tab.page) e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                                        }}
                                        onMouseLeave={e => {
                                            if (currentPage !== tab.page) e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                                        }}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="ml-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition flex items-center justify-center text-gray-900 dark:text-white"
                                aria-label="Toggle Theme"
                            >
                                {isDarkMode ? <Sun className="text-yellow-400 w-5 h-5" /> : <Moon className="text-slate-200 w-5 h-5" />}
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FBBF24] to-[#EF4444]"></div>
                                <span className="text-xs font-bold uppercase tracking-wider">{role}</span>
                            </div>
                            <button onClick={handleLogout} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-white/5 rounded-lg transition-colors">
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

                    {currentPage === "login" && <LoginPage onLogin={handleLogin} onForgotPassword={() => setCurrentPage("reset-password")} />}
                    {currentPage === "reset-password" && <ResetPassword onBack={() => setCurrentPage("login")} />}
                    {currentPage === "admin" && <AdminDashboard students={students} onNavigate={handleNavigate} currentStudentId={currentStudentId} animatedStats={animatedStats} adminLoading={adminLoading} can={can} role={role} />}
                    {currentPage === "parent" && <ParentDashboard students={students} />}
                    {currentPage === "faculty" && <FacultyDashboard students={students} onSelectStudent={(s) => openStudentDetail(s)} can={can} currentStudentId={currentStudentId} openStudentDetail={openStudentDetail} />}
                    {currentPage === "student" && selectedStudent && <StudentDetail
                        student={selectedStudent}
                        onBack={() => navigateTo("faculty")}
                        onInterventionReq={() => setShowInterventionModal(true)}
                        showToast={showToast}
                        skeletonLoading={skeletonLoading}
                        displayScore={displayScore}
                    />}
                    {currentPage === "interventions" && <InterventionsPanel students={students} />}
                    {currentPage === "upload" && (role === "ADMIN" || role === "FACULTY") && <UploadPage setStudents={setStudents} showToast={showToast} role={role} />}

                </div>
            </main>

            {showInterventionModal && <InterventionModal />}


        </div>
    );
};

export default App;


