const fs = require('fs');
const path = require('path');
const en = fs.readFileSync(path.join(__dirname, '..', 'guides', 'best-beginner-electric-guitar.html'), 'utf8');
const checks = [
  ['462 g4m', /gear4music\.com[^"'<>]*5E35/],
  ['462 zzounds', /zzounds[^"'<>]*SQU0373252/],
  ['462 amazon', /amazon\.(com|co\.uk)[^"'<>]*B0BVGSD36S/],
  ['462 andertons', /andertons\.co\.uk[^"'<>]*squier-sonic-stratocaster-ht/],
  ['463 g4m', /gear4music\.com[^"'<>]*GRG121DX[^"'<>]*295D/],
  ['463 ms', /musicstore\.com[^"'<>]*GIT0034063/],
  ['463 zzounds', /zzounds[^"'<>]*IBAGRG121DX/],
  ['463 andertons', /andertons\.co\.uk[^"'<>]*ibanez-grg121dx/],
  ['464 g4m', /gear4music\.com[^"'<>]*4PBT/],
  ['464 zzounds', /zzounds[^"'<>]*YAMRSE20/],
  ['464 amazon', /amazon\.(com|co\.uk)[^"'<>]*B09NYLQF5L/],
  ['464 andertons', /andertons\.co\.uk[^"'<>]*yamaha-revstar-element-rse20/]
];
let all = true;
checks.forEach(([k, re]) => { const ok = re.test(en); if (!ok) all = false; console.log(k + ':', ok ? 'OK' : 'MISSING'); });
console.log('ALL OK:', all);