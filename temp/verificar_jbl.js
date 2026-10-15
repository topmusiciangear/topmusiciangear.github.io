// Verificar los 3 puntos criticos de la tabla propuesta
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

console.log('=== 1) JBL 305P MkII en el catalogo (id 116) ===\n');
const jbl = list.find(p => /305P/i.test(p.title));
console.log(JSON.stringify(jbl, null, 1));
console.log('\n  Categoria: ' + jbl.category + '   (catálogo "monitors" vs "speakers"/"pasivas"?)');
console.log('  precio: $' + jbl.price);

console.log('\n\n=== 2) como estan categorizados los monitores en el catalogo ===\n');
const cats = {};
list.filter(p => /jbl|krk|genelec|adam|monitor|rokit|hs[0-9]|305p|freshman|adam/i.test(p.title))
  .forEach(p => { (cats[p.category] = cats[p.category] || []).push(p.title + '  $' + p.price); });
Object.entries(cats).forEach(([k, v]) => {
  console.log('  ' + k + ' (' + v.length + '):');
  v.slice(0, 8).forEach(t => console.log('     ' + t));
});

console.log('\n\n=== 3) El nivel 1 con Rokit 5 G5: ¿de verdad sale a $690? ===\n');
const N1 = [['Focusrite Scarlett 2i2', 15, 1], ['Rode NT1 Signature', 297, 1], ['ATH-M20x', 609, 1],
  ['K&M 210/2', 58, 1], ['Paneles G4M', 170, 1], ['KRK Rokit 5 G5 x2', 633, 2]];
let s = 0;
N1.forEach(([n, id, m]) => { const v = byId[id].price * m; s += v; console.log('  ' + n.padEnd(26) + '$' + v); });
console.log('  ' + '-'.repeat(34));
console.log('  ' + 'TOTAL REAL'.padEnd(26) + '$' + s);
console.log('\n  la tabla dice ~$690  ->  ' + (s === 690 ? 'cuadra' : 'FALTAN $' + (s - 690)));

console.log('\n\n=== 4) Lo que costaria DEJAR FUERA algo para llegar a $690 ===\n');
console.log('  Sin los paneles acusticos ($' + byId[170].price + '):        $' + (s - byId[170].price));
console.log('  Sin el soporte K&M ($' + byId[58].price + '):              $' + (s - byId[58].price));
console.log('  Con un solo Rokit 5 en vez de par:                $' + (s - byId[633].price));
console.log('  Sin paneles y con un solo monitor:                $' + (s - byId[170].price - byId[633].price));

console.log('\n\n=== 5) Rokit 7 G5: potencia y respuesta de frecuencia ===\n');
console.log('  id 20 desc EN: ' + byId[20].desc);
console.log('  La guia dice "145 vatios EN TOTAL: 97 grave + 48 agudo" (ya verificado).');
console.log('  Si son 145W por monitor, el par seria 290W. Hay que confirmar cual es.');
