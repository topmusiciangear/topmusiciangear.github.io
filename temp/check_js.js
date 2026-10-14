const fs = require('fs');
const app = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8');
const appMin = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.min.js', 'utf8');

// Check for syntax errors in both files
try { new Function(app); console.log('app.js: OK'); }
catch (e) { console.log('app.js ERROR:', e.message); }

try { new Function(appMin); console.log('app.min.js: OK'); }
catch (e) { console.log('app.min.js ERROR:', e.message); }

// Check if app.min.js is outdated (missing functions from app.js)
const appFuncs = [...app.matchAll(/function (\w+)\(/g)].map(m => m[1]);
const minFuncs = [...appMin.matchAll(/function (\w+)\(/g)].map(m => m[1]);
const missing = appFuncs.filter(f => !minFuncs.includes(f));
console.log('\nFunciones en app.js:', appFuncs.length);
console.log('Funciones en app.min.js:', minFuncs.length);
console.log('Faltantes en min:', missing.slice(0, 20));

// Check if the guide rendering function exists in both
const renderGuidesApp = app.indexOf('renderGuides') > -1 || app.indexOf('renderGuide') > -1;
const renderGuidesMin = appMin.indexOf('renderGuides') > -1 || appMin.indexOf('renderGuide') > -1;
console.log('\nrenderGuides en app.js:', renderGuidesApp);
console.log('renderGuides en app.min.js:', renderGuidesMin);

// Find the actual guide rendering function name
const guideRenderMatch = app.match(/function\s+(\w*[Gg]uide\w*)\s*\(/g) || [];
console.log('\nFunciones con "guide" en nombre:', guideRenderMatch.slice(0, 10));