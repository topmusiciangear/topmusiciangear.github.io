const fs = require('fs');
const d = require('../data/guides.json');

const allEn = d.filter(g => g.id === 'pro-guitars')[0];
const allFields = JSON.stringify(allEn);
const matches = allFields.match(/definitive rock[^"]{0,50}/gi);
console.log('pro-guitars "definitive rock" instances:');
if (matches) matches.forEach(m => console.log('  -', m));

const stage = d.filter(g => g.id === 'stage-mics')[0];
const stageFields = JSON.stringify(stage);
const stageMatches = stageFields.match(/world.s standard[^"]{0,60}/gi);
console.log('\nstage-mics "world standard" instances:');
if (stageMatches) stageMatches.forEach(m => console.log('  -', m));
