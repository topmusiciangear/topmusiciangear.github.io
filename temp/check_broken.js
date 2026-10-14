const fs = require('fs');
const app = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8');
const appMin = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.min.js', 'utf8');

function findFn(src, name) {
  const re = new RegExp('function\\s+' + name + '\\s*\\(', 'g');
  const m = re.exec(src);
  return m ? m.index : -1;
}

function extractFn(src, name) {
  const idx = findFn(src, name);
  if (idx === -1) return '';
  const bodyStart = src.indexOf('{', idx);
  let depth = 0, end = bodyStart;
  for (let i = bodyStart; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  return src.slice(idx, end + 1);
}

// Check if renderGuideGrid calls any missing function
const missing = ['pushGuide', 'paintStars', 'addJsonLd', 'onPageLoaded', 'normName'];
const gridApp = extractFn(app, 'renderGuideGrid');
const gridMin = extractFn(appMin, 'renderGuideGrid');

console.log('renderGuideGrid app.js length:', gridApp.length);
console.log('renderGuideGrid app.min.js length:', gridMin.length);
console.log('Identicos:', gridApp === gridMin);

missing.forEach(fn => {
  const inApp = gridApp.includes(fn);
  const inMin = gridMin.includes(fn);
  console.log(fn + ': app=' + inApp + ' min=' + inMin + (inApp && !inMin ? '  <<< ROMPERIA EN MIN' : ''));
});

// Check what renderGuideGrid calls to render cards
const calls = gridMin.match(/(\w+)\(/g) || [];
const uniqueCalls = [...new Set(calls)].filter(c => !['if', 'for', 'while', 'switch', 'catch', 'return', 'function'].includes(c));
console.log('\nLlamadas en renderGuideGrid (min):', uniqueCalls.join(', '));

// Check if any of those are missing from min
uniqueCalls.forEach(c => {
  if (findFn(appMin, c) === -1 && !['if', 'for', 'while', 'switch', 'catch', 'return'].includes(c)) {
    // Check if it's a global function
    const isGlobal = appMin.includes('function ' + c);
    if (!isGlobal) {
      console.log('  ' + c + ': NO ES FUNCION EN MIN (puede ser metodo o global)');
    }
  }
});