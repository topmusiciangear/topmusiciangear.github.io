const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const g = G.find(x => x.id === 'best-5-string-basses');
const vals = [
  ['Cheapest way into five strings', 'La forma más barata de entrar a las cinco cuerdas'],
  ['StingRay punch on a budget', 'Pegada StingRay con poco presupuesto'],
  ['Versatile active five for gigging', 'Cinco cuerdas activo y versátil para bolos'],
  ['Classic Jazz tone for beginners', 'Tono Jazz clásico para empezar'],
  ['Modern punch for rock and metal', 'Pegada moderna para rock y metal'],
  ['Workhorse P/J versatility', 'Versatilidad P/J para trabajar'],
  ['Fast neck for prog and fusion', 'Mástil rápido para prog y fusión'],
  ['Vintage vibe and feel', 'Estética y tacto vintage'],
  ['The pro session standard', 'El estándar profesional de sesión'],
  ['Flagship Fender five-string', 'El cinco cuerdas insignia de Fender'],
  ['Ergonomic headless multiscale for prog', 'Multiescala sin pala ergonómico para prog'],
  ['Fanned-fret clarity for prog metal', 'Claridad de trastes abanico para prog metal']
];
g.productTable.rows.unshift({
  label: 'Best For', label_es: 'Ideal para',
  values: vals.map(([en, es]) => ({ value: en, value_es: es }))
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('BestFor añadida a best-5-string-basses');