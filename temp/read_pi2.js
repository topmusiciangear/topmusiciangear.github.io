const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'premium-interfaces');
console.log('### INTRO_EN ###'); console.log(g.intro);
console.log('\n### INTRO_ES ###'); console.log(g.intro_es);
console.log('\n### CONCLUSION_EN ###'); console.log(g.conclusion);
console.log('\n### CONCLUSION_ES ###'); console.log(g.conclusion_es);
console.log('\n### KEEPER VERDICTS (nombres exactos) ###');
g.verdictProsCons.forEach(v => console.log(JSON.stringify(v.name)));
