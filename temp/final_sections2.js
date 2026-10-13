var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// 9 product IDs from the table (in order)
var tableIds = [194, 195, 286, 299, 3, 666, 253, 252, 291];

// Current sections (6): 0=MV7+, 1=Wave:3, 2=AT2040USB, 3=Profile, 4=NT1, 5=Q2U
// Need: 9 sections, one per table product
// Remove Q2U section (index 5)
g.sections.splice(5, 1);

// Now we have 5 sections (0-4). Add 4 new sections for remaining table products:
// index 5: NT-USB+ (666)
// index 6: QuadCast S (253)
// index 7: Seiren V3 Pro (252)
// index 8: G-Track Pro (291)

g.sections[0].products = [194];
g.sections[1].products = [195];
g.sections[2].products = [286];
g.sections[3].products = [299];
g.sections[4].products = [3];

var newSections = [
  {
    heading: 'Rode NT-USB+: The Modern Yeti Upgrade',
    heading_es: 'Rode NT-USB+: La actualización moderna del Yeti',
    content: '<p><strong>The Rode NT-USB+ is the direct successor to the classic Yeti line for streamers who want better sound without a mixer.</strong> It moves the preamp and DSP inside the mic: a Revolution preamp with APHEX processing (Aural Exciter, Big Bottom, Compellor) runs on the hardware, so your voice sounds broadcast-ready without software plugins. 24-bit/48kHz conversion, zero-latency headphone output, built-in pop filter, and a desktop tripod with ring mount are all in the box. It replaces the Yeti and Yeti X in our table because it solves the same "one cable, great sound" problem with cleaner internals and no driver fuss.</p>',
    content_es: '<p><strong>El Rode NT-USB+ es el sucesor directo de la línea Yeti clásica para streamers que quieren mejor sonido sin mezcladora.</strong> Mueve el preamplificador y el DSP dentro del micro: un preamplificador Revolution con procesamiento APHEX (Aural Exciter, Big Bottom, Compellor) corre en el hardware, así que tu voz suena lista para broadcast sin plugins de software. Conversión 24-bit/48kHz, salida de auriculares sin latencia, filtro antipop integrado y trípode de escritorio con anillo de montaje vienen en la caja. Reemplaza al Yeti y Yeti X en nuestra tabla porque resuelve el mismo problema "un cable, gran sonido" con internals más limpios y sin líos de drivers.</p>',
    products: [666]
  },
  {
    heading: 'HyperX QuadCast S: RGB Gaming Stream Mic',
    heading_es: 'HyperX QuadCast S: Micrófono gaming RGB para streaming',
    content: '<p><strong>The HyperX QuadCast S is a USB condenser built for the camera-aware streamer.</strong> Integrated shock mount, pop filter, tap-to-mute with LED status ring, and RGB lighting make it a desktop centerpiece. 24-bit/96kHz capture, headphone monitoring, and standard boom-arm threading cover the basics. It stays in our table as the RGB/feature pick for gamers who want a mic that looks as good as it sounds.</p>',
    content_es: '<p><strong>El HyperX QuadCast S es un condensador USB pensado para el streamer que sale en cámara.</strong> Suspensión integrada, filtro antipop, silencio al toque con anillo LED de estado e iluminación RGB lo convierten en el centro del escritorio. Captura 24-bit/96kHz, monitorización por auriculares y rosca estándar para brazo articulado cubren lo básico. Se queda en nuestra tabla como la opción RGB/feature para gamers que quieren un micro que luzca tan bien como suena.</p>',
    products: [253]
  },
  {
    heading: 'Razer Seiren V3 Pro: High Sample Rate Streaming',
    heading_es: 'Razer Seiren V3 Pro: Alta tasa de muestreo para streaming',
    content: '<p><strong>The Razer Seiren V3 Pro targets streamers who want condenser detail at up to 192kHz/24-bit.</strong> Supercardioid capsule narrows pickup to your voice, analog gain limiter prevents clipping, and Razer Synapse unlocks a 10-band EQ, compressor, and noise gate. The high sample rate is the differentiator here — useful if you repurpose stream audio for podcasts or music.</p>',
    content_es: '<p><strong>El Razer Seiren V3 Pro apunta a streamers que quieren detalle de condensador hasta 192kHz/24-bit.</strong> Cápsula supercardioide que estrecha la captación a tu voz, limitador analógico de ganancia que evita recortes, y Razer Synapse desbloquea ecualizador de 10 bandas, compresor y noise gate. La alta tasa de muestreo es el diferencial — útil si reutilizas el audio del stream para podcasts o música.</p>',
    products: [252]
  },
  {
    heading: 'Samson G-Track Pro: Dual Interface + Mic',
    heading_es: 'Samson G-Track Pro: Doble interfaz + micrófono',
    content: '<p><strong>The Samson G-Track Pro is two devices in one: a large-diaphragm condenser USB mic and a 2-in/2-out audio interface.</strong> The 1-inch capsule captures vocals and instruments, the 1/4-inch instrument input takes guitars or bass direct, and the 1/4-inch line output sends monitor mixes to speakers. 24-bit/96kHz, zero-latency monitoring, and selectable polar patterns (cardioid, omni, bidirectional) make it the most versatile desktop device in this guide.</p>',
    content_es: '<p><strong>El Samson G-Track Pro son dos dispositivos en uno: un micrófono condensador USB de diafragma grande y una interfaz de audio 2-entrada/2-salida.</strong> La cápsula de 1 pulgada captura voces e instrumentos, la entrada de 1/4 pulgada acepta guitarra o bajo directo, y la salida de 1/4 pulgada envía mezclas de monitoreo a altavoces. 24-bit/96kHz, monitorización sin latencia y patrones polares seleccionables (cardioide, omni, bidireccional) lo hacen el dispositivo de escritorio más versátil de esta guía.</p>',
    products: [291]
  }
];

// Append new sections
g.sections = g.sections.concat(newSections);

// featuredProducts = exactly the 9 table products
g.featuredProducts = [194, 195, 286, 299, 3, 666, 253, 252, 291];

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('Sections updated. Count:', g.sections.length);
g.sections.forEach(function(s, i) { console.log(i, s.heading.slice(0, 55), JSON.stringify(s.products)); });
console.log('Featured:', g.featuredProducts);