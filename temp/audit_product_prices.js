// Rastrea todas las menciones de un producto en el corpus (data/guides.json,
// build-guides.js, data/deals.json) y volta el contexto para detectar precios
// hardcodeados que quedaron viejos tras una correccion de precio.
//
// Uso: node temp/audit_product_prices.js 53 54 156 157
// Escribe temp/price_prop_report.txt (UTF-8) y lo imprime resumido en pantalla.
const fs = require('fs');

const IDS = process.argv.slice(2).map(Number);
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const MONEY = /(?:\u0024|\u00a3|\u20ac)\s?[\d][\d.,]*/g;

const FILES = ['data/guides.json', 'build-guides.js', 'data/deals.json'];
const RADIUS = 240;

const out = [];
const say = s => out.push(s);

for (const id of IDS) {
  const p = products.find(x => x.id === id);
  say('');
  say('='.repeat(100));
  if (!p) { say('##### id ' + id + ': NO EXISTE'); continue; }
  say('##### id ' + id + ' :: ' + p.title);
  say('     cat ' + p.category + ' | catalog price ' + p.price + ' | badge ' + (p.badge || '-'));
  const names = [...new Set([
    p.title,
    p.title_es,
    (p.title || '').replace(/\s*[-–]\s*[\w ].*$/, ''),
  ].filter(Boolean))];
  say('     nombres buscados: ' + names.join('   ||   '));

  for (const file of FILES) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    let hits = 0;
    for (let i = 0; i < lines.length; i++) {
      if (!names.some(n => lines[i].includes(n))) continue;
      hits++;
      const blob = lines.slice(Math.max(0, i - 1), Math.min(lines.length, i + 2)).join(' ').replace(/\s+/g, ' ');
      const at = names.map(n => blob.indexOf(n)).filter(x => x >= 0).sort((a, b) => a - b)[0] || 0;
      const from = Math.max(0, at - RADIUS);
      const to = Math.min(blob.length, at + RADIUS * 2);
      const win = blob.slice(from, to);
      say('');
      say('  [' + file + ':' + (i + 1) + ']');
      say('    ...' + win + '...');
      const money = [...new Set(win.match(MONEY) || [])];
      if (money.length) say('    PRECIOS: ' + money.join('  '));
    }
    say('  -> ' + file + ': ' + hits + ' linea(s)');
  }
}

const report = out.join('\n');
fs.writeFileSync('temp/price_prop_report.txt', report, 'utf8');

// resumen en pantalla: precios por producto
const byProduct = {};
let cur = null;
for (const l of out) {
  const h = l.match(/^##### id (\d+) :: (.+)$/);
  if (h) { cur = 'id ' + h[1] + ' ' + h[2]; byProduct[cur] = new Set(); continue; }
  const m = l.match(/^    PRECIOS: (.*)$/);
  if (m && cur) for (const v of m[1].split(/\s{2,}/)) byProduct[cur].add(v.trim());
}
console.log('== precios citados en prosa por producto (detalle en temp/price_prop_report.txt) ==');
for (const k of Object.keys(byProduct)) {
  console.log('\n' + k);
  console.log('  ' + [...byProduct[k]].sort().join('   '));
}
