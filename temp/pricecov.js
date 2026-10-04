const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
// extract TEST_SHOP_BTN block by brace counting from its start
const start = src.indexOf('TEST_SHOP_BTN');
const bs = src.indexOf('{', start);
let d = 0, q = null, i = bs;
for (; i < src.length; i++) {
  const c = src[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const BTN = eval('(' + src.slice(bs, i + 1) + ')');
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
function usd(s) {
  if (!s) return null;
  const m = String(s).match(/^\$\s*([\d,]+(?:\.\d+)?)/);
  return m ? parseFloat(m[1].replace(/,/g, '')) : null;
}
let both = 0, one = 0, none = 0, catFallback = 0;
const noneIds = [];
Object.keys(BTN).forEach(id => {
  const pr = (BTN[id] && BTN[id].prices) || {};
  const vals = [usd(pr.amazon), usd(pr.zzounds)].filter(v => v != null);
  if (vals.length === 2) both++;
  else if (vals.length === 1) one++;
  else {
    const p = P.find(x => String(x.id) === String(id));
    if (p && p.price) catFallback++;
    else { none++; noneIds.push(id); }
  }
});
console.log('BTN entries:', Object.keys(BTN).length, 'USD both:', both, 'one:', one, 'catalog-fallback:', catFallback, 'none:', none);
console.log('sin precio USD ni catalogo:', noneIds.slice(0, 20).join(','));