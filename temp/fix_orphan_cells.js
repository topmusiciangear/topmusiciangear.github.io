// Quita la celda huerfana que dejo el producto descartado y verifica el corpus
const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;

// quitar acentos ANTES de quitar los no-alfanumericos; si no "Acustica" se parte en "ac stica"
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[\u00f1\u00d1]/g, 'n')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const IGN = ['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair',
  'mkii','mk','iii','ii','gen','version','power','powered','speaker','microphone','mic','digital','usb',
  'xlr','guitar','bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor',
  'headphones','synth','synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition',
  'complete','black','white','model','original','classic','pack','condenser','shotgun','dynamic',
  'cardioid','vocal','kit','zone','core','evo','reference','premium','standard','best','twin','stereo',
  // palabras espanolesas, escritas SIN tilde porque norm() ya se las quito
  'acustica','altavoz','activo','bajo','caja','directa','pasiva','estereo','interfaz','coleccion',
  'afinador','cromatico','edicion','controlador','microfono','soportes','soporte','inalambrico',
  'personas','teclado','definitivo','generacion','unidad','par','filtro','antipop','cable','paneles',
  'tratamiento','aislamiento','pads','compresor','avanzado','ultimo','aislar','ruido',
  'de','activa','activo','para','daw','unidades','montantes','soportes','cable'];
const IGN_U = new Set(IGN);
const key = s => norm(s).split(' ').filter(w => w.length > 1 && !IGN_U.has(w));

// sin imposedr orden: el espanol reordena ("Controlador DAW SSL UF8" vs "SSL UF8 DAW Controller")
function existe(nombre) {
  const k = key(nombre);
  if (!k.length) return true;
  return arr.some(p => {
    const kp = key(p.title);
    return k.every(w => kp.indexOf(w) > -1);
  });
}

// ---- 1. celdas huerfanas ----
['best-reverb-delay', 'best-looper-pedals'].forEach(id => {
  const g = guides.find(x => x.id === id);
  const pt = g.productTable;
  const n = pt.columns.length;
  pt.rows.forEach(r => { while (r.values.length > n) r.values.splice(n, 1); });
  console.log(id + ': ' + n + ' columnas, filas alineadas');
});

// ---- 2. verificar todo el corpus ----
let desajuste = 0, sinResolver = 0, cjk = 0;
guides.forEach(g => {
  if (g.productTable) {
    const n = g.productTable.columns.length;
    g.productTable.rows.forEach(r => {
      if (r.values.length !== n) { desajuste++; console.log('   !! ' + g.id + ' / ' + r.label + ': ' + r.values.length + ' vs ' + n); }
    });
    g.productTable.columns.forEach(c => {
      // solo se exige que el titulo EN resuelva: los title_es son traducciones
      // ("Controlador DAW SSL UF8" vs "SSL UF8 DAW Controller") y no se pueden
      // comparar por cadena de forma fiable
      if (!existe(c.title)) { sinResolver++; console.log('   !! EN ' + g.id + ': "' + c.title + '"'); }
    });
  }
  (g.verdictProsCons || []).forEach(v => {
    const n = v.name || v.title;
    if (n && !existe(n)) { sinResolver++; console.log('   !! VEREDICTO ' + g.id + ': "' + n + '"'); }
  });
});
(function w(v) {
  if (typeof v === 'string') { if (/[\u4e00-\u9fff]/.test(v)) { cjk++; console.log('   !! CJK: ' + v.slice(0, 60)); } }
  else if (Array.isArray(v)) v.forEach(w);
  else if (v && typeof v === 'object') Object.keys(v).forEach(k => w(v[k]));
})(guides);

console.log('\nfilas desajustadas : ' + desajuste);
console.log('nombres sin resolver: ' + sinResolver);
console.log('CJK en el corpus    : ' + cjk);

if (desajuste === 0 && sinResolver === 0 && cjk === 0) {
  fs.writeFileSync(f, JSON.stringify(guides, null, 2), 'utf8');
  console.log('\nguides.json escrito');
} else console.log('\nNO se escribe');