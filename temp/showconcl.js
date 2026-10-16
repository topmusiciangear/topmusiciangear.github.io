const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const v = guides.find(x => x.id === 'vocal-plugins');
console.log(JSON.stringify(v.conclusion));
