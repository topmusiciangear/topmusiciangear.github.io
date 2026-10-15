const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

// 1) invertir el M50x: el array "pros" tenia los textos en espanol
const m50x = g.verdictProsCons.find(v => v.name === 'Audio-Technica ATH-M50x');
if (m50x) {
  const enReal = [
    'The most-recorded studio headphone in the world for a reason: flat, honest, no colour',
    '45mm drivers with rare-earth magnets for detail without harshness',
    'Detachable cable and collapsible frame — survives a backpack',
    'Works on studio monitors or without them, which is why it is the tier default'
  ];
  const esReal = [
    'El auriculares de estudio más grabado del mundo por algo: plano, honesto, sin color',
    'Drivers de 45 mm con imanes de tierras raras: detalle sin dureza',
    'Cable desmontable y plegable — sobrevive a una mochila',
    'Funciona con monitores o sin ellos, por eso es la elección por defecto del tier'
  ];
  m50x.pros = enReal;
  m50x.cons = [
    'No case or spare pads in the box — the pads wear before the driver does',
    'Not the wide, spacious soundstage of an open-back design',
    '49 ohm impedance wants a real headphone output, not a phone dongle',
    'Detachable cable means a broken wire is a replacement, not a repair'
  ];
  m50x.pros_es = esReal;
  m50x.cons_es = [
    'No incluye funda ni almohadillas de repuesto — las almohadillas se gastan antes que el driver',
    'No tiene el espacio sonoro amplio y abierto de un diseño abierto',
    'La impedancia de 49 ohmios pide una salida de auriculares real, no un dongle de móvil',
    'El cable desmontable significa que un cable roto es una sustitución, no una reparación'
  ];
  console.log('M50x corregido (EN/ES intercambiados)');
}

// 2) comprobar que cada veredicto tiene productId y que son ids validos
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
console.log('\nveredictos:');
g.verdictProsCons.forEach(v=>{
  const p = v.productId ? list.find(x=>x.id===v.productId) : null;
  const ok = p && p.title === v.name;
  console.log('  ' + (ok?'OK  ':'!!  ') + v.name.padEnd(50) +
    ' pros ' + (v.pros?v.pros.length:'?') + '/' + (v.cons?v.cons.length:'?') +
    ' | pros_es ' + (v.pros_es?v.pros_es.length:'?') + '/' + (v.cons_es?v.cons_es.length:'?') +
    ' | ' + (p ? 'id '+p.id : 'SIN PRODUCTO'));
});

// 3) El M7 / Aston: la seccion 7 usa id 39 y 167 pero no estan en featuredProducts
console.log('\nproductos usados en secciones:');
const usados = new Set();
g.sections.forEach(s=>(s.products||[]).forEach(p=>usados.add(p)));
console.log('  ' + [...usados].join(', '));
console.log('featuredProducts: ' + g.featuredProducts.join(', '));
const faltan = [...usados].filter(p=>!g.featuredProducts.includes(p));
console.log('usados en secciones pero NO en featuredProducts: ' + (faltan.length? faltan.join(', ') : 'ninguno'));

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nguides.json escrito');