// AUDIT PROFUNDO v2 — inglés en páginas ES + metáforas AI, con filtros de ruido:
//  - URLs (href/src y strings http) fuera del análisis
//  - banner de cookies (.cookie-lang-en) oculto por JS en páginas ES: excluido
//  - nombres de producto/función legitimos en lista OK
//  - singles de audio solo si hay palabra española vecina (contexto de prosa ES)
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

const METAPHORS = [
  'caballo de batalla', 'caballos de batalla', 'todo terreno', 'todo-terreno',
  'todoterreno', 'todoterrenos', 'grial', 'navaja suiza', 'trabajo pesado',
  'arma secreta', 'dios del muestreo', 'techo de graves', 'gabinete', 'gabinetes',
  'punto dulce', 'estándar de oro', 'estandar de oro', 'game-changer', 'gamechanger'
];

const EN_STRONG = new Set(('the and with for your yours you are is was were has have had this that these those ' +
  'from into over when while because but can will would should could than then there here what which how why ' +
  "our ours we its it don't doesn't didn't won't can't isn't aren't you're you'll you've we're we've they them their " +
  'theirs about after before between through without within both each every more most best better worse worth ' +
  'buying guide guides review reviews use using used need needs want wants get gets make makes made take takes ' +
  'come comes give gives also just only very much many few less least own same other others another such still ' +
  'yet again once since until unless whether either neither nor off out up down if not do does did doing done ' +
  'being been am who whom whose where lets hes shes his her him').split(/\s+/));

const EN_AUDIO = ('recording mixing mastering budget cheap cheaper cheapest headphone headphones wireless ' +
  'microphone microphones guitar guitars bass amp amps cabinet cabinets sound sounds tone tones room rooms ' +
  'house live tracking track tracks standalone features feature gear kit kits case cases studio studios ' +
  'strings string picks pick fret neck body wood spruce mahogany rosewood ebony maple grand upright console ' +
  'consoles mixer mixers preamp preamps compressor compressors reverb delay chorus distortion fuzz tuner ' +
  'tuners sampler samplers sequencer drum drums pad pads keys keyboard keyboards piano synth synths analog ' +
  'digital monitor monitors speaker speakers subwoofer subwoofers driver drivers tweeter woofer output input ' +
  'inputs cable cables stand stands shelf pair').split(/\s+/);
const EN_AUDIO_SET = new Set(EN_AUDIO);

// palabras españolas que delatan contexto de prosa (para singles de audio)
const ES_FN = new Set('el la los las un una unos unas y o de del al para con que es son su tus tu más por en a como pero muy ya lo se le te'.split(' '));

const OK_PHRASES = [
  'max for live', 'the ones', 'mastering the mix', 'ai session players', 'session view',
  'piano roll', 'drum machine designer', 'studio bass', 'studio piano', 'presentation series',
  "builder's edition", 'modern deluxe', 'push 3', 'home studio', 'studio one', 'one more',
  'two notes', 'solid state', 'line 6', 'native instruments', 'universal audio',
  'plugin boutique', 'gear4music', 'music store', 'plugin alliance', 'ableton live',
  'fl studio', 'logic pro', 'studio one', 'session view', 'low price', 'high price',
  // nombres propios / marcas / jerga aceptada (singles incluidos)
  'the beatles', 'the chemical brothers', 'voice of the world', 'cq you',
  'session players', 'plug and play', 'studio piano bass',
  'alchemy retro synth sculpture', 'wavetable operator analog collision'
];

const TOKEN_RE = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ'’]+/g;
function norm(w) { return w.toLowerCase().replace(/[’]/g, "'"); }

