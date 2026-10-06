const fs = require('fs');
for (const f of ['guides/best-digital-pianos.html', 'guides/best-digital-pianos_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const cols = (h.match(/verdict-col">/g) || []).length;
  console.log(f, '| verdict cols:', cols);
  const i = h.indexOf('Bluetooth</td>');
  if (i > -1) {
    const row = h.slice(i, i + 2500).replace(/<[^>]+>/g, '|').replace(/\s+/g, ' ');
    console.log('  BT row:', row.slice(0, 700));
  }
  const j = h.indexOf('music production?</span>');
  const j2 = h.indexOf('producci\u00f3n musical?</span>');
  const qi = j > -1 ? j : j2;
  if (qi > -1) console.log('  A6:', h.slice(qi, qi + 900).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').slice(0, 500));
}
