const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = guides.find(x => x.id === 'best-audio-repair-plugins');
console.log(g.conclusion_es.slice(-700));
