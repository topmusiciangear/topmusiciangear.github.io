const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-bass-home-office');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Ibanez EHB1000: Escala completa 34\\", cero pala', 'Ibanez EHB1000: escala completa de 34 pulgadas, cero pala');
swap('Escalas explicadas: 34 frente a 30 frente a multiescala headless', 'Escalas explicadas: 34 pulgadas frente a 30 frente a multiescala');
swap('bajos de viaje ultra-portátiles que vuelan en cabina', 'bajos de viaje ultraportátiles que vuelan en cabina');
swap('Un bajo de 34\\" con pala son más de 45 pulgadas de palanca junto a tus monitores.',
  'Un bajo de 34 pulgadas con pala es más de 45 pulgadas de palanca junto a tus monitores.');
swap('Una escala de 30\\" (o menos) acerca los trastes', 'Una escala de 30 pulgadas (o menos) acerca los trastes');
swap('que en sencillo significa que las graves ganan un poco de longitud', 'que en pocas palabras significa que las graves ganan un poco de longitud');
swap('la construcción neck-through de arce mantiene un sustain digno', 'la construcción a través del cuerpo de arce mantiene un sustain digno');
swap('el puente patentado DoubleBall con afinación directa 40 a 1 aguanta', 'el puente patentado DoubleBall con afinación directa 40:1 aguanta');
swap('Grabar líneas de indie y soul junto a P de escala larga mantiene el pocket con menos estiramiento',
  'Grabar líneas de indie y soul junto a P de escala larga mantiene el groove con menos estiramiento');
swap('con radio de 9,5 pulgadas y 19 trastes narrow tall resultan amables', 'con radio de 9,5 pulgadas y 19 trastes estrechos y altos resultan amables');
swap('Zapar con un Mikro junto a escalas cortas mayores aguanta el ensayo', 'Improvisar con un Mikro junto a escalas cortas mayores aguanta el ensayo');
swap('La estándar 34\\" da graves más firmes y trastes más separados', 'La estándar de 34 pulgadas da graves más firmes y trastes más separados');
swap('Los guitarristas que también tocan el bajo empiezan en 30\\" o menos;', 'Los guitarristas que también tocan el bajo empiezan en 30 pulgadas o menos;');
swap('>bajos para principiantes</a>', '>Mejores bajos para principiantes: guía para empezar</a>');
swap('>guía de bajos Fender</a>', '>Los mejores bajos Fender para cada género</a>');
swap('>mejores amplis de bajo para practicar</a>', '>Mejores amplificadores de bajo para practicar en casa</a>');
swap('>mejores amplis de bajo</a>', '>Mejores amplificadores de bajo para cada músico</a>');
swap('>Mejores amplificadores de bajo para Practicar</a>', '>Mejores amplificadores de bajo para practicar en casa</a>');
swap('>Mejores bajos para principiantes</a>', '>Mejores bajos para principiantes: guía para empezar</a>');
swap('>Mejores bajos Fender: Jazz, Precision y más</a>', '>Los mejores bajos Fender para cada género</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
