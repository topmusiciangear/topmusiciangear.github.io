const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'guitar-bass-amps');
const s = d.sections.find(x => x.heading === 'Bass Amps: What You Actually Need');
console.log('EN:', s.content);
console.log('ES:', s.content_es);
