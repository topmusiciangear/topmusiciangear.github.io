var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var fails = [];

var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
if (d.find(function (x) { return x.id === 'usb-mics'; })) { console.log('Guide already exists'); process.exit(1); }

// ==========================================
// 1. ADD 4 NEW PRODUCTS TO CATALOG (ids 666-669)
// ==========================================

var nt_usb_plus = {
  id: 666,
  title: 'Rode NT-USB+',
  title_es: 'Rode NT-USB+',
  brand: 'Rode',
  category: 'microphones',
  price: 169,
  rating: 4.5,
  badge: 'bestSeller',
  desc: 'USB condenser microphone with internal APHEX Revolution preamp and 24-bit-48kHz conversion. Cardioid pattern, zero-latency headphone output, built-in pop filter. Includes desktop tripod ring mount and cables. Compatible with RODE Connect for advanced routing. Ideal upgrade from Yeti-classics for streamers wanting internal hardware processing without software plugins.',
  desc_es: 'Micrófono condensador USB con preamplificador interno Revolution APHEX y conversion 24-bit-48kHz. Patrón cardioide, salida de auriculares sin latencia, filtro antipop integrado. Incluye trípode de escritorio anillo de montaje y cables. Compatible con RODE Connect para enrutamiento avanzado. Ideal salto desde la serie Yeti para streamers que buscan procesamiento de hardware interno sin plugins de software.',
  img: 'https://edge.rode.com//images/page/2072/modules/6597/rode-nt-usb-plus-three-quater-hero-1080x1080-rgb.png',
  stores: {
    amazon: 'https://www.amazon.com/dp/B09K9VQKQ3',
    gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FRode-NT-USBplus%2F58QD',
    andertons: 'https://www.andertons.co.uk/rode-nt-usb-professional-usb-microphone/',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Rode-NT-USBplus/art-REC0017634-000',
    zzounds: 'https://www.zzounds.com/item--RODNTUSBPL'
  },
  oos: []
};

var mv6 = {
  id: 667,
  title: 'Shure MV6',
  title_es: 'Shure MV6',
  brand: 'Shure',
  category: 'microphones',
  price: 129,
  rating: 4.5,
  badge: 'pro',
  desc: 'USB-C dynamic microphone with Voice Isolation technology Auto Level Mode Digital Popper Stopper and Real-time Denoiser. Includes 2m USB-C cable round-base desktop stand tap-to-mute button. Designed as the accessible younger brother of the MV7-plus aimed at streamers and gamers who want Shure dynamic sound at a lower price point than the MV7-plus. Cardioid pattern 16-24-bit 44-48kHz headphone output with zero-latency monitoring.',
  desc_es: 'Micrófono dinámico USB-C con tecnología Voice Isolation Auto Level Mode Digital Popper Stopper y Real-time Denoiser. Incluye cable USB-C de 2m soporte de escritorio redondo y botón de silencio al toque. Diseñado como el hermano menor accesible del MV7-plus orientado a streamers y gamers que buscan sonido dinámico Shure a un precio inferior al MV7-plus. Patrón cardioide 16-24-bit 44-48kHz salida de auriculares con monitorización sin latencia.',
  img: 'https://products.shureweb.eu/shure_product_db/product_main_images/files/6f7/c70/a9-/setcard/f3cad90794410311236c0e50c17ea13e.jpeg',
  stores: {
    amazon: 'https://www.amazon.com/dp/B0DBJ5DBL8',
    zzounds: 'https://www.zzounds.com/item--SHUMV6',
    andertons: 'https://www.andertons.co.uk/shure-motiv-mv6-g2-black-dynamic-usb-c-microphone-for-pc-gamers-streamers/',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Shure-MV6/art-REC0016781-000',
    gear4music: 'https://www.gear4music.com/PA-DJ-and-Lighting/Shure-MV6-USB-Gaming-Microphone/6OHD'
  },
  oos: ['gear4music']
};

