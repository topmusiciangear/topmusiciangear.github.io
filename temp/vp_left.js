const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = guides.find(x => x.id === 'vocal-plugins');
console.log('sec0: ' + JSON.stringify(g.sections[0]).slice(0, 400));
console.log('relatedGuides: ' + JSON.stringify(g.relatedGuides));
console.log('sections order: ' + g.sections.map(s => (s.products || []).join(',')).join(' | '));
