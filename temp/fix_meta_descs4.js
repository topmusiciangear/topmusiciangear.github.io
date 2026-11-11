/**
 * fix_meta_descs4.js — v4 FINAL
 * 1. Restaura description/description_es desde HEAD.
 * 2. tuners: siembra desde desc/desc_es si falta.
 * 3. Fix: stripHtml + dedupe de frases + SOLO frases completas que quepan
 *    (155c/920px). Sin continuación de fragmentos (dejaban colas huérfanas
 *    tipo "are two." / "the two wireless."). Fallback por palabra solo si
 *    no existe ni una frase completa.
 * 4. Cola limpia: sin "..." final, sin palabras colgantes, punto final.
 */
const fs = require('fs');
const cp = require('child_process');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const G_PATH = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(G_PATH, 'utf8'));

const headRaw = cp.execSync('git show HEAD:data/guides.json', { cwd: B, maxBuffer: 200 * 1024 * 1024 }).toString('utf8');
const headGuides = JSON.parse(headRaw);
const headById = {};
headGuides.forEach(function (g) { headById[g.id] = g; });

let restauradas = 0, sembradas = 0;
guides.forEach(function (g) {
  const h = headById[g.id];
  ['description', 'description_es'].forEach(function (k) {
    if (h && h[k] && h[k] !== g[k]) { g[k] = h[k]; restauradas++; }
  });
  if ((!g.description || g.description.trim().length < 3) && g.desc) { g.description = g.desc; sembradas++; }
  if ((!g.description_es || g.description_es.trim().length < 3) && g.desc_es) { g.description_es = g.desc_es; sembradas++; }
});
console.log('Restauradas desde HEAD:', restauradas, '| Sembradas desde desc:', sembradas);

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

function stripHtml(s) { return String(s).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); }

function problemas(desc) {
  const out = [];
  if (!desc || desc.trim().length < 3) return ['vacia'];
  if (desc.length > D_CHARS) out.push('chars ' + desc.length);
  if (pxWidth(desc) > D_PX) out.push('px ' + pxWidth(desc));
  const trimmed = desc.replace(/[.!?,;:…"')\]]*$/, '').trim();
  const words = trimmed.split(/\s+/);
  const last = (words[words.length - 1] || '').toLowerCase();
  if (DANGLING.has(last)) out.push('colgante "' + last + '"');
  if (/[,;:—–-]$/.test(trimmed)) out.push('separador');
  return out;
}

// recorte por palabra + cola limpia (sin colgantes, sin "...", con punto)
function colaLimpia(t) {
  t = String(t).replace(/\s+/g, ' ').trim();
  for (let guard = 0; guard < 12; guard++) {
    const tr = t.replace(/[,;:—–-]+$/, '').replace(/\.{2,}$/, '').trim();
    const ws = tr.split(/\s+/);
    const last = (ws[ws.length - 1] || '').toLowerCase();
    if (ws.length > 2 && (DANGLING.has(last) || /[,;:—–-]$/.test(tr) || /\.{2,}$/.test(tr))) {
      t = ws.slice(0, -1).join(' ');
    } else { t = tr; break; }
  }
  t = t.replace(/[,;:—–-]+$/, '').replace(/\.{2,}$/, '').trim();
  return t;
}

function fixDesc(orig) {
  const p0 = problemas(orig);
  if (p0.length === 1 && p0[0] === 'vacia') return { txt: orig, cambio: false };
  if (!p0.length) return { txt: orig, cambio: false };

  let s = stripHtml(orig);
  // dedupe de frases repetidas consecutivas
  const parts = s.split(/(?<=[.!?…])\s+/);
  const dedup = [];
  parts.forEach(function (x) {
    const t = x.trim();
    if (dedup.length && dedup[dedup.length - 1].toLowerCase() === t.toLowerCase()) return;
    dedup.push(t);
  });
  // SOLO frases completas
  const completas = [];
  for (let i = 0; i < dedup.length; i++) {
    const p = dedup[i];
    if (/\.{3,}$/.test(p)) break; // "..." = truncado previo
    if (/[.!?…]"?$/.test(p)) completas.push(p);
    else break;
  }
  // acumular frases que quepan
  let acc = '';
  for (let i = 0; i < completas.length; i++) {
    const cand = acc ? acc + ' ' + completas[i] : completas[i];
    if (cand.length <= D_CHARS && pxWidth(cand) <= D_PX) acc = cand;
    else break;
  }
  if (acc && problemas(acc).length === 0) return { txt: acc, cambio: acc !== orig, via: 'frases' };

  // fallback: recorte por palabra del texto completo
  let frag = colaLimpia(s);
  if (frag) {
    while (frag.length > D_CHARS || pxWidth(frag) > D_PX) {
      const sp = frag.lastIndexOf(' ');
      if (sp <= 40) break;
      frag = frag.slice(0, sp);
      const clean = colaLimpia(frag);
      if (!clean) break;
      frag = clean;
    }
    const out = /[.!?…]$/.test(frag) ? frag : frag + '.';
    if (problemas(out).length === 0) return { txt: out, cambio: out !== orig, via: 'palabras' };
  }
  return { txt: orig, cambio: false, fallo: true };
}

let cambiadas = 0;
const fallos = [];
guides.forEach(function (g) {
  ['description', 'description_es'].forEach(function (k) {
    const r = fixDesc(g[k] || '');
    if (r.cambio) { g[k] = r.txt; cambiadas++; console.log(g.id + ' :: ' + k + ' (' + r.via + '): ' + JSON.stringify(r.txt)); }
    else if (r.fallo) fallos.push(g.id + '::' + k);
  });
});
console.log('Cambiadas:', cambiadas);
if (fallos.length) console.log('SIN FIX AUTOMATICO (revisar):', fallos.join(', '));
fs.writeFileSync(G_PATH, JSON.stringify(guides, null, 2), 'utf8');
