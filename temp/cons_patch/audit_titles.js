var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var o=[];
A.forEach(function(g){
  var en=(g.title||'').trim();
  var es=(g.title_es||'').trim();
  var ent=(g.titleTag||'').trim();
  var est=(g.titleTag_es||'').trim();
  
  // check if they convey same meaning (rough heuristic)
  var enT=en.toLowerCase();
  var esT=es.toLowerCase();
  
  // key terms that should match
  var checks={
    'beginner':['principiante','principiantes'],
    'best':['mejores','mejor'],
    'vs':['vs','versus','duelo','duelo de'],
    'budget':['econ','barat'],
    'premium':['premium','insignia'],
    'pro':['pro','profesional'],
    'portable':['portátil','portatiles'],
    'studio':['estudio'],
    'home':['casero','casa','hogar'],
    'guide':['guía','guia','completa'],
    'compar':['compar'],
    'versus':['vs','versus'],
    'duel':['duelo'],
    'how to':['cómo','como'],
    'what to':['qué','que'],
    'which':['cuál','cual'],
    'worth':['vale la pena','valga la pena'],
    'cheat':['truc','trucos'],
    'secret':['secret','trucos'],
  };
  
  var mismatch=false;
  var details=[];
  Object.keys(checks).forEach(function(k){
    var hasEn=enT.indexOf(k)>=0;
    var hasEs=checks[k].some(function(w){return esT.indexOf(w)>=0;});
    if(hasEn && !hasEs){
      mismatch=true;
      details.push('EN has "'+k+'" but ES missing');
    }
    if(!hasEn && hasEs){
      mismatch=true;
      details.push('ES has "'+checks[k].join('/')+'" but EN missing');
    }
  });
  
  // number count mismatch
  var enNum=(en.match(/\d+/)||[])[0];
  var esNum=(es.match(/\d+/)||[])[0];
  if(enNum!==esNum && (enNum||esNum)){
    mismatch=true;
    details.push('numbers differ EN:'+(enNum||'none')+' ES:'+(esNum||'none'));
  }
  
  if(mismatch){
    o.push('--- '+g.id+' ---');
    o.push('EN: '+en);
    o.push('ES: '+es);
    o.push('ENTAG: '+ent);
    o.push('ESTAG: '+est);
    o.push('DETAILS: '+details.join('; '));
    o.push('');
  }
});
fs.writeFileSync('temp/cons_patch/title_mismatch.txt', o.join('\n'),'utf8');
console.log('mismatches='+o.length/7+' guides');