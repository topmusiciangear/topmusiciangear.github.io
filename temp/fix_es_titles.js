// Corregir title_es de los 7 productos que no se actualizaron,
// reescribir el desc_es del DBR12, y actualizar los campos ES en guides.json.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// --- PASO 1: products.json ---
const pf = BASE + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pf, 'utf8'));
const arr = Array.isArray(products) ? products : products.products;

const TITLE_ES_FIX = {
  108: 'Altavoz Activo Yamaha DXR12mkII',
  109: 'Columna PA Activa JBL PRX ONE',
  152: 'Mezclador PA Activo Yamaha Stagepas 1K MKII',
  153: 'Altavoz Activo Alto Professional TS412',
  154: 'Altavoz Activo Yamaha DBR12',
  494: 'Altavoz Activo LD Systems ICOA 12 A BT',
  626: 'Altavoz Activo Electro-Voice EVERSE 12'
};

// desc_es del DBR12 reescrito en espanol natural
const DESC_ES_FIX = {
  154: 'El altavoz activo economico mejor valorado para sonido en vivo. 1000W de potencia pico con altavoz de graves de 12 pulgadas y driver de compresion de 1.4 pulgadas que alcanza 131 dB SPL. Ajuste FIR-X de Yamaha para respuesta de fase lineal. DSP D-CONTOUR. Usalo como PA principal o monitor de piso. Fiabilidad legendaria de Yamaha con garantia de 7 anos.'
};

let fixed = 0;
arr.forEach(p => {
  if (TITLE_ES_FIX[p.id] && p.title_es !== TITLE_ES_FIX[p.id]) {
    console.log('  title_es id ' + p.id + ': "' + p.title_es + '" -> "' + TITLE_ES_FIX[p.id] + '"');
    p.title_es = TITLE_ES_FIX[p.id];
    fixed++;
  }
  if (DESC_ES_FIX[p.id] && p.desc_es !== DESC_ES_FIX[p.id]) {
    console.log('  desc_es id ' + p.id + ' reescrito');
    p.desc_es = DESC_ES_FIX[p.id];
    fixed++;
  }
});
if (Array.isArray(products)) fs.writeFileSync(pf, JSON.stringify(arr, null, 2), 'utf8');
else { products.products = arr; fs.writeFileSync(pf, JSON.stringify(products, null, 2), 'utf8'); }
console.log('products.json: ' + fixed + ' campos corregidos\n');

// --- PASO 2: guides.json — actualizar campos ES ---
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));

const ES_MAP = {
  'Yamaha DXR12mkII':               'Altavoz Activo Yamaha DXR12mkII',
  'JBL PRX ONE':                    'Columna PA Activa JBL PRX ONE',
  'Yamaha Stagepas 1K MKII':        'Mezclador PA Activo Yamaha Stagepas 1K MKII',
  'Alto Professional TS412':        'Altavoz Activo Alto Professional TS412',
  'Yamaha DBR12':                    'Altavoz Activo Yamaha DBR12',
  'LD Systems ICOA 12 A BT':         'Altavoz Activo LD Systems ICOA 12 A BT',
  'Electro-Voice EVERSE 12':        'Altavoz Activo Electro-Voice EVERSE 12'
};

let nES = 0;
function clean(obj, campoEs) {
  if (typeof obj === 'string') {
    if (campoEs && ES_MAP[obj]) { nES++; return ES_MAP[obj]; }
    return obj;
  }
  if (Array.isArray(obj)) return obj.map(x => clean(x, campoEs));
  if (obj && typeof obj === 'object') {
    const o = {};
    Object.keys(obj).forEach(k => {
      o[k] = clean(obj[k], /_es$/i.test(k));
    });
    return o;
  }
  return obj;
}

const fixed2 = clean(guides, false);
fs.writeFileSync(gf, JSON.stringify(fixed2, null, 2), 'utf8');
console.log('guides.json: ' + nES + ' campos ES actualizados');

// --- verificacion ---
['live-sound-pa','active-vs-passive-pa'].forEach(gid => {
  const g = fixed2.find(x => x.id === gid);
  console.log('\n=== ' + gid + ' ===');
  if (g.productTable) {
    console.log('columnas ES: ' + g.productTable.columns.map(c => c.title_es || c.title).join(' | '));
  }
  console.log('veredictos ES: ' + g.verdictProsCons.map(v => v.name_es || v.name).join(' | '));
});

// celdas desajustadas
let desajuste = 0;
fixed2.forEach(x => {
  if (x.productTable) {
    const nc = x.productTable.columns.length;
    x.productTable.rows.forEach(r => { if (r.values.length !== nc) desajuste++; });
  }
});
console.log('\nceldas desajustadas: ' + desajuste);
const cjk = (JSON.stringify(fixed2).match(/[\u4e00-\u9fff]/g) || []);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));