var at2020xp = {
  id: 668,
  title: 'Audio-Technica AT2020USB-XP',
  title_es: 'Audio-Technica AT2020USB-XP',
  brand: 'Audio-Technica',
  category: 'microphones',
  price: 219,
  rating: 4.4,
  badge: 'bestSeller',
  desc: 'USB-C cardioid condenser with 24-bit-192kHz conversion integrated DSP with 3-level noise reduction and automatic gain control. Includes desk stand pop filter 3-8-16 to 5-8-27 adapter USB-C to USB-A cable. Unlike the standard AT2020USB-plus the XP model adds hardware noise reduction and AGC limiter to prevent clipping during excited shouting streaming. 142mm long 52mm diameter 375g.',
  desc_es: 'Condensador cardioide USB-C con conversion 24-bit-192kHz DSP integrado con 3 niveles de reducción de ruido y control automático de ganancia. Incluye soporte de escritorio filtro antipop adaptador 3-8-16 a 5-8-27 cable USB-C a USB-A. A diferencia del AT2020USB-plus el modelo XP añade reducción de ruido de hardware y limitador AGC para evitar recortes al gritar o emocionarse durante un streaming. 142mm de largo 52mm de diámetro 375g.',
  img: 'https://cf1.zzounds.com/media/productmedia/fit-600by600-quality-85/AT2020USB-XP_02-1-_871302-2dd9db3c1c85ba322270302a5b943766.jpg',
  stores: {
    amazon: 'https://www.amazon.com/dp/B0C61VGXWM',
    zzounds: 'https://www.zzounds.com/item--AUDAT2020USBXP',
    andertons: 'https://www.andertons.co.uk/audio-technica-at2020usb-xp-cardioid-condenser-usb-microphone/',
    musicstore: 'https://www.musicstore.com/en_US/USD/Audio-Technica-AT2020USB-XP-USB-Condenser-Mic-with-Stand-Pop-Filter-Black-/art-REC0016402-000',
    gear4music: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Audio-Technica-AT2020USB-XP-Cardioid-Condenser-USB-Microphone/5PYF'
  },
  oos: ['andertons']
};

var akg_lyra = {
  id: 669,
  title: 'AKG Lyra',
  title_es: 'AKG Lyra',
  brand: 'AKG',
  category: 'microphones',
  price: 149,
  rating: null,
  badge: 'discontinued',
  desc: 'Ultra-HD multimode USB condenser with 4-capsule array (Cardioide Front-Back Tight-Stereo Wide-Stereo). 24-bit-192kHz conversion. Discontinued by manufacturer; zZounds no longer carries it AKG USA site marks it discontinued Andertons has no product page. Was the premium multi-pattern alternative to HyperX QuadCast-S. Available on secondary markets only.',
  desc_es: 'Condensador multimodal USB Ultra-HD con matriz de 4 capsules (Cardioide Frente y Atrás Estéreo estrecho Estéreo ancho). 24-bit-192kHz. Descontinuado por el fabricante; zZounds ya no lo ofrece AKG USA lo marca como discontinuado y Andertons no tiene página del producto. Era la alternativa premium multi-patrón al HyperX QuadCast-S. Solo disponible en mercados secundarios.',
  img: 'https://uk.akg.com/dw-image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw539cc4ca/AKG_Lyra_ProductPhoto_TECWinner_1605x1605.png?sw=680&sh=680',
  stores: {
    amazon: 'https://www.amazon.com/dp/B07Y2PFM1W',
    zzounds: 'https://www.zzounds.com/item--AKGC44USB',
    andertons: 'not-found',
    musicstore: 'https://www.musicstore.com/en_US/USD/AKG-Lyra/art-REC0014609-000',
    gear4music: 'https://www.gear4music.com/Recording-and-Computers/AKG-Lyra-USB-Microphone/35V1'
  },
  oos: ['gear4music', 'andertons']
};

d.push(nt_usb_plus, mv6, at2020xp, akg_lyra);
d.sort(function (a, b) { return a.id - b.id; });

// ==========================================
// 2. UPDATE usb-mics GUIDE
// ==========================================

var g = d.find(function (x) { return x.id === 'usb-mics'; });
if (!g) { console.log('usb-mics guide NOT FOUND'); process.exit(1); }

