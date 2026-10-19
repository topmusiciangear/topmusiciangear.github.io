const fs = require('fs');
const path = require('path');

const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));

const productMap = new Map();
for (const p of products) {
  productMap.set(p.id, p);
}

function generateVerdict(guide, productList, lang, seed) {
  const isEs = lang === 'es';
  if (productList.length === 0) return '';
  const sorted = [...productList].sort((a, b) => (b.score || 0) - (a.score || 0));

  if (sorted.length === 1) {
    const p = sorted[0];
    const phrases = isEs ? [
      `${p.title} es la opción que recomiendo sin dudar.`,
      `Si buscas lo mejor, ${p.title} es la respuesta.`,
      `${p.title} destaca por encima del resto.`,
      `Para mí, ${p.title} es la mejor compra posible.`,
    ] : [
      `${p.title} is the one I'd recommend without hesitation.`,
      `If you want the best, ${p.title} is the answer.`,
      `${p.title} stands above the rest.`,
      `For me, ${p.title} is the best buy possible.`,
    ];
    return phrases[seed % phrases.length];
  }

  if (sorted.length === 2) {
    const [first, second] = sorted;
    const templates = isEs ? [
      `${first.title} es mi favorita, pero ${second.title} tiene su encanto. Depende de lo que valores más.`,
      `Entre ${first.title} y ${second.title}, me quedo con ${first.title}. Pero ${second.title} no se queda atrás.`,
      `${first.title} gana por poco, aunque ${second.title} es una alternativa seria.`,
      `Si me apuras, ${first.title}. Pero ${second.title} también merece la pena.`,
      `La diferencia entre ${first.title} y ${second.title} es mínima. Yo iría a por ${first.title}.`,
    ] : [
      `Between ${first.title} and ${second.title}, I'd go with ${first.title}. But ${second.title} has its charm.`,
      `${first.title} edges it for me, though ${second.title} is a serious contender.`,
      `It's close between ${first.title} and ${second.title}, but ${first.title} gets my vote.`,
      `If you push me, ${first.title}. But ${second.title} is worth a look too.`,
      `The gap between ${first.title} and ${second.title} is tiny. I'd pick ${first.title}.`,
    ];
    return templates[seed % templates.length];
  }

  const topPick = sorted[0];
  const second = sorted[1];
  const rest = sorted.slice(2);

  let verdict = '';

  const openers = isEs ? [
    `He probado todos estos y la verdad es que ${topPick.title} destaca por encima del resto.`,
    `Después de compararlos, ${topPick.title} es la que más me convence.`,
    `Si tuviera que quedarme con una, sería ${topPick.title}.`,
    `De todos estos, ${topPick.title} es la que recomendaría primero.`,
    `La clara ganadora aquí es ${topPick.title}.`,
    `Sin dudarlo, ${topPick.title} es la mejor opción de esta lista.`,
    `Me quedo con ${topPick.title} por encima de todas.`,
    `${topPick.title} es la que me llevaría a casa.`,
  ] : [
    `I've tested all of these and honestly, ${topPick.title} stands above the rest.`,
    `After comparing them all, ${topPick.title} is the one that wins me over.`,
    `If I had to pick one, it'd be ${topPick.title}.`,
    `Of all these, ${topPick.title} is the one I'd recommend first.`,
    `The clear winner here is ${topPick.title}.`,
    `Without hesitation, ${topPick.title} is the best option on this list.`,
    `I'd take ${topPick.title} over all the others.`,
    `${topPick.title} is the one I'd bring home.`,
  ];
  verdict += openers[seed % openers.length] + ' ';

  if (second) {
    const secondPhrases = isEs ? [
      `${second.title} le sigue de cerca, es una alternativa muy sólida.`,
      `${second.title} no se queda atrás, es casi tan buena como la primera.`,
      `${second.title} es la segunda mejor opción, sin duda.`,
      `Justo detrás va ${second.title}, que también es excelente.`,
      `${second.title} merece mucho la pena también.`,
    ] : [
      `${second.title} is right behind it, a very solid alternative.`,
      `${second.title} isn't far behind, almost as good as the first.`,
      `${second.title} is the second best option, no doubt.`,
      `Right behind is ${second.title}, which is also excellent.`,
      `${second.title} is absolutely worth considering too.`,
    ];
    verdict += secondPhrases[(seed + 1) % secondPhrases.length] + ' ';
  }

  if (rest.length > 0) {
    const restNames = rest.map(p => p.title).join(', ');
    if (rest.length <= 3) {
      const restPhrases = isEs ? [
        `También están ${restNames}, que son opciones válidas.`,
        `No olvidemos ${restNames}, que también cumplen.`,
        `${restNames} completan la lista con buenas prestaciones.`,
        `Y luego están ${restNames}, que no están nada mal.`,
      ] : [
        `Also there's ${restNames}, which are solid options.`,
        `Don't forget about ${restNames}, which also deliver.`,
        `${restNames} round out the list with good features.`,
        `And then there's ${restNames}, which aren't bad at all.`,
      ];
      verdict += restPhrases[(seed + 2) % restPhrases.length];
    } else {
      const restPhrases = isEs ? [
        `El resto (${restNames}) son opciones más que correctas para diferentes presupuestos.`,
        `Los demás (${restNames}) cubren todos los rangos de precio.`,
        `Y luego están ${restNames}, que son opciones válidas según lo que busques.`,
        `Completan la lista ${restNames}, cada una con sus puntos fuertes.`,
      ] : [
        `The rest (${restNames}) are more than solid options for different budgets.`,
        `The others (${restNames}) cover every price range.`,
        `And then there's ${restNames}, which are valid options depending on what you need.`,
        `Rounding out the list are ${restNames}, each with their strengths.`,
      ];
      verdict += restPhrases[(seed + 2) % restPhrases.length];
    }
  }

  return verdict;
}

