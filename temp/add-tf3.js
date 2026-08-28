const fs = require('fs');
const p = JSON.parse(fs.readFileSync('data/products.json','utf8'));

if (!p.find(x => x.id === 418)) {
  p.push({
    id: 418,
    title: 'Yamaha TF3',
    title_es: 'Yamaha TF3',
    price: '$2,999',
    image: 'https://media.sweetwater.com/m/products/image/d41fa3bc4fIiJLUaE9FGJzYcDV2lGKMlnmWjz5uc.jpg?quality=82&width=215&ha=d41fa3bc4f3d9779',
    category: 'studio',
    tags: ['digital mixer', '24-channel', 'yamaha', 'easy use'],
    desc: '24-channel digital mixer with 24 D-Pre mic preamps, 25 motorized faders, TouchFlow Operation touchscreen, 1-knob compression/EQ, and built-in Wi-Fi for iPad control.',
    desc_es: 'Mezcladora digital de 24 canales con 24 preamplificadores D-Pre, 25 faders motorizados, pantalla tactil TouchFlow Operation, compresion/EQ de 1 perilla y Wi-Fi integrado para control via iPad.',
    stores: {
      amazon: 'https://www.amazon.com/Yamaha-TF3-Digital-Mixer/dp/B00WWCFDV0',
      zzounds: '',
      reverb: 'https://reverb.com/marketplace?query=yamaha+tf3',
      andertons: '',
      gear4music: '',
      musicstore: ''
    },
    priceGBP: '£3,444',
    priceUSD: '$2,999'
  });
  console.log('Added Yamaha TF3 (ID 418)');
} else {
  console.log('TF3 already exists');
}

fs.writeFileSync('data/products.json', JSON.stringify(p, null, 2), 'utf8');
console.log('Total products:', p.length);
