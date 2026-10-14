const fs = require('fs');
const appMin = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.min.js', 'utf8');

// Verify the 5 functions are actually in the file
['pushGuide', 'paintStars', 'addJsonLd', 'onPageLoaded', 'normName'].forEach(fn => {
  const idx = appMin.indexOf('function ' + fn + '(');
  console.log(fn + ':', idx > -1 ? 'presente' : 'FALTA');
});

// Check for syntax errors
try {
  new Function(appMin);
  console.log('app.min.js: syntax OK');
} catch (e) {
  console.log('app.min.js SYNTAX ERROR:', e.message);
}

// Check if renderGuideGrid calls any of the missing functions
const gridIdx = appMin.indexOf('function renderGuideGrid(');
if (gridIdx > -1) {
  const bodyStart = appMin.indexOf('{', gridIdx);
  let depth = 0, end = bodyStart;
  for (let i = bodyStart; i < appMin.length; i++) {
    if (appMin[i] === '{') depth++;
    else if (appMin[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  const body = appMin.slice(gridIdx, end + 1);
  console.log('\nrenderGuideGrid length:', body.length);
  
  // Check which functions it calls
  const calls = body.match(/(\w+)\s*\(/g) || [];
  const unique = [...new Set(calls)].filter(c => !['if', 'for', 'while', 'switch', 'catch', 'return', 'function'].includes(c.replace('(', '')));
  console.log('Function calls:', unique.join(', '));
  
  // Check if any called function is missing
  unique.forEach(fn => {
    const cleanFn = fn.replace('(', '').trim();
    if (['if', 'for', 'while', 'switch', 'catch', 'return', 'function'].includes(cleanFn)) return;
    const hasDef = appMin.indexOf('function ' + cleanFn + '(') > -1;
    const isMethod = cleanFn.includes('.') || appMin.includes(cleanFn + '(');
    if (!hasDef && !isMethod) {
      console.log('  ' + cleanFn + ': NO DEFINIDA');
    }
  });
}