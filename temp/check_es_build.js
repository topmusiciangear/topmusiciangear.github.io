const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const IDS = [105,106,108,109,152,153,154,493,494,495,626];
console.log('=== title / title_es en products.json ===');
list.filter(x=>IDS.includes(x.id)).forEach(p=>{
  console.log('id ' + p.id + '\n  EN: ' + p.title + '\n  ES: ' + (p.title_es || '(NINGUNO)'));
});
const f = BASE + 'guides/active-vs-passive-pa_es.html';
if (fs.existsSync(f)) {
  const d = fs.readFileSync(f,'utf8');
  const cards=[...new Set([...d.matchAll(/guide-product-card-title[^>]*>([\s\S]*?)<\/h3>/g)].map(m=>m[1].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()))];
  console.log('\n=== tarjetas en active-vs-passive-pa_es.html (local) ===');
  cards.forEach(c=>console.log('  '+c));
} else {
  console.log('\n' + f + ' no existe');
}