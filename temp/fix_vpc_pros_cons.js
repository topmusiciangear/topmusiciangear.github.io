var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// Fix Rode NT-USB+ (index 5)
g.verdictProsCons[5] = {
  name: 'Rode NT-USB+',
  name_es: 'Rode NT-USB+',
  pros: [
    'Internal APHEX Revolution preamp with Aural Exciter, Big Bottom, and Compellor processing — broadcast sound without software',
    '24-bit/48kHz conversion with zero-latency headphone monitoring and built-in pop filter',
    'Direct successor to the Yeti line: solves the same "one cable, great sound" problem with cleaner internals',
    'Compatible with RODE Connect for advanced routing and multi-mic setups',
    'Zero-latency monitoring with dedicated headphone volume and mix control knobs'
  ],
  pros_es: [
    'Preamplificador interno APHEX Revolution con Aural Exciter, Big Bottom y Compellor — sonido broadcast sin software',
    'Conversión 24-bit/48kHz con monitorización de auriculares sin latencia y filtro antipop integrado',
    'Sucesor directo de la línea Yeti: resuelve el mismo problema "un cable, gran sonido" con internals más limpios',
    'Compatible con RODE Connect para enrutamiento avanzado y configuraciones multi-micrófono',
    'Monitorización sin latencia con perillas dedicadas de volumen de auriculares y mezcla'
  ],
  cons: [
    'No multi-pattern — cardioid only, unlike the Yeti/Yeti X which offer stereo, omni, and bidirectional',
    'No XLR output — cannot migrate to a professional interface later like the Samson Q2U or MV7+',
    'APHEX processing is fixed-chain; advanced users may want more granular control per band',
    'Price (~$169) sits above the classic Yeti, making it a harder sell for absolute beginners',
    'Requires RODE Connect software for full DSP customization; hardware-only mode is limited'
  ],
  cons_es: [
    'No multi-patrón — solo cardioide, a diferencia del Yeti/Yeti X que ofrecen estéreo, omni y bidireccional',
    'Sin salida XLR — no se puede migrar a una interfaz profesional luego como el Samson Q2U o MV7+',
    'El procesamiento APHEX es cadena fija; usuarios avanzados pueden querer control más granular por banda',
    'Precio (~$169) por encima del Yeti clásico, haciéndolo menos accesible para principiantes absolutos',
    'Requiere software RODE Connect para personalización completa del DSP; modo solo-hardware es limitado'
  ]
};

// Fix sE Electronics NEOM USB (index 6)
g.verdictProsCons[6] = {
  name: 'sE Electronics NEOM USB',
  name_es: 'sE Electronics NEOM USB',
  pros: [
    'Three independent analog knobs (Gain, Headphone Volume, Playback Mix) — true hardware mixer control without a separate interface',
    '16mm cardioid condenser capsule with 24-bit/192kHz conversion — sE\'s signature warm, silky top-end',
    'Zero-latency monitoring with independent voice/playback balance — critical for streamers balancing game audio and mic',
    'Sturdy all-metal desktop stand included; plug-and-play on Mac, Windows, iOS, Android',
    'Mute button with LED ring; no software mixer or drivers required for core functionality'
  ],
  pros_es: [
    'Tres perillas analógicas independientes (Ganancia, Volumen Auriculares, Mezcla Playback) — control real de mezclador sin interfaz aparte',
    'Cápsula condensadora cardioide de 16mm con conversión 24-bit/192kHz — el cálido y sedoso agudo característico de sE',
    'Monitorización sin latencia con balance independiente voz/playback — crítico para streamers que balancean audio de juego y micro',
    'Soporte metálico de escritorio incluido; plug-and-play en Mac, Windows, iOS, Android',
    'Botón mute con anillo LED; sin mezclador de software ni drivers requeridos para funcionalidad principal'
  ],
  cons: [
    'No multi-pattern — cardioid only; no omni, figure-8, or stereo modes like the Yeti or G-Track Pro',
    'No XLR output — cannot use as analog mic with a professional interface or mixer',
    'No onboard DSP effects (compressor, EQ, de-esser) — relies entirely on analog signal purity',
    'No RGB lighting or gaming aesthetics — purely utilitarian design may not appeal to RGB-focused streamers',
    'Price (~$169) competes with the Rode NT-USB+ which adds APHEX DSP and brand ecosystem (RODE Connect)'
  ],
  cons_es: [
    'No multi-patrón — solo cardioide; sin modos omni, figura-8 o estéreo como el Yeti o G-Track Pro',
    'Sin salida XLR — no se puede usar como micro analógico con interfaz o mezcladora profesional',
    'Sin efectos DSP a bordo (compresor, EQ, de-esser) — depende totalmente de la pureza de la señal analógica',
    'Sin iluminación RGB ni estética gaming — diseño puramente utilitario que puede no atraer a streamers enfocados en RGB',
    'Precio (~$169) compite con el Rode NT-USB+ que añade DSP APHEX y ecosistema de marca (RODE Connect)'
  ]
};

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('Fixed VPC for NT-USB+ and NEOM USB');
console.log('NT-USB+ pros:', g.verdictProsCons[5].pros.length, 'cons:', g.verdictProsCons[5].cons.length);
console.log('NEOM USB pros:', g.verdictProsCons[6].pros.length, 'cons:', g.verdictProsCons[6].cons.length);