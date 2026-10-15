// Uniformar el patron "Altavoz Activo <Marca> <Modelo>" en todos los title_es y columnas ES
// que mencionen estos productos.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// Titulos ES canonicos (mismo orden que products.json)
const CANON = {
  105: 'Altavoz Activo EV ZLX-12P-G2',
  106: 'Altavoz Activo QSC K12.2',
  108: 'Altavoz Activo Yamaha DXR12mkII',
  109: 'Columna PA Activa JBL PRX ONE',
  152: 'Sistema PA Activo Yamaha Stagepas 1K MKII',
  153: 'Altavoz Activo Alto Professional TS412',
  154: 'Altavoz Activo Yamaha DBR12',
  493: 'Altavoz Activo JBL EON712',
  494: 'Altavoz Activo LD Systems ICOA 12 A BT',
  495: 'Altavoz Activo Electro-Voice ELX200-15P',
  626: 'Altavoz Activo Electro-Voice EVERSE 12'
};

// --- products.json ---
const pf = BASE + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pf, 'utf8'));
const arr = Array.isArray(products) ? products : products.products;
let n1 = 0;
arr.forEach(p => {
  if (CANON[p.id] && p.title_es !== CANON[p.id]) {
    console.log('  products id ' + p.id + ': "' + (p.title_es||'(none)') + '" -> "' + CANON[p.id] + '"');
    p.title_es = CANON[p.id];
    n1++;
  }
});
if (Array.isArray(products)) fs.writeFileSync(pf, JSON.stringify(arr, null, 2), 'utf8');
else { products.products = arr; fs.writeFileSync(pf, JSON.stringify(products, null, 2), 'utf8'); }
console.log('products.json: ' + n1 + ' title_es uniformados\n');

// --- guides.json: reemplazar cualquier variante ES por el canonico ---
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
let n2 = 0;
// Mapa de variantes -> canonico (matching por prefijo comun)
const VARIANTES = [
  [/^Altavoz PA Activo Electro-Voice ELX200-15P/, CANON[495]],
  [/^Altavoz Activo Electro-Voice ELX200-15P/, CANON[495]],
  [/^Altavoz Activo Mackie SRT215/, 'Altavoz Activo Mackie SRT215'],
  [/^Altavoz PA Activo Mackie SRT215/, 'Altavoz Activo Mackie SRT215'],
  [/^Altavoz Activo LD Systems ICOA 12 A BT/, CANON[494]],
  [/^Altavoz Activo JBL EON712/, CANON[493]],
  [/^Altavoz Activo QSC K12\.2/, CANON[106]],
  [/^Altavoz Activo EV ZLX-12P-G2/, CANON[105]],
  [/^Altavoz Activo Alto Professional TS412/, CANON[153]],
  [/^Altavoz Activo Yamaha DXR12mkII/, CANON[108]],
  [/^Altavoz Activo Yamaha DBR12/, CANON[154]],
  [/^Columna PA Activa JBL PRX ONE/, CANON[109]],
  [/^Mezclador PA Activo Yamaha Stagepas 1K MKII/, CANON[152]],
  [/^Altavoz Activo Electro-Voice EVERSE 12/, CANON[626]]
];
function fixStr(s) {
  if (typeof s !== 'string') return s;
  for (const [re, canon] of VARIANTES) {
    if (re.test(s)) {
      const r = s.replace(re, canon);
      if (r !== s) n2++;
      return r;
    }
  }
  return s;
}
function walk(obj, es) {
  if (typeof obj === 'string') return es ? fixStr(obj) : obj;
  if (Array.isArray(obj)) return obj.map(x => walk(x, es));
  if (obj && typeof obj === 'object') {
    const o = {};
    Object.keys(obj).forEach(k => { o[k] = walk(obj[k], /_es$/i.test(k)); });
    return o;
  }
  return obj;
}
const fixed = walk(guides, false);
fs.writeFileSync(gf, JSON.stringify(fixed, null, 2), 'utf8');
console.log('guides.json: ' + n2 + ' cadenas ES uniformadas');

// --- verificar ---
['live-sound-pa','active-vs-passive-pa','budget-pa-systems','best-pa-speakers','zlx-vs-k12','dxr-vs-prx'].forEach(gid => {
  const g = fixed.find(x => x.id === gid);
  if (!g || !g.productTable) return;
  console.log('\n' + gid + ' columnas ES:');
  g.productTable.columns.forEach(c => console.log('  ' + (c.title_es || c.title)));
});