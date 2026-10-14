const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

// SOLO descripciones. Los titulos ya estan reescritos a mano en rewrite_titles.js:
// nunca se recortan automaticamente (parte frases y deja basura).
const D_CHARS = 155, D_PX = 900;
// Tablas de glifos IDENTICAS a scripts/seo-audit.js — si difieren, el recorte
// deja pasar lo que el audit luego marca como fallo.
const NARROW = "iljtIf.,;:'`|!()[]{}/\\-—–\"";
const WIDE = "mwMW@%&#AQROGD";
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
function trim(d) {
  if (!d) return d;
  const s = d.replace(/\s+/g, ' ').trim();
  if (s.length <= D_CHARS && PX(s) <= D_PX) return s;
  for (let end = Math.min(s.length, D_CHARS); end >= 40; end--) {
    let cand = s.substring(0, end);
    const sp = cand.lastIndexOf(' ');
    cand = (sp > 20 ? cand.substring(0, sp) : cand).replace(/[\s,;:.\u2013\u2014&-]+$/, '');
    const out = cand + '.';
    if (out.length <= D_CHARS && PX(out) <= D_PX) return out;
  }
  let c = s.substring(0, 110);
  const sp = c.lastIndexOf(' ');
  c = (sp > 40 ? c.substring(0, sp) : c).replace(/[\s,;:.\u2013\u2014&-]+$/, '');
  return c + '.';
}

let n = 0;
guides.forEach(function (g) {
  ['description', 'description_es'].forEach(function (k) {
    if (!g[k]) return;
    const b = g[k], a = trim(b);
    if (a !== b) {
      n++;
      console.log('  [' + g.id + '] ' + k + ':  ' + b.length + 'c/' + PX(b) + 'px  ->  ' + a.length + 'c/' + PX(a) + 'px');
      console.log('      ' + a);
    }
    g[k] = a;
  });
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\ndescripciones recortadas: ' + n);

// control: ningun titulo tocado ni por encima de 60
let over = 0;
guides.forEach(function (g) {
  ['title', 'titleTag', 'title_es', 'titleTag_es'].forEach(function (k) {
    if (g[k] && g[k].length > 60) { over++; console.log('  [!!] TITULO >60 [' + g.id + '] ' + k + ' (' + g[k].length + ')'); }
  });
});
console.log('titulos >60 restantes: ' + over);