const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = guides.find(x => x.id === 'mixing-plugins');
console.log('SEC ORDER: ' + g.sections.map(s => (s.products || []).join(',')).join(' | '));
console.log('VPC ORDER: ' + g.verdictProsCons.map(v => v.name).join(' | '));
console.log('INTRO: ' + (g.intro || '').slice(0, 300));
console.log('VERDICT: ' + (g.verdict || '').slice(0, 400));
