const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'best-5-string-basses');
console.log(JSON.stringify(g.sections[12].content_es.slice(-400)));