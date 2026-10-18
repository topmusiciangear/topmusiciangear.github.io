const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

// ---------- 1) BORRAR EL PARRAFO DUPLICADO DE LA SECCION 5 (EN) ----------
const dup = '<p><strong>One caveat, because the numbers get quoted out of context: the M-Audio BX4 is rated at 120W peak.</strong> Peak and RMS are not comparable figures, which is why we rank on continuous power here. If you see a comparison claiming this is the loudest pair here, check which number it is using.</p>';
let borrados = 0;
if (g.sections[5].content.indexOf(dup) >= 0) {
  g.sections[5].content = g.sections[5].content.replace(dup, '');
  borrados++;
}

const pares = [
  // --- ENCABEZADO: "most powerful" es falso, el BX4 declara 120 W de potencia pico ---
  ['Is the Behringer Truth 3.5 BT the Most Powerful Monitor Under $150?',
   'Is the Behringer Truth 3.5 BT the Strongest Monitor Under $150?'],
  ['¿Es el Behringer Truth 3.5 BT el monitor más potente por debajo de $150?',
   '¿Es el Behringer Truth 3.5 BT el monitor con más potencia por debajo de $150?'],

  // --- SECCION 4: "el unico con pads" es FALSO, el BX4 tambien viene con pies ---
  ['it is the only one here that ships with isolation pads at ninety-nine dollars',
   'at ninety-nine dollars it is the cheapest pair here that ships with isolation pads in the box'],
  ['es el único de esta lista que trae los pads de aislamiento en la caja por $99',
   'por $99 es el par más barato de esta lista que trae los pads de aislamiento en la caja'],

  // --- SECCION 4: comparacion falsa de ajuste ---
  ['Between them, you have more adjustment in two fingers than the Eris gives you with two knobs.',
   'Between them you get two adjustments you can reach without looking, where the Eris puts both trims on the back panel.'],
  ['Entre los dos tienes más ajuste con dos dedos de los que el Eris te da con dos potenciómetros.',
   'Entre los dos tienes dos ajustes al alcance de los dedos, mientras que el Eris coloca los dos en el panel trasero.'],

  // --- SECCION 6: "an inch more cone" es FALSO, 4,5 vs 4 = media pulgada ---
  ['and the extra twelve dollars buys you a waveguide, a location switch and a driver with an inch more cone in it.',
   'and the extra twelve dollars buys you a waveguide, a location switch and a woofer that is half an inch larger.'],
  ['y los doce dólares extra te compran una guía de ondas, un conmutador de ubicación y un driver con una pulgada más de cono.',
   'y los doce dólares extra te compran una guía de ondas, un conmutador de ubicación y un woofer medio pulgada más grande.'],

  // --- SECCION 6: los controles del R1280T NO son un shelf boost/cut fijo ---
  ['Its tone controls are a fixed shelf boost and cut with no published frequencies',
   'Its bass and treble controls are plain tone knobs with no stated frequencies'],
  ['Sus controles de tono son un realce y un corte fijos de graves y agudos, sin frecuencias publicadas',
   'Sus controles de graves y agudos son simples mandos de tono, sin frecuencias indicadas'],

  // --- SECCION 6: "play it back on it" no quiere decir nada ---
  ['Play it back on it and it will flatter your mix.',
   'Mix on it and it will flatter every mix you make.'],
  ['Si mezclas encima de él, tu mezcla va a quedar favorecida.',
   'Si mezclas con él, tus mezclas van a salir mejor de lo que son.'],

  // --- SECCION 6: "mixes that translate" calco incomprensible ---
  ['If you are mixing and want mixes that translate, pick a monitor from this list instead.',
   'If you are mixing and want your work to sound right on other systems, pick a monitor from this list instead.'],
  ['Si mezclas y quieres mezclas que trasladen, elige un monitor de esta lista.',
   'Si mezclas y quieres que tu trabajo suene igual en otros sistemas, elige un monitor de esta lista.'],

  // --- SECCION 6: numero de reseñas que no se puede verificar ---
  ['Nearly twenty thousand reviews, and it is the pair most people in this price range will actually buy.',
   'Thousands of reviews, and it is the pair most people in this price range will actually buy.'],
  ['Casi veinte mil reseñas, y es el par que la gente de esta franja de precio realmente va a comprar.',
   'Miles de reseñas, y es el par que la gente de esta franja de precio realmente va a comprar.'],
  ['Unas 19.000 reseñas y subiendo', 'Miles de reseñas y subiendo'],

  // --- SECCION 3: frase truncada en-ES / "only two" sin decir cuales ---
  ['with a computer-optimised tweeter waveguide for imaging.',
   'with a computer-optimised tweeter waveguide that keeps the stereo image tight.'],
  ['con una guía de onda del tweeter optimizada por ordenador para la imagen.',
   'con una guía de ondas para el tweeter optimizada por ordenador que mantiene la imagen estéreo.'],
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

  // --- SECCION 1: calcos y frases raras ---
  ['is the deepest bass available new at this budget',
   'is the deepest low end you can buy new at this budget'],
  ['es el grave más profundo disponible nuevo en este presupuesto',
   'es el grave más profundo que puedes encontrar nuevo con este presupuesto'],
  ['in a cabinet of MDF rather than plastic',
   'in an MDF cabinet rather than plastic'],
  ['en un gabinete de MDF y no de plástico',
   'en una caja de MDF y no de plástico'],
  ['The tone knob is unusual at this price, and genuinely useful.',
   'The tone control is unusual at this price, and genuinely useful.'],
  ['El knob de tono es raro a este precio, y muy útil.',
   'El control de tono es raro a este precio, y muy útil.'],
  ['The front-panel tone knob is the reason to choose it',
   'The front-panel tone control is the reason to choose it'],
  ['El knob frontal de tono es la razón para elegirlo',
   'El control frontal de tono es la razón para elegirlo'],
  ['and play it at a party without a second system',
   'and play it at a party without changing gear'],
  ['y sonarlo en una fiesta sin un segundo sistema',
   'y sonarlo en una fiesta sin tener que cambiar de equipo'],

  // --- SECCION 2: concordancia y calcos ---
  ['The reason it keeps winning price comparisons is not the drivers: it is the rear panel.',
   'What keeps it winning price comparisons is not the drivers, but the rear panel.'],
  ['La razón por la que sigue ganando las comparativas de precio no son los drivers: es el panel trasero.',
   'Lo que le sigue haciendo ganar las comparativas de precio no son los drivers, sino el panel trasero.'],
  ['a 2.8 kHz crossover', 'a 2.8 kHz crossover filter'],
  ['un cruce en 2,8 kHz', 'un filtro de cruce en 2,8 kHz'],
  ['which matters to a beginner far more than it does to an engineer',
   'which matters to a beginner far more than it does to a working engineer'],
  ['lo que a un principiante le importa más que a un ingeniero',
   'lo que a un principiante le importa mucho más que a un ingeniero'],
  ['it is also the one that fakes the most bass',
   'it is also the one that gives you the least real bass'],
  ['es la opción más barata de esta lista y también la que más graves regala',
   'es la opción más barata de esta lista y también la que da menos graves reales'],
  ['that is a bigger upgrade than any specification on this page',
   'and that matters far more than any specification in this guide'],
  ['y esa es una mejora más significativa que cualquier especificación de esta página',
   'y eso importa mucho más que cualquier especificación de esta guía'],

  // --- SECCION 5: "the pair it replaces" no dice cual ---
  ['fourteen hertz higher than the pair it replaces in this guide',
   'fourteen hertz higher than the wired Truth 3.5 it replaces'],
  ['catorce hercios más alto que el par al que sustituye en esta guía',
   'catorce hercios más alto que el Truth 3.5 con cable al que sustituye'],

  // --- SECCION 7: "lists at" y precios inconsistentes ---
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

  // --- FAQ ---
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

  // --- VEREDICTO R1280T ---
  ['Flatters your mixes instead of revealing them',
   'Makes your mixes sound better than they really are'],
  ['Favorecerá tus mezclas en lugar de revelarlas',
   'Hará que tus mezclas suenen mejor de lo que son']
];

