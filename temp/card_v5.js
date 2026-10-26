const fs = require('fs');
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const TARGET = 42, MIN = 38, MAX = 46, HARD_MAX = 54, FIRST_MAX = 60;

function wc(s) { return String(s || '').split(/\s+/).filter(Boolean).length; }

const BAD_END = /^(y|e|o|u|ni|que|con|sin|para|por|de|del|en|a|al|la|el|los|las|un|una|unos|unas|su|sus|and|or|but|with|for|of|in|to|the|a|an|that|which|while|desde|hasta|entre|sobre|como|más|menos|muy|per|clase|class)$/i;

function cleanTail(s) {
  let words = String(s).trim().split(/\s+/);
  for (let guard = 0; guard < 20 && words.length > 6; guard++) {
    const joined = words.join(' ');
    if ((joined.match(/\(/g) || []).length <= (joined.match(/\)/g) || []).length) break;
    const idx = joined.lastIndexOf('(');
    if (idx < 0) break;
    words = joined.slice(0, idx).trim().split(/\s+/);
  }
  for (let guard = 0; guard < 30 && words.length > 6; guard++) {
    const last = words[words.length - 1];
    const core = last.replace(/[,;:.\u2014-]+$/, '');
    if (!core || BAD_END.test(core) || /^[(\[]$/.test(core)) { words.pop(); continue; }
    words[words.length - 1] = core;
    break;
  }
  let t = words.join(' ').replace(/[\s,;:\u2014-]+$/, '');
  if (!/[.!?]["')\]]?$/.test(t)) t += '.';
  return t;
}

function clauseCuts(sentence) {
  const s = String(sentence);
  const cuts = [];
  const re = /[:;]\s+|\s+\u2014\s+|\s+(?=(?:and|but|while|yet|so|plus|porque|pero|mientras|aunque|y|o|ni)\s)|,\s+/gi;
  let m;
  while ((m = re.exec(s))) {
    const txt = m[0];
    const strength = /^[:;]/.test(txt) ? 3 : (/\u2014/.test(txt) || /^[a-z]/i.test(txt)) ? 2 : 1;
    cuts.push({ idx: m.index, strength });
  }
  return cuts;
}

// Cuts the sentence at the strongest boundary that fits the budget; only
// boundaries at or above minStrength are considered. Returns '' when the
// resulting text would be shorter than minWords.
function packSentence(sentence, budget, minWords, minStrength) {
  const cuts = clauseCuts(sentence).filter(c =>
    c.strength >= minStrength && wc(sentence.slice(0, c.idx)) <= budget);
  if (!cuts.length) return '';
  const best = cuts.reduce((a, b) =>
    (b.strength > a.strength || (b.strength === a.strength && b.idx > a.idx)) ? b : a);
  const text = cleanTail(sentence.slice(0, best.idx));
  if (wc(text) < minWords) return '';
  return text;
}

const stats = { whole: 0, fit: 0, strong: 0, wholeOver: 0, late: 0, short: 0, hardCut: 0 };
const shorts = [], longs = [], weak = [];

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
      let p = packSentence(s, MAX, 16, 3);
      if (p) stats.strong++;
      if (!p) { p = packSentence(s, MAX, 16, 1); if (p) weak.push([t.slice(0, 40), p]); }
      if (p) { out = p; }
      else { out = cleanTail(s.split(/\s+/).slice(0, MAX).join(' ')); stats.hardCut++; }
      n = wc(out);
      break;
    }
    if (n >= MIN) break;
    if (n + w <= MAX) { out += ' ' + s; n += w; stats.fit++; if (n >= MIN) break; continue; }
    // Sentence does not fit: try a strong cut first so the card stays near 46.
    let p = packSentence(s, MAX - n, MIN - n, 3);
    if (p) { out += ' ' + p; n += wc(p); stats.strong++; break; }
    if (n + w <= HARD_MAX) { out += ' ' + s; n += w; stats.wholeOver++; break; }
    // Too long even whole: cut at the latest boundary inside the hard max.
    p = packSentence(s, HARD_MAX - n, MIN - n, 3);
    if (!p) { p = packSentence(s, HARD_MAX - n, MIN - n, 1); if (p) { weak.push([t.slice(0, 40), p]); stats.late++; } }
    if (p) { out += ' ' + p; n = wc(out); }
    break;
  }
  out = cleanTail(out.trim());
  return out;
}

const buckets = { '<38': 0, '38-46': 0, '47-54': 0, '55-60': 0 };
for (const p of d) {
  for (const f of ['desc', 'desc_es']) {
    const t = p[f] || '';
    if (!t) continue;
    const c = cardDesc(t);
    const w = wc(c);
    if (w < 38) { buckets['<38']++; shorts.push([w, p.id, f, p.title, c]); }
    else if (w <= 46) buckets['38-46']++;
    else if (w <= 54) buckets['47-54']++;
    else { buckets['55-60']++; longs.push([w, p.id, f, p.title, c]); }
  }
}
console.log(stats);
console.log(buckets);
console.log('weak cuts', weak.length);
shorts.sort((a, b) => a[0] - b[0]);
for (const r of shorts.slice(0, 12)) console.log('SHORT', r[0], r[1], r[2], '|', r[4]);
fs.writeFileSync('temp/v5_shorts.json', JSON.stringify(shorts, null, 1));
fs.writeFileSync('temp/v5_longs.json', JSON.stringify(longs, null, 1));
fs.writeFileSync('temp/v5_weak.json', JSON.stringify(weak, null, 1));
