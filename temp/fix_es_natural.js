const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-bass-home-office');
const R = [
  // meta
  ['8 bajos silenciosos para home office comparados (2026)', '8 bajos silenciosos para home office: comparativa (2026)'],
  // intro
  ['y volumen que viaja por paredes', 'y un volumen que atraviesa las paredes'],
  ['diseños headless que recortan longitud sin recortar escala', 'diseños headless que reducen la longitud sin sacrificar escala'],
  ['clásicos de escala corta que reducen alcance con tono real', 'clásicos de escala corta que acortan el alcance sin perder el tono real'],
  // sec0
  ['Un bajo de 34" con pala supera 45 pulgadas de palanca junto a tus monitores.', 'Un bajo de 34" con pala son más de 45 pulgadas de palanca junto a tus monitores.'],
  ['Los bajos de escala corta atacan el otro extremo: alcance.', 'Los bajos de escala corta resuelven el otro extremo: el alcance.'],
  ['guitarristas doblando bajo y sesiones largas', 'guitarristas que también tocan el bajo y sesiones largas'],
  ['por auriculares o interfaz pequeña, nadie lo nota', 'con auriculares o una interfaz pequeña, nadie lo nota'],
  ['Las tres categorías de abajo cubren cada escritorio.', 'Las tres categorías de abajo valen para cualquier escritorio.'],
  ['Después lee cómo difieren las escalas y cómo tocar en silencio.', 'Más abajo explicamos las escalas y cómo tocar en silencio.'],
  // sec1
  ['mientras el cuerpo headless recorta la longitud total drásticamente.', 'mientras el cuerpo headless recorta drásticamente la longitud total.'],
  ['Cuerpo chambered de tilo americano', 'Cuerpo aligerado (chambered) de tilo americano'],
  // sec2
  ['que balancea la tensión cuerda por cuerda.', 'que equilibra la tensión de cada cuerda.'],
  ['Humbuckers Marcus Pure-H Revolution alimentan el previo Heritage-3', 'Humbuckers Marcus Pure-H Revolution con previo Heritage-3'],
  ['mástil C de cinco piezas arce/caoba', 'mástil C de cinco piezas de arce/caoba'],
  // sec3
  ['el bajo honesto más pequeño que aún se siente bajo.', 'el bajo más pequeño que se sigue sintiendo como un bajo.'],
  ['Piezo pasivo Shadow sin batería que muera a mitad de viaje', 'Piezo pasivo Shadow sin batería que se agote a mitad de viaje'],
  ['marco lap-rest desmontable para tocar sentado', 'apoyo desmontable para la pierna (lap-rest) para tocar sentado'],
  ['construcción neck-through de arce', 'construcción neck-through (mástil a través del cuerpo) de arce'],
  // sec4
  ['El único bajo aquí practicable solo con auriculares y nada más.', 'El único bajo de esta guía con el que puedes practicar solo con auriculares, sin nada más.'],
  ['funciona con dos AAA, alimentando un bajo de escala media', 'funciona con dos pilas AAA y alimenta un bajo de escala media'],
  // sec5
  ['Los subgraves sorprenden a cada oyente primerizo', 'Los subgraves sorprenden a quien lo escucha por primera vez'],
  // sec6
  ['Tacto Fender real, reventa real, cero curva para bajistas P y J.', 'Tacto Fender auténtico, buena reventa, sin curva de aprendizaje para bajistas de P y J.'],
  // sec7
  ['por el menor presupuesto aquí.', 'con el presupuesto más bajo de esta guía.'],
  ['llevan dos single-coils — brillantes y abiertas, pero sin cancelación de hum', 'llevan dos single-coils — brillantes y abiertos, pero sin cancelación de hum'],
  ['El stock nuevo escasea ahora, revisa disponibilidad.', 'El stock nuevo escasea ahora mismo, revisa disponibilidad.'],
  // sec8
  ['Veintiocho coma seis pulgadas de PJ pasivo en cuerpo Concert de álamo — hecho para guitarristas que necesitan líneas de bajo rápido.', '28,6 pulgadas de PJ pasivo en cuerpo Concert de álamo — hecho para guitarristas que necesitan líneas de bajo rápidas.'],
  ['El asiento más barato de este escritorio.', 'La opción más barata de esta guía.'],
  // sec9
  ['La corta 30" (o menos) acorta trastes para manos pequeñas', 'La corta de 30" (o menos) acerca los trastes para manos pequeñas'],
  ['Guitarristas doblando bajo empiezan en 30" o menos; bajistas de carrera mantienen 34" headless o multiescala.', 'Los guitarristas que también tocan el bajo empiezan en 30" o menos; los bajistas profesionales mantienen 34" headless o multiescala.'],
  ['Para puntos de partida por presupuesto, revisa', 'Para opciones por presupuesto, revisa'],
  ['Escalas explicadas: 34 contra 30 contra multiescala headless', 'Escalas explicadas: 34 frente a 30 frente a multiescala headless'],
  // sec10
  ['Solo un bajo aquí suena solo con auriculares', 'Solo un bajo de esta guía suena únicamente con auriculares'],
  ['Olvida amplis tradicionales en espacios compartidos.', 'Descarta los amplis tradicionales en espacios compartidos.'],
  ['Cuando quieras mover aire, ve pequeño y específico de bajo.', 'Cuando quieras mover aire, opta por algo pequeño y específico de bajo.'],
  ['Los combos de práctica voiced para bajo mantienen graves firmes', 'Los combos de práctica diseñados para bajo mantienen graves firmes'],
  // conclusion
  ['el Fender Player II Mustang PJ es el escala corta seguro que mantiene reventa', 'el Fender Player II Mustang PJ es el escala corta fiable que mantiene reventa'],
  // verdict
  ['¿El bajo volable más ligero? Traveler Ultra-Light.', '¿El bajo más ligero para volar? Traveler Ultra-Light.'],
  ['¿Estética clásica lo más barato? Gretsch G2220.', '¿Estética clásica al precio más bajo? Gretsch G2220.'],
  // table
  ['Bajo honesto más ligero para vuelos', 'El más ligero para volar'],
  ['Sólido de viaje', 'De viaje'],
  ['Tilo americano chambered', 'Tilo americano aligerado (chambered)'],
  ['Caoba (fresno en sandblasted)', 'Caoba (fresno en acabado sandblasted)'],
  ['Arce neck-through, cuerpo mínimo', 'Mástil continuo de arce, cuerpo mínimo'],
  ['Okoume offset, brillo', 'Okoume offset, acabado brillo'],
  ['Aliso, poliéster brillo', 'Aliso, brillo poliéster'],
  ['5 piezas arce tostado/nogal, 24 inox', 'Arce tostado/nogal 5 piezas, 24 trastes inox'],
  ['Arce 1 pieza speed, amaranto 12", 22 jumbo', 'Mástil speed arce 1 pieza, amaranto 12", 22 jumbo'],
  ['Piezo Shadow bajo cejuela (pasivo)', 'Piezo Shadow under-saddle (pasivo)'],
  ['Vol + Tono master, 3 posic.', 'Volumen + Tono master, 3 posiciones'],
  ['Vol + Tono master, toggle 3 posic.', 'Volumen + Tono master, toggle 3 posiciones'],
  ['2x Vol + Tono master', '2x Volumen + Tono master'],
  // verdicts
  ['Cuerpo chambered, trastes inox, hardware pro', 'Cuerpo aligerado, trastes inox, hardware pro'],
  ['La EQ activa pide batería salvo bypass', 'La EQ activa requiere batería salvo bypass'],
  ['La multiescala pide adaptación a tradicionalistas', 'La multiescala requiere adaptación si vienes de escalas tradicionales'],
  ['Piezo pasivo, ninguna batería muere', 'Piezo pasivo, sin batería que se agote'],
  ['Cuerpo mínimo pide adaptación sentado', 'Cuerpo mínimo que requiere adaptación para tocar sentado'],
  ['Marco lap-rest y funda incluidos', 'Soporte lap-rest y funda incluidos'],
  ['Ampli de auriculares más aux-in — practica solo en cualquier lugar', 'Ampli de auriculares más aux-in — practica a solas en cualquier lugar'],
  ['Familiar escala media 32"', 'Escala media de 32", familiar'],
  ['Sin salida sin 2 pilas AAA', 'Sin pilas AAA no hay salida'],
  ['Portátil en mochila con funda', 'Cabe en mochila, funda incluida'],
  ['Espaciado estrecho reta manos grandes', 'Espaciado estrecho difícil para manos grandes'],
  ['Fuerte valor de reventa', 'Buen valor de reventa'],
  ['Mástil poliéster brillo divide amantes del satén', 'Mástil de brillo poliéster que divide a amantes del satén'],
  ['Single-coils actuales zumban — sin cancelar', 'Los single-coils actuales zumban — sin cancelación'],
  ['Stock nuevo escaso en todos lados ahora', 'Stock nuevo escaso en todas partes ahora mismo'],
  ['PJ pasivo — sin batería jamás', 'PJ pasivo — sin batería nunca'],
  ['El más barato de los ocho, por lejos', 'El más barato de los ocho, con diferencia'],
  // faq
  ['recortando 6 a 8 pulgadas de longitud total', 'recortando entre 6 y 8 pulgadas de longitud total'],
  ['y el balance sentado mejora.', 'y mejora el equilibrio al tocar sentado.'],
  ['Olvida amplis tradicionales en espacios compartidos', 'Descarta los amplis tradicionales en espacios compartidos'],
  ['Para manos pequeñas y guitarristas doblando bajo, sí.', 'Para manos pequeñas y guitarristas que también tocan el bajo, sí.'],
  ['que nadie nota por auriculares o interfaz pequeña.', 'que nadie nota con auriculares o una interfaz pequeña.'],
  ['son dramáticamente más cortos y viajan mucho más fácil.', 'son dramáticamente más cortos y viajar con ellos es mucho más fácil.'],
  ['la multiescala a buscadores de tensión pareja.', 'la multiescala es mejor para buscadores de tensión pareja.'],
  // snippet
  ['El Traveler Ultra-Light Bass es el bajo volable más ligero con 1,55 kg.', 'El Traveler Ultra-Light Bass es el bajo más ligero para volar con 1,55 kg.']
];
let s = JSON.stringify(G);
let fails = [];
R.forEach(([a, b]) => {
  if (!s.includes(a)) { fails.push(a.slice(0, 60)); return; }
  s = s.split(a).join(b);
});
fs.writeFileSync('data/guides.json', JSON.stringify(JSON.parse(s), null, 2));
const g2 = JSON.parse(s).find(x => x.id === 'best-bass-home-office');
console.log('fails: ' + fails.length);
fails.forEach(f => console.log('  MISS: ' + f));
console.log('volverse | volverse check:', /doblando bajo/.test(s) ? 'TODAVIA HAY' : 'limpio');
console.log('posic. check:', /posic\./.test(JSON.stringify(g2)) ? 'TODAVIA HAY' : 'limpio');
