const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const awin = (mid, clean) => `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=2891111&ued=${encodeURIComponent(clean)}`;
function assertEq(a, b, w) { if (a !== b) throw new Error('ASSERT ' + w + '\nGOT: ' + JSON.stringify(a) + '\nEXP: ' + JSON.stringify(b)); }

// ---------- 1. products.json: 605 + Focal 421 stores ----------
const P = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
if (!P.some(p => p.id === 605)) {
  P.push({
    id: 605,
    title: 'Sennheiser HD 280 Pro II',
    title_es: 'Sennheiser HD 280 Pro II',
    brand: 'Sennheiser',
    category: 'headphones',
    price: 99,
    rating: 4.8,
    reviews: 5200,
    badge: 'recommended',
    desc: 'Closed-back tracking classic with up to 32 dB of isolation. Linear 8 Hz – 25 kHz response, 64-ohm drivers, collapsible earcups and a tough coiled cable. Zero bleed into live mics.',
    desc_es: 'Clásico cerrado para grabar con hasta 32 dB de aislamiento. Respuesta lineal de 8 Hz a 25 kHz, drivers de 64 ohmios, copas plegables y cable en espiral resistente. Cero fuga hacia los micrófonos en vivo.',
    img: 'https://r2.gear4music.com/media/64/644189/1200/preview.jpg',
    stores: {
      gear4music: awin(1117, 'https://www.gear4music.com/Recording-and-Computers/Sennheiser-HD-280-PRO-II-Closed-Back-Headphones/1ONJ'),
      musicstore: 'https://www.musicstore.com/en_OE/EUR/Sennheiser-HD-280-Pro/art-REC0012791-000',
      amazon: 'https://www.amazon.com/dp/B01LM0CI6U',
      andertons: 'https://www.andertons.co.uk/sennheiser-hd280-pro-headphones/',
      zzounds: 'https://www.zzounds.com/a--925521/item--SENHD280PRO'
    }
  });
  console.log('605 added');
}
const f421 = P.find(p => p.id === 421);
f421.stores.gear4music = awin(1117, 'https://www.gear4music.com/Recording-and-Computers/Focal-Listen-Professional-Headphones/2BDG');
f421.stores.zzounds = 'https://www.zzounds.com/a--925521/item--FOLFOPROLISPRO';
f421.stores.andertons = 'https://www.andertons.co.uk/focal-listen-pro-professional-closed-back-reference-headphones-32ohm/?search_query=Focal%20Listen%20Professional';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2) + '\n');
console.log('products.json written (605 + 421 stores)');

// ---------- 2. TEST_SHOP_BTN: 605 + 421 ----------
let bg = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
if (!bg.includes('  605: {')) {
  const anchor = '  604: {';
  if (!bg.includes(anchor)) throw new Error('anchor 604 missing');
  bg = bg.replace(anchor, `  605: {
    prices: {
      amazon: "$89.99",
      zzounds: "$99.95",
      andertons: "\\u00A375.00",
      gear4music: "\\u00A375.00",
      musicstore: "\\u20AC89.00"
    }
  },
` + anchor);
  console.log('605 entry added');
}
{
  const i = bg.indexOf('  421: {');
  if (i < 0) throw new Error('421 missing');
  const j = bg.indexOf('  422: {', i);
  const block = bg.slice(i, j);
  if (!block.includes('£200.50')) throw new Error('421 block changed: ' + block.slice(0, 200));
  const nb = `  421: {
    prices: {
      amazon: "$249.00",
      zzounds: "$329.00",
      andertons: "\\u00A3169.00",
      gear4music: "\\u00A3169.00",
      musicstore: "\\u20AC215.00"
    }
  },
`;
  bg = bg.slice(0, i) + nb + bg.slice(j);
  console.log('421 entry updated');
}
fs.writeFileSync(DIR + 'build-guides.js', bg);

// ---------- 3. guides.json budget-headphones: add 605, seven->eight ----------
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const o = G.find(x => x.id === 'budget-headphones');
assertEq(JSON.stringify(o.featuredProducts), JSON.stringify([426, 26, 198, 427, 420, 428, 604]), 'featured');
o.featuredProducts.push(605);

