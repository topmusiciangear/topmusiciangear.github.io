const fs = require('fs');

// ---- products.json ----
const STORES = {
  565: {
    zzounds: 'https://www.zzounds.com/item--ROLRP10',
    gear4music: 'https://www.gear4music.com/Keyboards-and-Pianos/Roland-RP107-Digital-Piano/50G2',
    andertons: 'https://www.andertons.co.uk/roland-RP107-digital-piano/',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Roland-RP107-BKX/art-EPI0001241-000'
  },
  566: {
    amazon: 'https://www.amazon.com/s?k=Korg+B2SP&tag=topmusicg-20'
  },
  567: {
    zzounds: 'https://www.zzounds.com/item--YAMYDP166',
    gear4music: 'https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YDP-166-Digital-Piano-Black/86RE',
    andertons: 'https://www.andertons.co.uk/yamaha-ydp-166-digital-home-piano-in-black/'
  },
  568: {
    amazon: 'https://www.amazon.com/dp/B0937L2JGW',
    zzounds: 'https://www.zzounds.com/item--KAWKDP120B'
  },
  569: {
    gear4music: 'https://www.gear4music.com/Keyboards-and-Pianos/Roland-HP704-Digital-Piano-Charcoal-Black/2Y1K',
    andertons: 'https://www.andertons.co.uk/roland-hp704-digital-piano-in-charcoal-black/',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Roland-HP704-CH/art-EPI0001059-000'
  },
  570: {
    gear4music: 'https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-CLP-835-Digital-Piano-Satin-Black/6GTG',
    andertons: 'https://www.andertons.co.uk/yamaha-clavinova-clp835b-home-piano-in-black/'
  },
  571: {
    zzounds: 'https://www.zzounds.com/item--CASPXS1100',
    gear4music: 'https://www.gear4music.ie/Keyboards-and-Pianos/Casio-PX-S1100-Digital-Piano-Black/42WH',
    andertons: 'https://www.andertons.co.uk/casio-privia-px-s1100bkc5-ultra-slim-compact-stage-piano-in-black/',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Casio-Privia-PX-S1100-BK/art-KEY0005519-000'
  },
  572: {
    zzounds: 'https://www.zzounds.com/item--ROLFP10',
    gear4music: 'https://www.gear4music.com/Keyboards-and-Pianos/Roland-FP-10-Digital-Piano-Black/2U9X',
    andertons: 'https://www.andertons.co.uk/roland-fp10-portable-digital-piano-black/',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Roland-FP-10-BK/art-KEY0004982-000'
  }
};

// canonical USD street price (verified US retailers)
const PRICES = {
  140: 749.99, 141: 699.99,
  565: 1319.99, 566: 649.99, 567: 1749.99, 568: 1499,
  569: 3099.99, 570: 3299.99, 571: 599, 572: 499.99
};

const DESC = {
  565: {
    desc: 'Entry-level console digital piano with PHA-4 Standard action, SuperNATURAL piano sound, built-in three-pedal unit, and Bluetooth audio/MIDI. The usual first choice for beginners and students who want a furniture-style instrument.',
    desc_es: 'Piano digital de mueble de entrada con acción PHA-4 Standard, sonido SuperNATURAL, pedalera triple integrada y Bluetooth audio/MIDI. La primera opción habitual de principiantes y estudiantes que quieren un instrumento tipo mueble.'
  },
  566: {
    desc: 'Budget console digital piano with Natural Weighted Hammer Action (NH), 12 sounds including German and Italian pianos, built-in three-pedal unit, and partner mode for lessons. Stand and pedal board included.',
    desc_es: 'Piano digital de mueble económico con acción Natural Weighted Hammer Action (NH), 12 sonidos incluyendo pianos alemán e italiano, pedalera triple integrada y modo partner para clases. Incluye mueble y pedalera.'
  },
  570: {
    desc: 'Premium Clavinova with GrandTouch-S action, Grand Expression Modeling sound engine, Grand Acoustic Imaging speaker system, Bluetooth audio/MIDI, and taller cabinet simulating an upright piano. The Clavinova pick for demanding home players.',
    desc_es: 'Clavinova premium con acción GrandTouch-S, motor de sonido Grand Expression Modeling, sistema de altavoces Grand Acoustic Imaging, Bluetooth audio/MIDI y mueble más alto simulando un piano vertical. La Clavinova para pianistas exigentes en casa.'
  }
};

const pFile = 'data/products.json';
const products = JSON.parse(fs.readFileSync(pFile, 'utf8'));
products.forEach(p => {
  if (STORES[p.id]) p.stores = Object.assign({}, p.stores, STORES[p.id]);
  if (PRICES[p.id] !== undefined) p.price = PRICES[p.id];
  if (DESC[p.id]) { p.desc = DESC[p.id].desc; p.desc_es = DESC[p.id].desc_es; }
});
fs.writeFileSync(pFile, JSON.stringify(products, null, 2) + '\n');

// ---- guides.json: guide 83 Price row (US street, cents) ----
const PRICE_ROW = ['$599.00', '$499.99', '$749.99', '$699.99', '$1,319.99', '$1,499.00', '$1,749.99', '$3,299.99'];
const gFile = 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const gd = guides.find(x => x.id === 'best-digital-pianos');
const row = gd.productTable.rows.find(r => (typeof r === 'string' ? r : r.label) === 'Price');
if (!row) throw new Error('Price row not found');
if (row.values.length !== PRICE_ROW.length) throw new Error('Price row length mismatch: ' + row.values.length);
row.values.forEach((v, i) => { v.value = PRICE_ROW[i]; v.value_es = PRICE_ROW[i]; });
fs.writeFileSync(gFile, JSON.stringify(guides, null, 2) + '\n');

console.log('products.json + guides.json patched');
console.log('price row ->', row.values.map(v => v.value).join(', '));
