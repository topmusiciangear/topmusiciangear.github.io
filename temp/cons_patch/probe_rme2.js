var fs=require('fs');
var raw=fs.readFileSync('data/guides.json','utf8');
var A=JSON.parse(raw);
console.log('isArray='+Array.isArray(A)+' type='+typeof A);
var keys=Object.keys(A);
console.log('nkeys='+keys.length+' first5='+keys.slice(0,5).join(','));
var g = Array.isArray(A) ? A.find(function(x){return x&& (x.id==='rme-vs-motu'||x.slug==='rme-vs-motu');}) : A['rme-vs-motu'] || Object.values(A).find(function(x){return x&& (x.id==='rme-vs-motu');});
console.log('found='+(g?'yes id='+g.id:'no'));
if(g){
  var o=[]; o.push('title_es='+g.title_es); o.push('titleTag_es='+g.titleTag_es);
  o.push('featuredSnippet='+JSON.stringify(g.featuredSnippet,null,2).slice(0,3000));
  o.push('verdict_es='+(g.verdict_es||'').slice(0,800));
  o.push('comparison='+JSON.stringify(g.comparison,null,2).slice(0,4000));
  fs.writeFileSync('temp/cons_patch/rme2.txt', o.join('\n\n'),'utf8');
}
