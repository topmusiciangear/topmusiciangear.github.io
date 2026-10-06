const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const g = G.find(x => x.id === 'best-digital-pianos');
console.log('=== INTRO EN ===');
console.log(g.intro);
console.log('\n=== INTRO ES ===');
console.log(g.intro_es);
