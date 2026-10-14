const fs = require('fs');
const h = fs.readFileSync('guides/best-microphone.html', 'utf8');
const scripts = h.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
const s18 = scripts[18] || '';
// Ver la variable MS y cómo se obtienen los precios
const i = s18.indexOf('var MS=');
console.log('--- variable MS ---');
console.log(s18.slice(i, i + 800));
// Buscar si hay un fetch o XHR para obtener precios
const j = s18.match(/fetch\([^)]*\)|xhr|\.json/gi);
console.log('\n--- fetch/xhr/json:', j ? j.join(', ') : 'ninguno');
// Ver el final del script
console.log('\n--- final del script ---');
console.log(s18.slice(-600));
