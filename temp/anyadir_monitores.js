// starter-studio: anadir KRK Rokit 5 G5 (633) y JBL 305P MkII (116) con seccion + veredicto
// Specs verificadas: KRK en su ficha y Music Store; JBL en jbl.com / jblpro.com
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

/* ─────────── 1) SECCION DEL KRK ROKIT 5 G5 ─────────── */
const secKRK = {
  heading: 'Five Inches on a Desk: The Monitor That Ships With a Mixing Brain',
  heading_es: 'Cinco pulgadas sobre la mesa: el monitor que viene con cerebro de mezcla',
  content: '<p><strong>The KRK Rokit 5 G5 is the cheapest powered monitor in this guide with a rear LCD.</strong> That screen is the whole argument. Twenty-five boundary and tuning EQ combinations live behind it, and you pick the one that matches where the speaker is sitting — corner, wall, or close to your listening position. Set it once and forget it.</p>' +
    '<p>The voicing switch does something the Rokit 7 cannot: three modes on the same driver. <strong>Mix</strong> is the neutral one for referencing. <strong>Focus</strong> pulls the low end back and lifts the mids, which is what you want when the bass is flattering your mix. <strong>Create</strong> adds top and bottom for tracking. They are not three monitors pretending to be one — they are one monitor you can re-aim.</p>' +
    '<p>Underneath is a 5-inch woven Kevlar aramid woofer and a 1-inch silk dome tweeter on 55 watts of Class D, ported at the front so it can sit against a wall. Peak output is 104 dB. That is not much, and you will feel it on a drum-heavy mix: at normal listening levels the midrange is honest and the image is stable, but it simply cannot produce the low impact of the 7-inch at the top tier. That is precisely why it belongs here — it is the monitor you stop fighting once you have treated the room.</p>',
  content_es: '<p><strong>El KRK Rokit 5 G5 es el monitor alimentado más barato de esta guía con pantalla LCD detrás.</strong> Esa pantalla es todo el argumento. Detrás hay veinticinco combinaciones de Boundary y EQ de ajuste, y eliges la que corresponde a dónde está sitting el monitor — esquina, pared o cerca de tu posición de escucha. Lo configuras una vez y te olvidas.</p>' +
    '<p>El selector de modos hace algo que el Rokit 7 no puede: tres Sonidos sobre el mismo transductor. <strong>Mix</strong> es el neutro, para referenciar. <strong>Focus</strong> recorta el grave y levanta los medios, que es lo que quieres cuando el bajo está adulando tu mezcla. <strong>Create</strong> suma agudos y graves para la grabación. No son tres monitores disfrazados de uno: es un monitor que puedes reorientar.</p>' +
    '<p>Debajo hay un woofer de 5 pulgadas de aramida de Kevlar trenzado y un tweeter de cúpula de seda de 1 pulgada, con 55 vatios en Clase D y puerto frontal para poder pegarlo a la pared. Su pico es de 104 dB. No es mucho, y se nota en una mezcla con mucha percusión: a volumen normal los medios son honestos y la imagen es estable, pero sencillamente no tiene el impacto de graves del de 7 pulgadas del nivel superior. Y por eso encaja aquí: es el monitor con el que dejas de pelear una vez que has tratado la sala.</p>',
  products: [633]
};

