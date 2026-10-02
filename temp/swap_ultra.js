// 547: StingRay Special 5 -> Fender American Ultra II Jazz Bass V (verified).
const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });

const p = P.find(x => x.id === 547);
p.title = 'Fender American Ultra II Jazz Bass V'; p.title_es = 'Fender American Ultra II Jazz Bass V';
p.brand = 'Fender'; p.price = 2519.99;
delete p.rating; delete p.reviews;
p.desc = 'US-built 34-inch active 5-string with Ultra II Noiseless Vintage Jazz pickups and S-1 switched preamp with 3-band EQ. Select alder body, quartersawn maple Modern D neck, 10-14 inch compound board, 21 medium-jumbo frets and convertible HiMass bridge.';
p.desc_es = 'Cinco cuerdas USA activo 34" con pastillas Ultra II Noiseless Vintage Jazz y previo conmutado S-1 con EQ 3 bandas. Cuerpo aliso selecto, mástil Modern D de arce cuartos, diapasón compuesto 10-14", 21 trastes medium-jumbo y puente convertible HiMass.';
p.img = 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/31985/137030/0199121712_fen_ins_frt_1_rr-hero__80778.1757519928.jpg?c=1';
p.stores = {
  andertons: 'https://www.andertons.co.uk/fender-american-ultra-ii-jazz-bass-v-ebony-fingerboard-ultraburst/',
  zzounds: 'https://www.zzounds.com/a--925521/item--FEN0199122'
};
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));

const g = G.find(x => x.id === 'best-5-string-basses');
const ci = g.productTable.columns.findIndex(c => c.title === 'Ernie Ball Music Man StingRay Special 5');
g.productTable.columns[ci] = { title: 'Fender American Ultra II Jazz Bass V', title_es: 'Fender American Ultra II Jazz Bass V' };
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const set = (label, en, es) => { rows[label].values[ci] = V(en, es); };
set('Body', 'Select alder', 'Aliso selecto');
set('Neck', 'Quartersawn maple Modern D, 5-bolt', 'Arce cuartos Modern D, 5 tornillos');
set('Scale Length', '34 in (86.4 cm)', '34" (86,4 cm)');
set('Frets & Fretboard', '21 medium jumbo, 10-14 in compound', '21 medium jumbo, compuesto 10-14"');
set('Pickups', 'Ultra II Noiseless Vintage J', 'Ultra II Noiseless Vintage J');
set('Electronics', 'Active preamp + S-1 + 3-band EQ', 'Previo activo + S-1 + EQ 3 bandas');
set('Bridge', 'HiMass convertible', 'HiMass convertible');

const vi = g.verdictProsCons.findIndex(v => v.name === 'Ernie Ball Music Man StingRay Special 5');
g.verdictProsCons[vi] = VD('Fender American Ultra II Jazz Bass V',
  ['Flagship USA active J with S-1 active/passive switching', 'Noiseless Vintage pickups, zero hum with alnico character', 'Modern D quartersawn neck with 10-14 in compound board and Luminlay', 'Convertible HiMass bridge, £2,149 in stock at Andertons'],
  ['Street runs $2,519 and up', 'Only Andertons and zzounds verified in our stores', '21 frets against 22-24 fret rivals', 'Active mode needs a battery (passive S-1 fallback included)'],
  ['Insignia USA activo J con conmutación S-1 activo/pasivo', 'Pastillas Noiseless Vintage, cero ruido con carácter alnico', 'Mástil Modern D de cuartos con diapasón compuesto 10-14" y Luminlay', 'Puente convertible HiMass, £2.149 en stock en Andertons'],
  ['La calle es $2.519 hacia arriba', 'Solo Andertons y zzounds verificados en tiendas', '21 trastes frente a rivales de 22-24', 'El modo activo pide batería (respaldo pasivo S-1 incluido)']);

const sec = g.sections.find(s => (s.products || []).includes(547));
sec.heading = 'Fender Ultra II Jazz V: The Active Flagship';
sec.heading_es = 'Fender Ultra II Jazz V: La insignia activa';
sec.content = '<strong>Select alder, quartersawn Modern D neck and compound ebony-or-maple board with Luminlay — then a preamp that does everything.</strong> Ultra II Noiseless Vintage pickups (stacked coils over Alnico V rods) feed S-1 switched active/passive operation with 3-band EQ and switchable midrange. Convertible HiMass bridge, 21 medium-jumbo frets. $2,519 street, £2,149 in stock at Andertons.';
sec.content_es = '<strong>Aliso selecto, mástil Modern D de cuartos y diapasón compuesto ébano-o-arce con Luminlay — y un previo que lo hace todo.</strong> Pastillas Ultra II Noiseless Vintage (bobinas apiladas sobre Alnico V) alimentan operación activa/pasiva S-1 con EQ 3 bandas y medios conmutables. Puente convertible HiMass, 21 trastes medium-jumbo. $2.519 de calle, £2.149 en stock en Andertons.';

let s = JSON.stringify(g);
[['the StingRay Special 5 for funk punch', 'the Ultra II Jazz V for noiseless active versatility'],
 ['StingRay Special 5 por punch funk', 'Ultra II Jazz V por versatilidad activa sin ruido'],
 ['AmPro II Jazz V, StingRay Special 5, EHB1005MS or Dingwall Combustion', 'AmPro II Jazz V, Ultra II Jazz V, EHB1005MS or Dingwall Combustion'],
 ['AmPro II Jazz V, StingRay Special 5, EHB1005MS o Dingwall Combustion', 'AmPro II Jazz V, Ultra II Jazz V, EHB1005MS o Dingwall Combustion'],
 ['The StingRay Special 5 is the premium funk benchmark with 18V headroom.', 'The American Ultra II Jazz V is the premium active flagship with S-1 switching and noiseless pickups.'],
 ['El StingRay Special 5 es la referencia funk premium con headroom 18V.', 'El American Ultra II Jazz V es la insignia activa premium con conmutación S-1 y pastillas sin ruido.'],
 ['Eighteen-volt preamps (StingRay Special, Gen 2 Sire heritage)', 'High-headroom active preamps (18V designs, Gen 2 Sire heritage)'],
 ['Los previos de 18 voltios (StingRay Special, herencia Gen 2 de Sire)', 'Los previos activos con headroom real (diseños 18V, herencia Gen 2 de Sire)']
].forEach(([a, b]) => { s = s.split(a).join(b); });
const g2 = JSON.parse(s);
const gi = G.findIndex(x => x.id === 'best-5-string-basses');
G[gi] = g2;
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const left = JSON.stringify(G[gi]).match(/StingRay|neodymium|Neodimio/g);
console.log('restos StingRay: ' + (left ? [...new Set(left)].join(',') : 'none'));
