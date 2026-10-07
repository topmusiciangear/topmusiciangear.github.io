const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
function repN(txt, from, to, n) {
  const c = txt.split(from).length - 1;
  if (c !== n) throw new Error('found ' + c + 'x (expected ' + n + '): ' + from.slice(0, 60));
  return txt.split(from).join(to);
}
let g = fs.readFileSync(DIR + 'data/guides.json', 'utf8');
g = repN(g, '"MXR Carbon Copy"', '"MXR M169 Carbon Copy"', 4);
g = repN(g, 'Three Knobs: Carbon Copy', 'Three Knobs: MXR M169 Carbon Copy', 1);
g = repN(g, 'tres mandos: Carbon Copy', 'tres mandos: MXR M169 Carbon Copy', 1);
g = repN(g, 'the Carbon Copy stays an analog classic', 'the MXR M169 Carbon Copy stays an analog classic', 1);
g = rep1 = repN(g, 'el Carbon Copy sigue cl\u00e1sico', 'el MXR M169 Carbon Copy sigue cl\u00e1sico', 1);
g = repN(g, 'analog purists get the MXR Carbon Copy,', 'analog purists get the MXR M169 Carbon Copy,', 1);
g = repN(g, 'los puristas anal\u00f3gicos tienen el MXR Carbon Copy,', 'los puristas anal\u00f3gicos tienen el MXR M169 Carbon Copy,', 1);
fs.writeFileSync(DIR + 'data/guides.json', g);
console.log('guides.json renamed');
let p = fs.readFileSync(DIR + 'data/products.json', 'utf8');
p = repN(p, '"MXR Carbon Copy"', '"MXR M169 Carbon Copy"', 2);
fs.writeFileSync(DIR + 'data/products.json', p);
console.log('products.json renamed');
