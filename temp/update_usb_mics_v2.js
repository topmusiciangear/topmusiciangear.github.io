var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var fails = [];
function must(cond, msg) { if (!cond) fails.push(msg); }

var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });
must(!!g, 'usb-mics guide not found');

// 1. productTable columns: merge Yeti+YetiX into one NT-USB+ column
g.productTable.columns = [
  { title: 'Shure MV7+', title_es: 'Shure MV7+' },
  { title: 'Elgato Wave:3', title_es: 'Elgato Wave:3' },
  { title: 'Audio-Technica AT2040USB', title_es: 'Audio-Technica AT2040USB' },
  { title: 'Sennheiser Profile Streaming Set', title_es: 'Sennheiser Profile Streaming Set' },
  { title: 'Rode NT1 5th Generation', title_es: 'Rode NT1 5ª Generación' },
  { title: 'Rode NT-USB+', title_es: 'Rode NT-USB+' },
  { title: 'HyperX QuadCast S', title_es: 'HyperX QuadCast S' },
  { title: 'Razer Seiren V3 Pro', title_es: 'Razer Seiren V3 Pro' },
  { title: 'Samson G-Track Pro', title_es: 'Samson G-Track Pro' }
];

// 2. featuredProducts: replace 518 (Yeti) with 666 (NT-USB+)
g.featuredProducts = g.featuredProducts.map(function (id) { return id === 518 ? 666 : id; });

// 3. Section 0: add 666
g.sections[0].products = [194, 277, 276, 666];

// 4. Section 7: FIFINE AM8 -> Shure MV6
var s7 = g.sections[7];
s7.heading = 'Shure MV6 Dynamic USB Microphone: A Closer Look';
s7.heading_es = 'Shure MV6 Micrófono dinámico USB: análisis detallado';
s7.products = [667];

// 5. Section 9: add AKG Lyra discontinued note
var s9 = g.sections[9];
s9.content = '<strong>The HyperX QuadCast S is a USB condenser with built-in shock mount, pop filter and RGB lighting for gaming and streaming.</strong> It records at 96kHz/24-bit, adds a tap-to-mute button with a mic-light status indicator and a headphone output for monitoring. <strong>Note:</strong> The AKG Lyra was the main multi-pattern USB alternative in this price range, offering 4 polar patterns (Cardioid, Front & Back, Tight Stereo, Wide Stereo) at 24-bit/192kHz, but it has been discontinued by the manufacturer. zZounds no longer carries it, AKG USA marks it discontinued, and Andertons has no product page. The QuadCast S remains the best RGB/feature-packed option, but if you need true multi-pattern flexibility, the Rode NT-USB+ is the modern replacement.';
s9.content_es = '<strong>El HyperX QuadCast S es un condensador USB con suspensión incorporada, filtro anti-pop e iluminación RGB para gaming y streaming.</strong> Graba a 96kHz/24-bit, añade un botón de silencio con indicador de luz del micrófono y salida de auriculares para monitorización. <strong>Nota:</strong> El AKG Lyra fue la principal alternativa multi-patrón en este rango de precios, ofreciendo 4 patrones polares (Cardioide, Frente y Atrás, Estéreo estrecho, Estéreo ancho) a 24-bit/192kHz, pero ha sido descontinuado por el fabricante. zZounds ya no lo ofrece, AKG USA lo marca como discontinuado, y Andertons no tiene página del producto. El QuadCast S sigue siendo la mejor opción con RGB y características, pero si necesitas verdadera flexibilidad multi-patrón, el Rode NT-USB+ es el reemplazo moderno.';

