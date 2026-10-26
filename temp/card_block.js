// Card text: every card should read like the Yamaha P-225 one (~42 words).
// Leading sentences are kept whole while they fit; when the next sentence is
// clearly too long, the card ends on a clause boundary (":", ";", " — ",
// conjunction or comma) so it never chops a word or a number in half. The full
// text stays untouched in data/products.json.
const CARD_WORDS_TARGET = 42;      // same length as the Yamaha P-225 card
const CARD_WORDS_MIN = 38;         // good enough, stop adding sentences
const CARD_WORDS_MAX = 46;         // 2-3 words over the target is fine, more is not
const CARD_WORDS_HARD_MAX = 54;    // finish a whole sentence before cutting it
const CARD_WORDS_LAST_RESORT = 60; // better a long complete sentence than a stub

// Words that must never be the last thing on a card (dangling connectors).
const CARD_STOP_WORDS = /^(y|e|o|u|ni|que|con|sin|para|por|de|del|en|a|al|la|el|los|las|un|una|unos|unas|su|sus|and|or|but|with|for|of|in|to|the|a|an|that|which|while|desde|hasta|entre|sobre|como|más|menos|muy|per|clase|class)$/i;

function cardWords(s) {
  return String(s || '').split(/\s+/).filter(Boolean).length;
}

// Removes a dangling parenthesis group, connector or separator at the end and
// makes sure the text finishes with real punctuation.
function cardCleanEnd(s) {
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
    if (!core || CARD_STOP_WORDS.test(core) || /^[(\[]$/.test(core)) { words.pop(); continue; }
    words[words.length - 1] = core;
    break;
  }
  let t = words.join(' ').replace(/[\s,;:\u2014-]+$/, '');
  if (!/[.!?]["')\]]?$/.test(t)) t += '.';
  return t;
}

// Boundaries inside one sentence, with priority: 3 = colon/semicolon,
// 2 = em dash or coordinating conjunction, 1 = comma. Parentheses are skipped
// so a cut never leaves an open group behind.
function cardClauseCuts(sentence) {
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
    cuts.push({ idx: m.index, strength: strength });
  }
  return cuts;
}

// Cuts a sentence at the latest boundary that fits the word budget, so the card
// gets as close to the target as possible. minStrength 3 only uses colon and
// semicolon cuts, 1 allows any boundary.
function cardClauseCut(sentence, budget, minWords, minStrength) {
  const cuts = cardClauseCuts(sentence).filter(function (c) {
    return c.strength >= minStrength && cardWords(sentence.slice(0, c.idx)) <= budget;
  });
  if (!cuts.length) return '';
  const best = cuts.reduce(function (a, b) { return b.idx > a.idx ? b : a; });
  const text = cardCleanEnd(sentence.slice(0, best.idx));
  if (cardWords(text) < minWords) return '';
  return text;
}

function cardDesc(text) {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (!t) return t;
  if (cardWords(t) <= CARD_WORDS_MAX) return t;
  const sentences = t.split(/(?<=[.!?])\s+(?=[A-Z\u00C0-\u00DE\u00BF\u00A1"'0-9(])/).filter(Boolean);
  let out = '';
  let n = 0;
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    const w = cardWords(s);
    if (n === 0) {
      if (w <= CARD_WORDS_LAST_RESORT) { out = s; n = w; if (n >= CARD_WORDS_MIN) break; continue; }
      const p = cardClauseCut(s, CARD_WORDS_MAX, 16, 1);
      out = p || cardCleanEnd(s.split(/\s+/).slice(0, CARD_WORDS_MAX).join(' '));
      n = cardWords(out);
      break;
    }
    if (n >= CARD_WORDS_MIN) break;
    if (n + w <= CARD_WORDS_MAX) { out += ' ' + s; n += w; continue; }
    let p = cardClauseCut(s, CARD_WORDS_MAX - n, CARD_WORDS_MIN - n, 2) ||
      cardClauseCut(s, CARD_WORDS_MAX - n, CARD_WORDS_MIN - n, 1);
    if (p) { out += ' ' + p; break; }
    if (n + w <= CARD_WORDS_HARD_MAX) { out += ' ' + s; break; }
    p = cardClauseCut(s, CARD_WORDS_HARD_MAX - n, CARD_WORDS_MIN - n, 1);
    if (p) { out += ' ' + p; break; }
    if (n + w <= CARD_WORDS_LAST_RESORT) { out += ' ' + s; break; }
    break;
  }
  return cardCleanEnd(out.trim());
}