/* ─────────── 2) SECCION DEL JBL 305P MKII ─────────── */
const secJBL = {
  heading: 'Eighty-Two Watts and a Waveguide: Why the Middle Tier Sounds Wider',
  heading_es: 'Ochenta y dos vatios y una guía de onda: por qué el nivel medio suena más abierto',
  content: '<p><strong>The JBL 305P MkII is the only monitor in this guide with a waveguide, and that single decision explains its stereo image.</strong> The Image Control Waveguide puts a physical flare around the tweeter that behaves like a shallow horn. It controls directivity, so the speaker sends energy where you are sitting and much less at the walls. The practical result is a broad, forgiving sweet spot — you can move your head a foot to the left and the mix does not change shape.</p>' +
    '<p>It is properly powered, which matters on a budget: dual Class-D amplification, 41 watts on the tweeter and 41 on the woofer, 82 watts per monitor, so there is no amplifier to buy. The transducers are a 5-inch driver and a 1-inch soft dome crossing over at 1725 Hz through a fourth-order Linkwitz-Riley network. Frequency response is 49 Hz to 20 kHz within 3 dB, extending to 43 Hz at minus 10 dB. Continuous output is 94 dB, peak 108.</p>' +
    '<p>Two switches on the back do quiet, unglamorous work. <strong>Boundary EQ</strong> offers three settings of low-shelf correction at 50 Hz, and if the speakers end up too close to a wall you dial off the bass you know is being reinforced. <strong>HF Trim</strong> steps the tweeter by plus or minus 2 dB. Neither is a feature you will ever talk about. Both are the reason a JBL pair stays trustworthy in a room that is not a perfect room.</p>',
  content_es: '<p><strong>El JBL 305P MkII es el único monitor de esta guía con guía de onda, y esa única decisión explica su imagen estéreo.</strong> La Image Control Waveguide rodea el tweeter con un reborde físico que se comporta como una bocina poco profunda. Controla la directividad, así que el monitor envía energía hacia donde estás sentado y muy poca hacia las paredes. El resultado práctico es una zona de escucha ancha y permisiva: mueves la cabeza un palmo a la izquierda y la mezcla no cambia de forma.</p>' +
    '<p>Viene amplificado de verdad, y en un presupuesto eso importa: doble amplificación en Clase D, 41 vatios en el tweeter y 41 en el woofer, 82 vatios por monitor, así que no hay que comprar amplificador. Los transductores son un driver de 5 pulgadas y una cúpula blanda de 1 pulgada que cruzan a 1725 Hz con una red Linkwitz-Riley de cuarto orden. La respuesta es de 49 Hz a 20 kHz con 3 dB, extendiéndose hasta 43 Hz a menos 10 dB. Potencia continua de 94 dB y pico de 108.</p>' +
    '<p>Dos interruptores detrás hacen un trabajo silencioso y poco glamuroso. <strong>Boundary EQ</strong> ofrece tres ajustes de corrección de graves sobre 50 Hz: si los monitores acaban demasiado pegados a una pared, quitas el bajo que sabes que se está sumando. <strong>HF Trim</strong> sube o baja el tweeter 2 dB. Ninguno es una función de la que vayas a presumir. Las dos son la razón de que un par de JBL siga siendo fiable en una sala que no es una sala perfecta.</p>',
  products: [116]
};

