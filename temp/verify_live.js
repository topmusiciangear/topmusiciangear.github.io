var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/best-live-sound-mixers.html','guides/best-live-sound-mixers_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' no MG10XU',h.indexOf('MG10XU')===-1);
  chk(f+' no Monitor Outputs row',h.indexOf('Monitor Outputs')===-1 && h.indexOf('Salidas de Monitor')===-1);
  chk(f+' Bose section',h.indexOf('T8S ToneMatch')>-1);
  chk(f+' DM3S section',h.indexOf('DM3S')>-1);
  chk(f+' Ui24R section',h.indexOf('Ui24R')>-1);
  chk(f+' Faders row',h.indexOf('Faders / Control')>-1 || h.indexOf('Faders')>-1);
  chk(f+' Sample rate row',h.indexOf('Sample rate')>-1 || h.indexOf('muestreo')>-1);
  chk(f+' Automixer (not Dugan)',h.indexOf('Automixer')>-1 && h.indexOf('Dugan')===-1);
  chk(f+' Bose price 999',h.indexOf('999')>-1);
  chk(f+' DM3S price 1799',h.indexOf('1,799')>-1);
  chk(f+' BOET8STONEMATCH link',h.indexOf('BOET8STONEMATCH')>-1);
  chk(f+' YAMDM3S link',h.indexOf('YAMDM3S')>-1);
  chk(f+' SOUUI24R link',h.indexOf('SOUUI24R')>-1);
  chk(f+' MG16XU present',h.indexOf('MG16XU')>-1);
});
var en=fs.readFileSync('guides/best-live-sound-mixers.html','utf8');
var es=fs.readFileSync('guides/best-live-sound-mixers_es.html','utf8');
chk('EN title suffix',en.indexOf('(Pros, Cons & Buying Guide 2026)')>-1);
chk('ES title suffix',es.indexOf('(pros, contras y guía de compra 2026)')>-1);
console.log('done');