const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-pa-speakers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('Los altavoces PA son la voz de tu show en vivo. Probados en recintos desde clubes pequeños hasta festivales al aire libre.',
  'Los altavoces PA son la voz de tu directo, probados en recintos desde clubes pequeños hasta festivales al aire libre.');
// SEC0
swap('El EV ZLX-12P-G2 es la mejor opción económica. El QSC K12.2 es el estándar de gira. El Yamaha DXR12mkII ofrece calidad de sonido premium con DSP. Para sistemas de 15", la Mackie Thump215XT ($400), la EV ELX200-15P ($949) y la JBL PRX915 ($1.099) amplían la línea desde económica hasta nivel gira.',
  'El EV ZLX-12P-G2 es la mejor opción económica, el QSC K12.2 es el estándar de gira y el Yamaha DXR12mkII ofrece calidad de sonido premium con DSP. Para sistemas de 15 pulgadas, la Mackie Thump215XT ($400), la EV ELX200-15P ($949) y la JBL PRX915 ($1.099) amplían la línea desde lo económico hasta nivel de gira.');
// SEC1
swap('Woofer de 12 pulgadas con driver de compresión de titanio y 1000W Clase D. DSP quickSmart con presets de EQ. 32.67 libras. Sonido claro con sorprendentes graves. La mejor relación calidad-precio.',
  'Woofer de 12 pulgadas con driver de compresión de titanio y 1.000 W en Clase D, DSP QuickSmart con presets de EQ y 14,82 kg (32,67 lb). Sonido claro con sorprendentes graves y la mejor relación calidad-precio.');
// SEC2
swap('El QSC K12.2 es el altavoz activo más confiable en audio profesional. Woofer de 12 pulgadas con 1000W de potencia. DSP y EQ integrados. Carcasa ABS resistente para giras. Lo ves en cada venue por una razón. El estándar profesional.',
  'El QSC K12.2 es el altavoz activo más fiable en audio profesional, con woofer de 12 pulgadas y 1.000 W de potencia, DSP y EQ integrados y carcasa ABS resistente para giras. Lo ves en cada sala por una razón: el estándar profesional.');
// SEC3
swap('La Yamaha DXR12mkII combina componentes premium con DSP avanzado para una calidad de sonido excepcional. Cuenta con un amplificador Clase D de 1100W, woofer de 12 pulgadas y driver de compresión de titanio de 1,75 pulgadas.',
  'La Yamaha DXR12mkII combina componentes premium con DSP avanzado para una calidad de sonido excepcional, con un amplificador en Clase D de 1.100 W, woofer de 12 pulgadas y driver de compresión de titanio de 1,75 pulgadas.');
// SEC4
swap('DJs y bandas trabajadoras logran cobertura alta e inteligible con montaje rápido',
  'DJs y bandas que trabajan logran cobertura alta e inteligible con montaje rápido');
swap('los presets resuelven deprisa pero sin el DSP granular ni el control en red de cajas de gira',
  'los presets resuelven deprisa, pero sin el DSP granular ni el control en red de cajas de giras');
// SEC5
swap('Quince pulgadas de grave sin hernia de quince pulgadas', 'Quince pulgadas de grave sin dejarte la espalda');
swap('Bombos y bajos caen con peso físico que las cajas pequeñas solo insinúan', 'Bombos y bajos pegan con un peso físico que las cajas pequeñas solo insinúan');
swap('Cede algo de finura en medios frente a su hermano de 12 y claridad superior frente a rivales premium',
  'Pierde algo de finura en medios frente a su hermano de 12 y claridad superior frente a rivales premium');
swap('Compra el 15 cuando la autoridad en graves importe más que el microscopio vocal — DJs móviles y bandas con bajo primero en la fila',
  'Compra el 15 cuando la autoridad en graves importe más que el detalle vocal: DJs móviles y bandas con el bajo por delante');
// SEC6
swap('1000W Clase-D moviendo un woofer de 15 pulgadas hasta 133 dB con cerebro dbx DriveRack: supresión de feedback, EQ paramétrica, delay y presets, todo desde OLED o app',
  '1.000 W en Clase D alimentando un woofer de 15 pulgadas hasta 133 dB con el cerebro dbx DriveRack: antiaceople, EQ paramétrica, delay y presets, todo desde el OLED o la app');
swap('Doble asa y 24,1 kg lo mantienen movible sin roadies', 'Doble asa y 24,1 kg lo mantienen manejable sin roadies');
swap('El precio escuece una vez; la fiabilidad devuelve cada fin de semana que la caja barata habría fallado',
  'El precio escuece una vez; la fiabilidad compensa cada fin de semana que la caja barata habría fallado');
// CONCLUSION
swap('El EV ZLX-12P-G2 es la mejor opción económica. El QSC K12.2 es el estándar de gira. El Yamaha DXR12mkII ofrece calidad premium con DSP avanzado.',
  'El EV ZLX-12P-G2 es la mejor opción económica, el QSC K12.2 es el estándar de gira y el Yamaha DXR12mkII ofrece calidad premium con DSP avanzado.');
swap('Para sistemas de 15", el ELX200-15P y el PRX915 aportan los graves extra y el headroom que exigen escenarios más grandes',
  'Para sistemas de 15 pulgadas, el ELX200-15P y el PRX915 aportan los graves extra y el headroom que exigen escenarios más grandes');
swap('>Mejores sistemas PA para Bandas</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
swap('>Mejores Mezcladores de Sonido en Vivo para Bandas y Eventos</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
swap('>Mejores Micrófonos Inalámbricos para Escenario</a>', '>Mejores sistemas de micrófono inalámbricos para escenario</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
