const fs = require('fs');
const app = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8');
const appMin = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.min.js', 'utf8');

// Find actual function definitions (not references)
function findFn(src, name) {
  // Look for "function name(" pattern
  const re = new RegExp('function\\s+' + name + '\\s*\\(', 'g');
  const m = re.exec(src);
  return m ? m.index : -1;
}

const fns = ['renderGuideGrid', 'pushGuide', 'loadMoreGuides', 'getFilteredGuides', 'renderGuideCats', 'guideDates', 'openGuideVideo', 'getGuideFaqs', 'paintStars', 'addJsonLd', 'onPageLoaded', 'normName'];

console.log('Funcion                    app.js   app.min.js');
fns.forEach(fn => {
  const a = findFn(app, fn);
  const m = findFn(appMin, fn);
  const status = (a > -1 && m > -1) ? 'OK' : (a > -1 && m === -1 ? 'FALTA EN MIN' : (a === -1 && m > -1 ? 'solo min' : 'ninguno'));
  console.log(fn.padEnd(28) + (a > -1 ? 'si' : 'NO').padEnd(8) + (m > -1 ? 'si' : 'NO').padEnd(10) + status);
});

// Check the guide rendering pipeline in app.js
console.log('\n=== Pipeline de render en app.js ===');
const fetchIdx = app.indexOf("fetch('https://topmusiciangear.com/data/guides.json");
if (fetchIdx > -1) {
  console.log(app.slice(fetchIdx, fetchIdx + 1500));
}