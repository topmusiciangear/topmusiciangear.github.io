const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

console.log('description_es actual:\n  ' + guia.description_es);
console.log('\nintro EN parrafo 2:\n  ' + (guia.intro.split('</p>')[1] || '').replace(/\s+/g, ' ').slice(0, 300));
console.log('\nintro ES parrafo 2:\n  ' + (guia.intro_es.split('</p>')[1] || '').replace(/\s+/g, ' ').slice(0, 300));

// donde queda $605 y $925
const json = JSON.stringify(guia, null, 1);
['\\$605', '\\$925'].forEach(p => {
  const re = new RegExp(p, 'g');
  let m;
  while ((m = re.exec(json)) !== null) {
    console.log('\n>>> ' + m[0] + ': ...' + json.slice(Math.max(0, m.index - 150), m.index + 150).replace(/\s+/g, ' ') + '...');
  }
});