// 2A. Update productTable columns merge Yeti+YetiX into NT-USB+ position keep QuadCast S add AT2020USB-XP as new last column
g.productTable.columns = [
  { title: 'Shure MV7-plus', title_es: 'Shure MV7-plus' },
  { title: 'Elgato Wave:3', title_es: 'Elgato Wave:3' },
  { title: 'Audio-Technica AT2040USB', title_es: 'Audio-Technica AT2040USB' },
  { title: 'Sennheiser Profile Streaming Set', title_es: 'Sennheiser Profile Streaming Set' },
  { title: 'Rode NT1 5th Generation', title_es: 'Rode NT1 5ta Generacion' },
  { title: 'Rode NT-USB-plus', title_es: 'Rode NT-USB-plus' },
  { title: 'HyperX QuadCast-S', title_es: 'HyperX QuadCast-S' },
  { title: 'Razer Seiren-V3-Pro', title_es: 'Razer Seiren V3-Pro' },
  { title: 'Samson G-Track-Pro', title_es: 'Samson G-Track-Pro' }
];

// 2B. Update featuredProducts replace Yeti id 518 with NT-USB-plus id 666
g.featuredProducts = g.featuredProducts.map(function (id) { return id === 518 ? 666 : id; });

// 2C. Update sections add NT-USB-plus to section 0 replace AM8 section 7 with MV6 add Lyra note to QuadCast section
g.sections[0].products = [194, 277, 276, 666];

var s7 = g.sections[7];
s7.heading = 'Shure MV6 Dynamic USB Microphone: A Closer Look';
s7.heading_es = 'Shure MV6 Micrófono dinámico USB: análisis detallado';
s7.products = [667];

var s9 = g.sections[9];
s9.content = 'The HyperX QuadCast-S is a USB condenser with built-in shock mount pop filter and RGB lighting for gaming streaming. It records at 96kHz-24-bit adds a tap-to-mute button with a mic-light status indicator and a headphone output for monitoring. Note: The AKG Lyra was the main multi-pattern USB alternative in this price range offering 4 polar patterns (Cardioide Front-Back Tight-Stereo Wide-Stereo) at 24-bit-192kHz but it has been discontinued by the manufacturer. zZounds no longer carries it AKG USA marks it discontinued Andertons has no product page. The QuadCast-S remains the best RGB-feature-packed option but if you need true multi-pattern flexibility the Rode NT-USB-plus is the modern replacement.';
s9.content_es = 'El HyperX QuadCast-S es un condensador USB con suspensión incorporada filtro anti-pop e iluminación RGB para gaming streaming. Graba a 96kHz-24-bit añade un botón de silencio con indicador de luz del micrófono y salida de auriculares para monitorización. Nota: El AKG Lyra fue la principal alternativa multi-patrón en este rango de precios ofreciendo 4 patrones polares (Cardioide Frente y Atrás Estéreo estrecho Estéreo ancho) a 24-bit-192kHz pero ha sido descontinuado por el fabricante. zZounds ya no lo ofrece AKG USA lo marca como discontinuado y Andertons no tiene página del producto. El QuadCast-S sigue siendo la mejor opción con RGB y características pero si necesitas verdadera flexibilidad multi-patrón el Rode NT-USB-plus es el reemplazo moderno.';

// 2D. verdictProsCons replace PM461 (find by name) with AT2020USB-XP
var pmIdx = g.verdictProsCons.findIndex(function (v) { return v.name && v.name.indexOf('Maono PM461') > -1; });
if (pmIdx > -1) {
  g.verdictProsCons[pmIdx].name = 'Audio-Technica AT2020USB-XP';
  g.verdictProsCons[pmIdx].name_es = 'Audio-Technica AT2020USB-XP';
  g.verdictProsCons[pmIdx].pros = [
    '24-bit-192kHz USB-C conversion exceeds the standard AT2020USB model',
    'Integrated DSP with 3-level noise reduction and automatic gain control prevents clipping during shouting or emotional moments',
    'Includes desk stand pop filter adapter and cables in the box complete out-of-box experience',
    'Cardioid pattern with consistent cardioid pickup 142mm length 52mm diameter 375g compact desktop-friendly',
    'LED ring indicates blue on red muted mix control blends mic computer audio mute is soft-touch capacitive silent'
  ];
  g.verdictProsCons[pmIdx].pros_es = [
    'Conversion USB-C 24-bit-192kHz supera al modelo AT2020USB estandar',
    'DSP integrado con 3 niveles de reduccion de ruido y control automatico de ganancia evita recortes al gritar o emocionarse durante un streaming',
    'Incluye soporte escritorio filtro antipop adapter y cables en la caja experiencia completa out-of-box',
    'Patron cardioide pickup consistente 142mm largo 52mm diametro 375g compacto amigable para escritorio',
    'Anillo LED indica azul encendido rojo muted mix control combina mic audio computador mute es tactil suave silencioso'
  ];
  g.verdictProsCons[pmIdx].cons = [
    'Andertons currently OOS Out of Stock price 149 marked OOS availability time-sensitive',
    'No on-mic LED level meter like the Yeti X models',
    'Sensitivity and self-noise not published on spec lists verified absent from zZounds Andertons sheets',
    'USB-C only no legacy USB-A without included adapter',
    'Competes directly with the Rode NT-USB-plus at a higher price point 219 vs 169'
  ];
  g.verdictProsCons[pmIdx].cons_es = [
    'Andertons actualmente OOS Agotado precio 149 marcado OOS disponibilidad sensible al tiempo',
    'No medidor de nivel LED en el microfono como los modelos Yeti X',
    'Sensibilidad y auto-ruido no publicados en las listas de specs ausentes verificadas de las hojas zZonds Andertons',
    'USB-C only sin USB-A legado sin el adaptador incluido',
    'Compete directamente con el Rode NT-USB-plus en un punto de precio superior 219 vs 169'
  ];
} else { fails.push('PM461 VPC index not found'); }

