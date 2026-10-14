const fs = require('fs');
const h = fs.readFileSync('guides/best-microphone.html', 'utf8');
// Buscar scripts inline que manejen tiendas
const scripts = h.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
console.log('scripts inline:', scripts.length);
scripts.forEach((s, i) => {
  if (s.includes('shop') || s.includes('price') || s.includes('offer')) {
    console.log('--- script ' + i + ' (shop/price/offer) ---');
    console.log(s.slice(0, 600));
  }
});
// Verificar si hay un JSON de productos embebido
const j = h.match(/window\.[A-Z_]+\s*=\s*\{/g);
console.log('window globals:', j ? j.join(', ') : 'ninguno');
