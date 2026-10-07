const fs = require('fs');
const G = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'guitar-pedals');
console.log('### SECTIONS');
g.sections.forEach((s, i) => {
  console.log('\n[' + i + '] ' + s.heading + ' / ' + s.heading_es + ' prods=' + JSON.stringify(s.products));
  console.log('EN: ' + s.content);
  console.log('ES: ' + s.content_es);
});
console.log('\n### VERDICT: ' + g.verdict);
console.log('\n### VERDICT_ES: ' + g.verdict_es);
console.log('\n### CONCLUSION: ' + g.conclusion);
console.log('\n### CONCLUSION_ES: ' + g.conclusion_es);
const f = g.featuredSnippet;
Object.keys(f).filter(k => /^faq_/.test(k)).forEach(k => console.log(k + ': ' + f[k]));
console.log('\n### VERDICTS');
g.verdictProsCons.forEach(v => {
  console.log('\n## ' + v.name);
  console.log('P:' + JSON.stringify(v.pros) + '\nC:' + JSON.stringify(v.cons));
  console.log('PE:' + JSON.stringify(v.pros_es) + '\nCE:' + JSON.stringify(v.cons_es));
});
