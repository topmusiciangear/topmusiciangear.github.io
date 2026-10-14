const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

const T_MAX = 60;   // <title> que Google no corta
const D_MAX = 155;  // meta description que Google no corta

// ---- recorte de descripcion en frontera de palabra ----
function trimDesc(d, max) {
  if (!d) return d;
  let s = d.replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  let cut = s.substring(0, max);
  // no partir por una palabra a medias
  const sp = cut.lastIndexOf(' ');
  if (sp > 0) cut = cut.substring(0, sp);
  // no dejar una puntuacion colgando ni un & al final
  cut = cut.replace(/[\s,;:.\-–—&]+$/, '');
  // no terminar con abreviaturas partida
  return cut + '.';
}

const log = { titles: [], descs: [] };

guides.forEach(function (g) {
  ['title', 'titleTag', 'title_es', 'titleTag_es'].forEach(function (k) {
    if (!g[k]) return;
    const before = g[k];
    let after = before;

    // 1) quitar el año, este solo al final o dentro de un parenttesis mayor:
    //    "...(Pros, Cons & Buying Guide 2026)" | "... 2026)" | "... 2026"
    after = after.replace(/\s*\(\s*20\d\d\s*\)\s*$/, '')   // (2026) solo
                 .replace(/\s+20\d\d\s*\)\s*$/, ')')       // "2026)" dentro de un parenttesis
                 .replace(/\s+20\d\d$/, '')               // "2026" suelto
                 .trim();

    // 2) acortar el sufijo largo conservando el angulo "pros y contras":
    //    EN  "(Pros, Cons & Buying Guide)"  -> "(Pros & Cons)"
    //    ES  "(pros, contras y guía de compra)" -> "(Pros & Cons)"
    // Ojo: en espanol es "contras" (una palabra), no "cons as".
    after = after.replace(/\s*\(\s*pros,?\s*(?:cons|consas|contras)\s*(?:&|y)\s*(?:buying\s*guide|gu[ií]a de compra)\s*\)\s*$/i, ' (Pros & Cons)')
                 .replace(/\s{2,}/g, ' ')
                 .trim();

    if (after !== before) log.titles.push([g.id, k, before, after]);
    g[k] = after;
  });

  ['description', 'description_es'].forEach(function (k) {
    if (!g[k]) return;
    const before = g[k];
    const after = trimDesc(before, D_MAX);
    if (after !== before) log.descs.push([g.id, k, before.length, after.length]);
    g[k] = after;
  });
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

console.log('=== TITULOS modificados: ' + log.titles.length + ' ===');
log.titles.forEach(function (t) {
  console.log('  [' + t[0] + '] ' + t[1]);
  console.log('      antes [' + t[2].length + ']: ' + JSON.stringify(t[2]));
  console.log('      ahora [' + t[3].length + ']: ' + JSON.stringify(t[3]));
});
console.log('\n=== DESCRIPCIONES recortadas: ' + log.descs.length + ' ===');
log.descs.slice(0, 8).forEach(function (d) {
  console.log('  [' + d[0] + '] ' + d[1] + '  ' + d[2] + ' -> ' + d[3] + ' chars');
});
if (log.descs.length > 8) console.log('  ... y ' + (log.descs.length - 8) + ' mas');