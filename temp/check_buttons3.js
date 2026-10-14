const fs = require('fs');
const h = fs.readFileSync('guides/best-microphone.html', 'utf8');
const scripts = h.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
// Script 18: ver cómo obtiene los precios
const s18 = scripts[18] || '';
const i = s18.indexOf('prices');
console.log('--- script 18: precios ---');
console.log(s18.slice(Math.max(0, i - 200), i + 500));
// Buscar si usa TEST_SHOP_BTN
console.log('\n--- TEST_SHOP_BTN en script 18:', s18.includes('TEST_SHOP_BTN'));
// Buscar si usa un JSON de productos embebido
const j = s18.match(/var\s+(\w+)\s*=\s*\{/g);
console.log('vars en script 18:', j ? j.join(', ') : 'ninguna');
