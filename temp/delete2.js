var fs=require('fs');
var p='data/guides.json';
var d=JSON.parse(fs.readFileSync(p,'utf8'));
var fails=[];
function assert(c,m){ if(!c) fails.push(m); }

// ---- 1. DELETE midi-keyboards ----
var idx=d.findIndex(function(x){return x.id==='best-stage-keyboards'});
assert(idx>-1,'stage guide missing?!');
var mi=d.findIndex(function(x){return x.id==='midi-keyboards'});
assert(mi>-1,'midi entry missing');
d.splice(mi,1);
console.log('deleted midi-keyboards');

// ---- 2. per-guide scoped replacements ----
function fixGuide(id, urlMap, textMap, relatedTo){
  var i=d.findIndex(function(x){return x.id===id});
  assert(i>-1,'guide missing '+id);
  var s=JSON.stringify(d[i]);
  var n=0;
  Object.keys(urlMap).forEach(function(from){
    var c=s.split(from).length-1; n+=c; s=s.split(from).join(urlMap[from]);
  });
  Object.keys(textMap).forEach(function(from){
    var c=s.split(from).length-1; n+=c; s=s.split(from).join(textMap[from]);
  });
  d[i]=JSON.parse(s);
  var rel=0;
  (d[i].relatedGuides||[]).forEach(function(r,j){
    if(r==='midi-keyboards'){ d[i].relatedGuides[j]=relatedTo; rel++; }
  });
  console.log(id+': url/text reps='+n+' related reps='+rel);
  return n+rel;
}
var H='Best Keyboards: Piano, Synth & MIDI Controllers';
var HES='Mejores teclados: piano, synth y MIDI';
var t=0;
t+=fixGuide('midi-controllers',
  {'/guides/midi-keyboards.html':'/guides/best-keyboard.html','/guides/midi-keyboards_es.html':'/guides/best-keyboard_es.html'},
  {'>Best MIDI Keyboards & Controllers</a>':'></a>'.replace('></a>','>'+H+'</a>'),'>Mejores Teclados y Controladores MIDI</a>':'>'+HES+'</a>'},
  'best-keyboard');
t+=fixGuide('best-digital-pianos',
  {'/guides/midi-keyboards.html':'/guides/best-keyboard.html','/guides/midi-keyboards_es.html':'/guides/best-keyboard_es.html'},
  {'>Best MIDI Keyboards & Controllers for Your Home Studio</a>':'>'+H+'</a>','>Mejores teclados y controladores MIDI para tu home studio</a>':'>'+HES+'</a>'},
  'best-stage-keyboards');
t+=fixGuide('best-synthesizers',
  {'/guides/midi-keyboards.html':'/guides/best-keyboard.html','/guides/midi-keyboards_es.html':'/guides/best-keyboard_es.html'},
  {'>Best MIDI Keyboards & Controllers for Your Home Studio</a>':'>'+H+'</a>','>Mejores Teclados y Controladores MIDI para Tu Home Studio</a>':'>'+HES+'</a>'},
  'best-stage-keyboards');
t+=fixGuide('p225-vs-fp30x',
  {'/guides/midi-keyboards.html':'/guides/best-keyboard.html','/guides/midi-keyboards_es.html':'/guides/best-keyboard_es.html'},
  {'>Best MIDI Keyboards</a>':'>'+H+'</a>','>Mejores teclados MIDI</a>':'>'+HES+'</a>'},
  'best-stage-keyboards');
t+=fixGuide('nord-stage-4-vs-montage-m8x',{}, {},'best-stage-keyboards');

// ---- 3. global leftover check ----
var leftover=JSON.stringify(d).split('midi-keyboards').length-1;
console.log('leftover refs: '+leftover+' total reps: '+t);
assert(leftover===0,'leftovers remain');

if(fails.length){ console.log('FAIL:\n'+fails.join('\n')); process.exit(1); }
fs.writeFileSync(p,JSON.stringify(d,null,2));
console.log('DELETE+REPOINT OK | guides: '+d.length);
