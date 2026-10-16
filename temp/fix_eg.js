const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-electric-guitar');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// Texto
swap('Una mala primera guitarra con action alta y afinación inestable', 'Una mala primera guitarra con acción alta y afinación inestable');
swap('¿El action es cómodo? ¿Las pastillas suenan limpias o embarradas?', '¿La acción es cómoda? ¿Las pastillas suenan limpias o embarradas?');
swap('y si tu guitarrista toca sobre todo blues y funk, las versiones con trémolo', 'y si tocas sobre todo blues y funk, las versiones con trémolo');
swap('cuesta 1.799 $, y el montaje de fábrica sigue necesitando un truss rod y una revisión de_ACTION como cualquier guitarra nueva',
  'cuesta $1.799, y el montaje de fábrica sigue necesitando un ajuste de alma y una revisión de acción como cualquier guitarra nueva');
swap('Con 1.799 $ no es un primer instrumento', 'Con $1.799 no es un primer instrumento');
swap('La contrapartida. 2.299 $ es precio de instrumento profesional', 'La contrapartida. $2.299 es precio de instrumento profesional');
swap('más aún al lado de una American Professional II de 1.799 $.', 'más aún al lado de una American Professional II de $1.799.');
swap('y si lo que quieres específicamente es el zumbido de una simple coil real, estos son los 800 $ equivocados',
  'y si lo que quieres específicamente es el zumbido de una simple coil real, estos son los $800 equivocados');
swap('La Alnico II del puente da el graves y el rechazo de feedback', 'La Alnico II del puente da los graves y el rechazo de feedback');
swap('mantienen las posiciones 2 y 3 exactamente donde un Estrada de Strat las espera',
  'mantienen las posiciones 2 y 3 exactamente donde un purista de la Strat las espera');
swap('Mástil Modern C de maple, radio de 9,5 pulgadas, bordes redondeados.', 'Mástil Modern C de arce, radio de 9,5 pulgadas, bordes redondeados.');
swap('Con 849 $ tiene precio de guitarra de escenario seria', 'Con $849 tiene precio de guitarra de escenario seria');
swap('Mástil Modern C de maple con bordes redondeados, dos simples', 'Mástil Modern C de arce con bordes redondeados, dos simples');
swap('La sensation de seis sillines de una Tele vintage sencillamente no está aquí', 'La sensación de seis sillines de una Tele vintage sencillamente no está aquí');
swap('Aun así, con 849 $, la alternativa es una Tele americana', 'Aun así, con $849, la alternativa es una Tele americana');
swap('y para una primera eléctrica esanamen simplicity es la característica.', 'y para una primera eléctrica esa misma simplicidad es la característica.');
swap('y el trémolo es una herramienta de principiante: no sostendrá un dive como lo haría una Floyd Rose',
  'y el trémolo es una herramienta de principiante: no sostendrá un dive bomb como lo haría una Floyd Rose');
swap('Los tradicionalistas del nitro vintage miren madera', 'Los tradicionalistas del nitro vintage se quedan con la madera');
// Anchors SEC0-3 EN -> ES
swap('href=\\"/guides/best-beginner-electric-guitar.html\\">Guía de mejores guitarras eléctricas para principiantes</a>',
  'href=\\"/guides/best-beginner-electric-guitar_es.html\\">Mejores guitarras eléctricas para principiantes: qué comprar</a>');
swap('href=\\"/guides/beginner-guitar.html\\">Guía de guitarras para principiantes</a>',
  'href=\\"/guides/beginner-guitar_es.html\\">Mejores guitarras para principiantes: guía para empezar</a>');
swap('href=\\"/guides/best-beginner-electric-guitar.html\\">Mejores guitarras eléctricas para principiantes</a>',
  'href=\\"/guides/best-beginner-electric-guitar_es.html\\">Mejores guitarras eléctricas para principiantes: qué comprar</a>');
swap('href=\\"/guides/best-bass-under-700.html\\">Mejores bajos por debajo de $700</a>',
  'href=\\"/guides/best-bass-under-700_es.html\\">Mejores bajos por menos de $700</a>');
swap('href=\\"/guides/best-electric-guitars-2026.html\\">Guía de mejores guitarras eléctricas 2026</a>',
  'href=\\"/guides/best-electric-guitars-2026_es.html\\">Mejores guitarras eléctricas para todos los estilos</a>');
swap('href=\\"/guides/player-strat-vs-pacifica.html\\">Player Strat vs Pacifica</a>',
  'href=\\"/guides/player-strat-vs-pacifica_es.html\\">Player Strat vs Yamaha Pacifica 112V: comparativa</a>');
swap('href=\\"/guides/american-pro-vs-les-paul.html\\">American Pro II vs Les Paul \\u201860s</a>',
  'href=\\"/guides/american-pro-vs-les-paul_es.html\\">American Pro II vs Les Paul \\u201860s: duelo de guitarras pro</a>');
swap('href=\\"/guides/fender-guide.html\\">Guía de guitarras Fender</a>',
  'href=\\"/guides/fender-guide_es.html\\">Las mejores guitarras Fender para cada género</a>');
swap('href=\\"/guides/pro-guitars.html\\">Guía de guitarras profesionales</a>',
  'href=\\"/guides/pro-guitars_es.html\\">Ultra II Stratocaster vs Les Paul Standard \\u201860s</a>');
swap('href=\\"/guides/american-pro-vs-les-paul.html\\">American Pro II vs Les Paul</a>',
  'href=\\"/guides/american-pro-vs-les-paul_es.html\\">American Pro II vs Les Paul \\u201860s: duelo de guitarras pro</a>');
swap('href=\\"/guides/best-interface.html\\">Guía de mejores interfaces de audio</a>',
  'href=\\"/guides/best-interface_es.html\\">Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('href=\\"/guides/best-guitar-home-office.html\\">Guía de guitarras para home office</a>',
  'href=\\"/guides/best-guitar-home-office_es.html\\">Mejores guitarras para trabajar desde casa</a>');
swap('href=\\"/guides/best-guitar-home-office.html\\">Mejores guitarras para grabación casera</a>',
  'href=\\"/guides/best-guitar-home-office_es.html\\">Mejores guitarras para trabajar desde casa</a>');
// Anchors CONCLUSION
swap('>guía de guitarra para principiantes</a>', '>Mejores guitarras para principiantes: guía para empezar</a>');
swap('>mejores guitarras eléctricas para principiantes</a>', '>Mejores guitarras eléctricas para principiantes: qué comprar</a>');
swap('>guía de compras Fender</a>', '>Las mejores guitarras Fender para cada género</a>');
swap('>comparativa American Pro II vs Les Paul</a>', '>American Pro II vs Les Paul \\u201860s: duelo de guitarras pro</a>');
swap('>mejores bajos por debajo de $700</a>', '>Mejores bajos por menos de $700</a>');
swap('>Player Strat vs Pacifica</a>', '>Player Strat vs Yamaha Pacifica 112V: comparativa</a>');
swap('>guitarras para espacios pequeños</a>', '>Mejores guitarras para trabajar desde casa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
