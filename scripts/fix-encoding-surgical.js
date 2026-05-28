const fs = require('fs');
const path = require('path');
const FFFD = '\uFFFD';

const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'guides.json'), 'utf8').replace(/^\uFEFF/, ''));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8').replace(/^\uFEFF/, ''));

// --- Build context map from clean data ---
const ctxMap = new Map();
const TEXT = /^[a-zA-Z0-9áéíóúñüÁÉÍÓÚÑÜªº¿¡°½\s]+$/u;
const ACCENTED = /[áéíóúñüÁÉÍÓÚÑÜ¿¡ªº°½\u2013\u2014]/u;

function indexClean(clean) {
  if (!clean || typeof clean !== 'string') return;
  for (let pos = 0; pos < clean.length; pos++) {
    const ch = clean[pos];
    if (!ACCENTED.test(ch)) continue;
    let j = pos - 1;
    while (j >= 0 && TEXT.test(clean[j])) j--;
    const before = clean.substring(j + 1, pos);
    let k = pos + 1;
    while (k < clean.length && TEXT.test(clean[k])) k++;
    const after = clean.substring(pos + 1, k);
    for (let b = Math.min(before.length, 30); b >= 0; b -= 1) {
    for (let a = Math.min(after.length, 10); a >= 0; a -= 1) {
      const key = before.substring(before.length - b) + '|' + after.substring(0, a);
      if (!ctxMap.has(key)) ctxMap.set(key, ch);
    }
    }
  }
}

for (const g of guides) {
  [g.title, g.title_es, g.intro, g.intro_es, g.verdict, g.verdict_es,
   g.conclusion, g.conclusion_es, g.description].forEach(t => indexClean(t));
  if (g.sections) for (const s of g.sections) {
    [s.heading, s.heading_es, s.content, s.content_es].forEach(t => indexClean(t));
  }
}
for (const p of products) {
  [p.title, p.title_es, p.desc, p.desc_es].forEach(t => indexClean(t));
}

console.log(`Map: ${ctxMap.size} keys`);

function trimBefore(s) {
  let i = s.length - 1;
  while (i >= 0 && TEXT.test(s[i])) i--;
  return s.substring(i + 1);
}
function trimAfter(s) {
  let i = 0;
  while (i < s.length && TEXT.test(s[i])) i++;
  return s.substring(0, i);
}

// Word-context fixes for template/hardcoded strings
const wordFixes = {
  'M|': '\u00ED', 'M|s': '\u00E1', 'M|sica': '\u00FA',
  'Gu|as': '\u00ED', 'Sobre M|': '\u00ED', 'Espa|ol': '\u00F1',
  'Pol|tica': '\u00ED', 'T|rminos': '\u00E9',
  'Cont|ctanos': '\u00E1', 'Categor|as': '\u00ED',
  'Conclusi|n': '\u00F3', 'Configuraci|n': '\u00F3',
  'Divulgaci|n': '\u00F3', 'Comparativ|as': '\u00ED',
  'C|mo': '\u00F3', 'C|mo ': '\u00F3',
  'Cu|l': '\u00E1', 'Cu|les': '\u00E1',
  'Cu|ntas': '\u00E1', 'Cu|nto': '\u00E1',
  'qu|': '\u00E9', 'Qu|': '\u00E9',
  'opci|n': '\u00F3', 'a|slan': '\u00ED',
  'precauci|n': '\u00F3', 'g|neros': '\u00E9',
  'tri|ngulo': '\u00E1', 'equil|tero': '\u00E1',
  'Est|ndar': '\u00E1', 'Car|cter': '\u00E1',
  'Deber|as': '\u00ED', 'A|ade': '\u00F1',
  'Ac|stica': '\u00FA', 'El|ctrica': '\u00E9',
  'S|calos': '\u00E1', 'Olv|date': '\u00ED',
  'est|': '\u00E1', 'ah|': '\u00ED',
  'har|': '\u00E1', 'ser|': '\u00E1', 'estar|': '\u00E1',
  'decepcionar|': '\u00E1', 'servir|': '\u00E1',
  'dise|': '\u00F1', 'rgan|': '\u00F3', 'rgano|': '\u00F3',
};

// Question starters for ¿ detection
const questionStarters = ['Cu', 'Necesito', 'Es', 'Qu', 'Valen', 'Puedo',
  'De', 'C', 'Son', 'No', 'La', 'Necesitas', 'Ultra', 'Presupuesto', 'Auriculares'];

// --- Fix ---
let fixed = 0, total = 0;

