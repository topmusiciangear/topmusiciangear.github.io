const fs = require('fs');
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const TARGET = 42, MIN = 38, MAX = 46, HARD_MAX = 54;

function wc(s) { return String(s || '').split(/\s+/).filter(Boolean).length; }

const BAD_END = /^(y|e|o|u|ni|que|con|sin|para|por|de|del|en|a|al|la|el|los|las|un|una|unos|unas|su|sus|and|or|but|with|for|of|in|to|the|a|an|that|which|while|desde|hasta|entre|sobre|como|más|menos|muy|per|clase|class)$/i;

function cleanTail(s) {
  let t = String(s).trim();
  let words = t.split(/\s+/);
  // balance parentheses: drop back to before the last unclosed "("
  while (words.length > 6) {
    const joined = words.join(' ');
    const open = (joined.match(/\(/g) || []).length;
    const close = (joined.match(/\)/g) || []).length;
    if (open <= close) break;
    const idx = joined.lastIndexOf('(');
    if (idx < 0) break;
    words = joined.slice(0, idx).trim().split(/\s+/);
  }
  for (let guard = 0; guard < 30 && words.length > 6; guard++) {
    let last = words[words.length - 1];
    let core = last.replace(/[,;:.\u2014-]+$/, '');
    if (!core) { words.pop(); continue; }
    if (BAD_END.test(core)) { words.pop(); continue; }
    words[words.length - 1] = core;
    break;
  }
  t = words.join(' ').replace(/[\s,;:\u2014-]+$/, '');
  if (!/[.!?]["')\]]?$/.test(t)) t += '.';
  return t;
}

function splitClauses(sentence) {
  return String(sentence).trim()
    .split(/(?<=[,;:])\s+|\s+(?=\u2014\s)|\s+(?=(?:and|but|while|yet|so|porque|pero|mientras|aunque)\s)/i)
    .filter(Boolean);
}

function packClauses(sentence, budget) {
  const parts = splitClauses(sentence);
  let out = '';
  let n = 0;
  for (const p of parts) {
    const w = wc(p);
    if (out && n + w > budget) break;
    if (!out && w > budget) {
      out = p.split(/\s+/).slice(0, budget).join(' ');
      n = budget;
      break;
    }
    out += (out ? ' ' : '') + p;
    n += w;
  }
  if (!out) return '';
  return cleanTail(out);
}

function cardDesc(text) {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (!t) return t;
  if (wc(t) <= MAX) return t;
  const sentences = t.split(/(?<=[.!?])\s+(?=[A-Z\u00C0-\u00DE\u00BF\u00A1"'0-9(])/).filter(Boolean);
  let out = '';
  let n = 0;
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    const w = wc(s);
    if (n + w <= MAX) {
      out += (out ? ' ' : '') + s;
      n += w;
      if (n >= MIN) break;
      continue;
    }
    if (n < MIN && n + w <= HARD_MAX) {
      out += (out ? ' ' : '') + s;
      n += w;
      break;
    }
    if (n < HARD_MAX) {
      const c = packClauses(s, MAX - n);
      if (c && wc(c) >= 8) {
        out += (out ? ' ' : '') + c;
        n += wc(c);
      }
    }
    if (!out) out = packClauses(s, MAX);
    break;
  }
  if (!out) out = t;
  out = out.trim().replace(/[\s,;:\u2014-]+$/, '');
  if (!/[.!?]["')\]]?$/.test(out)) out += '.';
  return out;
}

for (const id of [256, 456, 577, 332, 1052, 561, 508]) {
  const p = d.find(x => x.id === id);
  for (const f of ['desc', 'desc_es']) {
    const t = p[f] || '';
    if (!t) continue;
    const c = cardDesc(t);
    console.log('===', id, f, wc(t), '->', wc(c));
    console.log(c);
  }
}

const buckets = { '<15': 0, '15-24': 0, '25-31': 0, '32-37': 0, '38-46': 0, '47-54': 0, '55+': 0 };
const worst = [];
for (const p of d) {
  for (const f of ['desc', 'desc_es']) {
    const t = p[f] || '';
    if (!t) continue;
    const c = cardDesc(t);
    const w = wc(c);
    const k = w < 15 ? '<15' : w < 25 ? '15-24' : w < 32 ? '25-31' : w < 38 ? '32-37' : w <= 46 ? '38-46' : w <= 54 ? '47-54' : '55+';
    buckets[k]++;
    if (w < 32 || w > 54) worst.push([w, p.id, f, p.title, c.slice(-50)]);
  }
}
console.log('\nBUCKETS', buckets);
worst.sort((a, b) => a[0] - b[0]);
console.log('outliers', worst.length);
for (const r of worst.slice(0, 12)) console.log(r[0], r[1], r[2], r[3], '|', r[4]);
console.log('...long tail...');
for (const r of worst.slice(-6)) console.log(r[0], r[1], r[2], r[3], '|', r[4]);
