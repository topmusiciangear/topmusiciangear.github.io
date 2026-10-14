var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=A.find(function(x){return x&&x.id==='rme-vs-motu';});
var fsn=g.featuredSnippet;
var o=[];
['faq_q1_es','faq_a1_es','faq_q2_es','faq_a2_es','best1_es','best2_es','key1_es','key2_es'].forEach(function(k){ o.push(k+'='+(fsn[k]||'(missing)')); });
o.push('ALL_FSN_KEYS='+Object.keys(fsn).join(','));
fs.writeFileSync('temp/cons_patch/rme_faq.txt', o.join('\n\n'),'utf8');
console.log('ok');
