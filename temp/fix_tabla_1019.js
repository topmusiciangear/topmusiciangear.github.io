const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const gp = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gp, 'utf8'));
const g = guides.find(x => x.id === 'best-guitar-plugins');
const rows = g.productTable.rows;
let n = 0;
rows.forEach((r, i) => {
  (r.values || []).forEach(c => {
    if (c.value && /400\+/.test(c.value)) { c.value = '177 models in Standard; 400+ need MAX, with Tonex capture'; n++; }
    if (c.value_es && /400\+/.test(c.value_es)) { c.value_es = '177 modelos en Standard; los 400+ requieren MAX, con captura Tonex'; n++; }
  });
});
console.log('celdas corregidas: ' + n);
console.log('fila 4 -> ' + JSON.stringify(rows[4].values[0]));
fs.writeFileSync(gp, JSON.stringify(guides, null, 2), 'utf8');

// ---- verificacion global de "400+" atribuido a AmpliTube ----
const s = JSON.stringify(g);
const contexts = [];
const re = /400\+/g; let m;
while ((m = re.exec(s)) !== null) contexts.push(s.slice(Math.max(0, m.index - 90), m.index + 60).replace(/\\u003c[^>]*\\u003e/g, ''));
console.log('\ncontextos restantes de "400+" en la guia: ' + contexts.length);
contexts.forEach(c => console.log('  ...' + c.replace(/\s+/g, ' ') + '...'));