// Reverb nunca abre directo (marketplace): las 4 /item/ pasan a marketplace?query=
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const p = JSON.parse(fs.readFileSync(F, 'utf8'));

const CAMBIOS = {
  163: 'https://reverb.com/marketplace?query=Sire%20Marcus%20Miller%20V5',
  449: 'https://reverb.com/marketplace?query=Walrus%20Audio%20Canvas%20Mono',
  222: 'https://reverb.com/marketplace?query=ATC%20SCM25A',
  331: 'https://reverb.com/marketplace?query=Genelec%208351B'
};
Object.entries(CAMBIOS).forEach(([id, url]) => {
  const x = p.find(y => y.id === Number(id));
  console.log(id + '  ' + x.title.slice(0, 50));
  console.log('   antes : ' + x.stores.reverb.slice(0, 100));
  x.stores.reverb = url;
  console.log('   ahora : ' + url);
});
fs.writeFileSync(F, JSON.stringify(p, null, 2) + '\n', 'utf8');
const raw = fs.readFileSync(F, 'utf8');
console.log('\n/item/ en stores.reverb: ' + (raw.match(/reverb\.com\/item\//g) || []).length + ' (debe ser 0)');
console.log('mojibake: ' + (raw.match(/â‚¬|Â£|Â°/g) || []).length);
