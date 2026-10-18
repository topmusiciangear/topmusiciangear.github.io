const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const nuevos = [1042, 1043, 1044, 1046, 1047, 1048];

const mids = products.filter(p => p.category === 'monitors' && !nuevos.includes(p.id));
const largos = mids.map(p => ({ t: p.title, e: (p.desc || '').length, es: (p.desc_es || '').length })).sort((a, b) => b.e - a.e);
const lens = mids.map(p => (p.desc || '').length).sort((a, b) => a - b);
const p90 = lens[Math.floor(lens.length * 0.9)];
const max = lens[lens.length - 1];
console.log('=== DESCRIPCIONES DE LOS MONITORES QUE YA FUNCIONAN ===');
console.log('  n=' + mids.length + ' | mediana=' + lens[Math.floor(lens.length / 2)] + ' | p90=' + p90 + ' | max=' + max);
console.log('  las 5 mas largas:');
largos.slice(0, 5).forEach(x => console.log('    ' + String(x.e).padStart(4) + ' / ' + String(x.es).padStart(4) + '  ' + x.t));

console.log('\n=== MIS 6 NUEVOS ===');
products.filter(p => nuevos.includes(p.id)).forEach(p => {
  const e = (p.desc || '').length, es = (p.desc_es || '').length;
  const aviso = e > p90 ? '  <-- mas larga que el p90, se va a cortar' : '';
  console.log('  ' + p.id + ' ' + p.title.padEnd(28) + 'EN=' + String(e).padStart(4) + '  ES=' + String(es).padStart(4) + aviso);
});

// cuanto cabe en 3 lineas: estimar con el ancho de la card
const css = fs.readFileSync(B + 'css/style.css', 'utf8');
const m = css.match(/guide-product-card-desc[^}]*}/);
console.log('\n=== CSS de la descripcion de card ===');
console.log(m ? m[0] : 'no encontrado');
