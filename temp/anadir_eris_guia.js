// best-monitors-for-small-rooms: anadir PreSonus Eris Studio 5 (684)
// Seccion + veredicto 4+4 + columna de la tabla + featuredProducts
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'best-monitors-for-small-rooms');
const log = [];
const ok = m => log.push('  ok  ' + m);
const no = m => log.push('  FALTA  ' + m);
const ID = 684;

/* ═══ 1) SECCION ═══ */
const secion = {
  heading: 'Narrow Vertical Dispersion: What the Eris Studio 5 Waveguide Actually Solves',
  heading_es: 'Dispersión vertical estrecha: qué resuelve de verdad la guía de onda del Eris Studio 5',
  content: '<p><strong>The Eris Studio 5 is the only monitor in this table with a waveguide that deliberately throws the high frequencies downwards.</strong> The EBM waveguide gives it 120 degrees of horizontal dispersion — a genuinely wide sweet spot — and only 60 degrees vertical. That asymmetry is the whole design: spreading sideways across the room, refusing to spray off the desk surface behind the speaker.</p>' +
    '<p>That matters more than it sounds in a small room. Desk reflection is the single most common colouration in a home studio, because the speaker sits on a hard surface a few centimetres high and sends tweeter energy straight back at your ears. A monitor that keeps its vertical directivity narrow removes that path without needing any DSP at all.</p>' +
    '<p><strong>The rest is honest, ordinary engineering done well.</strong> A 5.25-inch woven composite woofer and a 1-inch ultra-low-mass silk dome on 80 watts of Class AB bi-amplification — 45 watts low, 35 watts high — with the crossover at 3.5 kHz. Frequency response runs 48 Hz to 20 kHz and peak output is 102 dB at one metre. The cabinet is 29.2 x 20.3 x 22.3 cm, so it fits a desk that has no room to spare, and at 5.2 kg it does not tip over when you adjust the rear controls.</p>' +
    '<p>What it does not have is software. There is no app and no DSP presets, just three analogue knobs and a three-way switch. The Acoustic Space position cuts 0, 2 or 4 dB of bass depending on how close the speaker is to a wall, and the Low Cut filter offers 80 Hz or 100 Hz at -12 dB per octave. That is less clever than the KRK Rokit 5 G5 and considerably easier to trust, because there is nothing to update and nothing to misconfigure.</p>',
  content_es: '<p><strong>El Eris Studio 5 es el único monitor de esta tabla con una guía de onda que lanza deliberadamente los agudos hacia abajo.</strong> La EBM le da 120 grados de dispersión horizontal —una zona de escucha realmente ancha— y solo 60 verticales. Esa asimetría es todo el diseño: repartir de lado a lado por la sala, negarse a esparcir por la superficie del escritorio que tiene detrás.</p>' +
    '<p>Eso importa más de lo que parece en una sala pequeña. La reflexión del escritorio es la coloración más común de un estudio doméstico, porque el monitor está sobre una superficie dura a unos centímetros de altura y manda la energía del tweeter de vuelta a tus oídos. Un monitor que mantiene estrecha su directividad vertical elimina ese camino sin necesitar ningún DSP.</p>' +
    '<p><strong>El resto es ingeniería corriente hecha bien.</strong> Un woofer de 5.25 pulgadas de compuesto trenzado y una cúpula de seda ultraligera de 1 pulgada, con 80 vatios de Clase AB bi-amplificados —45 vatios graves, 35 agudos— y cruce a 3.5 kHz. La respuesta va de 48 Hz a 20 kHz y el pico es de 102 dB a un metro. La caja mide 29.2 x 20.3 x 22.3 cm, así que cabe en un escritorio sin sitio de sobra, y con 5.2 kg no se vuelca cuando ajustas los mandos de atrás.</p>' +
    '<p>Lo que no tiene es software. No hay app ni presets de DSP, solo tres potenciómetros analógicos y un conmutador de tres posiciones. La posición Acoustic Space recorta 0, 2 o 4 dB de graves según lo cerca que esté el monitor de una pared, y el filtro Low Cut ofrece 80 Hz o 100 Hz a -12 dB por octava. Es menos sofisticado que el KRK Rokit 5 G5 y bastante más fácil de confiar, porque no hay nada que actualizar ni nada que mal configurar.</p>',
  products: [ID]
};

