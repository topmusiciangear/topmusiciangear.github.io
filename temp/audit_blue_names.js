const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const guides = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'products.json'), 'utf8'));
const byId = {}; for (const p of products) if (p.id) byId[p.id] = p;

function verdictHtml(file) {
  const h = fs.readFileSync(file, 'utf8');
  const i = h.indexOf('<div class="verdict-text">');
  if (i < 0) return null;
  const start = i + '<div class="verdict-text">'.length;
  const end = h.indexOf('</div>', start);
  return h.slice(start, end);
}

const noBlue = [];
const extraBlue = [];
const blueNames = new Map();

for (const g of guides) {
  const ids = [];
  for (const s of (g.sections || [])) for (const id of (s.products || [])) if (typeof id === 'number' && !ids.includes(id)) ids.push(id);
  const titlesEs = ids.map(i => byId[i] && (byId[i].title_es || byId[i].title)).filter(Boolean);
  const titlesEn = ids.map(i => byId[i] && (byId[i].title || byId[i].title_es)).filter(Boolean);

  for (const lang of ['es', 'en']) {
    const file = path.join(ROOT, 'guides', lang === 'es' ? g.id + '_es.html' : g.id + '.html');
    if (!fs.existsSync(file)) continue;
    const v = verdictHtml(file);
    if (!v) continue;
    const titles = lang === 'es' ? titlesEs : titlesEn;

    // Párrafos sin nombre azul
    const paras = v.split('</p>').map(s => s.trim()).filter(Boolean);
    paras.forEach((p, idx) => {
      if (!/product-name/.test(p)) {
        const strong = (p.match(/<strong>([\s\S]*?)<\/strong>/) || [])[1] || p;
        const plain = strong.replace(/<[^>]+>/g, '').trim().slice(0, 90);
        noBlue.push(`${g.id} [${lang}] p${idx + 1}: "${plain}"`);
      }
    });

    // Nombres azules que no son producto de la guía
    const spans = [...v.matchAll(/<span class="product-name">([\s\S]*?)<\/span>/g)].map(m => m[1]);
    for (const s of spans) {
      blueNames.set(s, (blueNames.get(s) || 0) + 1);
      const ok = titles.some(t => t === s || t.includes(s) || s.includes(t));
      if (!ok) extraBlue.push(`${g.id} [${lang}]: "${s}"`);
    }
  }
}

console.log('Párrafos de veredicto SIN nombre azul:', noBlue.length);
console.log(noBlue.slice(0, 60).join('\n'));
console.log('\nNombres azules que no son producto de la guía:', extraBlue.length);
console.log(extraBlue.slice(0, 40).join('\n'));
console.log('\nNombres azules distintos:', blueNames.size);
