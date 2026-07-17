const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8').replace(/^\ufeff/, ''));

function strip(s) { return (s || '').replace(/<[^>]+>/g, '').trim(); }

function getSectionTexts(g) {
  const en = [], es = [];
  (g.sections || []).forEach(s => {
    if (s.heading) en.push(strip(s.heading));
    if (s.content) en.push(strip(s.content));
    if (s.heading_es) es.push(strip(s.heading_es));
    if (s.content_es) es.push(strip(s.content_es));
  });
  return { en, es };
}

function bodyOverlapsSections(body, sectionTexts) {
  const b = body.toLowerCase();
  for (const st of sectionTexts) {
    const s = st.toLowerCase();
    if (b.length < 25) continue;
    let best = 0;
    for (let i = 0; i + 25 <= b.length && i < 200; i++) {
      for (let j = i + 25; j <= Math.min(i + 100, b.length); j++) {
        const sub = b.substring(i, j);
        if (s.includes(sub) && sub.length > best) best = sub.length;
      }
    }
    if (best > Math.min(b.length * 0.35, 50)) return true;
  }
  return false;
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

function findAlt(currentProd, allProds) {
  const alt = allProds.filter(p => p.toLowerCase() !== currentProd.toLowerCase());
  return alt.length > 0 ? alt[Math.floor(Math.random() * alt.length)] : null;
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
  if ((m = /^¿(?:Deberías elegir|Recomendarías) (?:el|la|los|las) (.+?)(?: como| para| \?|$)/i.exec(q))) return m[1].trim();
  if ((m = /^¿(?:Sería|Funcionaría) (?:el|la|los|las) (.+?)(?: como| una| \?|$)/i.exec(q))) return m[1].trim();
  if ((m = /^¿Es (?:el|la|los|las) (.+?)(?: una| el| la| \?|$)/i.exec(q))) return m[1].trim();
  if ((m = /^¿Son (?:los|las) (.+?)(?: los| las| para| \?|$)/i.exec(q))) return m[1].trim();
  if ((m = /^¿Qué hace (?:del?|de la|de los|de las) (.+?) una/i.exec(q))) return m[1].trim();
  if ((m = /^¿Por qué se recomienda (?:el|la|los|las) (.+?) para/i.exec(q))) return m[1].trim();
  if ((m = /^¿Cómo se compara (?:el|la|los|las) (.+?) con/i.exec(q))) return m[1].trim();
  if ((m = /^¿Requiere (?:el|la|los|las) (.+?)(?: equipo|algún)/i.exec(q))) return m[1].trim();
  if ((m = /^¿Qué tipo de .+? se beneficia más de (?:el|la|los|las) (.+?)(?:\?|$)/i.exec(q))) return m[1].trim();
  if ((m = /^¿Cuántos .+? ofrece (?:el|la|los|las) (.+?)(?:\?|$)/i.exec(q))) return m[1].trim();
  return '';
}

function cap(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Returns answer matching fix-answers.js prefix format exactly
function genFullAnswer(type, prod, alt, isES) {
  if (isES) {
    switch (type) {
      case 'SHOULD_CHOOSE': {
        if (alt) return `Sí, deberías elegir ${prod}. Si tu prioridad es rendimiento confiable, ${prod} es ideal. ${cap(alt)} es una alternativa sólida, pero para la mayoría ${prod} ofrece el mejor equilibrio.`;
        return `Sí, deberías elegir ${prod}. Evalúa si sus características se alinean con tus necesidades específicas. Para usos muy especializados, considera otras opciones del mercado.`;
      }
      case 'WOULD_RECOMMEND':
        return `Sí, recomendaría ${prod}. Es una herramienta confiable para quienes buscan calidad consistente. No es ideal para todos los escenarios, pero para la mayoría de músicos cumple bien.`;
      case 'IS_THE':
        return `Sí, ${prod} es una buena elección. Considera tu flujo de trabajo específico, ya que funciona mejor para ciertos estilos y aplicaciones que para otros.`;
      case 'ARE_THE':
        return `${cap(prod)} son una gran opción. Su popularidad en la industria no es casualidad, ofrecen un valor consistente que pocos competidores igualan.`;
      case 'WHAT_MAKES':
        return `${cap(prod)} es una gran opción. Su combinación de calidad, durabilidad y rendimiento logra un equilibrio que satisface tanto a principiantes como a profesionales.`;
      case 'WHY_IS':
      case 'WHY_HAS':
        return `Se recomienda ${prod} por su trayectoria comprobada. Es una referencia en la industria porque cumple año tras año sin sorpresas desagradables.`;
      case 'HOW_DOES': {
        if (alt) return `${cap(prod)} se destaca. Compite directamente con ${alt} — ${cap(prod)} ofrece ventajas en ciertas áreas, mientras que ${alt} destaca en otras. La elección depende de tus prioridades.`;
        return `${cap(prod)} se destaca. Se compara bien con otras opciones gracias a su construcción sólida y rendimiento confiable donde otros modelos comprometen.`;
      }
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
    // English
    switch (type) {
      case 'SHOULD_CHOOSE': {
        if (alt) return `Yes, you should choose the ${prod}. If your priority is reliable performance, the ${prod} delivers. The ${alt} is a solid alternative, but for most users the ${prod} offers the best balance.`;
        return `Yes, you should choose the ${prod}. Evaluate whether its features align with your specific needs. For specialized use cases, consider other options on the market.`;
      }
      case 'WOULD_RECOMMEND':
        return `Yes, I would recommend the ${prod}. It is a reliable tool for those seeking consistent quality. Not ideal for every scenario, but for most musicians it delivers well.`;
      case 'IS_THE':
        return `Yes, the ${prod} is a good choice. Consider your specific workflow, as it performs better for certain styles and applications than others.`;
      case 'ARE_THE':
        return `The ${prod} is a great choice. Their industry popularity is no coincidence, they offer consistent value that few competitors match.`;
      case 'WHAT_MAKES':
        return `The ${prod} makes a great choice. Its combination of quality, durability, and performance achieves a balance that satisfies both beginners and demanding professionals.`;
      case 'WHY_IS':
      case 'WHY_HAS':
        return `The ${prod} is recommended because its proven track record makes it an industry reference that delivers reliably year after year.`;
      case 'HOW_DOES': {
        if (alt) return `The ${prod} stands out. It competes directly with the ${alt} — the ${prod} offers advantages in certain areas, while the ${alt} excels in others. The choice depends on your priorities.`;
        return `The ${prod} stands out. It compares well to other options thanks to its solid construction and reliable performance where other models compromise.`;
      }
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

let totalOverlap = { en: 0, es: 0 };
let rewritten = { en: 0, es: 0 };

guides.forEach(g => {
  if (!g.featuredSnippet || !g.sections) return;
  const sect = getSectionTexts(g);
  const allProds = getProductsInGuide(g);
  const keys = Object.keys(g.featuredSnippet).filter(k => /^faq_q\d+_en$/.test(k)).sort();

  keys.forEach(k => {
    const num = k.match(/\d+/)[0];
    const qEn = g.featuredSnippet[k] || '';
    const qEs = g.featuredSnippet['faq_q' + num + '_es'] || '';
    let aEn = g.featuredSnippet['faq_a' + num + '_en'] || '';
    let aEs = g.featuredSnippet['faq_a' + num + '_es'] || '';
    if (!aEn && !aEs) return;

    const typeEn = getQType(qEn);
    const typeEs = getQTypeES(qEs);

    const getBody = (a) => {
      const s = strip(a);
      const dot = s.indexOf('. ');
      if (dot > 0 && dot < 120) return s.substring(dot + 2);
      return s;
    };

    const isVs = /vs-/i.test(g.id);

    const bodyEn = getBody(aEn);
    if (bodyEn.length > 30 && bodyOverlapsSections(bodyEn, sect.en)) {
      totalOverlap.en++;
      if (!(isVs && /^(WHICH_BETTER|WHAT_DIFF|IS_WORTH)$/.test(typeEn))) {
        const prod = getProd(qEn) || '';
        const alt = findAlt(prod, allProds);
        const ans = genFullAnswer(typeEn, prod, alt, false);
        let suffix = '';
        const sm = aEn.match(/(Priced at \$[^.]+\..*?user rating\.?)/i);
        if (sm) suffix = ' ' + sm[1];
        g.featuredSnippet['faq_a' + num + '_en'] = ans + suffix;
        rewritten.en++;
      }
    }

    const bodyEs = getBody(aEs);
    if (bodyEs.length > 30 && bodyOverlapsSections(bodyEs, sect.es)) {
      totalOverlap.es++;
      if (!(isVs && /^(WHICH_BETTER|WHAT_DIFF|IS_WORTH)$/.test(typeEn))) {
        const prod = getProd(qEs) || getProd(qEn) || '';
        const alt = findAlt(prod, allProds);
        const ans = genFullAnswer(typeEs, prod, alt, true);
        let suffix = '';
        const sm = aEs.match(/(Con un precio de \$[^.]+\..*?calificación de [\d.]+?\/\d+?\.?)/i);
        if (sm) suffix = ' ' + sm[1];
        g.featuredSnippet['faq_a' + num + '_es'] = ans + suffix;
        rewritten.es++;
      }
    }
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log(`Overlap detected: ${totalOverlap.en} EN + ${totalOverlap.es} ES`);
console.log(`Rewritten: ${rewritten.en} EN + ${rewritten.es} ES = ${rewritten.en + rewritten.es} total`);
