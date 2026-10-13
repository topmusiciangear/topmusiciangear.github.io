var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='monitor-setup'});
console.log('--- description ---'); console.log(g.description);
console.log('--- description_es ---'); console.log(g.description_es);
console.log('--- featuredSnippet keys ---');
var fsn=g.featuredSnippet||{};
Object.keys(fsn).forEach(function(k){
  if(/^faq_/.test(k)) console.log(k+': '+(fsn[k]||'').slice(0,300));
});
console.log('--- faq array ---'); console.log(JSON.stringify(g.faq||null,null,2).slice(0,2000));
