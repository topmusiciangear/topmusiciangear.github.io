const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const guides = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'guides.json'), 'utf8'));
const out = new Set();
for (const g of guides) {
  for (const m of (g.verdict_es || '').matchAll(/<span class="product-name">([\s\S]*?)<\/span>/g)) out.add(m[1]);
}
const arr = [...out].sort();
console.log('Total nombres ES:', arr.length);
console.log('\n> 38 caracteres:');
console.log(arr.filter(n => n.length > 38).join('\n'));