// 2E. Also update the existing MV6 VPC if present (index 12 was FIFINE AM8)
var mv6VPCIdx = g.verdictProsCons.findIndex(function (v) { return v.name && v.name.indexOf('FIFINE AmpliGame AM8') > -1; });
if (mv6VPCIdx > -1) {
  g.verdictProsCons[mv6VPCIdx].name = 'Shure MV6';
  g.verdictProsCons[mv6VPCIdx].name_es = 'Shure MV6';
  g.verdictProsCons[mv6VPCIdx].pros = [
    'Dynamic cardioid capsule with Shure Voice Isolation Technology rejects background room noise',
    'Auto Level Mode Digital Popper Stopper Real-time Denoiser all run on hardware DSP no CPU load',
    'Tap-to-mute button with visual LED indicator includes 2m USB-C cable and stand out of the box',
    'OBS Certified officially supported by the OBS streaming platform',
    'Shure MOTIV Mix app provides 5-band EQ Tone slider Dark-Natural-Bright and comprehensive DSP controls'
  ];
  g.verdictProsCons[mv6VPCIdx].pros_es = [
    'Cápsula dinámica cardioide con la Tecnología de Aislamiento de Voz de Shure rechaza el ruido de fondo de la habitación',
    'Auto Level Mode Digital Popper Stopper Real-time Denoiser corren en DSP de hardware no carga en el CPU',
    'Botón de silencio al toque con indicador LED visual incluye cable USB-C de 2m y soporte out-of-box',
    'Certificado OBS compatible oficialmente con la plataforma de streaming OBS',
    'La app MOTIV de Shure ofrece ecualizador de 5 bandas control de tono Dark-Natural-Bright y controles DSP completos'
  ];
  g.verdictProsCons[mv6VPCIdx].cons = [
    'Only 1 input applicable USB only but gain range 0 to 36 dB is not published so no published 70dB-plus clean-gain claim like the SM7B ecosystem',
    'Bit depth-sample rate not explicitly published on shure.com fetched page zZounds lists 16-24-bit 44-48kHz',
    'No hardware gain knob touch-panel mute only volume adjustment via MOTIV app or host software',
    'Compact stand included is round-base low-profile a boom arm is recommended for streaming ergonomics',
    'Colors available Black-White Gen-2 may vary by region some markets only get Black'
  ];
  g.verdictProsCons[mv6VPCIdx].cons_es = [
    'Solo 1 entrada aplicable USB only pero el rango de ganancia de 0 a 36 dB no está publicado así que no hay reclamo de ganancia limpia de 70dB-plus como el ecosistema SM7B',
    'Bit depth-sample rate no publicado explícitamente en la página web de Shure zZounds lista 16-24-bit 44-48kHz',
    'No perilla de ganancia de hardware perilla táctil de mute solo ajuste de volumen por la app MOTIV o software host',
    'Soporte redondo incluido es de perfil bajo se recomienda un brazo articulado para ergonomía de streaming',
    'Colores disponibles Negro-White Gen-2 pueden variar según la región algunos mercados solo obtienen Negro'
  ];
} else { fails.push('FIFINE AM8 VPC index not found'); }

