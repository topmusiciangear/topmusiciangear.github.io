var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var o=[];
['best-plugins','hs8-vs-rokit-7','apollo-vs-babyface','scarlett-vs-ssl','blx288-vs-ewd','pro-tools-vs-cubase','j48-vs-rndi','fabfilter-vs-ozone','digitakt-ii-vs-tr8s','rme-vs-motu','budget-mics','pro-monitors','precision-vs-jazz','sm57-vs-md421','dxr-vs-prx','martin-d28-vs-taylor-314','dt770-vs-dt990'].forEach(function(id){
  var g=A.find(function(x){return x&&x.id===id;});
  if(!g){ o.push(id+' MISSING'); return; }
  o.push('--- '+id+' ---');
  o.push('title_es='+g.title_es);
  o.push('tag_es='+g.titleTag_es);
  if(g.featuredSnippet&&g.featuredSnippet.title_es) o.push('fsn='+g.featuredSnippet.title_es);
});
fs.writeFileSync('temp/cons_patch/r2_verify.txt', o.join('\n'),'utf8');
console.log('ok');
