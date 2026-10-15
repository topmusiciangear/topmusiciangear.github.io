const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
[[55,3],[58,3],[62,3]].forEach(([i,j]) => {
  const g = guides[i];
  const c = g.sections[j].content;
  const m = c.match(/[^<>]*\b(?:If|if)\s+consider\b[^<>]*/);
  console.log('\n[' + g.id + ']');
  console.log('  ' + JSON.stringify(m ? m[0].trim() : 'NO'));
});
// y el defecto de enlaces pegados en [58] y [62]
console.log('\n\n=== enlaces pegados (sin separador) ===');
[[58,3],[62,3]].forEach(([i,j]) => {
  const c = guides[i].sections[j].content;
  const m = c.match(/<p>[^<]*(?:guide|guía)[^<]*<\/p>/g);
  console.log('\n[' + guides[i].id + ']');
  (m||[]).forEach(x => console.log('  ' + JSON.stringify(x.trim())));
});