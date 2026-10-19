// Comprobacion final: para cada pagina de una guia revisada, el score que
// muestra el badge debe coincidir con la nota de ESA guia (guide-scores.js),
// no con el score global de products.json.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const overrides = require(B + 'temp/score_overrides.js');
const aliases = require(B + 'temp/name_aliases.js');
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const norm = s => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
function findProduct(name) {
  if (!name) return null;
  if (aliases[name]) { const a = products.find(p => p.title === aliases[name] || p.title_es === aliases[name]); if (a) return a; }
  const e = products.find(p => p.title === name || p.title_es === name);
  if (e) return e;
  const n = norm(name);
  const c = products.filter(p => norm(p.title).includes(n) || norm(p.title_es || '').includes(n));
  if (c.length === 1) return c[0];
  const r = products.filter(p => n.includes(norm(p.title)) || (p.title_es && n.includes(norm(p.title_es))));
  return r.length === 1 ? r[0] : null;
}

let revisadas = 0, paginas = 0, ok = 0, fallos = 0;
const detalle = [];

for (const gid of Object.keys(overrides)) {
  // indice por id de producto -> nota de esta guia
  const porId = {};
  for (const [nombre, score] of Object.entries(overrides[gid])) {
    const p = findProduct(nombre);
    if (p) porId[p.id] = score;
  }
  for (const lang of ['', '_es']) {
    const f = B + 'guides/' + gid + lang + '.html';
    if (!fs.existsSync(f)) continue;
    const html = fs.readFileSync(f, 'utf8');
    revisadas++;

    const badges = html.match(/Nuestra nota: ([0-9.]+) sobre 10|Our score: ([0-9.]+) out of 10/g) || [];
    const notas = badges.map(b => Number((b.match(/([0-9.]+) (?:sobre|out of)/) || [])[1]));
    const titulos = (html.match(/guide-product-card-title">([^<]+)/g) || []).map(t => t.replace(/.*>/, '').trim());
    const es = lang === '_es';
    const nombreDe = (t) => t.replace(/ \((cada uno|par|each|pair|2 auriculares|2 headsets)\)$/, '');

    let fallados = 0;
    titulos.forEach((titulo, i) => {
      if (notas[i] === undefined) return;
      const t = nombreDe(titulo);
      // resolver el producto por el titulo EXACTO de la pagina
      const p = products.find(x => nombreDe(es ? x.title_es : x.title) === t);
      if (!p) return;                       // no lo sabemos identificar
      const exp = porId[p.id];
      if (exp === undefined) return;        // sin nota propia: usa la global
      if (Math.abs(notas[i] - exp) > 0.001) {
        fallados++;
        detalle.push('  ' + gid + lang + '  ' + titulo + ': pagina=' + notas[i] + ' guia=' + exp);
      }
    });
    if (fallados === 0) ok++; else fallos++;
    paginas++;
  }
}

console.log('Paginas de guias revisadas comprobadas: ' + paginas + ' (' + revisadas + ' ficheros)');
console.log('Paginas con todas las notas correctas: ' + ok);
console.log('Paginas con notas que NO son las de su guia: ' + fallos);
detalle.slice(0, 30).forEach(d => console.log(d));
