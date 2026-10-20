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

function getBaseScore(guideType, position, total, isWinner, isMixed) {
  if (isWinner) {
    if (guideType === 'duel') return 9.7;
    if (guideType === 'budget') return 9.7;
    if (guideType === 'best') return 9.8;
    return 9.7;
  }
  const remaining = total - 1;
  const pos = position - 1;
  let base;
  if (guideType === 'duel') base = 9.3;
  else if (guideType === 'budget') base = 9.5;
  else if (guideType === 'best') base = 9.6;
  else base = 9.4;
  const step = Math.min(0.3, 1.5 / Math.max(1, remaining));
  let score = base - (pos * step);
  return Math.max(7.5, Math.round(score * 10) / 10);
}

function adjustByCategory(score, category, guideType) {
  if (!category) return score;
  const cat = category.toLowerCase();
  if (['interfaces', 'monitors', 'headphones', 'microphones', 'instruments'].includes(cat)) {
    return Math.min(9.9, score + 0.1);
  }
  if (['budget', 'beginner', 'entry'].includes(cat)) {
    return Math.max(7.5, score - 0.1);
  }
  if (['live_sound', 'pa', 'mixers'].includes(cat)) {
    return Math.min(9.8, score);
  }
  return score;
}

function generateGuideScores(guide) {
  const products = getGuideProducts(guide);
  if (!products.length) return {};
  
  const guideType = getGuideType(guide);
  const mixed = isMixedCategory(guide);
  
  let winnerTitle = null;
  if (consolidated[guide.id]) {
    winnerTitle = Object.keys(consolidated[guide.id])[0];
  } else if (existingOverrides[guide.id]) {
    const ov = existingOverrides[guide.id];
    winnerTitle = Object.keys(ov)[0];
  } else {
    winnerTitle = cleanTitle(products[0].title_es || products[0].title);
  }
  
  const result = {};
  let position = 0;
  
  for (const p of products) {
    const title = cleanTitle(p.title_es || p.title);
    const isWinner = title === winnerTitle;
    const pos = isWinner ? 0 : ++position;
    const total = products.length;
    
    let score;
    if (consolidated[guide.id] && consolidated[guide.id][title] !== undefined) {
      score = consolidated[guide.id][title];
    } else if (existingOverrides[guide.id] && existingOverrides[guide.id][title] !== undefined) {
      score = existingOverrides[guide.id][title];
    } else if (p.score !== undefined && p.score !== null) {
      score = p.score;
    } else {
      score = getBaseScore(guideType, isWinner ? 0 : position, products.length, isWinner, false);
      score = adjustByCategory(score, guide.category, 'best');
    }
    
    if (isWinner) {
      const maxOther = Math.max(...Object.values(result));
      if (score <= maxOther) {
        score = Math.min(9.9, maxOther + 0.1);
      }
    }
    
    score = Math.round(score * 10) / 10;
    result[cleanTitle(p.title_es || p.title)] = score;
    if (p.title && p.title !== (p.title_es || p.title)) {
      result[cleanTitle(p.title)] = score;
    }
  }
  
  return result;
}

const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'));
const consolidated = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'temp', 'consolidated_scores.json'), 'utf8'));
const existingOverrides = require('./score_overrides.js');

const q = guides.find(x => x.id === 'best-beginner-electric-guitar');
console.log('Guide:', q.id);

const scores = generateGuideScores(q);
console.log('Result scores:', JSON.stringify(scores, null, 2));
console.log('Result keys:', Object.keys(scores).length);