const fs = require('fs');
const raw = fs.readFileSync('data/guides.json', 'utf8');
function ctx(needle, before, after) {
  const i = raw.indexOf(needle);
  if (i < 0) { console.log('NOT FOUND:', needle); return; }
  console.log('---', needle, '---');
  console.log(JSON.stringify(raw.slice(i - (before || 60), i + (after || 120))));
}
ctx('Cejuela más estrecha de 1 7/8', 20, 90);
ctx('If you want one guitar to start and grow', 40, 200);
ctx('Si quieres una guitarra para empezar y crecer', 40, 200);
const arr = JSON.parse(raw);
const g = arr.find(x => x.id === 'best-nylon-guitars-for-beginners');
console.log('\nkeys of 1064 registry not needed.');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = prods.find(x => x.id === 1064);
console.log('1064 keys:', Object.keys(p).join(','));
console.log('1064:', JSON.stringify({ title: p.title, price: p.price, rating: p.rating, score: p.score }));
const p2 = prods.find(x => x.id === 1059);
console.log('1059 keys:', Object.keys(p2).join(','), '| price', p2.price);
