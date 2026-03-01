const fs = require('fs');
const path = require('path');

const filePaths = [
    path.join(__dirname, 'src', 'App.jsx'),
    path.join(__dirname, 'src', 'index.css')
];

let globalReplaces = [
    // Hex color updates
    { from: /#00D4FF/gi, to: '#BFA14A' },
    { from: /#7B6EF6/gi, to: '#A88C3D' },
    { from: /#0A0F1E/gi, to: '#0B0B0C' },

    // Specific Panel B: First-Generation Learner badge (was using purple tailwind colors previously)
    { from: /rgba\(139,\s*92,\s*246,\s*0\.08\)/g, to: 'rgba(191,161,74,0.07)' },
    { from: /rgba\(139,\s*92,\s*246,\s*0\.2\)/g, to: 'rgba(191,161,74,0.20)' },
    { from: /#A78BFA/gi, to: '#BFA14A' },
    { from: /rgba\(167,\s*139,\s*250,\s*0\.6\)/g, to: 'rgba(191,161,74,0.45)' },

    // RGBA replacements
    { from: /rgba\(0,\s*212,\s*255,\s*1\.0\)/g, to: 'rgba(191,161,74,1.0)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.9\)/g, to: 'rgba(191,161,74,0.9)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.8\)/g, to: 'rgba(191,161,74,0.8)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.6\)/g, to: 'rgba(191,161,74,0.6)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.5\)/g, to: 'rgba(191,161,74,0.5)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.4\)/g, to: 'rgba(191,161,74,0.4)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.3\)/g, to: 'rgba(191,161,74,0.3)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.28\)/g, to: 'rgba(191,161,74,0.26)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.25\)/g, to: 'rgba(191,161,74,0.22)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.22\)/g, to: 'rgba(191,161,74,0.20)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.20\)/g, to: 'rgba(191,161,74,0.18)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.2\)/g, to: 'rgba(191,161,74,0.18)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.18\)/g, to: 'rgba(191,161,74,0.16)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.15\)/g, to: 'rgba(191,161,74,0.14)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.12\)/g, to: 'rgba(191,161,74,0.10)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.10\)/g, to: 'rgba(191,161,74,0.08)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.1\)/g, to: 'rgba(191,161,74,0.08)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.08\)/g, to: 'rgba(191,161,74,0.07)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.06\)/g, to: 'rgba(191,161,74,0.05)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.05\)/g, to: 'rgba(191,161,74,0.04)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.04\)/g, to: 'rgba(191,161,74,0.03)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.03\)/g, to: 'rgba(191,161,74,0.02)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.015\)/g, to: 'rgba(191,161,74,0.012)' },
    { from: /rgba\(0,\s*212,\s*255,\s*0\.0\)/g, to: 'rgba(191,161,74,0.0)' },

    // Tailwind classes mapping
    { from: /bg-\[#BFA14A\]\/20/g, to: 'bg-[#BFA14A]/[0.18]' },
    { from: /bg-\[#BFA14A\]\/10/g, to: 'bg-[#BFA14A]/[0.08]' },
    { from: /bg-\[#BFA14A\]\/5/g, to: 'bg-[#BFA14A]/[0.03]' },
    { from: /border-\[#BFA14A\]\/20/g, to: 'border-[#BFA14A]/[0.18]' },
    { from: /border-\[#BFA14A\]\/30/g, to: 'border-[#BFA14A]/30' },
    { from: /border-\[#BFA14A\]\/50/g, to: 'border-[#BFA14A]/50' }
];

for (const filePath of filePaths) {
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Apply all basic regex replacements
    for (const { from, to } of globalReplaces) {
        content = content.replace(from, to);
    }

    if (filePath.endsWith('App.jsx')) {
        // Advanced App.jsx edge cases mapping

        // SAFE color returns exactly `#BFA14A` instead of evaluating to a fallback background
        // Previously we had background: `${getLevelColor(s.risk.level)}10` and `20`.
        // Replace them with precise outputs:

        // Find where `${getLevelColor(s.risk.level)}10` is used for SAFE background and replace it
        content = content.replace(
            /backgroundColor:\s*`\$\{getLevelColor\(s\.risk\.level\)\}20`/g,
            "backgroundColor: s.risk.level === 'SAFE' ? 'rgba(191,161,74,0.18)' : `${getLevelColor(s.risk.level)}20`"
        );

        content = content.replace(
            /backgroundColor:\s*`\$\{getLevelColor\(s\.risk\.level\)\}10`/g,
            "backgroundColor: s.risk.level === 'SAFE' ? 'rgba(191,161,74,0.10)' : `${getLevelColor(s.risk.level)}10`"
        );

        // Re-verify the border color replacements
        // "SAFE bg: rgba(191,161,74,0.10), SAFE border: rgba(191,161,74,0.26)"
        // It's in the risk tags `borderColor: getLevelColor(s.risk.level)`
        content = content.replace(
            /style=\{\{borderColor: getLevelColor\(s\.risk\.level\), color: getLevelColor\(s\.risk\.level\), backgroundColor: s\.risk\.level === 'SAFE' \? 'rgba\(191,161,74,0\.10\)' : `\$\{getLevelColor\(s\.risk\.level\)}10`\}\}/g,
            "style={{borderColor: s.risk.level === 'SAFE' ? 'rgba(191,161,74,0.26)' : getLevelColor(s.risk.level), color: getLevelColor(s.risk.level), backgroundColor: s.risk.level === 'SAFE' ? 'rgba(191,161,74,0.10)' : `${getLevelColor(s.risk.level)}10`}}"
        );
    }

    // Handle footer border
    if (filePath.endsWith('App.jsx')) {
        content = content.replace(
            /borderTop:'1px solid rgba\(255,255,255,0\.05\)'/g,
            "borderTop:'1px solid rgba(191,161,74,0.09)'"
        );
    }

    fs.writeFileSync(filePath, content);
}

console.log('Colors patched successfully in existing App.jsx and index.css.');
