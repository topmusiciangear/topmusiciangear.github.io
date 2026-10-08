const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const awin = (mid, clean) => `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=2891111&ued=${encodeURIComponent(clean)}`;
function assertEq(a, b, w) { if (a !== b) throw new Error('ASSERT ' + w + '\nGOT: ' + a + '\nEXP: ' + b); }

// ---------- 1. products.json: append 604 ----------
const P = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
if (!P.some(p => p.id === 604)) {
P.push({
  id: 604,
  title: 'AKG K240 Studio',
  title_es: 'AKG K240 Studio',
  brand: 'AKG',
  category: 'headphones',
  price: 89,
  rating: 4.7,
  reviews: 8500,
  badge: 'legend',
  desc: 'Semi-open studio classic since 1975. 30mm Varimotion drivers, 55-ohm impedance that runs from any device, detachable mini-XLR cable and self-adjusting headband. Wider stage than any closed-back at this price.',
  desc_es: 'Clásico semiabierto de estudio desde 1975. Drivers Varimotion de 30 mm, impedancia de 55 ohmios que funciona con cualquier equipo, cable desmontable mini-XLR y diadema autoajustable. Escenario más amplio que cualquier cerrado a este precio.',
  img: 'https://r2.gear4music.com/media/36/361851/1200/preview.jpg',
  stores: {
    gear4music: awin(1117, 'https://www.gear4music.com/PA-DJ-and-Lighting/AKG-K240-Studio-Semi-Open-Headphones/TLC'),
    amazon: 'https://www.amazon.com/dp/B0001ARCFA',
    andertons: 'https://www.andertons.co.uk/akg-k240-studiosemi-open-back-monitoring-headphones/',
    zzounds: 'https://www.zzounds.com/a--925521/item--AKGK240STU'
  }
});
}
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2) + '\n');
console.log('products.json: 604 added');

// ---------- 2. TEST_SHOP_BTN 604 ----------
let bg = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
if (!bg.includes('  604: {')) {
const anchor = '  602: {';
if (!bg.includes(anchor)) throw new Error('anchor 602 missing');
bg = bg.replace(anchor, `  604: {
    prices: {
      zzounds: "$89.00",
      andertons: "\\u00A358.00",
      gear4music: "\\u00A358.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B0001ARCFA"
    }
  },
` + anchor);
fs.writeFileSync(DIR + 'build-guides.js', bg);
console.log('build-guides.js: 604 added');
}

// ---------- 3. guides.json budget-headphones ----------
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const o = G.find(x => x.id === 'budget-headphones');
assertEq(JSON.stringify(o.featuredProducts), JSON.stringify([426, 26, 198, 427, 420, 428]), 'featured');
o.featuredProducts.push(604);

o.sections.push({
  heading: 'Semi-Open Since 1975: Is the AKG K240 Studio Still the Smartest $89 in Audio?',
  heading_es: 'Semiabiertos desde 1975: ¿siguen los AKG K240 Studio siendo los $89 más inteligentes del audio?',
  content: '<p><strong>Some designs survive because nobody beats them at the price — the K240 Studio has been that survivor since 1975.</strong> Its semi-open earcups split the difference: a wider, more breathable stage than any closed-back here, without the full leak of an open-back. The 30mm Varimotion drivers deliver honest mids and clear highs that expose mix problems instead of hiding them.</p><p>The pro touches embarrass pricier rivals: a detachable mini-XLR cable you can replace in seconds, a self-adjusting headband that fits any head, and replaceable pads. At 55 ohms and 104 dB sensitivity it plays loud from a phone, a laptop or an interface.</p><p>Trade-offs are honest: bass is lighter than sealed rivals, the leatherette pads sweat on hot days, and the 3 m cable is built for the studio, not the street. For a first critical-listening pair that teaches you what neutral sounds like, nothing under $100 has a longer résumé.</p>',
  content_es: '<p><strong>Algunos diseños sobreviven porque nadie los supera a ese precio — los K240 Studio son ese superviviente desde 1975.</strong> Sus copas semiabiertas parten la diferencia: un escenario más amplio y respirable que cualquier cerrado de aquí, sin la fuga total de un abierto. Los drivers Varimotion de 30 mm entregan medios honestos y agudos claros que exponen los problemas de la mezcla en vez de esconderlos.</p><p>Los detalles pro avergüenzan a rivales más caros: cable desmontable mini-XLR que cambias en segundos, diadema autoajustable que se adapta a cualquier cabeza y almohadillas reemplazables. Con 55 ohmios y 104 dB de sensibilidad suenan alto desde un teléfono, una laptop o una interfaz.</p><p>Las contrapartidas son honestas: graves más ligeros que los rivales sellados, las almohadillas de polipiel sudan en días calurosos y el cable de 3 m está hecho para el estudio, no para la calle. Como primer par de escucha crítica que te enseña cómo suena lo neutro, nada por menos de $100 tiene un historial más largo.</p>',
  products: [604]
});

