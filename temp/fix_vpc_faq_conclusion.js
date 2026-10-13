var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// 9 current products (table + featuredProducts)
var currentIds = [194, 195, 286, 299, 3, 666, 670, 252, 291];
var currentNames = {
  194: 'Shure MV7+',
  195: 'Elgato Wave:3',
  286: 'Audio-Technica AT2040USB',
  299: 'Sennheiser Profile Streaming Set',
  3: 'Rode NT1 5th Generation',
  666: 'Rode NT-USB+',
  670: 'sE Electronics NEOM USB',
  252: 'Razer Seiren V3 Pro',
  291: 'Samson G-Track Pro'
};

// ==========================================
// 1. VERDICT PROS/CONS - keep only 9 current products
// ==========================================
var newVPC = currentIds.map(function(id) {
  var name = currentNames[id];
  // Try to find existing VPC for this product
  var existing = g.verdictProsCons.find(function(v) { return v.name === name; });
  if (existing) return existing;
  // Generate minimal VPC if not found
  return {
    name: name,
    name_es: name,
    pros: ['Ver especificaciones en la tabla comparativa'],
    pros_es: ['Ver especificaciones en la tabla comparativa'],
    cons: ['Ver especificaciones en la tabla comparativa'],
    cons_es: ['Ver especificaciones en la tabla comparativa']
  };
});
g.verdictProsCons = newVPC;

// ==========================================
// 2. UPDATE CONCLUSION - reference all 9 products
// ==========================================
g.conclusion = 'The best USB stream mic is the one that fits your room and your setup today. ' +
  'If you want the characteristic Shure broadcast sound with a single USB cable and no gain issues, get the <strong>Shure MV7+</strong>. ' +
  'If your room is quiet and you want detailed condenser sound with free mixing software, get the <strong>Elgato Wave:3</strong>. ' +
  'If you want a budget dynamic that reduces background noise, get the <strong>Audio-Technica AT2040USB</strong>. ' +
  'If you want the most complete plug-and-play package with hardware controls, get the <strong>Sennheiser Profile Streaming Set</strong>. ' +
  'And if you want maximum vocal detail for singing or ASMR and your room is treated, the <strong>Rode NT1 5th Generation</strong> delivers. ' +
  'For streamers upgrading from the classic Yeti, the <strong>Rode NT-USB+</strong> brings internal APHEX DSP and 24-bit/48kHz conversion. ' +
  'If you need hardware mixer control without a separate interface — independent Gain, Headphone Volume, and Playback Mix knobs — the <strong>sE Electronics NEOM USB</strong> is the missing link. ' +
  'For high sample-rate condenser detail up to 192kHz, the <strong>Razer Seiren V3 Pro</strong> delivers. ' +
  'And for the ultimate desktop versatility with a built-in 2-in/2-out interface, the <strong>Samson G-Track Pro</strong> is unmatched. ' +
  'Every one of these nine is a professional, stream-ready USB microphone — start with the one that matches your workflow. ' +
  '<p><a href="/guides/best-microphone.html" class="guide-link-btn">Best Microphone for Vocals & Home Recording</a> ' +
  '<a href="/guides/budget-mics.html" class="guide-link-btn">Best Budget Microphones</a> ' +
  '<a href="/guides/best-mic-for-podcasting.html" class="guide-link-btn">Best Podcast Mic</a></p>';

