var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var rows=d.filter(function(g){return (g.titleTag_es||'').indexOf('(')>-1 || (g.title_es||'').indexOf('(')>-1;});
console.log('COUNT with parens ES: '+rows.length);
rows.slice(0,20).forEach(function(g){console.log('--- '+g.id+'\n title_es: '+g.title_es+'\n titleTag_es: '+g.titleTag_es);});
var gc=d.filter(function(g){return /gu.a de compra/i.test(g.title_es||'') || /pros/i.test(g.title_es||'');});
console.log('COUNT guia/pros ES: '+gc.length);
gc.slice(0,20).forEach(function(g){console.log('--- '+g.id+'\n title_es: '+g.title_es+'\n titleTag_es: '+g.titleTag_es);});
