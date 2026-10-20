const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'guides');
let files = 0, nested = 0, spans = 0;
const bad = [];
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.html')) continue;
  files++;
  const h = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = h.match(/<span class="product-name">[\s\S]*?<\/span>/g) || [];
  spans += m.length;
  if (/<span class="product-name">[^<]*<span class="product-name">/.test(h)) {
    nested++;
    bad.push(f);
  }
}
console.log('Archivos:', files, '| spans azules:', spans, '| con anidado:', nested);
console.log(bad.slice(0, 20).join('\n'));