// 2F. Update intro mention Rode NT-USB-plus as the new upgrade path from Yeti
g.intro = g.intro.replace(
  'Five solid USB mics for streaming quality picks with no price cap.',
  'Five solid USB mics for streaming quality picks with no price cap. The Rode NT-USB-plus is the modern upgrade path from the Yeti family offering internal APHEX DSP and 24-bit-192kHz conversion without software plugins.'
);
g.intro_es = g.intro_es.replace(
  'Cinco micrófonos USB sólidos para streaming calidad picks con límite de precio.',
  'Cinco micrófonos USB sólidos para streaming calidad picks con límite de precio. El Rode NT-USB-plus es la ruta de actualización moderna desde la familia Yeti ofreciendo DSP interno APHEX y conversion 24-bit-192kHz sin plugins de software.'
);

// 2G. Update conclusion add AT2020USB-XP mention note Lyra discontinued
g.conclusion = g.conclusion.replace(
  'Every one of these five is a professional stream-ready USB microphone start with the one that matches your workflow.',
  'Every one of these five is a professional stream-ready USB microphone start with the one that matches your workflow. If you need 24-bit-192kHz capture with integrated DSP noise reduction and automatic gain control the Audio-Technica AT2020USB-XP is the definitive choice above the standard AT2020USB-plus. Note: The AKG Lyra was the multi-pattern alternative but is discontinued see section 9 for details.'
);
g.conclusion_es = g.conclusion_es.replace(
  'Los cinco son micrófonos USB profesionales listos para streaming empiece con el que mejor se adapte a tu equipo.',
  'Los cinco son micrófonos USB profesionales listos para streaming empiece con el que mejor se adapte a tu equipo. Si necesita captura 24-bit-192kHz con DSP de reducción de ruido integrado y control automático de ganancia el Audio-Technica AT2020USB-XP es la elección definitiva por encima del AT2020USB-plus estándar. Nota: El AKG Lyra fue la alternativa multi-patrón pero está descontinuado consulte la sección 9 para detalles.'
);

// 2G. Update featuredSnippet text
var F = g.featuredSnippet;
F.text_en = F.text_en.replace(
  'The Shure MV7-plus is the streamer-friendly version of the SM7B',
  'The Shure MV7-plus is the streamer-friendly version of the SM7B. The new Rode NT-USB-plus brings internal APHEX processing and 24-bit-192kHz USB capture to the Yeti class while the Shure MV6 brings dynamic cardioid performance with Auto Level Mode at a lower price than the MV7-plus.'
);
F.text_es = F.text_es.replace(
  'El Shure MV7-plus es la versión streamer-friendly del SM7B',
  'El Shure MV7-plus es la versión streamer-friendly del SM7B. El nuevo Rode NT-USB-plus lleva procesamiento interno APHEX y captura USB 24-bit-192kHz a la serie Yeti mientras que el Shure MV6 lleva rendimiento dinámico cardioide con Auto Level Mode a un precio inferior al MV7-plus.'
);

// 2H. Update table rows values to match 9 columns each row
g.productTable.rows.forEach(function (row) {
  var newValues = row.values.map(function (v, i) {
    if (i === 5) return { value: 'Rode NT-USB-plus', value_es: 'Rode NT-USB-plus' };
    if (i === 6) return { value: 'HyperX QuadCast-S', value_es: 'HyperX QuadCast-S con nota Lyra descontinuado' };
    if (i >= 7) return v;
    return v;
  });
  row.values = newValues.slice(0, 9);
});

// 2I. Ensure verdictProsCons has expected length 14 (13 PM461 replaced + 1 MV6 replaced + original count)
if (g.verdictProsCons.length !== 14) { fails.push('verdictProsCons length unexpected ' + g.verdictProsCons.length); }

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('usb-mics updated cols=' + g.productTable.columns.length + ' featured=' + JSON.stringify(g.featuredProducts) + ' sec0=' + JSON.stringify(g.sections[0].products) + ' sec7=' + JSON.stringify(g.sections[7].products) + ' pmIdx=' + pmIdx + ' mv6Idx=' + mv6VPCIdx);
if (fails.length) { console.log('FAIL\n' + fails.join('\n')); process.exit(1); }
console.log('DONE');