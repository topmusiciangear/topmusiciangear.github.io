const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));

let n = 0;
function clean(obj, campoEs) {
  if (typeof obj === 'string') {
    if (campoEs && obj === 'EV ZLX-12P-G2 Active PA Speaker') { n++; return 'Altavoz Activo EV ZLX-12P-G2'; }
    return obj;
  }
  if (Array.isArray(obj)) return obj.map(x => clean(x, campoEs));
  if (obj && typeof obj === 'object') {
    const o = {};
    Object.keys(obj).forEach(k => { o[k] = clean(obj[k], /_es$/i.test(k)); });
    return o;
  }
  return obj;
}
const fixed = clean(guides, false);
fs.writeFileSync(gf, JSON.stringify(fixed, null, 2), 'utf8');
console.log('corregidos: ' + n);

// verificar
const g = fixed.find(x=>x.id==='live-sound-pa');
console.log('ES veredictos: ' + g.verdictProsCons.map(v=>v.name_es||v.name).join(' | '));
const g2 = fixed.find(x=>x.id==='active-vs-passive-pa');
console.log('ES columnas: ' + g2.productTable.columns.map(c=>c.title_es||c.title).join(' | '));
console.log('ES veredictos: ' + g2.verdictProsCons.map(v=>v.name_es||v.name).join(' | '));