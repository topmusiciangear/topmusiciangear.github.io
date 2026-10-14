const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

// TITULOS: solo por caracteres. Medidos en px, TODOS los titulos del sitio
// estan muy por debajo de 560px (maximo real: 370px), asi que recortar por px
// solo destruia texto. 60 chars es la regla dura y suficiente.
const T_CHARS = 60;
// DESCRIPCIONES: por caracteres Y por px (el texto con muchas mayusculas y
// numeros de modelo es mucho mas ancho que la media).
const D_CHARS = 155, D_PX = 910;

const NARROW = "iljtIf.,;:'`|!()[]{}/\\-—–\"";
const WIDE = "mwMW@%&#";
function PX(str) {
  let em = 0;
  for (const ch of String(str)) {
    if (NARROW.indexOf(ch) > -1) em += 0.30;
    else if (WIDE.indexOf(ch) > -1) em += 0.85;
    else if (ch === ' ') em += 0.28;
    else if (/[A-Z0-9]/.test(ch)) em += 0.62;
    else if (/[a-z\u00E1\u00E9\u00ED\u00F3\u00FA\u00FC\u00F1]/.test(ch)) em += 0.50;
    else em += 0.52;
  }
  return Math.round(em * 13);
}

// Recorte en frontera de palabra que respeta AMBOS limites.
// Busca el punto de corte mas largo que no pase de ninguno de los dos.
function trim(d, maxC, maxP) {
  if (!d) return d;
  const s = d.replace(/\s+/g, ' ').trim();
  if (s.length <= maxC && PX(s) <= maxP) return s;
  let best = null;
  for (let end = Math.min(s.length, maxC); end >= 40; end--) {
    let cand = s.substring(0, end);
    const sp = cand.lastIndexOf(' ');
    cand = (sp > 20 ? cand.substring(0, sp) : cand).replace(/[\s,;:.\u2013\u2014&-]+$/, '');
    const out = cand + '.';
    if (out.length <= maxC && PX(out) <= maxP) { best = out; break; }
  }
  if (!best) {
    // ultimo recurso: 110 chars en frontera de palabra
    let cand = s.substring(0, 110);
    const sp = cand.lastIndexOf(' ');
    cand = (sp > 40 ? cand.substring(0, sp) : cand).replace(/[\s,;:.\u2013\u2014&-]+$/, '');
    best = cand + '.';
  }
  return best;
}

let nD = 0, nT = 0;
const tSamples = [], dSamples = [];

guides.forEach(function (g) {
  ['description', 'description_es'].forEach(function (k) {
    if (!g[k]) return;
    const b = g[k], a = trim(b, D_CHARS, D_PX);
    if (a !== b) { nD++; if (dSamples.length < 3) dSamples.push(['[' + g.id + '] ' + k, b, a]); }
    g[k] = a;
  });
  ['title', 'titleTag', 'title_es', 'titleTag_es'].forEach(function (k) {
    if (!g[k]) return;
    const b = g[k], a = trim(b, T_CHARS, 99999);
    if (a !== b) { nT++; tSamples.push(['[' + g.id + '] ' + k, b, a]); }
    g[k] = a;
  });
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

console.log('descripciones recortadas: ' + nD + '   titulos recortados: ' + nT);
if (tSamples.length) {
  console.log('\n--- titulos recortados (revisar) ---');
  tSamples.forEach(s => console.log('  ' + s[0] + '\n     ' + s[1] + '\n  -> ' + s[2]));
}
if (dSamples.length) {
  console.log('\n--- ejemplos de descripcion ---');
  dSamples.forEach(s => console.log('  ' + s[0] + '\n     ' + s[1] + '\n  -> ' + s[2]));
}