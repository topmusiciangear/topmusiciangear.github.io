const fs = require('fs');
const f = 'data/guides.json';
const gs = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = gs.find(x => x.id === 'beginner-bass-guitars');

/* 1. Frase del Squier Affinity: calco -> español natural */
const affEnBefore = "The world's best-selling bass guitar just got better.";
const affEsBefore = 'El bajo más vendido del mundo, ahora todavía mejor.';
if (!g.verdict.includes(affEnBefore)) throw new Error('EN affinity sentence not found');
if (!g.verdict_es.includes(affEsBefore)) throw new Error('ES affinity sentence not found');
g.verdict = g.verdict.replace(affEnBefore, "The world's best-selling bass, now in a P/J configuration.");
g.verdict_es = g.verdict_es.replace(affEsBefore, 'El bajo más vendido del mundo, ahora en configuración P/J.');

/* 2. Añadir Ibanez GSR200 GIO al veredicto (EN + ES), antes del Sterling */
const gsrEn = '<p><strong><span class="product-name">Ibanez GSR200 GIO</span></strong> — A slim GSR4 neck and a light body make it the easiest bass here to learn on, with passive Dynamix P/J pickups and the active Phat II bass boost for when you need more weight.</p>';
const gsrEs = '<p><strong><span class="product-name">Ibanez GSR200 GIO</span></strong> — Mástil GSR4 estrecho y cuerpo ligero: el más fácil de esta lista para empezar. Lleva pastillas pasivas Dynamix P/J y el refuerzo de graves activo Phat II para cuando necesitas más peso abajo.</p>';
const anchorEn = /<p><strong><span class="product-name">Sterling by Music Man StingRay Ray4<\/span>/;
const anchorEs = /<p><strong><span class="product-name">Sterling by Music Man StingRay Ray4<\/span>/;
if (!anchorEn.test(g.verdict)) throw new Error('EN anchor not found');
if (!anchorEs.test(g.verdict_es)) throw new Error('ES anchor not found');
g.verdict = g.verdict.replace(anchorEn, gsrEn + '$&');
g.verdict_es = g.verdict_es.replace(anchorEs, gsrEs + '$&');

/* 3. Ordenar el grid del veredicto por nota (ganador primero) */
const order = [
  'Yamaha TRBX304',
  'Squier Affinity Series Precision Bass PJ',
  'Ibanez SR300E',
  'Sire Marcus Miller V5R',
  'Ibanez GSR200 GIO',
  'Sterling by Music Man StingRay Ray4',
  "Squier Classic Vibe '60s Jazz Bass",
  'Yamaha BB234',
  'Squier Sonic Bronco Bass',
  'Ibanez TMB30 Talman'
];
const byName = {};
g.verdictProsCons.forEach(v => { byName[v.name] = v; });
const missing = order.filter(n => !byName[n]);
if (missing.length) throw new Error('missing in verdictProsCons: ' + missing.join(', '));
g.verdictProsCons = order.map(n => byName[n]);

fs.writeFileSync(f, JSON.stringify(gs, null, 2));

const count = (s) => (s.match(/<p><strong>/g) || []).length;
console.log('EN paragraphs:', count(g.verdict), '| ES:', count(g.verdict_es));
console.log('GSR200 in EN:', g.verdict.includes('Ibanez GSR200 GIO'), '| ES:', g.verdict_es.includes('Ibanez GSR200 GIO'));
console.log('old ES sentence gone:', !g.verdict_es.includes('ahora todavía mejor'));
console.log('grid order:', g.verdictProsCons.map(v => v.name).join(' | '));
