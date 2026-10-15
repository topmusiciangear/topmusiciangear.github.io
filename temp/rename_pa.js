// Renombrado global: products.json + guides.json (tablas y veredictos).
// El build genera las tarjetas desde el catálogo, así que el renombre
// hay que replicarlo en guias.json para mantener la invariante.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const EN = {
  'EV ZLX-12P-G2 Powered Speaker':        'EV ZLX-12P-G2 Active PA Speaker',
  'JBL EON712 Powered Speaker':            'JBL EON712 Active PA Speaker',
  'QSC K12.2 Powered Speaker':             'QSC K12.2 Active PA Speaker',
  'EV ELX200-15P Powered Speaker':        'EV ELX200-15P Active PA Speaker',
  'Yamaha DBR12':                         'Yamaha DBR12 Active PA Speaker',
  'LD Systems ICOA 12 A BT':              'LD Systems ICOA 12 A BT Active PA Speaker',
  'JBL PRX ONE':                          'JBL PRX ONE Active PA Column',
  'Yamaha DXR12mkII':                     'Yamaha DXR12mkII Active PA Speaker',
  'Yamaha Stagepas 1K MKII':              'Yamaha Stagepas 1K MKII Active PA Mixer',
  'Alto Professional TS412':              'Alto Professional TS412 Active PA Speaker',
  'Electro-Voice EVERSE 12':              'Electro-Voice EVERSE 12 Active PA Speaker'
};
const ES = {
  'Altavoz Activo EV ZLX-12P-G2':         'Altavoz Activo EV ZLX-12P-G2',
  'Altavoz Activo JBL EON712':            'Altavoz Activo JBL EON712',
  'Altavoz Activo EV ELX200-15P':         'Altavoz Activo EV ELX200-15P',
  'Altavoz Activo Mackie SRT215':         'Altavoz Activo Mackie SRT215',
  'Yamaha DBR12':                         'Altavoz Activo Yamaha DBR12',
  'JBL PRX ONE':                          'Columna PA Activa JBL PRX ONE',
  'Yamaha DXR12mkII':                     'Altavoz Activo Yamaha DXR12mkII',
  'LD Systems ICOA 12 A BT':              'Altavoz Activo LD Systems ICOA 12 A BT',
  'Alto Professional TS412':              'Altavoz Activo Alto Professional TS412',
  'Electro-Voice EVERSE 12':              'Altavoz Activo Electro-Voice EVERSE 12',
  'Yamaha Stagepas 1K MKII':              'Mezclador PA Activo Yamaha Stagepas 1K MKII'
};
const MAP = {};
Object.keys(EN).forEach(k => { MAP[k] = EN[k]; });
Object.keys(ES).forEach(k => { MAP[k] = ES[k]; });

function deepReplace(obj) {
  if (typeof obj === 'string') return MAP[obj] !== undefined ? MAP[obj] : obj;
  if (Array.isArray(obj)) return obj.map(deepReplace);
  if (obj && typeof obj === 'object') {
    const o = {};
    Object.keys(obj).forEach(k => { o[k] = deepReplace(obj[k]); });
    return o;
  }
  return obj;
}

// --- products.json ---
const pf = BASE + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pf, 'utf8'));
const arr = Array.isArray(products) ? products : products.products;
let nCat = 0;
arr.forEach(p => {
  if (MAP[p.title]) { console.log('  cat   id ' + p.id + ': ' + p.title + '  ->  ' + MAP[p.title]); p.title = MAP[p.title]; nCat++; }
});
if (Array.isArray(products)) fs.writeFileSync(pf, JSON.stringify(arr, null, 2), 'utf8');
else { products.products = arr; fs.writeFileSync(pf, JSON.stringify(products, null, 2), 'utf8'); }
console.log('products.json: ' + nCat + ' productos renombrados');

// --- guides.json ---
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
let nGuides = 0, nFields = 0;
guides.forEach(g => {
  const before = JSON.stringify(g);
  const g2 = deepReplace(g);
  const after = JSON.stringify(g2);
  if (before !== after) {
    nGuides++;
    const s = after.length - before.length;
    nFields++;
  }
  Object.assign(g, g2);
});
fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('guides.json: ' + nGuides + ' guías tocadas');

// --- verificar que no queda ningun nombre viejo en las dos guías ---
const VIEJOS = Object.keys(MAP);
const quedan = {};
guides.forEach(g => {
  if (g.id !== 'live-sound-pa' && g.id !== 'active-vs-passive-pa') return;
  const s = JSON.stringify(g);
  VIEJOS.forEach(v => {
    const n = (s.split('"'+v+'"').length - 1);
    if (n) quedan[v] = (quedan[v]||0) + n;
  });
});
console.log('\nnombres viejos restantes en las dos guías:');
console.log(Object.keys(quedan).length ? Object.entries(quedan).map(([k,v])=>'  '+v+'x  '+k).join('\n') : '  ninguno');

// integridad de tablas
let desajuste = 0;
guides.forEach(x => {
  if (x.productTable) {
    const nc = x.productTable.columns.length;
    x.productTable.rows.forEach(r => { if (r.values.length !== nc) desajuste++; });
  }
});
console.log('celdas desajustadas: ' + desajuste);
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g) || []);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));