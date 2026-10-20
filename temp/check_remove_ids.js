// Comprueba si products.json esta en formato JSON.stringify(2 espacios) exacto.
const fs = require('fs');
const raw = fs.readFileSync('data/products.json', 'utf8');
const list = JSON.parse(raw);
const round = JSON.stringify(list, null, 2) + '\n';
console.log('raw bytes:', raw.length, '| roundtrip bytes:', round.length, '| iguales:', raw === round);
if (raw !== round) {
  let i = 0;
  while (i < raw.length && raw[i] === round[i]) i++;
  console.log('primera diferencia en', i);
  console.log('raw   :', JSON.stringify(raw.slice(i, i + 80)));
  console.log('round :', JSON.stringify(round.slice(i, i + 80)));
}

// referencias a los ids a borrar
const ids = ['1044', '1045'];
const files = ['data/guides.json', 'data/deals.json', 'data/manual-deals.json', 'data/price-history.json', 'build-guides.js', 'auto-deals.js'];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const s = fs.readFileSync(f, 'utf8');
  for (const id of ids) {
    const re = new RegExp('\\b' + id + '\\b', 'g');
    const n = (s.match(re) || []).length;
    if (n) console.log(f + ' -> id ' + id + ': ' + n + ' menciones');
  }
}
