const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const guides = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'guides.json'), 'utf8'));

const SUS = /^(XLR|USB|Condensador|Micrófono|Microfono|Altavoz|Sistema|Interfaz|Guitarra|Bajo|Amplificador|Monitor|Caja|Controlador|Kit|Teclado|Columna|Shotgun|Dynamic|Condenser|Wireless|Studio|Active|Passive|PA\b|DJ\b|In-Ear|Headphone|Auriculares|Auriculares|Parlante|Subwoofer|Mezcladora|Mesa|Cabina|Pedal|Afinador|Soporte|Cable|Adaptador|Estuche|Funda)/i;

function names(html) {
  const out = [];
  for (const m of html.matchAll(/<strong>([\s\S]*?)<\/strong>/g)) out.push(m[1].replace(/<[^>]+>/g, ''));
  return out;
}
const seen = new Map();
for (const g of guides) {
  for (const lang of ['es', 'en']) {
    const v = lang === 'es' ? g.verdict_es : g.verdict;
    if (!v) continue;
    for (const n of names(v)) {
      const key = lang + '|' + n;
      seen.set(key, (seen.get(key) || 0) + 1);
    }
  }
}
const sus = [...seen.keys()].filter(k => SUS.test(k.split('|')[1]));
console.log('Nombres sospechosos (' + sus.length + '):');
console.log(sus.sort().join('\n'));
