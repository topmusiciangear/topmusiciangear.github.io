const fs=require('fs');
const g=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const gs=g.find(x=>x.id==='budget-mics');
console.log('title:', gs.title);
console.log('title_es:', gs.title_es);
console.log('featuredProducts:', JSON.stringify(gs.featuredProducts));
console.log('featuredProducts count:', gs.featuredProducts?gs.featuredProducts.length:'n/a');
// check sections product counts
const prods=new Set(gs.featuredProducts||[]);
for(const s of gs.sections||[]){} 
console.log('desc:', gs.description);
console.log('title_es has "9":', gs.title_es.includes('9'));
