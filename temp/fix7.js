var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var p=BASE+'data/guides.json';
var d=JSON.parse(fs.readFileSync(p,'utf8'));
var mon=d.find(function(x){return x.id==='monitor-setup'});
var S=mon.sections;
var fails=[];
function repOnce(s,a,b,tag){
  if(s.indexOf(a)===-1){fails.push(tag+' ANCHOR MISSING');return s;}
  return s.split(a).join(b);
}
var hit=false;
['intro_es','conclusion_es','verdict_es'].forEach(function(f){
  if(mon[f]&&mon[f].indexOf('supera un par perfecto')>-1){mon[f]=mon[f].split('supera un par perfecto').join('supera a un par perfecto');hit=true;}
});
S.forEach(function(s){
  if(s.content_es&&s.content_es.indexOf('supera un par perfecto')>-1){s.content_es=s.content_es.split('supera un par perfecto').join('supera a un par perfecto');hit=true;}
});
if(!hit)fails.push('F1 ANCHOR MISSING');
S[1].content_es=repOnce(S[1].content_es,'Dos interruptores traseros son la primera','Dos selectores traseros son la primera','F2a');
S[1].content_es=repOnce(S[1].content_es,'baja a 38 Hz','baja hasta los 38 Hz','F2b');
S[2].content_es=repOnce(S[2].content_es,'mueve menos aire que un HS8 de 8','mueve menos aire que el de 8 del HS8','F3a');
S[2].content_es=repOnce(S[2].content_es,'cualquier rival con puerto trasero peleando contra el límite','cualquier rival con puerto trasero que pelee contra el límite','F3b');
S[3].content_es=repOnce(S[3].content_es,'Cada Soportes de Monitor K&M 26722 (Unidad) se vende por unidad','Cada soporte de monitor K&M 26722 se vende por unidad','F4');
S[4].content_es=repOnce(S[4].content_es,'con inclinación hasta 6,5 grados','con una inclinación de hasta 6,5 grados','F5a');
S[4].content_es=repOnce(S[4].content_es,'el par cuesta dinero de verdad','el par, cuestan dinero de verdad','F5b');
S[5].content_es=repOnce(S[5].content_es,'Mueve REW, Sonarworks y Dirac por igual — los oídos honestos más baratos que tu sala verá jamás.','Funciona con REW, Sonarworks y Dirac por igual: la herramienta de medición más honesta y barata que verá tu sala.','F6');
S[6].content_es=repOnce(S[6].content_es,'¿Tienes SAM? GLM. ¿Sin dinero? MoPADs. ¿Mueves tres vías de 15 kg? MS-100.','¿Tienes un sistema SAM? GLM. ¿Poco presupuesto? MoPADs. ¿Cargas con monitores de tres vías de 15 kg? MS-100.','F7');
if(fails.length){console.log('FAILURES:\n'+fails.join('\n'));process.exit(1);}
fs.writeFileSync(p,JSON.stringify(d,null,2));
console.log('7 fixes applied and SAVED');
