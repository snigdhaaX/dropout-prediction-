const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const chunks = [
    'chunk1.jsx',
    'chunk2.jsx',
    'chunk3.jsx',
    'chunk4.jsx'
];

let finalOutput = '';

chunks.forEach(chunk => {
    const filePath = path.join(srcDir, chunk);
    if (fs.existsSync(filePath)) {
        finalOutput += fs.readFileSync(filePath, 'utf8') + '\n\n';
    }
});

fs.writeFileSync(path.join(srcDir, 'App.jsx'), finalOutput);
console.log('App.jsx has been rebuilt successfully.');
