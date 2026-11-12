const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-beginner-electric-guitar');
console.log('Secciones:');
guide.sections.forEach((s, i) => {
  console.log(i + ': ' + s.heading);
  if (s.content_es) {
    const links = s.content_es.match(/href=["\']([^"\']+)["\']/g);
    if (links) links.forEach(l => console.log('   ES link: ' + l));
  }
  if (s.content) {
    const links = s.content.match(/href=["\']([^"\']+)["\']/g);
    if (links) links.forEach(l => console.log('   EN link: ' + l));
  }
});
