var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=A.find(function(x){return x&&x.id==='rme-vs-motu';});
var f=g.featuredSnippet, o=[];
for(var i=1;i<=5;i++){
  o.push('Q'+i+'_EN='+(f['faq_q'+i+'_en']||'(missing)'));
  o.push('A'+i+'_EN='+(f['faq_a'+i+'_en']||'(missing)'));
  o.push('Q'+i+'_ES='+(f['faq_q'+i+'_es']||'(missing)'));
  o.push('A'+i+'_ES='+(f['faq_a'+i+'_es']||'(missing)'));
  o.push('');
}
fs.writeFileSync('temp/cons_patch/rme_faq5.txt', o.join('\n'),'utf8');
console.log('ok');
