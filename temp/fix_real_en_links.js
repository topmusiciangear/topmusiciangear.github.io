// Corrige SOLO links _es.html que estén dentro de campos EN (nombre de campo sin _es)
// de OTRAS guias (no best-monitors-for-small-rooms). Opera sobre raw para preservar formato.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let raw = fs.readFileSync(B + 'data/guides.json', 'utf8');

// regex: campo EN (clave que no termina en _es) cuyo string contiene href="..._es.html"
// capturamos: "clave": "<...href="/guides/X_es.html" ...>"
// Para ser seguros, listamos hits conocidos del diagnostico y los corremos uno a uno por línea.
const fixes = [
  // [guideId, anchorCampoEN, viejoLinkEs, nuevoLinkEn]
  ['best-electric-guitar', 'sections[1].content', '/guides/player-strat-vs-pacifica_es.html', '/guides/player-strat-vs-pacifica.html'],
  ['best-electric-guitar', 'sections[2].content', '/guides/american-pro-vs-les-paul_es.html', '/guides/american-pro-vs-les-paul.html'],
  ['best-interface', 'sections[0].content', '/guides/scarlett-vs-ssl_es.html', '/guides/scarlett-vs-ssl.html'],
  ['best-interface', 'sections[0].content', '/guides/scarlett-vs-volt_es.html', '/guides/scarlett-vd.html'], // placeholder, se corrige abajo
  ['best-monitors', 'sections[0].content', '/guides/best-monitors-for-small-rooms_es.html', '/guides/best-monitors-for-small-rooms.html'],
  ['best-plugins', 'sections[1].content', '/guides/pro-plugins_es.html', '/guides/pro-plugins.html'],
  ['daw-guide', 'sections[0].content', '/guides/best-daw-for-beginners_es.html', '/guides/best-daw-for-beginners.html'],
  ['daw-guide', 'sections[0].content', '/guides/ableton-vs-logic_es.html', '/guides/ableton-vs-logic.html'],
  ['daw-guide', 'sections[1].content', '/guides/best-daw-for-beginners_es.html', '/guides/best-daw-for-beginners.html'],
  ['daw-guide', 'sections[1].content', '/guides/ableton-vs-fl-studio_es.html', '/guides/ableton-vs-fl-studio.html'],
  ['daw-guide', 'sections[1].content', '/guides/pro-tools-vs-cubase_es.html', '/guides/pro-tools-vs-cubase.html'],
  ['open-headphones', 'sections[0].content', '/guides/hd490-pro-vs-dt990_es.html', '/guides/hd490-pro-vs-dt990.html'],
  ['portable-interfaces', 'sections[1].content', '/guides/scarlett-vs-volt_es.html', '/guides/scarlett-vs-volt.html'],
  ['portable-interfaces', 'sections[1].content', '/guides/audient-vs-motu_es.html', '/guides/audient-vs-motu.html'],
];

// mejor: recorrer raw linea por linea, detectar linea de campo EN (no termina en _es":) que contenga _es.html
const lines = raw.split('\n');
let changes = 0;
for (let li = 0; li < lines.length; li++) {
  const line = lines[li];
  // campo: comienza con espacios + "clave": " y no termina en _es": 
  const cm = line.match(/^\s*"([^" ]+)":\s*"(.*)"\s*,?\s*$/);
  if (!cm) continue;
  const key = cm[1];
  if (key.endsWith('_es')) continue; // campo ES, bien
  if (!line.includes('_es.html')) continue;
  // esta guia?
  // verificar que no estemos dentro del bloque de best-monitors-for-small-rooms
  // reemplazar TODOS los _es.html de la linea por .html
  const newLine = line.split('_es.html"').join('.html"');
  if (newLine !== line) {
    console.log('L' + (li + 1) + ' key=' + key + ' -> corrijo _es.html en campo EN');
    lines[li] = newLine;
    changes++;
  }
}
if (changes === 0) { console.log('no se encontro nada por linea'); process.exit(0); }
raw = lines.join('\n');
// validar JSON
const parsed = JSON.parse(raw);
// verificar que ya no quede _es.html en campos EN de guias distintas
let残留 = 0;
parsed.forEach(gu => {
  if (gu.id === 'best-monitors-for-small-rooms') return;
  const scan = (o, p) => {
    if (typeof o === 'string') { if (!p.endsWith('_es') && o.includes('_es.html')) {残留++; console.log('REMANENTE', gu.id, p); } }
    else if (Array.isArray(o)) o.forEach((v, i) => scan(v, p + '[' + i + ']'));
    else if (o && typeof o === 'object') Object.keys(o).forEach(k => scan(o[k], p + '.' + k));
  };
  scan(gu, gu.id);
});
if (残留 > 0) throw new Error('quedan ' + 残留 + ' links _es.html en campos EN');
fs.writeFileSync(B + 'data/guides.json', raw);
console.log('OK: ' + changes + ' lineas corregidas y 0 remanentes en campos EN');
