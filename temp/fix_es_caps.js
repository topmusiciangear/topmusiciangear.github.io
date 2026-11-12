// temp/fix_es_caps.js (v2) — Title Case en campos heading/título ES de data/guides.json
//
// Alcance (solo campos que se renderizan como título/heading en ES):
//   title_es, titleTag_es, metaDesc_es, sections[].heading_es, sections[].h_es,
//   faq[].q_es, productTable.title_es
//
// Estrategia (protege nombres propios):
//   - vocab de marcas/modelos extraído de products.json (títulos EN + brand) y de
//     verdictProsCons/table/featured de guides.json + lista manual de nombres propios.
//   - REGLA RUN: una secuencia de palabras capitalizadas adyacentes (separadas solo por
//     espacios/funciones tipo "de/la/y/para/con") con >=2 palabras capitalizadas es un
//     artefacto de Title Case -> se bajan a minúscula todas menos las protegidas
//     (inicial de oración, siglas all-caps, con dígitos, 1 letra, vocab).
//   - Palabra capitalizada AISLADA (run de 1): solo se baja si aparece >=2 veces en
//     minúscula en el propio corpus ES (evidencia) -> "Inalámbrico" se arregla,
//     "Sitka"/"Dolby" nunca aparecen en minúscula y quedan como están.
//
// Uso: node temp/fix_es_caps.js          -> DETECT (informe, no escribe)
//      node temp/fix_es_caps.js --apply  -> aplica con raw split/join + guard de colisiones
const fs = require('fs');
const APPLY = process.argv.includes('--apply');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guidesPath = B + 'data/guides.json';

const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
const P = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const prods = Array.isArray(P) ? P : (P.products || []);

