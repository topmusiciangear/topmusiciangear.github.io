const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function show(id, n) {
  const g = G.find(x => x.id === id);
  console.log('##### ' + id + ' (' + g.sections.length + ' secs)');
  g.sections.slice(0, n).forEach((s, i) => {
    console.log('--- S' + i + ' [' + s.heading + '] prods=' + JSON.stringify(s.products));
    console.log('EN(' + s.content.length + '): ' + s.content.slice(0, 700));
    console.log('ES(' + s.content_es.length + '): ' + s.content_es.slice(0, 700));
  });
}
show('budget-monitors', 3);