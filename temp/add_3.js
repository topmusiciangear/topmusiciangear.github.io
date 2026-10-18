const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const ruta = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(ruta, 'utf8'));

const nuevos = [
  {
    match: /^Edifier MR3$/i,
    obj: {
      title: 'Edifier MR3',
      title_es: 'Edifier MR3',
      brand: 'Edifier',
      category: 'monitors',
      price: 99.99,
      rating: 4.5,
      reviews: 853,
      badge: 'bestvalue',
      desc: 'A 3.5-inch mid-low driver and 1-inch silk dome on 18W RMS per side, with a deliberately wide 52 Hz to 40 kHz range and a dimpled tweeter waveguide for smoother high-frequency extension. It is the only pair in this budget that gives you a balanced 1/4-inch TRS input and Bluetooth 5.4 at the same time, and the Hi-Res Audio 24-bit/96 kHz front end runs the signal path bit-perfect. Room compensation lives in the Edifier ConneX app alongside EQ presets, and the MDF cabinet keeps resonance down. One active speaker, one passive, plus a front headphone output.',
      desc_es: 'Woofer medio-grave de 3,5 pulgadas y cúpula de seda de 1 pulgada con 18 W RMS por lado, en un rango deliberadamente amplio de 52 Hz a 40 kHz y una guía de onda del tweeter con hoyuelos que suaviza la extensión en agudos. Es el único par de este presupuesto que te da entrada TRS balanceada de 1/4 de pulgada y Bluetooth 5.4 a la vez, y su frontal Hi-Res Audio de 24 bits/96 kHz mantiene la señal intacta. La compensación de sala vive en la app Edifier ConneX, junto a los presets de EQ, y el gabinete de MDF reduce las resonancias. Una caja activa, otra pasiva, más salida de auriculares frontal.',
      img: '',
      stores: { amazon: 'https://www.amazon.com/dp/B0DGXTBQTY?tag=topmusicg-20' },
      unit: 'pair',
      unit_es: 'par'
    }
  },
  {
    match: /^PreSonus Eris E4\.5$/i,
    obj: {
      title: 'PreSonus Eris E4.5',
      title_es: 'PreSonus Eris E4.5',
      brand: 'PreSonus',
      category: 'monitors',
      price: 139.99,
      rating: 4.5,
      reviews: 3000,
      badge: 'recommended',
      desc: 'A 4.5-inch woven glass-fibre composite woofer and 1-inch ultra-low-mass silk dome on 50W of Class AB bi-amplification, behind the EBM waveguide that gives 120 degrees horizontally and a narrow 60 degrees vertically so desk reflections drop away. It is one of very few pairs under $150 with true balanced XLR and quarter-inch TRS inputs alongside RCA, and the flat, unhyped balance has enough weight behind it to mix on rather than merely check. Front-firing port, one active speaker and one passive, foam feet included.',
      desc_es: 'Woofer de 4,5 pulgadas de fibra de vidrio trenzada y cúpula de seda ultraligera de 1 pulgada con 50 W bi-amplificados en Clase AB, detrás de la guía de ondas EBM que da 120 grados en horizontal y solo 60 en vertical, así que las reflexiones del escritorio desaparecen. Es uno de los poquísimos pares por debajo de $150 con entradas XLR y TRS de 1/4 de pulgada realmente balanceadas además de RCA, y su respuesta plana y sin colorear tiene cuerpo suficiente para mezclar en lugar de solo comprobar. Puerto frontal, una caja activa y otra pasiva, pies de espuma incluidos.',
      img: '',
      stores: { amazon: 'https://www.amazon.com/dp/B00GP56OYA?tag=topmusicg-20' },
      unit: 'pair',
      unit_es: 'par'
    }
  },
  {
    match: /^Mackie CR3\.5$/i,
    obj: {
      title: 'Mackie CR3.5',
      title_es: 'Mackie CR3.5',
      brand: 'Mackie',
      category: 'monitors',
      price: 99.99,
      rating: 4.5,
      reviews: 339,
      badge: 'recommended',
      desc: 'A 3.5-inch woven woofer and silk-dome tweeter on 50W RMS of Class A/B bi-amplification, with two front-panel controls that do more than most rivals at twice the price. The tone knob runs from a flat studio reference setting at full counter-clockwise to a lifted, coloured sound as you turn it right. The location switch flips between desktop and bookshelf voicing for wherever the pair ends up. TRS, RCA and 3.5mm inputs, front headphone output, and unlike most in this class the isolation pads are in the box.',
      desc_es: 'Woofer de 3,5 pulgadas de tejido y cúpula de seda con 50 W RMS bi-amplificados en Clase A/B, con dos controles frontales que hacen más que muchos rivales al doble de precio. El knob de tono va desde una respuesta plana de referencia de estudio girando a la izquierda hasta un sonido más colorationado al girarlo a la derecha. El conmutador de ubicación alterna entre voicing de escritorio y de estantería según dónde acaben. Entradas TRS, RCA y 3,5 mm, salida de auriculares frontal y, a diferencia de la mayoría de esta categoría, los pads de aislamiento vienen en la caja.',
      img: '',
      stores: { amazon: 'https://www.amazon.com/dp/B0DFZZ5ZZY?tag=topmusicg-20' },
      unit: 'pair',
      unit_es: 'par'
    }
  }
];

let creados = 0;
for (const n of nuevos) {
  const existente = products.find(p => n.match.test(p.title));
  if (existente) { console.log('ya existe: ' + existente.id + ' ' + existente.title); continue; }
  const id = Math.max(...products.map(p => p.id)) + 1;
  const nuevo = Object.assign({ id: id }, n.obj);
  products.push(nuevo);
  creados++;
  console.log('creado ' + id + ' | ' + nuevo.title + ' | $' + nuevo.price + ' | ' + nuevo.unit + ' | ' + Object.keys(nuevo.stores).join(','));
}

fs.writeFileSync(ruta, JSON.stringify(products, null, 2), 'utf8');
console.log('\ncreados: ' + creados + ' | total productos: ' + products.length);
const monitores = products.filter(p => p.category === 'monitors');
console.log('monitores en catalogo: ' + monitores.length + ' | sin foto: ' + monitores.filter(p => !p.img).length);
