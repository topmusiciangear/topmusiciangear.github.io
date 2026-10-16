const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'zlx-vs-k12');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('son los altavoces autoamplificados más populares para sonido en vivo portátil',
  'son los altavoces activos más populares para sonido en vivo portátil');
// SEC0
swap('esta caja de segunda generación clava el equilibrio entre potencia y sencillez',
  'esta caja de segunda generación logra el equilibrio entre potencia y sencillez');
swap('La amplificación Clase-D con generoso margen de pico mantiene bombo y voces limpios al apretar',
  'La amplificación en Clase D con generoso margen de pico mantiene bombo y voces limpios al subir el volumen');
swap('Las presentaciones en bares con cajas de preajustes de esta clase suelen montarse en minutos, no en horas',
  'Las presentaciones en bares con cajas de esta clase con preajustes suelen montarse en minutos, no en horas');
swap('Ideales para DJs móviles y bandas que giran. Revisa los pies, la cobertura y la combinación con subgraves antes de comprar',
  'Ideales para DJs móviles y bandas de gira. Revisa los soportes, la cobertura y la combinación con subgraves antes de comprar');
// SEC1
swap('Su amplificación clase D ofrece 2000 vatios pico con claridad cristalina en toda la respuesta en frecuencia',
  'Su amplificación en clase D ofrece 2.000 vatios de pico con claridad cristalina en toda la respuesta en frecuencia');
swap('La guía de onda proporciona un patrón de cobertura de 75 grados que suena consistente en todo el espacio',
  'La guía de onda proporciona un patrón de cobertura de 75 grados con cobertura consistente en todo el espacio');
swap('Con su margen dinámico a gran escala, el K12.2 produce niveles de sonido limpios que los altavoces más pequeños no pueden alcanzar sin distorsionar',
  'Con su margen dinámico de sobra, el K12.2 produce niveles de sonido limpios que los altavoces más pequeños no pueden alcanzar sin distorsionar');
// SEC2 + heading
swap('¿Vale la pena el costo extra del QSC K12.2 sobre el EV ZLX-12P-G2?', '¿Vale la pena el coste extra del QSC K12.2 sobre el EV ZLX-12P-G2?');
swap('El K12.2 mantiene la compostura a niveles de concierto donde el ZLX comienza a forzarse',
  'El K12.2 aguanta el tipo a niveles de concierto, donde el ZLX empieza a ir forzado');
swap('Para bodas, eventos corporativos y lugares pequeños, el ZLX-12P-G2 es más que adecuado',
  'Para bodas, eventos corporativos y salas pequeñas, el ZLX-12P-G2 es más que adecuado');
swap('Para giras y lugares grandes donde la fiabilidad y la salida son críticas, la inversión extra del K12.2 se amortiza en rendimiento y longevidad',
  'Para giras y recintos grandes donde la fiabilidad y la salida son críticas, la inversión extra del K12.2 se amortiza en rendimiento y longevidad');
// SEC3
swap('Para compradores con presupuesto ajustado, bandas con poco presupuesto y lugares pequeños, el EV ZLX-12P-G2 ofrece una buena relación calidad-precio que manejará la mayoría de los conciertos con facilidad',
  'Para compradores con presupuesto ajustado, bandas con poco presupuesto y salas pequeñas, el EV ZLX-12P-G2 ofrece una buena relación calidad-precio que cubrirá la mayoría de los conciertos con facilidad');
swap('Para empresas de sonido profesionales, músicos de gira y lugares que necesitan fiabilidad ultrafiable y audio cristalino a alto SPL',
  'Para empresas de sonido profesionales, músicos de gira y salas que necesitan fiabilidad a toda prueba y audio cristalino a alto SPL');
// CONCLUSION + anchors
swap('>Mejores Sistemas PA para Bandas</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
swap('>Mejores Micrófonos Inalámbricos para Escenario</a>', '>Mejores sistemas de micrófono inalámbricos para escenario</a>');
swap('>DXR12mkII vs PRX ONE</a>', '>Yamaha DXR12 vs JBL PRX ONE: altavoz vs columna</a>');
swap('>guía de PA para sonido en vivo</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
