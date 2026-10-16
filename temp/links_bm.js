const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-monitors');
const t = JSON.stringify(s);
const todos = [...t.matchAll(/<a[^>]*href="(\/guides\/[^"]+)"[^>]*>([^<]{0,80})/g)];
console.log('links en best-monitors: ' + todos.length);
[...new Set(todos.map(m => m[1] + '  ::  ' + m[2]))].forEach(x => {
  const id = x.split('  ::  ')[0].replace('/guides/', '').replace('_es.html', '').replace('.html', '');
  const dest = g.find(y => y.id === id);
  console.log('  ' + id + '  texto: "' + x.split('  ::  ')[1] + '"  | titulo: "' + (dest ? dest.title_es : 'NO EXISTE') + '"');
});
