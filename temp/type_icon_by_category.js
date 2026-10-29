const products = require('../data/products.json');
const map = new Map();
for (const p of products) {
  if (!p.facts) continue;
  const f = p.facts.find(x => (x.label && x.label.en)==='Type');
  if (!f) continue;
  const key = p.category + '|' + f.icon;
  map.set(key, (map.get(key)||0)+1);
}
for (const [k,v] of [...map.entries()].sort((a,b)=>b[1]-a[1])) {
  console.log(k, v);
}
