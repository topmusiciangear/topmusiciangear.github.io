const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json', 'utf8'));
function get(obj, path) {
  return path.replace(/\[(\d+)\]/g, '.$1').split('.').reduce((o, p) => o == null ? o : o[p], obj);
}
function show(id, field) {
  const g = data.find(x => x.id === id);
  console.log('--- ' + id + ' .' + field + ' ---');
  console.log(JSON.stringify(get(g, field)));
  console.log();
}
show('best-ribbon-mics', 'sections[2].content');
show('best-ribbon-mics', 'sections[2].content_es');
show('tracking-headphones', 'conclusion');
show('best-amp-modelers', 'sections[2].content');
show('best-amp-modelers', 'sections[2].content_es');
show('zlx-vs-k12', 'featuredSnippet.text_en');