o.sections.push({
  heading: 'Zero Bleed, Zero Excuses: Is the HD 280 Pro II the Tracking Workhorse?',
  heading_es: 'Cero fuga, cero excusas: ¿es el HD 280 Pro II el caballo de batalla para grabar?',
  content: '<p><strong>When the mic is live, isolation is everything — and few sealed headphones isolate like this.</strong> Up to 32 dB of ambient attenuation means click tracks, headphone mixes and room noise stay out of the vocal take. The linear 8 Hz – 25 kHz response tells the truth without hype, so what you monitor is what you recorded.</p><p>The 64-ohm drivers play loud from any interface, the collapsible earcups fold flat for the gig bag, and the single-sided coiled cable stretches from 1.3 m to 3 m without tangling. Nearly every part is replaceable, which is why pairs from a decade ago still earn their keep in pro booths.</p><p>Honest caveats: 285 g with a firm 6 N clamp grips hard until broken in, and the coiled cable fights you at a desk. For tracking vocals, drums or podcasts where bleed ruins takes, this is the sub-$100 insurance policy.</p>',
  content_es: '<p><strong>Cuando el micrófono está abierto, el aislamiento lo es todo — y pocos cerrados aíslan como este.</strong> Hasta 32 dB de atenuación ambiental significan que el clic, la mezcla de auriculares y el ruido de la sala se quedan fuera de la toma de voz. La respuesta lineal de 8 Hz a 25 kHz dice la verdad sin adornos, así lo que monitoreas es lo que grabaste.</p><p>Los drivers de 64 ohmios suenan alto desde cualquier interfaz, las copas plegables se pliegan planas para la mochila y el cable en espiral unilateral se estira de 1,3 m a 3 m sin enredarse. Casi cada pieza es reemplazable, por eso pares de hace una década siguen ganándose el pan en cabinas pro.</p><p>Advertencias honestas: los 285 g con una presión firme de 6 N agarran fuerte hasta adaptarse, y el cable en espiral pelea contigo en un escritorio. Para grabar voces, batería o podcast donde la fuga arruina tomas, esta es la póliza de seguro por menos de $100.</p>',
  products: [605]
});

assertEq(o.productTable.columns.length, 7, 'table cols');
o.productTable.columns.push({ title: 'Sennheiser HD 280 Pro II', title_es: 'Sennheiser HD 280 Pro II' });
function col(label, en, es) {
  const r = o.productTable.rows.find(x => x.label === label);
  if (!r) throw new Error('no row ' + label);
  assertEq(r.values.length, 7, 'row len ' + label);
  r.values.push({ value: en, value_es: es });
}
col('Estimated Price', '$89–$99', '$89–$99');
col('Best For', 'Isolation-first vocal tracking', 'Grabar voces con máximo aislamiento');
col('Type', 'Closed-back', 'Cerrados');
col('Driver Size', '—', '—');
col('Impedance', '64 Ω', '64 Ω');
col('Sensitivity', '113 dB', '113 dB');
col('Frequency Response', '8 Hz – 25 kHz', '8 Hz – 25 kHz');
col('Cable', 'Coiled 1.3–3 m', 'Espiral 1,3–3 m');
col('Ear Pads', 'Soft, replaceable', 'Suaves, reemplazables');
col('Weight', '285 g', '285 g');

