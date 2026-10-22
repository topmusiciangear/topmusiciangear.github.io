const fs = require('fs');

function load(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function save(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2)); }
function rep(obj, key, from, to) {
  const s = obj[key];
  if (typeof s !== 'string' || !s.includes(from)) {
    throw new Error(`NOT FOUND in ${key}: ${from}`);
  }
  obj[key] = s.split(from).join(to);
}

// ---------- products.json ----------
const productsPath = 'data/products.json';
const products = load(productsPath);
const p120 = products.find(p => p.id === 434);
if (!p120) throw new Error('P120 (434) not found');

p120.title = 'AKG P120 Medium-Diaphragm Condenser Microphone';
p120.title_es = 'Micrófono de condensador de diafragma mediano AKG P120';
p120.desc = 'Affordable medium-diaphragm condenser with switchable bass-cut filter and -20 dB pad, ideal for vocals, instruments, and project studios.';
p120.desc_es = 'Condensador de diafragma mediano asequible con filtro de corte de graves conmutable y atenuador (pad) de -20 dB, ideal para vocales, instrumentos y estudios caseros.';
save(productsPath, products);

// ---------- guides.json ----------
const guidesPath = 'data/guides.json';
const guides = load(guidesPath);
const g = guides.find(x => x.id === 'at2020-vs-p120');
if (!g) throw new Error('guide not found');

// Titles
g.title_es = 'Audio-Technica AT2020 vs AKG P120: Condensador barato';
g.titleTag_es = 'Audio-Technica AT2020 vs AKG P120: Condensador barato';

// Intros
rep(g, 'intro', 'the AKG P120 Large-Diaphragm Condenser Microphone', 'the AKG P120 Medium-Diaphragm Condenser Microphone');
rep(g, 'intro_es', 'el AKG P120 de gran diafragma cuestan', 'el AKG P120 de diafragma mediano cuestan');

// ES prose: pad -> atenuador
rep(g, 'conclusion_es', 'quieres el pad y el corte de graves integrados', 'quieres el atenuador y el corte de graves integrados');
rep(g, 'verdict_es', 'incluso sin pad.', 'incluso sin atenuador.');
rep(g, 'verdict_es', 'El pad de −20 dB', 'El atenuador de −20 dB');
rep(g, 'description_es', 'por su pad y su corte de graves', 'por su atenuador y su corte de graves');

// Sections
const sec = g.sections;
const secP120 = sec.find(s => (s.heading_es || '').includes('El P120: interruptores'));
if (!secP120) throw new Error('P120 section not found');
rep(secP120, 'content_es', 'un pad de −20 dB', 'un atenuador (pad) de −20 dB');
rep(secP120, 'content_es', 'donde el pad se justifica', 'donde el atenuador se justifica');
rep(secP120, 'content_es', 'con el pad conectado', 'con el atenuador conectado');
const secLoud = sec.find(s => (s.heading_es || '').includes('Guitarra acústica'));
if (!secLoud) throw new Error('loud-source section not found');
rep(secLoud, 'content_es', 'El pad del P120 lo hace', 'El atenuador del P120 lo hace');
const secRoom = sec.find(s => (s.heading_es || '').includes('Entonces'));
if (!secRoom) throw new Error('room section not found');
rep(secRoom, 'content_es', 'el pad y el corte de graves del P120', 'el atenuador y el corte de graves del P120');

// Comparison table
const rows = g.comparison.rows;
const priceIdx = rows.findIndex(r => r.label === 'Price (street)');
if (priceIdx < 0) throw new Error('price row not found');
rows.splice(priceIdx, 1);

const sens = rows.find(r => r.label === 'Sensitivity');
if (!sens) throw new Error('sensitivity row not found');
sens.val2 = '−32.5 dBV (24 mV/Pa)';
sens.val2_es = '−32,5 dBV (24 mV/Pa)';

const padRow = rows.find(r => r.label === 'Pad');
if (!padRow) throw new Error('pad row not found');
padRow.label_es = 'Atenuador (pad)';

const maxSpl = rows.find(r => r.label === 'Max SPL');
if (!maxSpl) throw new Error('max spl row not found');
maxSpl.val2_es = '130 dB; 150 dB con atenuador';

const phantom = rows.find(r => r.label === 'Phantom power');
if (!phantom) throw new Error('phantom row not found');
phantom.val2 = '48 V, 3 mA';
phantom.val2_es = '48 V, 3 mA';

// FAQ / snippet
const fsnip = g.featuredSnippet;
if (!fsnip) throw new Error('featuredSnippet not found');
rep(fsnip, 'text_es', 'añade pad y corte de graves', 'añade atenuador (pad) y corte de graves');
rep(fsnip, 'key2_es', 'Pad y corte de graves', 'Atenuador (pad) y corte de graves');
rep(fsnip, 'faq_a3_es', 'gracias a su pad de −20 dB', 'gracias a su atenuador (pad) de −20 dB');
rep(fsnip, 'faq_a3_es', 'con el pad puesto', 'con el atenuador puesto');
rep(fsnip, 'faq_a5_es', 'si necesitas el pad y el corte de graves', 'si necesitas el atenuador (pad) y el corte de graves');
const specMax = fsnip.specs.find(s => s.label_en === 'Max SPL');
if (!specMax) throw new Error('snippet max spl spec not found');
specMax.val2 = '130 dB / 150 dB (pad)';

// Pros / cons
const vpc = g.verdictProsCons;
const at = vpc.find(v => v.name === 'Audio-Technica AT2020');
const p = vpc.find(v => v.name === 'AKG P120');
if (!at || !p) throw new Error('verdict products not found');
at.pros_es = at.pros_es.map(s => s.replace('cerca sin pad', 'cerca sin atenuador'));
at.cons_es = at.cons_es.map(s => s.replace('Sin pad ni corte de graves', 'Sin atenuador ni corte de graves'));
p.pros_es = p.pros_es.map(s => s.replace('El pad de −20 dB', 'El atenuador de −20 dB'));
p.cons = p.cons.map(s => s.replace('2/3-inch back-electret capsule is smaller than the large-diaphragm name suggests', '2/3-inch back-electret capsule is medium-diaphragm, not the 1-inch design some expect'));
p.cons_es = p.cons_es.map(s => s.replace('La cápsula back electret de 2/3 de pulgada es más pequeña de lo que sugiere el nombre gran diafragma', 'La cápsula back electret de 2/3 de pulgada es de diafragma mediano, no de 1 pulgada'));
p.cons_es = p.cons_es.map(s => s.replace('El pad y el filtro están', 'El atenuador y el filtro están'));

save(guidesPath, guides);
console.log('OK: AT2020/P120 guide + P120 catalog entry updated');
