const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

const D_CHARS = 155, D_PX = 910;   // margen de seguridad sobre los 920px de Google
const T_CHARS = 60, T_PX = 560;

const NARROW = "iljtIf.,;:'`|!()[]{}/\\-—–\"";
const WIDE = "mwMW@%&\u00A3#$%&@";
function px(str, font) {
  let em = 0;
  for (const ch of String(str)) {
    if (NARROW.indexOf(ch) > -1) em += 0.30;
    else if (WIDE.indexOf(ch) > -1) em += 0.85;
    else if (ch === ' ') em += 0.28;
    else if (/[A-Z0-9]/.test(ch)) em += 0.62;
    else if (/[a-z\u00E1\u00E9\u00ED\u00F3\u00FA\u00FC\u00F1]/.test(ch)) em += 0.50;
    else em += 0.52;
  }
  return Math.round(em * font);
}
const PX = s => px(s, 13);

// Recorta en frontera de palabra respetando AMBOS limites.
function trim(d, maxC, maxP) {
  if (!d) return d;
  let s = d.replace(/\s+/g, ' ').trim();
  if (s.length <= maxC && PX(s) <= maxP) return s;
  let lo = 30, hi = Math.min(s.length, maxC), best = '';
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const cand = s.substring(0, mid);
    const sp = cand.lastIndexOf(' ');
    const cut = (sp > 20 ? cand.substring(0, sp) : cand).replace(/[\s,;:.\-–—&]+$/, '');
    if (PX(cut + '.') <= maxP && (cut + '.').length <= maxC) { best = cut; lo = mid + 1; }
    else hi = mid - 1;
  }
  if (!best) {
    // fallback: cortar a 120 chars en frontera de palabra
    const cand = s.substring(0, 120);
    const sp = cand.lastIndexOf(' ');
    best = (sp > 40 ? cand.substring(0, sp) : cand).replace(/[\s,;:.\-–—&]+$/, '');
  }
  return best + '.';
}

let nDesc = 0, nTitle = 0;
guides.forEach(function (g) {
  ['description', 'description_es'].forEach(function (k) {
    if (!g[k]) return;
    const before = g[k];
    const after = trim(before, D_CHARS, D_PX);
    if (after !== before) {
      nDesc++;
      console.log('  [' + g.id + '] ' + k + ': ' + before.length + 'c/' + PX(before) + 'px  ->  ' +
        after.length + 'c/' + PX(after) + 'px');
    }
    g[k] = after;
  });
  ['title', 'titleTag', 'title_es', 'titleTag_es'].forEach(function (k) {
    if (!g[k]) return;
    const before = g[k];
    const after = trim(before, T_CHARS, T_PX);
    if (after !== before) { nTitle++; console.log('  [TITULO ' + g.id + ' ' + k + '] ' + before + '  ->  ' + after); }
    g[k] = after;
  });
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\ndescripciones recortadas: ' + nDesc);
console.log('titulos recortados: ' + nTitle);