const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const ruta = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(ruta, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

const cambios = [
  // --- calcos del ingles ---
  ['Valor satélite para tocar, escribir y editar vídeo', 'Vale para tocar, escribir y editar vídeo'],
  ['Mejor relación features-precio', 'Mejor relación funciones-precio'],
  ['Mejor primer monitor todoterreno', 'Mejor monitor para empezar de cero'],
  ['comparte el techo de graves compacto', 'llega exactamente igual de bajo'],
  ['comparte el techo de graves de los otros pares compactos', 'llega igual de bajo que los otros pares compactos'],
  ['un altavoz que produce graves y uno que produce graves con los que puedes mezclar', 'un altavoz que produce graves y otro que produce graves con los que se puede mezclar'],
  ['si no quieres|teamar con una aplicación de móvil', 'si no quieres lidiar con una aplicación de móvil'],
  ['salida de auriculares frontal y un frontal Hi-Res Audio de 24 bits/96 kHz', 'salida de auriculares en el frente y un frontal Hi-Res Audio de 24 bits/96 kHz'],
  ['un realce y un corte de estante fijos sin frecuencias publicadas', 'un realce y un corte fijos de graves y agudos, sin frecuencias publicadas'],
  ['La razón por la que este sigue cabezonear las tablas de presupuesto es el panel trasero, no los drivers.', 'La razón por la que sigue ganando las comparativas de precio no son los drivers: es el panel trasero.'],
  ['Que los centros estén definidos es justamente el punto.', 'Que los centros estén definidos es justo lo importante.'],
  ['El knob de tono es raro a este precio y realmente útil.', 'El knob de tono es raro a este precio, y muy útil.'],
  ['un woofer de 4,5 pulgadas de fibra de vidrio trenzada va montado detrás de la guía de ondas EBM que PreSonus desarrolló para sus modelos superiores', 'un woofer de 4,5 pulgadas de fibra de vidrio trenzada detrás de la guía de ondas EBM que PreSonus desarrolló para sus modelos de gama alta'],
  ['sin esa cualidad fina y forzada que dan los diseños Clase D a volúmenes bajos', 'sin ese sonido delgado y forzado que sacan los diseños Clase D a volúmenes bajos'],
  ['Desacoplar los gabinetes de un escritorio hueco', 'Desacoplar las cajas del escritorio hueco'],
  ['A $139.00 es el segundo más caro de esta lista junto a otro y no llega tan bajo', 'A $139.00 es el segundo más caro de la lista y no llega tan bajo'],
  ['Si tu material tiene graves de verdad', 'Si lo que mezclas tiene graves de verdad'],
  ['significan que esto es un monitor de comprobación y edición, no de mezcla', 'significan que esto sirve para revisar y editar, no para mezclar'],
  ['Entonces, ¿quién debería comprarlo?', '¿Quién debería comprarlo entonces?'],
  ['Para ese trabajo la compra correcta es el PreSonus Eris E4.5', 'Para ese trabajo, lo que tienes que comprar es el PreSonus Eris E4.5'],
  ['y los cubrimos a fondo en nuestras guías generales', 'y los explicamos a fondo en nuestras guías generales'],
  ['y es el único de esta lista que incluye pads de aislamiento por noventa y nueve dólares', 'y es el único de esta lista que trae los pads de aislamiento en la caja por $99'],
  ['A $99.99 el Edifier MR3 es el par más completo por euro de esta lista, y ni de lejos.', 'A $99.99 el Edifier MR3 es, sin discusión, el par más completo de la lista por lo que cuesta.'],
  ['Todo lo demás en esta categoría se queda con un lado de ese trato.', 'Todo lo demás en esta categoría se queda con una de las dos.'],
  ['Si tu escritorio es pequeño y tu sala está sin tratar', 'Si vas justo de espacio en la mesa y además la sala está sin tratar']
];

const hallazgos = [];
const aplicar = (obj) => {
  if (typeof obj === 'string') {
    let t = obj;
    for (const [de, a] of cambios) {
      if (t.includes(de)) { t = t.split(de).join(a); hallazgos.push(de.slice(0, 62)); }
    }
    return t;
  }
  if (Array.isArray(obj)) return obj.map(aplicar);
  if (obj && typeof obj === 'object') { const s = {}; for (const k of Object.keys(obj)) s[k] = aplicar(obj[k]); return s; }
  return obj;
};

const limpio = aplicar(g);
Object.keys(limpio).forEach(k => { g[k] = limpio[k]; });
fs.writeFileSync(ruta, JSON.stringify(guides, null, 2), 'utf8');

console.log('CAMBIOS APLICADOS: ' + hallazgos.length);
hallazgos.forEach(h => console.log('  - ' + h));

// comprobar que no quedan restos de los calcos
const buscar = (o, acc) => {
  if (typeof o === 'string') acc.push(o);
  else if (Array.isArray(o)) o.forEach(x => buscar(x, acc));
  else if (o && typeof o === 'object') Object.values(o).forEach(x => buscar(x, acc));
  return acc;
};
const todas = buscar(g, []);
const restos = ['features', 'todoterreno', 'valor satélite', 'gabinetes', 'de estante fijos', 'teamar', 'techo de graves'];
console.log('\nRESTOS DE CALCO:');
let ok = true;
restos.forEach(r => {
  const n = todas.filter(t => t.includes(r)).length;
  if (n) { ok = false; console.log('  ! "' + r + '" x' + n); }
});
if (ok) console.log('  ninguno');
