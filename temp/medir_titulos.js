// Medir con la MISMA funcion que usa scripts/seo-audit.js
const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/scripts/seo-audit.js', 'utf8');
// extraer FONT_PX y pxWidth
const fpx = /const FONT_PX\s*=\s*([\d.]+)/.exec(src)[1];
const cuerpo = /function pxWidth\(str\)\s*\{[\s\S]*?\n\}/.exec(src)[0];
// eslint-disable-next-line no-eval
const pxWidth = eval('(' + cuerpo.replace('function pxWidth', 'function') + ')');
const T_PX = +(/T_PX\s*=\s*(\d+)/.exec(src)[1]);
console.log('funcion del auditor: FONT_PX=' + fpx + ', T_PX=' + T_PX + '\n');

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
  'Home Studio in Three Tiers: What Each One Adds'
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
  'Tres niveles de home studio y dónde merece la pena parar'
];

function linea(t) {
  const px = pxWidth(t);
  const mal = [];
  if (t.length > 60) mal.push(t.length + 'c');
  if (px > T_PX) mal.push(px + 'px');
  if (/[$€£]/.test(t)) mal.push('precio');
  return { t, n: t.length, px, mal };
}

console.log('=== EN ===\n');
EN.map(linea).sort((a, b) => a.px - b.px).forEach(x =>
  console.log('  ' + (x.mal.length ? 'X ' : 'ok') + ' ' + String(x.n).padStart(3) + 'c ' + String(x.px).padStart(3) + 'px  ' +
    x.t + (x.mal.length ? '   <- ' + x.mal.join(', ') : '')));

console.log('\n=== ES ===\n');
ES.map(linea).sort((a, b) => a.px - b.px).forEach(x =>
  console.log('  ' + (x.mal.length ? 'X ' : 'ok') + ' ' + String(x.n).padStart(3) + 'c ' + String(x.px).padStart(3) + 'px  ' +
    x.t + (x.mal.length ? '   <- ' + x.mal.join(', ') : '')));
