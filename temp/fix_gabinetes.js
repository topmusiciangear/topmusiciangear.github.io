const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

const PARES = [
  ['Gabinete de polipropileno construido para giras constantes', 'Caja de polipropileno para giras constantes'],
  ['Gabinete de aluminio fundido que actúa como disipador', 'Caja de aluminio fundido que actúa como disipador'],
  ['Gabinete de aluminio fundido MDE', 'Caja de aluminio fundido MDE'],
  ['Gabinete MDE con difracción casi nula', 'Caja MDE con difracción casi nula'],
  ['Gabinete de abedul báltico de gira a 56 kg', 'Caja de abedul báltico de gira a 56 kg'],
  ['Gabinete compacto de 28.5 cm', 'Caja compacta de 28.5 cm'],
  ['Gabinete ABS ligero de 15.6 kg', 'Caja ABS ligera de 15.6 kg'],
  ['Gabinete contrachapado DuraFlex más durable', 'Caja contrachapada DuraFlex más durable'],
  ['Gabinetes DynIR capturan salas y posiciones de micrófono reales', 'Las cajas DynIR capturan salas y posiciones de micrófono reales'],
  ['Gabinetes virtuales DynIR con efectos de estudio', 'Cajas virtuales DynIR con efectos de estudio'],
  ['Amplis a Nivel de Componente Con Gabinetes de Estudio', 'Amplis a Nivel de Componente Con Cajas de Estudio'],

  ['Gabinete de gira en abedul báltico de 56 kg', 'Caja de gira en abedul báltico de 56 kg'],
  ['con gabinete portado', 'con caja con puerto'],
  ['en un gabinete de abedul de 18 mm', 'en una caja de abedul de 18 mm'],
  ['gabinete con recubrimiento de poliurea', 'caja con recubrimiento de poliurea'],
  ['el gabinete permanece quieto', 'la caja permanece quieta'],
  ['en un gabinete con puerto frontal', 'en una caja con puerto frontal'],
  ['con el gabinete de aluminio fundido MDE', 'con la caja de aluminio fundido MDE'],
  ['en un gabinete sellado de 18 litros', 'en una caja sellada de 18 litros'],
  ['500W por gabinete', '500W por caja'],
  ['Su gabinete de madera ligera', 'Su caja de madera ligera'],
  ['en gabinetes de guitarra', 'en cajas de guitarra']
];

let total = 0;
['data/guides.json', 'data/products.json'].forEach(rel => {
  const f = B + rel;
  let s = fs.readFileSync(f, 'utf8');
  let n = 0;
  PARES.forEach(([a, b]) => {
    if (s.indexOf(a) >= 0) { const m = s.split(a).length - 1; s = s.split(a).join(b); n += m; }
  });
  // resto, con concordancia basica
  const antes = (s.match(/[Gg]abinetes?/g) || []).length;
  s = s.replace(/[Gg]abinetes? Enlight/g, '');
  s = s.replace(/Gabinetes? portad[oa]/g, m => m.replace('portado', 'con puerto').replace('portada', 'con puerto'));
  s = s.replace(/Gabinetes? ligero/g, 'Caja ligera')
       .replace(/gabinete ligero/g, 'caja ligera')
       .replace(/Gabinetes? compacto/g, 'Caja compacta')
       .replace(/gabinete compacto/g, 'caja compacta')
       .replace(/Gabinetes? sellad[oa]/g, m => m.slice(0, 6) + 'sellad' + (m.slice(-1) === 'o' ? 'a' : 'o'))
       .replace(/gabinete sellad[oa]/g, m => m.slice(0, 8) + 'sellad' + (m.slice(-1) === 'o' ? 'a' : 'o'))
       .replace(/Gabinetes? construid[oa]/g, m => m.slice(0, 9) + 'construid' + (m.slice(-1) === 'o' ? 'a' : 'o'))
       .replace(/Gabinetes?/g, 'Cajas')
       .replace(/gabinetes/g, 'cajas')
       .replace(/Gabinete/g, 'Caja')
       .replace(/gabinete/g, 'caja');
  const despues = (s.match(/[Gg]abinetes?/g) || []).length;
  if (n || despues !== antes) { fs.writeFileSync(f, s, 'utf8'); }
  console.log(rel + ': pares exactos=' + n + ' | sustituciones por regla=' + (antes - despues));
  total += n + (antes - despues);
});
console.log('');
console.log('TOTAL en el sitio: ' + total);
['data/guides.json', 'data/products.json'].forEach(rel => {
  const s = fs.readFileSync(B + rel, 'utf8');
  console.log(rel + ' -> quedan "gabinete": ' + (s.match(/[Gg]abinetes?/g) || []).length);
});