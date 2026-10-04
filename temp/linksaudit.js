const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
['portable-interfaces','budget-headphones','acoustic-guitars-guide','best-ribbon-mics','best-in-ear-monitors','best-bass-home-office','best-5-string-basses'].forEach(id => {
  const g = G.find(x => x.id === id);
  console.log('=== ' + id + ' related=' + JSON.stringify(g.relatedGuides));
  const rel = (g.relatedGuides || []).slice(0, 3).map(rid => {
    const t = G.find(x => x.id === rid);
    return rid + ' => ' + (t ? (t.titleTag || t.title) + ' / ' + (t.titleTag_es || t.title_es) : 'MISSING');
  });
  rel.forEach(r => console.log('  ' + r));
  console.log('  concl tail EN: ' + JSON.stringify((g.conclusion || '').slice(-120)));
  console.log('  concl tail ES: ' + JSON.stringify((g.conclusion_es || '').slice(-120)));
});