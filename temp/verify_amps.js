var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
var es=fs.readFileSync('guides/best-mic-for-guitar-amps_es.html','utf8');
function chk(n,c){ console.log((c?'PASS':'FAIL')+' '+n); }
['Sennheiser e906','Audix i5','Shure Beta 57A','Beyerdynamic M 201 TG'].forEach(function(t){
  chk('EN col '+t, en.indexOf('<th>'+t+'</th>')>-1);
  chk('ES col '+t, es.indexOf('<th>'+t+'</th>')>-1);
});
chk('EN no PD200X section', en.indexOf('Maono PD200X: A Closer Look')===-1);
chk('EN no XM8500 section', en.indexOf('Behringer XM8500: A Closer Look')===-1);
chk('EN no PD200X anywhere', en.indexOf('PD200X')===-1);
chk('EN no XM8500 anywhere', en.indexOf('XM8500')===-1);
chk('ES no PD200X', es.indexOf('PD200X')===-1);
chk('ES no XM8500', es.indexOf('XM8500')===-1);
['Hang It and Forget It','Louder Than Loud','More Gain, Less Hiss','Hypercardioid Isolation'].forEach(function(h){
  chk('EN sec '+h, en.indexOf(h)>-1);
});
['140 dB','2.2 mV/Pa','neodymium','hostaphan'].forEach(function(w){
  chk('EN has '+w, en.toLowerCase().indexOf(w.toLowerCase())>-1);
});
chk('EN conc SM57 reference', en.indexOf('The Shure SM57 is still the reference')>-1);
chk('EN no Q2U leftover', en.indexOf('Samson Q2U')===-1);
chk('ES conc rewritten', es.indexOf('El Shure SM57 sigue siendo la referencia')>-1);
chk('EN btn e906 $219', en.indexOf('$219.00')>-1);
chk('EN btn i5 $105', en.indexOf('$105.00')>-1);
chk('EN btn Beta57A $159', en.indexOf('$159.00')>-1);
chk('EN btn M201 $349.99', en.indexOf('$349.99')>-1);
chk('EN verdict M201 ref', en.indexOf('M 201 TG is the isolation reference')>-1);
console.log('done');
