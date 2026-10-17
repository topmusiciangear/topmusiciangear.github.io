const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-piano-keyboard-vsts.html', 'utf8');
// buscar el desplegable RENDER (class="shop-more-list" con style inline, no dentro de <script>)
const re = /<div class="shop-more-list"[^>]*>([\s\S]{0,12000}?)<\/div>/g;
let m, n = 0;
while ((m = re.exec(h)) !== null && n < 2) {
  const inner = m[1];
  if (inner.indexOf('shop-btn-review') < 0) continue;
  n++;
  const rev = inner.indexOf('shop-btn-review');
  const lastStore = inner.lastIndexOf('shop-wm');
  const stores = (inner.match(/data-store="([a-z]+)"/g) || []).map(x => x.replace(/\W/g, ''));
  console.log('--- desplegable ' + n + ' ---');
  console.log('  tiendas: ' + stores.join(', '));
  console.log('  pos fila-resena: ' + rev + ' | pos ultima tienda: ' + lastStore);
  console.log('  => ' + (rev > lastStore ? 'RESENA AL FINAL (correcto)' : 'REVISAR'));
  const txt = inner.slice(rev - 40, rev + 260).replace(/\s+/g, ' ');
  console.log('  ' + txt + '\n');
}