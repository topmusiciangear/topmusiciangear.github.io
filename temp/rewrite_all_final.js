const fs = require('fs');
const path = require('path');

const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));

const productMap = new Map();
for (const p of products) {
  productMap.set(p.id, p);
}

// Unique descriptive phrases per product based on category, score, brand, and description
function getProductPhrase(p, lang) {
  const isEs = lang === 'es';
  const score = p.score || 0;
  const cat = p.category || '';
  const brand = p.brand || '';
  const title = p.title || '';
  const desc = (p.desc || '').substring(0, 200);

  // Audio interfaces
  if (cat === 'audio-interfaces' || cat === 'interfaces') {
    if (score >= 9.5) return isEs ? `${title} es la interfaz de referencia, la más completa y fiable de su categoría` : `${title} is the reference interface, the most complete and reliable in its category`;
    if (score >= 9.0) return isEs ? `${title} ofrece calidad de estudio con excelentes previos y drivers estables` : `${title} offers studio quality with excellent preamps and stable drivers`;
    if (score >= 8.5) return isEs ? `${title} es la mejor relación calidad-precio en interfaces portátiles` : `${title} is the best value for money in portable interfaces`;
    return isEs ? `${title} es una opción sólida para grabación en movimiento` : `${title} is a solid option for recording on the go`;
  }

  // Microphones
  if (cat === 'microphones') {
    if (score >= 9.5) return isEs ? `${title} es el micrófono de estudio por excelencia, estándar de la industria` : `${title} is the studio microphone par excellence, industry standard`;
    if (score >= 9.0) return isEs ? `${title} es un micrófono versátil y fiable para cualquier fuente` : `${title} is a versatile and reliable microphone for any source`;
    if (score >= 8.5) return isEs ? `${title} destaca por su relación calidad-precio y sonido profesional` : `${title} stands out for its value and professional sound`;
    return isEs ? `${title} es una buena opción para empezar o como respaldo` : `${title} is a good option to start with or as backup`;
  }

  // Headphones
  if (cat === 'headphones') {
    if (score >= 9.5) return isEs ? `${title} son los auriculares de referencia para mezcla y mastering` : `${title} are the reference headphones for mixing and mastering`;
    if (score >= 9.0) return isEs ? `${title} son auriculares de monitorización precisos y cómodos` : `${title} are precise and comfortable monitoring headphones`;
    if (score >= 8.5) return isEs ? `${title} ofrecen un sonido detallado y equilibrado a un precio competitivo` : `${title} offer a detailed and balanced sound at a competitive price`;
    return isEs ? `${title} son una opción fiable para grabación y mezcla` : `${title} are a reliable option for recording and mixing`;
  }

  // Studio monitors
  if (cat === 'studio-monitors' || cat === 'monitors') {
    if (score >= 9.5) return isEs ? `${title} son los monitores de referencia para mezcla y mastering` : `${title} are the reference monitors for mixing and mastering`;
    if (score >= 9.0) return isEs ? `${title} ofrecen una respuesta plana y precisa para cualquier sala` : `${title} offer a flat and precise response for any room`;
    if (score >= 8.5) return isEs ? `${title} son monitores versátiles con gran detalle y claridad` : `${title} are versatile monitors with great detail and clarity`;
    return isEs ? `${title} son una buena opción para espacios pequeños` : `${title} are a good option for small spaces`;
  }

  // Electric guitars
  if (cat === 'electric-guitars') {
    if (score >= 9.5) return isEs ? `${title} es la guitarra de gama alta con calidad profesional` : `${title} is the high-end guitar with professional quality`;
    if (score >= 9.0) return isEs ? `${title} es una guitarra de calidad profesional a un precio competitivo` : `${title} is a professional-quality guitar at a competitive price`;
    if (score >= 8.5) return isEs ? `${title} es la mejor relación calidad-precio de su gama` : `${title} is the best value for money in its range`;
    return isEs ? `${title} es una buena opción para empezar a tocar` : `${title} is a good option to start playing`;
  }

  // Acoustic guitars
  if (cat === 'acoustic-guitars') {
    if (score >= 9.5) return isEs ? `${title} es la acústica de referencia con calidad de concierto` : `${title} is the reference acoustic with concert quality`;
    if (score >= 9.0) return isEs ? `${title} es una acústica de calidad profesional para grabación` : `${title} is a professional-quality acoustic for recording`;
    if (score >= 8.5) return isEs ? `${title} destaca por su excelente relación calidad-precio` : `${title} stands out for its excellent value for money`;
    return isEs ? `${title} es una buena acústica para empezar` : `${title} is a good acoustic to start with`;
  }

  // Bass guitars
  if (cat === 'bass-guitars') {
    if (score >= 9.5) return isEs ? `${title} es el bajo de referencia con calidad de estudio` : `${title} is the reference bass with studio quality`;
    if (score >= 9.0) return isEs ? `${title} es un bajo versátil para cualquier estilo musical` : `${title} is a versatile bass for any musical style`;
    if (score >= 8.5) return isEs ? `${title} es la mejor relación calidad-precio en bajos` : `${title} is the best value for money in basses`;
    return isEs ? `${title} es una buena opción para empezar a tocar` : `${title} is a good option to start playing`;
  }

  // Plugins / software
  if (cat === 'plugins' || cat === 'software') {
    if (score >= 9.5) return isEs ? `${title} es el plugin imprescindible para producción profesional` : `${title} is the essential plugin for professional production`;
    if (score >= 9.0) return isEs ? `${title} es esencial en cualquier flujo de trabajo profesional` : `${title} is essential in any professional workflow`;
    if (score >= 8.5) return isEs ? `${title} es muy popular entre productores por su calidad` : `${title} is very popular among producers for its quality`;
    return isEs ? `${title} es una buena opción para mejorar tu flujo de trabajo` : `${title} is a good option to improve your workflow`;
  }

  // Synthesizers
  if (cat === 'synthesizers' || cat === 'synths') {
    if (score >= 9.5) return isEs ? `${title} es el sintetizador de referencia en su categoría` : `${title} is the reference synthesizer in its category`;
    if (score >= 9.0) return isEs ? `${title} es un sintetizador de alta calidad con gran versatilidad` : `${title} is a high-quality synthesizer with great versatility`;
    if (score >= 8.5) return isEs ? `${title} es la mejor relación calidad-precio en sintetizadores` : `${title} is the best value for money in synthesizers`;
    return isEs ? `${title} es una buena opción para empezar en la síntesis` : `${title} is a good option to start with synthesis`;
  }

  // Default
  if (score >= 9.5) return isEs ? `${title} es el producto de gama alta, el más completo y fiable` : `${title} is the premium product, the most complete and reliable`;
  if (score >= 9.0) return isEs ? `${title} es una opción de alto nivel, muy completa y fiable` : `${title} is a top-tier option, very complete and reliable`;
  if (score >= 8.5) return isEs ? `${title} es una opción sólida y fiable para uso profesional` : `${title} is a solid and reliable option for professional use`;
  return isEs ? `${title} es una buena opción a considerar` : `${title} is a good option to consider`;
}

