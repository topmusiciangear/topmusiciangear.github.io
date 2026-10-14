const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'premium-interfaces');
g.sections.forEach((s, i) => {
  console.log('[' + i + '] heading=' + JSON.stringify(s.heading) + ' | h=' + JSON.stringify(s.h) + ' | heading_es=' + JSON.stringify(s.heading_es) + ' | h_es=' + JSON.stringify(s.h_es) + ' | prods=' + JSON.stringify(s.products));
});