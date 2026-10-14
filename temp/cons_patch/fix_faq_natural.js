var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=A.find(x=>x.id==='premium-interfaces');
// Fix FAQ 0 - most complained
g.faq[0].q_es='Voy a renovar la interfaz principal del estudio — ¿me meto en el ecosistema UAD o apuesto por la fiabilidad legendaria de RME?';
g.faq[0].a_es='Si tu día a día son los plugins UAD, Apollo tiene todo el sentido; si lo que buscas es estabilidad blindada con drivers que no fallan y grabar sin ordenador durante años, el Fireface gana de largo.';
// Make other Spanish answers more natural, not word-for-word
g.faq[1].q_es='¿Cuál convence más: la Apollo x8p Gen 2 o la Fireface UFX III?';
g.faq[1].a_es='La Apollo x8p Gen 2 brilla por su flujo UAD y la emulación Unison con 167 dB de rango; la Fireface UFX III lo hace por unos drivers a prueba de fallos, el ruteo TotalMix y la grabación autónoma DURec con MADI de 188 canales.';
g.faq[3].a_es='No. La Apollo x8p Gen 2 funciona como interfaz estándar sin plugins UAD. Su gracia está en poder grabar con previos Unison y procesar en tiempo real con latencia casi nula a través de emulaciones de compresores y ecualizadores clásicos. Sin UAD sigue siendo un gran conversor, pero pierde lo que la hace distinta.';
g.faq[4].q_es='¿Hace falta Thunderbolt o con USB voy bien para una interfaz pro?';
g.faq[4].a_es='Con USB vas sobrado en la mayoría de casos. Interfaces modernas como la Fireface UFX III dan latencia mínima y E/S multicanal estable tanto por USB como por USB-C/Thunderbolt. Thunderbolt solo se nota de verdad con muchos canales y búfer muy bajo en macOS y con el DSP de Apollo. Para una banda de menos de 16 canales, USB va fino.';

// Also fix featuredSnippet FAQ first entry same as faq[0]
if(g.featuredSnippet){
  g.featuredSnippet.faq_q1_es='Voy a renovar la interfaz principal del estudio — ¿apuesto por UAD o por la fiabilidad de RME?';
  g.featuredSnippet.faq_a1_es='Si trabajas con plugins UAD a diario, Apollo; si buscas drivers blindados y grabación autónoma que aguante años, el Fireface es la elección segura.';
}
fs.writeFileSync('data/guides.json', JSON.stringify(A,null,2),'utf8');
console.log('fixed faq natural');
