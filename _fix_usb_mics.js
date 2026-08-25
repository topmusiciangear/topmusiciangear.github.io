var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

// === FIX usb-mics ===
var g = guides.find(function(x) { return x.id === 'usb-mics'; });
if (!g) { console.log('usb-mics NOT FOUND'); process.exit(1); }

// Remove first 3 sections (XLR comparison, SM7B, RE20)
g.sections = g.sections.filter(function(s, i) { return i >= 3; });

// Fix MV7+ section heading
g.sections[0].heading = 'Is the Shure MV7+ the Best USB Microphone for Streaming?';
g.sections[0].heading_es = '\u00bfEs el Shure MV7+ el Mejor Micr\u00f3fono USB para Streaming?';
g.sections[0].content = g.sections[0].content.replace(/the same warm Shure voice over USB-C, XLR, or both, with built-in DSP/g, 'the same warm Shure voice over USB-C with built-in DSP');
g.sections[0].content = g.sections[0].content.replace(/Its hybrid connectivity means you can plug it straight into your PC today and switch to an interface or mixer later without buying a new mic/g, 'Its USB-C connectivity means you plug straight into your PC with no interface needed');
g.sections[0].content_es = g.sections[0].content_es.replace(/la misma voz c\u00e1lida de Shure por USB-C, XLR o ambos, con DSP integrado/g, 'la misma voz c\u00e1lida de Shure por USB-C con DSP integrado');
g.sections[0].content_es = g.sections[0].content_es.replace(/Su conectividad h\u00edbrida significa que puedes conectarlo directamente a tu PC hoy y pasarlo a una interfaz o mezclador mañana sin comprar un mic nuevo/g, 'Su conectividad USB-C significa que conectas directo a tu PC sin necesidad de interfaz');

// Fix NT1 section - remove XLR mention
g.sections[4].content = g.sections[4].content.replace(/or through XLR into an interface later/g, 'today with zero extra gear');
g.sections[4].content_es = g.sections[4].content_es.replace(/o por XLR a trav\u00e9s de una interfaz ma\u00f1ana/g, 'hoy sin equipo extra');

// Update featuredProducts - remove 1 and 52
g.featuredProducts = g.featuredProducts.filter(function(id) { return id !== 1 && id !== 52; });

// Update conclusion
g.conclusion = 'The best USB stream mic is the one that fits your room and your setup today. If you want the iconic Shure broadcast voice with a single USB cable and no gain issues, get the MV7+. If your room is quiet and you want detailed condenser sound with free mixing software, get the Wave:3. If you want a budget dynamic that kills background noise, get the AT2040USB. If you want the most complete plug-and-play package with hardware controls, get the Profile Streaming Set. And if you want maximum vocal detail for singing or ASMR and your room is treated, the NT1 5th Generation delivers. Every one of these five is a professional, stream-ready USB microphone \u2014 start with the one that matches your workflow. <p>You may also like: <a href="/guides/best-microphone.html">Best Microphone for Vocals & Home Recording</a> <a href="/guides/budget-mics.html">Best Budget Microphones </a> <a href="/guides/best-mic-for-podcasting.html">Best Podcast Mic</a>.</p>';
g.conclusion_es = 'El mejor micr\u00f3fono USB para streaming es el que encaja con tu habitaci\u00f3n y tu configuraci\u00f3n de hoy. Si quieres la ic\u00f3nica voz de broadcast de Shure con un solo cable USB y sin problemas de ganancia, elige el MV7+. Si tu habitaci\u00f3n es silenciosa y quieres sonido de condensador detallado con software de mezcla gratuito, elige el Wave:3. Si quieres un din\u00e1mico econ\u00f3mico que elimine el ruido de fondo, elige el AT2040USB. Si quieres el paquete plug-and-play m\u00e1s completo con controles f\u00edsicos, elige el Profile Streaming Set. Y si quieres el m\u00e1ximo detalle vocal para cantar o ASMR y tu habitaci\u00f3n est\u00e1 tratada, el NT1 5th Generation cumple. Cada uno de estos cinco es un micr\u00f3fono USB profesional listo para directo \u2014 empieza con el que coincida con tu flujo de trabajo. <p>Tambi\u00e9n te puede interesar: <a href="/guides/best-microphone_es.html">Mejor Micr\u00f3fono para Voces y Grabaci\u00f3n Casera</a> <a href="/guides/budget-mics_es.html">Mejores Micr\u00f3fonos Econ\u00f3micos</a> <a href="/guides/best-mic-for-podcasting_es.html">Mejor Micr\u00f3fono para Podcast</a>.</p>';

