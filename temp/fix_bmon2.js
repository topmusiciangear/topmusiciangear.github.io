const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-monitors');
let S = JSON.stringify(gg);
let n = 0;
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a); n++;
  console.log('  ok ' + a.slice(0, 60));
}
swap('es el monitor que recomiendo cuando alguien dice \'quiero un gran sonido pero tengo un presupuesto muy ajustado.</strong>\'',
  'es el monitor que recomendaría a quien dice «quiero un gran sonido pero tengo un presupuesto muy ajustado».</strong>');
swap('El Kali LP-UNF es el par de monitoreo serio más pequeño de esta guía', 'El Kali LP-UNF es el par de monitorización serio más pequeño de esta guía');
swap('Cada lado monta un woofer de 4,5 pulgadas de larga excursión', 'Cada lado monta un woofer de 4,5 pulgadas de largo recorrido');
swap('con guía de onda 3-D que amplía el punto óptimo de escucha', 'con guía de onda 3-D que amplía el punto ideal de escucha');
swap('El sistema biamplificado de 160W (40W + 40W por canal)', 'El sistema biamplificado de 160 W (40 W + 40 W por canal)');
swap('Para el escritorio de un apartamento pequeño, sin embargo, queda por debajo de gran parte de la competencia compacta',
  'Para el escritorio de un apartamento pequeño, sin embargo, queda por debajo de casi toda la competencia compacta');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
const t = JSON.stringify(g.find(x => x.id === 'budget-monitors'));
const i = t.indexOf('Mejores monitores por menos de $500');
console.log('\nanchor cola sec6: ' + JSON.stringify(t.slice(Math.max(0, i - 120), i + 60)));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
