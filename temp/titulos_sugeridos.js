// Candidatos de titulo sin precios: longitud + comprobacion de reglas
const fs = require('fs');

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
  'Home Studio in Three Tiers, Starting With the Room'
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
  'Tres presupuestos de home studio y la compra que no debes ahorrar',
  'Home studio: qué comprar en cada nivel y qué saltar'
];

function px(s) {
  // estimacion: promedio ~0.52em, ancho de referencia 1000px a 16px de fuente
  let w = 0;
  for (const c of s) {
    if ('iljtfrI.,:;\'!| '.includes(c)) w += 0.32;
    else if ('mwMW@'.includes(c)) w += 0.88;
    else if (c === ' ') w += 0.28;
    else if (c >= '0' && c <= '9') w += 0.55;
    else w += 0.53;
  }
  return Math.round(w * 16 / 1.0 * 1.6);
}

function comprobar(t) {
  const problemas = [];
  if (t.length > 60) problemas.push('len ' + t.length + ' >60');
  if (/\d{4}/.test(t)) problemas.push('cifras');
  if (/[$€£]/.test(t)) problemas.push('precio');
  if (/2026/.test(t)) problemas.push('año');
  if (px(t) > 580) problemas.push('px ' + px(t) + ' >580');
  if (/\bunder \$|\bfor \$|\bsin menos de\b|\bpor menos de\b/i.test(t)) problemas.push('promesa de limite');
  return problemas;
}

console.log('=== EN (Title Case) ===\n');
EN.map(t => ({ t, p: comprobar(t), n: t.length, px: px(t) }))
  .sort((a, b) => a.n - b.n)
  .forEach(x => {
    console.log('  ' + (x.p.length ? 'X ' : 'ok') + ' ' + String(x.n).padStart(3) + 'c ~' + String(x.px).padStart(3) + 'px  ' + x.t);
    if (x.p.length) console.log('       -> ' + x.p.join(', '));
  });

console.log('\n=== ES (sentence case) ===\n');
ES.map(t => ({ t, p: comprobar(t), n: t.length, px: px(t) }))
  .sort((a, b) => a.n - b.n)
  .forEach(x => {
    console.log('  ' + (x.p.length ? 'X ' : 'ok') + ' ' + String(x.n).padStart(3) + 'c ~' + String(x.px).padStart(3) + 'px  ' + x.t);
    if (x.p.length) console.log('       -> ' + x.p.join(', '));
  });

// regla RAE: solo primera palabra y nombres propios con mayuscula
console.log('\n=== CHEQUEO RAE (ES): palabras con mayuscula que no deberian ===\n');
ES.forEach(t => {
  const malas = t.split(' ').filter(w => /^[A-Z]/.test(w) && !/^(Home|Montar|Tres|De|Studio)/.test(w));
  if (malas.length) console.log('  ' + t + '  -> ' + malas.join(', '));
});
console.log('  (vacío = correcto)');
