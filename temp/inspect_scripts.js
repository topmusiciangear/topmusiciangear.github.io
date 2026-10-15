const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE + 'guides/budget-mics.html', 'utf8');

console.log('=== SCRIPTS CON src EN budget-mics.html ===');
[...d.matchAll(/<script[^>]*src="([^"]+)"/g)].forEach(m => console.log('  ' + m[1]));

console.log('\n=== SCRIPTS INLINE ===');
const inline = [...d.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g)];
console.log('  total: ' + inline.length);
inline.forEach((m, i) => {
  const t = m[1].trim();
  console.log('  [' + i + '] ' + t.slice(0, 120).replace(/\s+/g, ' ') + (t.length > 120 ? '...' : ''));
});

console.log('\n=== FUNCIONES DE BOTON EN LA PAGINA ===');
['tmgGeoSwap','tmgStoreButtons','tmgOffers','shopButtonsTest','doSwap','shopButtonsTest','quickTarget','applyNow']
  .forEach(k => console.log('  ' + k + ': ' + (d.indexOf(k) > -1 ? 'presente' : 'AUSENTE')));

// ¿el JS inline menciona precios?
console.log('\n=== ¿el JS inline LEE TEST_SHOP_BTN? ===');
inline.forEach((m, i) => {
  const t = m[1];
  if (t.indexOf('TEST_SHOP_BTN') > -1) {
    const idx = t.indexOf('TEST_SHOP_BTN');
    console.log('  [' + i + '] ...' + t.slice(Math.max(0, idx - 120), idx + 120).replace(/\s+/g, ' ') + '...');
  }
});

// ¿los botones tienen data-price en esta pagina?
console.log('\n=== BOTONES CON data-price ===');
const btns = [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>/g)];
console.log('  shop-btn-primary totales: ' + btns.length);
console.log('  con data-price: ' + btns.filter(m => /data-price=/.test(m[0])).length);
console.log('  con data-pb-*: ' + btns.filter(m => /data-pb-/.test(m[0])).length);

// texto del boton: ¿lleva importe?
const full = [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>([\s\S]*?)<\/a>/g)];
console.log('\n=== texto de 3 botones ===');
full.slice(0, 3).forEach((m, i) => {
  const txt = m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('  ' + (i + 1) + ': ' + txt);
});