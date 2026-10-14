const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
// buscar el function que genera el HTML de la guía (buildGuidePage o similar)
let i = src.indexOf('function buildGuidePage');
if (i > -1) console.log('buildGuidePage en:', i);
else console.log('NO buildGuidePage');

// buscar dónde se define productCards en esa función
const fnStart = src.indexOf('function buildGuidePage');
if (fnStart > -1) {
  const fnBody = src.slice(fnStart, fnStart + 50000);
  const pcIdx = fnBody.indexOf('productCards');
  if (pcIdx > -1) {
    console.log('productCards en buildGuidePage:', pcIdx);
    console.log(fnBody.slice(pcIdx - 200, pcIdx + 500));
  }
}