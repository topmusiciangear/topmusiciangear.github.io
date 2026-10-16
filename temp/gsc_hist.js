const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(B + 'guides/mixing-plugins.html', 'utf8');
const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);
const itemList = JSON.parse(blocks[1]);
itemList.itemListElement.forEach(e => {
  const p = e.item || {};
  const off = p.offers;
  const n = Array.isArray(off) ? off.length : (off ? 1 : 0);
  console.log('ItemList: "' + p.name + '" offers=' + n);
});
