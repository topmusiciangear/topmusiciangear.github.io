const fs = require('fs');
const path = require('path');

const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));

const productMap = new Map();
for (const p of products) {
  productMap.set(p.id, p);
}

// Descriptive phrases based on product characteristics
function getProductDescription(p, lang) {
  const isEs = lang === 'es';
  const score = p.score || 0;
  const badge = p.badge || '';
  const cat = p.category || 'accessories';
  const brand = p.brand || '';
  const title = p.title || '';
  
  // High score products (9.5+)
  if (score >= 9.5) {
    if (badge === 'legend' || badge === 'flagship') {
      return isEs ? `${title} es el referente absoluto en su categoría` : `${title} is the absolute reference in its category`;
    }
    return isEs ? `${title} es la opción premium con calidad excepcional` : `${title} is the premium option with exceptional quality`;
  }
  
  // Very high score (9.0-9.4)
  if (score >= 9.0) {
    if (cat === 'audio-interfaces' || cat === 'interfaces') {
      return isEs ? `${title} ofrece calidad de estudio a un precio competitivo` : `${title} offers studio quality at a competitive price`;
    }
    if (cat === 'microphones') {
      return isEs ? `${title} es un micrófono versátil y fiable` : `${title} is a versatile and reliable microphone`;
    }
    if (cat === 'headphones') {
      return isEs ? `${title} es la opción de monitorización de referencia` : `${title} is the reference monitoring option`;
    }
    return isEs ? `${title} es una opción de alto nivel` : `${title} is a top-tier option`;
  }
  
  // High score (8.5-8.9)
  if (score >= 8.5) {
    if (cat === 'electric-guitars' || cat === 'acoustic-guitars') {
      return isEs ? `${title} es la mejor relación calidad-precio` : `${title} is the best value for money`;
    }
    if (cat === 'bass-guitars') {
      return isEs ? `${title} es un bajo versátil para cualquier estilo` : `${title} is a versatile bass for any style`;
    }
    if (cat === 'plugins' || cat === 'software') {
      return isEs ? `${title} es esencial en cualquier estudio` : `${title} is essential in any studio`;
    }
    return isEs ? `${title} es una opción sólida y fiable` : `${title} is a solid and reliable option`;
  }
  
  // Mid-high score (8.0-8.4)
  if (score >= 8.0) {
    return isEs ? `${title} es una buena opción para empezar` : `${title} is a good option to start with`;
  }
  
  // Default
  return isEs ? `${title} es una opción a considerar` : `${title} is an option to consider`;
}

// Generate verdict with descriptive content
function generateVerdict(guide, productList, lang) {
  const isEs = lang === 'es';
  
  if (productList.length === 0) return '';
  
  // Sort by score descending
  const sorted = [...productList].sort((a, b) => (b.score || 0) - (a.score || 0));
  
  // For duel guides (2 products), use comparative language
  if (sorted.length === 2) {
    const [first, second] = sorted;
    if (isEs) {
      return `${first.title} es la opción principal por su calidad y prestaciones. ${second.title} es la alternativa sólida con características propias.`;
    }
    return `${first.title} is the top pick for its quality and features. ${second.title} is the solid alternative with its own strengths.`;
  }
  
  // For single product
  if (sorted.length === 1) {
    const p = sorted[0];
    if (isEs) {
      return `${p.title} es la mejor opción en su categoría.`;
    }
    return `${p.title} is the best option in its category.`;
  }
  
  // For multiple products, group by tier
  const topTier = sorted.filter(p => (p.score || 0) >= 9.0);
  const midTier = sorted.filter(p => (p.score || 0) >= 8.0 && (p.score || 0) < 9.0);
  const budgetTier = sorted.filter(p => (p.score || 0) < 8.0);
  
  let verdict = '';
  
  if (topTier.length > 0) {
    const names = topTier.map(p => p.title).join(', ');
    if (isEs) {
      verdict += `En la gama alta: ${names}. `;
    } else {
      verdict += `In the top tier: ${names}. `;
    }
  }
  
  if (midTier.length > 0) {
    const names = midTier.map(p => p.title).join(', ');
    if (isEs) {
      verdict += `En la gama media: ${names}. `;
    } else {
      verdict += `In the mid tier: ${names}. `;
    }
  }
  
  if (budgetTier.length > 0) {
    const names = budgetTier.map(p => p.title).join(', ');
    if (isEs) {
      verdict += `En la gama económica: ${names}. `;
    } else {
      verdict += `In the budget tier: ${names}. `;
    }
  }
  
  return verdict.trim();
}

// Generate conclusion with descriptive content
function generateConclusion(guide, productList, lang) {
  const isEs = lang === 'es';
  
  if (productList.length === 0) return '';
  
  const sorted = [...productList].sort((a, b) => (b.score || 0) - (a.score || 0));
  
  // For duel guides
  if (sorted.length === 2) {
    const [first, second] = sorted;
    if (isEs) {
      return `Elige ${first.title} si buscas la mejor calidad. Elige ${second.title} si prefieres una alternativa con características propias.`;
    }
    return `Choose ${first.title} if you want the best quality. Choose ${second.title} if you prefer an alternative with its own strengths.`;
  }
  
  // For single product
  if (sorted.length === 1) {
    const p = sorted[0];
    if (isEs) {
      return `${p.title} es la recomendación principal.`;
    }
    return `${p.title} is the main recommendation.`;
  }
  
  // For multiple products
  const topPick = sorted[0];
  const rest = sorted.slice(1);
  
  let conclusion = '';
  if (isEs) {
    conclusion = `${topPick.title} es la mejor opción global. `;
    if (rest.length > 0) {
      const names = rest.map(p => p.title).join(', ');
      conclusion += `También son excelentes opciones: ${names}.`;
    }
  } else {
    conclusion = `${topPick.title} is the overall best option. `;
    if (rest.length > 0) {
      const names = rest.map(p => p.title).join(', ');
      conclusion += `Also excellent options: ${names}.`;
    }
  }
  
  return conclusion;
}

// Process all guides
let count = 0;
for (const guide of guides) {
  const productIds = new Set();
  for (const section of guide.sections || []) {
    for (const pid of section.products || []) {
      productIds.add(pid);
    }
  }
  
  const productList = [];
  for (const pid of productIds) {
    const p = productMap.get(pid);
    if (p) productList.push(p);
  }
  
  if (productList.length === 0) continue;
  
  guide.verdict = generateVerdict(guide, productList, 'en');
  guide.verdict_es = generateVerdict(guide, productList, 'es');
  guide.conclusion = generateConclusion(guide, productList, 'en');
  guide.conclusion_es = generateConclusion(guide, productList, 'es');
  
  count++;
}

fs.writeFileSync(path.join(__dirname, '../data/guides.json'), JSON.stringify(guides, null, 2));
console.log(`Total: ${count} guides actualizados con contenido descriptivo real.`);
