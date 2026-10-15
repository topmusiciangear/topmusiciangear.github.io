// Limpiar los nombres ES que el script anterior dejo en campos EN de guides.json.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const EN_FINAL = {
  105: 'EV ZLX-12P-G2 Active PA Speaker',
  493: 'JBL EON712 Active PA Speaker',
  106: 'QSC K12.2 Active PA Speaker',
  495: 'EV ELX200-15P Active PA Speaker',
  154: 'Yamaha DBR12 Active PA Speaker',
  494: 'LD Systems ICOA 12 A BT Active PA Speaker',
  109: 'JBL PRX ONE Active PA Column',
  108: 'Yamaha DXR12mkII Active PA Speaker',
  152: 'Yamaha Stagepas 1K MKII Active PA Mixer',
  153: 'Alto Professional TS412 Active PA Speaker',
  626: 'Electro-Voice EVERSE 12 Active PA Speaker'
};

// Por cada guia, revisar campos EN de tablas, veredictos y featuredSnippet.
// Si el valor coincide con un nombre ES incorrecto, poner el EN correcto.
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json','utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

// Mapa inverso: nombre ES -> nombre EN correcto
const ES_A_EN = {};
list.forEach(p => {
  // reconstruir el ES que el script anterior habria generado
  const esAnterior = p.title.replace('Active PA Speaker', 'Altavoz Activo')
                           .replace('Active PA Column', 'Columna PA Activa')
                           .replace('Active PA Mixer', 'Mezclador PA Activo');
  if (esAnterior !== p.title) ES_A_EN[esAnterior] = p.title;
});
console.log('Nombres ES a reemplazar en campos EN:');
Object.entries(ES_A_EN).forEach(([es, en]) => console.log('  "' + es + '" -> "' + en + '"'));

let n = 0;
function clean(obj) {
  if (typeof obj === 'string') {
    if (ES_A_EN[obj]) { n++; return ES_A_EN[obj]; }
    return obj;
  }
  if (Array.isArray(obj)) return obj.map(clean);
  if (obj && typeof obj === 'object') {
    const o = {};
    Object.keys(obj).forEach(k => {
      // Solo reemplazar en campos EN (no en _es)
      if (k.endsWith('_es') || k.endsWith('ES') || k === 'title_es' || k === 'name_es') {
        o[k] = obj[k]; // no tocar ES
      } else {
        o[k] = clean(obj[k]);
      }
    });
    return o;
  }
  return obj;
}

const fixed = clean(guides);
fs.writeFileSync(gf, JSON.stringify(fixed, null, 2), 'utf8');
console.log('\nreemplazos hechos: ' + n);

// Verificar las dos guías
['live-sound-pa','active-vs-passive-pa'].forEach(gid => {
  const g = fixed.find(x => x.id === gid);
  console.log('\n=== ' + gid + ' ===');
  if (g.productTable) {
    console.log('columnas EN: ' + g.productTable.columns.map(c=>c.title).join(' | '));
    console.log('columnas ES: ' + g.productTable.columns.map(c=>c.title_es||c.title).join(' | '));
  }
  if (g.comparison) {
    const ch = g.comparison.headers || [];
    console.log('comparison headers EN: ' + ch.map(h=>h.title||h.name||JSON.stringify(h)).join(' | '));
  }
  console.log('veredictos EN: ' + g.verdictProsCons.map(v=>v.name).join(' | '));
  console.log('veredictos ES: ' + g.verdictProsCons.map(v=>v.name_es||v.name).join(' | '));
});

// Verificacion global: ningun campo EN con nombre en espanol
let quedan = 0;
fixed.forEach(g => {
  const s = JSON.stringify(g);
  Object.keys(ES_A_EN).forEach(es => {
    const n2 = (s.split('"'+es+'"').length - 1);
    if (n2) { quedan += n2; console.log('  VIEJO en ' + g.id + ' x' + n2 + ': ' + es); }
  });
});
console.log('\nnombres ES en campos EN: ' + quedan);
const cjk = (JSON.stringify(fixed).match(/[\u4e00-\u9fff]/g) || []);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));