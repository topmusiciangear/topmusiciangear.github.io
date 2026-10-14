var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var ids=['premium-interfaces','rme-vs-motu'];
ids.forEach(function(id){
  var g=A.find(function(x){return x&&x.id===id;});
  if(!g){ console.log(id+' NOT FOUND'); return; }
  var o=[];
  o.push('== '+id+' ==');
  o.push('title_es='+g.title_es);
  o.push('titleTag_es='+g.titleTag_es);
  o.push('fs_title_es='+(g.featuredSnippet&&g.featuredSnippet.title_es));
  o.push('fs_key1_es='+(g.featuredSnippet&&g.featuredSnippet.key1_es));
  o.push('fs_key2_es='+(g.featuredSnippet&&g.featuredSnippet.key2_es));
  if(g.sections) g.sections.forEach(function(s,i){ o.push('sec'+i+'='+s.heading_es); });
  if(g.comparison&&g.comparison.rows) g.comparison.rows.forEach(function(r,i){ o.push('cmp'+i+'='+r.label_es); });
  if(g.featuredSnippet&&g.featuredSnippet.specs) g.featuredSnippet.specs.forEach(function(s,i){ o.push('spec'+i+'='+s.label_es); });
  fs.appendFileSync('temp/cons_patch/batch1.txt', o.join('\n')+'\n\n','utf8');
});
console.log('ok');
