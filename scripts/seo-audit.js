/**
 * seo-audit.js — Auditoria de SEO de las paginas de guias.
 *
 * Google NO corta por numero de caracteres, sino por ANCHO EN PIXELES:
 *   - <title>            ~580 px (escritorio) / ~600 px (movil)
 *   - meta description   ~920 px (escritorio) / ~930 px (movil)
 * Un titulo de 60 caracteres con many W y M puede pasar de 580 px, y uno de
 * 60 caracteres estrechos puede no llegar. Por eso aqui se estiman pixeles
 * ademas de contar caracteres.
 *
 * REGLA FIJA DEL SITIO (14/10/2026):
 *   - <title>            <= 60 caracteres  Y  <= 580 px estimados
 *   - meta description   <= 155 caracteres Y  <= 920 px estimados
 *   - ningun <title> con el anio (2026, 2025...) dentro: el ano vive en el
 *     JSON-LD (datePublished) y en la firma de autor, no en el titulo.
 *
 * Uso:  node scripts/seo-audit.js          (informe, exit 1 si hay fallos)
 *      node scripts/seo-audit.js --json   (salida JSON)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const GUIDES = path.join(ROOT, 'guides');

// ---- limites ----
const T_CHARS = 60, T_PX = 580;
const D_CHARS = 155, D_PX = 920;

// ---- estimacion de ancho en pixeles (consultiva) ----
// Google NO corta por caracteres, sino por pixels: el <title> a ~580px y el
// snippet a ~920px. Renderiza el snippet a ~13px (no a 16px del body), asi que
// se estima con 13px. Un titulo con muchas W/M ocupa mas que uno de i/l/t.
// La REGLA DURA del sitio es el limite de caracteres; los pixeles avisan de los
// casos que se verian especialmente anchos.
const FONT_PX = 13;
const NARROW = "iljtIf.,;:'`|!()[]{}/\\-—–\"";
const WIDE = "mwMW@%&#AQROGD";
function pxWidth(str) {
  let em = 0;
  for (const ch of String(str)) {
    if (NARROW.indexOf(ch) > -1) em += 0.30;
    else if (WIDE.indexOf(ch) > -1) em += 0.85;
    else if (ch === ' ') em += 0.28;
    else if (/[A-Z0-9]/.test(ch)) em += 0.62;
    else if (/[a-záéíóúüñ]/.test(ch)) em += 0.50;
    else em += 0.52;
  }
  return Math.round(em * FONT_PX);
}

function read(p) { try { return fs.readFileSync(p, 'utf8'); } catch (e) { return null; } }
function pick(html, re) { const m = html.match(re); return m ? m[1] : ''; }

// Una meta description cortada a media frase ("... Both are heavy —.",
// "... Lee el.") se ve rota en el SERP. Se comprueba la ULTIMA PALABRA real.
// OJO: NO usar \b para esto — en JS \b es ASCII, y las tildes cuentan como
// separador, asi que "bateria." casaria con \ba\b\ y daria un falso positivo.
const DANGLING = new Set(['y', 'e', 'o', 'u', 'ni', 'que', 'de', 'del', 'la', 'el', 'los', 'las',
  'un', 'una', 'para', 'por', 'con', 'sin', 'desde', 'como', 'mas', 'más', 'no',
  'the', 'and', 'for', 'with', 'from', 'than', 'that', 'which', 'to', 'in', 'on', 'of', 'or',
  'is', 'are', 'as', 'by', 'a', 'at', 'al', 'en', 'tu', 'se', 'le', 'lo', 'ya', 'muy', 'cada',
  'pero', 'sobre', 'hasta', 'entre', 'este', 'esta', 'su', 'sus']);
// Conteo de productos en el titulo o la descripcion: se desincroniza en
// cuanto se anade o quita un producto de la guia.
const COUNT_RE = /\b\d{1,2}\s+(best|mejores|top|modelos|premium|interfaces|mics|microfonos|desk-friendly)\b/i;

function descProblems(desc, title) {
  const out = [];
  if (!desc) return out;
  const trimmed = desc.replace(/[.!?,;:…"')\]]*$/, '').trim();
  const words = trimmed.split(/\s+/);
  const last = (words[words.length - 1] || '').toLowerCase();
  if (DANGLING.has(last)) out.push('desc termina en "' + last + '"');
  if (/[,;:—–-]$/.test(trimmed)) out.push('desc termina en separador');
  if (COUNT_RE.test(desc)) out.push('desc con conteo de productos');
  if (COUNT_RE.test(title)) out.push('titulo con conteo de productos');
  if (/^\s*\d/.test(title)) out.push('titulo empieza por numero');
  return out;
}

const files = fs.readdirSync(GUIDES).filter(f => f.endsWith('.html'));
const rows = [];
let stubs = 0;

files.forEach(function (f) {
  const full = path.join(GUIDES, f);
  const html = read(full);
  if (!html) return;
  if (html.length < 20000) { stubs++; return; }          // stub de redireccion

  const isEs = /_es\.html$/.test(f);
  const title = pick(html, /<title>([\s\S]*?)<\/title>/);
  const desc = pick(html, /<meta name="description" content="([^"]*)"/);
  const ogTitle = pick(html, /property="og:title" content="([^"]*)"/);
  const h1m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1 = h1m ? h1m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';

  const issues = [];
  if (!title) issues.push('sin <title>');
  else {
    if (title.length > T_CHARS) issues.push('title ' + title.length + ' chars (> ' + T_CHARS + ')');
    if (pxWidth(title) > T_PX) issues.push('title ' + pxWidth(title) + 'px (> ' + T_PX + ')');
    if (/20\d\d/.test(title)) issues.push('title con anio');
    if (/[<>]/.test(title)) issues.push('title con < o >');
  }
  if (!desc) issues.push('sin meta description');
  else {
    if (desc.length > D_CHARS) issues.push('desc ' + desc.length + ' chars (> ' + D_CHARS + ')');
    if (pxWidth(desc) > D_PX) issues.push('desc ' + pxWidth(desc) + 'px (> ' + D_PX + ')');
    descProblems(desc, title).forEach(p => issues.push(p));
  }
  if (!h1) issues.push('sin <h1>');
  if (ogTitle && pxWidth(ogTitle) > 700) issues.push('og:title ' + pxWidth(ogTitle) + 'px ancho');

  rows.push({
    file: f, lang: isEs ? 'ES' : 'EN',
    title: title, tChars: title.length, tPx: pxWidth(title),
    desc: desc, dChars: desc.length, dPx: pxWidth(desc),
    h1: h1, issues: issues
  });
});

const bad = rows.filter(r => r.issues.length);
const en = rows.filter(r => r.lang === 'EN'), es = rows.filter(r => r.lang === 'ES');

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ checked: rows.length, limits: { T_CHARS, T_PX, D_CHARS, D_PX }, failures: bad }, null, 2));
  process.exit(bad.length ? 1 : 0);
}

console.log('================================================================');
console.log(' AUDITORIA SEO — Google: <title> <= ' + T_CHARS + ' chars / ' + T_PX + 'px');
console.log('                        meta desc <= ' + D_CHARS + ' chars / ' + D_PX + 'px');
console.log('================================================================');
console.log(' Paginas analizadas : ' + rows.length + '   (EN ' + en.length + ' / ES ' + es.length + ')');
console.log(' Stubs de redireccion (ignorados): ' + stubs);
console.log('');
console.log(' EN  title max: ' + Math.max.apply(null, en.map(r => r.tChars)) + ' chars / ' + Math.max.apply(null, en.map(r => r.tPx)) + 'px');
console.log(' EN  desc  max: ' + Math.max.apply(null, en.map(r => r.dChars)) + ' chars / ' + Math.max.apply(null, en.map(r => r.dPx)) + 'px');
console.log(' ES  title max: ' + Math.max.apply(null, es.map(r => r.tChars)) + ' chars / ' + Math.max.apply(null, es.map(r => r.tPx)) + 'px');
console.log(' ES  desc  max: ' + Math.max.apply(null, es.map(r => r.dChars)) + ' chars / ' + Math.max.apply(null, es.map(r => r.dPx)) + 'px');
console.log('');

if (!bad.length) {
  console.log(' TODO CORRECTO — ninguna pagina se corta en Google.');
  console.log(' 0 titulos fuera de limite, 0 descripciones fuera de limite, 0 titulos con anio.');
  process.exit(0);
}

console.log(' FALLOS: ' + bad.length + '/' + rows.length + ' paginas');
console.log('');
bad.forEach(function (r) {
  console.log('  [' + r.lang + '] ' + r.file);
  console.log('       ' + r.tChars + 'c / ' + r.tPx + 'px  ' + JSON.stringify(r.title));
  console.log('       ' + r.dChars + 'c / ' + r.dPx + 'px  ' + JSON.stringify(r.desc.slice(0, 100)));
  console.log('       -> ' + r.issues.join(' | '));
});
process.exit(1);