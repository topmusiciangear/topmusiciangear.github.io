var fs=require('fs');
var p='data/guides.json';
var d=JSON.parse(fs.readFileSync(p,'utf8'));
var fails=[];
function assert(c,m){ if(!c) fails.push(m); }

// ---- 1. DELETE midi-keyboards ----
var idx=d.findIndex(function(x){return x.id==='midi-keyboards'});
assert(idx>-1,'midi-keyboards entry missing');
var removed=d.splice(idx,1)[0];
assert(removed.featuredProducts.length===6,'removed guide products unexpected');
console.log('deleted midi-keyboards with products '+removed.featuredProducts.join(','));

// ---- 2. relatedGuides: midi-keyboards -> best-stage-keyboards (midi-controllers -> best-keyboard) ----
var relCount=0;
d.forEach(function(g){
  (g.relatedGuides||[]).forEach(function(r,i){
    if(r==='midi-keyboards'){
      g.relatedGuides[i]=(g.id==='midi-controllers')?'best-keyboard':'best-stage-keyboards';
      relCount++;
    }
  });
});
console.log('relatedGuides repointed: '+relCount);
assert(relCount===6,'expected 6 related repoints, got '+relCount);

// ---- 3. content anchors ----
var n=0;
function rep(guideId, key, from, to){
  var g=d.find(function(x){return x.id===guideId});
  assert(g,'guide missing '+guideId);
  var c=(g[key]||'').split(from).join(to);
  var hits=(g[key]||'').split(from).length-1;
  n+=hits; g[key]=c;
  return hits;
}
// midi-controllers intro + section -> hub
var H1='/guides/best-keyboard.html', H1ES='/guides/best-keyboard_es.html';
var HT='Best Keyboards: Piano, Synth & MIDI Controllers', HTES='Mejores teclados: piano, synth y MIDI';
console.log('mc intro EN: '+rep('midi-controllers','intro','/guides/midi-keyboards.html">'+ 'Best MIDI Keyboards & Controllers',H1+'">'+HT));
console.log('mc intro ES: '+rep('midi-controllers','intro_es','/guides/midi-keyboards_es.html">'+'Mejores Teclados y Controladores MIDI',H1ES+'">'+HTES));
// find remaining midi-keyboards hrefs in midi-controllers (section)
var mc=d.find(function(x){return x.id==='midi-controllers'});
var mcHits=0;
mc.sections.forEach(function(s){
  ['content','content_es'].forEach(function(k){
    if(s[k]&&s[k].indexOf('midi-keyboards')>-1){
      var isEs=(k==='content_es');
      s[k]=s[k].split(isEs?'midi-keyboards_es.html':'midi-keyboards.html').join(isEs?'best-keyboard_es.html':'best-keyboard.html');
      mcHits++;
    }
  });
});
console.log('mc sections repointed: '+mcHits);
// best-digital-pianos conclusion -> hub
console.log('bdp conc EN: '+rep('best-digital-pianos','conclusion','/guides/midi-keyboards.html',H1));
console.log('bdp conc ES: '+rep('best-digital-pianos','conclusion_es','/guides/midi-keyboards_es.html',H1ES));
// p225 conclusion -> hub (link text mentions MIDI; hub owns controllers now)
console.log('p225 conc EN: '+rep('p225-vs-fp30x','conclusion','/guides/midi-keyboards.html',H1));
console.log('p225 conc ES: '+rep('p225-vs-fp30x','conclusion_es','/guides/midi-keyboards_es.html',H1ES));

// ---- 4. global sweep: any midi-keyboards href left in guides.json? ----
var leftover=JSON.stringify(d).split('midi-keyboards').length-1;
console.log('leftover midi-keyboards refs in guides.json: '+leftover);
assert(leftover===0,'leftovers remain');

if(fails.length){ console.log('FAIL:\n'+fails.join('\n')); process.exit(1); }
fs.writeFileSync(p,JSON.stringify(d,null,2));
console.log('DELETE+REPOINT OK | guides now: '+d.length);
