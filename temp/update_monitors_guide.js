const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const q = g.find(x => x.id === 'best-monitors-for-small-rooms');

// 1. Add new section for Alesis ELEVATE 4
q.sections.push({
  heading_es: 'Alesis ELEVATE 4: guía de ondas + salida sub en par económico',
  products: [1052],
  content_es: '<strong>El Alesis ELEVATE 4 aporta tres ventajas técnicas que no todos los monitores económicos ofrecen a la vez:</strong> (1) Guía de ondas elíptica integrada: su tweeter de seda sobre bocina interna ovalada distribuye las agudas de forma amplia; te mueves por el escritorio y mantienes el punto dulce estéreo. (2) Salida dedicada para subwoofer: conexión trasera física para añadir subwoofer activo en el futuro; los Mackie, M-Audio o PreSonus de la lista no lo permiten. (3) Gabinete MDF de alta densidad: chasis pesado de madera acústica densa que elimina resonancias y vibraciones al subir el volumen.',
  pros_es: [
    'Guía de ondas elíptica: punto dulce estéreo amplio y tolerante',
    'Salida subwoofer trasera: única en esta gama de precio',
    'Gabinete MDF denso: sin resonancias ni vibraciones a volumen alto',
    'Tweeter de seda + woofer Kevlar: agudos dulces y medios definidos',
    '50W bi-amplificados reales por par a precio imbatible'
  ],
  cons_es: [
    'Solo entrada RCA y TRS 1/4": sin XLR balanceada',
    'Respuesta en graves hasta 50 Hz: menos extensión que rivales de 5-6.5"',
    'Sin DSP de corrección de sala ni EQ trasero',
    'Diseño algo voluminoso para escritorios muy estrechos'
  ],
  verdict_es: 'El único par económico con guía de ondas real + salida subwoofer + gabinete MDF denso. Si quieres punto dulce amplio, expandibilidad futura y gabinete acústico real por ~120 €, es la compra ganadora.',
  score: 9.5
});

// 2. Update productTable columns - add Alesis ELEVATE 4 at the end
q.productTable.columns.push({ title: 'Alesis ELEVATE 4', title_es: 'Alesis ELEVATE 4' });

// 3. Update verdictProsCons - add Alesis at the end
q.verdictProsCons.push({
  name: 'Alesis ELEVATE 4',
  name_es: 'Alesis ELEVATE 4',
  pros: [
    'Elliptical waveguide for wide sweet spot',
    'Dedicated subwoofer output: unique at this price',
    'Dense MDF cabinet: no resonances at high volume',
    'Kevlar woofer + silk tweeter: sweet highs, defined mids',
    '50W bi-amped per pair at unbeatable price'
  ],
  pros_es: [
    'Guía de ondas elíptica: punto dulce estéreo amplio y tolerante',
    'Salida subwoofer trasera: única en esta gama de precio',
    'Gabinete MDF denso: sin resonancias ni vibraciones a volumen alto',
    'Tweeter de seda + woofer Kevlar: agudos dulces y medios definidos',
    '50W bi-amplificados reales por par a precio imbatible'
  ],
  cons: [
    'RCA + TRS 1/4" only: no balanced XLR input',
    'Bass extension to 50 Hz: less than 5-6.5" rivals',
    'No room-correction DSP or rear EQ',
    'Bulky for very narrow desks'
  ],
  cons_es: [
    'Solo entrada RCA y TRS 1/4": sin XLR balanceada',
    'Respuesta en graves hasta 50 Hz: menos extensión que rivales de 5-6.5"',
    'Sin DSP de corrección de sala ni EQ trasero',
    'Diseño algo voluminoso para escritorios muy estrechos'
  ]
});

// 3. Update productTable rows - add values for Alesis column (14th column)
const alesisValues = [
  { val: 'Wide sweet spot + sub out for <$150', val_es: 'Punto dulce amplio + salida sub por <150 €' },
  { val: 'MDF (dense)', val_es: 'MDF (denso)' },
  { val: '4" Kevlar, 1" silk dome', val_es: '4" Kevlar, 1" seda' },
  { val: '50W bi-amped', val_es: '50W bi-amplificado' },
  { val: '50 Hz – 20 kHz', val_es: '50 Hz – 20 kHz' },
  { val: 'RCA + TRS 1/4"', val_es: 'RCA + TRS 1/4"' },
  { val: '~3.6 kg (8 lbs) each', val_es: '~3.6 kg c/u' },
  { val: 'Elliptical waveguide, sub out, MDF', val_es: 'Guía ondas elíptica, salida sub, MDF' }
];

// Add Alesis values to each row (append to values array)
q.productTable.rows.forEach((row, idx) => {
  if (idx < alesisValues.length) {
    row.values.push(alesisValues[idx]);
  }
});

// 4. Update featuredProducts - add Alesis (ID 1052) at the end
q.featuredProducts.push(1052);

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Updated best-monitors-for-small-rooms guide with Alesis ELEVATE 4');