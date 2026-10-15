const fs = require('fs');
const T = 'C:/Users/Daniel/AppData/Local/Temp/opencode/';
const d = fs.readFileSync(T + 'v6.html', 'utf8');

const prims = [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>([\s\S]*?)<\/a>/g)];
const sinTienda = prims.filter(m => !/data-store="/.test(m[0]));
console.log('sin data-store: ' + sinTienda.length);
sinTienda.forEach(m => {
  const idx = d.indexOf(m[0]);
  console.log('  contexto: ' + d.slice(Math.max(0, idx - 400), idx).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(-160));
  console.log('  texto: ' + m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80));
});

// bloques de compra: tarjetas vs secciones
const cards = (d.match(/guide-product-card-stores/g) || []).length;
const secbuy = (d.match(/guide-section-buy/g) || []).length;
console.log('\nbloques guide-product-card-stores: ' + cards);
console.log('bloques guide-section-buy: ' + secbuy);
console.log('16 productos x (1 tarjeta + 1 seccion) = 32 primarios Amazon. Cuadra: ' + (cards === 16 && secbuy >= 16 ? 'si' : 'revisar'));
