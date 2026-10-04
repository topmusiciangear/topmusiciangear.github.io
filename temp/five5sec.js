const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'best-5-string-basses');
g.sections.forEach((s, i) => console.log(i + ': ' + s.heading + ' / ' + s.heading_es));