o.verdictProsCons.push({
  name: 'Sennheiser HD 280 Pro II',
  name_es: 'Sennheiser HD 280 Pro II',
  pros: [
    'Up to 32 dB of isolation — click and mix stay out of the mic',
    'Linear 8 Hz – 25 kHz response tells the truth for tracking decisions',
    'Collapsible earcups fold flat; nearly every part is replaceable',
    '64-ohm drivers play loud from any interface'
  ],
  pros_es: [
    'Hasta 32 dB de aislamiento — el clic y la mezcla se quedan fuera del micrófono',
    'La respuesta lineal de 8 Hz a 25 kHz dice la verdad para decidir tomas',
    'Copas plegables que se pliegan planas; casi cada pieza es reemplazable',
    'Los drivers de 64 ohmios suenan alto desde cualquier interfaz'
  ],
  cons: [
    '285 g with a firm clamp grips hard until broken in',
    'Coiled cable fights you at a desk — built for the booth, not the desktop',
    'Bass stays honest but lean next to fun-tuned rivals',
    'Bulky folded shape still eats gig-bag space'
  ],
  cons_es: [
    'Los 285 g con presión firme agarran fuerte hasta adaptarse',
    'El cable en espiral pelea contigo en un escritorio — hecho para la cabina, no para el desktop',
    'Los graves se mantienen honestos pero sobrios junto a rivales divertidos',
    'La forma plegada y voluminosa igual come espacio en la mochila'
  ]
});

// Driver Size: Sennheiser does not publish the HD 280 Pro driver size — '—' instead of inventing.
function rep(field, from, to) {
  if (!o[field].includes(from)) throw new Error('not found ' + field + ': ' + from.slice(0, 60));
  o[field] = o[field].split(from).join(to);
}
rep('conclusion', 'most accurate of the seven.', 'most accurate of the eight.');
rep('conclusion_es', 'el más preciso de los siete.', 'el más preciso de los ocho.');
rep('verdict', 'most accurate of the seven for mixing', 'most accurate of the eight for mixing');
rep('verdict_es', 'más precisos de los siete para mezclar', 'más precisos de los ocho para mezclar');
const fsn = o.featuredSnippet;
fsn.text_en = fsn.text_en.split('most accurate of the seven').join('most accurate of the eight.');
fsn.text_es = fsn.text_es.split('más precisos de los siete').join('más precisos de los ocho.');
if (!o.conclusion.includes('with a pro detachable cable.')) throw new Error('con k240 anchor gone');
o.conclusion = o.conclusion.replace('with a pro detachable cable.', 'with a pro detachable cable. The Sennheiser HD 280 Pro II is the isolation-first tracker: up to 32 dB of bleed control for live mics.');
o.conclusion_es = o.conclusion_es.replace('con cable profesional desmontable.', 'con cable profesional desmontable. Los Sennheiser HD 280 Pro II son para grabar con máximo aislamiento: hasta 32 dB de control de fuga para micrófonos en vivo.');
o.verdict = o.verdict.replace('with a detachable pro cable.', 'with a detachable pro cable, and the Sennheiser HD 280 Pro II the zero-bleed tracker.');
o.verdict_es = o.verdict_es.replace('con cable profesional desmontable.', 'con cable profesional desmontable, y los Sennheiser HD 280 Pro II para grabar sin fuga.');
fsn.faq_a4_en = fsn.faq_a4_en.replace('All seven here —', 'All eight here —').replace('SR850, and K240 Studio —', 'SR850, K240 Studio, and HD 280 Pro II —');
fsn.faq_a4_es = fsn.faq_a4_es.replace('Los siete modelos de esta guía —', 'Los ocho modelos de esta guía —').replace('SR850 y K240 Studio —', 'SR850, K240 Studio y HD 280 Pro II —');
const v560 = o.verdictProsCons.find(v => v.name === 'Sennheiser HD 560S');
v560.pros[0] = v560.pros[0].split('of the seven').join('of the eight.');
v560.pros_es[0] = v560.pros_es[0].split('de los siete').join('de los ocho.');
const vr30 = o.verdictProsCons.find(v => v.name === 'Audio-Technica ATH-R30x');
vr30.pros[0] = vr30.pros[0].split('of the seven').join('of the eight.');
vr30.pros_es[0] = vr30.pros_es[0].split('de los siete').join('de los ocho.');

const left = JSON.stringify(o).match(/of the seven|de los siete|All seven|Los siete/g);
if (left) throw new Error('seven left: ' + JSON.stringify(left));
console.log('budget-headphones: 605 added, no seven left');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
