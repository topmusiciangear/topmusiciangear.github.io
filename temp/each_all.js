const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
// 481 is sold as PAIR -> excluded. 295/296/483 are not PA/subs -> excluded.
const ids = [105, 106, 108, 152, 153, 154, 233, 235, 236, 337, 338, 468, 470, 479, 480, 493, 495, 496, 497, 500, 502, 630, 631];
ids.forEach(id => {
  const x = products.find(y => y.id === id);
  if (!x) { console.log(id, 'NOT FOUND'); return; }
  if (!x.desc.includes('(each)')) x.desc = x.desc + ' (each)';
  if (x.desc_es && !x.desc_es.includes('(cada uno)')) x.desc_es = x.desc_es + ' (cada uno)';
  console.log((x.desc.includes('(each)') ? 'ok ' : 'FAIL ') + id + ' ' + x.title);
});
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));
console.log('saved');
