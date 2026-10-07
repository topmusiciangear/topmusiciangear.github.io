const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
function repN(txt, from, to, n) {
  const c = txt.split(from).length - 1;
  if (c !== n) throw new Error('found ' + c + 'x (expected ' + n + '): ' + from.slice(0, 60));
  return txt.split(from).join(to);
}
let g = fs.readFileSync(DIR + 'data/guides.json', 'utf8');
g = repN(g, '"MXR Clone Looper"', '"MXR M303 Clone Looper"', 4);
g = repN(g, 'Mini Box: Clone Looper', 'Mini Box: MXR M303 Clone Looper', 1);
g = repN(g, 'caja mini: Clone Looper', 'caja mini: MXR M303 Clone Looper', 1);
g = repN(g, 'Infinity 2 and Clone Looper scale up', 'Infinity 2 and MXR M303 Clone Looper scale up', 1);
g = repN(g, 'el Infinity 2 y el Clone Looper escalan', 'el Infinity 2 y el MXR M303 Clone Looper escalan', 1);
fs.writeFileSync(DIR + 'data/guides.json', g);
console.log('guides.json renamed');
let p = fs.readFileSync(DIR + 'data/products.json', 'utf8');
p = repN(p, '"MXR Clone Looper"', '"MXR M303 Clone Looper"', 2);
fs.writeFileSync(DIR + 'data/products.json', p);
console.log('products.json renamed');
