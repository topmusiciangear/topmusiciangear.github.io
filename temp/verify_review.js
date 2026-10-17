const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const files = ['best-piano-keyboard-vsts.html', 'best-piano-keyboard-vsts_es.html', 'best-microphone.html', 'starter-studio.html', 'pro-daw.html'];
files.forEach(f => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const cards = (h.match(/guide-product-card">/g) || []).length;
  const headBtn = (h.match(/guide-review-write-btn/g) || []).length;
  const revRow = (h.match(/shop-btn-review/g) || []).length;
  console.log(f.padEnd(36) + ' cards=' + cards + ' | boton-cabecera=' + headBtn + ' | fila-resena=' + revRow);
});
// comprobar que la fila va DESPUES de todas las tiendas dentro del desplegable
const h = fs.readFileSync(B + 'guides/best-piano-keyboard-vsts.html', 'utf8');
const i = h.indexOf('shop-more-list');
const seg = h.slice(i, i + 9000);
const lastStore = seg.lastIndexOf('shop-wm');
const rev = seg.indexOf('shop-btn-review');
console.log('\nprimera fila-resena en ' + rev + ', ultima tienda en ' + lastStore + ' -> ' + (rev > lastStore ? 'RESENA AL FINAL (correcto)' : 'REVISAR ORDEN'));
const m = seg.slice(rev - 80, rev + 320).replace(/\s+/g, ' ');
console.log('\ncontexto: ...' + m);