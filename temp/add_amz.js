const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const add = (id, url) => {
  const p = P.find(x => x.id === id);
  if (!p) { console.log('ID FALTA: ' + id); return; }
  if (p.stores.amazon) { console.log(id + ' ya tiene amazon, skip'); return; }
  p.stores.amazon = url;
  console.log('ok ' + id);
};
add(533, 'https://www.amazon.com/Fender-Player-Mustang-Rosewood-Fingerboard/dp/B0D2LQY6PS');
add(538, 'https://www.amazon.com/Ibanez-String-Guitar-Handed-GSR205BWNF/dp/B00HWIRU1A');
add(539, 'https://www.amazon.com/Sterling-Music-Man-StingRay-5-String/dp/B07BBWRZSK');
add(540, 'https://www.amazon.com/Yamaha-TRBX305-BL-5-String-Electric/dp/B00GEC02FG');
add(541, 'https://www.amazon.com/Fender-Affinity-fingerboard-3-Color-Sunburst/dp/B091BH8F34');
add(544, 'https://www.amazon.com/Ibanez-SR505E-5-String-Brown-Mahogany/dp/B07MLJL7CZ');
add(545, 'https://www.amazon.com/Squier-Fender-Classic-Vibe-Jazz/dp/B07N29M92D');
add(546, 'https://www.amazon.com/Fender-American-Professional-5-String-Fretboard/dp/B08L331Q8G');
add(547, 'https://www.amazon.com/Ernie-Ball-Music-Man-StingRay/dp/B0CSKD5KGL');
add(548, 'https://www.amazon.com/Ibanez-EHB1005MS-Ergonomic-Headless-Multiscale/dp/B083QV2CZQ');
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('done');
