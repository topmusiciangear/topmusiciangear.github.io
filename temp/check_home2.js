const fs = require('fs');
const app = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8');
const appMin = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.min.js', 'utf8');

// Find guideGrid population logic
const guideGridIdx = app.indexOf('guideGrid');
const guideGridMinIdx = appMin.indexOf('guideGrid');
console.log('guideGrid in app.js:', guideGridIdx);
console.log('guideGrid in app.min.js:', guideGridMinIdx);

if (guideGridIdx > -1) {
  console.log('app.js context:', app.slice(guideGridIdx - 200, guideGridIdx + 500));
}
if (guideGridMinIdx > -1) {
  console.log('app.min.js context:', appMin.slice(guideGridMinIdx - 200, guideGridMinIdx + 500));
}

// Check for JS syntax errors
try {
  new Function(app);
  console.log('app.js: syntax OK');
} catch (e) {
  console.log('app.js SYNTAX ERROR:', e.message);
}
try {
  new Function(appMin);
  console.log('app.min.js: syntax OK');
} catch (e) {
  console.log('app.min.js SYNTAX ERROR:', e.message);
}