var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='best-live-sound-mixers';});

// titleTag_es -> full suffix (build appends (2026) only if no year present)
g.titleTag_es='Mejores mezcladores de sonido en vivo para bandas y eventos (pros, contras y guía de compra 2026)';

// descriptions
g.description='Best live sound mixers 2026. Yamaha MG16XU vs Behringer X32 Compact vs Allen & Heath SQ-5, plus Bose T8S, Yamaha DM3S and Soundcraft Ui24R. Read the full verdict & prices before you buy.';
g.description_es='Mejores mezcladores de sonido en vivo 2026. X32 Compact versátil, MG16XU para bandas, SQ-5 gira profesional, más Bose T8S, Yamaha DM3S y Soundcraft Ui24R. Lee el veredicto completo y los precios antes de comprar.';

// MG16XU section: drop MG10XU references
var s16=g.sections.find(function(s){return (s.products||[]).indexOf(149)>-1 && (s.products||[]).length===1;});
if(s16){
  s16.content=s16.content.replace('If you want more channels than the compact MG10XU without jumping to digital,','If you want real channel counts without jumping to digital,');
  s16.content=s16.content.replace('it offers the same D-PRE preamp quality as the MG10XU but with 16 channels,','it offers Yamaha D-PRE preamp quality across 16 channels,');
  s16.content_es=s16.content_es.replace('Si quieres más canales que el MG10XU compacto sin saltar a lo digital,','Si quieres canales de verdad sin saltar a lo digital,');
  s16.content_es=s16.content_es.replace('ofrece la misma calidad de previolificador D-PRE que el MG10XU pero con 16 canales,','ofrece calidad D-PRE de Yamaha en 16 canales,');
}

// FAQ a4/a5 EN+ES
var F=g.featuredSnippet;
F.faq_a4_en='For small, simple gigs where you want knob-per-function reliability, analog (like the MG16XU) is ideal. For recall, scene memory, motorized faders, and deep processing, digital (like the X32 Compact or SQ-5) wins. The X32 Compact gives you 40 inputs, 17 faders, and effects in one unit. Choose based on your channel count and whether you need to recall previous shows.';
F.faq_a5_en='Count every input: each vocal mic, instrument DI, and stereo source. A 5-piece band usually needs 12-16 channels. The Yamaha MG16XU (16) covers full small bands; the X32 Compact (40) and SQ-5 (48) handle full bands with plenty of headroom. Rule of thumb: add a third more channels than you think you need today.';
F.faq_a4_es='Para conciertos pequeños y simples, donde valoras la fiabilidad y el control directo de una perilla por función, el analógico (como la MG16XU) es ideal. Para recall, memoria de escenas, faders motorizados y procesamiento profundo, gana el digital (como la X32 Compact o SQ-5). La X32 Compact te da 40 entradas, 17 faders y efectos en una unidad. Elige según tu número de canales y si necesitas recuperar shows anteriores.';
F.faq_a5_es='Cuenta cada entrada: cada micrófono de voz, DI de instrumento y fuente estéreo. Una banda de 5 miembros suele necesitar 12-16 canales. El Yamaha MG16XU (16) cubre bandas pequeñas completas; el X32 Compact (40) y el SQ-5 (48) manejan bandas completas con canales de sobra. Como regla general, añade un tercio más de canales de los que crees necesitar hoy.';

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('cleanup done');