// Medir con la funcion REAL de scripts/seo-audit.js (constantes + pxWidth)
const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/scripts/seo-audit.js', 'utf8');

const ini = src.indexOf('const T_CHARS');
const fin = src.indexOf('\n}', src.indexOf('function pxWidth')) + 2;
const bloque = src.slice(ini, fin);

// eslint-disable-next-line no-eval
const medir = new Function(bloque + '\n return function (s) { return { px: pxWidth(s), chars: s.length }; };')();

const EN = [
  'Home Studio in Three Tiers: What Each Upgrade Buys You',
  'Three Home Studio Budgets and Why the Room Comes First',
  'Home Studio Tiers: Where to Stop and Where to Spend',
  'Building a Home Studio: Three Budgets, One Signal Chain',
  'The Three Home Studio Tiers and What to Buy First',
  'Home Studio in Three Steps: Interface, Microphone, Room',
  'Three Home Studio Budgets, Ranked by What Matters',
  'Home Studio on a Budget: Three Builds, Starting Small',
  'Three Home Studio Tiers, and What to Skip',
  'Home Studio in Three Tiers, Starting With the Room',
  'Home Studio in Three Tiers: What Each One Adds',
  'Home Studio on a Budget: Three Tiers Explained'
];
const ES = [
  'Home studio en tres niveles: qué compra cada presupuesto',
  'Tres montajes de estudio doméstico y por qué la sala va primero',
  'Home studio en tres presupuestos: dónde parar y dónde gastar',
  'Montar un home studio en tres niveles, empezando por la sala',
  'Home studio: tres presupuestos y la sala siempre primero',
  'Tres niveles de home studio, ordenados por lo que importa',
  'De cero a estudio: tres niveles de home studio',
  'Home studio en tres niveles, empezando por la sala',
  'Home studio: qué comprar en cada nivel y qué saltar',
  'Home studio en tres niveles y qué comprar en cada uno',
  'Tres niveles de home studio y dónde merece la pena parar',
  'Home studio por niveles: qué comprar en cada etapa'
];

function linea(t) {
  const r = medir(t);
  const mal = [];
  if (r.chars > 60) mal.push(r.chars + 'c >60');
  if (r.px > 580) mal.push(r.px + 'px >580');
  if (/[$€£]/.test(t)) mal.push('precio');
  return { t, n: r.chars, px: r.px, mal };
}
const imp = (t) => { const r = medir(t); return (r.px <= 580 && r.chars <= 60 ? 'ok  ' : 'X   ') + String(r.chars).padStart(3) + 'c ' + String(r.px).padStart(3) + 'px  ' + t; };

console.log('=== EN (Title Case) ===\n');
EN.map(linea).sort((a, b) => a.px - b.px).forEach(x => {
  console.log(imp(x.t));
  if (x.mal.length) console.log('       -> ' + x.mal.join(', '));
});

console.log('\n=== ES (sentence case) ===\n');
ES.map(linea).sort((a, b) => a.px - b.px).forEach(x => {
  console.log(imp(x.t));
  if (x.mal.length) console.log('       -> ' + x.mal.join(', '));
});
