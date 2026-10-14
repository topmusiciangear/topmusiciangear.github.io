const fs = require('fs');
const appMinPath = 'C:/Users/Daniel/projects/topmusiciangear/js/app.min.js';
let appMin = fs.readFileSync(appMinPath, 'utf8');

// Find pushGuide in min
const pushIdx = appMin.indexOf('function pushGuide(');
if (pushIdx === -1) { console.log('pushGuide no encontrada'); process.exit(1); }

// Add missing variable declarations before pushGuide
// In app.js: const out = []; const seen = {}; and var isEs = currentLang === 'es';
const varsToAdd = 'const out = []; const seen = {}; var isEs = currentLang === "es";';

appMin = appMin.slice(0, pushIdx) + varsToAdd + '\n' + appMin.slice(pushIdx);

fs.writeFileSync(appMinPath, appMin);

// Verify
try { new Function(fs.readFileSync(appMinPath, 'utf8')); console.log('app.min.js parsea OK'); }
catch (e) { console.log('ROTO:', e.message); process.exit(1); }

// Verify pushGuide now has its dependencies
const newPushIdx = appMin.indexOf('function pushGuide(');
const before = appMin.slice(0, newPushIdx);
console.log('out declarado antes de pushGuide:', before.includes('const out = []'));
console.log('seen declarado antes de pushGuide:', before.includes('const seen = {}'));
console.log('isEs declarado antes de pushGuide:', before.includes('var isEs'));