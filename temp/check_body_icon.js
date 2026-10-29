const p = require('../data/products.json');
const items = [];
for (const prod of p) {
  if (!prod.facts) continue;
  const f = prod.facts.find(x => (x.label && x.label.en)==='Body');
  if (f) items.push({id:prod.id,title:prod.title,icon:f.icon,value:f.value});
}
console.log('Body facts count',items.length);
const icons = {};
for (const i of items) { icons[i.icon]=(icons[i.icon]||0)+1; }
console.log(icons);
console.log(items.slice(0,10));
