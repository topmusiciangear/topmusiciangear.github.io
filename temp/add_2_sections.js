const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'best-interface');

const has53 = g.sections.some(s => s && JSON.stringify(s.products) === '[53]');
const has55 = g.sections.some(s => s && JSON.stringify(s.products) === '[55]');
if (has53 || has55) { console.log('ya existen:', has53, has55); process.exit(0); }

g.sections.push({
  heading: 'Audient iD14 MkII: Console Preamps You Can Expand With ADAT',
  heading_es: 'Audient iD14 MkII: previos de consola ampliables por ADAT',
  products: [53],
  content: '<p><strong>The iD14 MkII puts two fully analogue Audient Console mic preamps on your desk — the same discrete circuit found in the ASP8024-HE console, not an emulation.</strong> They deliver clean, detailed gain with a touch of analogue warmth, plus true 48V phantom power on both channels even when bus-powered over USB. Conversion runs at 24-bit/96 kHz with 126 dB of dynamic range on the DAC, so monitoring stays honest.</p>' +
    '<p><strong>The reason to pick it over the Scarlett is growth.</strong> The optical input accepts ADAT or SPDIF, adding up to eight extra channels for drums or a full band later. A JFET instrument input replicates a valve-amp front end for guitars and bass, two headphone outputs (jack plus mini-jack) drive headphones up to 600 ohms, and the programmable iD button puts dim, cut, mono sum or talkback under one finger. The software mixer handles ultra-low-latency direct monitoring and independent artist mixes.</p>' +
    '<p><strong>Know the trade-offs.</strong> At around $399 it costs roughly twice the Scarlett, and the 2-in/4-out analog frame means the expansion story depends on buying an external preamp unit later. Guitarists who only need one input and a compressor may prefer the Volt 276.</p>',
  content_es: '<p><strong>El iD14 MkII pone dos previos de micrófono Audient Console totalmente analógicos en tu escritorio: el mismo circuito discreto de la consola ASP8024-HE, no una emulación.</strong> Entregan ganancia limpia y detallada con un toque de calidez analógica, más alimentación phantom real de 48V en ambos canales incluso alimentado por USB. La conversión corre a 24 bits/96 kHz con 126 dB de rango dinámico en el DAC, así que la monitorización se mantiene honesta.</p>' +
    '<p><strong>El motivo para elegirlo sobre la Scarlett es el crecimiento.</strong> La entrada óptica acepta ADAT o SPDIF, añadiendo hasta ocho canales extra para baterías o una banda completa más adelante. Una entrada de instrumento JFET replica la entrada de un ampli de válvulas para guitarras y bajos, dos salidas de auriculares (jack más mini-jack) mueven auriculares de hasta 600 ohmios, y el botón iD programable pone dim, cut, suma a mono o talkback bajo un dedo. El mezclador por software gestiona monitorización directa de latencia ultrabaja y mezclas independientes para artistas.</p>' +
    '<p><strong>Conviene saber las contrapartidas.</strong> Por unos $399 cuesta roughly el doble que la Scarlett, y el marco analógico de 2 entradas y 4 salidas hace que la historia de expansión dependa de comprar una unidad de previos externa después. Los guitarristas que solo necesitan una entrada y un compresor quizá prefieran el Volt 276.</p>'
});

g.sections.push({
  heading: 'Universal Audio Volt 2: Vintage 610 Tone for $199',
  heading_es: 'Universal Audio Volt 2: tono 610 vintage por $199',
  products: [55],
  content: '<p><strong>The Volt 2 is UA quality stripped to the essentials: two preamps with 55 dB of clean gain, a 2-in/2-out USB-C frame at 24-bit/192 kHz, MIDI I/O and direct monitoring, all in a solid metal box with a retro face.</strong> The Vintage Mic Preamp mode voices the input after the classic UA 610 tube preamp, adding the depth and body that flatters vocals and acoustic guitars without any plugin.</p>' +
    '<p><strong>At around $199 it is the cheapest way into the UA sound.</strong> Phantom power, a sturdy build and simple metering make it a genuine plug-and-play box: connect, set gain, record. Podcasters and singer-songwriters who track one or two sources get everything they need and nothing they must learn.</p>' +
    '<p><strong>Know the limits.</strong> Two analog inputs with no ADAT expansion means no drums and no band, and engaging Vintage mode adds a few dB, so you must re-set gain each time. If you want a compressor on the way in, the Volt 276 adds the analog 76 circuit for about $100 more.</p>',
  content_es: '<p><strong>El Volt 2 es calidad UA reducida a lo esencial: dos previos con 55 dB de ganancia limpia, un marco USB-C de 2 entradas y 2 salidas a 24 bits/192 kHz, MIDI I/O y monitorización directa, todo en una caja metálica sólida con frontal retro.</strong> El modo Vintage Mic Previo colorea la entrada como el clásico previo de tubo UA 610, añadiendo la profundidad y el cuerpo que favorecen a voces y guitarras acústicas sin ningún plugin.</p>' +
    '<p><strong>Por unos $199 es la vía más barata al sonido UA.</strong> Alimentación phantom, construcción robusta y medición sencilla lo convierten en una caja de verdad plug-and-play: conecta, ajusta ganancia, graba. Podcasters y cantautores que graban una o dos fuentes tienen todo lo que necesitan y nada que deban aprender.</p>' +
    '<p><strong>Conviene saber los límites.</strong> Dos entradas analógicas sin expansión ADAT significa ni baterías ni bandas, y activar el modo Vintage añade unos dB, así que debes reajustar la ganancia cada vez. Si quieres un compresor en la entrada, el Volt 276 añade el circuito analógico 76 por unos $100 más.</p>'
});

// Arreglar "roughly" colado en el ES (calco)
const aud = g.sections[g.sections.length - 2];
aud.content_es = aud.content_es.split('cuesta roughly el doble').join('cuesta casi el doble');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// Controles
const withBtn = g.sections.filter(s => s && s.products && s.products.length).length;
console.log('secciones con boton:', withBtn + '/' + g.sections.length);
const heads = g.sections.map(s => s.heading);
const singles = heads.filter(h => (g.sections.filter(s => s.heading === h).length > 1));
console.log('headings duplicados:', singles.length ? [...new Set(singles)].join(' | ') : 'ninguno');
console.log('roughly en ES:', aud.content_es.includes('roughly') ? 'SIGUE' : 'no');
let nulls = 0;
g.sections.forEach(s => { if (!s) nulls++; });
console.log('nulos:', nulls);