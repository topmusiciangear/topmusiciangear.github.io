const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

console.log('=== donde queda "$49" ===');
const re = /\$49/g;
s.sections.forEach((sec, i) => {
  ['content', 'content_es'].forEach(k => {
    const v = sec[k] || '';
    [...v.matchAll(new RegExp('.{0,120}\\$49.{0,120}', 'g'))].forEach(m =>
      console.log('  sec[' + i + '].' + k + ': ...' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '...'));
  });
});
['intro', 'intro_es', 'description', 'description_es', 'conclusion', 'conclusion_es'].forEach(k => {
  const v = s[k] || '';
  [...v.matchAll(new RegExp('.{0,120}\\$49.{0,120}', 'g'))].forEach(m =>
    console.log('  ' + k + ': ...' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '...'));
});
if (s.featuredSnippet) {
  const j = JSON.stringify(s.featuredSnippet);
  [...j.matchAll(new RegExp('.{0,100}\\$49.{0,100}', 'g'))].forEach(m =>
    console.log('  featuredSnippet: ...' + m[0] + '...'));
}

console.log('\n=== seccion [7] · frases finales EN / ES ===');
const en = s.sections[7].content.split('</p>').pop();
const es = s.sections[7].content_es.split('</p>').pop();
console.log('  EN: ' + en.replace(/<[^>]+>/g, '').trim());
console.log('\n  ES: ' + es.replace(/<[^>]+>/g, '').trim());
