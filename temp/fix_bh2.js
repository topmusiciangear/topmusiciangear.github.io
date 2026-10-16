const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-headphones');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// SEC0
swap('Busca modelos cuya respuesta esté cerca de ser plana', 'Busca modelos cuya respuesta sea cercana a plana');
swap('Un cable extraíble supone que puedes reemplazarlo', 'Un cable extraíble significa que puedes reemplazarlo');
// SEC1
swap('con una extensión de graves suave y controlada hasta 20 Hz y más abajo',
  'con una extensión de graves suave y controlada hasta 20 Hz e incluso por debajo');
// SEC2
swap('son el estándar de transmisión desde 1991', 'son el estándar de broadcast desde 1991');
swap('furgonetas de transmisión e innumerables estudios caseros', 'furgonetas de exteriores e innumerables estudios caseros');
swap('Sus pegas son el cable fijo no desmontable y enrollado', 'Sus pegas son el cable fijo en espiral');
// SEC3
swap('Las copas circumaurales aíslan bien para un aislamiento sólido', 'Las copas circumaurales aíslan bien');
swap('y algunos sienten el ajuste apretado al principio', 'y algunos lo notan apretado al principio');
// SEC4
swap('sirve para conectar directos a equipo de estudio', 'sirve para conectarlos directamente a equipo de estudio');
swap('el cable es fijo y no desmontable, así que un cable roto supone auriculares nuevos',
  'el cable es fijo, así que un cable roto supone auriculares nuevos');
// SEC5
swap('es una decisión muy ajustada a casi el mismo precio', 'es una elección muy reñida a casi el mismo precio');
// SEC6
swap('con drivers de 50mm', 'con drivers de 50 mm');
swap('y la trasera semiabierta mantiene los graves honestos', 'y la parte trasera semiabierta mantiene los graves honestos');
swap('el cable es fijo y no desmontable, y hay algo de brillo', 'el cable es fijo, y hay algo de brillo');
// SEC7 + heading
swap('¿siguen los AKG K240 Studio siendo los $89 mejor gastados del audio?',
  '¿siguen los AKG K240 Studio siendo la mejor forma de gastar $89 en audio?');
// SEC8
swap('las copas plegables se pliegan en plano para la mochila', 'las copas se pliegan en plano para la mochila');
swap('Casi cada pieza es reemplazable, por eso pares de hace una década siguen dando guerra',
  'Casi todas las piezas son reemplazables, por eso pares de hace una década siguen dando guerra');
// CONCLUSION
swap('los convierten en el más preciso del grupo', 'los convierten en los más precisos del grupo');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
