/**
 * fix_meta_descs2.js — v2
 * 1. Restaura description/description_es desde HEAD (contenido completo original).
 * 2. Aplica el fix de descs: frases completas que quepan (155c/920px) +
 *    continuación por fragmento recortado por palabra (sin palabras colgantes).
 * 3. Dedupe de frases repetidas consecutivas (bug real: beat-making).
 * 4. tuners-bass-guitar: si no hay description, la siembra desde desc/desc_es.
 */
const fs = require('fs');
const cp = require('child_process');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const G_PATH = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(G_PATH, 'utf8'));

// ---- 1. HEAD originals ----
const headRaw = cp.execSync('git show HEAD:data/guides.json', { cwd: B, maxBuffer: 200 * 1024 * 1024 }).toString('utf8');
const headGuides = JSON.parse(headRaw);
const headById = {};
headGuides.forEach(function (g) { headById[g.id] = g; });

let restauradas = 0;
guides.forEach(function (g) {
  const h = headById[g.id];
  if (!h) return;
  ['description', 'description_es'].forEach(function (k) {
    if (h[k] && h[k] !== g[k]) { g[k] = h[k]; restauradas++; }
  });
});
console.log('Descriptions restauradas desde HEAD:', restauradas);

// ---- límites idénticos a scripts/seo-audit.js ----
const D_CHARS = 155, D_PX = 920;
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
const DANGLING = new Set(['y', 'e', 'o', 'u', 'ni', 'que', 'de', 'del', 'la', 'el', 'los', 'las',
  'un', 'una', 'para', 'por', 'con', 'sin', 'desde', 'como', 'mas', 'más', 'no',
  'the', 'and', 'for', 'with', 'from', 'than', 'that', 'which', 'to', 'in', 'on', 'of', 'or',
  'is', 'are', 'as', 'by', 'a', 'at', 'al', 'en', 'tu', 'se', 'le', 'lo', 'ya', 'muy', 'cada',
  'pero', 'sobre', 'hasta', 'entre', 'este', 'esta', 'su', 'sus']);

function problemas(desc) {
  const out = [];
  if (!desc || !desc.trim()) return ['vacia'];
  if (desc.length > D_CHARS) out.push('chars ' + desc.length);
  if (pxWidth(desc) > D_PX) out.push('px ' + pxWidth(desc));
  const trimmed = desc.replace(/[.!?,;:…"')\]]*$/, '').trim();
  const words = trimmed.split(/\s+/);
  const last = (words[words.length - 1] || '').toLowerCase();
  if (DANGLING.has(last)) out.push('colgante "' + last + '"');
  if (/[,;:—–-]$/.test(trimmed)) out.push('separador');
  return out;
}

// corta un fragmento por palabra dejándolo limpio (sin colgantes ni separadores)
function recortaFragmento(frag, presupuesto) {
  let t = String(frag).replace(/\s+/g, ' ').trim();
  if (!t) return '';
  while (t.length > presupuesto || pxWidth(t) > D_PX) {
    const sp = t.lastIndexOf(' ');
    if (sp <= 40) return '';
    t = t.slice(0, sp);
  }
  for (let guard = 0; guard < 10; guard++) {
    const tr = t.replace(/[,;:—–-]+$/, '').replace(/\.{2,}$/, '').trim();
    const ws = tr.split(/\s+/);
    const last = (ws[ws.length - 1] || '').toLowerCase();
    if (ws.length > 2 && (DANGLING.has(last) || /[,;:—–-]$/.test(tr) || /\.{2,}$/.test(tr))) {
      t = ws.slice(0, -1).join(' ');
    } else { t = tr; break; }
  }
  t = t.replace(/[,;:—–-]+$/, '').replace(/\.{2,}$/, '').trim();
  if (t.split(' ').length < 3) return '';
  if (DANGLING.has(t.split(' ').pop().toLowerCase())) return '';
  return t;
}

function fixDesc(orig, id, campo) {
  let p = problemas(orig);
  if (!p.length) return { txt: orig, cambio: false };
  // dedupe de frases repetidas consecutivas
  let s = String(orig || '').replace(/\s+/g, ' ').trim();
  const parts = s.split(/(?<=[.!?…])\s+/);
  const dedup = [];
  parts.forEach(function (x) {
    const t = x.trim();
    if (dedup.length && dedup[dedup.length - 1].toLowerCase() === t.toLowerCase()) return;
    dedup.push(t);
  });
  s = dedup.join(' ');
  p = problemas(s);
  if (!p.length) return { txt: s, cambio: true, via: 'dedupe' };

  // frases completas que quepan
  let acc = '';
  let idx = 0;
  for (let i = 0; i < dedup.length; i++) {
    const cand = acc ? acc + ' ' + dedup[i] : dedup[i];
    if (cand.length <= D_CHARS && pxWidth(cand) <= D_PX) { acc = cand; idx = i + 1; }
    else break;
  }
  // continuación: fragmento del resto recortado limpio
  if (acc && idx < dedup.length) {
    const resto = dedup.slice(idx).join(' ');
    const presupuesto = Math.min(D_CHARS - acc.length - 1, 150);
    const frag = recortaFragmento(resto, presupuesto);
    if (frag && problemas(acc + ' ' + frag + '.').length === 0) {
      return { txt: acc + ' ' + frag + '.', cambio: true, via: 'fragmento' };
    }
  }
  if (acc && /[.!?…]"?$/.test(acc) && !/\.{3}$/.test(acc)) {
    return { txt: acc, cambio: true, via: 'frases' };
  }
  // fallback total: recorte por palabra del original
  const frag = recortaFragmento(s, 150);
  if (frag) { frag; }
  return { txt: (frag || '') + (frag && !/[.!?…]$/.test(frag) ? '.' : ''), cambio: frag ? true : false, via: frag ? 'palabras' : 'vacio' };
}

let cambiadas = 0;
const vacias = [];
guides.forEach(function (g) {
  ['description', 'description_es'].forEach(function (k) {
    const r = fixDesc(g[k] || '', g.id, k);
    if (r.cambio) {
      g[k] = r.txt;
      cambiadas++;
      console.log(g.id + ' :: ' + k + ' (' + r.via + '): ' + JSON.stringify(r.txt.slice(0, 70)) + (r.txt.length > 70 ? '…' : ''));
    } else if (!r.txt) {
      vacias.push(g.id + '::' + k);
    }
  });
});
console.log('Descriptions cambiadas:', cambiadas);
if (vacias.length) console.log('VACIAS SIN FUENTE (revisar):', vacias.join(', '));
fs.writeFileSync(G_PATH, JSON.stringify(guides, null, 2), 'utf8');