// ---------------- 1) vocabulario de nombres propios ----------------
const vocab = new Set();
function addTokens(s) {
  String(s || '').split(/[^A-Za-zÀ-ÿ0-9'’]+/).forEach(w => {
    w = w.replace(/^[.'’-]+|[.'’-]+$/g, '');
    if (!w || !/^[A-Za-zÀ-ÿ]/.test(w)) return;
    vocab.add(w.toLowerCase());
    if (w.length > 3 && w.endsWith('s')) vocab.add(w.slice(0, -1).toLowerCase());
    if (w.length > 4 && w.endsWith('es')) vocab.add(w.slice(0, -2).toLowerCase());
  });
}
prods.forEach(p => addTokens((p.title || '') + ' ' + (p.brand || '')));
guides.forEach(g => {
  (g.verdictProsCons || []).forEach(v => addTokens(v.name));
  if (g.productTable) (g.productTable.rows || []).forEach(r => addTokens(r.product));
  (g.featuredProducts || []).forEach(fp => addTokens(typeof fp === 'string' ? fp : (fp.name || fp.title || '')));
});
[
  // plataformas / tech / marcas audio comunes citadas en headings
  'dolby', 'atmos', 'dorico', 'sibelius', 'finale', 'musescore', 'notion', 'serum', 'vital', 'massive',
  'omnisphere', 'keyscape', 'diva', 'zebra', 'sytrus', 'harmless', 'harmor', 'slicex', 'gross', 'beat',
  'meld', 'roar', 'collision', 'operator', 'wavetable', 'drift', 'linux', 'windows', 'macos', 'ipados',
  'android', 'apple', 'silicon', 'intel', 'thunderbolt', 'bluetooth', 'wifi', 'usb', 'midi', 'xlr', 'trs',
  'rca', 'adat', 'spdif', 'vst', 'vsts', 'vst2', 'vst3', 'aax', 'ara', 'clap', 'rtas', 'ilok', 'pace',
  'elicenser', 'native', 'access', 'waves', 'uad', 'apollo', 'antelope', 'orion', 'audient', 'neumann',
  'akg', 'shure', 'sennheiser', 'rode', 'technica', 'audix', 'electro', 'voice', 'heil', 'lewitt',
  'schoeps', 'dpa', 'sanken', 'zoom', 'tascam', 'fostex', 'marantz', 'cardioid', 'omnidirectional',
  'bidirectional', 'figure', 'polar', 'condenser', 'ribbon', 'tube', 'valve', 'fet', 'phantom',
  'celestion', 'jensen', 'eminence', 'fane', 'peavey', 'ampeg', 'vox', 'orange', 'marshall', 'mesa',
  'boogie', 'engl', 'diezel', 'friedman', 'victory', 'hughes', 'kettner', 'laney', 'blackstar', 'bugera',
  'behringer', 'boss', 'roland', 'korg', 'yamaha', 'casio', 'nord', 'kawai', 'kurzweil', 'dexibell',
  'viscount', 'crumar', 'hammond', 'leslie', 'moog', 'sequential', 'oberheim', 'juno', 'jupiter',
  'pioneer', 'denon', 'numark', 'reloop', 'genelec', 'krk', 'jbl', 'focal', 'pmc', 'dynaudio', 'avantone',
  'auburn', 'hedd', 'barefoot', 'kali', 'tannoy', 'kef', 'hollyland', 'solidcom', 'maschine', 'komplete',
  'kontakt', 'traktor', 'serato', 'rekordbox', 'ddj', 'xone', 'cubase', 'nuendo', 'bitwig', 'reaper',
  'fruity', 'loops', 'juice', 'wrld', 'ableton', 'logic', 'push', 'suite', 'session', 'view', 'warp',
  'max', 'one', 'plus', 'mini', 'ultra', 'signature', 'series', 'edition', 'deluxe', 'custom', 'player',
  'vintage', 'classic', 'modern', 'standard', 'special', 'limited', 'elite', 'dreadnought', 'orchestra',
  'auditorium', 'grand', 'jumbo', 'concert', 'parlor', 'parlour', 'slope', 'shoulder', 'teardrop',
  'telecaster', 'stratocaster', 'precision', 'jazz', 'mustang', 'jaguar', 'jazzmaster', 'les', 'paul',
  'flying', 'explorer', 'firebird', 'thunderbird', 'pro', 'tools', 'ultimate', 'hdx', 'carbon', 'venice',
  'symphony', 'duet', 'quartet', 'ensemble', 'saffire', 'scarlett', 'clarett', 'rednet', 'ultralite',
  'express', 'zen', 'twin', 'duo', 'quad', 'solo', 'rack', 'keylab', 'pigments', 'collection',
  'instruments', 'keys', 'cube', 'blues', 'minilogue', 'prologue', 'opsix', 'modwave', 'wavestate',
  'volca', 'monologue', 'champion', 'rumble', 'bassbreaker', 'hot', 'rod', 'reverb', 'valvetronix',
  'jcm', 'dsl', 'origin', 'code', 'valve', 'sunburst', 'burst', 'natural', 'satin', 'gloss', 'matte',
  'air', 'stage', 'studio', 'stages', 'black', 'white', 'gold', 'silver', 'cream',
  // marcas/modelos/feature-names detectados en la revisión del informe
  'strat', 'tele', 'klon', 'tesla', 'boundary', 'soundgear', 'thump', 'ampro', 'flexmix',
  'smartgain', 'steadyclock', 'unison', 'auto', 'gain', 'clip', 'safe', 'legacy', 'link', 'mac',
  'pitchblack', 'strobostomp', 'polytune', 'smart'
].forEach(w => vocab.add(w));
// palabras genéricas que NO deben protegerse aunque aparezcan en títulos de producto
// (se corrigen por evidencia de minúscula del corpus ES)
const VOCAB_BLOCK = new Set(['plugins', 'plugin']);
VOCAB_BLOCK.forEach(w => vocab.delete(w));

