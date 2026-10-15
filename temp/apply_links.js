// 1) Squier Sonic Bronco Bass (536): foto limpia + enlaces Black + precios dados por el usuario
// 2) Yamaha Montage M8x (639): Music Store no lo tiene -> quitar precio y marcar "no disponible"
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---- products.json ----
const pf = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pf, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;

const br = arr.find(p => p.id === 536);
console.log('=== ANTES id 536 ===');
console.log('  img   : ' + br.img);
Object.keys(br.stores).forEach(k => console.log('  ' + k.padEnd(11) + ': ' + br.stores[k]));

// foto limpia: se queda la de la variante Black sin el ?_gl=... de Google Ads
br.img = 'https://r2.gear4music.com/media/91/911020/1200/preview.jpg';
br.stores.gear4music = 'https://www.gear4music.com/Guitar-and-Bass/Squier-Sonic-Bronco-Bass-Black/5E5O';
br.stores.musicstore  = 'https://www.musicstore.com/en_OE/EUR/Squier-Sonic-Bronco-Bass-IL-Black/art-BAS0012451-000';
br.stores.andertons   = 'https://www.andertons.co.uk/squier-sonic-bronco-bass-guitar-black/?search_query=Squier%20Sonic%20Bronco%20Bass';
console.log('\n=== DESPUES id 536 ===');
console.log('  img   : ' + br.img);
Object.keys(br.stores).forEach(k => console.log('  ' + k.padEnd(11) + ': ' + br.stores[k]));
console.log('  (quedan ' + Object.keys(br.stores).length + ' tiendas)');

fs.writeFileSync(pf, JSON.stringify(P, null, 2), 'utf8');

// ---- build-guides.js: precios ----
const bf = BASE + 'build-guides.js';
let b = fs.readFileSync(bf, 'utf8');

const viejo536 = /(^|\n)\s*536:\s*\{[\s\S]*?\n\s*\},\n/;
const nuevo536 = `
    536: {
    prices: {
      gear4music: "£170.00",
      andertons: "£159.00",
      zzounds: "$260.00",
      musicstore: "€199.00"
    }
  },
`;
if (viejo536.test(b)) {
  b = b.replace(viejo536, nuevo536);
  console.log('\nTEST_SHOP_BTN 536: precios actualizados (£170 / £159 / $260 / €199)');
} else console.log('\n!! no encontre la entrada 536');

// Montage: fuera el precio de Music Store y a "no disponible"
const viejo639 = /(^|\n)\s*639:\s*\{[\s\S]*?\n\s*\},\n/;
const nuevo639 = `
    639: {
    prices: {
      amazon: "$4,699.99",
      zzounds: "$4,499.99",
      gear4music: "£4,290.00",
      andertons: "£4,290.00"
    },
    na: ["musicstore"]
  },
`;
if (viejo639.test(b)) {
  b = b.replace(viejo639, nuevo639);
  console.log('TEST_SHOP_BTN 639: precio de Music Store fuera, marcado na (No disponible)');
} else console.log('!! no encontre la entrada 639');

fs.writeFileSync(bf, b, 'utf8');

// ---- verificacion ----
console.log('\n--- verificacion ---');
try { new Function(fs.readFileSync(bf, 'utf8').replace(/^[\s\S]*?function buildGuidePage/m, 'function buildGuidePage')); } catch (e) { /* el fichero no es un modulo, solo comprobamos que se puede leer */ }
const b2 = fs.readFileSync(bf, 'utf8');
[536, 639].forEach(id => {
  const m = b2.match(new RegExp('(^|\\n)\\s*' + id + ':\\s*\\{[\\s\\S]*?\\n\\s*\\},', 'm'));
  console.log('\nTEST_SHOP_BTN ' + id + ':\n' + (m ? m[0].trim() : 'NO ENCONTRADA'));
});
const P2 = JSON.parse(fs.readFileSync(pf, 'utf8'));
const A2 = Array.isArray(P2) ? P2 : P2.products;
const conJunk = A2.filter(p => /\?_gl=|_gcl_aw|utm_|gclid=/.test(p.img || ''));
console.log('\nimagenes con parametros de seguimiento: ' + conJunk.length);
conJunk.forEach(p => console.log('   !! id ' + p.id + ' ' + p.title));
const sucias = [];
A2.forEach(p => Object.keys(p.stores || {}).forEach(k => { if (/\?_gl=|_gcl_aw|gclid=/.test(p.stores[k])) sucias.push(p.id + '.' + k); }));
console.log('URLs de tienda con parametros de seguimiento: ' + sucias.length + (sucias.length ? ' -> ' + sucias.join(', ') : ''));