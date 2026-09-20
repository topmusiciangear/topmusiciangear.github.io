const fs = require('fs');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const G = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const prods = Array.isArray(P) ? P : (P.products || P.data || []);
const guides = Array.isArray(G) ? G : (G.guides || []);

function fullprod(id) {
  const x = prods.find(q => Number(q && q.id) === Number(id));
  if (!x) return null;
  return { id: x.id, title: x.title, cat: x.category, price: x.price, badge: x.badge,
    img: x.img, desc_es: !!x.desc_es, prices: x.prices, hrefs: x.hrefs };
}

console.log('=== 1) WHERE does id=182 (Apollo x16 Gen 2) and id=16 (Twin X Gen 2) appear in guides.json? ===');
for (const id of [16, 182]) {
  const dl = fullprod(id);
  console.log('\n-- target id=' + id + ' -> ' + JSON.stringify(dl && { title: dl.title, cat: dl.cat, price: dl.price, badge: dl.badge }) + ' --');
  for (const gx of guides) {
    if (!gx || !gx.id) continue;
    const mentions = [];
    const walk = (o, path) => { if(!o||typeof o!=='object')return; if(Array.isArray(o)){o.forEach((v,i)=>walk(v,path+'['+i+']'));return;} for(const k of Object.keys(o)){ if(Number(o[k])===Number(id)){ mentions.push(path+'.'+k+'='+o[k]); } walk(o[k], path+'.'+k); } };
    walk(gx, '');
    if (mentions.length) console.log('   guide=' + gx.id + ' | ' + mentions.join('  ;  '));
  }
}

console.log('\n=== 2) json.gz exists? (maybe content builds from guides.json.gz) ===');
const lc = fs.readdirSync('C:/Users/Daniel/projects/topmusiciangear/data').filter(f => /guides/.test(f));
console.log('  data/ files matching "guides": ' + lc.join(', '));
