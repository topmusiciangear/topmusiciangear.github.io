var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'best-drum-machine'; })[0];
console.log('### INTRO_ES ###\n' + g.intro_es);
console.log('\n### CONCLUSION_ES ###\n' + g.conclusion_es);
console.log('\n### VERDICT_ES ###\n' + g.verdict_es);
