const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-5-string-basses');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Dingwall Combustion: La respuesta 37\\" al djent', 'Dingwall Combustion: La respuesta de 37 pulgadas al djent');
swap('que en sencillo significa un tono grueso y sin zumbido', 'que en pocas palabras significa un tono grueso y sin zumbido');
swap('En sencillo, el selector remodela medios y graves por ti', 'En pocas palabras, el selector remodela medios y graves por ti');
swap('lo que en sencillo significa afinación más clara', 'lo que en pocas palabras significa afinación más clara');
swap('En sencillo, tienes slap hi-fi, fingerstyle recortado', 'En pocas palabras, tienes slap hi-fi, fingerstyle recortado');
swap('para que cada técnica se siente bien en la PA.', 'para que cada técnica suene bien en la PA.');
swap('el mástil de cinco piezas en arce y caoba con diapasón de palisandro y 24 trastes medium aguanta estable',
  'El mástil de cinco piezas en arce y caoba con diapasón de palisandro y 24 trastes medium aguanta estable');
swap('sin un mástil como un bate, este cinco fino y tostado', 'sin un mástil como un tronco, este cinco fino y tostado');
swap('y los trastes narrow tall facilitan bends y vibrato', 'y los trastes estrechos y altos facilitan bends y vibrato');
swap('Los cantos matados del diapasón y el talón esculpido permiten', 'Los cantos redondeados del diapasón y el talón esculpido permiten');
swap('los marcadores Luminlay salvan escenarios oscuros.', 'Los marcadores Luminlay salvan escenarios oscuros.');
swap('los chugs de djent y los grooves graves mantienen la afinación', 'Los chugs de djent y los grooves graves mantienen la afinación');
swap('(33–35\\" en el EHB1005MS, 34–37\\" en el Combustion)', '(33–35 pulgadas en el EHB1005MS, 34–37 en el Combustion)');
swap('(diseños 18V, herencia Gen 2 de Sire)', '(diseños de 18 V, herencia Gen 2 de Sire)');
swap('donde los de 9 recortan — eso es punch limpio', 'donde los de 9 V recortan: eso es pegada limpia');
swap('y el spacing de 16,5 a 19 mm:', 'y el espaciado de 16,5 a 19 mm:');
swap('>bajos para principiantes</a>', '>Mejores bajos para principiantes: guía para empezar</a>');
swap('>mejores bajos bajo $700</a>', '>Mejores bajos por menos de $700</a>');
swap('>Mejores bajos para principiantes</a>', '>Mejores bajos para principiantes: guía para empezar</a>');
swap('>Mejores bajos Fender: Jazz, Precision y más</a>', '>Los mejores bajos Fender para cada género</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
