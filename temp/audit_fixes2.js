var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function R(s,a,b){ if(s.indexOf(a)===-1){fails.push('NOT FOUND: '+a.slice(0,70));return s;} return s.replace(a,b); }
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='stream-controllers';});
var F=g.featuredSnippet;
F.faq_a5_es=R(F.faq_a5_es,'Las contrapartidas son software solo Windows','Los inconvenientes son software solo Windows');
var sx=g.sections.find(function(s){return s.products&&s.products.length===1&&s.products[0]===244;});
sx.content_es=R(sx.content_es,'un software que nunca parpadee','un software que nunca falle');
fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p246=ps.find(function(x){return x.id===246;});
p246.desc_es=R(p246.desc_es,'muting táctil','silenciado táctil');
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('done');
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');