const fs = require('fs');
const app = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8');
const appMin = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.min.js', 'utf8');

function extractFn(src, name) {
  const idx = src.indexOf('function ' + name + '(');
  if (idx === -1) return null;
  const bodyStart = src.indexOf('{', idx);
  let depth = 0, end = bodyStart;
  for (let i = bodyStart; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  return src.slice(idx, end + 1);
}

// For each newly added function, check if it calls functions missing from min
const added = ['pushGuide', 'paintStars', 'addJsonLd', 'onPageLoaded', 'normName'];

added.forEach(fn => {
  const fnCode = extractFn(app, fn);
  if (!fnCode) return;
  
  // Find all function calls
  const calls = fnCode.match(/(\w+)\s*\(/g) || [];
  const unique = [...new Set(calls)].map(c => c.replace('(', '').trim());
  
  const missing = [];
  unique.forEach(called => {
    if (['if', 'for', 'while', 'switch', 'catch', 'return', 'function', 'Math', 'JSON', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Date', 'RegExp', 'Error'].includes(called)) return;
    // Check if it's defined in min
    const inMin = appMin.indexOf('function ' + called + '(') > -1 || appMin.includes(called + ' =');
    // Check if it's a method call
    const isMethod = called.includes('.');
    if (!inMin && !isMethod) {
      // Check if it's a variable reference
      const isVar = appMin.includes('var ' + called) || appMin.includes('let ' + called) || appMin.includes('const ' + called);
      if (!isVar) missing.push(called);
    }
  });
  
  console.log(fn + ': ' + (missing.length ? 'FALTAN: ' + missing.join(', ') : 'OK'));
});

// Also check the initialization chain
const initIdx = app.indexOf('DOMContentLoaded');
const initMin = appMin.indexOf('DOMContentLoaded');
console.log('\nDOMContentLoaded en app.js:', initIdx);
console.log('DOMContentLoaded en min:', initMin);

// Check what calls renderGuideGrid in app.js
const appRenderCall = app.indexOf('renderGuideGrid(');
const minRenderCall = appMin.indexOf('renderGuideGrid(');
console.log('renderGuideGrid( en app.js:', appRenderCall);
console.log('renderGuideGrid( en min:', minRenderCall);

// Check if there's a call to a missing function in the init chain
const initFn = extractFn(app, 'onPageLoaded');
if (initFn) {
  console.log('\nonPageLoaded en app.js:', initFn.length, 'chars');
  const minInit = extractFn(appMin, 'onPageLoaded');
  console.log('onPageLoaded en min:', minInit ? minInit.length + ' chars' : 'NO ENCONTRADA');
  if (initFn && minInit && initFn !== minInit) {
    console.log('DIFIEREN');
  }
}