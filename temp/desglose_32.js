const fs = require('fs');
const T = 'C:/Users/Daniel/AppData/Local/Temp/opencode/';
const d = fs.readFileSync(T + 'v6.html', 'utf8');

const prims = [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>([\s\S]*?)<\/a>/g)];
console.log('primarios totales en la pagina ES: ' + prims.length);
const porTienda = {};
prims.forEach(m => {
  const k = (m[0].match(/data-store="([^"]+)"/) || [])[1] || '?';
  porTienda[k] = (porTienda[k] || 0) + 1;
});
console.log('por tienda: ' + JSON.stringify(porTienda));

// ¿donde estan? ¿tarjeta o seccion?
let enTarjeta = 0, enSeccion = 0;
prims.forEach(m => {
  const idx = d.indexOf(m[0]);
  const antes = d.slice(Math.max(0, idx - 2000), idx);
  const card = antes.lastIndexOf('guide-product-card');
  const sec = antes.lastIndexOf('guide-section-buy');
  if (card > sec) enTarjeta++; else enSeccion++;
});
console.log('en tarjetas: ' + enTarjeta + '  en secciones (boton de compra): ' + enSeccion);

// productos distintos con primario amazon
const ids = [...new Set([...d.matchAll(/openReviewModal\((\d+)\)/g)].map(m => m[1]))];
console.log('productos distintos en la pagina: ' + ids.length);
