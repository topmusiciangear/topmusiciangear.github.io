var g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
var vals = {};
g.forEach(function (x) {
  if (x.faqTitle) vals[x.faqTitle + ' ||| ' + x.faqTitle_es] = (vals[x.faqTitle + ' ||| ' + x.faqTitle_es] || 0) + 1;
});
Object.keys(vals).forEach(function (k) { console.log(vals[k] + 'x :: ' + k); });
var d = g.filter(function (x) { return (x.slug || x.id) === 'best-drum-machine'; })[0];
console.log('DRUM-SEC0-EN:', JSON.stringify(d.sections[0].content).slice(0, 160));
console.log('DRUM-SEC0-ES:', JSON.stringify(d.sections[0].content_es).slice(0, 160));
console.log('DRUM-CONC-EN:', JSON.stringify(d.conclusion).slice(0, 160));
console.log('DRUM-VERD-EN:', JSON.stringify(d.verdict).slice(0, 160));
