const fs = require('fs');
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const TARGET = 42, MIN = 38, MAX = 46, HARD_MAX = 54, LAST_RESORT = 60;

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
  let depth = 0;
  const re = /[()]|[:;]\s+|\s+\u2014\s+|,\s+|\s+(?=(?:and|but|while|yet|so|plus|porque|pero|mientras|aunque|y|e|o|ni)\s)/gi;
  let m;
  while ((m = re.exec(s))) {
    const txt = m[0];
    if (txt === '(') { depth++; continue; }
    if (txt === ')') { depth = Math.max(0, depth - 1); continue; }
    if (depth !== 0) continue;
    let strength;
    if (/^[:;]/.test(txt)) strength = 3;
    else if (/^,\s+$/.test(txt)) strength = 1;
    else strength = 2;
    cuts.push({ idx: m.index, strength });
  }
  return cuts;
}

function packSentence(sentence, budget, minWords, minStrength) {
  const cuts = clauseCuts(sentence).filter(c =>
    c.strength >= minStrength && wc(sentence.slice(0, c.idx)) <= budget);
  if (!cuts.length) return '';
  const best = cuts.reduce((a, b) => (b.idx > a.idx ? b : a));
  const text = cleanTail(sentence.slice(0, best.idx));
  if (wc(text) < minWords) return '';
  return text;
}

const stats = { whole: 0, fit: 0, cut: 0, wholeOver: 0, lastResort: 0, short: 0 };
const shorts = [], mid = [], longs = [];

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
      if (w <= LAST_RESORT) { out = s; n = w; if (n >= MIN) break; continue; }
      const p = packSentence(s, MAX, 16, 1);
      out = p || cleanTail(s.split(/\s+/).slice(0, MAX).join(' '));
      n = wc(out);
      break;
    }
    if (n >= MIN) break;
    if (n + w <= MAX) { out += ' ' + s; n += w; stats.fit++; continue; }
    let p = packSentence(s, MAX - n, MIN - n, 2) || packSentence(s, MAX - n, MIN - n, 1);
    if (p) { out += ' ' + p; n = wc(out); stats.cut++; break; }
    if (n + w <= HARD_MAX) { out += ' ' + s; n = wc(out); stats.wholeOver++; break; }
    p = packSentence(s, HARD_MAX - n, MIN - n, 1);
    if (p) { out += ' ' + p; n = wc(out); stats.cut++; break; }
    if (n + w <= LAST_RESORT) { out += ' ' + s; n = wc(out); stats.lastResort++; break; }
    stats.short++;
    break;
  }
  return cleanTail(out.trim());
}

const buckets = { '<38': 0, '38-46': 0, '47-54': 0, '55-60': 0 };
const all = [];
for (const p of d) {
  for (const f of ['desc', 'desc_es']) {
    const t = p[f] || '';
    if (!t) continue;
    const c = cardDesc(t);
    const w = wc(c);
    all.push([w, p.id, f, p.title, c]);
    if (w < 38) { buckets['<38']++; shorts.push([w, p.id, f, p.title, c]); }
    else if (w <= 46) buckets['38-46']++;
    else if (w <= 54) { buckets['47-54']++; mid.push([w, p.id, f, p.title, c]); }
    else { buckets['55-60']++; longs.push([w, p.id, f, p.title, c]); }
  }
}
console.log(stats);
console.log(buckets);

// quality checks
const issues = [];
const basics = /^[A-Z\u00C0-\u00DE\u00BF\u00A10-9"'(]/;
for (const [w, pid, f, title, c] of all) {
  if (!/[.!?]["')\]]?$/.test(c)) issues.push(['end', pid, f, c.slice(-30)]);
  if ((c.match(/\(/g) || []).length !== (c.match(/\)/g) || []).length) issues.push(['paren', pid, f, c.slice(-40)]);
  if (/\s[,.;:]/.test(c)) issues.push(['space-punct', pid, f, c.slice(-40)]);
  if (/\.\.\.|\u2026/.test(c)) issues.push(['ellipsis', pid, f, c.slice(-40)]);
  if (/\ufffd/.test(c)) issues.push(['mojibake', pid, f, c.slice(-40)]);
  const last = c.replace(/[.!?]["')\]]?$/, '').split(/\s+/).pop();
  if (last && last.length === 1 && !/[0-9a-zA-Z]/.test(last)) issues.push(['last', pid, f, c.slice(-30)]);
}
console.log('issues', issues.length);
for (const x of issues.slice(0, 10)) console.log(' ', x);

shorts.sort((a, b) => a[0] - b[0]);
for (const r of shorts.slice(0, 6)) console.log('SHORT', r[0], r[1], r[2], '|', r[4]);

// sample cut cards
console.log('--- cut samples ---');
let ncut = 0;
for (const [w, pid, f, title, c] of all) {
  if (ncut >= 8) break;
  const src = d.find(x => x.id === pid)[f];
  if (c && !src.startsWith(c.replace(/[.]$/, ''))) {
    console.log(w, pid, f, '|', c);
    ncut++;
  }
}
console.log('--- long ---');
for (const [w, pid, f, title, c] of longs.slice(0, 8)) console.log(w, pid, f, '|', c);
fs.writeFileSync('temp/v8_all.json', JSON.stringify(all, null, 1));
