// Replace orphan unverified 519-526 with verified Spaced Out 527.
const fs = require('fs');
let P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const before = P.length;
P = P.filter(p => p.id < 519 || p.id > 526);
console.log('removed:', before - P.length);
P.push({
  id: 527,
  title: 'Baby Audio Spaced Out',
  title_es: 'Baby Audio Spaced Out',
  brand: 'Baby Audio',
  category: 'plugins',
  price: 99,
  rating: 4.8,
  desc: 'Generative delay + reverb wet-FX powerhouse inspired by the Roland Space Echo. 16-step Echo sequencer (Straight/2x/Dotted/Triplet, Clean/LoFi/Hazy/Wonky Tape) plus crystalline Space reverb (Vacuum/Small/Medium/Outer Space, Lush/Trippy/Alien/Cosmic) with X-Y mixer, Generate dice, Ducker + Sync and Lift-Off glue. 125 presets, 50+ effects, zero sub-menus. VST/VST3/AU/AAX.',
  desc_es: 'Potencia wet-FX de delay + reverb generativo inspirada en el Roland Space Echo. Secuenciador Echo de 16 pasos (Straight/2x/Dotted/Triplet, Clean/LoFi/Hazy/Wonky Tape) más reverb cristalina Space (Vacuum/Small/Medium/Outer Space, Lush/Trippy/Alien/Cosmic) con mezclador X-Y, dado Generate, Ducker + Sync y pegamento Lift-Off. 125 presets, 50+ efectos, cero submenús. VST/VST3/AU/AAX.',
  img: 'https://cdn.prod.website-files.com/687ee2fa7f073e59ed93f259/689d0fb20d2c5df5bf5b5a10_*spaced%20out-p-1600.png',
  stores: {
    pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/17-Reverb/7185-Spaced-Out'
  }
});
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('Max ID:', Math.max(...P.map(p => p.id)), '| total:', P.length);
