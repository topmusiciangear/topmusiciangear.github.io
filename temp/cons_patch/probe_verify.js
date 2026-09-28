var fs = require('fs');
var base = 'C:/Users/Daniel/projects/topmusiciangear';
var g = fs.readFileSync(base + '/data/guides.json', 'utf8');
var j = JSON.parse(g);
var prem = j.find(function(x){ return x.id === 'premium-interfaces'; });
var port = j.find(function(x){ return x.id === 'portable-daws'; });
console.log('prem sections count = ' + (prem.sections ? prem.sections.length : 'null'));
(prem.sections || []).forEach(function(s, i){
  console.log('--- prem.sections[' + i + '] ---');
  console.log('  h=' + JSON.stringify(s.h) + '   h_es=' + JSON.stringify(s.h_es));
  console.log('  intro=' + JSON.stringify((s.intro||'').slice(0,60)) + '   intro_es=' + JSON.stringify((s.intro_es||'').slice(0,60)));
});
console.log('--- portable (referencia correcta) sections[0..1] ---');
(port.sections || []).slice(0,2).forEach(function(s,i){
  console.log('  heading=' + JSON.stringify(s.heading) + '   heading_es=' + JSON.stringify(s.heading_es));
});
