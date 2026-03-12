const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let appCode = fs.readFileSync(appPath, 'utf8');

appCode = appCode.replace(/fill: isDarkMode \? /g, "fill: (document.documentElement.classList.contains('dark')) ? ");
appCode = appCode.replace(/backgroundColor: isDarkMode \? /g, "backgroundColor: (document.documentElement.classList.contains('dark')) ? ");
appCode = appCode.replace(/border: isDarkMode \? /g, "border: (document.documentElement.classList.contains('dark')) ? ");
appCode = appCode.replace(/color: isDarkMode \? /g, "color: (document.documentElement.classList.contains('dark')) ? ");

fs.writeFileSync(appPath, appCode);
console.log("Charts patched successfully!");