g.conclusion_es = 'El mejor micrófono USB para streaming es el que se ajuste a tu habitación y a tu forma de trabajar. ' +
  'Si quieres la voz de broadcast de Shure con un solo cable USB y sin problemas de ganancia, ve por el <strong>Shure MV7+</strong>. ' +
  'Si tu habitación es tranquila y quieres un sonido de condensador detallado con software de mezcla gratuito, el <strong>Elgato Wave:3</strong>. ' +
  'Si necesitas un dinámico que corte el ruido de fondo, el <strong>Audio-Technica AT2040USB</strong>. ' +
  'Si quieres el paquete conectar y usar más completo con controles físicos, el <strong>Sennheiser Profile Streaming Set</strong>. ' +
  'Y si buscas el máximo detalle vocal para cantar o ASMR y tu espacio tiene tratamiento, el <strong>Rode NT1 5th Generation</strong> cumple. ' +
  'Para streamers que vienen del Yeti clásico, el <strong>Rode NT-USB+</strong> aporta DSP APHEX interno y conversión 24-bit/48kHz. ' +
  'Si necesitas control de mezclador en hardware sin interfaz aparte — perillas independientes de Ganancia, Volumen de Auriculares y Mezcla de Reproducción — el <strong>sE Electronics NEOM USB</strong> es el eslabón perdido. ' +
  'Para detalle de condensador a alta tasa de muestreo hasta 192kHz, el <strong>Razer Seiren V3 Pro</strong> entrega. ' +
  'Y para la máxima versatilidad de escritorio con interfaz 2-in/2-out integrada, el <strong>Samson G-Track Pro</strong> no tiene rival. ' +
  'Los nueve son micrófonos USB profesionales, listos para streaming — empieza con el que mejor se adapte a tu equipo. ' +
  '<p><a href="/guides/best-microphone_es.html" class="guide-link-btn">Mejor Micrófono para Voces y Grabación Casera</a> ' +
  '<a href="/guides/budget-mics_es.html" class="guide-link-btn">Mejores Micrófonos Económicos</a> ' +
  '<a href="/guides/best-mic-for-podcasting_es.html" class="guide-link-btn">Mejor Micrófono para Podcast</a></p>';

// ==========================================
// 3. UPDATE FAQS - reference current products only
// ==========================================
var F = g.featuredSnippet;

F.faq_q1_en = 'Which is the best USB microphone for streaming in 2026?';
F.faq_a1_en = 'It depends on your setup. The <strong>Shure MV7+</strong> is best for broadcast-style voice with auto-level and XLR backup. The <strong>Elgato Wave:3</strong> wins for software mixing via Wave Link. The <strong>Audio-Technica AT2040USB</strong> is the best budget dynamic for noisy rooms. The <strong>Sennheiser Profile Streaming Set</strong> is the most complete plug-and-play kit with hardware controls. The <strong>Rode NT1 5th Generation</strong> gives the cleanest condenser vocal detail. The <strong>Rode NT-USB+</strong> upgrades the classic Yeti with internal APHEX DSP. The <strong>sE Electronics NEOM USB</strong> adds hardware mixer controls (Gain, Headphone, Playback Mix) without a separate interface. The <strong>Razer Seiren V3 Pro</strong> reaches 192kHz sample rate. The <strong>Samson G-Track Pro</strong> includes a built-in 2-in/2-out audio interface.';

F.faq_q1_es = '¿Cuál es el mejor micrófono USB para streaming en 2026?';
F.faq_a1_es = 'Depende de tu setup. El <strong>Shure MV7+</strong> es el mejor para voz broadcast con auto-nivel y respaldo XLR. El <strong>Elgato Wave:3</strong> gana por mezcla por software con Wave Link. El <strong>Audio-Technica AT2040USB</strong> es el mejor dinámico económico para habitaciones ruidosas. El <strong>Sennheiser Profile Streaming Set</strong> es el kit conectar-y-usar más completo con controles físicos. El <strong>Rode NT1 5th Generation</strong> da el detalle vocal de condensador más limpio. El <strong>Rode NT-USB+</strong> mejora el Yeti clásico con DSP APHEX interno. El <strong>sE Electronics NEOM USB</strong> añade controles de mezclador en hardware (Ganancia, Auriculares, Mezcla Playback) sin interfaz aparte. El <strong>Razer Seiren V3 Pro</strong> alcanza 192kHz de tasa de muestreo. El <strong>Samson G-Track Pro</strong> incluye interfaz 2-in/2-out integrada.';

