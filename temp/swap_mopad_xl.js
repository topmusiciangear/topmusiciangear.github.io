// Cambia el producto 650 de Auralex MoPADs (4-Pack) a Auralex MoPAD-XL.
// Actualiza catalogo, tabla comparativa y texto de monitor-setup (EN/ES).
const fs = require('fs');

// ---------- products.json ----------
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = products.find(x => x.id === 650);
if (!p) throw new Error('no existe el producto 650');

p.title = 'Auralex MoPAD-XL Monitor Speaker Isolation Pad';
p.title_es = 'Auralex MoPAD-XL (par)';
p.price = 39.99;
p.desc = '$39.99 isolation pads sized for larger monitors: 12 x 8.75 in of high-density foam that decouples a stereo pair on the desk. Five tilt steps from -8° to +8° aim the tweeters at your ears, and each pad carries up to 100 lb (45 kg).';
p.desc_es = 'Pads de aislamiento de $39,99 pensados para monitores más grandes: espuma de alta densidad de 12 x 8,75 pulgadas que desacopla un par estéreo en la mesa. Cinco pasos de inclinación de -8° a +8° orientan los tweeters al oído y cada pad aguanta hasta 45 kg.';
p.img = 'img/products/d00aa6812b.webp';
p.stores = {
  amazon: 'https://www.amazon.com/dp/B00266HBSU',
  musicstore: 'https://www.musicstore.com/en_OE/EUR/Auralex-MoPad-XL-Speaker-Pad-Set/art-REC0011572-000'
};
p.excludeStores = ['zzounds'];

fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('products.json: 650 -> ' + p.title);

// ---------- guides.json ----------
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'monitor-setup');
if (!g) throw new Error('no existe la guia monitor-setup');

const replaceIn = (obj, key, from, to) => {
  if (typeof obj[key] !== 'string') return false;
  if (!obj[key].includes(from)) { console.log('  AVISO no encontrado en ' + key + ': ' + from.slice(0, 60)); return false; }
  obj[key] = obj[key].split(from).join(to);
  return true;
};

// tabla comparativa
const col = g.productTable.columns.find(c => /MoPAD/i.test(c.title));
col.title = 'Auralex MoPAD-XL (Pair)';
col.title_es = 'Auralex MoPAD-XL (Par)';
const idx = g.productTable.columns.indexOf(col);
for (const row of g.productTable.rows) {
  const v = row.values && row.values[idx];
  if (!v) continue;
  if (row.label === 'Best For') {
    v.value = 'Budget decoupling for larger nearfields; wider pads, 5 angles, sold as a pair';
    v.value_es = 'Desacoplo económico para nearfields más grandes; pads más anchos, 5 ángulos, se vende por pares';
  }
  if (row.label === 'Key Feature') {
    v.value = 'High-density foam, 12 x 8.75 in, -8° to +8° in 5 steps, up to 100 lb each';
    v.value_es = 'Espuma de alta densidad, 12 x 8,75 pulgadas, -8° a +8° en 5 pasos, hasta 45 kg por monitor';
  }
}

// seccion 6 (mencion de pasada)
const s6 = g.sections[6];
replaceIn(s6, 'content', 'the Auralex MoPADs (4-Pack) decouples a stereo pair for $39.99',
  'the Auralex MoPAD-XL decouples a stereo pair for $39.99');
replaceIn(s6, 'content_es', 'el Auralex MoPADs (Pack 4) desacopla un par estéreo por $39,99',
  'el Auralex MoPAD-XL desacopla un par estéreo por $39,99');

// seccion 10 (protagonista)
const s10 = g.sections[10];
s10.heading = 'Auralex MoPAD-XL: The Cheapest Upgrade in the Room';
s10.heading_es = 'Auralex MoPAD-XL: la mejora más barata de la sala';

replaceIn(s10, 'content',
  'Four high-density foam pads with five tilt steps from -8° to +8° that aim the tweeters at your ears',
  'A pair of high-density foam pads, wider than the standard MoPADs, with five tilt steps from -8° to +8° that aim the tweeters at your ears');
replaceIn(s10, 'content',
  'They fit small nearfields, so a large 8-inch or 10-inch monitor may overhang them, and the tilt range is coarse compared with a proper isolation platform. At roughly $40 for four, though',
  'They now carry monitors up to 100 lb each, but a heavy three-way or a 10-inch cabinet still gains from a proper isolation platform, and the tilt range stays coarse. At roughly $40 for the pair, though');

replaceIn(s10, 'content_es',
  'Cuatro almohadillas de espuma de alta densidad con cinco pasos de inclinación',
  'Un par de almohadillas de espuma de alta densidad, más anchas que las MoPAD estándar, con cinco pasos de inclinación');
replaceIn(s10, 'content_es',
  'Encajan con nearfields pequeños, así que un monitor grande de 8 o 10 pulgadas puede sobresalir, y el rango de inclinación es grueso comparado con una plataforma de aislamiento decente. Pero por unos 40 $ por cuatro, el retorno',
  'Ahora aguantan monitores de hasta 45 kg cada uno, pero un tres vías pesado o una caja de 10 pulgadas siguen agradeciendo una plataforma de aislamiento, y el rango de inclinación sigue siendo grueso. Pero por unos 40 $ el par, el retorno');

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('guides.json actualizado');

// ---------- comprobacion ----------
const check = fs.readFileSync('data/guides.json', 'utf8');
for (const bad of ['MoPADs (4-Pack)', 'MoPADs (Pack 4)', 'Four high-density foam pads', 'Cuatro almohadillas de espuma']) {
  console.log('restos de "' + bad + '": ' + (check.split(bad).length - 1));
}
