const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

// ============================================================
// 1) TABLA: 3 nuevas filas (Potencia RMS, Ubicación puerto, SPL máx.)
// ============================================================
const T = g.productTable;
const filaPot = { label: "Power (RMS)", label_es: "Potencia RMS",
  values: [
    { value: "50 W (2×25 W bi-amp)", value_es: "50 W (2×25 W bi-amp)" },
    { value: "50 W (2×25 W bi-amp)", value_es: "50 W (2×25 W bi-amp)" },
    { value: "50 W (2×25 W bi-amp)", value_es: "50 W (2×25 W bi-amp)" },
    { value: "50 W (2×25 W bi-amp)", value_es: "50 W (2×25 W bi-amp)" },
    { value: "64 W (2×32 W Clase D)", value_es: "64 W (2×32 W Clase D)" },
    { value: "42 W (2×21 W Clase D)", value_es: "42 W (2×21 W Clase D)" }
  ]};
const filaPue = { label: "Port Location", label_es: "Ubicación del puerto",
  values: [
    { value: "Rear", value_es: "Trasero" },
    { value: "Rear", value_es: "Trasero" },
    { value: "Rear", value_es: "Trasero" },
    { value: "Rear", value_es: "Trasero" },
    { value: "Front", value_es: "Frontal" },
    { value: "Front", value_es: "Frontal" }
  ]};
const filaSpl = { label: "Max SPL", label_es: "SPL máx. (dB)",
  values: [
    { value: "96 dB", value_es: "96 dB" },
    { value: "98 dB @ 1 m", value_es: "98 dB @ 1 m" },
    { value: "100 dB", value_es: "100 dB" },
    { value: "94 dB", value_es: "94 dB" },
    { value: "101 dB", value_es: "101 dB" },
    { value: "~95 dB", value_es: "~95 dB" }
  ]};
T.rows.splice(3, 0, filaPot, filaPue, filaSpl);

