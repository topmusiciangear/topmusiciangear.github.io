const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

console.log('=== GUIAS EXISTENTES (posible solapamiento) ===');
const terms = ['synth','piano','keyboard','guitar','repair','noise','amp ','midi','theory',
  'scaler','serum','diva','pigments','phase plant','avenger','massive x',
  'keyscape','kontakt','addictive','pianoteq','amplifube','bias fx','soothe','deess',
  'restoration','de-reverb','unveil','chameleon','plugin','mixing','mastering','fx'];
g.forEach(guide => {
  const t = (guide.title || '').toLowerCase();
  if (terms.some(x => t.includes(x))) {
    console.log(guide.id.padEnd(35) + ' | ' + (guide.category || '').padEnd(12) + ' | ' + guide.title);
  }
});

console.log('\n=== PRODUCTOS YA EN CATALOGO ===');
const search = ['pigments','diva','phase plant','avenger','serum','massive x',
  'scaler','captain','loop engine','playbeat','orb producer','pitchmap',
  'keyscape','kontakt','v collection','addictive keys','pianoteq','augmented piano',
  'amplifube','bias fx','sound city','th-u','amp room','rockrack',
  'rx','soothe','smart:deess','restoration','chameleon','unveil'];
p.forEach(prod => {
  const name = (prod.name || '').toLowerCase();
  if (search.some(t => name.includes(t))) {
    console.log(String(prod.id).padEnd(4) + ' | ' + (prod.brand || '').padEnd(20) + ' | ' + prod.name.padEnd(40) + ' | $' + prod.price + ' | stores: ' + Object.keys(prod.stores || {}).join(','));
  }
});
