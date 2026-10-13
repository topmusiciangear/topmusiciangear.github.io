const fs = require('fs');
const h = fs.readFileSync('guides/usb-mics.html', 'utf8');
const tbl = (h.match(/guide-comp-table[\s\S]*?<\/table>/) || [])[0] || '';
const rows = tbl.match(/<tr[\s\S]*?<\/tr>/g) || [];
const cells = r => (r.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g) || []).map(x => x.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim());

console.log('=== donde aparece RGB en la tabla ===');
let found = 0;
rows.forEach(function (r, i) {
  const c = cells(r);
  c.forEach(function (t, j) {
    if (/RGB/i.test(t)) { console.log('  fila ' + i + ' (' + c[0] + ') col' + j + ': ' + t); found++; }
  });
});
console.log(found === 0 ? '  (RGB no aparece en la tabla)' : '  total: ' + found);

console.log('\n=== filas de la tabla ===');
rows.forEach(function (r, i) {
  const c = cells(r);
  console.log('  [' + i + '] ' + (c[0] || '(cabecera)').slice(0, 34));
});