const fs = require('fs');

const IMG = {
  565: 'https://r2.gear4music.com/media/84/845938/1200/preview.jpg',
  566: 'https://cdn.korg.com/us/products/upload/a64032eac1b6cba890de78e8a4d782af_pc.jpg',
  567: 'https://r2.gear4music.com/media/139/1392781/1200/preview_1.jpg',
  568: 'https://m.media-amazon.com/images/I/71Ny0MZLp5L._AC_SL1500_.jpg',
  569: 'https://r2.gear4music.com/media/46/468553/1200/preview_2.jpg',
  570: 'https://r2.gear4music.com/media/108/1089098/1200/preview.jpg',
  571: 'https://r2.gear4music.com/media/70/705149/1200/preview.jpg',
  572: 'https://r2.gear4music.com/media/64/643027/1200/preview.jpg'
};

const STORES = {
  565: {
    amazon: 'https://www.amazon.com/s?k=Roland+RP107&tag=topmusicg-20',
    gear4music: 'https://www.gear4music.com/Keyboards-and-Pianos/Roland-RP107-Digital-Piano/50G2'
  },
  566: {
    amazon: 'https://www.amazon.com/dp/B07ZWK54KB'
  },
  567: {
    amazon: 'https://www.amazon.com/s?k=Yamaha+YDP-166&tag=topmusicg-20',
    gear4music: 'https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YDP-166-Digital-Piano-Black/86RE'
  },
  568: {
    amazon: 'https://www.amazon.com/dp/B0937L2JGW'
  },
  569: {
    amazon: 'https://www.amazon.com/s?k=Roland+HP704&tag=topmusicg-20',
    gear4music: 'https://www.gear4music.com/Keyboards-and-Pianos/Roland-HP704-Digital-Piano-Charcoal-Black/2Y1K'
  },
  570: {
    amazon: 'https://www.amazon.com/s?k=Yamaha+CLP-835&tag=topmusicg-20',
    gear4music: 'https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-CLP-835-Digital-Piano-Satin-Black/6GTG'
  },
  571: {
    amazon: 'https://www.amazon.com/s?k=Casio+PX-S1100&tag=topmusicg-20',
    gear4music: 'https://www.gear4music.ie/Keyboards-and-Pianos/Casio-PX-S1100-Digital-Piano-Black/42WH'
  },
  572: {
    amazon: 'https://www.amazon.com/s?k=Roland+FP-10&tag=topmusicg-20',
    gear4music: 'https://www.gear4music.com/Keyboards-and-Pianos/Roland-FP-10-Digital-Piano-Black/2U9X'
  }
};

const DESC = {
  567: {
    desc: 'Home console digital piano with GrandTouch-E action (escapement, synthetic ebony and ivory keytops), CFX concert grand sample with VRM Lite, 192-note polyphony, and Bluetooth audio/MIDI. The classic living-room choice for serious home practice.',
    desc_es: 'Piano digital de mueble para el hogar con acción GrandTouch-E (escape y tapas sintéticas de marfil y ébano), muestra del gran concierto CFX con VRM Lite, polifonía de 192 notas y Bluetooth audio/MIDI. La opción clásica para el salón de quien practica en serio en casa.'
  }
};

const file = 'data/products.json';
const products = JSON.parse(fs.readFileSync(file, 'utf8'));
const before = JSON.stringify(products);
let changed = 0;
products.forEach(p => {
  if (IMG[p.id]) { p.img = IMG[p.id]; }
  if (STORES[p.id]) { p.stores = STORES[p.id]; }
  if (DESC[p.id]) { p.desc = DESC[p.id].desc; p.desc_es = DESC[p.id].desc_es; }
  changed++;
});
fs.writeFileSync(file, JSON.stringify(products, null, 2) + '\n');
console.log('patched ids:', Object.keys(IMG).join(','));
console.log('changed file:', before !== JSON.stringify(products));
