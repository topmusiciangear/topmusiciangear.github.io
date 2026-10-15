const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const p = list.find(x=>x.id===609);
console.log('=== M20x completo ===');
console.log(JSON.stringify(p, null, 2));

// precios TEST_SHOP_BTN para 609
const bs = fs.readFileSync(BASE+'build-guides.js','utf8');
const re = /\n\s*609:\s*\{[\s\S]*?\n\s*\},/;
const m = bs.match(re);
console.log('\n=== TEST_SHOP_BTN id 609 ===');
console.log(m ? m[0] : 'NO HAY ENTRADA (sin precios por tienda)');

// como esta el M40x (id 198) que si aparece en guias
const m40 = list.find(x=>x.id===198);
console.log('\n=== M40x para comparar ===');
console.log('price: $' + m40.price);
console.log('img: ' + m40.img);
console.log('desc: ' + m40.desc);

// guias donde aparece el M40x con veredicto
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
guides.forEach(g=>{
  const v = (g.verdictProsCons||[]).find(x=>x && /M40x/.test(x.name||''));
  if (v) {
    console.log('\n=== veredicto M40x en ' + g.id + ' ===');
    console.log('pros (' + v.pros.length + '):'); v.pros.forEach(x=>console.log('  - ' + x));
    console.log('cons (' + v.cons.length + '):'); v.cons.forEach(x=>console.log('  - ' + x));
    if (v.pros_es) { console.log('pros_es (' + v.pros_es.length + '):'); v.pros_es.forEach(x=>console.log('  - ' + x)); }
    if (v.cons_es) { console.log('cons_es (' + v.cons_es.length + '):'); v.cons_es.forEach(x=>console.log('  - ' + x)); }
  }
});