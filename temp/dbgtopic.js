const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
// extract helpers
const m1 = src.match(/function normHead[\s\S]*?\n\}/);
const m2 = src.match(/const STOP_TOKENS[\s\S]*?\n/);
eval(m1[0]); eval('const STOP_TOKENS = ' + src.match(/const STOP_TOKENS = (.*?);/)[1]);
const m3 = src.match(/function prodTokens[\s\S]*?\n\}/);
const m4 = src.match(/function sectionTopicProduct[\s\S]*?\n\}/);
eval(m3[0]); eval(m4[0]);
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'beat-making');
const s = g.sections[3];
const prods = s.products.map(pid => P.find(pr => pr.id === pid)).filter(Boolean);
console.log('prods found:', prods.map(p => p.id + ':' + p.title));
console.log('topic:', JSON.stringify(sectionTopicProduct(s, prods) && sectionTopicProduct(s, prods).id));