/* ─────────── 3) VEREDICTOS 4+4 EN/ES ─────────── */
const nuevosVeredictos = [
  {
    name: 'KRK Rokit 5 G5', name_es: 'KRK Rokit 5 G5', productId: 633,
    pros: [
      'Rear LCD with 25 boundary and tuning EQ combinations — the only monitor here that lets you re-aim it for its position',
      'Three voicing modes on one driver: Mix to reference, Focus to cut a flattering bass, Create to track',
      'Front bass port, so it can sit against a wall without the boom a rear port would add',
      '5-inch aramid woofer and 1-inch silk dome on 55W of Class D — a full monitoring chain for the price of a pair of headphones'
    ],
    cons: [
      '104 dB peak is low next to the Rokit 7: on a drum-heavy mix you will want the volume higher than it wants to go',
      'Below roughly 50 Hz it is guessing, not measuring — you cannot judge a kick and bass relationship on it',
      'The rear LCD and controls are small and unlit; you are dialling them in with the speakers at listening distance',
      'The voicing switch is a temptation: Focus mode flatters mixes, and it is one click away from the reference you were trying to avoid'
    ],
    pros_es: [
      'Pantalla LCD trasera con 25 combinaciones de Boundary y EQ: el único monitor de aquí que puedes reorientar según su posición',
      'Tres modos de voz sobre un solo transductor: Mix para referenciar, Focus para recortar un grave que adula y Create para grabar',
      'Puerto de graves frontal, así que puede ir pegado a la pared sin el retumbe que añadiría uno trasero',
      'Woofer de aramida de 5 pulgadas y cúpula de seda de 1 pulgada con 55 W en Clase D: una cadena de monitorización completa por lo que cuesta un par de auriculares'
    ],
    cons_es: [
      'Su pico de 104 dB es bajo comparado con el Rokit 7: en una mezcla con mucha percusión querrás más volumen del que ofrece',
      'Por debajo de unos 50 Hz no mide, estima — no puedes juzgar en él la relación entre bombo y bajo',
      'La pantalla y los mandos de atrás son pequeños y no se iluminan: los ajustas con los monitores a distancia de escucha',
      'El selector de modos es una tentación: el modo Focus adula mezclas y está a un clic de la referencia que intentabas evitar'
    ]
  },
  {
    name: 'JBL 305P MkII', name_es: 'JBL 305P MkII', productId: 116,
    pros: [
      'Image Control Waveguide gives the widest, most forgiving sweet spot of any monitor here — you move your head and the mix holds',
      'Genuinely powered: 82 watts per monitor of bi-amped Class D, so there is no amplifier in the budget',
      'Boundary EQ at 50 Hz and HF Trim on the back fix the two problems a bedroom room always has',
      'At 43 Hz low-frequency extension it reaches lower than its price suggests, and stays clean doing it'
    ],
    cons: [
      '94 dB continuous output is honest and modest — it is a nearfield monitor, not a drum room reference',
      'The waveguide that widens the image also narrows what you hear off-axis: the mix you check off-centre is not the mix',
      '43 Hz is extension at minus 10 dB, not a flat response, so do not read it as a usable 43',
      'No DSP presets and no app: the room correction is two switches, which is all you get and all you need'
    ],
    pros_es: [
      'La Image Control Waveguide da la zona de escucha más ancha y permisiva de todos los monitores de aquí: mueves la cabeza y la mezcla se mantiene',
      'Viene amplificado de verdad: 82 vatios por monitor en Clase D bi-amplificada, así que no hay amplificador en el presupuesto',
      'El Boundary EQ de 50 Hz y el HF Trim de atrás resuelven los dos problemas que una sala de dormitorio siempre tiene',
      'Con 43 Hz de extensión baja más de lo que sugiere su precio, y lo hace sin ensuciar'
    ],
    cons_es: [
      'Sus 94 dB de potencia continua son honestos y modestos: es un monitor de nearfield, no una referencia de sala de ensayo',
      'La guía de onda que abre la imagen también reduce lo que oyes fuera de eje: la mezcla que compruebas desplazado no es la mezcla',
      'Los 43 Hz son extensión a menos 10 dB, no respuesta plana, así que no lo leas como un 43 Hz útil',
      'Sin presets de DSP ni app: la corrección de sala son dos interruptores, que es todo lo que hay y todo lo que necesitas'
    ]
  }
];

/* ─────────── 4) APLICAR ─────────── */
const log = [];

// featuredProducts
if (!guia.featuredProducts.includes(633)) { guia.featuredProducts.push(633); log.push('featuredProducts += 633'); }
if (!guia.featuredProducts.includes(116)) { guia.featuredProducts.push(116); log.push('featuredProducts += 116'); }

// veredictos
[633, 116].forEach(id => {
  if (!guia.verdictProsCons.some(v => v.productId === id)) {
    guia.verdictProsCons.push(nuevosVeredictos.find(v => v.productId === id));
    log.push('veredicto += ' + id);
  }
});

// secciones: insertar despues de la seccion de monitores existente (indice 3)
const iMon = guia.sections.findIndex(s => (s.heading_es || '').indexOf('Monitores que no puedes ignorar') > -1);
const pos = iMon > -1 ? iMon + 1 : 3;
guia.sections.splice(pos, 0, secKRK, secJBL);
log.push('secciones insertadas en ' + pos + ' y ' + (pos + 1));

// comprobar que la tabla las tendra
log.push('\n=== control ===');
log.push('  productos en tarjetas: ' + [...new Set([].concat(...guia.sections.map(s => s.products || [])))].length);
log.push('  veredictos: ' + guia.verdictProsCons.length);
log.push('  featuredProducts: ' + guia.featuredProducts.length);
[633, 116].forEach(id => {
  log.push('  id ' + id + ': tarjeta=' + (guia.sections.some(s => (s.products || []).includes(id)) ? 'si' : 'NO') +
    ' veredicto=' + (guia.verdictProsCons.some(v => v.productId === id) ? 'si' : 'NO'));
});
log.push('\n  4+4: ' + guia.verdictProsCons.filter(v => v.pros.length >= 4 && v.cons.length >= 4).length + '/' + guia.verdictProsCons.length);

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log(log.join('\n'));
console.log('\nmojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
