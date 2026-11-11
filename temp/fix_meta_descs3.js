/**
 * fix_meta_descs3.js — v3 (sobre el estado actual, restaura de HEAD y re-aplica)
 * 1. Restaura description/description_es desde HEAD.
 * 2. tuners-bass-guitar: siembra description desde desc/desc_es si falta.
 * 3. Fix: dedupe de frases + frases completas que quepan (155c/920px) +
 *    continuación por fragmento SOLO si el fragmento contiene verbo
 *    (evita sintagmas nominales sueltos tipo "La Fender … Stratocaster.").
 * 4. Campos casi vacíos (".", "…") → sin cambio.
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
  // siembra tuner: description desde desc
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
const VERBOS = new Set(['is', 'are', 'was', 'were', 'has', 'have', 'can', 'will', 'makes', 'make',
  'offers', 'offer', 'delivers', 'deliver', 'covers', 'cover', 'means', 'mean', 'gives', 'give',
  'runs', 'run', 'fits', 'fit', 'handles', 'handle', 'needs', 'need', 'buy', 'get', 'gets',
  'work', 'works', 'shape', 'shapes', 'solves', 'solve', 'holds', 'hold', 'keeps', 'keep',
  'es', 'son', 'ofrece', 'ofrecen', 'cubre', 'cubren', 'da', 'dan', 'llevan', 'lleva',
  'hacen', 'hace', 'sirve', 'sirven', 'tiene', 'tienen', 'ayuda', 'ayudan', 'permite',
  'permite', 'resuelve', 'resuelven', 'cabe', 'caben', 'gana', 'ganan', 'pide', 'piden',
  'necesita', 'necesitan', 'quiere', 'quieren', 'vale', 'valen', 'rendir', 'elegir']);

function problemas(desc) {
  const out = [];
  if (!desc || !desc.trim() || desc.trim().length < 3) return ['vacia'];
  if (desc.length > D_CHARS) out.push('chars ' + desc.length);
  if (pxWidth(desc) > D_PX) out.push('px ' + pxWidth(desc));
  const trimmed = desc.replace(/[.!?,;:…"')\]]*$/, '').trim();
  const words = trimmed.split(/\s+/);
  const last = (words[words.length - 1] || '').toLowerCase();
  if (DANGLING.has(last)) out.push('colgante "' + last + '"');
  if (/[,;:—–-]$/.test(trimmed)) out.push('separador');
  return out;
}

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
  if (t.split(' ').length < 4) return '';
  const palabras = t.toLowerCase().replace(/[^a-záéíóúüñ\s]/g, ' ').split(/\s+/);
  if (!palabras.some(function (w) { return VERBOS.has(w); })) return ''; // sin verbo → no seguir
  if (DANGLING.has(t.split(' ').pop().toLowerCase())) return '';
  return t;
}

function fixDesc(orig) {
  const p0 = problemas(orig);
  if (p0.length === 1 && p0[0] === 'vacia') return { txt: orig, cambio: false, vacio: true };
  if (!p0.length) return { txt: orig, cambio: false };
  let s = String(orig).replace(/\s+/g, ' ').trim();
  const parts = s.split(/(?<=[.!?…])\s+/);
  const dedup = [];
  parts.forEach(function (x) {
    const t = x.trim();
    if (dedup.length && dedup[dedup.length - 1].toLowerCase() === t.toLowerCase()) return;
    dedup.push(t);
  });
  s = dedup.join(' ');
  if (problemas(s).length === 0) return { txt: s, cambio: true, via: 'dedupe' };

  let acc = '';
  let idx = 0;
  for (let i = 0; i < dedup.length; i++) {
    const cand = acc ? acc + ' ' + dedup[i] : dedup[i];
    if (cand.length <= D_CHARS && pxWidth(cand) <= D_PX) { acc = cand; idx = i + 1; }
    else break;
  }
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
  const frag = recortaFragmento(s, 150);
  if (frag) {
    const out = /[.!?…]$/.test(frag) ? frag : frag + '.';
    if (problemas(out).length === 0) return { txt: out, cambio: true, via: 'palabras' };
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
