// 1) rellenar cons_es vacios de los 4 productos donde lo escribi mal
// 2) anadir 39 y 167 a featuredProducts
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

const CONS_ES = {
  'Sony MDR-7506': [
    'Cable fijo no desmontable — un cable pelado significa un par nuevo',
    '63 ohmios de impedancia piden más salida de auriculares que la que da un portátil',
    'El cable en espiral de 3 m añade peso y se enreda en un escritorio pequeño',
    'Las almohadillas se gastan antes que los drivers; sustituirlas es fácil pero no gratis'
  ],
  'KRK Rokit 7 G5': [
    'El grave adelantado adula las mezclas: no te va a decir que el bajo está flaco',
    'Necesita tratamiento de sala o cambios de posición para sonar bien junto a una pared',
    'Se venden por unidades — tienes que comprar el par',
    'Sonidos y algo coloreados; no es la opción para una comprobación neutra'
  ],
  'G4M Acoustics Squarewave Acoustic Treatment Panels (4-Pack)': [
    'Absorben medios y agudos, no graves — para los problemas de bajo siguen haciéndose falta trampas',
    'Diez centímetros de fondo: menos eficaz que los paneles profesionales de lana mineral',
    'Tiene aspecto de espuma, y es espuma: valor estético cero',
    'G4M solo lista una tienda, así que la comparación de precios es limitada'
  ],
  'K&M 210/2 Mic Stand': [
    'El contrapeso es básico — los micros pesados siguen necesitando ajustes',
    'La base es estable pero ancha; las esquinas estrechas son incómodas',
    'Sin guías de cable, así que el XLR cuelga suelto',
    'Hacen falta dos manos para ajustar la altura del brazo'
  ]
};

let n = 0;
Object.keys(CONS_ES).forEach(name=>{
  const v = g.verdictProsCons.find(x=>x.name===name);
  if (!v) { console.log('!! no existe veredicto: ' + name); return; }
  const vacio = !v.cons_es || v.cons_es.length===0;
  if (vacio) { v.cons_es = CONS_ES[name]; n++; console.log('  cons_es rellenado: ' + name); }
  else console.log('  cons_es ya tiene ' + v.cons_es.length + ' items: ' + name);
});
console.log('cons_es rellenados: ' + n);

// featuredProducts: anadir los 2 que faltan
const anadir = [39, 167].filter(id=>!g.featuredProducts.includes(id));
anadir.forEach(id=>g.featuredProducts.push(id));
console.log('anadidos a featuredProducts: ' + (anadir.length? anadir.join(', ') : 'ninguno'));
console.log('featuredProducts ahora: ' + g.featuredProducts.join(', '));

// verificacion final
console.log('\n=== VERIFICACION ===');
let fallos = 0;
g.verdictProsCons.forEach(v=>{
  const a=[v.pros,v.cons,v.pros_es,v.cons_es].map(x=>Array.isArray(x)?x.length:0);
  const ok = Math.min(...a)>=4;
  if(!ok) fallos++;
  console.log('  ' + (ok?'OK  ':'!!  ') + String(a.join('/')).padEnd(12) + v.name);
});
console.log('veredictos con menos de 4 en algun idioma: ' + fallos);
console.log('secciones EN/ES: ' + g.sections.length + ' / ' + g.sections.filter(s=>s.content_es).length);
let sinES = g.sections.filter(s=>!s.content_es || !s.heading_es).length;
console.log('secciones sin ES: ' + sinES);

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nguides.json escrito');