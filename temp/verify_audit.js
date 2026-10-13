var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/stream-controllers.html','guides/stream-controllers_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  // old errors must be gone
  chk(f+' no dup XLR sentence',h.indexOf('It has no XLR input and no preamp. It has no XLR')===-1);
  chk(f+' no previo-in-EN',h.indexOf('previo delivers')===-1);
  chk(f+' 80dB vpc',h.indexOf('80 dB')>-1);
  chk(f+' no 75 dB Wave',h.indexOf('75 dB')===-1&&h.indexOf('75dB')===-1);
  chk(f+' Bridge vpc',h.indexOf('Dual-bus mixing separates')>-1||h.indexOf('Mezcla dual-bus')>-1);
  chk(f+' an afternoon',h.indexOf('an afternoon')>-1||f.indexOf('_es')>-1);
});
// ES-only
var es=fs.readFileSync('guides/stream-controllers_es.html','utf8');
chk('ES no el configuración',es.indexOf('el configuración')===-1);
chk('ES no atañe/contrapartida',es.indexOf('atañe')===-1&&es.indexOf('contrapartida')===-1);
chk('ES no radial',es.indexOf('radial dedicada')===-1);
chk('ES no sponsors',es.indexOf('sponsors')===-1);
chk('ES no muting',es.indexOf('muting táctil')===-1);
chk('ES no parpadee',es.indexOf('parpadee')===-1);
chk('ES Stream Deck caps',es.indexOf('alternativas al Stream Deck')>-1);
console.log('done');