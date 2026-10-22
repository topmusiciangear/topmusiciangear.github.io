const fs = require('fs');
const pre = JSON.parse(fs.readFileSync('temp/products_pretrim.json', 'utf8'));
const cur = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function firstSentence(s) {
  if (!s) return s;
  const m = s.match(/^[^.!?]*[.!?]/);
  let t = m ? m[0] : s;
  if (t.length > 180) {
    const cut = t.slice(0, 175);
    const sp = cut.lastIndexOf(' ');
    t = (sp > 80 ? cut.slice(0, sp) : cut).trim();
  }
  return t.trim();
}

for (const p of pre) {
  p.desc = firstSentence(p.desc);
  p.desc_es = firstSentence(p.desc_es);
}

// Apply HD490 product 24 updates from current
const cur24 = cur.find(p => p.id === 24);
const pre24 = pre.find(p => p.id === 24);
pre24.title = cur24.title;
pre24.title_es = cur24.title_es;
pre24.price = cur24.price;
pre24.stores = cur24.stores;

fs.writeFileSync('data/products.json', JSON.stringify(pre, null, 2));
console.log('done');
// check
const lens = pre.map(p => (p.desc||'').length);
console.log('max desc len:', Math.max(...lens), 'avg:', Math.round(lens.reduce((a,b)=>a+b,0)/lens.length));
console.log('over 150:', lens.filter(l=>l>150).length);
