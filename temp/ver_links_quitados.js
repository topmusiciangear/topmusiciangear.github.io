const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const quitados = new Set([
  // de la guía de monitores
  'B09X77M8QY', // JBL 104-BT (Amazon ASIN)
  'B0CT787NLW', // Mackie CR3.5BT (Amazon ASIN)
  'B0BSZ7KYXZ', // Yamaha HS3
  // Behringer Media 40USB (descontinuado)
  'B0062ENMI4', // Eris E4.5 (no es 2nd Gen)
  'B09LVJ7WYD', // Edifier MR3
]);

// productos de la guía actual
const actuales = new Set(products.filter(p => /104[2-9]/.test(p.id)).map(p => p.id));
console.log('Productos actuales de la guia: ' + Array.from(actuales).join(', '));

// 1) buscar menciones en TODAS las guías
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
let menciones = 0;
guides.forEach(g => {
  const txt = JSON.stringify(g);
  quitados.forEach(q => {
    if (txt.indexOf(q) >= 0) { menciones++; console.log('  ASIN ' + q + ' en guia ' + g.id); }
  });
  // también buscar por nombre en textos
  ['JBL 104-BT', 'Mackie CR3.5BT', 'Yamaha HS3', 'Media 40USB', 'Eris E4.5', 'Edifier MR3'].forEach(n => {
    if (txt.indexOf(n) >= 0) { menciones++; console.log('  NOMBRE "' + n + '" en guia ' + g.id); }
  });
});
console.log('');
console.log('Total menciones de productos quitados: ' + menciones);

// 2) links en products.json que puedan estar rotos (patrones)
console.log('\n=== ENLACES SOSPECHOSOS EN PRODUCTOS ===');
let sospechosos = 0;
products.forEach(p => {
  if (!p.stores) return;
  Object.entries(p.stores).forEach(([tienda, url]) => {
    if (!url || typeof url !== 'string') return;
    if (url.indexOf('?siid=') >= 0 || url.indexOf('?search_query=') >= 0 || url.indexOf('?_gl=') >= 0 ||
        url.indexOf('&network=') >= 0 || url.indexOf('&affiliate_id=') >= 0 || url.indexOf('&publisher=') >= 0 ||
        url.indexOf('&utm_') >= 0 || url.indexOf('&sv1=') >= 0 || url.indexOf('&sv_campaign_id=') >= 0 ||
        url.indexOf('&awc=') >= 0) {
      sospechosos++; console.log('  ' + p.id + ' ' + tienda + ': parametros de tracking');
    }
    if (url.indexOf('403') >= 0 || url.indexOf('404') >= 0) {
      sospechosos++; console.log('  ' + p.id + ' ' + tienda + ': codigo de error en URL');
    }
  });
});
console.log('  productos con tracking/errores en URL: ' + sospechosos);

// 3) Amazon sin tag en products.json (el build lo añade, pero a veces viene ya)
console.log('\n=== AMAZON SIN TAG EN PRODUCTS.JSON ===');
let sinTagProd = 0;
products.forEach(p => {
  if (!p.stores?.amazon) return;
  const u = p.stores.amazon;
  if (!/tag=/.test(u)) { sinTagProd++; console.log('  ' + p.id + ': ' + u.slice(0, 70)); }
});
console.log('  productos: ' + sinTagProd);

// 4) productos SIN Amazon
console.log('\n=== PRODUCTOS SIN AMAZON ===');
let sinAmazon = 0;
products.forEach(p => { if (!p.stores?.amazon) { sinAmazon++; console.log('  ' + p.id + ' ' + (p.name || '')); } });
console.log('  total: ' + sinAmazon);