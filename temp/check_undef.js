const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(B + 'guides/best-synth-vsts.html', 'utf8');
let idx = -1;
while ((idx = h.indexOf('undefined', idx + 1)) > -1) {
  console.log('--- ' + JSON.stringify(h.slice(Math.max(0, idx - 90), idx + 60)));
}
// baseline: compare with an old guide
const h2 = fs.readFileSync(B + 'guides/best-monitors.html', 'utf8');
let c = 0; idx = -1;
while ((idx = h2.indexOf('undefined', idx + 1)) > -1) c++;
console.log('best-monitors.html undefined count: ' + c);
