const fs = require('fs');
const GF = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(GF, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

// comprobacion con la funcion real del auditor
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/scripts/seo-audit.js', 'utf8');
const ini = src.indexOf('const T_CHARS');
const fin = src.indexOf('\n}', src.indexOf('function pxWidth')) + 2;
// eslint-disable-next-line no-eval
const medir = new Function(src.slice(ini, fin) + '\n return function (s){return {px:pxWidth(s),c:s.length};};')();

const CAMBIOS = [
  ['titleTag', 'Home Studio on a Budget: Three Tiers, What to Buy'],
  ['title_es', 'Home studio por niveles: qué comprar y en qué orden'],
  ['titleTag_es', 'Home studio por niveles: qué comprar y en qué orden']
];

CAMBIOS.forEach(([campo, nuevo]) => {
  const antes = guia[campo];
  guia[campo] = nuevo;
  const m = medir(nuevo);
  const ok = m.c <= 60 && m.px <= 580 && !/[$€£]/.test(nuevo) && !/\d{4}/.test(nuevo);
  console.log((ok ? '  ok  ' : '  X   ') + campo);
  console.log('       antes: "' + antes + '" (' + medir(antes).c + 'c / ' + medir(antes).px + 'px)');
  console.log('       ahora: "' + nuevo + '" (' + m.c + 'c / ' + m.px + 'px)');
});

// el H1 de la pagina suele venir de title_es/title
console.log('\n  title (EN, sin tocar): "' + guia.title + '"');
fs.writeFileSync(GF, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\n  mojibake: ' + (fs.readFileSync(GF, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
