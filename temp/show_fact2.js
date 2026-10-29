const p = require('../data/products.json');
function show(id){ const prod = p.find(x=>x.id===id); if(!prod){console.log('no');return;} console.log('===',id,' ',prod.title); console.log(JSON.stringify(prod.facts,null,2)); }
[13,110,648].forEach(show);
