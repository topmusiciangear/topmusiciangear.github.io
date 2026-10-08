const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'live-sound-pa');
d.productTable.rows.forEach(r => console.log('ROW:', r.label, '|', JSON.stringify(r.values.map(v => v.value)).slice(0, 400)));
const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
[106, 153, 108].forEach(id => { const x = p.find(y => y.id === id); console.log(id, x.title, '| price:', x.price, '| img:', (x.img || '').slice(0, 80)); console.log('   stores:', JSON.stringify(x.stores).slice(0, 300)); });
