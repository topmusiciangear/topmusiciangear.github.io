const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = G.find(x => x.id === 'daw-guide');
const rep1 = (txt, from, to) => {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 70));
  return txt.split(from).join(to);
};
// ---------- TABLE ----------
const t = g.productTable;
const row = l => t.rows.find(r => r.label === l);
let r = row('Free Trial');
if (r.values[4].value !== 'Free with new Macs') throw new Error('trial changed');
r.values[4].value = '90-day trial';
r.values[4].value_es = 'Prueba de 90 d\u00edas';
r = row('System Requirements');
const cv = r.values.map(c => c.value);
if (cv[0] !== '4 GB RAM, multi-core' || cv[3] !== '8 GB RAM recommended') throw new Error('sysreq changed: ' + cv.join('/'));
r.values[0].value = '8 GB RAM, multi-core CPU';
r.values[0].value_es = '8 GB RAM, CPU multin\u00facleo';
r.values[3].value = '8 GB min, 16 GB recommended';
r.values[3].value_es = '8 GB m\u00edn., 16 GB recomendados';
r = row('Standout Feature');
const r idx = 5;
