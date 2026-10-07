const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
function repN(txt, from, to, n) {
  const c = txt.split(from).length - 1;
  if (c !== n) throw new Error('found ' + c + 'x (expected ' + n + '): ' + from.slice(0, 60));
  return txt.split(from).join(to);
}
// guides.json (overdrive guide only occurrences)
let g = fs.readFileSync(DIR + 'data/guides.json', 'utf8');
g = repN(g, '"MXR Distortion+"', '"MXR M104 Distortion+"', 4);
g = repN(g, 'Two Knobs of 70s Crunch: Distortion+', 'Two Knobs of 70s Crunch: MXR M104 Distortion+', 1);
g = repN(g, 'Dos mandos de crunch 70s: Distortion+', 'Dos mandos de crunch 70s: MXR M104 Distortion+', 1);
g = repN(g, 'the yellow Distortion+ has delivered', 'the yellow M104 Distortion+ has delivered', 1);
g = repN(g, 'el Distortion+ amarillo lleva', 'el M104 Distortion+ amarillo lleva', 1);
g = repN(g, 'the Morning Glory stays transparent, the Distortion+ nails', 'the Morning Glory stays transparent, the M104 Distortion+ nails', 1);
g = repN(g, 'el Morning Glory se mantiene transparente, el Distortion+ clava', 'el Morning Glory se mantiene transparente, el M104 Distortion+ clava', 1);
g = repN(g, 'Morning Glory, Distortion+ and BD-2W add', 'Morning Glory, M104 Distortion+ and BD-2W add', 1);
g = repN(g, 'el Morning Glory, el Distortion+ y el BD-2W a', 'el Morning Glory, el M104 Distortion+ y el BD-2W a', 1);
fs.writeFileSync(DIR + 'data/guides.json', g);
console.log('guides.json renamed');
// products.json
let p = fs.readFileSync(DIR + 'data/products.json', 'utf8');
p = repN(p, '"MXR Distortion+"', '"MXR M104 Distortion+"', 2);
fs.writeFileSync(DIR + 'data/products.json', p);
console.log('products.json renamed');
