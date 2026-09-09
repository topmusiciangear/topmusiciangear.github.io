const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json', 'utf8'));
const g = data.find(x => x.id === 'best-amp-modelers');
const es = g.sections[2].content_es;
const find = 'suene genial y sin complicaciones a un precio económico, y para ese trabajo no tiene rival en esta lista';
console.log('includes find:', es.includes(find));
// find the index of 'suene'
console.log('idx of suene genial:', es.indexOf('suene genial'));
console.log('idx of sin complicaciones:', es.indexOf('sin complicaciones'));
console.log('idx of no tiene rival:', es.indexOf('no tiene rival'));
console.log('slice around:', JSON.stringify(es.slice(es.indexOf('suene genial') - 30, es.indexOf('suene genial') + 200)));

const g2 = data.find(x => x.id === 'tracking-headphones');
const con = g2.conclusion;
console.log('tracking workhorse idx:', con.indexOf('workhorse'));
console.log('slice:', JSON.stringify(con.slice(con.indexOf('workhorse') - 50, con.indexOf('workhorse') + 40)));

const g3 = data.find(x => x.id === 'best-ribbon-mics');
const c3 = g3.sections[2].content;
console.log('ribbon idx:', c3.indexOf('industry standard'));
console.log('slice:', JSON.stringify(c3.slice(c3.indexOf('industry standard') - 30, c3.indexOf('industry standard') + 60)));