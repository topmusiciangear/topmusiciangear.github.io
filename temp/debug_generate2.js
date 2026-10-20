const fs = require('fs');
const path = require('path');
const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'));
const consolidated = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'temp', 'consolidated_scores.json'), 'utf8'));
const existingOverrides = require('./score_overrides.js');

const byId = {};
for (const p of products) if (p.id) byId[p.id] = p;

function cleanTitle(name) {
  return (name || '').trim();
}

function getGuideProducts(guide) {
  const ids = [];
  for (const s of (guide.sections || [])) {
    for (const pid of (s.products || [])) {
      if (typeof pid === 'number' && !ids.includes(pid)) ids.push(pid);
    }
  }
  return ids.map(id => byId[id]).filter(Boolean);
}

function getGuideType(guide) {
  const id = guide.id;
  if (/-vs-/.test(id)) return 'duel';
  if (/budget|menos-de|under|economic|barat/.test(id)) return 'budget';
  if (/^best-|^best/.test(id) || /^mejores/.test(guide.title_es || '') || /^mejor/.test(guide.title_es || '')) return 'best';
  return 'default';
}

function isMixedCategory(guide) {
  const cats = new Set();
  for (const s of (guide.sections || [])) {
    for (const pid of (s.products || [])) {
      const p = byId[pid];
      if (p && p.category) cats.add(p.category);
    }
  }
  return cats.size > 1;
}

const q = guides.find(x => x.id === 'best-beginner-electric-guitar');
console.log('Guide:', q.id);

const guideProducts = getGuideProducts(q);
console.log('Products:', guideProducts.map(x => x.title_es));
console.log('Products length:', guideProducts.length);

const guideType = 'best';
const mixed = false;

const c = consolidated['best-beginner-electric-guitar'];
console.log('Consolidated has guide:', !!c);

const winnerTitle = Object.keys(consolidated['best-beginner-electric-guitar'])[0];
console.log('Winner:', winnerTitle);

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