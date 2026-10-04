const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'beat-making');
g.sections.forEach((s, i) => {
  console.log('=== SEC' + (i + 1) + ' [' + (s.heading_es || s.heading) + '] ===');
  console.log('ES: ' + (s.content_es || '(sin ES)'));
  console.log('');
});
console.log('=== FAQ_SNIPPET ===');
const fsn = g.featuredSnippet || {};
for (let i = 1; i <= 8; i++) {
  if (fsn['faq_q' + i + '_es']) {
    console.log('Q' + i + '_ES: ' + fsn['faq_q' + i + '_es']);
    console.log('A' + i + '_ES: ' + fsn['faq_a' + i + '_es']);
    console.log('');
  }
}