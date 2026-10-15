// Candidatos con intencion SEO real: "home studio setup" + "on a budget" + "tiers"
const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/scripts/seo-audit.js', 'utf8');
const ini = src.indexOf('const T_CHARS');
const fin = src.indexOf('\n}', src.indexOf('function pxWidth')) + 2;
// eslint-disable-next-line no-eval
const medir = new Function(src.slice(ini, fin) + '\n return function (s) { return { px: pxWidth(s), chars: s.length }; };')();

const EN = [
  'Home Studio Setup on a Budget: Three Tiers Compared',
  'Home Studio on a Budget: Three Tiers, What to Buy',
  'Home Studio on a Budget: Three Tiers Explained',
  'Three Home Studio Budgets: What to Buy at Each Tier',
  'Home Studio Budget Guide: Three Tiers, Start With the Room',
  'Home Studio on a Budget: Three Tiers, Start Small',
  'Home Studio Setup on a Budget: Where to Start and What to Skip',
  'Home Studio on a Budget: Three Builds, One Signal Chain',
  'Beginner Home Studio on a Budget: Three Tiers Compared'
];

const ES = [
  'Home studio con presupuesto: tres niveles y qué comprar en cada uno',
  'Home studio por niveles: qué comprar y en qué orden',
  'Tres niveles de home studio con presupuesto realista',
  'Home studio: tres niveles, qué comprar primero',
  'Montar un home studio por niveles, empezando por la sala',
  'Home studio con poco presupuesto: tres niveles comparados',
  'Home studio por niveles: qué comprar primero y en qué orden',
  'Home studio con presupuesto: tres niveles explicados',
  'Tres presupuestos de home studio: qué comprar en cada nivel'
];

function linea(t) {
  const r = medir(t);
  const mal = [];
  if (r.chars > 60) mal.push(r.chars + 'c>60');
  if (r.px > 580) mal.push(r.px + 'px>580');
  return { t, ...r, mal };
}

function mostrar(lista, etiqueta) {
  console.log('=== ' + etiqueta + ' ===\n');
  lista.map(linea).sort((a, b) => a.px - b.px).forEach(x => {
    const head = /home studio/i.test(x.t) ? '★' : ' ';
    console.log('  ' + head + (x.mal.length ? 'X ' : 'ok') + ' ' + String(x.chars).padStart(3) + 'c ' + String(x.px).padStart(3) + 'px  ' + x.t);
  });
  console.log('');
}

mostrar(EN, 'EN');
mostrar(ES, 'ES');

// comprobacion de palabra clave principal
console.log('=== ¿incluye "home studio"? ===');
[].concat(EN).forEach(t => { if (!/home studio/i.test(t)) console.log('  EN sin head term: ' + t); });
[].concat(ES).forEach(t => { if (!/home studio/i.test(t)) console.log('  ES sin head term: ' + t); });
console.log('  (vacio = todos la llevan)');
