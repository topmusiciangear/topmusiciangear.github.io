const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const newProd={
  id:1055,
  title:'sE Electronics X1 S',
  title_es:'sE Electronics X1 S',
  brand:'sE Electronics',
  category:'microphones',
  price:249,
  badge:'budget',
  desc:'Hand-crafted 1" true condenser capsule with gold-sputtered diaphragm, cardioid pattern, 20 Hz-20 kHz frequency response, 30 mV/Pa sensitivity, max SPL up to 160 dB with pads. Switchable 80/160 Hz low-cut filters and -10/-20 dB pads. All-metal housing, 9 dB self-noise. Versatile for vocals, acoustic instruments and home studio recording.',
  desc_es:'Cápsula de condensador de 1" artesanal con diafragma plateado en oro, patrón cardioide, respuesta 20 Hz-20 kHz, sensibilidad 30 mV/Pa, SPL máximo hasta 160 dB con pads. Filtros low-cut 80/160 Hz conmutables y pads -10/-20 dB. Caja metálica, ruido propio 9 dB. Versátil para voces, instrumentos acústicos y estudio en casa.',
  img:'img/products/2ae1c84e5a.webp',
  stores:{
    gear4music:'https://www.gear4music.com/Recording-and-Computers/sE-Electronics-X1-S-Large-Diaphragm-Condenser-Microphone/1XCQ',
    amazon:'https://www.amazon.com/dp/B06Y3VXTXT',
    zzounds:'https://www.zzounds.com/item--SEEX1S'
  },
  score:8.8,
  bestFor:{en:'Home studio vocals', es:'Voces de estudio en casa'}
};
data.push(newProd);
fs.writeFileSync('data/products.json', JSON.stringify(data,null,2));
console.log('added');