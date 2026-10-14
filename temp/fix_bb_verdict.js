const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'beginner-bass-guitars');

// ---------- 1. VEREDICTO: 3 de 10 productos -> lineup real ----------
const vEn = 'Yamaha TRBX304 for the best all-around beginner bass, Squier Affinity PJ for classic P-Bass tone, Sire Marcus Miller V5R for passive jazz bass tone.';
const vEs = 'El Yamaha TRBX304 para el mejor bajo de iniciación todo terreno, el Squier Affinity PJ para el tono P-Bass clásico y la Sire Marcus Miller V5R para el tono jazz bass pasivo.';
if (g.verdict !== vEn) die('veredicto EN no coincide');
if (g.verdict_es !== vEs) die('veredicto ES no coincide');

g.verdict = 'Yamaha BB234 for the best overall beginner bass (alder body, ceramic P/J, a decade of play), Squier Affinity PJ for the best value P/J, Yamaha TRBX304 for the best active option, Sire Marcus Miller V5R for passive jazz tone, Ibanez TMB30 for short-scale P/J comfort, Squier Sonic Bronco for the cheapest start.';
g.verdict_es = 'El Yamaha BB234 como mejor bajo para principiantes en general (cuerpo de aliso, P/J cerámicas, una década de juego), el Squier Affinity PJ como mejor relación calidad-precio en P/J, el Yamaha TRBX304 como mejor opción activa, la Sire Marcus Miller V5R para el tono jazz pasivo, el Ibanez TMB30 para comodidad P/J en escala corta y el Squier Sonic Bronco como el inicio más barato.';
console.log('veredicto EN/ES: 3 -> 6 nombrados (de 10 en lineup)');

// ---------- 2. CONCLUSION: anadir escala corta y activa ----------
const cEn = 'Start with a Yamaha TRBX304 or Squier Affinity PJ for the best combination of comfort, tone, and value.';
const cEs = 'Empieza con un Yamaha TRBX304 o Squier Affinity PJ para la mejor combinación de comodidad, tono y valor.';
if (!g.conclusion.includes(cEn)) die('conclusion EN no coincide');
if (!g.conclusion_es.includes(cEs)) die('conclusion ES no coincide');

g.conclusion = g.conclusion.replace(cEn, 'Start with a Yamaha BB234 if you want the sturdiest passive P/J, a Yamaha TRBX304 if you want onboard EQ, or a Squier Affinity PJ if you want the most bass for the least money. Smaller hands should start short: the Squier Sonic Bronco and Ibanez TMB30 are 30-inch basses with lower string tension and nothing to stretch for.');
g.conclusion_es = g.conclusion_es.replace(cEs, 'Empieza con un Yamaha BB234 si quieres el P/J pasivo más sólido, un Yamaha TRBX304 si quieres EQ a bordo o un Squier Affinity PJ si quieres el máximo bajo por el mínimo dinero. Las manos pequeñas deberían empezar en corto: el Squier Sonic Bronco y el Ibanez TMB30 son bajos de 30 pulgadas con menos tensión de cuerda y nada que estirar.');
console.log('conclusion EN/ES: cubre escala corta + activa + BB234');

// ---------- 3. SECCIONES: productos y heading único ----------
const s0 = g.sections[0];
if (!s0.products.includes(163)) { s0.products.push(163); console.log('SEC0: + Sire V5 (163)'); }
const s1 = g.sections[1];
[680, 682].forEach(id => { if (!s1.products.includes(id)) { s1.products.push(id); } });
console.log('SEC1 (budget): ' + JSON.stringify(s1.products));

const s2 = g.sections[2];
if (s2.heading !== 'Fender Bass Guide' || s2.heading_es !== 'Guía de bajos Fender') die('SEC2 heading inesperado');
s2.heading = 'Precision and Jazz: Two Shapes of Tone';
s2.heading_es = 'Precision y Jazz: dos formas de tono';
const hEn = 'Fender invented the modern bass guitar twice: the Precision in 1951 and the Jazz in 1960.';
if (!s2.content.includes(hEn)) die('SEC2 EN no coincide');
const hEs = 'Fender inventó el bajo moderno dos veces: el Precision en 1951 y el Jazz en 1960.';
if (!s2.content_es.includes(hEs)) die('SEC2 ES no coincide');
console.log('SEC2 heading: "Fender Bass Guide" -> "Precision and Jazz: Two Shapes of Tone" (ya no hay Fenders en la guia)');

// ---------- 4. SNIPPET: frase rota EN + titulo con numero ----------
const f = g.featuredSnippet;
const brk = 'The Yamaha TRBX304 offers versatility with a 5-band active EQ, mahogany body, and real, present resonance at.';
if (!f.text_en.includes(brk)) die('snippet EN no coincide');
f.text_en = f.text_en.replace(brk, 'The Yamaha TRBX304 covers the active side of the beginner market: onboard EQ, a mahogany body and a fast SR4 neck for players who want to shape their own tone from day one.');
if (f.title_en !== '5 Best Bass Guitars for Beginners') die('snippet title EN inesperado: ' + f.title_en);
f.title_en = 'Best Bass Guitars for Beginners';
if (f.title_es !== '5 mejores bajos para principiantes') die('snippet title ES inesperado: ' + f.title_es);
f.title_es = 'Mejores bajos para principiantes';
console.log('snippet: frase EN truncada corregida + titulo sin numero');

// ---------- 5. verdictProsCons: name_es uniforme ----------
const fixNameEs = {
  'Squier Affinity Series Precision Bass PJ': 'Bajo Precision PJ Serie Affinity de Squier',
  'Squier Classic Vibe \'60s Jazz Bass': 'Bajo Jazz Classic Vibe 60s de Squier'
};
g.verdictProsCons.forEach(v => {
  if (fixNameEs[v.name] && v.name_es !== fixNameEs[v.name]) { v.name_es = fixNameEs[v.name]; }
});
console.log('verdictProsCons name_es revisados');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ---------- VERIFICACION ----------
console.log('\nverdict EN: ' + g.verdict);
console.log('verdict ES: ' + g.verdict_es);
console.log('conclusion EN: ' + g.conclusion.split('<a')[0]);
console.log('conclusion ES: ' + g.conclusion_es.split('<a')[0]);
console.log('secciones:', g.sections.length);
console.log('productos en featured:', g.featuredProducts.length, '| unicos:', new Set(g.featuredProducts).size);
const cols = g.productTable.columns.length;
console.log('tabla:', cols, 'cols | desalineadas:', g.productTable.rows.filter(r => r.values.length !== cols).length);
console.log('paridad veredictos:', g.verdictProsCons.every(v => v.pros.length === v.pros_es.length && v.cons.length === v.cons_es.length && v.pros.length >= 4 && v.cons.length >= 4));
console.log('cada producto con review:', g.featuredProducts.every(id => g.sections.some(s => (s.products || []).length === 1 && s.products[0] === id)));