var fs=require('fs');
var gc=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=gc.find(x=>x.id==='budget-mics');
var fs2=g.featuredSnippet;

// Fix truncated FAQ questions
fs2.faq_q5_en='Do I need a condenser or a dynamic mic for vocals?';
fs2.faq_q5_es='¿Necesito un micrófono de condensador o dinámico para voces?';
fs2.faq_q7_en='What is the best budget XLR microphone?';
fs2.faq_q7_es='¿Cuál es el mejor micrófono XLR económico?';
fs2.faq_q8_en='What is the best budget XLR microphone under $100?';
fs2.faq_q8_es='¿Cuál es el mejor micrófono XLR económico por menos de $100?';

// Fix truncated FAQ answers
fs2.faq_a5_en='It depends on your room. In a treated or naturally dead room, a large-diaphragm condenser like the AT2020 captures the detail and air vocals need. In an untreated room with traffic noise, fan hum or echo, a dynamic like the SM58 or PodMic rejects background noise far better and you will get cleaner takes without needing acoustic treatment.';
fs2.faq_a5_es='Depende de tu habitación. En una sala tratada o naturalmente muerta, un condensador de diafragma grande como el AT2020 captura el detalle y el aire que las voces necesitan. En una habitación sin tratamiento con ruido de tráfico, zumbido de ventilador o eco, un dinámico como el SM58 o el PodMic rechaza el ruido de fondo mucho mejor y obtendrás tomas más limpias sin necesitar tratamiento acústico.';
fs2.faq_a7_en='Five mics in this guide sit under $100. The Behringer XM8500 at $29 is the absolute floor and gets you most of an SM58. The Samson Q2U at $70 adds USB-C plus XLR with all accessories included. The HyperX SoloCast at $45 and Razer Seiren V3 Mini at $60 are USB condensers for streaming. The Fifine K669D at $40 is the cheapest XLR dynamic with surprising build quality.';
fs2.faq_a7_es='Cinco micrófonos de esta guía cuestan menos de $100. El Behringer XM8500 a $29 es el mínimo absoluto y te da casi todo un SM58. El Samson Q2U a $70 añade USB-C más XLR con todos los accesorios incluidos. El HyperX SoloCast a $45 y el Razer Seiren V3 Mini a $60 son condensadores USB para streaming. El Fifine K669D a $40 es el dinámico XLR más barato con una calidad de construcción sorprendente.';
fs2.faq_a9_en='Yes — at $29 it is the best ultra-budget XLR microphone you can buy. The XM8500 is a cardioid dynamic with a strong presence rise that delivers most of an SM58 character for a quarter of the price. It is not as indestructible as the Shure and the capsule is less refined, but for home recording, podcasting and learning the ropes it is unbeatable value.';
fs2.faq_a9_es='Sí — a $29 es el mejor micrófono XLR ultra-económico que puedes comprar. El XM8500 es un dinámico cardioide con un fuerte realce de presencia que ofrece la mayor parte del carácter de un SM58 por una cuarta parte del precio. No es tan indestructible como el Shure y la cápsula es menos refinada, pero para grabación casera, podcasting y aprender las bases, su relación calidad-precio es inigualable.';

// Fix conclusion
g.conclusion = g.conclusion.replace(/19 micros/g,'23 microphones').replace(/19 mics/g,'23 mics').replace(/These 19/g,'These 23');
if(g.conclusion_es) {
  g.conclusion_es = g.conclusion_es.replace(/19 mejores/g,'23 mejores').replace(/19 micros/g,'23 micros').replace(/Estos 19/g,'Estos 23').replace(/los 19/g,'los 23');
}

// Check all keys for remaining '19' references in featuredSnippet
Object.keys(fs2).forEach(k=>{
  if(typeof fs2[k]==='string' && fs2[k].includes('19') && !k.includes('faq_q9') && !k.includes('faq_a9')) console.log('Still has 19:', k, '=', fs2[k].substring(0,120));
});
console.log('conclusion has 19:', g.conclusion.includes('19'));
console.log('conclusion_es has 19:', g.conclusion_es && g.conclusion_es.includes('19'));

// Check intro for 19
if(g.intro && g.intro.includes('19')) console.log('intro has 19');
if(g.intro_es && g.intro_es.includes('19')) console.log('intro_es has 19');
if(g.description && g.description.includes('19')) console.log('description has 19');
if(g.description_es && g.description_es.includes('19')) console.log('description_es has 19');
if(g.title && g.title.includes('19')) console.log('title has 19');
if(g.title_es && g.title_es.includes('19')) console.log('title_es has 19');

fs.writeFileSync('data/guides.json', JSON.stringify(gc,null,2));
console.log('Done');
