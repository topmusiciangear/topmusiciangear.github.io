fetch('https://r2.gear4music.com/media/83/839919/1200/preview.jpg', { method: 'HEAD' }).then(r => console.log('foto: ' + r.status + ' | ' + r.headers.get('content-type'))).catch(e => console.log('foto ERROR: ' + e.message));
const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json').find(x => x.id === 1003);
console.log('producto: ' + p.brand + ' | ' + p.title + ' | price-field=' + p.price);
console.log('stores: ' + JSON.stringify(p.stores));
fetch('https://www.andertons.co.uk/kilohearts-phase-plant-modular-synth-esd/', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }).then(async r => {
  const t = await r.text();
  console.log('Andertons: ' + r.status + ' | ' + (t.match(/<title>([^<]{0,80})/) || [])[1]);
}).catch(e => console.log('Andertons ERROR: ' + e.message));
const fs = require('fs');
const bg = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const m = bg.match(/\n1003: [^\n]+/);
console.log('TEST: ' + (m ? m[0] : 'SIN ENTRADA'));
