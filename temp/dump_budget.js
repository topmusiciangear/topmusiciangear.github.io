const fs = require('fs');
const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const o = g.find(x => x.id === 'budget-headphones');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/budget_guide.json', JSON.stringify(o, null, 1));
console.log('sections:', o.sections.length, 'verdicts:', o.verdictProsCons.length);
