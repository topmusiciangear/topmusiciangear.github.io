const fs = require('fs');
const path = require('path');
const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'guides.json'), 'utf8'));
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'));
const consolidated = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'temp', 'consolidated_scores.json'), 'utf8'));
const existingOverrides = require('./score_overrides.js');

const byId = {};
for (const p of productsData) if (p.id) byId[p.id] = p;

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

const q = guides.find(x => x.id === 'best-parlor-guitars');
console.log('Guide found:', !!q);

const guideProducts = getGuideProducts(guides.find(x => x.id === 'best-parlor-guitars'));
console.log('Products:', guideProducts.map(x => x.title_es));
console.log('Products length:', guideProducts.length);

const guideType = 'best';
const c = consolidated['best-parlor-guitars'];
const winnerTitle = Object.keys(consolidated['best-parlor-guitars'])[0];
console.log('Winner:', winnerTitle);

let position = 0;
let result = {};

for (const p of products) {
  const title = (p.title_es || p.title).trim();
  const isWinner = title === 'Guitarra PRS SE P20e Tonare Parlor';
  const pos = isWinner ? 0 : ++position;
  const total = guideProducts.length;
  
  let score;
  if (consolidated['best-parlor-guitars'] && consolidated['best-parlor-guitars'][title] !== undefined) {
    score = consolidated['best-parlor-guitars'][title];
    console.log('Found in consolidated:', title, score);
  } else {
    console.log('NOT in consolidated:', title);
  }
  
  if (isWinner) {
    const maxOther = Math.max(...Object.values(result));
    if (score <= maxOther) {
      score = Math.min(9.9, maxOther + 0.1);
    }
  }
  
  score = Math.round(score * 10) / 10;
  result[title] = score;
}

console.log('Result:', JSON.stringify(result, null, 2));
console.log('Result keys:', Object.keys(result).length);