assertEq(o.productTable.columns.length, 6, 'table cols');
o.productTable.columns.push({ title: 'AKG K240 Studio', title_es: 'AKG K240 Studio' });
function col(label, en, es) {
  const r = o.productTable.rows.find(x => x.label === label);
  if (!r) throw new Error('no row ' + label);
  assertEq(r.values.length, 6, 'row len ' + label);
  r.values.push({ value: en, value_es: es });
}
col('Estimated Price', '~$89', '~$89');
col('Best For', 'Semi-open studio all-rounder', 'Todo terreno semiabierto de estudio');
col('Type', 'Semi-open', 'Semiabiertos');
col('Driver Size', '30mm', '30mm');
col('Impedance', '55 Ω', '55 Ω');
col('Sensitivity', '104 dB', '104 dB');
col('Frequency Response', '15 Hz – 25 kHz', '15 Hz – 25 kHz');
col('Cable', 'Detachable 3 m', 'Desmontable 3 m');
col('Ear Pads', 'Leatherette, replaceable', 'Polipiel, reemplazables');
col('Weight', '240 g', '240 g');

o.verdictProsCons.push({
  name: 'AKG K240 Studio',
  name_es: 'AKG K240 Studio',
  pros: [
    'Semi-open design gives a wider stage than closed-backs without full open leak',
    'Professional mini-XLR detachable cable — rare under $100',
    '55-ohm impedance and 104 dB sensitivity run loud from any device',
    'Studio standard since 1975 with replaceable pads'
  ],
  pros_es: [
    'El diseño semiabierto da un escenario más amplio que los cerrados sin la fuga total de un abierto',
    'Cable profesional desmontable mini-XLR — raro por menos de $100',
    'La impedancia de 55 ohmios y los 104 dB de sensibilidad suenan alto desde cualquier equipo',
    'Estándar de estudio desde 1975 con almohadillas reemplazables'
  ],
  cons: [
    'Bass is lighter and less extended than sealed rivals',
    'Leatherette pads sweat on long hot sessions',
    'Bulky 3 m cable is built for the studio, not the street',
    'Plastic yokes can crack with rough handling'
  ],
  cons_es: [
    'Graves más ligeros y menos extendidos que los rivales sellados',
    'Las almohadillas de polipiel sudan en sesiones largas y calurosas',
    'El voluminoso cable de 3 m está hecho para el estudio, no para la calle',
    'Las horquillas de plástico pueden rajarse con trato rudo'
  ]
});