/* ═══ 2) VEREDICTO 4+4 ═══ */
const veredicto = {
  name: 'PreSonus Eris Studio 5',
  name_es: 'PreSonus Eris Studio 5',
  pros: [
    'The waveguide sends 120 degrees sideways and only 60 degrees up, so desk reflection stops colouring the top end without any DSP',
    '80W of Class AB bi-amplification — 45W low, 35W high — which is unusually efficient for the output and stays clean longer than the Class D rivals',
    '48 Hz from a 5.25-inch woofer in a 22.3 cm deep cabinet, with a front port that tolerates a wall behind it',
    'Three inputs (XLR, TRS and RCA) plus analogue Acoustic Space and Low Cut controls: no app, no firmware, nothing to misconfigure'
  ],
  cons: [
    '102 dB peak output is modest — there is not much headroom left for monitoring loud, backline-heavy mixes',
    'Acoustic Space is a manual bass cut of 0, 2 or 4 dB, not the 25 stored combinations the KRK Rokit 5 G5 offers',
    'Sold as a single monitor, so the quoted price is per unit and a pair costs double',
    'The 48 Hz figure is the manufacturer\'s; measured responses in this class usually roll off well before that'
  ],
  pros_es: [
    'La guía de onda reparte 120 grados hacia los lados y solo 60 hacia arriba, así que la reflexión del escritorio deja de colorear los agudos sin ningún DSP',
    '80 W en Clase AB bi-amplificados —45 graves, 35 agudos—, inusualmente eficiente para esa potencia y que se mantiene limpio más tiempo que los rivales en Clase D',
    '48 Hz desde un woofer de 5.25 pulgadas en una caja de 22.3 cm de fondo, con un puerto frontal que tolera una pared detrás',
    'Tres entradas (XLR, TRS y RCA) y controles analógicos de Acoustic Space y Low Cut: sin app, sin firmware, nada que mal configurar'
  ],
  cons_es: [
    'Sus 102 dB de pico son modestos: no queda mucho margen para monitorizar fuerte una mezcla con mucha banda en vivo',
    'Acoustic Space es un recorte manual de 0, 2 o 4 dB, no las 25 combinaciones memorizadas que ofrece el KRK Rokit 5 G5',
    'Se vende por unidades, así que el precio que se cita es de una sola pieza y el par cuesta el doble',
    'El 48 Hz es la cifra del fabricante; las respuestas medidas en esta clase suelen caer bastante antes'
  ]
};

/* ═══ 3) APLICAR ═══ */
if (guia.verdictProsCons.some(v => v.name === veredicto.name)) no('el veredicto ya existe');
else { guia.verdictProsCons.push(veredicto); ok('veredicto anadido (4+4 EN y ES)'); }

if (guia.featuredProducts.includes(ID)) no('ya estaba en featuredProducts');
else { guia.featuredProducts.push(ID); ok('featuredProducts += 684'); }

if (guia.sections.some(s => (s.products || []).includes(ID))) no('la seccion ya existe');
else {
  const iRokit = guia.sections.findIndex(s => (s.products || []).includes(633));
  const pos = iRokit > -1 ? iRokit + 1 : guia.sections.length - 1;
  guia.sections.splice(pos, 0, secion);
  ok('seccion insertada en ' + pos);
}

/* ═══ 4) COLUMNA DE LA TABLA ═══ */
const t = guia.productTable;
if (t.columns.some(c => /Eris Studio 5/i.test(c.title))) {
  no('la columna ya existe');
} else {
  const COL = { title: 'PreSonus Eris Studio 5', title_es: 'PreSonus Eris Studio 5' };
  t.columns.push(COL);
  ok('columna anadida (ahora ' + t.columns.length + ')');

  const VAL = [
    ['Wide sweet spot with waveguide control and desk-reflection rejection', 'Zona de escucha ancha con guía de onda y sin reflexiones de escritorio'],
    ['2-way bi-amped, Class AB', 'Biamplificado de 2 vías, Clase AB'],
    ['5.25" woven composite', 'Cono de 5.25" de compuesto trenzado'],
    ['1" ultra-low-mass silk dome', 'Cúpula de seda ultraligera de 1"'],
    ['80W (45W LF + 35W HF)', '80W (45W LF + 35W HF)'],
    ['48 Hz – 20 kHz', '48 Hz – 20 kHz'],
    ['102 dB peak @ 1 m', '102 dB pico a 1 m'],
    ['11.5 x 8 x 8.8 in', '29.2 x 20.3 x 22.3 cm'],
    ['Front, resonance-suppressing bracing', 'Frontal, con refuerzo interno antirresonancia']
  ];
  if (t.rows.length !== VAL.length) no(' filas de la tabla: ' + t.rows.length + ', valores preparados: ' + VAL.length);
  t.rows.forEach((r, i) => r.values.push({ value: VAL[i][0], value_es: VAL[i][1] }));
  ok('9 valores anadidos a las 9 filas');
}

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log(log.join('\n'));

/* ═══ CONTROL ═══ */
const g2 = JSON.parse(fs.readFileSync(F, 'utf8'));
const s2 = g2.find(x => x.id === 'best-monitors-for-small-rooms');
const ids = [...new Set([].concat(...s2.sections.map(x => x.products || [])))];
console.log('\n=== CONTROL ===');
console.log('  productos en tarjetas: ' + ids.length);
console.log('  columnas de la tabla : ' + s2.productTable.columns.length);
console.log('  filas x columnas    : ' + s2.productTable.rows.length + ' x ' + s2.productTable.rows[0].values.length);
console.log('  veredictos          : ' + s2.verdictProsCons.length);
console.log('  4+4                 : ' + s2.verdictProsCons.filter(v => v.pros.length >= 4 && v.cons.length >= 4).length + '/' + s2.verdictProsCons.length);
console.log('  684 con tarjeta     : ' + (s2.sections.some(x => (x.products || []).includes(684)) ? 'si' : 'NO'));
console.log('  684 con veredicto   : ' + (s2.verdictProsCons.some(v => v.name === 'PreSonus Eris Studio 5') ? 'si' : 'NO'));
console.log('  684 en featured     : ' + (s2.featuredProducts.includes(684) ? 'si' : 'NO'));
console.log('  mojibake            : ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