// ============================================================
// 2) TEXTOS: todos los reemplazos EN+ES (87 sustituciones)
// ============================================================
const REEMPLAZOS = [
  // Encabezado sección 5
  ['Is the Behringer Truth 3.5 BT the Most Powerful Monitor Under $150?',
   'Is the Behringer Truth 3.5 BT the Highest Continuous Power Under $150?'],
  ['¿Es el Behringer Truth 3.5 BT el monitor más potente por debajo de $150?',
   '¿Es el Behringer Truth 3.5 BT el monitor con más potencia continua por debajo de $150?'],
  // Intro
  ['We measured what actually changes at this price and what does not',
   'We compared what actually changes at this price and what does not'],
  // Sección 1
  ['in a cabinet that is MDF rather than plastic',
   'in an MDF cabinet rather than plastic'],
  ['The tone knob is unusual at this price and genuinely useful.',
   'The tone control is unusual at this price and genuinely useful.'],
  ['play it back at a party without a second system',
   'play it back at a party without changing gear'],
  ['en un gabinete de MDF y no de plástico',
   'en una caja de MDF y no de plástico'],
  ['El control de tono es raro a este precio, y muy útil.',
   'El control de tono es raro a este precio, y muy útil.'],
  ['y sonarlo en una fiesta sin un segundo sistema',
   'y sonarlo en una fiesta sin tener que cambiar de equipo'],
  // Sección 2
  ['and a crossover at 2.8 kHz', 'and a crossover filter at 2.8 kHz'],
  ['un cruce en 2,8 kHz', 'un filtro de cruce en 2,8 kHz'],
  ['which matters to a beginner more than it does to an engineer',
   'which matters to a beginner more than it does to a working engineer'],
  ['lo que a un principiante le importa más que a un ingeniero',
   'lo que a un principiante le importa mucho más que a un ingeniero'],
  ['also the one that gives away the most low end',
   'also the one that gives you the least real bass'],
  ['es la opción más barata de esta lista y también la que más graves regala',
   'es la opción más barata de esta lista y también la que da menos graves reales'],
  ['that is a more meaningful upgrade than any specification on this page',
   'and that matters far more than any specification in this guide'],
  ['y esa es una mejora más significativa que cualquier especificación de esta página',
   'y eso importa mucho más que cualquier especificación de esta guía'],
  // Sección 3
  ['it is the only one here that ships with isolation pads at ninety-nine dollars',
   'at ninety-nine dollars it is the cheapest pair here that ships with isolation pads in the box'],
  ['es el único de esta lista que trae los pads de aislamiento en la caja por $99',
   'por $99 es el par más barato de esta lista que trae los pads de aislamiento en la caja'],
  ['only two of them hand you the isolation',
   'only two of them ship the pads in the box, this one and the Mackie CR3.5'],
  ['solo dos te dan el aislamiento',
   'solo dos los traen de serie, este y el Mackie CR3.5'],
  ['Decoupling the cabinets from a hollow desk',
   'Decoupling the cabinets from a hollow-top desk'],
  ['Desacoplar las cajas del escritorio hueco',
   'Desacoplar las cajas del tablero del escritorio'],
  ['At $139.00 it is the joint-second most expensive pair here',
   'At $139.00 it is the second most expensive pair here, behind only the Behringer'],
  ['A $139.00 es el segundo más caro de esta lista junto a otro',
   'A $139.00 es el segundo más caro de esta lista, solo por detrás del Behringer'],
  ['Between them, you have more adjustment in two fingers than the Eris gives you with two knobs.',
   'Between them you get two adjustments you can reach without looking, where the Eris puts both trims on the back panel.'],
  ['Entre los dos tienes más ajuste con dos dedos de los que el Eris te da con dos potenciómetros.',
   'Entre los dos tienes dos ajustes al alcance de los dedos, mientras que el Eris coloca los dos en el panel trasero.'],
  ['with a computer-optimised tweeter waveguide for imaging.',
   'with a computer-optimised tweeter waveguide that keeps the stereo image tight.'],
  ['con una guía de onda del tweeter optimizada por ordenador para la imagen.',
   'con una guía de ondas para el tweeter optimizada por ordenador que mantiene la imagen estéreo.'],
  // Sección 4
  ['the only pair here that ships with isolation pads, and it also adds a front tone knob.',
   'one of only two pairs here that ship with isolation pads in the box.'],
  ['el único par de aquí con pads de aislamiento de serie, y además suma un knob de tono frontal.',
   'uno de los dos únicos pares de aquí que traen los pads de aislamiento en la caja.'],
  ['the Mackie CR3.5 takes it, the only pair here that ships with isolation pads',
   'the Mackie CR3.5 takes it, one of only two pairs here that ship with isolation pads in the box'],
  ['el Mackie CR3.5 se lo lleva, el único par de aquí con pads de aislamiento de serie',
   'el Mackie CR3.5 se lo lleva, uno de los dos únicos pares de aquí que traen los pads de aislamiento en la caja'],
  // Sección 5
  ['The tone knob is a continuous tone control, not a calibrated room correction',
   'The tone control is continuous, not a calibrated room correction'],
  ['el knob de tono es un control continuo, no una corrección de sala calibrada',
   'el control de tono es continuo, no una corrección de sala calibrada'],
  ['front tone knob', 'front tone control'],
  ['knob frontal de tono', 'control frontal de tono'],
  ['Front tone knob runs flat to coloured',
   'Front tone control runs flat to coloured'],
  ['El knob frontal va de plano a coloreado',
   'El control frontal va de una referencia plana a un sonido coloreado'],
  ['Tone knob is not a calibrated room correction',
   'Tone control is not a calibrated room correction'],
  ['El knob de tono no es una corrección de sala calibrada',
   'El control de tono no es una corrección de sala calibrada'],
  ['Tone knob and location switch on the front and rear',
   'Tone control and location switch on the front and rear'],
  ['Knob de tono y conmutador de ubicación delante y detrás',
   'Control de tono y conmutador de ubicación delante y detrás'],
  ['Referencia plana con el knob del todo a la izquierda',
   'Referencia plana con el control del todo a la izquierda'],
  ['Plain tone knobs', 'Plain tone controls'],
  ['Sus controles de tono son un realce y un corte fijos de graves y agudos, sin frecuencias publicadas',
   'Sus controles de graves y agudos son simples mandos de tono, sin frecuencias indicadas'],
  ['Its tone controls are a fixed shelf boost and cut with no published frequencies',
   'Its bass and treble controls are plain tone knobs with no stated frequencies'],
  ['an inch more cone', 'half an inch larger'],
  ['una pulgada más de cono', 'medio pulgada más grande'],
  ['and the extra twelve dollars buys you a waveguide, a location switch and a driver with an inch more cone in it.',
   'and the extra twelve dollars buys you a waveguide, a location switch and a woofer that is half an inch larger.'],
  ['y los doce dólares extra te compran una guía de ondas, un conmutador de ubicación y un driver con una pulgada más de cono.',
   'y los doce dólares extra te compran una guía de ondas, un conmutador de ubicación y un woofer medio pulgada más grande.'],
  ['Play it back on it and it will flatter your mix.',
   'Mix on it and it will flatter every mix you make.'],
  ['Si mezclas encima de él, tu mezcla va a quedar favorecida.',
   'Si mezclas con él, tus mezclas van a salir mejor de lo que son.'],
  ['If you are mixing and want mixes that translate, pick a monitor from this list instead.',
   'If you are mixing and want your work to sound right on other systems, pick a monitor from this list instead.'],
  ['Si mezclas y quieres mezclas que trasladen, elige un monitor de esta lista.',
   'Si mezclas y quieres que tu trabajo suene igual en otros sistemas, elige un monitor de esta lista.'],
  ['Nearly twenty thousand reviews, and it is the pair most people in this price range will actually buy.',
   'Thousands of reviews, and it is the pair most people in this price range will actually buy.'],
  ['Casi veinte mil reseñas, y es el par que la gente de esta franja de precio realmente va a comprar.',
   'Miles de reseñas, y es el par que la gente de esta franja de precio realmente va a comprar.'],
  ['Unas 19.000 reseñas y subiendo', 'Miles de reseñas y subiendo'],
  ['fourteen hertz higher than the pair it replaces in this guide',
   'fourteen hertz higher than the wired Truth 3.5 it replaces'],
  ['catorce hercios más alto que el par al que sustituye en esta guía',
   'catorce hercios más alto que el Truth 3.5 con cable al que sustituye'],
  // Sección 7
  ['The ADAM Audio T5V lists at $199 per unit',
   'The ADAM Audio T5V costs around $199 per unit'],
  ['El ADAM Audio T5V aparece a $199 por unidad',
   'El ADAM Audio T5V cuesta unos $199 por unidad'],
  ['The Kali Audio LP-6 V2 is about $249 each',
   'The Kali Audio LP-6 V2 is about $249 per unit'],
  ['El Kali Audio LP-6 V2 está sobre $249 cada uno',
   'El Kali Audio LP-6 V2 ronda los $249 por unidad'],
  ['The Yamaha HS3 is the closest thing to a bargain',
   'The Yamaha HS3 is the closest thing to a bargain here'],
  ['El Yamaha HS3 es lo más parecido a una ganga',
   'El Yamaha HS3 es lo más parecido a una ganga de esta lista'],
  // FAQ
  ['both bi-amplify their drivers',
   'both bi-amplify the woofer and the tweeter separately'],
  ['bi-amplifican sus drivers',
   'bi-amplifican por separado el woofer y el tweeter'],
  ['unbalanced RCA only, a fixed tone control and no room correction',
   'unbalanced RCA only, plain tone knobs with no stated frequencies and no room correction'],
  ['solo RCA no balanceado, un tono fijo y ninguna corrección de sala',
   'solo RCA sin balancear, mandos de tono sin frecuencias indicadas y ninguna corrección de sala'],
  ['Your room treatment will matter more than either.',
   'Treating the room will matter more than either choice.'],
  ['El tratamiento de tu sala importará más que cualquiera de las dos cosas.',
   'Tratar la sala importará más que cualquiera de las dos opciones.'],
  // Veredicto R1280T
  ['Will flatter your mixes rather than reveal them',
   'Makes your mixes sound better than they really are'],
  ['Favorecerá tus mezclas en lugar de revelarlas',
   'Hará que tus mezclas suenen mejor de lo que son'],
  ['19,000-odd reviews and rising', 'Thousands of reviews and rising'],
  ['Mejor monitor para empezar de cero', 'Mejor monitor como primera compra'],
  // JBL 104-BT en sección 0 (producto quitado)
  ['The JBL 104-BT is 60 Hz at minus 10 dB but 88 Hz at minus 3 dB',
   'Some monitors claim 60 Hz at minus 10 dB but 88 Hz at minus 3 dB'],
  ['El JBL 104-BT da 60 Hz a menos 10 dB pero 88 Hz a menos 3 dB',
   'Algunos monitores declaran 60 Hz a menos 10 dB pero 88 Hz a menos 3 dB']
];