// six -> seven (EN) / seis -> siete (ES)
function rep(field, from, to) {
  if (!o[field].includes(from)) throw new Error('not found ' + field + ': ' + from.slice(0, 50));
  o[field] = o[field].split(from).join(to);
}
rep('conclusion', 'its linear tuning and angled drivers make it the most accurate of the six.', 'its linear tuning and angled drivers make it the most accurate of the seven.');
rep('conclusion_es', 'los convierten en el más preciso de los seis.', 'los convierten en el más preciso de los siete.');
rep('verdict', 'is the most accurate of the six for mixing', 'is the most accurate of the seven for mixing');
rep('verdict_es', 'son los más precisos de los seis para mezclar', 'son los más precisos de los siete para mezclar');
const fsn = o.featuredSnippet;
if (!fsn.text_en.includes('most accurate of the six')) throw new Error('fsn en');
fsn.text_en = fsn.text_en.split('most accurate of the six').join('most accurate of the seven');
if (!fsn.text_es.includes('más precisos de los seis')) throw new Error('fsn es');
fsn.text_es = fsn.text_es.split('más precisos de los seis').join('más precisos de los siete');
// conclusion + verdict: add K240 sentence
if (!o.conclusion.includes('the Samson SR850 delivers more accuracy per dollar than anything else.')) throw new Error('con k240 anchor');
o.conclusion = o.conclusion.replace('the Samson SR850 delivers more accuracy per dollar than anything else.', 'the Samson SR850 delivers more accuracy per dollar than anything else. The AKG K240 Studio is the semi-open middle path: wider than any closed-back here, with a pro detachable cable.');
if (!o.conclusion_es.includes('los Samson SR850 ofrecen más precisión por tu dinero que cualquier otra.')) throw new Error('con es k240 anchor');
o.conclusion_es = o.conclusion_es.replace('los Samson SR850 ofrecen más precisión por tu dinero que cualquier otra.', 'los Samson SR850 ofrecen más precisión por tu dinero que cualquier otra. Los AKG K240 Studio son el camino intermedio semiabierto: más amplios que cualquier cerrado de aquí, con cable profesional desmontable.');
if (!o.verdict.includes('and the Samson SR850 the best value for almost no money.')) throw new Error('verdict k240 anchor');
o.verdict = o.verdict.replace('and the Samson SR850 the best value for almost no money.', 'the Samson SR850 the best value for almost no money, and the AKG K240 Studio the semi-open all-rounder with a detachable pro cable.');
if (!o.verdict_es.includes('y los Samson SR850 la mejor relación calidad-precio por casi nada.')) throw new Error('verdict es k240 anchor');
o.verdict_es = o.verdict_es.replace('y los Samson SR850 la mejor relación calidad-precio por casi nada.', 'los Samson SR850 la mejor relación calidad-precio por casi nada, y los AKG K240 Studio el todo terreno semiabierto con cable profesional desmontable.');
// faq_a4 lists
if (!fsn.faq_a4_en.includes('SRH440A, and SR850 —')) throw new Error('faq4 en');
fsn.faq_a4_en = fsn.faq_a4_en.replace('All six here — the HD 560S, MDR-7506, ATH-M40x, ATH-R30x, SRH440A, and SR850 —', 'All seven here — the HD 560S, MDR-7506, ATH-M40x, ATH-R30x, SRH440A, SR850, and K240 Studio —');
if (!fsn.faq_a4_es.includes('SRH440A y SR850 —')) throw new Error('faq4 es');
fsn.faq_a4_es = fsn.faq_a4_es.replace('Los seis modelos de esta guía — los HD 560S, MDR-7506, ATH-M40x, ATH-R30x, SRH440A y SR850 —', 'Los siete modelos de esta guía — los HD 560S, MDR-7506, ATH-M40x, ATH-R30x, SRH440A, SR850 y K240 Studio —');
// verdict pros mentioning six
const v560 = o.verdictProsCons.find(v => v.name === 'Sennheiser HD 560S');
assertEq(v560.pros[0], 'Linear, honest tuning — the most accurate for mixing of the six', 'v560 pro');
v560.pros[0] = 'Linear, honest tuning — the most accurate for mixing of the seven';
assertEq(v560.pros_es[0], 'Afinación lineal y honesta — el más preciso para mezclar de los seis', 'v560 pro es');
v560.pros_es[0] = 'Afinación lineal y honesta — el más preciso para mezclar de los siete';
const vr30 = o.verdictProsCons.find(v => v.name === 'Audio-Technica ATH-R30x');
assertEq(vr30.pros[0], 'Lightest of the six at 210 g', 'vr30 pro');
vr30.pros[0] = 'Lightest of the seven at 210 g';
assertEq(vr30.pros_es[0], 'El más ligero de los seis con 210 g', 'vr30 pro es');
vr30.pros_es[0] = 'El más ligero de los siete con 210 g';

// final sweep
const left = JSON.stringify(o).match(/of the six|de los seis|All six|Los seis/g);
if (left) throw new Error('six left: ' + JSON.stringify(left));
console.log('budget-headphones migrated, no six left');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
