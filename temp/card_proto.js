const fs = require('fs');
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const TARGET = 42, MIN = 38, MAX = 46;

function wc(s) { return String(s || '').split(/\s+/).filter(Boolean).length; }

function trimTail(s) {
  let t = String(s).trim();
  const bad = /(?:^|\s)(y|e|o|u|ni|que|con|sin|para|por|de|del|en|a|al|la|el|los|las|un|una|unos|unas|su|sus|and|or|but|with|for|of|in|to|the|a|an|that|which|while|desde|hasta|entre|sobre|como|más|menos|muy)$/i;
  let words = t.split(/\s+/);
  let guard = 0;
  while (words.length > 6 && (bad.test(words.slice(-1)[0]) || /[,;:\u2014-]$/.test(words.slice(-1)[0])) && guard++ < 20) {
    words.pop();
    // if last word now ends with a comma etc., drop the marker
    words[words.length - 1] = words[words.length - 1].replace(/[,;:\u2014-]+$/, '');
  }
  t = words.join(' ').replace(/[\s,;:\u2014-]+$/, '');
  if (!/[.!?]["')\]]?$/.test(t)) t += '.';
  return t;
}

function splitClauses(sentence) {
  // keep delimiters with the part they close; split before conjunctions too
  let s = String(sentence).trim();
  const parts = s.split(/(?<=[,;:])\s+|\s+(?=\u2014\s)|\s+(?=(?:and|but|while|yet|so|porque|pero|mientras|aunque)\s)/i);
  return parts.filter(Boolean);
}

function packClauses(sentence, budget) {
  const parts = splitClauses(sentence);
  let out = '';
  let n = 0;
  for (const p of parts) {
    const w = wc(p);
    if (out && n + w > budget) break;
    if (!out && w > budget) {
      // first clause itself too long: hard trim to budget words
      out = p.split(/\s+/).slice(0, budget).join(' ');
      n = budget;
      break;
    }
    out += (out ? ' ' : '') + p;
    n += w;
  }
  out = out.trim();
  if (!out) return '';
  return trimTail(out);
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
    if (out && n >= MIN) break;
    if (n + w <= MAX) {
      out += (out ? ' ' : '') + s;
      n += w;
      continue;
    }
    const room = MAX - n;
    if (room >= 8) {
      const c = packClauses(s, room);
      if (c && wc(c) >= 8) {
        out += (out ? ' ' : '') + c;
        n += wc(c);
      }
    }
    break;
  }
  if (!out) out = t;
  out = out.trim().replace(/[\s,;:\u2014-]+$/, '');
  if (!/[.!?]["')\]]?$/.test(out)) out += '.';
  return out;
}

// samples
for (const id of [256, 456, 577, 332, 1052, 561, 577]) {
  const p = d.find(x => x.id === id);
  for (const f of ['desc', 'desc_es']) {
    const t = p[f] || '';
    if (!t) continue;
    const c = cardDesc(t);
    console.log('===', id, f, wc(t), '->', wc(c));
    console.log(c);
  }
}

// distribution
const buckets = { '<15': 0, '15-24': 0, '25-31': 0, '32-37': 0, '38-46': 0, '47+': 0 };
const worst = [];
for (const p of d) {
  for (const f of ['desc', 'desc_es']) {
    const t = p[f] || '';
    if (!t) continue;
    const c = cardDesc(t);
    const w = wc(c);
    const k = w < 15 ? '<15' : w < 25 ? '15-24' : w < 32 ? '25-31' : w < 38 ? '32-37' : w <= 46 ? '38-46' : '47+';
    buckets[k]++;
    if (w < 32) worst.push([w, p.id, f, p.title, c.slice(-45)]);
  }
}
console.log('\nBUCKETS', buckets);
worst.sort((a, b) => a[0] - b[0]);
console.log('worst', worst.length);
for (const r of worst.slice(0, 15)) console.log(r[0], r[1], r[2], r[3], '|', r[4]);
