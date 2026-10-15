// Añadir precios VERIFICADOS al mapa. Solo los comprobados en la web ahora.
// Regla del sitio: nunca inventar precios; lo no verificado se deja fuera.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = BASE + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

// Verificados en gear4music.com esta sesion (con IVA, stock real):
const NUEVOS = {
  15: '  15: {prices:{gear4music:"£189.00"}},\n',
  18: '  18: {prices:{gear4music:"£230.00"}},\n'
};

// localizar el cierre del mapa "};" despues de "const TEST_SHOP_BTN = {"
const ini = s.indexOf('const TEST_SHOP_BTN = {');
if (ini < 0) { console.log('NO ENCONTRADO el mapa'); process.exit(1); }
const cierre = s.indexOf('\n};', ini);
if (cierre < 0) { console.log('NO ENCONTRADO el cierre'); process.exit(1); }

let anadidos = 0;
Object.keys(NUEVOS).forEach(id=>{
  // ¿ya existe?
  const re = new RegExp('(^|\\n)\\s*' + id + ':\\s*\\{');
  if (re.test(s.slice(ini, cierre))) { console.log('  id ' + id + ': ya existe, se salta'); return; }
  s = s.slice(0, cierre + 1) + NUEVOS[id] + s.slice(cierre + 1);
  anadidos++;
  console.log('  id ' + id + ': añadido -> ' + NUEVOS[id].trim());
});

fs.writeFileSync(f, s, 'utf8');
console.log('\nanadidos: ' + anadidos);

// verificar sintaxis
try {
  new Function(s.replace(/^#!.*/, ''));
  console.log('sintaxis: OK');
} catch (e) {
  console.log('SYNTAXIS ROTA: ' + e.message);
}