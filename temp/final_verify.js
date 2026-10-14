const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

// Test unicode-aware: en JS \b es ASCII, asi que "bateria." casaba con \ba\b
// (la "a" acentuada cuenta como separador). Aqui se comprueba la ULTIMA
// PALABRA real del texto.
const DANGLING = new Set(['y', 'e', 'o', 'u', 'ni', 'que', 'de', 'del', 'la', 'el', 'los', 'las',
  'un', 'una', 'para', 'por', 'con', 'sin', 'desde', 'como', 'mas', 'más', 'no',
  'the', 'and', 'for', 'with', 'from', 'than', 'that', 'which', 'to', 'in', 'on', 'of', 'or',
  'is', 'are', 'as', 'by', 'a', 'at', 'al', 'en', 'tu', 'se', 'le', 'lo', 'ya', 'muy', 'cada',
  'pero', 'sobre', 'hasta', 'entre', 'este', 'esta', 'these', 'su', 'sus']);

function lastWord(s) {
  const t = s.replace(/[.!?,;:…"')\]]*$/, '').trim();
  const m = t.match(/([^\s]+)$/);
  return m ? m[1].toLowerCase() : '';
}

// Second-to-last word also matters: "...se ganan un hueco fijo en el rack —"
function prevWord(s) {
  const t = s.replace(/[.!?,;:…"')\]]*$/, '').trim();
  const parts = t.split(/\s+/);
  return parts.length >= 2 ? parts[parts.length - 2].toLowerCase() : '';
}

const COUNT = /\b(\d{1,2})\s+(best|mejores|top|modelos|premium|interfaces|mics|microfonos|desk-friendly)\b/i;

let bad = 0, cnt = 0;
guides.forEach(function (g) {
  ['description', 'description_es'].forEach(function (k) {
    if (!g[k]) return;
    cnt++;
    const d = g[k];
    const lw = lastWord(d), pw = prevWord(d);
    const errs = [];
    if (DANGLING.has(lw)) errs.push('termina en "' + lw + '"');
    if (/[,;:—-]$/.test(d.replace(/[.]$/, ''))) errs.push('termina en separador');
    if (COUNT.test(d)) errs.push('conteo de productos');
    if (d.length > 155) errs.push('>155 chars');
    if (errs.length) {
      bad++;
      console.log('[' + g.id + '] ' + k + '  -> ' + errs.join(' | '));
      console.log('   ...' + d.slice(-70));
      console.log('   (ultima palabra: "' + lw + '", anterior: "' + pw + '")');
    }
  });
});

console.log('\ndescripciones: ' + cnt + '   con problema real: ' + bad);

// titulos
let tbad = 0;
guides.forEach(function (g) {
  ['title', 'titleTag', 'title_es', 'titleTag_es'].forEach(function (k) {
    if (!g[k]) return;
    if (g[k].length > 60) { tbad++; console.log('  TITULO >60 [' + g.id + '] ' + k); }
    if (/^\d/.test(g[k])) { tbad++; console.log('  TITULO con numero [' + g.id + '] ' + k); }
  });
});
console.log('titulos con problema: ' + tbad);