// 6. verdictProsCons: replace Maono PM461 with AT2020USB-XP
var pmIdx = g.verdictProsCons.findIndex(function (v) { return v.name && v.name.indexOf('Maono PM461') > -1; });
must(pmIdx > -1, 'PM461 VPC not found');
if (pmIdx > -1) {
  g.verdictProsCons[pmIdx] = {
    name: 'Audio-Technica AT2020USB-XP',
    name_es: 'Audio-Technica AT2020USB-XP',
    pros: [
      '24-bit/192kHz USB-C conversion exceeds the standard AT2020USB model',
      'Integrated DSP with 3-level noise reduction and automatic gain control prevents clipping during shouting',
      'Includes desk stand, pop filter, adapter and cables in the box',
      'Cardioid pattern, 142mm long, 52mm diameter, 375g compact desktop-friendly',
      'LED ring indicates blue=on, red=muted; mix control blends mic+computer audio'
    ],
    pros_es: [
      'Conversión USB-C 24-bit/192kHz supera al modelo AT2020USB estándar',
      'DSP integrado con 3 niveles de reducción de ruido y control automático de ganancia evita recortes al gritar',
      'Incluye soporte de escritorio, filtro antipop, adaptador y cables en la caja',
      'Patrón cardioide, 142mm de largo, 52mm de diámetro, 375g compacto y amigable para escritorio',
      'Anillo LED indica azul=encendido, rojo=mudo; control de mezcla combina mic+audio del computador'
    ],
    cons: [
      'Andertons currently OOS (Out of Stock)',
      'No on-mic LED level meter like the Yeti X models',
      'Sensitivity and self-noise not published on spec lists',
      'USB-C only, no legacy USB-A without included adapter',
      'Competes directly with the Rode NT-USB+ at a higher price point ($219 vs $169)'
    ],
    cons_es: [
      'Andertons actualmente OOS (Agotado)',
      'No medidor de nivel LED en el micrófono como los modelos Yeti X',
      'Sensibilidad y auto-ruido no publicados en las listas de specs',
      'Solo USB-C, sin USB-A legado sin el adaptador incluido',
      'Compete directamente con el Rode NT-USB+ en un punto de precio superior ($219 vs $169)'
    ]
  };
}

// 7. verdictProsCons: replace FIFINE AM8 with Shure MV6
var am8Idx = g.verdictProsCons.findIndex(function (v) { return v.name && v.name.indexOf('FIFINE AmpliGame AM8') > -1; });
must(am8Idx > -1, 'FIFINE AM8 VPC not found');
if (am8Idx > -1) {
  g.verdictProsCons[am8Idx] = {
    name: 'Shure MV6',
    name_es: 'Shure MV6',
    pros: [
      'Dynamic cardioid capsule with Shure Voice Isolation Technology rejects background room noise',
      'Auto Level Mode, Digital Popper Stopper, Real-time Denoiser all run on hardware DSP',
      'Tap-to-mute button with visual LED indicator; includes 2m USB-C cable and stand',
      'OBS Certified — officially supported by the OBS streaming platform',
      'Shure MOTIV Mix app provides 5-band EQ, Tone slider (Dark/Natural/Bright), and comprehensive DSP controls'
    ],
    pros_es: [
      'Cápsula dinámica cardioide con la Tecnología de Aislamiento de Voz de Shure rechaza el ruido de fondo',
      'Auto Level Mode, Digital Popper Stopper, Real-time Denoiser corren en DSP de hardware',
      'Botón de silencio al toque con indicador LED visual; incluye cable USB-C de 2m y soporte',
      'Certificado OBS — compatible oficialmente con la plataforma de streaming OBS',
      'La app MOTIV Mix de Shure ofrece ecualizador de 5 bandas, control de tono (Dark/Natural/Bright) y controles DSP completos'
    ],
    cons: [
      'Gain range 0 to +36 dB not published, so no 70dB+ clean-gain claim like the SM7B ecosystem',
      'Bit depth/sample rate not explicitly published on shure.com (zZounds lists 16/24-bit, 44.1/48kHz)',
      'No hardware gain knob — touch-panel mute only; volume adjustment via MOTIV app or host software',
      'Compact stand included is round-base and low-profile; a boom arm is recommended for streaming ergonomics',
      'Colors available (Black/White Gen 2) may vary by region; some markets only get Black'
    ],
    cons_es: [
      'Rango de ganancia de 0 a +36 dB no publicado, así que no hay reclamo de ganancia limpia de 70dB+ como el ecosistema SM7B',
      'Bit depth/sample rate no publicado explícitamente en shure.com (zZounds lista 16/24-bit, 44.1/48kHz)',
      'No perilla de ganancia de hardware — solo mute táctil; ajuste de volumen por la app MOTIV o software host',
      'Soporte redondo incluido es de perfil bajo; se recomienda un brazo articulado para ergonomía de streaming',
      'Colores disponibles (Negro/Blanco Gen 2) pueden variar según la región; algunos mercados solo obtienen Negro'
    ]
  };
}

