var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'best-samplers-drum-computers'; })[0];
console.log('### SAMP SEC3 EN ###\n' + g.sections[3].content);
console.log('\n### SAMP SEC3 ES ###\n' + g.sections[3].content_es);
console.log('\n### FAQ_A5 EN ###\n' + g.featuredSnippet.faq_a5_en);
console.log('\n### FAQ_A5 ES ###\n' + g.featuredSnippet.faq_a5_es);
var p = guides.filter(function (x) { return (x.slug || x.id) === 'pro-drum-machines'; })[0];
console.log('\n### PRO SEC0 EN ###\n' + p.sections[0].content);
console.log('\n### PRO SEC0 ES ###\n' + p.sections[0].content_es);
