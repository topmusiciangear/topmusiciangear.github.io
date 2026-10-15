const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const hits = g.filter(x => /rack/i.test(x.id + ' ' + (x.title || '') + ' ' + (x.title_es || '')));
hits.forEach(x => {
  console.log('id: ' + x.id);
  console.log('  title    : ' + x.title);
  console.log('  title_es : ' + x.title_es);
  console.log('  titleTag : ' + x.titleTag);
  console.log('  titleTag_es: ' + x.titleTag_es);
});
if (!hits.length) console.log('sin coincidencias');
