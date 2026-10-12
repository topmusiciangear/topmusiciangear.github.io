var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'best-hardware-samplers'; })[0];
console.log('### INTRO ###\n' + g.intro);
console.log('\n### CONCLUSION ###\n' + g.conclusion);
console.log('\n### VERDICT ###\n' + g.verdict);
console.log('\n### SEC5 ES ###\n' + g.sections[5].content_es);
console.log('\n### V4 EP-133 PROS_ES ###\n' + JSON.stringify(g.verdictProsCons[4].pros_es));
console.log('\n### V4 CONS_ES ###\n' + JSON.stringify(g.verdictProsCons[4].cons_es));
console.log('\n### V5 (Live III) PROS-EN NOW ###\n' + JSON.stringify(g.verdictProsCons[5].pros));
