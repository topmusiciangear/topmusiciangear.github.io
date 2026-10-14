var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=A.find(function(x){return x&&x.id==='rme-vs-motu';});
var o=[];
o.push('INTRO='+g.intro);
o.push('INTRO_ES='+g.intro_es);
o.push('NSEC='+g.sections.length);
g.sections.forEach(function(s,i){
  o.push('=== SEC'+i+' h='+s.heading);
  o.push('h_es='+s.heading_es);
  o.push('content='+s.content);
  o.push('content_es='+s.content_es);
});
o.push('VERDICT='+g.verdict);
o.push('VERDICT_ES='+g.verdict_es);
o.push('CONCLUSION='+(g.conclusion||'').slice(0,1500));
o.push('CONCLUSION_ES='+(g.conclusion_es||'').slice(0,1500));
fs.writeFileSync('temp/cons_patch/rme_full.txt', o.join('\n\n'),'utf8');
console.log('secs='+g.sections.length+' len='+o.join('\n\n').length);
