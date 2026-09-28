var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var o=[];
o.push('GUIDES='+A.length);
A.forEach(function(g){
  o.push('--- '+g.id+' ---');
  o.push('title='+g.title);
  o.push('title_es='+g.title_es);
  o.push('titleTag='+g.titleTag);
  o.push('titleTag_es='+g.titleTag_es);
});
fs.writeFileSync('temp/cons_patch/r2_titles.txt', o.join('\n'),'utf8');
// heuristic mismatch flags
var flags=[];
function toks(s){ return (String(s||'').toLowerCase().match(/[a-z0-9áéíóúñü$€£]+/gi)||[]); }
A.forEach(function(g){
  var en=toks(g.titleTag||g.title), es=toks(g.titleTag_es||g.title_es);
  var enSet={}, esSet={};
  en.forEach(function(t){enSet[t]=1;}); es.forEach(function(t){esSet[t]=1;});
  var miss=[];
  // numbers/prices must match
  en.forEach(function(t){ if(/[0-9$€£]/.test(t)&&!esSet[t]) miss.push(t); });
  // 'vs' parity
  var enVs=/\bvs\b/i.test(g.titleTag||'')||/\bvs\b/i.test(g.title||'');
  var esVs=/\bvs\b/i.test(g.titleTag_es||'')||/\bvs\b/i.test(g.title_es||'');
  if(enVs&&!esVs) miss.push('(vs missing in ES)');
  if(!enVs&&esVs) miss.push('(vs missing in EN)');
  // worth it parity
  var enW=/worth it/i.test((g.titleTag||'')+' '+(g.title||''));
  var esW=/vale la pena/i.test((g.titleTag_es||'')+' '+(g.title_es||''));
  if(enW&&!esW) miss.push('(worth-it missing in ES)');
  if(!enW&&esW) miss.push('(vale-la-pena missing in EN)');
  if(miss.length) flags.push(g.id+' :: '+miss.join(', '));
});
fs.writeFileSync('temp/cons_patch/r2_titleflags.txt', flags.join('\n'),'utf8');
console.log('flags='+flags.length);