// 8. Intro: mention NT-USB+ as upgrade path from Yeti
g.intro = g.intro.replace(
  'Five solid USB mics for streaming — quality picks with no price cap.',
  'Five solid USB mics for streaming — quality picks with no price cap. The Rode NT-USB+ is the modern upgrade path from the Yeti family, offering internal APHEX DSP and 24-bit/48kHz conversion without software plugins.'
);
g.intro_es = g.intro_es.replace(
  'Cinco micrófonos USB sólidos para streaming — calidad picks con límite de precio.',
  'Cinco micrófonos USB sólidos para streaming — calidad picks con límite de precio. El Rode NT-USB+ es la ruta de actualización moderna desde la familia Yeti, ofreciendo DSP interno APHEX y conversión 24-bit/48kHz sin plugins de software.'
);

// 9. Conclusion: add AT2020USB-XP mention + Lyra note
g.conclusion = g.conclusion.replace(
  'Every one of these five is a professional, stream-ready USB microphone — start with the one that matches your workflow.',
  'Every one of these five is a professional, stream-ready USB microphone — start with the one that matches your workflow. If you need 24-bit/192kHz capture with integrated DSP noise reduction and automatic gain control, the Audio-Technica AT2020USB-XP is the definitive choice above the standard AT2020USB+. Note: The AKG Lyra was the multi-pattern alternative but is discontinued; see section 9 for details.'
);
g.conclusion_es = g.conclusion_es.replace(
  'Los cinco son micrófonos USB profesionales, listos para streaming — empieza con el que mejor se adapte a tu equipo.',
  'Los cinco son micrófonos USB profesionales, listos para streaming — empieza con el que mejor se adapte a tu equipo. Si necesitas captura 24-bit/192kHz con DSP de reducción de ruido integrado y control automático de ganancia, el Audio-Technica AT2020USB-XP es la elección definitiva por encima del AT2020USB+ estándar. Nota: El AKG Lyra fue la alternativa multi-patrón pero está descontinuado; consulta la sección 9 para detalles.'
);

// 10. featuredSnippet text
var F = g.featuredSnippet;
F.text_en = F.text_en.replace(
  'The Shure MV7+ is the streamer-friendly versión of the SM7B',
  'The Shure MV7+ is the streamer-friendly versión of the SM7B. The new Rode NT-USB+ brings internal APHEX processing and 24-bit/48kHz USB capture to the Yeti class, while the Shure MV6 brings dynamic cardioid performance with Auto Level Mode at a lower price than the MV7+.'
);
F.text_es = F.text_es.replace(
  'El Shure MV7+ es la versión streamer-friendly del SM7B',
  'El Shure MV7+ es la versión streamer-friendly del SM7B. El nuevo Rode NT-USB+ lleva procesamiento interno APHEX y captura USB 24-bit/48kHz a la serie Yeti, mientras que el Shure MV6 lleva rendimiento dinámico cardioide con Auto Level Mode a un precio inferior al MV7+.'
);

// 11. Table rows: update values to match 9 columns
g.productTable.rows.forEach(function (row) {
  var newVals = row.values.map(function (v, i) {
    if (i === 5) return { value: 'Rode NT-USB+', value_es: 'Rode NT-USB+' };
    if (i === 6) return { value: 'HyperX QuadCast S', value_es: 'HyperX QuadCast S' };
    return v;
  });
  row.values = newVals.slice(0, 9);
});

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('usb-mics updated. cols=' + g.productTable.columns.length + ' featured=' + JSON.stringify(g.featuredProducts));
if (fails.length) { console.log('FAIL:\n' + fails.join('\n')); process.exit(1); }
console.log('DONE');
