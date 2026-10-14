var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var PAIRS=[
["Es","es"],["Previo","previo"],["Previos","previos"],["Debes","debes"],
["Mezclar","mezclar"],["M\u00e1quina","m\u00e1quina"],["Plugins","plugins"],["Plugin","plugin"],
["Musical","musical"],["Kits","kits"],["Kit","kit"],["Esencial","esencial"],["Esenciales","esenciales"],
["Realmente","realmente"],["Hacen","hacen"],["Sala","sala"],["Salas","salas"],["Combo","combo"]
];
var COMMON={}; PAIRS.forEach(function(p){COMMON[p[0]]=p[1];});
var BRANDS=["Universal Audio","Kali Audio","Adam Audio","ADAM Audio","Focal Audio","Plugin Boutique"];
function sentCase(s){
  if(typeof s!=='string') return {v:s,c:0};
  var PH={}; var w=s;
  BRANDS.forEach(function(b,i){ var k='\u0001B'+i+'\u0001'; if(w.indexOf(b)>=0){ PH[k]=b; w=w.split(b).join(k); } });
  var parts=w.split(/(\s+)/); var wi=0, c=0;
  for(var i=0;i<parts.length;i++){
    var t=parts[i]; if(/^\s*$/.test(t)) continue;
    var m=t.match(/^([\u00bf\u00a1\(\["']*)(.+?)([.,;:!?\)\]"']*)$/);
    if(!m){ wi++; continue; }
    var pre=m[1], core=m[2], post=m[3];
    if(/^\u0001B\d+\u0001$/.test(core)){ wi++; continue; }
    if(wi>0 && COMMON[core] && !/\d/.test(core) && core!==core.toUpperCase()){ parts[i]=pre+COMMON[core]+post; c++; }
    wi++;
  }
  var out=parts.join('');
  Object.keys(PH).forEach(function(k){ out=out.split(k).join(PH[k]); });
  return {v:out,c:c};
}
var FSN_KEYS=['title_es','key1_es','key2_es','best1_es','best2_es','faq_q1_es','faq_q2_es','faq_q3_es','faq_q4_es','faq_q5_es'];
var total=0, perGuide={};
function eachES(g, fn){
  ['title_es','titleTag_es'].forEach(function(k){ if(typeof g[k]==='string') fn(g,k); });
  var fsn=g.featuredSnippet;
  if(fsn&&typeof fsn==='object') FSN_KEYS.forEach(function(k){ if(typeof fsn[k]==='string') fn(fsn,k); });
  if(g.sections) g.sections.forEach(function(sec){ ['h_es','heading_es'].forEach(function(k){ if(typeof sec[k]==='string') fn(sec,k); }); });
  if(Array.isArray(g.faq)) g.faq.forEach(function(f){ if(typeof f.q_es==='string') fn(f,'q_es'); });
}
A.forEach(function(g){
  eachES(g, function(obj,k){
    var r=sentCase(obj[k]);
    if(r.c>0){ obj[k]=r.v; total+=r.c; perGuide[g.id]=(perGuide[g.id]||0)+r.c; }
  });
});
// context restores for product names damaged in round 2
var RESTORES=[
  [/\bblues Junior\b/g,'Blues Junior'],
  [/\bjazz Bass\b/g,'Jazz Bass'],
  [/Fender jazz /g,'Fender Jazz '],
  [/: jazz,/g,': Jazz,'],
  [/ o jazz\?/g,' o Jazz?']
];
var restored=0;
A.forEach(function(g){
  eachES(g, function(obj,k){
    var s=obj[k], s2=s;
    RESTORES.forEach(function(r){ s2=s2.replace(r[0],r[1]); });
    if(s2!==s){ obj[k]=s2; restored++; perGuide[g.id]=(perGuide[g.id]||0)+1; }
  });
});
fs.writeFileSync('data/guides.json', JSON.stringify(A,null,2),'utf8');
console.log('words='+total+' restored='+restored+' guides='+Object.keys(perGuide).length);
