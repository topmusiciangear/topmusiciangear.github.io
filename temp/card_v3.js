const fs = require('fs');
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const TARGET = 42, MIN = 38, MAX = 46, HARD_MAX = 54, FIRST_MAX = 60;

function wc(s) { return String(s || '').split(/\s+/).filter(Boolean).length; }

const BAD_END = /^(y|e|o|u|ni|que|con|sin|para|por|de|del|en|a|al|la|el|los|las|un|una|unos|unas|su|sus|and|or|but|with|for|of|in|to|the|a|an|that|which|while|desde|hasta|entre|sobre|como|más|menos|muy|per|clase|class)$/i;

function cleanTail(s) {
  let t = String(s).trim();
  let words = t.split(/\s+/);
  // drop an unclosed parenthetical group at the end
  for (let guard = 0; guard < 20 && words.length > 6; guard++) {
    const joined = words.join(' ');
    if ((joined.match(/\(/g) || []).length <= (joined.match(/\)/g) || []).length) break;
    const idx = joined.lastIndexOf('(');
    if (idx < 0) break;
    words = joined.slice(0, idx).trim().split(/\s+/);
  }
  // never end on a connector or an opening punctuation mark
  for (let guard = 0; guard < 30 && words.length > 6; guard++) {
    let last = words[words.length - 1];
    let core = last.replace(/[,;:.\u2014-]+$/, '');
    if (!core || BAD_END.test(core) || /^[(\[]$/.test(core)) { words.pop(); continue; }
    words[words.length - 1] = core;
    break;
  }
  t = words.join(' ').replace(/[\s,;:\u2014-]+$/, '');
  if (!/[.!?]["')\]]?$/.test(t)) t += '.';
  return t;
}

// Cut points inside one sentence, strongest first: 3 = colon/semicolon,
// 2 = em dash or coordinating conjunction, 1 = plain comma.
function clauseCuts(sentence) {
  const s = String(sentence);
  const cuts = [];
  const push = (idx, strength) => { if (idx > 0 && idx < s.length) cuts.push({ idx, strength }); };
  let m;
  const re = /[:;]\s+|\s+\u2014\s+|\s+(?=(?:and|but|while|yet|so|plus|porque|pero|mientras|aunque|aunque|y|o|ni)\s)|,\s+/gi;
  while ((m = re.exec(s))) {
    const txt = m[0];
    const strength = /^[:;]/.test(txt) ? 3 : /\u2014/.test(txt) || /^[a-z]/i.test(txt) ? 2 : 1;
    push(m.index, strength);
  }
  return cuts;
}

function packSentence(sentence, budget, minWords) {
  const cuts = clauseCuts(sentence).filter(c => wc(sentence.slice(0, c.idx)) <= budget);
  if (!cuts.length) return '';
  // prefer stronger punctuation; among equals, take the longest that still fits
  const best = cuts.reduce((a, b) => (b.strength > a.strength || (b.strength === a.strength && b.idx > a.idx)) ? b : a);
  const text = cleanTail(sentence.slice(0, best.idx));
  if (wc(text) < minWords) return '';
  return text;
}

let stats = { whole: 0, accum: 0, packed: 0, firstLong: 0, fallback: 0 };
const weak = [], shortOut = [], longOut = [];

function cardDesc(text) {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (!t) return t;
  if (wc(t) <= MAX) { stats.whole++; return t; }
  const sentences = t.split(/(?<=[.!?])\s+(?=[A-Z\u00C0-\u00DE\u00BF\u00A1"'0-9(])/).filter(Boolean);
  let out = '', n = 0;
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    const w = wc(s);
    if (n === 0) {
      if (w <= FIRST_MAX) { out = s; n = w; if (n >= MIN) break; continue; }
      const p = packSentence(s, MAX, 16);
      out = p || cleanTail(s.split(/\s+/).slice(0, MAX).join(' '));
      n = wc(out);
      break;
    }
    if (n >= MIN) break;
    if (n + w <= MAX) { out += ' ' + s; n += w; if (n >= MIN) break; continue; }
    if (n + w <= HARD_MAX) { out += ' ' + s; n += w; break; }
    const p = packSentence(s, MAX - n, 8);
    if (p) { out += ' ' + p; n += wc(p); }
    break;
  }
  out = cleanTail(out.trim());
  return out;
}

for (const p of d) {
  for (const f of ['desc', 'desc_es']) {
    const t = p[f] || '';
    if (!t) continue;
    const c = cardDesc(t);
    const w = wc(c);
    if (w < 38) shortOut.push([w, p.id, f, p.title, c]);
    if (w > 54) longOut.push([w, p.id, f, p.title, c]);
  }
}
console.log(stats);
console.log('short', shortOut.length, 'long', longOut.length);
shortOut.sort((a, b) => a[0] - b[0]);
for (const r of shortOut.slice(0, 12)) console.log('SHORT', r[0], r[1], r[2], '|', r[4]);
console.log('--- long ---');
for (const r of longOut.slice(0, 12)) console.log('LONG', r[0], r[1], r[2], '|', r[4]);
fs.writeFileSync('temp/v3_short.json', JSON.stringify(shortOut, null, 1));
fs.writeFileSync('temp/v3_long.json', JSON.stringify(longOut, null, 1));