function generateConclusion(guide, productList, lang, seed) {
  const isEs = lang === 'es';
  if (productList.length === 0) return '';
  const sorted = [...productList].sort((a, b) => (b.score || 0) - (a.score || 0));

  const topPick = sorted[0];
  const rest = sorted.slice(1);

  const concStarters = isEs ? [
    'En resumen:', 'Mi elección:', 'Si comprara hoy:', 'La versión corta:',
    'Lo que haría:', 'Mi recomendación:', 'El veredicto:', 'Respuesta simple:',
  ] : [
    'Bottom line:', 'My pick:', 'If I were buying today:', 'The short version:',
    'What I\'d do:', 'My recommendation:', 'The verdict:', 'Simple answer:',
  ];
  const starter = concStarters[seed % concStarters.length];

  if (sorted.length === 1) {
    return isEs ? `${starter} ${topPick.title}, sin dudarlo.` : `${starter} ${topPick.title}, no question.`;
  }

  if (sorted.length === 2) {
    const [first, second] = sorted;
    return isEs
      ? `${starter} ${first.title} si buscas lo mejor; ${second.title} si prefieres ahorrar un poco.`
      : `${starter} ${first.title} for the best; ${second.title} if you want to save a bit.`;
  }

  const restNames = rest.map(p => p.title).join(', ');

  if (isEs) {
    const templates = [
      `${starter} ${topPick.title} es la mejor. También valen mucho la pena: ${restNames}.`,
      `${starter} Ve a por ${topPick.title}. Alternativas: ${restNames}.`,
      `${starter} ${topPick.title} gana. El resto (${restNames}) son buenas opciones según tu presupuesto.`,
      `${starter} Mi elección es ${topPick.title}. No te equivocarías con: ${restNames}.`,
      `${starter} ${topPick.title} es la opción. Para otros gustos: ${restNames}.`,
    ];
    return templates[seed % templates.length];
  } else {
    const templates = [
      `${starter} ${topPick.title} is the best. Also worth considering: ${restNames}.`,
      `${starter} Go with ${topPick.title}. Alternatives: ${restNames}.`,
      `${starter} ${topPick.title} wins. The rest (${restNames}) are good options depending on your budget.`,
      `${starter} My pick is ${topPick.title}. You wouldn't go wrong with: ${restNames}.`,
      `${starter} ${topPick.title} is the one. For other tastes: ${restNames}.`,
    ];
    return templates[seed % templates.length];
  }
}

let count = 0;
for (let i = 0; i < guides.length; i++) {
  const guide = guides[i];
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

  const seed = i * 7 + 3;

  guide.verdict = generateVerdict(guide, productList, 'en', seed);
  guide.verdict_es = generateVerdict(guide, productList, 'es', seed);
  guide.conclusion = generateConclusion(guide, productList, 'en', seed);
  guide.conclusion_es = generateConclusion(guide, productList, 'es', seed);
  count++;
}

fs.writeFileSync(path.join(__dirname, '../data/guides.json'), JSON.stringify(guides, null, 2));
console.log(`Total: ${count} guides reescritos sin gamas, texto natural.`);
