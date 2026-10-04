const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'active-vs-passive-pa');
console.log('EN LEN:', g.sections[2].content.length);
console.log(g.sections[2].content.slice(0, 400));
console.log('...');
const i = g.sections[2].content.indexOf('</table>');
console.log(JSON.stringify(g.sections[2].content.slice(i, i + 600)));