const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'active-vs-passive-pa');
const s = g.sections[2];
console.log('HEADING:', s.heading);
const m = s.content.match(/<table[\s\S]*?<\/table>/);
console.log('TABLE EN:', m ? m[0].replace(/<[^>]*>/g, '|').slice(0, 600) : 'none');
console.log('AFTER TABLE:', JSON.stringify(s.content.slice(s.content.indexOf('</table>') + 8, s.content.indexOf('</table>') + 200)));