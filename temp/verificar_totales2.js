// ¿Cuadran los tres totales con el catalogo? Leyendo la tabla, no a mano.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);
const byTitle = {};
list.forEach(p => { byTitle[p.title.toLowerCase()] = p; });
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const t = guia.productTable;

function precioDe(texto) {
  if (!texto || /^(Soloiterateauriculares|Solo auriculares)/i.test(texto.trim())) return null;
  // buscar el producto por fragmento del nombre
  const limpio = texto.replace(/\(.*?\)/g, '').trim();
  for (const p of list) {
    const t2 = p.title.toLowerCase();
    if (limpio.toLowerCase().includes(t2) || t2.includes(limpio.toLowerCase().slice(0, 18))) return p;
  }
  // coincidencias parciales por palabras clave
  const palabras = limpio.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2 && !/par|cada|uno|condensador|dinamico|recomendado/.test(w));
  let mejor = null, score = 0;
  list.forEach(p => {
    const t2 = p.title.toLowerCase();
    let s = 0;
    palabras.forEach(w => { if (t2.includes(w)) s++; });
    if (s > score) { score = s; mejor = p; }
  });
  return score >= Math.max(2, Math.ceil(palabras.length * 0.6)) ? mejor : null;
}

const cols = t.columns.length;
console.log('=== LOS TRES MONTAJES,.item a item ===\n');

for (let c = 0; c < cols; c++) {
  const titulo = t.columns[c].title_es || t.columns[c].title;
  console.log('\n■ ' + titulo);
  let suma = 0, desconocido = [];
  t.rows.forEach(r => {
    if (r.label === 'Total') return;
    const celda = r.values[c];
    const txt = celda.value_es || celda.value;
    const p = precioDe(txt);
    let coste = null;
    if (p) {
      coste = p.price;
      // "(par)" o "x2"
      if (/\(par\)|pair/i.test(txt)) coste = p.price * 2;
    }
    if (coste === null) { desconocido.push((r.label_es || r.label) + ': "' + txt + '"'); }
    else suma += coste;
    console.log('   ' + (r.label_es || r.label).padEnd(22) + txt.slice(0, 44).padEnd(46) +
      (coste !== null ? ('$' + coste).padStart(8) : '     ???'));
  });
  const filaTotal = t.rows.find(r => r.label === 'Total');
  const dice = parseInt((filaTotal.values[c].value || '').replace(/[^0-9]/g, ''), 10);
  console.log('   ' + '-'.repeat(64));
  console.log('   ' + 'SUMA REAL'.padEnd(22) + ('$' + suma).padStart(52));
  console.log('   ' + 'LA TABLA DICE'.padEnd(22) + ('~$' + dice).padStart(52) +
    (suma === dice ? '   CUADRA' : '   <<< NO CUADRA (faltan $' + (dice - suma) + ')'));
  if (desconocido.length) {
    console.log('   sin precio asignado:');
    desconocido.forEach(u => console.log('      - ' + u));
  }
}
