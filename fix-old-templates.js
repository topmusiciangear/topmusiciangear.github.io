const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8').replace(/^\ufeff/, ''));

function strip(s) { return (s || '').replace(/<[^>]+>/g, '').trim(); }

function cleanProdName(name) {
  if (!name) return name;
  return name.replace(/\s+All-Rounder\s+Guitar\s*$/i, '').trim();
}

function normESArticle(a) {
  if (!a) return a;
  const map = { del: 'el', 'de la': 'la', 'de los': 'los', 'de las': 'las' };
  return map[a.toLowerCase()] || a;
}

function getProd(q) {
  let m;
  if ((m = /^Should you choose the (.+?)(?: as a| for |\?|$)/i.exec(q))) return m[1].trim();
  if ((m = /^Would you recommend the (.+?)(?: as a| for |\?|$)/i.exec(q))) return m[1].trim();
  if ((m = /^(Would|Is) the (.+?)(?: be a| a good| worth| \?|$)/i.exec(q))) return (m[2] || '').trim();
  if ((m = /^Are the (.+?)(?: the| for| \?|$)/i.exec(q))) return m[1].trim();
  if ((m = /^What makes the (.+?) a great/i.exec(q))) return m[1].trim();
  if ((m = /^Why is the (.+?) recommended/i.exec(q))) return m[1].trim();
  if ((m = /^Why has the (.+?) remained/i.exec(q))) return m[1].trim();
  if ((m = /^How does the (.+?) compare/i.exec(q))) return m[1].trim();
  if ((m = /^Does the (.+?) require/i.exec(q))) return m[1].trim();
  if ((m = /^What kind of .+? benefits most from the (.+?)\?/i.exec(q))) return m[1].trim();
  if ((m = /^(.+?) vs (.+?): Which/i.exec(q))) return m[1].trim();
  if ((m = /^(.+?): Which one should/i.exec(q))) return m[1].trim();
  if ((m = /^What is the difference between the (.+?) and the (.+?)/i.exec(q))) return m[1].trim();
  if ((m = /^Which is better for .+? — the (.+?) or the (.+?)/i.exec(q))) return m[1].trim();
  if ((m = /^Do you need a (.+?) for/i.exec(q))) return m[1].trim();
  if ((m = /^How important is (.+?) for/i.exec(q))) return m[1].trim();
  if ((m = /^What should (I|you) look for in a (.+?)\?/i.exec(q))) return m[2].trim();
  if ((m = /^How many .+? does the (.+?) offer/i.exec(q))) return m[1].trim();
  if ((m = /^¿(?:Deberías elegir|Recomendarías) (el|la|los|las) (.+?)(?: como| para| \?|$)/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿(?:Sería|Funcionaría) (el|la|los|las) (.+?)(?: como| una| \?|$)/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Es (el|la|los|las) (.+?)(?: una| el| la| \?|$)/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Son (los|las) (.+?)(?: los| las| para| \?|$)/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Qué hace (del?|de la|de los|de las) (.+?) una/i.exec(q))) return normESArticle(m[1]) + ' ' + m[2].trim();
  if ((m = /^¿Por qué se recomienda (el|la|los|las) (.+?) para/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Cómo se compara (el|la|los|las) (.+?) con/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Requiere (el|la|los|las) (.+?)(?: equipo|algún)/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Qué tipo de .+? se beneficia más de (el|la|los|las) (.+?)(?:\?|$)/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Cuántos .+? ofrece (el|la|los|las) (.+?)(?:\?|$)/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Sigue (el|la|los|las) (.+?) Siendo/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  return '';
}

function getQType(q) {
  if (/^Should you choose/i.test(q)) return 'SHOULD_CHOOSE';
  if (/^Would you recommend/i.test(q)) return 'WOULD_RECOMMEND';
  if (/^(Would the|Is the)/i.test(q)) return 'IS_THE';
  if (/^Are the/i.test(q)) return 'ARE_THE';
  if (/^What makes/i.test(q)) return 'WHAT_MAKES';
  if (/^Why (is|has)/i.test(q)) return 'WHY_IS';
  if (/^How does/i.test(q)) return 'HOW_DOES';
  if (/^Does the/i.test(q)) return 'DOES_THE';
  if (/^What kind of/i.test(q)) return 'WHAT_KIND';
  if (/^How many/i.test(q)) return 'HOW_MANY';
  if (/^Is .* worth/i.test(q)) return 'IS_WORTH';
  if (/^Which is better/i.test(q)) return 'WHICH_BETTER';
  if (/^What is the difference/i.test(q)) return 'WHAT_DIFF';
  if (/^Do you need/i.test(q)) return 'DO_YOU_NEED';
  if (/^How important/i.test(q)) return 'HOW_IMPORTANT';
  if (/^What should/i.test(q)) return 'WHAT_SHOULD';
  return 'OTHER';
}

function getQTypeES(q) {
  if (/^¿Deberías elegir/i.test(q)) return 'SHOULD_CHOOSE';
  if (/^¿Recomendarías/i.test(q)) return 'WOULD_RECOMMEND';
  if (/^(¿Sería|¿Funcionaría|¿Es (el|la))/i.test(q)) return 'IS_THE';
  if (/^¿Son (los|las)/i.test(q)) return 'ARE_THE';
  if (/^¿Qué hace/i.test(q)) return 'WHAT_MAKES';
  if (/^¿Por qué/i.test(q)) return 'WHY_IS';
  if (/^¿Cómo se compara/i.test(q)) return 'HOW_DOES';
  if (/^¿Requiere/i.test(q)) return 'DOES_THE';
  if (/^¿Qué tipo de/i.test(q)) return 'WHAT_KIND';
  if (/^¿Cuántos/i.test(q)) return 'HOW_MANY';
  if (/^¿Vale la pena/i.test(q)) return 'IS_WORTH';
  if (/^¿Cuál tiene mejor/i.test(q)) return 'WHICH_BETTER';
  if (/^¿Qué .+ es mejor/i.test(q)) return 'WHICH_BETTER';
  if (/^¿Cuál es la diferencia/i.test(q)) return 'WHAT_DIFF';
  return 'OTHER';
}

function getProductsInGuide(g) {
  const names = [];
  if (g.featuredSnippet) {
    const keys = Object.keys(g.featuredSnippet).filter(k => /^faq_q\d+_en$/.test(k)).sort();
    keys.forEach(k => {
      const q = g.featuredSnippet[k] || '';
      let m;
      if ((m = /^Should you choose the (.+?)(?: as a| for |\?|$)/i.exec(q))) names.push(m[1].trim());
      else if ((m = /^What makes the (.+?) a great/i.exec(q))) names.push(m[1].trim());
      else if ((m = /^Why is the (.+?) recommended/i.exec(q))) names.push(m[1].trim());
      else if ((m = /^Would you recommend the (.+?)(?: as a| for |\?|$)/i.exec(q))) names.push(m[1].trim());
      else if ((m = /^Would the (.+?) be a good choice/i.exec(q))) names.push(m[1].trim());
      else if ((m = /^How does the (.+?) compare/i.exec(q))) names.push(m[1].trim());
      else if ((m = /^Is the (.+?)(?: a good| worth| the| \?|$)/i.exec(q))) names.push(m[1].trim());
      else if ((m = /^Are the (.+?) the /i.exec(q))) names.push(m[1].trim());
      else if ((m = /^Does the (.+?) require/i.exec(q))) names.push(m[1].trim());
      else if ((m = /^What kind of .+? benefits most from the (.+?)\?/i.exec(q))) names.push(m[1].trim());
      else if ((m = /^(.+?): Which one should/i.exec(q))) names.push(m[1].trim());
      else if ((m = /^(.+?) vs (.+?): Which/i.exec(q))) { names.push(m[1].trim()); names.push(m[2].trim()); }
      else if ((m = /^What is the difference between the (.+?) and the (.+?)/i.exec(q))) { names.push(m[1].trim()); names.push(m[2].trim()); }
      else if ((m = /^Which is better for .+? — the (.+?) or the (.+?)/i.exec(q))) { names.push(m[1].trim()); names.push(m[2].trim()); }
    });
  }
  return [...new Set(names)];
}

function cap(s) {
  if (!s) return s;
  if (/^[a-záéíóúñ]/i.test(s.charAt(0))) return s.charAt(0).toUpperCase() + s.slice(1);
  return s;
}

function genFullAnswer(type, prod, isES, position) {
  const isMain = position === 0;
  if (isES) {
    switch (type) {
      case 'SHOULD_CHOOSE':
        if (isMain) return `Sí, deberías elegir ${prod}. Es nuestra recomendación principal porque ofrece el mejor equilibrio entre calidad, rendimiento y valor para la mayoría de los usuarios.`;
        return `Sí, ${prod} es una opción sólida. Funciona bien para su uso específico y ofrece ventajas particulares si sus características se alinean con tus necesidades.`;
      case 'WOULD_RECOMMEND':
        if (isMain) return `Sí, recomendaría ${prod} sin dudas. Es una herramienta confiable con calidad consistente que satisface tanto a principiantes como a profesionales.`;
        return `Sí, recomendaría ${prod}. Es una buena opción para quienes buscan características específicas que este modelo ofrece mejor que otros.`;
      case 'IS_THE':
        if (isMain) return `Sí, ${prod} es una excelente elección. Se destaca por su calidad de construcción y rendimiento confiable, ideal para la mayoría de los usuarios.`;
        return `Sí, ${prod} cumple bien. Es adecuado para usos específicos donde sus puntos fuertes marcan la diferencia frente a otras opciones.`;
      case 'ARE_THE':
        if (isMain) return `${cap(prod)} son una opción destacada. Su popularidad en la industria se debe a su valor consistente y calidad que pocos competidores igualan.`;
        return `${cap(prod)} son una alternativa sólida. Ofrecen buen rendimiento para quienes buscan características específicas en esta categoría.`;
      case 'WHAT_MAKES':
        if (isMain) return `${cap(prod)} es nuestra mejor recomendación. Su combinación de calidad, durabilidad y rendimiento logra un equilibrio ideal para la mayoría.`;
        return `${cap(prod)} es una gran alternativa. Destaca en áreas específicas que lo convierten en la mejor opción para ciertos usuarios y aplicaciones.`;
      case 'WHY_IS':
      case 'WHY_HAS':
        if (isMain) return `Se recomienda ${prod} por su trayectoria comprobada y su estatus como referencia en la industria, cumpliendo consistentemente año tras año.`;
        return `${cap(prod)} es recomendado por su rendimiento especializado en áreas donde otros modelos no llegan, ideal para necesidades concretas.`;
      case 'HOW_DOES':
        if (isMain) return `${cap(prod)} se destaca como líder en su categoría. Su construcción sólida y rendimiento confiable lo ponen por encima de la competencia en su rango de precio.`;
        return `${cap(prod)} ofrece una propuesta distinta. Se enfoca en áreas especializadas donde rinde excepcionalmente bien.`;
      case 'DOES_THE':
        return `${cap(prod)} funciona con equipos estándar. Está diseñado para integrarse fácilmente en cualquier configuración de estudio sin accesorios especiales.`;
      case 'WHAT_KIND':
        return `${cap(prod)} beneficia a usuarios que buscan resultados profesionales sin complicaciones técnicas, adecuado tanto para principiantes como para veteranos.`;
      case 'HOW_MANY':
        return `${cap(prod)} ofrece opciones versátiles. Su flexibilidad lo hace útil en múltiples contextos, desde grabación básica hasta producción avanzada.`;
      case 'IS_WORTH':
        return `Depende de tus necesidades. ${cap(prod)} justifica su precio si trabajarás regularmente con sus funciones, pero para usos esporádicos hay opciones más económicas.`;
      case 'WHICH_BETTER':
        return `Ambos son excelentes, pero la mejor elección depende de tus prioridades. Evalúa qué características importan más para tu flujo de trabajo antes de decidir.`;
      case 'WHAT_DIFF':
        return `La principal diferencia es que cada fabricante prioriza aspectos distintos. Un modelo se enfoca en ciertas cualidades mientras el otro destaca en áreas diferentes.`;
      default:
        return `${cap(prod)} es una opción sólida. La mejor decisión depende de tus necesidades específicas y presupuesto.`;
    }
  } else {
    switch (type) {
      case 'SHOULD_CHOOSE':
        if (isMain) return `Yes, you should choose the ${prod}. It's our top recommendation for most users because it offers the best overall balance of quality, performance, and value.`;
        return `Yes, the ${prod} is a solid option. It performs well for its intended use case and offers distinct advantages if its specific strengths match what you need.`;
      case 'WOULD_RECOMMEND':
        if (isMain) return `Yes, I would recommend the ${prod} without hesitation. It's a reliable tool with consistent quality that satisfies both beginners and professionals.`;
        return `Yes, I would recommend the ${prod}. It's a good choice for those seeking specific features that this model handles better than others.`;
      case 'IS_THE':
        if (isMain) return `Yes, the ${prod} is an excellent choice. It stands out for its build quality and reliable performance, making it ideal for most users.`;
        return `Yes, the ${prod} delivers well. It suits specific use cases where its strengths make a real difference compared to other options.`;
      case 'ARE_THE':
        if (isMain) return `The ${prod} is a standout choice. Their industry popularity comes from consistent value and quality that few competitors match.`;
        return `The ${prod} is a solid alternative. They offer good performance for those seeking specific features in this category.`;
      case 'WHAT_MAKES':
        if (isMain) return `The ${prod} is our top recommendation. Its combination of quality, durability, and performance achieves an ideal balance for most users.`;
        return `The ${prod} is a great alternative. It excels in specific areas that make it the best choice for certain users and applications.`;
      case 'WHY_IS':
      case 'WHY_HAS':
        if (isMain) return `The ${prod} is recommended because its proven track record and industry reference status deliver consistent results year after year.`;
        return `The ${prod} is recommended for its specialized performance in areas where other models fall short, ideal for specific needs.`;
      case 'HOW_DOES':
        if (isMain) return `The ${prod} stands out as a leader in its category. Its solid construction and reliable performance put it ahead of the competition in its price range.`;
        return `The ${prod} offers a distinct proposition. It focuses on specialized areas where it performs exceptionally well.`;
      case 'DOES_THE':
        return `The ${prod} works with standard equipment. It is designed to integrate easily into any existing studio setup without special accessories.`;
      case 'WHAT_KIND':
        return `The ${prod} benefits users who seek professional results without technical complications, suitable for both beginners and veterans.`;
      case 'HOW_MANY':
        return `The ${prod} offers versatile options. Its flexibility makes it useful across multiple contexts, from basic recording to advanced production.`;
      case 'IS_WORTH':
        return `It depends on your needs. The ${prod} justifies its price if you regularly work with its features, but for occasional use there are more economical options.`;
      case 'WHICH_BETTER':
        return `Both are excellent, but the best choice depends on your priorities. Evaluate which features matter most for your workflow before deciding.`;
      case 'WHAT_DIFF':
        return `The main difference is that each manufacturer prioritizes different aspects. One model focuses on certain qualities while the other excels in different areas.`;
      default:
        return `The ${prod} is a solid choice. The best decision depends on your specific needs and budget.`;
    }
  }
}

function extractSuffix(a) {
  let m;
  if ((m = a.match(/Priced at \$[\d,]+\.?\d*.*?user rating[^.]*\.?/i))) return ' ' + m[0].replace(/\.$/, '') + '.';
  if ((m = a.match(/Con un precio de \$[\d,]+\.?\d*.*?calificación de[^.]*\.?/i))) return ' ' + m[0].replace(/\.$/, '') + '.';
  return '';
}

// Old template markers — these identify answers that were generated by the PREVIOUS
// version of fix-faq-overlap.js and need position-based replacement.
const OLD_TEMPLATE_MARKERS_EN = [
  /if your priority is reliable performance/i,
  /it is a reliable tool for those seeking consistent quality/i,
  /consider your specific workflow, as it performs better for certain styles/i,
  /their industry popularity is no coincidence/i,
  /its combination of quality, durability, and performance achieves a balance/i,
  /its proven track record makes it an industry reference/i,
  /it competes directly with the/i,
  /it compares well to other options thanks to its solid construction/i,
  /evaluate whether its features align with your specific needs/i
];

const OLD_TEMPLATE_MARKERS_ES = [
  /si tu prioridad es rendimiento confiable/i,
  /es una herramienta confiable para quienes buscan calidad consistente/i,
  /considera tu flujo de trabajo específico, ya que funciona mejor para ciertos estilos/i,
  /su popularidad en la industria no es casualidad/i,
  /su combinación de calidad, durabilidad y rendimiento logra un equilibrio/i,
  /es una referencia en la industria porque cumple año tras año/i,
  /compite directamente con/i,
  /se compara bien con otras opciones gracias a su construcción sólida/i,
  /evalúa si sus características se alinean con tus necesidades específicas/i,
  /para usos muy especializados, considera otras opciones del mercado/i
];

// Detect answers that have incorrect contracted articles from old buggy getProd
const BAD_ARTICLE_ES = /^Del\s|^De la\s|^De los\s|^De las\s/i;

function isOldTemplate(answer, markers, isES) {
  const plain = strip(answer);
  if (isES && BAD_ARTICLE_ES.test(plain)) return true;
  for (const marker of markers) {
    if (marker.test(plain)) return true;
  }
  return false;
}

let rewritten = { en: 0, es: 0 };
let skipped = { en: 0, es: 0 };

guides.forEach(g => {
  if (!g.featuredSnippet || !g.sections) return;
  const allProds = getProductsInGuide(g);
  const prodPosition = {};
  allProds.forEach((p, idx) => { prodPosition[cleanProdName(p).toLowerCase()] = idx; });
  const keys = Object.keys(g.featuredSnippet).filter(k => /^faq_q\d+_en$/.test(k)).sort();
  const isVs = /vs-/i.test(g.id);

  keys.forEach(k => {
    const num = k.match(/\d+/)[0];
    const qEn = g.featuredSnippet[k] || '';
    const qEs = g.featuredSnippet['faq_q' + num + '_es'] || '';
    let aEn = g.featuredSnippet['faq_a' + num + '_en'] || '';
    let aEs = g.featuredSnippet['faq_a' + num + '_es'] || '';
    if (!aEn && !aEs) return;

    const typeEn = getQType(qEn);
    const typeEs = getQTypeES(qEs);

    // Skip vs-guide questions that use natural language comparison (already unique)
    if (isVs && /^(WHICH_BETTER|WHAT_DIFF|IS_WORTH)$/.test(typeEn)) {
      skipped.en++;
      skipped.es++;
      return;
    }

    // English
    if (aEn && isOldTemplate(aEn, OLD_TEMPLATE_MARKERS_EN, false)) {
      const raw = getProd(qEn) || '';
      const prod = cleanProdName(raw);
      const pos = prodPosition[prod.toLowerCase()] !== undefined ? prodPosition[prod.toLowerCase()] : 0;
      const ans = genFullAnswer(typeEn, prod, false, pos);
      const suffix = extractSuffix(aEn);
      g.featuredSnippet['faq_a' + num + '_en'] = ans + suffix;
      rewritten.en++;
    }

    // Spanish
    if (aEs && isOldTemplate(aEs, OLD_TEMPLATE_MARKERS_ES, true)) {
      const raw = getProd(qEs) || getProd(qEn) || '';
      const prod = cleanProdName(raw);
      // For position lookup, use the EN product name (without article)
      const prodEN = cleanProdName(getProd(qEn) || '');
      const pos = prodPosition[prodEN.toLowerCase()] !== undefined ? prodPosition[prodEN.toLowerCase()] : 0;
      const ans = genFullAnswer(typeEs, prod, true, pos);
      const suffix = extractSuffix(aEs);
      g.featuredSnippet['faq_a' + num + '_es'] = ans + suffix;
      rewritten.es++;
    }
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log(`Rewritten: ${rewritten.en} EN + ${rewritten.es} ES = ${rewritten.en + rewritten.es} total`);
console.log(`Skipped (vs-guides): ${skipped.en} EN + ${skipped.es} ES`);
