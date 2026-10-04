const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
// verdicts with <4 pros or <4 cons
console.log('=== VEREDICTOS CORTOS ===');
G.forEach(g => {
  (g.verdictProsCons || []).forEach(v => {
    const np = (v.pros || []).length, nc = (v.cons || []).length;
    if (np < 4 || nc < 4) console.log(g.id + ' | ' + v.name + ' pros=' + np + ' cons=' + nc);
  });
});
// links: relatedGuides + conclusion links
console.log('=== LINKS ===');
G.forEach(g => {
  const rel = (g.relatedGuides || []).length;
  const conclLinks = ((g.conclusion || '').match(/href="/g) || []).length + ((g.conclusion_es || '').match(/href="/g) || []).length;
  if (!rel || !conclLinks) console.log(g.id, 'related=' + rel, 'conclLinks=' + conclLinks);
});