// Corregir el catálogo: los nombres deben estar en EN (como el resto del sitio).
// Luego renombrar en guides.json distinguiendo campos .title / .name de .title_es / .name_es.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// Nombres EN definitivos
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

// --- PASO 1: arreglar el catálogo (nombres EN) ---
const pf = BASE + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pf, 'utf8'));
const arr = Array.isArray(products) ? products : products.products;
let fixed = 0;
arr.forEach(p => {
  if (EN_FINAL[p.id] && p.title !== EN_FINAL[p.id]) {
    console.log('  FIX id ' + p.id + ': "' + p.title + '"  ->  "' + EN_FINAL[p.id] + '"');
    p.title = EN_FINAL[p.id];
    fixed++;
  }
});
if (Array.isArray(products)) fs.writeFileSync(pf, JSON.stringify(arr, null, 2), 'utf8');
else { products.products = arr; fs.writeFileSync(pf, JSON.stringify(products, null, 2), 'utf8'); }
console.log('products.json corregido: ' + fixed + '\n');

// --- PASO 2: renombrar en guides.json por campo ---
// Mapeos EN: titulo viejo -> titulo nuevo
const MAP_EN = {
  'EV ZLX-12P-G2 Powered Speaker':   'EV ZLX-12P-G2 Active PA Speaker',
  'JBL EON712 Powered Speaker':       'JBL EON712 Active PA Speaker',
  'QSC K12.2 Powered Speaker':        'QSC K12.2 Active PA Speaker',
  'EV ELX200-15P Powered Speaker':   'EV ELX200-15P Active PA Speaker',
  'Yamaha DBR12':                    'Yamaha DBR12 Active PA Speaker',
  'LD Systems ICOA 12 A BT':         'LD Systems ICOA 12 A BT Active PA Speaker',
  'JBL PRX ONE':                     'JBL PRX ONE Active PA Column',
  'Yamaha DXR12mkII':                'Yamaha DXR12mkII Active PA Speaker',
  'Yamaha Stagepas 1K MKII':         'Yamaha Stagepas 1K MKII Active PA Mixer',
  'Alto Professional TS412':         'Alto Professional TS412 Active PA Speaker',
  'Electro-Voice EVERSE 12':         'Electro-Voice EVERSE 12 Active PA Speaker'
};
// Mapeos ES: titulo viejo -> titulo nuevo
const MAP_ES = {
  'Altavoz Activo EV ZLX-12P-G2':    'Altavoz Activo EV ZLX-12P-G2',
  'Altavoz Activo JBL EON712':       'Altavoz Activo JBL EON712',
  'Altavoz Activo EV ELX200-15P':    'Altavoz Activo EV ELX200-15P',
  'Altavoz Activo Mackie SRT215':    'Altavoz Activo Mackie SRT215',
  'Yamaha DBR12':                    'Altavoz Activo Yamaha DBR12',
  'JBL PRX ONE':                     'Columna PA Activa JBL PRX ONE',
  'Yamaha DXR12mkII':                'Altavoz Activo Yamaha DXR12mkII',
  'LD Systems ICOA 12 A BT':         'Altavoz Activo LD Systems ICOA 12 A BT',
  'Alto Professional TS412':         'Altavoz Activo Alto Professional TS412',
  'Electro-Voice EVERSE 12':         'Altavoz Activo Electro-Voice EVERSE 12',
  'Yamaha Stagepas 1K MKII':         'Mezclador PA Activo Yamaha Stagepas 1K MKII'
};

// Campos EN y ES que pueden contener nombres de producto
const CAMPOS_EN = ['title', 'name', 'name1_en', 'name2_en'];
const CAMPOS_ES = ['title_es', 'name_es', 'name1_es', 'name2_es'];

function deepReplaceGuias(obj) {
  if (typeof obj === 'string') return obj; // no tocar strings sueltos
  if (Array.isArray(obj)) return obj.map(deepReplaceGuias);
  if (obj && typeof obj === 'object') {
    const o = {};
    Object.keys(obj).forEach(k => {
      let v = deepReplaceGuias(obj[k]);
      if (typeof v === 'string') {
        if (CAMPOS_EN.includes(k) && MAP_EN[v] !== undefined) v = MAP_EN[v];
        else if (CAMPOS_ES.includes(k) && MAP_ES[v] !== undefined) v = MAP_ES[v];
      }
      o[k] = v;
    });
    return o;
  }
  return obj;
}

const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const before = JSON.stringify(guides);
const fixed2 = deepReplaceGuias(guides);
const after = JSON.stringify(fixed2);
fs.writeFileSync(gf, JSON.stringify(fixed2, null, 2), 'utf8');
console.log('guides.json: ' + (before !== after ? 'tocado' : 'sin cambios'));

// --- verificar en las dos guías ---
['live-sound-pa','active-vs-passive-pa'].forEach(gid => {
  const g = fixed2.find(x => x.id === gid);
  console.log('\n=== ' + gid + ' ===');
  if (g.productTable) {
    console.log('columnas EN: ' + g.productTable.columns.map(c=>c.title).join(' | '));
    console.log('columnas ES: ' + g.productTable.columns.map(c=>c.title_es||c.title).join(' | '));
  }
  if (g.comparison) {
    console.log('comparison headers EN: ' + g.comparison.headers.map(h=>h.title||h.name).join(' | '));
    console.log('comparison headers ES: ' + (g.comparison.headers_es||g.comparison.headers||[]).map(h=>h.title_es||h.name_es||h.title||h.name).join(' | '));
  }
  console.log('veredictos EN: ' + g.verdictProsCons.map(v=>v.name).join(' | '));
  console.log('veredictos ES: ' + g.verdictProsCons.map(v=>v.name_es||v.name).join(' | '));
});

// --- búsqueda de nombres EN viejos en TODO el sitio ---
const VIEJOS_EN = Object.keys(MAP_EN);
let quedan = 0;
const G2 = JSON.parse(fs.readFileSync(gf,'utf8'));
G2.forEach(g => {
  const s = JSON.stringify(g);
  VIEJOS_EN.forEach(v => {
    const n = (s.split('"'+v+'"').length - 1);
    if (n) { quedan += n; console.log('  VIEJO en ' + g.id + ' x' + n + ': ' + v); }
  });
});
console.log('\nnombres EN viejos en guides.json: ' + quedan);

// celdas desajustadas
let desajuste = 0;
G2.forEach(x => {
  if (x.productTable) {
    const nc = x.productTable.columns.length;
    x.productTable.rows.forEach(r => { if (r.values.length !== nc) desajuste++; });
  }
});
console.log('celdas desajustadas: ' + desajuste);
const cjk = (JSON.stringify(G2).match(/[\u4e00-\u9fff]/g) || []);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));