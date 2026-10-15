const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// que tiendas deberia tener cada producto (las 5 + amazon salvo plugins/daw)
const ESPERADAS = ['zzounds', 'gear4music', 'andertons', 'musicstore', 'amazon'];

console.log('=== COBERTURA DE LINKS POR TIENDA (' + p.length + ' productos) ===');
ESPERADAS.forEach(k => {
  const con = p.filter(x => x.stores && x.stores[k]).length;
  const exc = p.filter(x => (x.excludeStores || []).includes(k)).length;
  console.log('  ' + k.padEnd(12) + String(con).padStart(4) + ' con link   ' + String(exc).padStart(3) + ' excluidos   ' + String(p.length - con - exc).padStart(4) + ' SIN link ni exclusion');
});

console.log('\n=== PRODUCTOS SIN NINGUN LINK ===');
p.filter(x => !x.stores || !Object.keys(x.stores).length).forEach(x =>
  console.log('  ' + x.id + '  ' + x.title));

// formato de las URLs de reverb: ¿directas o busqueda?
console.log('\n=== REVERB: ¿directas o busqueda? ===');
const revs = p.filter(x => x.stores && x.stores.reverb);
console.log('  productos con link reverb: ' + revs.length);
const directas = revs.filter(x => /reverb\.com\/item\//.test(x.stores.reverb));
const busqueda = revs.filter(x => !/reverb\.com\/item\//.test(x.stores.reverb));
console.log('  directas a /item/ : ' + directas.length);
console.log('  busqueda/otras    : ' + busqueda.length);
directas.slice(0, 10).forEach(x => console.log('    ' + x.id + ' ' + x.stores.reverb.slice(0, 90)));
busqueda.slice(0, 5).forEach(x => console.log('    [busq] ' + x.id + ' ' + (x.stores.reverb || '').slice(0, 90)));
