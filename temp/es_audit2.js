// ES audit 2: Tier-1 regionalisms + AI-tone patterns, with context.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const items = [];
function walk(v, path) {
  if (typeof v === 'string') {
    if (/_es/i.test(path)) items.push({ path, s: v });
    return;
  }
  if (Array.isArray(v)) { v.forEach((x, i) => walk(x, path + '[' + i + ']')); return; }
  if (v && typeof v === 'object') Object.keys(v).forEach(k => walk(v[k], path + '.' + k));
}
G.forEach((g, i) => walk(g, 'guides[' + i + '].' + g.id));
P.forEach(p => walk(p, 'products#' + p.id));
const T1 = [
  [/audífonos?/gi, 'audífono->auricular'],
  [/parlantes?/gi, 'parlante->altavoz'],
  [/\bbafles?\b/gi, 'bafle->?'],
  [/\bbrinda[ns]?\b/gi, 'brinda->?'],
  [/\bcostos?\b/gi, 'costo?'],
  [/\bcostes?\b/gi, 'coste?'],
];
const T2 = [
  'tanto si eres', 'tanto si se es', 'ya seas', 'ya sea que', 'sin importar', 'no importa si',
  'cambia las reglas del juego', 'cambiador de juego', 'sube de nivel', 'siguiente nivel',
  'desatar', 'libera todo el potencial', 'liberar todo el potencial', 'eleva tu', 'elevan tu',
  'hacer malabares', 'conjunto de características', 'está equipado con', 'están equipados con',
  'hace que sea', 'hacen que sea', 'lo que la convierte en', 'lo que lo convierte en', 'lo que los convierte en',
  'ha sido diseñado', 'ha sido creado', 'ha sido desarrollado', 'son utilizados', 'es utilizado',
  'puede ser utilizado', 'llevar a cabo', 'hacer uso de', 'con el fin de', 'a fin de',
  'mediante', 'posibilita', 'experimenta un', 'experimentarás un', 'garantiza una', 'garantizan',
  'testimonio de', 'profundicemos', 'sumérgete', 'sumergirse', 'en el panorama', 'en el competitivo mundo',
  'tanto para', 'independientemente de', 'vale la pena mencionar', 'cabe destacar que',
  'es crucial', 'es fundamental', 'juega un papel', 'desempeña un papel', 'a la hora de',
  'en términos de', 'de cara a', 'se trata de', 'punto de inflexión',
];
const hits = [];
items.forEach(({ path, s }) => {
  T1.forEach(([re, label]) => {
    let m; re.lastIndex = 0;
    while ((m = re.exec(s))) {
      hits.push({ tier: 1, label, path, ctx: s.slice(Math.max(0, m.index - 80), m.index + m[0].length + 80).replace(/\s+/g, ' ') });
    }
  });
  const low = s.toLowerCase();
  T2.forEach(pat => {
    let i = -1;
    while ((i = low.indexOf(pat, i + 1)) >= 0) {
      hits.push({ tier: 2, label: pat, path, ctx: s.slice(Math.max(0, i - 80), i + pat.length + 80).replace(/\s+/g, ' ') });
    }
  });
});
console.log('TOTAL: ' + hits.length + ' (T1=' + hits.filter(h => h.tier === 1).length + ' T2=' + hits.filter(h => h.tier === 2).length + ')');
const byLabel = {};
hits.forEach(h => { byLabel[h.label] = (byLabel[h.label] || 0) + 1; });
console.log('\n== conteo por patron ==');
Object.entries(byLabel).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(' ' + v + 'x ' + k));
fs.writeFileSync('temp/esaudit2.json', JSON.stringify(hits, null, 1));
console.log('\ndetalle en temp/esaudit2.json');
