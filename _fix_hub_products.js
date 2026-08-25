const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const name = id => { const x = p.find(y => y.id === id); return x ? x.title : '?'; };

const fixes = [
  ['budget-interfaces', 0, 58, 'Mic stand, not an interface'],
  ['pro-drum-machines', 2, 290, 'USB mic, not a drum machine'],
  ['pro-drum-machines', 2, 292, 'USB mic, not a drum machine'],
  ['best-live-subwoofers', 0, 165, 'Bass guitar, not a subwoofer'],
  ['best-mic-for-podcasting', 0, 277, 'Maono PD200X — budget mic not discussed in text'],
  ['best-mic-for-podcasting', 0, 279, 'FIFINE AM8 — budget mic not discussed in text'],
  ['best-mic-for-podcasting', 0, 284, 'Maono PM461 — budget mic not discussed in text'],
  ['best-mic-for-podcasting', 0, 287, 'TONOR TC-777 — budget mic not discussed in text'],
  ['best-mic-for-podcasting', 0, 290, 'Rode XCM-50 — USB mic not discussed in text'],
  ['best-mic-for-podcasting', 0, 291, 'AT2020USB-X — USB mic not discussed in text'],
  ['best-mic-for-podcasting', 0, 292, 'Rode NT-USB Mini — USB mic not discussed in text'],
  ['best-electric-guitars-2026', 3, 157, 'Jazz Bass is a bass, not electric guitar'],
  ['beginner-bass-guitars', 0, 310, 'Squier Affinity Strat is a guitar, not a bass'],
  ['beginner-bass-guitars', 1, 311, 'Squier Classic Vibe 50s Strat is a guitar, not a bass'],
];

let removed = 0;
fixes.forEach(([hid, si, pid, reason]) => {
  const h = g.find(x => x.id === hid);
  if (!h) { console.log('GUIDE NOT FOUND:', hid); return; }
  const s = h.sections[si];
  if (!s) { console.log('SECTION NOT FOUND:', hid, si); return; }
  const idx = (s.products || []).indexOf(pid);
  if (idx > -1) {
    s.products.splice(idx, 1);
    removed++;
    console.log(`[${hid}] sec${si}: removed ${pid} (${name(pid)}): ${reason}`);
  } else {
    console.log(`NOT FOUND: ${pid} in ${hid} section ${si}`);
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log('\nTotal removed:', removed);
