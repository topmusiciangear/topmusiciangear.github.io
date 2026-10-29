const p = require('../data/products.json');
function show(id){ const prod = p.find(x=>x.id===id); if(!prod){console.log('no');return;} const f = prod.facts.find(x=>x.label.en==='Type'); if(!f){console.log('no fact')} else console.log(id, prod.title, 'icon', f.icon, 'value', f.value); }
[23,71,96,33,29,6,13,110,648,170].forEach(show);
