/**
 * fix_meta_descs.js — corrige description/description_es en data/guides.json
 * para que las 338 páginas pasen scripts/seo-audit.js.
 *
 * Reglas replicadas de scripts/seo-audit.js (límites + pxWidth + DANGLING).
 * Estrategia (REGLA del sitio 14/10/2026: nunca cortar a media frase):
 *   1. Si la descripción ya pasa → no tocar.
 *   2. Recorte por FRONTERA DE FRASE: acumular frases completas mientras
 *      quepan en 155 chars / 920 px. El resultado siempre acaba en ". ! ? …".
 *   3. Fallback si ni una frase cabe: corte por palabra + eliminar palabras
 *      colgantes (DANGLING) + punto final.
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
  if (!desc) return ['vacia'];
  if (desc.length > D_CHARS) out.push('chars ' + desc.length);
  if (pxWidth(desc) > D_PX) out.push('px ' + pxWidth(desc));
  const trimmed = desc.replace(/[.!?,;:…"')\]]*$/, '').trim();
  const words = trimmed.split(/\s+/);
  const last = (words[words.length - 1] || '').toLowerCase();
  if (DANGLING.has(last)) out.push('colgante "' + last + '"');
  if (/[,;:—–-]$/.test(trimmed)) out.push('separador');
  return out;
}

// divide en frases completas (terminadas en . ! ? …) + resto
function frases(s) {
  const parts = String(s).split(/(?<=[.!?…])\s+/);
  const completas = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i].trim();
    // "..." (3+ puntos) = artefacto de truncado, NO fin de frase
    if (/\.{3,}$/.test(p)) break;
    if (/[.!?…]"?$/.test(p)) completas.push(p);
    else break; // frase incompleta: parar (el resto se descarta)
  }
  return completas;
}

function fixDesc(orig, campo) {
  const p = problemas(orig);
  if (!p.length) return { txt: orig, cambio: false };
  // 2) recorte por frases
  const fs_ = frases(orig);
  let mejor = '';
  let acc = '';
  for (let i = 0; i < fs_.length; i++) {
    const cand = acc ? acc + ' ' + fs_[i] : fs_[i];
    if (cand.length <= D_CHARS && pxWidth(cand) <= D_PX) { acc = cand; mejor = acc; }
    else break;
  }
  if (mejor && /[.!?…]"?$/.test(mejor)) return { txt: mejor, cambio: true, via: 'frases' };
  // 3) fallback: corte por palabra + quitar colgantes
  let t = String(orig).replace(/\s+/g, ' ').trim();
  if (t.length > D_CHARS || pxWidth(t) > D_PX) {
    let cut = t;
    while (cut.length > D_CHARS - 5 || pxWidth(cut) > D_PX) {
      const sp = cut.lastIndexOf(' ');
      if (sp <= 40) { cut = cut.slice(0, Math.max(40, D_CHARS - 5)); break; }
      cut = cut.slice(0, sp);
    }
    t = cut;
  }
  // quitar palabras colgantes al final
  for (let guard = 0; guard < 10; guard++) {
    const tr = t.replace(/[,;:—–-]+$/, '').trim();
    const ws = tr.split(/\s+/);
    const last = (ws[ws.length - 1] || '').toLowerCase().replace(/[.!?…]+$/, '');
    if (ws.length > 2 && (DANGLING.has(last) || /[,;:—–-]$/.test(tr))) {
      t = ws.slice(0, -1).join(' ');
    } else { t = tr; break; }
  }
  t = t.replace(/[,;:—–-]+$/, '').trim();
  if (!/[.!?…]$/.test(t)) t += '.';
  if (problemas(t).length) console.log('  !! sigue fallando', campo, JSON.stringify(t.slice(-50)));
  return { txt: t, cambio: true, via: 'palabras' };
}

let cambiadas = 0;
guides.forEach(function (g) {
  [['description', 'description_es']].forEach(function (pair) {
    const enK = pair[0], esK = pair[1];
    const rEn = fixDesc(g[enK] || '', enK);
    if (rEn.cambio) { g[enK] = rEn.txt; cambiadas++; console.log(g.id + ' :: ' + enK + ' (' + rEn.via + '): ' + JSON.stringify(String(g[enK]).slice(0, 60)) + ' -> ' + JSON.stringify(rEn.txt.slice(-40))); }
    const rEs = fixDesc(g[esK] || '', esK);
    if (rEs.cambio) { g[esK] = rEs.txt; cambiadas++; console.log(g.id + ' :: ' + esK + ' (' + rEs.via + '): ...' + JSON.stringify(rEs.txt.slice(-40))); }
  });
});
console.log('Campos description cambiados:', cambiadas);
fs.writeFileSync(G_PATH, JSON.stringify(guides, null, 2), 'utf8');
