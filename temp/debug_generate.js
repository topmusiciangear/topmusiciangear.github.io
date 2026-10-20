const fs = require('fs');
const path = require('path');
const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'));
const consolidated = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'temp', 'consolidated_scores.json'), 'utf8'));

const q = guides.find(x => x.id === 'best-beginner-electric-guitar');
console.log('Guide:', q.id);

const byId = {};
for (const p of products) if (p.id) byId[p.id] = p;

const ids = [];
for (const s of (q.sections || [])) {
  for (const pid of (s.products || [])) {
    if (typeof pid === 'number' && !ids.includes(pid)) ids.push(pid);
  }
}

const guideProducts = ids.map(id => byId[id]).filter(Boolean);
console.log('Products:', guideProducts.map(x => x.title_es));

const c = consolidated['best-beginner-electric-guitar'];
console.log('Consolidated has guide:', !!c);

const result = {};
let position = 0;

for (const p of guideProducts) {
  const title = (p.title_es || p.title).trim();
  const isWinner = title === 'Yamaha Pacifica 112V';
  const pos = isWinner ? 0 : ++position;
  const total = 10;
  
  let score;
  if (consolidated['best-beginner-electric-guitar'] && consolidated['best-beginner-electric-guitar'][title] !== undefined) {
    score = consolidated['best-beginner-electric-guitar'][title];
    console.log('Found in consolidated:', title, score);
  } else {
    console.log('NOT in consolidated:', title);
  }
}