// Update description
g.description = 'Best USB microphones for streaming 2026. Shure MV7+, Elgato Wave:3, AT2040USB, Sennheiser Profile Streaming Set & Rode NT1 5th Gen tested. USB dynamic vs condenser, which stream mic fits your room.';

// Update featuredSnippet
g.featuredSnippet.text_en = 'The Shure MV7+ is the streamer-friendly version of the SM7B: the same warm Shure voice over USB-C with built-in DSP. It is a dynamic microphone with the familiar SM7B family tone, but it adds a headphone output with zero-latency monitoring, a touch screen for quick level checks, and real-time auto level mode that rides your gain while you talk.';
g.featuredSnippet.text_es = 'El Shure MV7+ es la versi\u00f3n del SM7B pensada para streamers: la misma voz c\u00e1lida de Shure por USB-C con DSP integrado. Es un micr\u00f3fono din\u00e1mico con el tono familiar de la familia SM7B, pero a\u00f1ade una salida de auriculares con monitorizaci\u00f3n de latencia cero, una pantalla t\u00e1ctil para comprobar niveles al instante, y un modo de nivel autom\u00e1tico en tiempo real que ajusta tu ganancia mientras hablas.';

// Fix FAQ 4 - remove SM7B reference
g.featuredSnippet.faq_a4_en = 'A dynamic USB microphone like the Shure MV7+ or the Audio-Technica AT2040USB. Dynamic mics reject background noise much better than condenser mics, so keyboard clicks, fans, and street noise stay out of your stream or podcast. Condensers like the Elgato Wave:3 sound more detailed but capture the room \u2014 you would want some acoustic treatment first.';
g.featuredSnippet.faq_a4_es = 'Un micr\u00f3fono din\u00e1mico USB como el Shure MV7+ o el Audio-Technica AT2040USB. Los din\u00e1micos rechazan el ruido de fondo mucho mejor que los de condensador, as\u00ed que los clics del teclado, ventiladores y ruido de la calle no entran en tu stream o podcast. Los de condensador como el Elgato Wave:3 suenan m\u00e1s detallados pero capturan la sala \u2014 necesitar\u00edas algo de tratamiento ac\u00f3stico antes.';

// Fix FAQ 5 - remove XLR mention
g.featuredSnippet.faq_a5_en = 'Only if the mic has a built-in input or loopback routing. Most single USB mics record one source. The Rode NT1 5th Generation is a great choice if you want studio-quality detail, because it captures more nuance and air than a dynamic. For true multi-track simultaneous recording, you would need an interface or two USB mics on separate channels.';
g.featuredSnippet.faq_a5_es = 'Solo si el micr\u00f3fono tiene una entrada integrada o enrutamiento de loopback. La mayor\u00eda de los micr\u00f3fonos USB individuales graban una fuente. El Rode NT1 5th Generation es una excelente opci\u00f3n si quieres calidad de estudio, porque captura m\u00e1s matiz y aire que un din\u00e1mico. Para grabaci\u00f3n multipista simult\u00e1nea real, necesitar\u00edas una interfaz o dos micr\u00f3fonos USB en canales separados.';

// Remove re20-vs-sm7b from relatedGuides
g.relatedGuides = g.relatedGuides.filter(function(id) { return id !== 're20-vs-sm7b'; });

console.log('usb-mics updated: sections=' + g.sections.length + ' products=' + JSON.stringify(g.featuredProducts));

// === ADD RE20 to best-mic-for-podcasting ===
var pod = guides.find(function(x) { return x.id === 'best-mic-for-podcasting'; });
if (pod && pod.featuredProducts.indexOf(52) === -1) {
  pod.featuredProducts.push(52);
  console.log('best-mic-for-podcasting: added RE20 (52), now=' + JSON.stringify(pod.featuredProducts));
}

// === ADD RE20 to best-mic-for-guitar-amps ===
var ga = guides.find(function(x) { return x.id === 'best-mic-for-guitar-amps'; });
if (ga && ga.featuredProducts.indexOf(52) === -1) {
  ga.featuredProducts.push(52);
  console.log('best-mic-for-guitar-amps: added RE20 (52), now=' + JSON.stringify(ga.featuredProducts));
}

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2) + '\n');
console.log('Done!');
