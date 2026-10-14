const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8')).find(x => x.id === 'best-microphone');
console.log('=== INTRO ==='); console.log(g.intro);
console.log('\n=== INTRO_ES ==='); console.log(g.intro_es);
console.log('\n=== CONCLUSION ==='); console.log(g.conclusion);
console.log('\n=== CONCLUSION_ES ==='); console.log(g.conclusion_es);
console.log('\n=== featuredSnippet keys ==='); console.log(Object.keys(g.featuredSnippet || {}));
// Secciones a eliminar: contenido para ver si hay texto reutilizable
['Shure SM58: A Closer Look', 'Shure MV7+: A Closer Look', 'Audio-Technica AT2020USB-X: A Closer Look', 'Royer R-121: A Closer Look'].forEach(h => {
  const s = (g.sections || []).find(x => x && x.heading === h);
  console.log('\n=== SEC ' + h + ' products=' + JSON.stringify(s ? s.products : null) + ' ===');
});
// Overviews que mencionan salientes
console.log('\n=== OVERVIEW Dynamic [1,50,3,194,196,321] ===');
let s0 = (g.sections || []).find(x => x && JSON.stringify(x.products) === '[1,50,3,194,196,321]');
console.log('heading:', s0.heading);
console.log('content:', s0.content.slice(0, 900));