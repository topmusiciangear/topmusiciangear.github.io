const fs = require('fs');
const s = fs.readFileSync('guides/best-nylon-guitars-for-beginners_es.html', 'utf8');
const idxs = [];
let i = -1;
while ((i = s.indexOf('ipinfo.io', i + 1)) > 0) idxs.push(i);
console.log('ipinfo occurrences:', idxs);
console.log('geoSwap fn:', s.indexOf('function tmgGeoSwap'));
console.log('scripts total:', (s.match(/<script/g) || []).length);
// print the script tag containing tmgGeoSwap
const fn = s.indexOf('function tmgGeoSwap');
const open = s.lastIndexOf('<script', fn);
const close = s.indexOf('</script>', fn);
console.log('script tag range', open, close, 'len', close - open);
console.log(s.slice(open, open + 600));