for (const guide of guides) {
  for (const suffix of ['', '_es']) {
    const filePath = path.join(__dirname, '..', 'guides', `${guide.id}${suffix}.html`);
    if (!fs.existsSync(filePath)) continue;
    total++;

    let html = fs.readFileSync(filePath, 'utf8');
    if (!html.includes(FFFD)) continue;
    let chars = [...html];
    let fileFixed = false;

    for (let pos = 0; pos < chars.length; pos++) {
      if (chars[pos] !== FFFD) continue;
      let found = false;

      // P1: Context match against clean data
      for (let w = 30; w >= 6; w -= 4) {
        const rawB = chars.slice(Math.max(0, pos - w), pos).join('');
        const rawA = chars.slice(pos + 1, Math.min(chars.length, pos + 1 + 10)).join('');
        const b = trimBefore(rawB);
        const a = trimAfter(rawA);
        if (b.length === 0) continue;
        for (let bl = Math.min(b.length, 30); bl >= 2; bl -= 1) {
          const bp = b.substring(b.length - bl);
          for (let al = Math.min(a.length, 10); al >= 0; al -= 1) {
            if (ctxMap.has(bp + '|' + a.substring(0, al))) {
              chars[pos] = ctxMap.get(bp + '|' + a.substring(0, al));
              found = true; fileFixed = true; break;
            }
          }
          if (found) break;
        }
        if (found) break;
      }
      if (found) continue;

      // P2: Word-context fixes
      let wB = '', wA = '';
      let j = pos - 1;
      while (j >= 0 && TEXT.test(chars[j])) { wB = chars[j] + wB; j--; }
      let k = pos + 1;
      while (k < chars.length && TEXT.test(chars[k])) { wA += chars[k]; k++; }
      const nB = wB.replace(/[¿¡]/g, '');
      const nA = wA.replace(/\s+/g, ' ');

      for (let bLen = Math.min(nB.length, 10); bLen >= 0; bLen--) {
        for (let aLen = Math.min(nA.length, 10); aLen >= 0; aLen--) {
          if (bLen === 0 && aLen === 0) continue;
          const fullKey = nB.substring(nB.length - bLen) + '|' + nA.substring(0, aLen);
          if (wordFixes[fullKey]) {
            chars[pos] = wordFixes[fullKey];
            found = true; fileFixed = true; break;
          }
          // Also try key without trailing space
          const cleanKey = fullKey.replace(/ +\|/, '|').replace(/\| +/, '|');
          if (cleanKey !== fullKey && wordFixes[cleanKey]) {
            chars[pos] = wordFixes[cleanKey];
            found = true; fileFixed = true; break;
          }
        }
        if (found) break;
      }
      if (found) continue;

      // P3: Question-start ¿
      const tW = wA.replace(/^[¿¡]+/, '');
      if ((wB === '' || wB.trim() === '') && questionStarters.some(s => wA.startsWith(s) || tW.startsWith(s))) {
        chars[pos] = '\u00BF'; found = true; fileFixed = true;
      }
      if (found) continue;

      // P4: Ordinal/degree after numbers
      if (/^\d+$/.test(nB)) {
        const next = chars[pos + 1];
        if (next === ' ') { chars[pos] = '\u00AA'; found = true; fileFixed = true; }
        else if (next === '+' || next === ')') { chars[pos] = '\u00B0'; found = true; fileFixed = true; }
      }
      if (found) continue;

      // P5: Half-star ½ (only FFFD, not touching ? chars)
      if (wB === '' && wA.startsWith(' ')) {
        chars[pos] = '\u00BD'; found = true; fileFixed = true;
      }
      if (found) continue;

      // P6: Em dash — between word spaces or word | Word
      const cB = chars[pos - 1], cA = chars[pos + 1];
      const isWordChar = (ch) => ch !== undefined && /[a-zA-Z0-9áéíóúñüÁÉÍÓÚÑÜ]/u.test(ch);
      if (cB === ' ' && (cA === ' ' || isWordChar(cA)) && nB.trim() === '') {
        chars[pos] = '\u2014'; found = true; fileFixed = true;
      }
      if (!found && cB === ' ' && cA === ' ' && pos >= 2 && pos < chars.length - 2 &&
          (TEXT.test(chars[pos - 2]) || isWordChar(chars[pos - 2])) &&
          (TEXT.test(chars[pos + 2]) || isWordChar(chars[pos + 2]))) {
        chars[pos] = '\u2014'; found = true; fileFixed = true;
      }
      if (found) continue;

      // P7: Specific word-end accents (try all suffixes of nB)
      const dict = {'Sobre M?': 'í', 'M?': 'í', 'M?s': 'á', 'M?sica': 'ú',
        'S?': 'í', 'S?calos': 'á', 'qu?': 'é', 'Qu?': 'é',
        'Gu?as': 'í', 'Espa?ol': 'ñ', 'Gu?a': 'í',
        'v?lvulas': 'á', 'v?lvula': 'á', 'v?lv': 'á',
        '?rgano': 'ó', '?rgan': 'ó',
        'est?': 'á', 'est?s': 'ás', 'est?n': 'án',
        'ah?': 'í', 'har?': 'á', 'ser?': 'á', 'estar?': 'á',
        'decepcionar?': 'á', 'servir?': 'á',
        'ir?': 'á', 'er?': 'á', 'ar?': 'á',
        'dise?': 'ñ'};
      const aPart = nA.split(/\s/)[0] || '';
      for (let bLen = Math.min(nB.length, 15); bLen >= 1; bLen--) {
        const bPart = nB.substring(nB.length - bLen);
        const key = bPart + '?' + aPart;
        if (dict[key]) { chars[pos] = dict[key]; fileFixed = true; break; }
        const keyE = bPart + '?';
        if (dict[keyE]) { chars[pos] = dict[keyE]; fileFixed = true; break; }
      }
    }

    if (fileFixed) {
      fs.writeFileSync(filePath, chars.join(''), 'utf8');
      fixed++;
    }
  }
}

console.log(`Fixed ${fixed}/${total} pages`);

// Summary
let remain = 0;
for (const g of guides) {
  for (const s of ['', '_es']) {
    const fp = path.join(__dirname, '..', 'guides', `${g.id}${s}.html`);
    if (!fs.existsSync(fp)) continue;
    const c = fs.readFileSync(fp, 'utf8').match(/\uFFFD/g);
    if (c) remain += c.length;
  }
}
console.log(`Remaining FFFD: ${remain}`);
