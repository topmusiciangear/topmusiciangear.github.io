const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ===== 1. Amazon para el PreSonus Eris 3.5 2nd Gen (1042) =====
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));
const p = products.find(x => x.id === 1042);
if (!p.stores.amazon) {
  p.stores.amazon = 'https://www.amazon.com/dp/B0HKZ9NTP1?tag=topmusicg-20';
  fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');
  console.log('1042 PreSonus Eris 3.5 2nd Gen: anadido Amazon -> ' + p.stores.amazon);
} else {
  console.log('1042 ya tenia Amazon');
}

// ===== 2. Los 35 enlaces Amazon de TEST_SHOP_BTN sin tag =====
const rb = B + 'build-guides.js';
let s = fs.readFileSync(rb, 'utf8');

const re = /(amazon:\s*")((?:https:\/\/)?(?:www\.)?amazon\.[a-z.]+\/dp\/[A-Z0-9]{10})(\/?)(\?[^"]*)?(")/g;
let total = 0, corregidos = 0, ejemplos = [];
let salida = '';
let ultimo = 0;
let m;
while ((m = re.exec(s)) !== null) {
  total++;
  const [todo, q1, base, barra, query, q2] = m;
  if (query && /tag=/.test(query)) { salida += s.slice(ultimo, m.index + todo.length); ultimo = m.index + todo.length; continue; }
  // limpiar parametros de sesion y anadir solo el tag
  const params = query ? query.replace(/[?&]/, '').split('&').filter(Boolean) : [];
  const final = ['tag=topmusicg-20'].concat(params.filter(x => !/^tag=/.test(x))).join('&');
  salida += s.slice(ultimo, m.index) + q1 + base + '?' + final + q2;
  ultimo = m.index + todo.length;
  corregidos++;
  if (ejemplos.length < 6) ejemplos.push(base + '?' + final);
}
salida += s.slice(ultimo);
fs.writeFileSync(rb, salida, 'utf8');

console.log('\n=== ENLACES AMAZON EN build-guides.js ===');
console.log('  encontrados: ' + total + ' | corregidos (sin tag): ' + corregidos + ' | ya correctos: ' + (total - corregidos));
ejemplos.forEach(e => console.log('    ' + e));

// validacion de sintaxis
try { new Function(fs.readFileSync(rb, 'utf8')); console.log('\nbuild-guides.js SINTAXIS OK'); }
catch (e) { console.log('\nERROR DE SINTAXIS: ' + e.message); }
