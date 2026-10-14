const fs = require('fs');
const h = fs.readFileSync('guides/best-microphone.html', 'utf8');
const checks = [
  ['tabla ~$249', h.includes('~$249')],
  ['zz $249', h.includes('$249.00')],
  ['MS 229', h.includes('229.00')],
  ['G4M 149', h.includes('149.00')],
  ['Andertons x1-r', h.includes('se-electronics-se-x1-r-ribbon-mic')],
  ['zz SEEX1SSTUDBUN', h.includes('SEEX1SSTUDBUN')],
  ['149 viejo X1R (around $149)', h.includes('around $149') || h.includes('Around ~$149')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (n.includes('viejo') ? !v : v) ok++; console.log(((n.includes('viejo') ? !v : v) ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
