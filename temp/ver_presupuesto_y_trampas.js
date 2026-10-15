const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const s = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8')).find(x => x.id === 'starter-studio');
const src = fs.readFileSync(B + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const mapa = new Function('return ' + src.slice(ini + 'const TEST_SHOP_BTN = '.length, src.indexOf('\n};', ini) + 2))();

function prec(id, par) {
  const x = p.find(y => y.id === id);
  const cfg = mapa[id];
  const amz = cfg && cfg.prices && cfg.prices.amazon;
  const n = amz ? parseFloat(String(amz).replace(/[^0-9.]/g, '')) : x.price;
  return { n: par ? n * 2 : n, de: amz ? 'Amazon' : 'catalogo', t: x.title };
}

const TIERS = [
  { n: 1, total: '~$900',   items: [[15, 0], [297, 0], [609, 0], [684, 1], [170, 0], [58, 0]] },
  { n: 2, total: '~$1,357', items: [[18, 0], [3, 0], [25, 0], [20, 1], [170, 0], [58, 0]] },
  { n: 3, total: '~$2,797', items: [[16, 0], [674, 0], [26, 0], [19, 1], [170, 0], [58, 0]] }
];

console.log('=== DESGLOSE DE CADA NIVEL (boton de Amazon, con respaldo en catalogo) ===\n');
TIERS.forEach(T => {
  console.log('  NIVEL ' + T.n + '   (la tabla dice ' + T.total + ')');
  let suma = 0;
  T.items.forEach(([id, par]) => {
    const q = prec(id, par);
    suma += q.n;
    console.log('    ' + ('$' + q.n.toFixed(2)).padStart(9) + '  ' + q.de.padEnd(10) + (q.t + (par ? ' (par)' : '')).slice(0, 58));
  });
  console.log('    ' + '-'.repeat(80));
  console.log('    ' + ('$' + suma.toFixed(2)).padStart(9) + '  TOTAL  -> ' + (Math.round(suma) === parseInt(T.total.replace(/[^0-9]/g, ''), 10) ? 'coincide con ' + T.total : 'DIFIERE de ' + T.total));
  console.log('');
});

console.log('=== HAY TRAMPAS DE GRAVES O TRATAMIENTO DE BAJO EN EL CATALOGO? ===');
const acustico = p.filter(x => /acoustic|trap|bass trap|foam|panel|absor/i.test(x.title || '') || /accessories/.test(x.category || ''));
acustico.forEach(x => {
  const cfg = mapa[x.id];
  const amz = cfg && cfg.prices && cfg.prices.amazon;
  console.log('  ' + String(x.id).padStart(4) + '  ' + (x.title || '').slice(0, 60));
  console.log('        $' + x.price + '  ' + (amz ? 'Amazon ' + amz : 'sin Amazon (catalogo)') + '  cat=' + x.category);
});
if (!acustico.length) console.log('  (ninguno)');
