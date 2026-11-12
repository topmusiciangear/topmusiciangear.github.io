// Contextos exactos de fugas EN confirmadas en campos ES
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const NEEDLES = [
  'Pocket sketching and punch-in performance FX',
  'Mobile production with Stems and 3D expression',
  'Analytical composition and surgical precision',
  '3-way with switchable Focus mode',
  '61-key Fatar with velocity/aftertouch',
  'run-and-gun',
  'pumping four-on-the-floor',
  'Staging de ganancia',
  'mothership',
  'multipista',
  'multitrack',
  'auriculares cerrados de tracking'
];
const FILES = ['data/guides.json', 'data/products.json', 'data/deals.json', 'data/manual-deals.json'];
const out = [];
for (const f of FILES) {
  const p = B + f;
  if (!fs.existsSync(p)) continue;
  const t = fs.readFileSync(p, 'utf8');
  for (const needle of NEEDLES) {
    let idx = 0;
    while ((idx = t.indexOf(needle, idx)) >= 0) {
      const a = Math.max(0, idx - 160), b = Math.min(t.length, idx + needle.length + 160);
      out.push('### ' + f + ' @' + idx + ' «' + needle + '»\n' + t.slice(a, b).replace(/\s+/g, ' ') + '\n');
      idx += needle.length;
    }
  }
}
fs.writeFileSync(B + 'temp/enleak_contexts.txt', out.join('\n'), 'utf8');
console.log('total: ' + out.length + ' -> temp/enleak_contexts.txt');
