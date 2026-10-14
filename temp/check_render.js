const fs = require('fs');
const app = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8');
const appMin = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.min.js', 'utf8');

// Check if renderGuideGrid in app.min.js calls pushGuide
const minGridIdx = appMin.indexOf('renderGuideGrid');
console.log('renderGuideGrid en min:', minGridIdx);
if (minGridIdx > -1) {
  // find function body
  const bodyStart = appMin.indexOf('{', minGridIdx);
  let depth = 0, end = bodyStart;
  for (let i = bodyStart; i < appMin.length; i++) {
    if (appMin[i] === '{') depth++;
    else if (appMin[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  const body = appMin.slice(bodyStart, end + 1);
  console.log('Body length:', body.length);
  console.log('Llama pushGuide:', body.includes('pushGuide'));
  console.log('Llama loadMoreGuides:', body.includes('loadMoreGuides'));
  console.log('Llama getFilteredGuides:', body.includes('getFilteredGuides'));
  console.log('Llama renderGuideCats:', body.includes('renderGuideCats'));
  // Show first 600 chars
  console.log('\nInicio de renderGuideGrid (min):', body.slice(0, 600));
}

// Check pushGuide in app.js
const pushIdx = app.indexOf('function pushGuide');
console.log('\npushGuide en app.js:', pushIdx);
if (pushIdx > -1) {
  console.log('Contexto:', app.slice(pushIdx, pushIdx + 200));
}

// Check how app.min.js is generated
const scripts = fs.readdirSync('C:/Users/Daniel/projects/topmusiciangear/scripts');
console.log('\nscripts/:', scripts);
const rootFiles = fs.readdirSync('C:/Users/Daniel/projects/topmusiciangear');
console.log('Root files:', rootFiles.filter(f => f.endsWith('.js') || f.includes('min')));

// Check renderGuideGrid in app.js
const appGridIdx = app.indexOf('function renderGuideGrid');
console.log('\nrenderGuideGrid en app.js:', appGridIdx);
if (appGridIdx > -1) {
  const bodyStart = app.indexOf('{', appGridIdx);
  let depth = 0, end = bodyStart;
  for (let i = bodyStart; i < app.length; i++) {
    if (app[i] === '{') depth++;
    else if (app[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  const body = app.slice(bodyStart, end + 1);
  console.log('Body length:', body.length);
  console.log('Llama pushGuide:', body.includes('pushGuide'));
}