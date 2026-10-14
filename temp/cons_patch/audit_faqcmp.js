var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var o=[];
['ai-tools-plugins','sidechain-modulation-plugins','beatmaker-plugins'].forEach(function(id){
  var g=A.find(function(x){return x&&x.id===id;});
  o.push('--- '+id+' ---');
  (g.comparison.rows||[]).forEach(function(r,i){
    o.push('row'+i+' ['+(r.label||'?')+'] val1='+JSON.stringify(r.val1)+' val2='+JSON.stringify(r.val2)+' val1_es='+JSON.stringify(r.val1_es)+' val2_es='+JSON.stringify(r.val2_es));
  });
});
var p=A.find(function(x){return x&&x.id==='premium-interfaces';});
o.push('--- premium fsn1 vs faq0 ---');
o.push('fsn_q1_en='+p.featuredSnippet.faq_q1_en);
o.push('faq0_en='+(p.faq[0].q||p.faq[0].question));
o.push('fsn_q1_es='+p.featuredSnippet.faq_q1_es);
o.push('faq0_es='+(p.faq[0].q_es||p.faq[0].answer));
fs.writeFileSync('temp/cons_patch/audit_faqcmp.txt', o.join('\n'),'utf8');
console.log('ok');