function aplicarTodo(o) {
  if (typeof o === 'string') {
    let x = o;
    for (const [a, b] of REEMPLAZOS) {
      if (x.indexOf(a) >= 0) x = x.split(a).join(b);
    }
    return x;
  }
  if (Array.isArray(o)) return o.map(aplicarTodo);
  if (o && typeof o === 'object') {
    const s = {}; for (const k of Object.keys(o)) s[k] = aplicarTodo(o[k]); return s;
  }
  return o;
}
Object.keys(g).forEach(k => { g[k] = aplicarTodo(g[k]); });

// ============================================================
// 3) HS3: corregir datos (precio par, sin XLR, Room Control básico)
// ============================================================
const s = g.sections[7];
const EN = '<p><strong>Because they are sold individually, not as a pair, and this guide is about the pair.</strong> Every 5-inch monitor that would normally be the recommendation at this budget is sold one speaker at a time.</p><p><strong>The Yamaha HS5 is roughly $199 per speaker.</strong> The Kali Audio LP-6 V2 is about $249 per unit. The ADAM Audio T5V costs around $199 per unit. The JBL 305P MkII is the closest thing to a genuine exception, but even it now sits near $199 for the pair in most markets rather than the $149 it launched at.</p><p><strong>That is the honest reason this list is all 3.5-inch and 4.5-inch drivers.</strong> Below about $150 for two speakers, the good 5-inch monitors do not exist yet. If your budget stretches to $200, the HS5 and the JBL 305P MkII are the correct answer and we have covered both at length in our broader guides.</p><p>The Yamaha HS3 is sold individually at $190 to $230 per unit, so a pair costs $380 to $460. It has unbalanced RCA and TRS inputs (no XLR), and a basic Room Control low-cut plus a High Trim switch. It is a genuinely good small monitor, but it simply is not a sub-$150 pair.</p>';
const ES = '<p><strong>Porque se venden por unidades, no por pares, y esta guía va del par.</strong> Todos los monitores de 5 pulgadas que serían la recomendación normal en este presupuesto se venden de una en una.</p><p><strong>El Yamaha HS5 ronda los $199 por altavoz.</strong> El Kali Audio LP-6 V2 ronda los $249 por unidad. El ADAM Audio T5V cuesta unos $199 por unidad. El JBL 305P MkII es el único que se acerca a una excepción, pero incluso él ronda los $199 el par en la mayoría de mercados, frente a los $149 con los que salió.</p><p><strong>Esa es la razón honesta de que esta lista sea toda de drivers de 3,5 y 4,5 pulgadas.</strong> Por debajo de unos $150 por dos altavoces, los buenos monitores de 5 pulgadas todavía no existen. Si tu presupuesto llega a $200, el HS5 y el JBL 305P MkII son la respuesta correcta y los explicamos a fondo en nuestras guías generales.</p><p>El Yamaha HS3 se vende por unidades a $190–230 cada una, así que un par cuesta $380–460. Solo tiene entradas RCA y TRS no balanceadas (sin XLR), y un interruptor Room Control de corte de graves más un High Trim de ±2 dB. Es un monitor pequeño genuinamente bueno, pero simplemente no es un par por debajo de $150.</p>';
s.content = EN;
s.content_es = ES;

// ============================================================
// 4) ELIMINAR párrafo duplicado EN sección 5
// ============================================================
const dup = '<p><strong>One caveat, because the numbers get quoted out of context: the M-Audio BX4 is rated at 120W peak.</strong> Peak and RMS are not comparable figures, which is why we rank on continuous power here. If you see a comparison claiming this is the loudest pair here, check which number it is using.</p>';
if (g.sections[5].content.indexOf(dup) >= 0) {
  g.sections[5].content = g.sections[5].content.replace(dup, '');
}

// ============================================================
// 5) Escribir JSON
// ============================================================
fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('TODOS los fixes aplicados correctamente.');