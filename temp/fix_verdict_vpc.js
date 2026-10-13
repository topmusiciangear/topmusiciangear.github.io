var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';

var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='streaming-interfaces';});

// Remove verdictProsCons for MiniFuse, Apollo, iD14, and Maono (replaced by Zoom)
g.verdictProsCons=g.verdictProsCons.filter(function(v){
  return !['Arturia MiniFuse 2 OTG','Universal Audio Apollo Twin X Gen 2','Audient iD14 MkII','Maono Maonocaster E2 Gen2'].includes(v.name);
});

console.log('verdictProsCons after filter:',g.verdictProsCons.length);
g.verdictProsCons.forEach(function(v){console.log(' - ',v.name);});

// Add Zoom PodTrak P4next to verdictProsCons
function vpc(n,ne,p,c,pe,ce){return{name:n,name_es:ne,pros:p,cons:c,pros_es:pe,cons_es:ce};}
if(!g.verdictProsCons.find(function(v){return v.name==='Zoom PodTrak P4next';})){
  g.verdictProsCons.push(
    vpc('Zoom PodTrak P4next','Zoom PodTrak P4next',
      ['Portable recorder with 4 XLR inputs up to 70dB gain','4 independent headphone outputs with volume controls','Records to microSD without a computer','6 sound pads + tactile faders for live production','Loopback and TRRS call-in for remote guests','Runs on AA batteries or USB-C power'],
      ['Max 48kHz/24-bit, no 32-bit float','Small screen for deep menu navigation','Plastic build feels light','No video capture or HDMI'],
      ['Grabadora portátil con 4 entradas XLR hasta 70dB de ganancia','4 salidas de auriculares independientes con control de volumen','Graba a microSD sin ordenador','6 pads de sonido + faders táctiles para directo','Loopback y llamada TRRS para invitados remotos','Funciona con pilas AA o alimentación USB-C'],
      ['Máximo 48kHz/24-bit, sin 32-bit float','Pantalla pequeña para menús profundos','Construcción de plástico ligera','Sin captura de vídeo ni HDMI']
    )
  );
}

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('verdictProsCons updated, count:',g.verdictProsCons.length);
g.verdictProsCons.forEach(function(v){console.log(' - ',v.name);});
console.log('DONE');