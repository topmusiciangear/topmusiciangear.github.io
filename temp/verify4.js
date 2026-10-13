var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
var files={
  condEN:'guides/best-condenser-mics.html',condES:'guides/best-condenser-mics_es.html',
  mixEN:'guides/best-digital-mixers.html',mixES:'guides/best-digital-mixers_es.html',
  usbEN:'guides/usb-mics.html',usbES:'guides/usb-mics_es.html',
  trkEN:'guides/tracking-headphones.html',trkES:'guides/tracking-headphones_es.html',
  monES:'guides/monitor-setup_es.html'
};
var H={};Object.keys(files).forEach(function(k){H[k]=fs.readFileSync(files[k],'utf8');});
// condenser new sections
['Audio-Technica AT2020','Rode NT1 Signature Series','Lewitt LCT 440 PURE','Neumann TLM 102','Neumann TLM 103','Warm Audio WA-8000'].forEach(function(nm){
  chk('condEN sec '+nm,H.condEN.indexOf(nm)>-1);
  chk('condES sec '+nm,H.condES.indexOf(nm)>-1);
});
// mixer new sections
['Tascam Model 12','Behringer X32 Compact','Korg SoundLink MW-1608','Allen & Heath CQ-18T','Midas M32R LIVE'].forEach(function(nm){
  chk('mixEN sec '+nm,H.mixEN.indexOf(nm)>-1);
});
// mixer verdict rewritten (no TF3/SSL SiX/CL5)
chk('mixEN verdict new',H.mixEN.indexOf('hands-on analog recorder')>-1);
chk('mixEN old verdict gone',H.mixEN.indexOf('Yamaha TF3')===-1&&H.mixEN.indexOf('DiGiCo')===-1);
// yeti + k371
chk('usbEN Yeti sec',H.usbEN.indexOf('The Classic That Started It All')>-1);
chk('usbES Yeti sec',H.usbES.indexOf('El clásico que lo empezó todo')>-1);
chk('trkEN K371 sec',H.trkEN.indexOf('Balanced and Foldable')>-1);
chk('trkES K371 sec',H.trkES.indexOf('Equilibrados y plegables')>-1);
// 7 ES fixes
var es=H.monES;
chk('F1 supera a',es.indexOf('supera a un par perfecto')>-1);
chk('F2 selectores',es.indexOf('Dos selectores traseros son la primera')>-1);
chk('F2 hasta los 38',es.indexOf('baja hasta los 38 Hz')>-1);
chk('F3 el de 8 del HS8',es.indexOf('que el de 8 del HS8')>-1);
chk('F3 que pelee',es.indexOf('que pelee contra el límite')>-1);
chk('F4 Cada soporte',es.indexOf('Cada soporte de monitor K&M 26722 se vende por unidad')>-1);
chk('F5 de hasta',es.indexOf('una inclinación de hasta 6,5 grados')>-1);
chk('F5 coma cuestan',es.indexOf('el par, cuestan dinero de verdad')>-1);
chk('F6 Funciona con',es.indexOf('Funciona con REW, Sonarworks y Dirac por igual: la herramienta')>-1);
chk('F7 sistema SAM',es.indexOf('¿Tienes un sistema SAM? GLM. ¿Poco presupuesto? MoPADs. ¿Cargas con monitores')>-1);
// no bolo anywhere in new content
['condES','mixES','usbES','trkES'].forEach(function(k){chk(k+' no bolo',H[k].indexOf('bolo')===-1);});
chk('monES no bolo',es.indexOf('bolo')===-1);
// blue names condenser verdict+conclusion
var pn=(H.condEN.match(/class="product-name"/g)||[]).length;
console.log('condenser EN blue spans='+pn);chk('condenser blue>=10',pn>=10);
console.log('done');
