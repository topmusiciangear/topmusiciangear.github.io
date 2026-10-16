const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const nw = guides.find(g => g.id === 'best-synth-vsts');
const old = guides.find(g => g.id === 'best-monitors');
console.log('NEW faq[0] keys: ' + Object.keys(nw.faq[0]).join(','));
console.log(JSON.stringify(nw.faq[0]).slice(0, 200));
console.log('OLD faq[0] keys: ' + Object.keys(old.faq[0]).join(','));
console.log(JSON.stringify(old.faq[0]).slice(0, 200));
