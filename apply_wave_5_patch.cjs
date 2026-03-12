const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let appCode = fs.readFileSync(appPath, 'utf8');

// The user specifically requested a strict dark mode prepending strategy:
// BEFORE: bg-slate-900 -> AFTER: bg-gray-50 dark:bg-slate-900

// We first strip any of my PREVIOUS patch attempts to get back to a clean baseline:
appCode = appCode.replace(/text-gray-900 dark:text-white/g, 'text-white');
appCode = appCode.replace(/text-gray-600 dark:text-gray-400/g, 'text-gray-400');
appCode = appCode.replace(/border-gray-200 dark:border-white\/10/g, 'border-white/10');
appCode = appCode.replace(/border-gray-200 dark:border-white\/5/g, 'border-white/5');
appCode = appCode.replace(/bg-gray-100 dark:bg-white\/5(?!0)/g, 'bg-white/5');
appCode = appCode.replace(/bg-gray-100 dark:bg-\[\#0B0B0C\]\/50/g, 'bg-[#0B0B0C]/50');
appCode = appCode.replace(/bg-gray-100 dark:bg-\[\#0B0B0C\]\/60/g, 'bg-[#0B0B0C]/60');
appCode = appCode.replace(/bg-white\/90 dark:bg-\[\#10293F\]\/80/g, 'bg-[#10293F]/80');
appCode = appCode.replace(/text-gray-700 dark:text-white/g, 'text-white'); // Fix nav button mistake

// STEP 3 - CLASS CONVERSION PATTERN
appCode = appCode.replace(/\bbg-slate-900\b/g, 'bg-gray-50 dark:bg-slate-900');
appCode = appCode.replace(/\bbg-slate-800\b/g, 'bg-white dark:bg-slate-800');
appCode = appCode.replace(/\btext-white\b/g, 'text-gray-900 dark:text-white');
appCode = appCode.replace(/\btext-gray-400\b/g, 'text-gray-600 dark:text-gray-400');
appCode = appCode.replace(/\bborder-gray-700\b/g, 'border-gray-200 dark:border-gray-700');
appCode = appCode.replace(/\btext-gray-300\b/g, 'text-gray-700 dark:text-gray-300');

// Component specific (Custom Tooltip)
appCode = appCode.replace(/bg-\[\#0B0B0C\] bg-opacity-90 border border-white\/10/g, 'bg-white dark:bg-[#0B0B0C] border border-gray-200 dark:border-white/10');

// Component specific (Navbar text correction - the brand title should be text-gray-900 dark:text-white and the toggle button)
appCode = appCode.replace(/text-gray-700 dark:text-white/g, 'text-gray-900 dark:text-white');

fs.writeFileSync(appPath, appCode);
console.log("App.jsx patched successfully!");
