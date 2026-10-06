const fs = require('fs');
const h = fs.readFileSync('guides/best-digital-pianos_es.html', 'utf8');
const key = 'guide-section-prod-name">Yamaha Arius YDP-146';
const t = h.indexOf(key);
const seg = h.slice(t, t + 25000);
console.log('gear4music occurrences:', (seg.match(/gear4music/gi) || []).length);
console.log('86R5 occurrences:', (seg.match(/86R5/g) || []).length);
const i = seg.indexOf('86R5');
if (i > -1) console.log(seg.slice(Math.max(0, i - 400), i + 200).replace(/\s+/g, ' '));