F.faq_q2_en = 'Which USB microphone is best for a noisy room?';
F.faq_a2_en = 'Dynamic mics reject room noise better than condensers. The <strong>Shure MV7+</strong> and <strong>Audio-Technica AT2040USB</strong> are the top picks — both are dynamics with tight polar patterns. The <strong>sE Electronics NEOM USB</strong> is a condenser but its cardioid capsule and high gain headroom help in untreated spaces.';

F.faq_a2_es = 'Los micrófonos dinámicos rechazan el ruido de la sala mejor que los condensadores. El <strong>Shure MV7+</strong> y el <strong>Audio-Technica AT2040USB</strong> son las mejores opciones — ambos son dinámicos con patrones polares cerrados. El <strong>sE Electronics NEOM USB</strong> es un condensador pero su cápsula cardioide y alto margen de ganancia ayudan en espacios sin tratar.';

F.faq_q3_en = 'Which USB microphone has the best hardware controls?';
F.faq_a3_en = 'The <strong>Sennheiser Profile Streaming Set</strong> has physical gain, mix, and headphone knobs plus a mute button with LED ring. The <strong>sE Electronics NEOM USB</strong> goes further with three independent analog knobs: Gain, Headphone Volume, and Playback Mix (balancing mic vs PC audio). The <strong>Rode NT-USB+</strong> has gain and headphone volume. The <strong>Samson G-Track Pro</strong> adds instrument input gain and monitor mix.';

F.faq_a3_es = 'El <strong>Sennheiser Profile Streaming Set</strong> tiene perillas físicas de ganancia, mezcla y auriculares más botón de mute con anillo LED. El <strong>sE Electronics NEOM USB</strong> va más allá con tres perillas analógicas independientes: Ganancia, Volumen de Auriculares y Mezcla de Reproducción (balancea micro vs audio del PC). El <strong>Rode NT-USB+</strong> tiene ganancia y volumen de auriculares. El <strong>Samson G-Track Pro</strong> añade ganancia de instrumento y mezcla de monitoreo.';

F.faq_q4_en = 'Can I use these microphones with a boom arm?';
F.faq_a4_en = 'Yes. All nine microphones have standard 5/8-inch threading (or include a 3/8-to-5/8 adapter) and work with any standard boom arm. The <strong>Samson G-Track Pro</strong> and <strong>sE Electronics NEOM USB</strong> include sturdy metal desktop stands that also mount on boom arms.';

F.faq_a4_es = 'Sí. Los nueve micrófonos tienen rosca estándar de 5/8 pulgadas (o incluyen adaptador 3/8-a-5/8) y funcionan con cualquier brazo articulado estándar. El <strong>Samson G-Track Pro</strong> y el <strong>sE Electronics NEOM USB</strong> incluyen soportes metálicos de escritorio que también se montan en brazos.';

F.faq_q5_en = 'Which is best for podcasting vs streaming?';
F.faq_a5_en = 'For podcasting (voice clarity, multi-track recording): <strong>Shure MV7+</strong>, <strong>Rode NT1 5th Generation</strong>, <strong>Rode NT-USB+</strong>. For streaming (hardware controls, low latency, gaming features): <strong>Sennheiser Profile Streaming Set</strong>, <strong>sE Electronics NEOM USB</strong>, <strong>Razer Seiren V3 Pro</strong>. The <strong>Samson G-Track Pro</strong> bridges both with its built-in interface for instruments.';

F.faq_a5_es = 'Para podcasting (claridad vocal, grabación multi-pista): <strong>Shure MV7+</strong>, <strong>Rode NT1 5th Generation</strong>, <strong>Rode NT-USB+</strong>. Para streaming (controles en hardware, baja latencia, funciones gaming): <strong>Sennheiser Profile Streaming Set</strong>, <strong>sE Electronics NEOM USB</strong>, <strong>Razer Seiren V3 Pro</strong>. El <strong>Samson G-Track Pro</strong> une ambos mundos con su interfaz integrada para instrumentos.';

// Spanish FAQs already updated above

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('VPC updated to 9 products');
console.log('Conclusion updated');
console.log('FAQs updated');