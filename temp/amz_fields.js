const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const fieldCount = {};
const rows = [];
products.forEach(p => {
  const walk = (obj, path) => {
    if (typeof obj === 'string') {
      if (/amazon\.[a-z.]+/.test(obj)) {
        const f = path || '(root)';
        fieldCount[f] = (fieldCount[f] || 0) + 1;
        rows.push({ id: p.id, title: p.title, field: f, url: obj.slice(0, 110) });
      }
      return;
    }
    if (Array.isArray(obj)) { obj.forEach((v, i) => walk(v, path + '[' + i + ']')); return; }
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(k => walk(obj[k], path ? path + '.' + k : k));
    }
  };
  walk(p, '');
});
console.log('=== FIELDS CONTAINING AMAZON URLS ===');
Object.entries(fieldCount).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + '  ' + k));
console.log('\n=== NO-ES-stores.amazon ===');
rows.filter(r => r.field !== 'stores.amazon').forEach(r => console.log('  #' + r.id + ' [' + r.field + '] ' + r.title + '\n      ' + r.url));
