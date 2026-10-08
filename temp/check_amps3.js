const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const d = g.find(x => x.id === 'guitar-bass-amps');
console.log('VERDICT:', d.verdict);
console.log('---');
console.log('VERDICT_ES:', d.verdict_es);
console.log('---');
console.log('CONCLUSION:', d.conclusion);
console.log('---');
console.log('CONCLUSION_ES:', d.conclusion_es);
