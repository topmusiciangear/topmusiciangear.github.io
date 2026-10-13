var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
['best-condenser-mics','best-digital-mixers','usb-mics','tracking-headphones'].forEach(function(id){
  var g=d.find(function(x){return x.id===id});
  console.log('===== '+id+' =====');
  console.log('-- verdict: '+(g.verdict||'').slice(0,400));
  console.log('-- verdict_es: '+(g.verdict_es||'').slice(0,400));
  console.log('-- conclusion: '+(g.conclusion||'').slice(0,500));
  console.log('-- conclusion_es: '+(g.conclusion_es||'').slice(0,500));
  console.log('-- featured: '+JSON.stringify(g.featuredProducts));
});
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
[196,297,518,57].forEach(function(id){var p=ps.find(function(x){return x.id===id});console.log(id+': '+(p?p.title+' | img='+(p.img||'NONE')+' | stores='+Object.keys(p.stores||{}).join(','):'MISSING'));});
var src=fs.readFileSync(BASE+'build-guides.js','utf8');
[196,297,518,57].forEach(function(id){console.log('TEST '+id+': '+(src.indexOf('\n  '+id+': {')>-1?'present':'ABSENT'));});
