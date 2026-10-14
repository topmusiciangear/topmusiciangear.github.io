const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// 1. Limpiar descs EN con terminos vagos (paridad con ES ya limpio)
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const d15 = arr.find(p => p.id === 15);
if (d15 && d15.desc.includes('Studio-grade conversion.')) {
  d15.desc = d15.desc.split('Studio-grade conversion.').join('Studio-quality conversion.');
  console.log('desc 15 EN limpio');
}
const d17 = arr.find(p => p.id === 17);
if (d17 && d17.desc.includes('pristine AD/DA conversion.')) {
  d17.desc = d17.desc.split('pristine AD/DA conversion.').join('clean AD/DA conversion.');
  console.log('desc 17 EN limpio');
}
fs.writeFileSync(pj, JSON.stringify(P, null, 2));

// 2. Anadir Volt 276 a best-interface: tabla + veredicto + seccion
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'best-interface');

if (g.productTable.columns.some(c => c.title === 'Universal Audio Volt 276')) {
  console.log('Volt 276 ya esta en la tabla, no se toca');
  process.exit(0);
}

g.productTable.columns.push({ title: 'Universal Audio Volt 276', title_es: 'Universal Audio Volt 276' });

const colVals = [
  ['Best For', 'Full-featured digital mixing on a tight budget', 'x'], // placeholder, se reemplaza abajo
];
const vals = {
  'Best For': ['Analog compression on the way in', 'Compresión analógica en la entrada'],
  'Estimated Price': ['~$299', '~$299'],
  'Type': ['Audio interface', 'Interfaz de audio'],
  'Inputs / Outputs': ['2-in / 2-out', '2 entradas / 2 salidas'],
  'Preamps': ['2, 55 dB gain', '2, 55 dB de ganancia'],
  'Sample Rate': ['192 kHz', '192 kHz'],
  'Bit Depth': ['24-bit', '24 bits'],
  'Connectivity': ['USB-C', 'USB-C'],
  'Special Features': ['76 compressor, Vintage mode, MIDI', 'Compresor 76, modo Vintage, MIDI'],
};

g.productTable.rows.forEach(r => {
  const v = vals[r.label];
  if (!v) { console.log('!! fila sin valores para Volt 276: ' + r.label); process.exit(1); }
  r.values.push({ value: v[0], value_es: v[1] });
  if (r.values.length !== g.productTable.columns.length) {
    console.log('!! desalineada: ' + r.label); process.exit(1);
  }
});
console.log('columna anadida: ' + g.productTable.columns.length + ' columnas');

g.verdictProsCons.push({
  name: 'Universal Audio Volt 276',
  name_es: 'Universal Audio Volt 276',
  pros: [
    'Built-in analog 76 compressor inspired by the UA 1176, no plugin needed',
    'Vintage mode based on the classic UA 610 tube preamp',
    '55 dB of clean gain plus phantom power and MIDI I/O',
    '24-bit/192 kHz conversion with a class-leading headphone amp'
  ],
  cons: [
    'Only 2 analog inputs, no room to grow into multi-mic recording',
    'No ADAT expansion for growing input count',
    'Compressor has a fixed character, less flexible than a plugin',
    'Costs about $100 more than the Volt 2, essentially for the compressor'
  ],
  pros_es: [
    'Compresor analógico 76 integrado inspirado en el UA 1176, sin plugins',
    'Modo Vintage basado en el clásico previo de tubo UA 610',
    '55 dB de ganancia limpia más alimentación phantom y MIDI I/O',
    'Conversión de 24 bits/192 kHz con un amplificador de auriculares de primera'
  ],
  cons_es: [
    'Solo 2 entradas analógicas, sin margen para crecer a multi-mic',
    'Sin expansión ADAT para ampliar entradas',
    'El compresor tiene un carácter fijo, menos flexible que un plugin',
    'Cuesta unos $100 más que el Volt 2 básicamente por el compresor'
  ]
});
console.log('veredicto anadido: ' + g.verdictProsCons.length + ' (4+4 EN/ES)');

g.sections.push({
  heading: 'Universal Audio Volt 276: The One With the 1176 Compressor Built In',
  heading_es: 'Universal Audio Volt 276: el que trae el compresor 1176 integrado',
  products: [263],
  content: '<p><strong>The Volt 276 is the Volt 2 with one big addition: a real analog compressor on the way in.</strong> Everything else is familiar UA territory: a 2-in/2-out USB-C interface, two preamps with 55 dB of clean gain, phantom power, MIDI I/O and a class-leading headphone amp, running at 24-bit/192 kHz. The Vintage mode voices the preamp after the classic UA 610 tube preamp, the same circuit found in studios since the 1960s.</p>' +
    '<p><strong>The 76 compressor is the reason to pay the extra $100 over the Volt 2.</strong> It is an analog circuit inspired by the UA 1176, the FET compressor heard on countless records, and it works before the signal reaches your computer. That means peaks are tamed on the way in, so you can record hotter without clipping and skip the compressor plugin later. It has a fixed, musical character rather than deep controls, which is exactly what a beginner wants: one button that makes vocals and guitars sit.</p>' +
    '<p><strong>Know the limits before you buy.</strong> There are only two analog inputs and no ADAT expansion, so a drum kit or a full band is out of reach. If you will never touch a compressor, the cheaper Volt 2 gives you the same preamps and conversion for about $100 less.</p>',
  content_es: '<p><strong>El Volt 276 es el Volt 2 con un gran añadido: un compresor analógico real en la entrada.</strong> Todo lo demás es territorio UA familiar: una interfaz USB-C de 2 entradas y 2 salidas, dos previos con 55 dB de ganancia limpia, alimentación phantom, MIDI I/O y un amplificador de auriculares de primera, funcionando a 24 bits/192 kHz. El modo Vintage colorea el previo como el clásico previo de tubo UA 610, el mismo circuito de los estudios desde los años 60.</p>' +
    '<p><strong>El compresor 76 es el motivo para pagar los $100 extra sobre el Volt 2.</strong> Es un circuito analógico inspirado en el UA 1176, el compresor FET de infinidad de discos, y trabaja antes de que la señal llegue al ordenador. Eso significa que los picos se doman en la entrada, así que puedes grabar más caliente sin saturar y saltarte el plugin de compresor después. Tiene un carácter musical fijo en vez de controles profundos, que es justo lo que quiere un principiante: un botón que asienta voces y guitarras.</p>' +
    '<p><strong>Conviene saber los límites antes de comprar.</strong> Solo hay dos entradas analógicas y no hay expansión ADAT, así que una batería o una banda completa quedan fuera. Si nunca vas a tocar un compresor, el Volt 2 más barato te da los mismos previos y la misma conversión por unos $100 menos.</p>'
});
console.log('seccion anadida con products:[263]');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// Controles finales
const names = g.productTable.columns.map(c => c.title);
console.log('columnas:', names.length, '| veredictos:', g.verdictProsCons.length);
console.log('paridad veredicto 276:', (() => { const v = g.verdictProsCons[g.verdictProsCons.length - 1]; return v.pros.length === v.pros_es.length && v.cons.length === v.cons_es.length; })());
const dup = g.sections.map(s => s.heading).filter((x, i, a) => a.indexOf(x) !== i);
console.log('headings duplicados:', dup.length ? dup.join(' | ') : 'ninguno');