/**
 * fix_descs_tu.js — fix puntual de descs que quedan con palabra colgante
 * tras la reparación de mojibake. Operar sobre el estado ACTUAL del JSON
 * (NO restaurar de HEAD: reintroduciría el mojibake).
 */
const fs = require('fs');
const G_PATH = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(G_PATH, 'utf8'));

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

function colaLimpia(t) {
  t = String(t).replace(/\s+/g, ' ').trim();
  for (let guard = 0; guard < 12; guard++) {
    const tr = t.replace(/[,;:—–\u2026-]+$/, '').replace(/\.{2,}$/, '').trim();
    const ws = tr.split(/\s+/);
    const last = (ws[ws.length - 1] || '').toLowerCase();
    if (ws.length > 2 && (DANGLING.has(last) || /[,;:—–\u2026-]$/.test(tr) || /\.{2,}$/.test(tr))) {
      t = ws.slice(0, -1).join(' ');
    } else { t = tr; break; }
  }
  return t.replace(/[,;:—–\u2026-]+$/, '').replace(/\.{2,}$/, '').trim();
}

function fixDesc(orig) {
  if (problemas(orig).length === 0) return { txt: orig, cambio: false };
  const s = String(orig).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const parts = s.split(/(?<=[.!?…])\s+/);
  let acc = '';
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i].trim();
    if (/\.{3,}$/.test(p)) break;
    if (!/[.!?…]"?$/.test(p)) break;
    const cand = acc ? acc + ' ' + p : p;
    if (cand.length <= D_CHARS && pxWidth(cand) <= D_PX) acc = cand;
    else break;
  }
  if (acc && problemas(acc).length === 0) return { txt: acc, cambio: true, via: 'frases' };
  let frag = colaLimpia(s);
  while ((frag.length > D_CHARS || pxWidth(frag) > D_PX) && frag.length > 60) {
    const sp = frag.lastIndexOf(' ');
    if (sp <= 40) break;
    frag = colaLimpia(frag.slice(0, sp));
  }
  const out = /[.!?…]$/.test(frag) ? frag : frag + '.';
  if (problemas(out).length === 0) return { txt: out, cambio: true, via: 'palabras' };
  return { txt: orig, cambio: false, fallo: true };
}

let n = 0;
const fallos = [];
guides.forEach(function (g) {
  ['description', 'description_es'].forEach(function (k) {
    const r = fixDesc(g[k] || '');
    if (r.cambio) { g[k] = r.txt; n++; console.log(g.id + ' :: ' + k + ' (' + r.via + '): ' + JSON.stringify(r.txt)); }
    else if (r.fallo) fallos.push(g.id + '::' + k);
  });
});
console.log('Cambiadas:', n);
if (fallos.length) console.log('FALLOS:', fallos.join(', '));
fs.writeFileSync(G_PATH, JSON.stringify(guides, null, 2), 'utf8');
