const fs = require('fs');
const s = fs.readFileSync('guides/monitor-setup.html', 'utf8');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
for (const id of [646, 651]) {
  const p = prods.find(x => x.id === id);
  console.log(id + ' score global: ' + p.score + ' | ' + p.title);
}

const name = 'IsoAcoustics ISO-200 Studio Monitor Stands';
const i = s.lastIndexOf(name, s.indexOf(name, s.indexOf('id="featured"') > -1 ? s.indexOf('id="featured"') : 0));
console.log('\nprimera aparicion nombre en pos:', s.indexOf(name));
const start = Math.max(0, s.indexOf(name) - 1500);
console.log(s.slice(start, s.indexOf(name) + 900).replace(/\s+/g, ' '));
