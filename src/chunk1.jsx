import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
    ShieldAlert, BookOpen, GraduationCap, Users, LayoutDashboard,
    AlertTriangle, TrendingUp, TrendingDown, Minus, ChevronRight,
    ArrowLeft, Brain, Activity, Clock, LogOut, CheckCircle2, Search,
    Filter, MoreVertical, ShieldCheck, Zap, Wallet, MapPin, Star, Shield, TrendingDown as TrendingDownIcon, BarChart2, IndianRupee, Bell
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

const getLevelColor = (level) => {
    if (level === "SAFE") return "#BFA14A";
    if (level === "MODERATE") return "#F59E0B";
    return "#EF4444";
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
            <div className="bg-[#0B0B0C] bg-opacity-90 border border-white/10 backdrop-blur-md rounded-lg p-3 text-white shadow-xl">
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
        borderTop: '1px solid rgba(191,161,74,0.09)',
        background: 'rgba(255,255,255,0.01)',
        padding: '14px 32px',
        textAlign: 'center',
        marginTop: 48,
        fontFamily: 'DM Sans',
        fontSize: 11,
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: '0.3px'
    }}>
        <span style={{ color: 'rgba(197,25,45,0.6)' }}>
            Supporting SDG 4 – Quality Education
        </span>
        {' | '}2030 Agenda for Sustainable Development
        {' | '}Continuum © 2025
    </div>
);
