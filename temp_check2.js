const fs = require('fs');
const m = fs.readFileSync('js/app.min.js', 'utf8');

// The DOMContentLoaded wraps everything: document.addEventListener("DOMContentLoaded",()=>{...})
// Find the dataPromise.then block inside it
const dpStart = m.indexOf('dataPromise.then(function(){');
console.log('dataPromise.then starts at:', dpStart);

// Find the matching }) for dataPromise.then(function(){...})
// We need to count from after "dataPromise.then(function(){"
const contentStart = dpStart + 'dataPromise.then(function(){'.length;
let depth = 1;
let dpEnd = -1;
for (let j = 0; j < m.length - contentStart; j++) {
  const ch = m[contentStart + j];
  if (ch === '{') depth++;
  if (ch === '}') depth--;
  if (depth === 0) {
    dpEnd = contentStart + j;
    break;
  }
}
console.log('dataPromise.then callback ends at:', dpEnd);
console.log('After .then():', m.substring(dpEnd, dpEnd + 200));

// Now check: is renderGuideCats called OUTSIDE dataPromise.then but INSIDE DOMContentLoaded?
const afterThen = m.substring(dpEnd + 1);
const rcPos = afterThen.indexOf('renderGuideCats()');
console.log('\nrenderGuideCats() after .then at offset:', rcPos);
if (rcPos >= 0 && rcPos < 1000) {
  console.log('Context:', afterThen.substring(Math.max(0, rcPos - 100), rcPos + 100));
}

// Check: is i() called after .then but outside it?
const iPos = afterThen.indexOf('i()');
console.log('\ni() after .then at offset:', iPos);
if (iPos >= 0 && iPos < 2000) {
  console.log('Context:', afterThen.substring(Math.max(0, iPos - 100), iPos + 100));
}

// Check if renderGuideGrid is called in i()
const guideGridInI = m.substring(dpStart, dpEnd).indexOf('renderGuideGrid()');
console.log('\nrenderGuideGrid() inside .then:', guideGridInI >= 0);

// Check the key difference: does the .then call renderGuideGrid directly?
const renderGridAfterThen = afterThen.indexOf('renderGuideGrid()');
console.log('renderGuideGrid() after .then:', renderGridAfterThen);
