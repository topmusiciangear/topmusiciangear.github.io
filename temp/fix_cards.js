// Las tarjetas se generan desde sections[].products, no desde featuredProducts.
// Anadir ahi el M20x (609) y el NT1 Signature (297), que estaban en
// featuredProducts pero sin tarjeta. Cerrar ademas los 2 productos que
// tienen tarjeta y no tienen veredicto.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const N = id => { const p = list.find(x=>x.id===id); return p?p.title:'??'+id; };
const g = guides.find(x => x.id === 'starter-studio');

// ── 1) anadir M20x y NT1 Signature a secciones (de ahi salen las tarjetas) ──
const add = (patron, ids) => {
  const s = g.sections.find(x => patron.test(x.heading));
  if (!s) { console.log('!! seccion no encontrada: ' + patron); return; }
  s.products = s.products || [];
  const nuevos = ids.filter(id=>!s.products.includes(id));
  s.products.push(...nuevos);
  console.log('  ' + s.heading.slice(0,52) + ' (+' + nuevos.length + '): [' + s.products.join(', ') + ']');
};
console.log('=== anadir a secciones ===');
add(/Three Budgets/, [609, 297]);
add(/Monitors You Cannot Skip/, [609]);
add(/Dynamic vs the Condenser/, [297]);

// ── 2) veredictos para los 2 que tienen tarjeta y no veredicto ──
const VERDICTS_NUEVOS = [
  {
    name: 'Aston Microphones Shield GN Pop Filter', name_es: 'Filtro Antipop Aston Microphones Shield GN', productId: 39,
    pros: [
      'Stainless steel body and a curved frame that clamps to almost any desk or stand',
      'HexTech filter holes kill plosives without the sibilance of a thick foam windscreen',
      'The go-to pop filter in studios that record spoken word — podcasters and voiceover artists',
      'Works on any condenser without taking anything off the tone'
    ],
    cons: [
      'At $49 it costs more than the dynamic microphone it protects',
      'Needs a separate mic arm or desk clamp — the mount is included but the stand is not',
      'The HexTech pattern is less effective on sibilance than a foam screen',
      'Metal surface can ring if you bump it while recording'
    ],
    pros_es: [
      'Cuerpo de acero inoxidable y marco curvado que se fija a casi cualquier escritorio o pie',
      'Los agujeros HexTech matan las explosivas sin la sibilancia de un antiviento de espuma gruesa',
      'El filtro de referencia en estudios de voz: podcasters y locutores',
      'Funciona con cualquier condensador sin quitarle nada al tono'
    ],
    cons_es: [
      'A $49 cuesta más que el micrófono dinámico que protege',
      'Necesita brazo de micro o pinza aparte — el soporte viene incluido, el pie no',
      'El patrón HexTech es menos eficaz contra la sibilancia que una pantalla de espuma',
      'La superficie metálica puede sonar si la golpeas durante la grabación'
    ]
  },
  {
    name: 'Mogami Gold Studio XLR Cable', name_es: 'Cable Mogami Gold Studio XLR', productId: 167,
    pros: [
      'Reference-grade Neglex quad conductor — the standard in top studios for decades',
      'Gold-plated connectors with a locking mechanism that will not pop loose mid-take',
      'Runs from interface to mic with no hum, no buzz and no loss of top end',
      'A cable that stops being a suspect: one less thing to debug when a take is wrong'
    ],
    cons: [
      'At $53 it costs more than a third of a dynamic microphone',
      'Better than a $12 cable at stopping hum, but not a tone-shaping upgrade',
      'One length only — a long cable into a small room creates cable clutter',
      'No color coding or labeling on the connector, so it blends into a bundle'
    ],
    pros_es: [
      'Conductor cuádruple Neglex de grado referencia — el estándar en estudios top desde hace décadas',
      'Conectores dorados con mecanismo de bloqueo que no se suelta a mitad de toma',
      'Va de la interfaz al micro sin zumbido, sin ruido y sin pérdida de agudos',
      'Un cable que deja de ser sospechoso: una cosa menos que depurar cuando una toma sale mal'
    ],
    cons_es: [
      'A $53 cuesta más de un tercio de un micrófono dinámico',
      'Mejor que un cable de $12 para evitar zumbido, pero no es una mejora de tono',
      'Un solo largo — un cable largo en una sala pequeña genera enredo',
      'Sin código de colores ni etiqueta en el conector, se pierde dentro de un manojo'
    ]
  }
];
VERDICTS_NUEVOS.forEach(v=>{
  const ex = g.verdictProsCons.findIndex(x=>x.name===v.name);
  if (ex > -1) g.verdictProsCons[ex] = v;
  else g.verdictProsCons.push(v);
});
console.log('\nveredictos nuevos/anulados: ' + VERDICTS_NUEVOS.length);

// limpiar duplicados en secciones
g.sections.forEach(s=>{ s.products = [...new Set(s.products||[])]; });

// featuredProducts = union de secciones + featured (mantener el orden tematico)
const todas = new Set();
g.sections.forEach(s=>(s.products||[]).forEach(p=>todas.add(p)));
g.featuredProducts.forEach(id=>todas.add(id));
g.featuredProducts = [...todas];

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');

// ══ VERIFICACION ══
console.log('\n=== ids con tarjeta ===');
[...todas].sort((a,b)=>a-b).forEach(id=>console.log('  ' + String(id).padEnd(5) + N(id)));

console.log('\n=== INVARIANTE ===');
const sinTarjeta = g.featuredProducts.filter(id=>!todas.has(id));
console.log('featuredProducts sin tarjeta: ' + (sinTarjeta.length? sinTarjeta.join(', ') : 'ninguno'));
const sinVeredicto = [...todas].filter(id=>!g.verdictProsCons.some(v=>v.productId===id));
console.log('tarjetas sin veredicto: ' + (sinVeredicto.length? sinVeredicto.map(N).join(', ') : 'ninguna'));
const sinCard = g.verdictProsCons.filter(v=>!todas.has(v.productId)).map(v=>v.name);
console.log('veredictos sin tarjeta: ' + (sinCard.length? sinCard.join(', ') : 'ninguno'));

console.log('\n=== VEREDICTOS 4+4 ===');
let fallos = 0;
g.verdictProsCons.forEach(v=>{
  const a = [v.pros.length, v.cons.length, v.pros_es.length, v.cons_es.length];
  if (Math.min(...a) < 4) fallos++;
  console.log('  ' + (Math.min(...a)>=4?'OK ':'!! ') + a.join('/') + '  ' + v.name);
});
console.log('veredictos <4: ' + fallos);
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));