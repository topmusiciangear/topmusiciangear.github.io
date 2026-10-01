const fs = require('fs');
const b = fs.readFileSync('build-guides.js', 'utf8');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
console.log('== variantes PodMic en catalogo ==');
P.filter(p => /podmic/i.test(p.title)).forEach(p => console.log(' ' + p.id + ': ' + p.title + ' canon=' + p.price));
console.log('== BTN entradas para roster creators ==');
[194, 197, 253, 195, 196, 276, 279, 284, 287, 291, 292].forEach(id => {
  const re = new RegExp('^\\s*' + id + ':\\s*\\{([\\s\\S]*?)\\r?\\n\\s*\\},?\\s*$', 'm');
  const m = b.match(re);
  if (!m) { console.log(' ' + id + ': SIN ENTRADA'); return; }
  const pm = m[1].match(/prices:\s*\{([\s\S]*?)\}/);
  const stores = m[1].match(/data-store|"(amazon|zzounds|gear4music|andertons|musicstore|reverb|pluginboutique)"\s*:/g);
  console.log(' ' + id + ': prices={' + (pm ? pm[1].replace(/\s+/g, ' ').trim().slice(0, 160) : 'VACIO') + ' }');
});