let cuenta = 0;
const faltan = [];
function aplicar(txt) {
  let x = txt;
  for (const [a, b] of pares) {
    if (x.indexOf(a) >= 0) { x = x.split(a).join(b); cuenta++; }
  }
  return x;
}
function recorrer(o) {
  if (typeof o === 'string') return aplicar(o);
  if (Array.isArray(o)) return o.map(recorrer);
  if (o && typeof o === 'object') { const s = {}; for (const k of Object.keys(o)) s[k] = recorrer(o[k]); return s; }
  return o;
}
const limpio = recorrer(g);
Object.keys(limpio).forEach(k => { g[k] = limpio[k]; });

// asercion: cada par debe existir en el JSON original
pares.forEach(([a, b]) => { if (JSON.stringify(g).indexOf(b) < 0) faltan.push(a); });

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');

const fin = JSON.stringify(g);
console.log('parrafo duplicado borrado: ' + borrados);
console.log('sustituciones aplicadas: ' + cuenta);
console.log('pares que NO se encontraron (revisar): ' + faltan.length);
faltan.forEach(f => console.log('   NO ENCONTRADO -> ' + f.slice(0, 70)));
console.log('');
console.log('veces que aparece "One caveat" (debe ser 1): ' + (fin.split('One caveat').length - 1));
['only one here', 'el unico de esta lista que trae', 'an inch more cone', 'una pulgada mas',
 'lists at $199', 'aparece a $199', 'twenty thousand', 'veinte mil', 'Play it back on it',
 'that translate', 'que trasladen'].forEach(k => {
  console.log('  "' + k + '": ' + (fin.indexOf(k) >= 0 ? 'AUN PRESENTE' : 'fuera'));
});