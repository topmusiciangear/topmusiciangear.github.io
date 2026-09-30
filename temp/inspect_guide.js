const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const arr = Array.isArray(G) ? G : (G.guides || Object.values(G).find(Array.isArray));
console.log('raiz:', Array.isArray(G) ? 'array' : Object.keys(G).join(','));
console.log('guias:', arr.length);
const g = arr.find(x => (x.title || '').includes('Every Room') || (x.title_es || '').includes('Every Room'));
if (!g) { console.log('NO ENCONTRADA'); process.exit(1); }
console.log('\n=== CAMPOS DE LA GUIA ===');
Object.keys(g).forEach(k => {
  const v = g[k];
  const t = Array.isArray(v) ? 'array[' + v.length + ']' : typeof v;
  const len = typeof v === 'string' ? v.length : '';
  console.log('  ' + k.padEnd(26) + ' ' + t + (len ? '  len=' + len : ''));
});
fs.writeFileSync('temp/guide_everyroom.json', JSON.stringify(g, null, 2));
console.log('\nguardado en temp/guide_everyroom.json');
