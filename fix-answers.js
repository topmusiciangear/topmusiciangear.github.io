const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

function fixAnswers(g) {
  if (!g.featuredSnippet) return;
  const keys = Object.keys(g.featuredSnippet).filter(k => /^faq_q\d+_en$/.test(k)).sort();

  keys.forEach(k => {
    const num = k.match(/\d+/)[0];
    const qEn = g.featuredSnippet[k];
    const qEs = g.featuredSnippet['faq_q' + num + '_es'] || '';
    let aEn = g.featuredSnippet['faq_a' + num + '_en'] || '';
    let aEs = g.featuredSnippet['faq_a' + num + '_es'] || '';

    if (!aEn && !aEs) return;

    // Detect product name from question
    const prodEn = cleanProdName(extractProduct(qEn, 'en'));
    const prodEs = cleanProdName(extractProduct(qEs, 'es'));

    // Fix English answer
    aEn = fixAnswer(qEn, aEn, prodEn, 'en');
    // Fix Spanish answer
    aEs = fixAnswer(qEs, aEs, prodEs, 'es');

    g.featuredSnippet['faq_a' + num + '_en'] = aEn;
    g.featuredSnippet['faq_a' + num + '_es'] = aEs;
  });
}

function extractProduct(q, lang) {
  if (!q) return '';
  // Extract product from "Should you choose the X..."
  let m;
  if ((m = /^Should you choose the (.+?)(?: as a| for |\?|$)/i.exec(q))) return m[1].trim();
  if ((m = /^What makes the (.+?) a great/i.exec(q))) return m[1].trim();
  if ((m = /^Why is the (.+?) recommended/i.exec(q))) return m[1].trim();
  if ((m = /^Would you recommend the (.+?)(?: as a| for |\?|$)/i.exec(q))) return m[1].trim();
  if ((m = /^Would the (.+?) be a good choice/i.exec(q))) return m[1].trim();
  if ((m = /^How does the (.+?) compare/i.exec(q))) return m[1].trim();
  if ((m = /^Is the (.+?)(?: a good| worth| the|$)/i.exec(q))) return m[1].trim();
  if ((m = /^Why has the (.+?) remained/i.exec(q))) return m[1].trim();
  // vs-guide patterns
  if ((m = /^(.+?): Which one should/i.exec(q))) return m[1].trim();
  if ((m = /^What is the difference between the (.+?) and the/i.exec(q))) return m[1].trim();
  if ((m = /^Which is better for (.+?) — the (.+?) or the/i.exec(q))) return m[2].trim();
  // Spanish
  if ((m = /^¿Deberías elegir (el|la|los|las) (.+?)(?: como| para| \?|$)/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Qué hace (del?|de la|de los|de las) (.+?) una/i.exec(q))) return m[2].trim();
  if ((m = /^¿Por qué se recomienda (el|la|los|las) (.+?) para/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿(Recomendarías|Sería) (el|la|los|las) (.+?)(?: como| una| para| \?|$)/i.exec(q))) return m[2] + ' ' + (m[3]||'');
  if ((m = /^¿Cómo se compara (el|la|los|las) (.+?) con/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Es (el|la|los|las) (.+?)(?: una| el| la| \?|$)/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Sigue (el|la|los|las) (.+?) Siendo/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^Are the (.+?) the /i.exec(q))) return m[1].trim();
  if ((m = /^¿Son (los|las) (.+?)(?: los| las| para| \?|$)/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Funcionaría (el|la|los|las) (.+?) como/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Qué tipo de vocalista se beneficia más de (el|la|los|las) (.+?)(?:\?|$)/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  if ((m = /^¿Requiere (el|la|los|las) (.+?) (?:equipo|algún)/i.exec(q))) return (m[1] + ' ' + m[2]).trim();
  return '';
}

function cleanProdName(name) {
  if (!name) return name;
  return name.replace(/\s+All-Rounder\s+Guitar\s*$/i, '').trim();
}

function fixAnswer(q, a, prod, lang) {
  if (!q || !a) return a;
  const isES = lang === 'es';

  // Strip HTML tags for idempotency checks (build-guides may have added <strong>)
  const plain = a.replace(/<[^>]+>/g, '');
  const startPlain = plain.substring(0, 80);
    if (isES) {
      if (/^(Sí(?=\W|$)|No[,.;:!?]|Absolutamente\b|Claramente\b|Depende\b)/i.test(plain)) return a;
    if (/^Se recomienda\b/i.test(plain)) return a;
    if (/^(Ambos|Tanto)\b/i.test(plain)) return a;
    if (/^(La principal diferencia|La diferencia principal)\b/i.test(plain)) return a;
    if (/ es una gran opción\. /i.test(startPlain)) return a;
    if (/ son una gran opción\. /i.test(startPlain)) return a;
    if (/ se destaca\. /i.test(startPlain)) return a;
  } else {
    if (/^(Yes\b|No[,.;:!?]|Absolutely\b|Depends\b|Definitely\b)/i.test(plain)) return a;
    if (/^(It depends|Both are|Both the|Both of these|The main difference|Yes, I would recommend)/i.test(plain)) return a;
    if (/ makes a great choice\. /i.test(startPlain)) return a;
    if (/ is recommended because /i.test(startPlain)) return a;
    if (/ stands out\. /i.test(startPlain)) return a;
  }

  // Vs-guide Q1: "X vs Y: Which one should you choose?" — already direct
  if (/which one should you choose/i.test(q)) return a;
  // Vs-guide Q1 ES
  if (/¿Cuál deberías elegir/i.test(q)) return a;

  // Classify question type
  let type = 'OTHER';
  if (/^Should you choose/i.test(q)) type = 'SHOULD_CHOOSE';
  else if (/^¿Deberías elegir/i.test(q)) type = 'SHOULD_CHOOSE';
  else if (/^What makes/i.test(q)) type = 'WHAT_MAKES';
  else if (/^¿Qué hace/i.test(q)) type = 'WHAT_MAKES';
  else if (/^Why is/i.test(q)) type = 'WHY_IS';
  else if (/^Why has/i.test(q)) type = 'WHY_HAS';
  else if (/^¿Por qué/i.test(q)) type = 'WHY_IS';
  else if (/^Would you recommend/i.test(q)) type = 'WOULD_RECOMMEND';
  else if (/^¿Recomendarías/i.test(q)) type = 'WOULD_RECOMMEND';
  else if (/^Would the/i.test(q)) type = 'WOULD_THE';
  else if (/^How does/i.test(q)) type = 'HOW_DOES';
  else if (/^¿Cómo se compara/i.test(q)) type = 'HOW_DOES';
  else if (/^Is the.*worth/i.test(q)) type = 'IS_WORTH';
  else if (/^¿Vale la pena/i.test(q)) type = 'IS_WORTH';
  else if (/^Is the/i.test(q)) type = 'IS_THE';
  else if (/^¿Es (el|la)/i.test(q)) type = 'IS_THE';
  else if (/^¿Sería/i.test(q)) type = 'WOULD_THE';
  else if (/^¿Funcionaría/i.test(q)) type = 'WOULD_THE';
  else if (/^Sigue/i.test(q)) type = 'SIGUE';
  else if (/^¿Sigue/i.test(q)) type = 'SIGUE';
  else if (/^What is the difference/i.test(q)) type = 'WHAT_DIFF';
  else if (/^¿Cuál es la diferencia/i.test(q)) type = 'WHAT_DIFF';
  else if (/^Which is better/i.test(q)) type = 'WHICH_BETTER';
  else if (/^Which \w+ is better/i.test(q)) type = 'WHICH_BETTER';
  else if (/^¿Cu(ál|á) tiene mejor/i.test(q)) type = 'WHICH_BETTER';
  else if (/^¿Qué \w+ es mejor/i.test(q)) type = 'WHICH_BETTER';
  else if (/^¿Qué (tipo|clase) de/i.test(q)) type = 'WHAT_KIND';
  else if (/^¿Requiere (el|la)/i.test(q)) type = 'DOES_THE';
  else if (/^Are the/i.test(q)) type = 'ARE_THE';
  else if (/^¿Son (los|las)/i.test(q)) type = 'ARE_THE';
  else if (/^Do you need/i.test(q)) type = 'DO_YOU_NEED';
  else if (/^How important/i.test(q)) type = 'HOW_IMPORTANT';
  else if (/^What should/i.test(q)) type = 'WHAT_SHOULD';
  else if (/^Does the/i.test(q)) type = 'DOES_THE';
  else if (/^What kind of/i.test(q)) type = 'WHAT_KIND';
  else if (/^Would you choose/i.test(q)) type = 'SHOULD_CHOOSE';
  else if (/^Which.*easier/i.test(q)) type = 'OTHER'; // custom Q5 already good
  else if (/^What should/i.test(q)) type = 'WHAT_SHOULD';
  else if (/^Does the/i.test(q)) type = 'DOES_THE';
  else if (/^What kind of/i.test(q)) type = 'WHAT_KIND';
  else if (/^Would you choose/i.test(q)) type = 'SHOULD_CHOOSE';

  // Get the useful part of the answer (remove leading sentence if it's fluff)
  let useful = a;

  switch (type) {
    case 'SHOULD_CHOOSE':
      if (isES) {
        const article = /^el\b/i.test(prod) ? 'El' : /^la\b/i.test(prod) ? 'La' : 'El';
        useful = `Sí, deberías elegir ${prod}. ` + capitalize(a);
        useful = useful.replace(/\. (El|La|Los|Las) /, '. ');
      } else {
        useful = `Yes, you should choose the ${prod}. ` + capitalize(a);
        useful = useful.replace(/\. (The|A|An) /, '. ');
      }
      break;

    case 'WHAT_MAKES':
      if (isES) {
        useful = `${capitalize(prod)} es una gran opción. ` + capitalize(a);
      } else {
        useful = `The ${prod} makes a great choice. ` + capitalize(a);
      }
      break;

    case 'WHY_IS':
    case 'WHY_HAS':
      if (isES) {
        useful = `Se recomienda ${prod} porque ` + lcfirst(capitalize(a));
      } else {
        useful = `The ${prod} is recommended because ` + lcfirst(capitalize(a));
      }
      break;

    case 'WOULD_RECOMMEND':
      if (isES) {
        useful = `Sí, recomendaría ${prod}. ` + capitalize(a);
      } else {
        useful = `Yes, I would recommend the ${prod}. ` + capitalize(a);
      }
      break;

    case 'WOULD_THE':
      if (isES) {
        useful = `Sí, ${prod} es una buena elección. ` + capitalize(a);
      } else {
        useful = `Yes, the ${prod} is a good choice. ` + capitalize(a);
      }
      break;

    case 'HOW_DOES':
      if (isES) {
        useful = `${capitalize(prod)} se destaca. ` + capitalize(a);
      } else {
        useful = `The ${prod} stands out. ` + capitalize(a);
      }
      break;

    case 'IS_THE':
      if (isES) {
        if (!/^(Sí|No|Depende)/i.test(a)) {
          useful = `Sí, ${prod} es una buena opción. ` + capitalize(a);
        }
      } else {
        if (!/^(Yes|No|Depends)/i.test(a)) {
          useful = `Yes, the ${prod} is a solid choice. ` + capitalize(a);
        }
      }
      break;

    case 'WHAT_DIFF':
      if (isES) {
        if (!/^La (principal )?diferencia/i.test(a)) {
          useful = `La principal diferencia es que ` + lcfirst(capitalize(a));
        }
      } else {
        if (!/^The (main )?difference/i.test(a)) {
          useful = `The main difference is that ` + lcfirst(capitalize(a));
        }
      }
      break;

    case 'WHICH_BETTER':
      if (isES) {
        if (!/^(Tanto|Ambos)/i.test(a)) {
          useful = `Ambos son excelentes, pero ` + lcfirst(capitalize(a));
        }
      } else {
        if (!/^Both/i.test(a)) {
          useful = `Both are excellent, but ` + lcfirst(capitalize(a));
        }
      }
      break;

    case 'IS_WORTH':
      if (isES) {
        if (!/^(Sí|No|Depende|Vale)/i.test(a)) {
          useful = `Depende de tus necesidades. ` + capitalize(a);
        }
      } else {
        if (!/^(Yes|No|Depends|It depends)/i.test(a)) {
          useful = `It depends on your needs. ` + capitalize(a);
        }
      }
      break;

    case 'SIGUE':
      if (!/^(Sí|No)/i.test(a)) {
        useful = `Sí, ${prod} sigue siendo una excelente opción. ` + capitalize(a);
      }
      break;

    case 'ARE_THE':
      if (isES) {
        useful = `${capitalize(prod)} son una gran opción. ` + capitalize(a);
      } else {
        useful = `The ${prod} is a great choice. ` + capitalize(a);
      }
      break;

    default:
      // OTHER: keep as-is if it answers directly, prefix if it doesn't
      break;
  }

  // Clean up double punctuation and spacing
  useful = useful
    .replace(/\. \./g, '. ')
    .replace(/\.\./g, '.')
    .replace(/\s{2,}/g, ' ')
    .replace(/\. ,/g, ',')
    .trim();

  if (!useful.endsWith('.') && !useful.endsWith('?') && !useful.endsWith('!')) useful += '.';

  return useful;
}

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function lcfirst(s) {
  if (!s) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}

// Process all guides
guides.forEach(g => fixAnswers(g));

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Fixed all FAQ answers to be direct responses');
