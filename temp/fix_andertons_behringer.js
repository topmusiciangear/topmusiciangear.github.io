const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

const rp = B + 'data/products.json';
const g = JSON.parse(fs.readFileSync(rp, 'utf8'));
const p = g.find(x => x.id === 1049);
const antes = p.stores.andertons;
p.stores.andertons = 'https://www.andertons.co.uk/search.php?search_query=' +
  encodeURIComponent(p.title).replace(/%20/g, '+');
fs.writeFileSync(rp, JSON.stringify(g, null, 2), 'utf8');
console.log('=== 1049 Behringer Truth 3.5 BT -> Andertons ===');
console.log('  antes (link directo): ' + antes);
console.log('  ahora (buscador con nombre exacto): ' + p.stores.andertons);

const sb = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
const m = sb.match(/amazon\.com\/dp\/[A-Z0-9]{10}[^"\s]*/g) || [];
const sin = m.filter(u => u.indexOf('tag=') < 0);
console.log('\n=== AUDITORIA AMAZON EN shop-buttons.js ===');
console.log('  enlaces /dp/ totales: ' + m.length);
console.log('  SIN tag=topmusicg-20: ' + sin.length);
sin.slice(0, 8).forEach(u => console.log('    ! ' + u));
