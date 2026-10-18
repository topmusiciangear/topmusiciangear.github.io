const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const ruta = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(ruta, 'utf8'));

const nuevos = [
  {
    match: /^Edifier R1280T$/i,
    obj: {
      title: 'Edifier R1280T',
      title_es: 'Edifier R1280T',
      brand: 'Edifier',
      category: 'monitors',
      price: 117.99,
      rating: 4.6,
      reviews: 19384,
      badge: 'popular',
      desc: 'The most searched and most bought powered pair in this whole price band, with 19,000-odd reviews behind it, which is worth knowing before you read anything else here. What you get is a 4-inch woven driver and a 0.5-inch silk dome on 42W RMS, a 52 Hz to 20 kHz range, and bass, treble and volume controls on the side panel with two RCA inputs so you can keep a turntable and a computer connected at once. What you do not get is what separates a monitor from a bookshelf speaker: no balanced input, no waveguide, no defined room correction. It sounds lovely. It is not a mixing tool.',
      desc_es: 'El par más buscado y más comprado de toda esta franja de precio, con unas 19.000 reseñas detrás, y eso conviene saberlo antes de leer nada más de esta guía. Lo que ofrece es un driver de 4 pulgadas de tejido y una cúpula de seda de 0,5 pulgadas con 42 W RMS, un rango de 52 Hz a 20 kHz y controles de graves, agudos y volumen en el panel lateral, con dos entradas RCA para tener conectados a la vez un tocadiscos y un ordenador. Lo que no ofrece es justo lo que separa un monitor de un altavoz de estantería: sin entrada balanceada, sin guía de ondas, sin corrección de sala definida. Suena muy bien. No es una herramienta de mezcla.',
      img: '',
      stores: { amazon: 'https://www.amazon.com/dp/B016P9HJIA?tag=topmusicg-20' },
      unit: 'pair',
      unit_es: 'par'
    }
  },
  {
    match: /^Mackie CR4\.5$/i,
    obj: {
      title: 'Mackie CR4.5',
      title_es: 'Mackie CR4.5',
      brand: 'Mackie',
      category: 'monitors',
      price: 129.99,
      rating: 4.5,
      reviews: 407,
      badge: 'recommended',
      desc: 'A 4.5-inch woven woofer with a silk-dome tweeter on 50W RMS of Class A/B bi-amplification, reaching down to 55 Hz, which makes it the deepest bass you can buy new for a pair under $150. The front tone knob is the interesting part: turned fully counter-clockwise it is a flat studio reference, and rotating it right gradually adds bass lift and high-end sparkle for gaming or casual listening. A separate location switch switches the voicing between desktop nearfield and bookshelf, so the same pair works at arm length or across the room.',
      desc_es: 'Woofer de 4,5 pulgadas de tejido y cúpula de seda con 50 W RMS bi-amplificados en Clase A/B, bajando hasta 55 Hz, lo que lo convierte en el grave más profundo que puedes comprar nuevo por un par por debajo de $150. La parte interesante es el knob frontal de tono: girado del todo a la izquierda es una referencia plana de estudio, y al girarlo a la derecha añade gradualmente refuerzo de graves y brillo en agudos para gaming o escucha casual. Un conmutador de ubicación aparte alterna el voicing entre escritorio y estantería, así que el mismo par sirve a la distancia del brazo o al otro lado de la habitación.',
      img: '',
      stores: { amazon: 'https://www.amazon.com/dp/B0DFZW2S9G?tag=topmusicg-20' },
      unit: 'pair',
      unit_es: 'par'
    }
  }
];

for (const n of nuevos) {
  if (products.some(p => n.match.test(p.title))) { console.log('ya existe: ' + products.find(p => n.match.test(p.title)).id); continue; }
  const id = Math.max(...products.map(p => p.id)) + 1;
  products.push(Object.assign({ id: id }, n.obj));
  console.log('creado ' + id + ' | ' + n.obj.title + ' | $' + n.obj.price);
}
fs.writeFileSync(ruta, JSON.stringify(products, null, 2), 'utf8');

const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
console.log('\nguias actuales: ' + g.length + ' | ids que chocarian: ' +
  ['best-home-studio-speakers', 'home-studio-speakers-under-150'].filter(i => g.some(x => x.id === i)).join(',') || 'ninguno');
console.log('categorias de monitores ya usadas: ' +
  [...new Set(g.filter(x => x.category === 'monitors').map(x => x.id))].join(', '));
