const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'src');

const files = [
  'chunk1_data.jsx',
  'chunk2_components.jsx',
  'chunk3_auth_admin.jsx',
  'chunk4_faculty_student.jsx',
  'chunk5_interventions_app.jsx'
];

let appContent = `import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  ShieldAlert, BookOpen, GraduationCap, Users, LayoutDashboard,
  AlertTriangle, TrendingUp, TrendingDown, Minus, ChevronRight, 
  ArrowLeft, Brain, Activity, Clock, LogOut, CheckCircle2, Search,
  Filter, MoreVertical, ShieldCheck, Zap, Wallet, MapPin, Star, Shield, TrendingDown as TrendingDownIcon, BarChart2, IndianRupee, Bell
} from 'lucide-react';\n\n`;

for (const file of files) {
  const filePath = path.join(srcDir, file);
  if (fs.existsSync(filePath)) {
    appContent += fs.readFileSync(filePath, 'utf8') + '\n\n';
  } else {
    console.error('Missing chunk:', filePath);
  }
}

fs.writeFileSync(path.join(srcDir, 'App.jsx'), appContent);
console.log('App.jsx generated successfully.');
