const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = require(DIR + 'data/products.json');
const fixes = [
  [13, 'desc', '61 velocity-sensitive keys with polyphonic aftertouch.', '61 velocity-sensitive keys with no key aftertouch (polyphonic aftertouch on the pads only).'],
  [13, 'desc_es', '61 teclas sensibles a la velocidad con aftertouch polifónico.', '61 teclas sensibles a la velocidad sin aftertouch en el teclado (aftertouch polifónico solo en los pads).'],
  [19, 'desc', '8-inch cone woofer with Kevlar coating, 1-inch dome tweeter,', '8-inch cone woofer, 1-inch dome tweeter,'],
  [19, 'desc_es', 'Woofer de cono de 8 pulgadas con revestimiento de Kevlar,', 'Woofer de cono de 8 pulgadas,'],
  [129, 'desc', 'Standalone groovebox with 8 drum tracks, 2 polyphonic synth tracks,', 'Standalone groovebox with 4 drum tracks, 2 polyphonic synth tracks,'],
  [129, 'desc_es', 'con 8 pistas de batería, 2 pistas de sintetizador polifónicas', 'con 4 pistas de batería, 2 pistas de sintetizador polifónicas'],
  [180, 'desc', 'Featuring 1350W tri-amped amplification (500W + 300W + 50W),', 'Featuring 1350W quad-amped amplification (2 x 500W + 300W + 50W),'],
  [180, 'desc_es', 'Con amplificación de tres vías de 1350W (500W + 300W + 50W),', 'Con amplificación de cuatro vías de 1350W (2 x 500W + 300W + 50W),'],
  [105, 'desc', '2,000W of Class-D peak power,', '1,000W of Class-D power,'],
  [105, 'desc', 'Lightweight at just 30 lbs', 'Lightweight at just 32.7 lbs'],
  [105, 'desc_es', '2.000W de potencia pico Clase-D,', '1.000W de potencia Clase-D,'],
  [105, 'desc_es', 'Diseño ligero de solo 13,6 kg', 'Diseño ligero de solo 14,8 kg'],
  [108, 'desc', 'Lightweight at 38 lbs.', 'Lightweight at 41 lbs.'],
  [489, 'desc', 'a rechargeable lithium-ion battery with up to 3.5 hours of playtime.', 'a rechargeable lithium-ion battery with up to 8 hours of playtime.'],
  [489, 'desc_es', 'una batería recargable de iones de litio con hasta 3,5 horas de autonomía.', 'una batería recargable de iones de litio con hasta 8 horas de autonomía.'],
  [181, 'desc', '5" midrange, and 10" woofer with 250W + 100W + 100W tri-amped amplification.', '5" midrange, and 11" subwoofer with 300W + 150W + 100W tri-amped amplification.'],
  [181, 'desc_es', 'rango medio de 5" y woofer de 10" con amplificación de tres vías de 250W + 100W + 100W.', 'rango medio de 5" y subwoofer de 11" con amplificación de tres vías de 300W + 150W + 100W.'],
  [496, 'desc', 'with 2,000W of Class-D peak power, 134 dB max SPL', 'with 2,000W of Class-D peak power, 133 dB max SPL'],
  [496, 'desc', 'Durable 22.7 kg polypropylene cabinet', 'Durable 24.1 kg polypropylene cabinet'],
  [496, 'desc_es', 'con 2.000W de potencia pico Clase-D, 134 dB SPL máximo', 'con 2.000W de potencia pico Clase-D, 133 dB SPL máximo'],
  [496, 'desc_es', 'Gabinete de polipropileno de 22,7 kg', 'Gabinete de polipropileno de 24,1 kg'],
  [479, 'desc', 'It reaches 28 Hz (±3 dB) with a 125 dB peak SPL,', 'It reaches 28 Hz (-6 dB) with a 125 dB peak SPL,'],
  [479, 'desc_es', 'Llega hasta 28 Hz (±3 dB) con 125 dB de SPL de pico,', 'Llega hasta 28 Hz (-6 dB) con 125 dB de SPL de pico,'],
  [54, 'desc', 'The only interface with real-time level monitoring.', 'The only interface in its class with a full-color LCD with real-time level meters for all inputs and outputs.'],
  [54, 'desc_es', 'La única interfaz con monitoreo de nivel en tiempo real.', 'La única interfaz de su clase con pantalla LCD a color con medidores de nivel en tiempo real para todas las entradas y salidas.']
];
let miss = 0;
for (const [id, key, oldS, newS] of fixes) {
  const p = P.find(x => x.id === id);
  if (!p || !p[key] || !p[key].includes(oldS)) { console.log('MISS ' + id + ' ' + key + ': ' + oldS.slice(0, 70)); miss++; continue; }
  p[key] = p[key].split(oldS).join(newS);
}
// id 108 desc_es weight? subagent only gave EN. check ES field exists with 38 lbs equivalent
const p108 = P.find(x => x.id === 108);
console.log('108 ES weight check: ' + (p108.desc_es.match(/3\d[.,]\d kg|\d+ lbs|libra/g) || []).join(','));
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2));
console.log('DONE miss=' + miss);
// p225 faq fix
const G = require(DIR + 'data/guides.json');
const g = G.find(x => x.id === 'p225-vs-fp30x');
const k = 'faq_q4_es';
if (g.featuredSnippet[k].includes('es el mejor para')) {
  g.featuredSnippet[k] = g.featuredSnippet[k].replace('es el mejor para', 'es ideal para');
  console.log('OK p225 faq');
}
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));