const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));

// lo que se ve en la card = primeros ~160 caracteres (height 4.5em + line-clamp 3 a 12px)
const nuevos = {
  1047: {
    desc: "Not a studio monitor: no balanced input, no waveguide, no room correction. But a 4-inch woven driver, 0.5-inch silk dome, 42W RMS and 52 Hz to 20 kHz, with bass, treble and volume on the side panel and two RCA inputs so a turntable and a computer can stay connected. With 19,000-odd reviews it is also the most bought pair at this price, and it sounds lovely. Just do not expect it to translate.",
    desc_es: "No es un monitor de estudio: sin entrada balanceada, sin guía de ondas, sin corrección de sala. Pero sí un driver de 4 pulgadas de tejido, cúpula de seda de 0,5 pulgadas, 42 W RMS y 52 Hz a 20 kHz, con graves, agudos y volumen en el panel lateral y dos entradas RCA para tener conectados a la vez un tocadiscos y un ordenador. Con unas 19.000 reseñas es además el par más comprado a este precio, y suena muy bien. Lo que no hace es trasladar."
  },
  1048: {
    desc: "A 4.5-inch woven woofer and silk-dome tweeter on 50W RMS of Class A/B bi-amplification reaching 55 Hz, the deepest bass available new on a pair under $150. A front tone knob runs flat to coloured, and a location switch flips the voicing between desktop and bookshelf.",
    desc_es: "Woofer de 4,5 pulgadas de tejido y cúpula de seda con 50 W RMS bi-amplificados en Clase A/B hasta 55 Hz, el grave más profundo disponible nuevo por un par por debajo de $150. El knob frontal de tono va de plano a coloreado, y el conmutador de ubicación alterna el voicing entre escritorio y estantería."
  },
  1043: {
    desc: "A 4.5-inch Black Kevlar woofer and 1-inch natural silk dome covering 69 Hz to 22 kHz, on 120W of peak power (2 x 25W RMS per pair), with High-EQ and Low-EQ on the rear panel and foam feet in the box. No Bluetooth and no XLR.",
    desc_es: "Woofer de 4,5 pulgadas de Kevlar negro y cúpula de seda natural de 1 pulgada que cubren de 69 Hz a 22 kHz, con 120 W de potencia pico (2 x 25 W RMS por pareja), High-EQ y Low-EQ en el panel trasero y pies de espuma en la caja. Sin Bluetooth y sin XLR."
  },
  1044: {
    desc: "A 3.5-inch mid-low driver and 1-inch silk dome on 18W RMS per side, reaching 52 Hz to 40 kHz, with a dimpled tweeter waveguide. The only pair under $100 here with a balanced TRS input and Bluetooth 5.4, plus Hi-Res Audio 24/96 and app room compensation.",
    desc_es: "Woofer medio-grave de 3,5 pulgadas y cúpula de seda de 1 pulgada con 18 W RMS por lado, de 52 Hz a 40 kHz, y una guía de onda del tweeter con hoyuelos. El único par de esta lista por debajo de $100 con entrada TRS balanceada y Bluetooth 5.4, además de Hi-Res Audio 24/96 y compensación de sala en la app."
  },
  1042: {
    desc: "A 3.5-inch woven glass-fibre composite woofer and 1-inch silk dome on 50W of Class AB amplification, 80 Hz to 20 kHz, with a crossover at 2.8 kHz. The rear panel is the reason: HF and LF trims of plus or minus 6 dB centred at 10 kHz and 100 Hz, both continuous.",
    desc_es: "Woofer de 3,5 pulgadas de fibra de vidrio trenzada y cúpula de seda de 1 pulgada con 50 W de amplificación Clase AB, de 80 Hz a 20 kHz, y cruce en 2,8 kHz. El panel trasero es la razón: ajustes de agudos y graves de ±6 dB centrados en 10 kHz y 100 Hz, ambos continuos."
  },
  1046: {
    desc: "A 3.5-inch woven woofer and silk-dome tweeter on 50W RMS of Class A/B bi-amplification, with a front tone knob that runs flat to coloured and a location switch for desktop or bookshelf placement. The only pair under $100 here that ships with isolation pads.",
    desc_es: "Woofer de 3,5 pulgadas de tejido y cúpula de seda con 50 W RMS bi-amplificados en Clase A/B, con un knob frontal de tono que va de plano a coloreado y un conmutador de ubicación para escritorio o estantería. El único par de esta lista por debajo de $100 que incluye pads de aislamiento."
  }
};

let n = 0;
Object.entries(nuevos).forEach(([id, t]) => {
  const p = products.find(x => x.id === Number(id));
  if (!p) return;
  if (p.desc) n++;
  p.desc = t.desc;
  p.desc_es = t.desc_es;
});

fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');
console.log('descripciones reescritas: ' + n + '\n');

console.log('=== LO QUE SE VE AHORA EN CADA CARD (160 car.) ===');
Object.keys(nuevos).forEach(id => {
  const p = products.find(x => x.id === Number(id));
  console.log('--- ' + p.id + ' ' + p.title);
  console.log('    EN "' + p.desc.slice(0, 160) + (p.desc.length > 160 ? '…' : '') + '"');
  console.log('    ES "' + p.desc_es.slice(0, 160) + (p.desc_es.length > 160 ? '…' : '') + '"');
  console.log('');
});
