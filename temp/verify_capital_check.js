const fs = require('fs');
for (const f of ['guides/best-studio-monitors-under-150.html', 'guides/best-studio-monitors-under-150_es.html', 'index.html']) {
  const h = fs.readFileSync(f, 'utf8');
  console.log(f + ' | "Check Price": ' + (h.match(/Check Price/g) || []).length + ' | "Check price" (lower p): ' + (h.match(/Check price/g) || []).length + ' | "Verificar precio": ' + (h.match(/Verificar precio/g) || []).length);
}
const sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
console.log('shop-buttons.js | Check Price: ' + (sb.match(/'Check Price'/g) || []).length + ' | Check price: ' + (sb.match(/'Check price'/g) || []).length);
