const fs = require('fs');
['guides/best-monitors-for-small-rooms.html', 'guides/best-monitors-for-small-rooms_es.html'].forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  const i = h.indexOf('Rokit');
  console.log(f + ': ...' + h.slice(Math.max(0, i - 150), i + 150).replace(/\s+/g, ' '));
});
// g4m wrapped check (awin encoded)
const h = fs.readFileSync('guides/best-monitors-for-small-rooms.html', 'utf8');
console.log('awin-g4m-hs5 present: ' + h.includes('Yamaha-HS5-Active-Studio-Monitor'));
console.log('gear4music store buttons: ' + (h.split('data-store="gear4music"').length - 1));
