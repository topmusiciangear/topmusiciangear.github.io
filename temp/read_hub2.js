var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='best-keyboard'});
console.log('--- verdict ---\n'+g.verdict);
console.log('--- verdict_es ---\n'+g.verdict_es);
console.log('--- conclusion ---\n'+g.conclusion);
console.log('--- conclusion_es ---\n'+g.conclusion_es);
var fsn=g.featuredSnippet||{};
var qs=Object.keys(fsn).filter(function(k){return /^faq_q\d+_en$/.test(k)});
console.log('FAQ count EN: '+qs.length);
qs.forEach(function(k){
  var n=k.match(/\d+/)[0];
  console.log('Q'+n+': '+fsn[k]);
  console.log('A'+n+': '+(fsn['faq_a'+n+'_en']||'').slice(0,220));
});
