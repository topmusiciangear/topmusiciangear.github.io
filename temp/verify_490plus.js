const fs = require('fs');
const file = 'guides/open-headphones.html';
const h = fs.readFileSync(file, 'utf8');
console.log('--- Store URL checks ---');
const checks = {
  'amazon UK plus': 'B0CP6B497Z',
  'zzounds siid': 'SENHD490PROPLUS?siid=346774',
  'gear4music 62YL': 'HD-490-Pro-Plus-Open-Back-Headphones/62YL',
  'musicstore clean': 'Sennheiser-HD-490-Pro-Plus/art-REC0016605-000',
  'andertons plus': 'senneheiser-hd-490-pro-plus-headphones/?search_query=Sennheiser%20HD%20490%20Pro'
};
for (const k of Object.keys(checks)) {
  console.log(k + ':', h.split(checks[k]).length - 1);
}
console.log('--- HD 490 mentions ---');
const re = /HD 490 Pro(?! Plus)/g;
let m;
let n = 0;
while ((m = re.exec(h)) !== null) {
  n++;
  console.log('#' + n + ':', h.slice(Math.max(0, m.index - 90), m.index + 40).replace(/\s+/g, ' '));
}
console.log('standalone Pro mentions:', n);
console.log('--- Plus mentions ---', h.split('HD 490 Pro Plus').length - 1);