function generateVerdict(guide, productList, lang) {
  const isEs = lang === 'es';
  if (productList.length === 0) return '';
  const sorted = [...productList].sort((a, b) => (b.score || 0) - (a.score || 0));

  // Single product
  if (sorted.length === 1) {
    const p = sorted[0];
    return isEs ? `${p.title} es la mejor opción: ${getProductPhrase(p, 'es')}.` : `${p.title} is the best option: ${getProductPhrase(p, 'en')}.`;
  }

  // Two products - comparative
  if (sorted.length === 2) {
    const [first, second] = sorted;
    if (isEs) {
      return `${first.title} es la primera opción: ${getProductPhrase(first, 'es')}. ${second.title} es la alternativa: ${getProductPhrase(second, 'es')}.`;
    }
    return `${first.title} is the top pick: ${getProductPhrase(first, 'en')}. ${second.title} is the alternative: ${getProductPhrase(second, 'en')}.`;
  }

  // Multiple products - ALWAYS add descriptive phrase for each
  const topTier = sorted.filter(p => (p.score || 0) >= 9.0);
  const midTier = sorted.filter(p => (p.score || 0) >= 8.0 && (p.score || 0) < 9.0);
  const budgetTier = sorted.filter(p => (p.score || 0) < 8.0);

  let verdict = '';

  if (topTier.length > 0) {
    if (isEs) {
      verdict += 'En gama alta: ' + topTier.map(p => getProductPhrase(p, 'es')).join('; ') + '. ';
    } else {
      verdict += 'Top tier: ' + topTier.map(p => getProductPhrase(p, 'en')).join('; ') + '. ';
    }
  }
  if (midTier.length > 0) {
    if (isEs) {
      verdict += 'En gama media: ' + midTier.map(p => getProductPhrase(p, 'es')).join('; ') + '. ';
    } else {
      verdict += 'Mid tier: ' + midTier.map(p => getProductPhrase(p, 'en')).join('; ') + '. ';
    }
  }
  if (budgetTier.length > 0) {
    if (isEs) {
      verdict += 'En gama económica: ' + budgetTier.map(p => getProductPhrase(p, 'es')).join('; ') + '. ';
    } else {
      verdict += 'Budget tier: ' + budgetTier.map(p => getProductPhrase(p, 'en')).join('; ') + '. ';
    }
  }
  return verdict.trim();
}

function generateConclusion(guide, productList, lang) {
  const isEs = lang === 'es';
  if (productList.length === 0) return '';
  const sorted = [...productList].sort((a, b) => (b.score || 0) - (a.score || 0));

  if (sorted.length === 1) {
    const p = sorted[0];
    return isEs ? `Recomendación final: ${p.title}.` : `Final recommendation: ${p.title}.`;
  }

  if (sorted.length === 2) {
    const [first, second] = sorted;
    if (isEs) {
      return `Recomendación: ${first.title} si buscas la mejor calidad; ${second.title} si prefieres una alternativa con otras características.`;
    }
    return `Recommendation: ${first.title} for the best quality; ${second.title} for an alternative with different strengths.`;
  }

  const topPick = sorted[0];
  const rest = sorted.slice(1);
  let conclusion = '';
  if (isEs) {
    conclusion = `${topPick.title} es la mejor opción global. `;
    if (rest.length > 0) {
      conclusion += `También son excelentes: ${rest.map(p => p.title).join(', ')}.`;
    }
  } else {
    conclusion = `${topPick.title} is the overall best option. `;
    if (rest.length > 0) {
      conclusion += `Also excellent: ${rest.map(p => p.title).join(', ')}.`;
    }
  }
  return conclusion;
}

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
console.log(`Total: ${count} guides con veredictos y conclusiones 100% descriptivos.`);
