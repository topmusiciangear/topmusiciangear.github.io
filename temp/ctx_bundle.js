const fs = require('fs');
const HITS = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/audit_es_v2.json', 'utf8'));
const bun = HITS.filter(h => h.patron === 'bundle');
console.log('hits bundle: ' + bun.length + ' en ' + new Set(bun.map(h => h.guia)).size + ' guias\n');
bun.forEach(h => {
  console.log('[' + h.guia + ' :: ' + h.campo + ']');
  h.ejs.forEach(e => {
    const esNombre = /Total Bundle|5\.5 Bundle|Khs bundle|kHs/i.test(e);
    console.log('  ' + (esNombre ? '[NOMBRE]' : '[GENERICO]') + ' ...' + e + '...');
  });
});
