const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

const D_CHARS = 155, D_PX = 900;
const NARROW = "iljtIf.,;:'`|!()[]{}/\\-—–\"";
const WIDE = "mwMW@%&#AQROGD";
function PX(str) {
  let em = 0;
  for (const ch of String(str)) {
    if (NARROW.indexOf(ch) > -1) em += 0.30;
    else if (WIDE.indexOf(ch) > -1) em += 0.85;
    else if (ch === ' ') em += 0.28;
    else if (/[A-Z0-9]/.test(ch)) em += 0.62;
    else em += 0.50;
  }
  return Math.round(em * 13);
}
const fits = s => s.length <= D_CHARS && PX(s) <= D_PX;

// Palabras que no pueden cerrar una meta description.
const DANGLING = new Set(['y', 'e', 'o', 'u', 'ni', 'que', 'de', 'del', 'la', 'el', 'los', 'las',
  'un', 'una', 'unos', 'unas', 'para', 'por', 'con', 'sin', 'desde', 'como', 'mas', 'más', 'no',
  'the', 'and', 'for', 'with', 'from', 'than', 'that', 'which', 'to', 'in', 'on', 'of', 'or', 'is',
  'are', 'as', 'by', 'a', 'at', 'al', 'en', 'tu', 'sus', 'se', 'le', 'lo', 'ya', 'muy', 'cada',
  'pero', 'sobre', 'hasta', 'entre', 'este', 'esta', 'estos', 'estas', 'eso', 'esa', 'sus']);

// Cierres fijos del sitio: si la cola cortada es una de estas frases, se
// restaura entera en vez de amputarla.
// OJO: el final debe tolerar el punto final de la frase ("... Lee el."), por eso
// todas las expresiones acaban en `[.!?…]?\s*$` y no en `\s*$`. Sin ese detalle
// ninguna cola casaba y las descripciones se quedaban a media frase.
const TAILS = [
  [/ Lee el veredicto completo y (los|los precios|el resto|el)[\s.!¡?…]*$/i, ' Lee el veredicto completo.'],
  [/ Lee el veredicto completo y[\s.!¡?…]*$/i, ' Lee el veredicto completo.'],
  [/ Lee el veredicto completo[\s.!¡?…]*$/i, ' Lee el veredicto completo.'],
  [/ Lee el[\s.!¡?…]*$/i, ' Lee el veredicto.'],
  [/ Read the full verdict with[\s.!¡?…]*$/i, ' Read the full verdict.'],
  [/ Read the full verdict and[\s.!¡?…]*$/i, ' Read the full verdict.'],
  [/ Read the[\s.!¡?…]*$/i, ' Read the verdict.'],
  [/ Dedicated guides for[\s.!¡?…]*$/i, ' Dedicated guides for every case.'],
  [/ Lee el veredicto y[\s.!¡?…]*$/i, ' Lee el veredicto.']
];

function repair(s) {
  let d = s.replace(/\s+/g, ' ').trim();
  for (const [re, rep] of TAILS) {
    if (re.test(d)) { d = d.replace(re, rep); break; }
  }
  // amputa la palabra colgante final hasta que la frase cierre
  for (let guard = 0; guard < 12; guard++) {
    const m = d.match(/^(.*?)([\s,;:—-]*)([A-Za-zÀ-ÿáéíóúñÁÉÍÓÚÑ]+)([\s.…,-]*)$/);
    if (!m) break;
    if (!DANGLING.has(m[3].toLowerCase())) break;
    d = m[1].replace(/[\s,;:….-]+$/, '');
  }
  d = d.replace(/[\s,;:…-]+$/, '');
  if (!/[.!?…]$/.test(d)) d += '.';
  return d;
}

// Recorte por CLAUSULA: nunca en mitad de una frase. Se recorren los puntos
// de corte candidatos de mas largo a mas corto y se queda el primero que cabe.
// IMPORTANTE: si no hay un punto de clause que quepa, NO se recorta por
// palabra — se deja la descripcion larga y se reporta para arreglo manual.
// Recortar por palabra es justo lo que produjo las 69 descripciones cortadas a
// media frase que hay que reparar.
function clauseTrim(d) {
  if (fits(d)) return d;
  const points = [];
  let i;
  for (i = 0; i < d.length; i++) if ('.!?…'.indexOf(d[i]) > -1 && i > 30) points.push(i + 1);
  const seps = ['; ', ', y ', ', o ', ', con ', ', para ', ', que ', ', hasta ', ', desde ', ': '];
  seps.forEach(sp => {
    let idx = d.indexOf(sp);
    while (idx > -1) { if (idx > 30) points.push(idx + 1); idx = d.indexOf(sp, idx + 1); }
  });
  const uniq = Array.from(new Set(points)).filter(p => p > 0).sort((a, b) => b - a);
  for (const p of uniq) {
    let cand = d.substring(0, p).replace(/[\s,;:…-]+$/, '');
    if (cand.length < 40) continue;
    if (!/[.!?…]$/.test(cand)) cand += '.';
    if (fits(cand)) return cand;
  }
  return null;   // sin corte de clausula viable -> el llamador lo reporta
}

let n = 0;
const bad = [];
guides.forEach(function (g) {
  ['description', 'description_es'].forEach(function (k) {
    if (!g[k]) return;
    const before = g[k];
    const rep = repair(before);
    const after = clauseTrim(rep);
    if (after === null) { bad.push('PENDIENTE A MANO [' + g.id + '] ' + k + '\n     ' + rep + '\n'); return; }
    if (after !== before) {
      g[k] = after; n++;
      console.log('[' + g.id + '] ' + k + '  ' + before.length + 'c -> ' + after.length + 'c');
      console.log('   ' + after);
      if (!fits(after)) bad.push('FUERA DE LIMITE [' + g.id + '] ' + k);
    }
  });
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\ndescripciones reparadas automaticamente: ' + n);
if (bad.length) { console.log('\n--- A REVISAR A MANO (' + bad.length + ') ---'); bad.forEach(b => console.log('  ' + b)); }
else console.log('todas dentro de 155 chars / 900px');