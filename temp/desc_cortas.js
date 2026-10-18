const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));

// Descriptions sized to FIT the 3-line clamp (height 4.5em, 12px) at the narrow
// card width, so they end on a full stop instead of being sliced mid-sentence.
const nuevos = {
  1042: {
    desc: "A 3.5-inch woven woofer and 1-inch silk dome on 50W of Class AB, 80 Hz to 20 kHz, with plus or minus 6 dB trims at 100 Hz and 10 kHz.",
    desc_es: "Woofer de 3,5 pulgadas y cúpula de seda de 1 pulgada, 50 W en Clase AB, de 80 Hz a 20 kHz, con ajustes de ±6 dB a 100 Hz y 10 kHz."
  },
  1043: {
    desc: "A 4.5-inch Kevlar woofer and 1-inch silk dome, 69 Hz to 22 kHz, 120W peak, with rear High-EQ and Low-EQ plus foam feet included.",
    desc_es: "Woofer de 4,5 pulgadas de Kevlar y seda de 1 pulgada, de 69 Hz a 22 kHz, 120 W pico, con High-EQ y Low-EQ traseros y pies de espuma."
  },
  1044: {
    desc: "A 3.5-inch driver and 1-inch silk dome, 52 Hz to 40 kHz. The only pair under $100 here with balanced TRS and Bluetooth 5.4.",
    desc_es: "Woofer de 3,5 pulgadas y seda de 1 pulgada, de 52 Hz a 40 kHz. El único par bajo $100 con TRS balanceada y Bluetooth 5.4."
  },
  1046: {
    desc: "A 3.5-inch woven woofer on 50W RMS, with a front tone knob, a location switch and isolation pads in the box. No Bluetooth.",
    desc_es: "Woofer de 3,5 pulgadas con 50 W RMS, knob de tono frontal, conmutador de ubicación y pads de aislamiento. Sin Bluetooth."
  },
  1047: {
    desc: "Not a studio monitor: no balanced input, no waveguide. But a 4-inch driver, 42W RMS and 52 Hz to 20 kHz with side-panel tone.",
    desc_es: "No es un monitor: sin entrada balanceada ni guía de ondas. Pero sí 4 pulgadas, 42 W RMS y 52 Hz a 20 kHz con tono lateral."
  },
  1048: {
    desc: "A 4.5-inch woven woofer on 50W RMS reaching 55 Hz, the deepest new bass under $150, with a front tone knob and location switch.",
    desc_es: "Woofer de 4,5 pulgadas con 50 W RMS hasta 55 Hz, el grave nuevo más profundo bajo $150, con knob de tono y conmutador."
  }
};

let n = 0;
Object.entries(nuevos).forEach(([id, t]) => {
  const p = products.find(x => x.id === Number(id));
  if (!p) return;
  p.desc = t.desc; p.desc_es = t.desc_es; n++;
});
fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');

console.log('descripciones ajustadas: ' + n);
console.log('\n=== MEDIDAS ===');
console.log('  ' + 'id'.padEnd(6) + 'EN'.padStart(5) + '  ES'.padStart(5) + '   termina en');
Object.keys(nuevos).forEach(id => {
  const p = products.find(x => x.id === Number(id));
  const fin = s => /[.]$/.test(s) ? 'punto OK' : 'SIN PUNTO <-- mal';
  console.log('  ' + id.padEnd(6) + String(p.desc.length).padStart(5) + String(p.desc_es.length).padStart(5) +
    '   EN ' + fin(p.desc) + ' | ES ' + fin(p.desc_es) +
    ((p.desc.length <= 145 && p.desc_es.length <= 145) ? '' : '   <-- demasiado larga'));
});

console.log('\n=== TEXTO COMPLETO QUE VERA EL LECTOR ===');
Object.keys(nuevos).forEach(id => {
  const p = products.find(x => x.id === Number(id));
  console.log('--- ' + p.title);
  console.log('    ' + p.desc);
  console.log('    ' + p.desc_es);
});
