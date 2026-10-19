const fs = require('fs');
const path = require('path');

const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));

const productMap = new Map();
for (const p of products) {
  productMap.set(p.id, p);
}

function getProductPhrase(p, lang) {
  const isEs = lang === 'es';
  const score = p.score || 0;
  const cat = p.category || '';
  const brand = p.brand || '';
  const title = p.title || '';
  const desc = (p.desc || '').substring(0, 120);

  if (score >= 9.5) {
    if (cat === 'audio-interfaces' || cat === 'interfaces') return isEs ? `${title} es la interfaz de referencia, la más completa de su categoría` : `${title} is the reference interface, the most complete in its category`;
    if (cat === 'microphones') return isEs ? `${title} es el micrófono de estudio por excelencia` : `${title} is the studio microphone par excellence`;
    if (cat === 'headphones') return isEs ? `${title} son los auriculares de referencia para mezcla y mastering` : `${title} are the reference headphones for mixing and mastering`;
    if (cat === 'electric-guitars' || cat === 'acoustic-guitars') return isEs ? `${title} es la guitarra de gama alta con calidad profesional` : `${title} is the high-end guitar with professional quality`;
    if (cat === 'bass-guitars') return isEs ? `${title} es el bajo de referencia con calidad de estudio` : `${title} is the reference bass with studio quality`;
    if (cat === 'plugins' || cat === 'software') return isEs ? `${title} es el plugin imprescindible para producción profesional` : `${title} is the essential plugin for professional production`;
    return isEs ? `${title} es el producto de gama alta, el más completo y fiable de su categoría` : `${title} is the premium product, the most complete and reliable in its category`;
  }
  if (score >= 9.0) {
    if (cat === 'audio-interfaces' || cat === 'interfaces') return isEs ? `${title} ofrece calidad de estudio con excelentes previos y estabilidad` : `${title} offers studio quality with excellent preamps and stability`;
    if (cat === 'microphones') return isEs ? `${title} es un micrófono versátil y fiable para cualquier fuente` : `${title} is a versatile and reliable microphone for any source`;
    if (cat === 'headphones') return isEs ? `${title} son auriculares de monitorización precisos y cómodos` : `${title} are precise and comfortable monitoring headphones`;
    if (cat === 'electric-guitars' || cat === 'acoustic-guitars') return isEs ? `${title} es una guitarra de calidad profesional a un precio competitivo` : `${title} is a professional-quality guitar at a competitive price`;
    if (cat === 'bass-guitars') return isEs ? `${title} es un bajo versátil para cualquier estilo musical` : `${title} is a versatile bass for any musical style`;
    if (cat === 'plugins' || cat === 'software') return isEs ? `${title} es esencial en cualquier flujo de trabajo profesional` : `${title} is essential in any professional workflow`;
    return isEs ? `${title} es una opción de alto nivel, muy completa y fiable` : `${title} is a top-tier option, very complete and reliable`;
  }
  if (score >= 8.5) {
    if (cat === 'electric-guitars' || cat === 'acoustic-guitars') return isEs ? `${title} es la mejor relación calidad-precio de su gama` : `${title} is the best value for money in its range`;
    if (cat === 'bass-guitars') return isEs ? `${title} es un bajo sólido para grabación y directo` : `${title} is a solid bass for recording and live`;
    if (cat === 'plugins' || cat === 'software') return isEs ? `${title} es muy popular entre productores por su calidad y precio` : `${title} is very popular among producers for its quality and price`;
    return isEs ? `${title} es una opción sólida y fiable para uso profesional` : `${title} is a solid and reliable option for professional use`;
  }
  if (score >= 8.0) {
    return isEs ? `${title} es una buena opción para empezar o como respaldo` : `${title} is a good option to start with or as backup`;
  }
  return isEs ? `${title} es una opción a considerar dentro de su gama` : `${title} is an option to consider within its range`;
}

function generateVerdict(guide, productList, lang) {
  const isEs = lang === 'es';
  if (productList.length === 0) return '';
  const sorted = [...productList].sort((a, b) => (b.score || 0) - (a.score || 0));

  if (sorted.length === 1) {
    const p = sorted[0];
    return isEs ? `${p.title} es la mejor opción: ${getProductPhrase(p, lang)}.` : `${p.title} is the best option: ${getProductPhrase(p, lang)}.`;
  }

  if (sorted.length === 2) {
    const [first, second] = sorted;
    if (isEs) {
      return `${first.title} es la primera opción: ${getProductPhrase(first, 'es')}. ${second.title} es la alternativa: ${getProductPhrase(second, 'es')}.`;
    }
    return `${first.title} is the top pick: ${getProductPhrase(first, 'en')}. ${second.title} is the alternative: ${getProductPhrase(second, 'en')}.`;
  }

  const topTier = sorted.filter(p => (p.score || 0) >= 9.0);
  const midTier = sorted.filter(p => (p.score || 0) >= 8.0 && (p.score || 0) < 9.0);
  const budgetTier = sorted.filter(p => (p.score || 0) < 8.0);

  let verdict = '';
  if (topTier.length > 0) {
    if (topTier.length <= 4) {
      if (isEs) {
        verdict += topTier.map(p => `${p.title}: ${getProductPhrase(p, 'es')}`).join('. ') + '. ';
      } else {
        verdict += topTier.map(p => `${p.title}: ${getProductPhrase(p, 'en')}`).join('. ') + '. ';
      }
    } else {
      if (isEs) {
        verdict += `En gama alta destacan: ${topTier.map(p => p.title).join(', ')}. `;
      } else {
        verdict += `Top tier highlights: ${topTier.map(p => p.title).join(', ')}. `;
      }
    }
  }
  if (midTier.length > 0) {
    if (midTier.length <= 3) {
      if (isEs) {
        verdict += midTier.map(p => `${p.title}: ${getProductPhrase(p, 'es')}`).join('. ') + '. ';
      } else {
        verdict += midTier.map(p => `${p.title}: ${getProductPhrase(p, 'en')}`).join('. ') + '. ';
      }
    } else {
      if (isEs) {
        verdict += `En gama media: ${midTier.map(p => p.title).join(', ')}. `;
      } else {
        verdict += `Mid tier: ${midTier.map(p => p.title).join(', ')}. `;
      }
    }
  }
  if (budgetTier.length > 0) {
    if (budgetTier.length <= 3) {
      if (isEs) {
        verdict += budgetTier.map(p => `${p.title}: ${getProductPhrase(p, 'es')}`).join('. ') + '. ';
      } else {
        verdict += budgetTier.map(p => `${p.title}: ${getProductPhrase(p, 'en')}`).join('. ') + '. ';
      }
    } else {
      if (isEs) {
        verdict += `En gama económica: ${budgetTier.map(p => p.title).join(', ')}. `;
      } else {
        verdict += `Budget tier: ${budgetTier.map(p => p.title).join(', ')}. `;
      }
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
console.log(`Total: ${count} guides con veredictos y conclusiones descriptivos.`);