function stripUrls(t) {
  return t
    .replace(/(href|src|url)\s*=\s*"[^"]*"/gi, '$1=""')
    .replace(/(href|src|url)\s*=\s*'[^']*'/gi, "$1=''")
    .replace(/https?:\/\/[^\s"\\]+/g, ' URL ')
    .replace(/\/guides\/[a-z0-9\-_]+\.html/gi, ' URL ')
    .replace(/\?u=[^\s"\\]+/gi, ' URL ');
}

function slice(t, start, len) {
  const a = Math.max(0, start - 55);
  const b = Math.min(t.length, start + len + 55);
  return (a > 0 ? '…' : '') + t.slice(a, b).replace(/\s+/g, ' ') + (b < t.length ? '…' : '');
}

function scanText(rawT, src, out) {
  const t = stripUrls(rawT);
  const low = t.toLowerCase();
  for (const m of METAPHORS) {
    let idx = 0;
    const needle = m.toLowerCase();
    while ((idx = low.indexOf(needle, idx)) >= 0) {
      out.push({ kind: 'METAFORA', m, ctx: slice(t, idx, needle.length), src });
      idx += needle.length;
    }
  }
  const toks = [];
  let mm;
  TOKEN_RE.lastIndex = 0;
  while ((mm = TOKEN_RE.exec(t)) !== null) {
    toks.push({ w: mm[0], n: norm(mm[0]), i: mm.index, strong: EN_STRONG.has(norm(mm[0])), audio: EN_AUDIO_SET.has(norm(mm[0])) });
  }
  const flagged = toks.map(x => x.strong ? 1 : 0);
  let i = 0;
  while (i < toks.length) {
    if (flagged[i]) {
      let j = i;
      while (j + 1 < toks.length && flagged[j + 1]) j++;
      const runWords = toks.slice(i, j + 1).map(x => x.w).join(' ');
      const runLow = ' ' + toks.slice(i, j + 1).map(x => x.n).join(' ') + ' ';
      if (!OK_PHRASES.some(p => runLow.includes(' ' + p + ' '))) {
        const len = j - i + 1;
        const ULTRA = new Set(['the', 'and', 'with', 'for', 'your', 'you', 'best', 'worth', 'buying', 'is', 'are', 'was']);
        if (len >= 2 || ULTRA.has(toks[i].n)) {
          out.push({ kind: 'EN', m: runWords, ctx: slice(t, toks[i].i, toks[j].i + toks[j].w.length), src });
        }
      }
      i = j + 1;
    } else i++;
  }
  i = 0;
  while (i < toks.length) {
    if (toks[i].audio && !toks[i].strong) {
      let j = i;
      while (j + 1 < toks.length && toks[j + 1].audio && !toks[j + 1].strong) j++;
      if (j > i) {
        const runWords = toks.slice(i, j + 1).map(x => x.w).join(' ');
        const runLow = ' ' + toks.slice(i, j + 1).map(x => x.n).join(' ') + ' ';
        if (!OK_PHRASES.some(p => runLow.includes(' ' + p + ' '))) {
          out.push({ kind: 'EN-AUDIO', m: runWords, ctx: slice(t, toks[i].i, toks[j].i + toks[j].w.length), src });
        }
      }
      i = j + 1;
    } else i++;
  }
  // singles: strong siempre; audio solo con palabra española en ±4 tokens.
  // Antes de marcar un single, mirar la ventana ±3 tokens: si forma parte de una
  // frase OK multi-palabra ("The Beatles", "Voice of the World", "CQ4You"…), fuera.
  for (let k = 0; k < toks.length; k++) {
    const tk = toks[k];
    const winLow = ' ' + toks.slice(Math.max(0, k - 3), k + 4).map(x => x.n).join(' ') + ' ';
    if (OK_PHRASES.some(p => p.indexOf(' ') >= 0 && winLow.includes(' ' + p + ' '))) continue;
    if (tk.strong) {
      const ULTRA = new Set(['the', 'and', 'with', 'for', 'your', 'you', 'best', 'worth', 'buying', 'is', 'are', 'was']);
      if (ULTRA.has(tk.n)) out.push({ kind: 'EN-1', m: tk.w, ctx: slice(t, tk.i, tk.w.length), src });
    } else if (tk.audio) {
      let esNear = false;
      for (let d = -4; d <= 4 && !esNear; d++) {
        const o = toks[k + d];
        if (o && !o.strong && !o.audio && ES_FN.has(o.n)) esNear = true;
      }
      if (esNear) out.push({ kind: 'EN-AUDIO-1', m: tk.w, ctx: slice(t, tk.i, tk.w.length), src });
    }
  }
}

// ---------- A) JSON ----------
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const rep = [];
function push(sec, id, where, hit) { rep.push({ sec, id, where, ...hit }); }

// quickfacts: claves de QF_ES_MAP — el builder traduce estos valores en render,
// así que un valor EN presente en el mapa NO es fuga (QF-VAL-EN ni SIN-ES).
// Extracción LÍNEA A LÍNEA (cada entrada es una línea "  'key': 'value',");
// un regex global trocearía las claves que contienen " (pulgadas).
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const mapStart = bg.indexOf('var QF_ES_MAP');
const mapEnd = bg.indexOf('};', mapStart);
const qfKeys = new Set();
for (const L of bg.slice(mapStart, mapEnd).split('\n')) {
  const m3 = L.replace(/\r$/, '').match(/^\s*'(.+)':\s*'(.*)',?\s*$/);
  if (m3) qfKeys.add(m3[1]);
}
console.log('QF_ES_MAP claves: ' + qfKeys.size);

const SKIP_KEYS = new Set(['id', 'category', 'category_es', 'image', 'video', 'img', 'href', 'url', 'slug',
  'date', 'dateModified', 'icon', 'rating', 'score', 'sku', 'badgeType', 'type', 'rel']);

function walkEs(node, guideId, where, cb) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { node.forEach((x, i) => walkEs(x, guideId, where + '[' + i + ']', cb)); return; }
  for (const k of Object.keys(node)) {
    const v = node[k];
    if (SKIP_KEYS.has(k)) continue;
    if (typeof v === 'string') {
      if (k.endsWith('_es') || k === 'es') cb(v, where + '.' + k);
    } else if (v && typeof v === 'object') walkEs(v, guideId, where + '.' + k, cb);
  }
}

// pares de render: campos que el builder muestra con fallback EN
const RENDER_KEYS = new Set(['title', 'titleTag', 'description', 'desc', 'intro', 'h', 'heading', 'content',
  'text', 'q', 'a', 'name', 'label', 'badge', 'best', 'verdict', 'val1', 'val2', 'val3', 'val4', 'val5']);
function walkPairs(node, guideId, where, cb) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { node.forEach((x, i) => walkPairs(x, guideId, where + '[' + i + ']', cb)); return; }
  for (const k of Object.keys(node)) {
    const v = node[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      if ('en' in v && !('es' in v) && typeof v.en === 'string' && v.en.length > 3) {
        cb(v.en, where + '.' + k + ' (objeto sin .es)');
      }
      walkPairs(v, guideId, where + '.' + k, cb);
    } else if (typeof v === 'string') {
      if (RENDER_KEYS.has(k) && v.length > 25 && !node[k + '_es'] && /^[\x00-\x7F]*$/.test(v)) {
        cb(v, where + '.' + k + ' (sin ' + k + '_es)');
      }
    } else if (Array.isArray(v)) walkPairs(v, guideId, where + '.' + k, cb);
  }
}

guides.forEach(g => {
  walkEs(g, g.id, 'guides:' + g.id, (t, w) => {
    const hits = []; scanText(t, w, hits);
    hits.forEach(h => push('JSON-ES', g.id, w, h));
  });
  walkPairs(g, g.id, 'guides:' + g.id, (t, w) => {
    if (w.includes('.author.description')) return; // campo muerto: el builder usa su schema propio
    if (qfKeys.has(t)) return;                     // el builder lo traduce vía QF_ES_MAP
    push('JSON-SIN-ES', g.id, w, { kind: 'SIN-ES', m: t.slice(0, 110), ctx: t.slice(0, 110) });
  });
});
products.forEach(p => {
  walkEs(p, p.id, 'products:' + p.id, (t, w) => {
    const hits = []; scanText(t, w, hits);
    hits.forEach(h => push('JSON-ES', p.id, w, h));
  });
  walkPairs(p, p.id, 'products:' + p.id, (t, w) => {
    if (/\.description \(sin/.test(w)) return;     // campo muerto de producto
    if (qfKeys.has(t)) return;
    push('JSON-SIN-ES', p.id, w, { kind: 'SIN-ES', m: t.slice(0, 110), ctx: t.slice(0, 110) });
  });
});

const SCALE_RE_IN = /^\s*([0-9.]+)\s*(?:-|–|to)?\s*([0-9.]+)?\s*in(?:ches)?\s*$/i;
guides.forEach(g => {
  (g.sections || []).forEach((s, si) => {
    const fp = (s.products || []).length ? s.products[0] : null;
    const prod = fp && products.find(p => String(p.id) === String(fp.id || fp));
    if (!prod || !prod.facts) return;
    prod.facts.forEach((f, fi) => {
      const lab = f.label || {};
      if (typeof lab.en === 'string' && !lab.es) push('QF', prod.id || prod.title, g.id + '.s' + si + '.f' + fi, { kind: 'QF-LABEL-SIN-ES', m: lab.en, ctx: lab.en });
      const v = f.value;
      if (typeof v === 'string') {
        if (!qfKeys.has(v) && !SCALE_RE_IN.test(v) && /[A-Za-z]{3,}/.test(v)) {
          push('QF', prod.id || prod.title, g.id + '.s' + si + '.f' + fi, { kind: 'QF-VAL-EN', m: v, ctx: v });
        }
      } else if (v && typeof v === 'object' && !v.es) {
        push('QF', prod.id || prod.title, g.id + '.s' + si + '.f' + fi, { kind: 'QF-VAL-SIN-ES', m: JSON.stringify(v).slice(0, 110), ctx: JSON.stringify(v).slice(0, 110) });
      }
    });
    if (prod.bestFor && prod.bestFor.en && !prod.bestFor.es) push('QF', prod.id || prod.title, g.id + '.s' + si, { kind: 'QF-BESTFOR-SIN-ES', m: prod.bestFor.en, ctx: prod.bestFor.en });
  });
});

// ---------- B) HTML ----------
function cleanHtml(html) {
  const ld = [];
  let h = html.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, (x, c) => { ld.push(c); return ' '; });
  h = h.replace(/<script\b[\s\S]*?<\/script>/gi, ' ');
  h = h.replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
  h = h.replace(/<!--[\s\S]*?-->/g, ' ');
  // banner de cookies: el texto EN lo oculta JS cuando lang=es -> fuera del análisis
  h = h.replace(/<span class="cookie-lang-en">[\s\S]*?<\/span>/g, ' ');
  h = h.replace(/<[^>]+>/g, ' ');
  h = h.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&laquo;/g, '«').replace(/&raquo;/g, '»').replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é').replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&uacute;/g, 'ú').replace(/&ntilde;/g, 'ñ');
  return { text: h, ld };
}
const esPages = fs.readdirSync(B + 'guides').filter(f => f.endsWith('_es.html'));
esPages.forEach(f => {
  const html = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const { text, ld } = cleanHtml(html);
  const hits = []; scanText(text, 'texto', hits);
  hits.forEach(h => push('HTML-ES', f, 'texto visible', h));
  ld.forEach((c, i) => {
    const hits2 = []; scanText(c, 'ld+json[' + i + ']', hits2);
    hits2.forEach(h => push('HTML-JSONLD', f, 'ld+json[' + i + ']', h));
  });
  if (/undefined|NaN/.test(text)) {
    const um = text.match(/.{0,50}(undefined|NaN).{0,50}/);
    push('HTML-ARTIFACT', f, 'texto visible', { kind: 'ARTIFACT', m: um[1], ctx: um[0].replace(/\s+/g, ' ') });
  }
});
{
  const p = B + 'deals_es.html';
  if (fs.existsSync(p)) {
    const html = fs.readFileSync(p, 'utf8');
    const { text, ld } = cleanHtml(html);
    const hits = []; scanText(text, 'texto', hits);
    hits.forEach(h => push('HTML-ES', 'deals_es.html', 'texto visible', h));
    ld.forEach((c, i) => {
      const hits2 = []; scanText(c, 'ld+json[' + i + ']', hits2);
      hits2.forEach(h => push('HTML-JSONLD', 'deals_es.html', 'ld+json[' + i + ']', h));
    });
  }
}

// ---------- resumen ----------
const counts = {};
rep.forEach(r => { counts[r.sec + ':' + r.kind] = (counts[r.sec + ':' + r.kind] || 0) + 1; });
console.log('== TOTALES ==');
Object.keys(counts).sort().forEach(k => console.log('  ' + k + ': ' + counts[k]));
console.log('TOTAL: ' + rep.length);

// singles agrupados por palabra para revisión
const singleWords = {};
rep.filter(r => r.kind === 'EN-1' || r.kind === 'EN-AUDIO-1').forEach(r => {
  const w = r.m.toLowerCase();
  singleWords[w] = (singleWords[w] || 0) + 1;
});
console.log('== SINGLES por palabra ==');
Object.keys(singleWords).sort((a, b) => singleWords[b] - singleWords[a]).forEach(w => console.log('  ' + w + ': ' + singleWords[w]));

const lines = [];
const order = ['METAFORA', 'EN', 'EN-AUDIO', 'EN-1', 'ARTIFACT', 'QF-VAL-EN', 'QF-VAL-SIN-ES', 'QF-LABEL-SIN-ES', 'QF-BESTFOR-SIN-ES', 'SIN-ES'];
for (const kind of order) {
  const rows = rep.filter(r => r.kind === kind);
  if (!rows.length) continue;
  lines.push('\n===== ' + kind + ' (' + rows.length + ') =====');
  rows.forEach(r => lines.push('[' + r.sec + '] ' + r.id + ' :: ' + r.where + '\n   «' + r.m + '»\n   ' + r.ctx));
}
// singles completos al final, agrupados por palabra
for (const kind of ['EN-1', 'EN-AUDIO-1']) {
  const rows = rep.filter(r => r.kind === kind);
  if (!rows.length) continue;
  const byWord = {};
  rows.forEach(r => { (byWord[r.m.toLowerCase()] = byWord[r.m.toLowerCase()] || []).push(r); });
  lines.push('\n===== ' + kind + ' DETALLE (' + rows.length + ') =====');
  Object.keys(byWord).sort((a, b) => byWord[b].length - byWord[a].length).forEach(w => {
    lines.push('--- ' + w + ' (' + byWord[w].length + ') ---');
    byWord[w].slice(0, 60).forEach(r => lines.push('[' + r.sec + '] ' + r.id + ' :: ' + r.where + '\n   ' + r.ctx));
  });
}
fs.writeFileSync(B + 'temp/deep_es_audit_report.txt', lines.join('\n'), 'utf8');
console.log('Informe: temp/deep_es_audit_report.txt');
