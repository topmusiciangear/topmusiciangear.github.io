const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
let n = 0; const fallos = [];
function swap(de, a) {
  const t0 = JSON.stringify(s);
  if (!t0.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += t0.split(de).length - 1;
  (function rec(o) {
    if (typeof o === 'string') return o.split(de).join(a);
    if (Array.isArray(o)) return o.map(rec);
    if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
    return o;
  })(s);
}
swap('Tier 3 at $2,688 is the one that doubles the budget', 'Tier 3 at $2,688 is the one that triples the budget');
swap('A $269 microphone in an untreated bedroom records the bedroom', 'A good microphone in an untreated bedroom records the bedroom');
swap('Why a $299 Interface Can Beat a $199 One', 'Why a $250 Interface Can Beat a $199 One');
swap('which is why it eats $100 more of the budget without feeling like a luxury', 'which is why it eats $50 more of the budget without feeling like a luxury');
swap('What the extra hundred buys on the SSL side', 'What the extra fifty buys on the SSL side');
swap('At a hundred dollars more than the Scarlett, the MKII earns that gap twice over', 'At fifty dollars more than the Scarlett, the MKII earns that gap twice over');
swap('It is the build that doubles the budget', 'It is the build that triples the budget');
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('aplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
const t = JSON.stringify(JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio'));
console.log('restos $299/\u0024hundred/doubles/\u0024269: ' + (t.match(/\$299|hundred dollars|extra hundred|doubles the budget|\$269/g) || []).length);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
