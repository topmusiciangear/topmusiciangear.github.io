const fs = require('fs');
const vm = require('vm');

// --- 1) shop-buttons.js: icons + geo present ---
const sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
const sandbox = { window: {}, document: { documentElement: { lang: 'en' }, querySelectorAll: () => [] }, navigator: {}, localStorage: { getItem: () => null, setItem: () => {} }, Intl, console };
sandbox.window = sandbox;
vm.runInNewContext(sb, sandbox);
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
// reverb row icon should be colored gradient globe; g4m row = UK flag
const p20 = prods.find(x => x.id === 20);
const html = sandbox.shopButtonsTest(p20, false);
function rowIcon(st) {
  const i = html.indexOf('data-store="' + st + '"');
  const seg = html.slice(i, i + 900);
  const s = seg.match(/<svg[\s\S]*?<\/svg>/);
  return s ? s[0] : '';
}
const rv = rowIcon('reverb');
const g4 = rowIcon('gear4music');
console.log('reverb icon color globe:', rv.indexOf('67c6f8') >= 0, '| has white b&w lines only:', rv.indexOf('<line x1="6.5"') >= 0 && rv.indexOf('67c6f8') < 0);
console.log('g4m icon flag blue corner:', g4.indexOf('012169') >= 0, '| red diag:', g4.indexOf('C8102E') >= 0);
console.log('window.tmgGeoSwap defined:', typeof sandbox.window.tmgGeoSwap === 'function');

// --- 2) run the NEW search scoring from app.js against products ---
const appSrc = fs.readFileSync('js/app.js', 'utf8');
// extract scoring function by simulating: rebuild tokens then the same reduce
function runSearch(q) {
  const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const stem = s => s.replace(/(es|s)$/i, '');
  const toWords = s => norm(s).split(/[\s\-\/]+/).filter(Boolean);
  const qn = norm(q);
  const qWords = toWords(qn);
  return prods.reduce((acc, p) => {
    const tWords = toWords(p.title);
    const teWords = toWords(p.title_es || "");
    const allWords = [...new Set([...tWords, ...teWords, ...toWords(p.brand || "")])];
    const b = norm(p.brand || "");
    let matched = 0, score = 0;
    for (const qw of qWords) {
      let best = 0, hit = false;
      for (const w of allWords) {
        if (w === qw) { best = Math.max(best, 10); hit = true; }
        else if (w === stem(qw)) { best = Math.max(best, 10); hit = true; }
        else if (w.indexOf(qw) === 0) { best = Math.max(best, 6); hit = true; }
        else if (stem(w) === stem(qw)) { best = Math.max(best, 6); hit = true; }
      }
      if (hit) { matched++; score += best; }
    }
    if (matched >= (qWords.length <= 4 ? qWords.length : qWords.length - 1)) {
      score += matched * 2;
      if (b.indexOf(qn) === 0) score += 1;
      acc.push({ product: p, score });
    }
    return acc;
  }, []).sort((a, b) => b.score - a.score).map(x => x.product);
}
const tests = [
  ['shure sm7b', 3],
  ['maono pm461', 3],
  ['krk rokit 7', 3],
  ['rode nt1', 3],
  ['sm7', 8],
  ['audient id14', 5],
];
for (const [q, min] of tests) {
  const res = runSearch(q);
  console.log('query "' + q + '" ->', res.length, 'results | top:', res.slice(0, 3).map(p => p.title).join(' | '), '| ok:', res.length >= min);
}
// --- 3) minified block identical behavior ---
const m = fs.readFileSync('js/app.min.js', 'utf8');
const blk = m.match(/const o=\(\(\)=>{const _n=s=>s.normalize\("NFD"\)[\s\S]{0,120}?qw=_w\(_n\(e\)\);/);
console.log('\nmin contains new tokenized scorer:', !!blk);
const b2 = m.indexOf('window.tmgGeoSwap&&tmgGeoSwap()');
console.log('min still calls tmgGeoSwap after render:', b2 >= 0);