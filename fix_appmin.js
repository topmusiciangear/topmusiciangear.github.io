const fs = require('fs');
const app = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8');
const appMinPath = 'C:/Users/Daniel/projects/topmusiciangear/js/app.min.js';
let appMin = fs.readFileSync(appMinPath, 'utf8');

function findFn(src, name) {
  const idx = src.indexOf('function ' + name + '(');
  return idx;
}

function extractFn(src, name) {
  const idx = findFn(src, name);
  if (idx === -1) return null;
  const bodyStart = src.indexOf('{', idx);
  let depth = 0, end = bodyStart;
  for (let i = bodyStart; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  return src.slice(idx, end + 1);
}

const missing = ['pushGuide', 'paintStars', 'addJsonLd', 'onPageLoaded', 'normName'];
let added = 0;

missing.forEach(fn => {
  const inMin = findFn(appMin, fn) > -1;
  if (!inMin) {
    const fnCode = extractFn(app, fn);
    if (fnCode) {
      // Insert before the first function in app.min.js
      const firstFn = appMin.indexOf('function ');
      if (firstFn > -1) {
        appMin = appMin.slice(0, firstFn) + fnCode + '\n' + appMin.slice(firstFn);
        added++;
        console.log(fn + ': añadida a app.min.js');
      }
    } else {
      console.log(fn + ': NO encontrada en app.js');
    }
  } else {
    console.log(fn + ': ya existe en min');
  }
});

fs.writeFileSync(appMinPath, appMin);
try { new Function(fs.readFileSync(appMinPath, 'utf8')); console.log('app.min.js parsea OK'); }
catch (e) { console.log('ROTO:', e.message); }

// Verify all missing functions are now present
missing.forEach(fn => {
  const inMin = findFn(appMin, fn) > -1;
  console.log(fn + ' en min: ' + inMin);
});