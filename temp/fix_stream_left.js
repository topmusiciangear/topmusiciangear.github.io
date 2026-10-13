var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='stream-controllers';});
var F=g.featuredSnippet;
F.faq_a2_en='For most streamers, yes. The Streamer X replaces a separate interface, capture card and stream deck for less money, and its 76dB Revolution preamp drives demanding mics like the SM7B without a booster. The weak spot is the UNIFY software, which can be unstable upon reboots and requires precise power-cycling. If you stream from a console or single PC on a budget, it is excellent value; if you run a complex dual-PC setup and need software that never flinches, the Elgato ecosystem is more reliable.';
F.faq_a2_es='Para la mayoría de streamers, sí. El Streamer X sustituye a una interfaz, una tarjeta capturadora y un stream deck separados por menos dinero, y su previo Revolution de 76dB mueve micrófonos exigentes como el SM7B sin booster. La contrapartida honesta es el software UNIFY, que puede volverse inestable al reiniciar y requiere ciclos de encendido precisos. Si transmites desde una consola o un solo PC con presupuesto ajustado, es una compra excelente; si montas una configuración compleja de doble PC y necesitas un software que nunca parpadee, el ecosistema Elgato es más fiable.';
var sx=g.sections.find(function(s){return (s.products||[]).indexOf(244)>-1;});
if(sx){
  sx.content_es=sx.content_es.replace('el ecosistema Elgato o BEACN es más fiable','el ecosistema Elgato es más fiable');
  sx.content_es=sx.content_es.replace('los ecosistemas Elgato BEACN son la apuesta más segura','el ecosistema Elgato es la apuesta más segura');
  console.log('sx fixed: '+(sx.content_es.indexOf('BEACN')===-1?'clean':'STILL HAS BEACN'));
}
fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('DONE');