// ---------------- 2) evidencia de minúscula del corpus ES ----------------
const evidence = new Map(); // palabra -> nº de apariciones en minúscula
function addEvidence(s) {
  String(s || '').split(/[^A-Za-zÀ-ÿ]+/).forEach(w => {
    if (!w) return;
    if (w !== w.toLowerCase()) return;          // solo tokens 100% minúscula
    if (!/[a-záéíóúüñ]/.test(w)) return;
    evidence.set(w, (evidence.get(w) || 0) + 1);
  });
}
guides.forEach(g => {
  addEvidence(g.intro_es); addEvidence(g.conclusion_es); addEvidence(g.verdict_es);
  addEvidence(g.metaDesc_es); addEvidence(g.description_es); addEvidence(g.desc_es);
  addEvidence(g.title_es);
  (g.sections || []).forEach(s => { addEvidence(s.content_es); addEvidence(s.text_es); addEvidence(s.verdict_es); });
  (g.faq || []).forEach(f => { addEvidence(f.q_es); addEvidence(f.a_es); });
  (g.verdictProsCons || []).forEach(v => { (v.pros_es || []).forEach(addEvidence); (v.cons_es || []).forEach(addEvidence); });
  if (g.productTable) { addEvidence(g.productTable.title_es); (g.productTable.rows || []).forEach(r => addEvidence(r.label_es)); }
  (g.steps || []).forEach(s => { addEvidence(s.name_es); addEvidence(s.text_es); });
});
prods.forEach(p => { addEvidence(p.desc_es); addEvidence(p.title_es); });

// ---------------- 3) motor ----------------
const F = new Set(['de', 'del', 'la', 'el', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'u', 'e',
  'a', 'en', 'para', 'con', 'sin', 'por', 'que', 'al', 'su', 'tu', 'se', 'te', 'es', 'son', 'ha', 'hay',
  'the', 'and', 'or', 'for', 'to', 'of', 'with', 'in', 'on', 'at', 'an', 'my', 'your', 'vs']);
const SENT_END = new Set(['.', '!', '?']);
const SENT_START = new Set(['¿', '¡']);
const RUN_END = new Set([':', ';']);
const ABBREV = new Set(['vs', 'ee', 'uu', 'st', 'inc', 'ltd', 'co', 'aprox', 'ej', 'pag', 'vol', 'ed', 'dr', 'sr', 'sra', 'etc']);
const PROTECT_PHRASES = ['All Plugins Edition', 'Dreadnoughts Martin', 'Plugin Boutique'];

// ¿cierra oración? — ? y ! siempre; punto salvo abreviaturas e iniciales
function endsSentence(raw) {
  const t = String(raw || '').trim().replace(/["'»”'’)\]»]+$/, '');
  if (/[?!]$/.test(t)) return true;                   // "?" y "!" cierran siempre
  if (/\.$/.test(t)) {
    const m = t.match(/([A-Za-zÀ-ÿ0-9]+)\.$/);
    if (!m) return false;                             // "..." u otro caso raro
    if (m[1].length === 1) return false;              // inicial "A."
    const w = m[1].toLowerCase();
    if (ABBREV.has(w) || F.has(w)) return false;      // "vs.", "etc."
    return true;                                      // "más.", "Empiezas?" vía "?"
  }
  return false;
}

function partKeep(part) {
  if (!part) return false;
  if (part.length === 1) return true;                 // letra suelta (X-Touch, U-Bass, S-Mic)
  if (!/[a-záéíóúüñ]/.test(part)) return true;        // sigla all-caps (NT, RF, EQ)
  if (/\d/.test(part)) return true;                   // dígitos (M104, Katana-50, UAD-2)
  return vocab.has(part.toLowerCase());
}
function compoundParts(core) {
  return core.split(/[-–—/:+.]/)
    .map(p => p.replace(/^[^A-Za-zÀ-ÿ0-9]+|[^A-Za-zÀ-ÿ0-9]+$/g, ''))
    .filter(Boolean);
}
function compoundKeep(core) {
  return compoundParts(core).some(partKeep);          // ANY: Electro-Voice, NT-USB, smart:EQ, W.A.
}
function derivedVocabHit(core) {
  const lw = core.toLowerCase();
  if (vocab.has(lw)) return true;
  if (lw.endsWith('s') && vocab.has(lw.slice(0, -1))) return true;
  if (lw.endsWith('es') && vocab.has(lw.slice(0, -2))) return true;
  return false;
}
function evidenceFor(core) {
  if ((evidence.get(core.toLowerCase()) || 0) >= 2) return true;
  const parts = compoundParts(core).map(p => p.toLowerCase()).filter(p => p.length >= 2);
  if (parts.length > 1 && parts.every(p => (evidence.get(p) || 0) >= 2)) return true; // in-Ear, Lo-Fi
  return false;
}
function keepWord(core) {
  if (core.length === 1) return true;
  if (!/[a-záéíóúüñ]/.test(core)) return true;        // todo mayúsculas (sigla)
  if (compoundKeep(core)) return true;
  return false;                                       // derived se consulta tras la evidencia
}
// palabras españolas genéricas que la evidencia del corpus no cubre pero que NUNCA
// son marca (verificado contra headings renderizados: ningún producto lleva estos tokens)
const FORCE_LOWER = new Set(['creciendo', 'auditivo', 'masteriza', 'track', 'tu']);
function capDecision(core) {
  if (FORCE_LOWER.has(core.toLowerCase())) return 'lower';
  if (keepWord(core)) return 'keep';
  if (/[áéíóúüñ]/.test(core)) return 'lower';         // palabra española acentuada (Cúspide, Élite)
  if (evidenceFor(core)) return 'lower';              // aparece en minúscula en el corpus ES
  if (derivedVocabHit(core)) return 'keep';           // plural de palabra de producto (Plugins*)
  return 'keep';                                      // protegida (nombre propio desconocido)
}

function extractCore(tok) {
  return tok.replace(/^[("'¿¡«“'’\[]+/, '').replace(/[.,;:!?)"'»”'’\]]+$/, '');
}
function classify(tok) {
  const core = extractCore(tok);
  if (!core || !/[A-Za-zÀ-ÿ]/.test(core)) return { kind: 'neutral', core };
  if (!/[A-ZÁÉÍÓÚÑÜ]/.test(core)) return { kind: 'lower', core };
  return { kind: 'cap', core };
}

function fixString(s) {
  if (typeof s !== 'string' || !s || !/[A-ZÁÉÍÓÚÑÜ]/.test(s)) return null;
  // proteger frases de producto conocidas antes de procesar
  const saved = [];
  let s2 = s;
  PROTECT_PHRASES.forEach((ph) => {
    const re = new RegExp(ph.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    s2 = s2.replace(re, () => { saved.push(ph); return 'XPHRASE' + (saved.length - 1) + 'X'; });
  });
  s = s2;
  const parts = s.split(/(<[^>]+>)/);
  // aplanar en unidades: {part, text, isTag}
  const units = [];
  parts.forEach((p, pi) => {
    if (p.startsWith('<')) { units.push({ pi, isTag: true, text: p }); return; }
    p.split(/(\s+)/).forEach(t => { if (t) units.push({ pi, isTag: false, text: t }); });
  });
  // clasificar
  const info = units.map(u => u.isTag ? { kind: 'tag', core: '' } : classify(u.text));
  // bandera de inicial de oración (tokens crudos: "más.", "¿Empiezas?", "(clip-on)?", "vs.")
  let nextInitial = true;
  const initial = info.map((inf, i) => {
    if (inf.kind === 'tag') return false;
    if (inf.kind === 'neutral' || inf.kind === 'lower') {
      const raw = units[i].text.trim();
      if (raw.length === 1 && SENT_START.has(raw)) nextInitial = true;
      else if (endsSentence(raw)) nextInitial = true;
      if (/^[:;]/.test(raw)) nextInitial = false;       // ":" rompe pero no reinicia
      if (inf.kind === 'neutral') return false;
    }
    if (inf.kind !== 'cap') return false;
    const isFirstLetter = nextInitial;
    nextInitial = endsSentence(units[i].text.trim());   // "¿Empiezas?" cierra y reinicia
    return isFirstLetter;
  });
  // construir runs: empiezan en una palabra capitalizada, terminan en minúscula no-función
  // o puntuación de oración/ ':'
  const changesIdx = new Set();
  let i = 0;
  while (i < units.length) {
    if (info[i].kind !== 'cap') { i++; continue; }
    // run comienza en i
    const cwords = [];
    let j = i;
    while (j < units.length) {
      const inf = info[j];
      if (inf.kind === 'cap') { cwords.push(j); j++; continue; }
      if (inf.kind === 'tag') { j++; continue; }
      if (inf.kind === 'neutral') {
        const raw = units[j].text.trim();
        if (raw.length === 1 && (SENT_END.has(raw) || SENT_START.has(raw))) break;
        if (/^[:;]/.test(raw)) break;
        if (endsSentence(raw)) break;               // ".)", "?»", "1.5." etc.
        j++; continue;                              // espacios, números, símbolos, -
      }
      // lower word
      if (F.has(extractCore(units[j].text))) { j++; continue; }
      break;                                        // minúscula no-función -> fin del run
    }
    if (cwords.length >= 1) {
      for (const idx of cwords) {
        if (initial[idx]) continue;
        const core = info[idx].core;
        if (capDecision(core) !== 'lower') continue;
        const u = units[idx];
        const k = u.text.indexOf(core);
        u.text = u.text.slice(0, k) + core.toLowerCase() + u.text.slice(k + core.length);
        changesIdx.add(idx);
      }
    }
    i = j;                                          // continuar tras el run
  }
  if (!changesIdx.size) return null;
  // reensamblar y restaurar frases protegidas
  const bufs = parts.map(() => '');
  units.forEach(u => { bufs[u.pi] += u.text; });
  return bufs.map(b => b.replace(/XPHRASE(\d+)X/g, (_, n) => saved[+n])).join('');
}

// ---------------- 4) campos objetivo ----------------
const changes = [];
function consider(obj, key, id, field) {
  const before = obj[key];
  if (typeof before !== 'string' || !before) return;
  const after = fixString(before);
  if (after !== null) { changes.push({ id, field, before, after }); obj[key] = after; }
}
guides.forEach(g => {
  consider(g, 'title_es', g.id, 'title_es');
  consider(g, 'titleTag_es', g.id, 'titleTag_es');
  consider(g, 'metaDesc_es', g.id, 'metaDesc_es');
  if (g.productTable) consider(g.productTable, 'title_es', g.id, 'productTable.title_es');
  (g.sections || []).forEach((s, si) => {
    consider(s, 'heading_es', g.id, `sections[${si}].heading_es`);
    consider(s, 'h_es', g.id, `sections[${si}].h_es`);
  });
  (g.faq || []).forEach((f, fi) => consider(f, 'q_es', g.id, `faq[${fi}].q_es`));
});

console.log('CAMBIOS: ' + changes.length + ' en ' + new Set(changes.map(c => c.id)).size + ' guías');
fs.writeFileSync(B + 'temp/es_caps_report.txt', changes.map(c =>
  `--- ${c.id} :: ${c.field}\nANTES: ${c.before}\nDESPUÉS: ${c.after}\n`).join('\n'), 'utf8');
console.log('Informe: temp/es_caps_report.txt');

if (APPLY) {
  fs.copyFileSync(guidesPath, 'C:/Users/Daniel/AppData/Local/Temp/opencode/guides.before_caps_fix.json');
  const raw = fs.readFileSync(guidesPath, 'utf8');
  let out = raw, ok = 0, fail = 0, skipped = 0;
  const byBefore = new Map();
  changes.forEach(c => byBefore.set(c.before, (byBefore.get(c.before) || 0) + 1));
  for (const c of changes) {
    const needle = '"' + JSON.stringify(c.before).slice(1, -1) + '"';
    const occurrences = out.split(needle).length - 1;
    const intended = byBefore.get(c.before);
    if (occurrences === 0) { fail++; console.log('FAIL needle no encontrado: ' + c.id + ' :: ' + c.field); continue; }
    if (occurrences !== intended) { skipped++; console.log('SKIP colisión (' + occurrences + ' vs ' + intended + '): ' + c.id + ' :: ' + c.field); continue; }
    out = out.split(needle).join('"' + JSON.stringify(c.after).slice(1, -1) + '"');
    ok++;
  }
  JSON.parse(out); // validación
  fs.writeFileSync(guidesPath, out, 'utf8');
  console.log(`APLICADO: ${ok} reemplazos, ${fail} fallos, ${skipped} colisiones saltadas`);
} else {
  console.log('(modo detect — no se ha escrito nada)');
}
