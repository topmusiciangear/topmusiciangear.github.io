const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

// ═══════════════════════════════════════════════════════════════
// Reviews para active-vs-passive-pa (ids: 502, 499, 500, 495)
// ═══════════════════════════════════════════════════════════════
const AVP_REVIEWS = [
  {
    heading: "Mackie SRT215: Active DSP in a 15-inch Road Box",
    heading_es: "Mackie SRT215: DSP activo en una caja de 15 pulgadas",
    products: [502],
    content: `<p><strong>The SRT215 is Mackie's answer to the "passive is cheaper per dB" argument.</strong> A 15-inch woofer and 1.4-inch polymer compression driver on a SymX horn deliver 1,600W of peak power and 133 dB maximum SPL — enough headroom for bands, DJs and outdoor events. The Advanced Impulse DSP provides five acoustic voicings plus system EQ, while the SRT Mix Control four-channel digital mixer with Bluetooth streaming lets you run vocals, keys and a backing track straight into the speaker.</p><p>The 45-degree tilt-back monitor angle and dual-angle pole mount cover PA and floor-wedge duty from the same cabinet. At 16.8 kg with M10 rigging points, it flies or stacks for installs. The trade-off is weight and mains dependence: this is a powered box through and through, so no amp rack means no passive expansion — you scale by adding more SRT215s.</p>`,
    content_es: `<p><strong>El SRT215 es la respuesta de Mackie al argumento de "lo pasivo es más barato por dB".</strong> Un woofer de 15 pulgadas y un driver de compresión de polímero de 1.4 pulgadas sobre bocina SymX entregan 1.600W de potencia pico y 133 dB de SPL máximo — margen suficiente para bandas, DJs y eventos al aire libre. El DSP Advanced Impulse aporta cinco perfiles acústicos más ecualización de sistema, mientras que el mezclador digital de cuatro canales SRT Mix Control con Bluetooth permite conectar vocales, teclados y pista de acompañamiento directamente al altavoz.</p><p>El ángulo de monitor de 45 grados y el soporte de doble ángulo cubren la función de PA y cuña de suelo desde el mismo recinto. Con 16,8 kg y puntos de suspensión M10, se apila o se instala en rigging. El contrapunto es el peso y la dependencia de la red eléctrica: es una caja activa hasta la médula, así que sin rack de etapas no hay escalado pasivo — se amplía añadiendo más SRT215.</p>`
  },
  {
    heading: "Yamaha CBR12: The Passive Workhorse That Just Takes a Signal",
    heading_es: "Yamaha CBR12: el caballo de batalla pasivo que solo espera una señal",
    products: [499],
    content: `<p><strong>The CBR12 is the speaker you plug into an amp you already own.</strong> A 12-inch woofer with a 2-inch voice coil and a 1.4-inch compression driver handles 175W continuous, 350W program and 700W peak into 8 ohms, reaching 125 dB max SPL. The wide-dispersion constant-directivity horn spreads 90 x 60 degrees evenly, and an HF protection circuit guards the tweeter against accidental abuse.</p><p>At 30.6 lb with a 50-degree wedge angle, it works as front-of-house or floor monitor with equal ease. The polypropylene cabinet shrugs off transport. The obvious limitation: no onboard DSP, no mixer, no Bluetooth — you bring your own amplification and processing. For venues with installed racks or bands carrying power amps, that is a feature, not a bug: the CBR12 is cheap per decibel and pairs with whatever amp you already trust.</p>`,
    content_es: `<p><strong>El CBR12 es el altavoz que conectas a una etapa que ya tienes.</strong> Un woofer de 12 pulgadas con bobina de 2 pulgadas y un driver de compresión de 1.4 pulgadas maneja 175W continuos, 350W de programa y 700W de pico en 8 ohmios, alcanzando 125 dB de SPL máximo. El bocina de dispersión amplia y directividad constante reparte 90 x 60 grados uniformemente, y un circuito de protección de agudos cuida el tweeter de abusos accidentales.</p><p>Con 14 kg y un ángulo de cuña de 50 grados, sirve como PA principal o monitor de suelo por igual. El recinto de polipropileno aguanta el transporte sin problema. La limitación evidente: no lleva DSP, mezclador ni Bluetooth — pones tu propia amplificación y proceso. Para locales con racks instalados o bandas que ya cargan etapas, eso es una virtud, no un fallo: el CBR12 es barato por decibelio y se combina con cualquier etapa de la que ya te fíes.</p>`
  },
  {
    heading: "EV ELX200-12: Passive Clarity with SST Waveguide Precision",
    heading_es: "EV ELX200-12: claridad pasiva con la precisión del waveguide SST",
    products: [500],
    content: `<p><strong>The ELX200-12 is Electro-Voice's passive bid for clean, affordable reinforcement.</strong> A 12-inch woofer paired with the DH-1L titanium compression driver delivers 300W continuous and 1,200W peak into 8 ohms with 93 dB sensitivity, hitting 128 dB max SPL. The patented SST waveguide produces a precise 90 x 60 degree pattern that keeps speech intelligible across the coverage zone.</p><p>The polypropylene cabinet carries dual NL4 connectors, three M10 rigging points and ZLX-style handles — it is built to be carried, pole-mounted and flown. With no DSP or mixer onboard, you shape the sound in your own processor or console. For passive-system loyalists and installers who already own amplification, the ELX200-12 is the honest, no-frills box that does exactly what a loudspeaker should: take a line-level signal from an amp and fill a room.</p>`,
    content_es: `<p><strong>ELX200-12 es la apuesta pasiva de Electro-Voice para refuerzo limpio y asequible.</strong> Un woofer de 12 pulgadas junto al driver de compresión de titanio DH-1L entrega 300W continuos y 1.200W de pico en 8 ohmios con una sensibilidad de 93 dB, alcanzando 128 dB de SPL máximo. El waveguide SST patentado produce un patrón preciso de 90 x 60 grados que mantiene la voz inteligible en toda la zona de cobertura.</p><p>El recinto de polipropileno lleva conectores NL4 dobles, tres puntos de suspensión M10 y asas tipo ZLX — está hecho para transportarse, montarse en mástil y colgarse. Sin DSP ni mezclador integrados, el sonido se moldea en tu propio procesador o consola. Para fieles de los sistemas pasivos e instaladores que ya poseen amplificación, el ELX200-12 es la caja honesta y sin adornos que hace exactamente lo que un altavoz debe hacer: recibir una señal de línea de una etapa y llenar una sala.</p>`
  },
  {
    heading: "EV ELX200-15P: Powered Punch in a 15-inch Poly Cabinet",
    heading_es: "EV ELX200-15P: potencia activa en un recinto de 15 pulgadas",
    products: [495],
    content: `<p><strong>The ELX200-15P is the powered sibling of the ELX200-12, built for musicians who want one box, one cable and done.</strong> A 15-inch woofer with 1,200W peak power produces 132 dB max SPL through the same SST waveguide coverage pattern at 90 x 60 degrees. QuickSmartDSP offers 20 presets, subwoofer/low-cut/high-pass settings and visual monitoring, while the QuickSmartMobile app controls up to six speakers over Bluetooth for instant setup.</p><p>At 18.9 kg with M10 rigging points, the polypropylene cabinet is lighter than most 15-inch powered rivals and handles mobile duty well. The downside mirrors every powered box: you are committed to the onboard amp and DSP. But for solo performers, small bands and presenters who value speed over modularity, the ELX200-15P delivers pro-grade coverage and app-driven convenience without an amp rack.</p>`,
    content_es: `<p><strong>El ELX200-15P es el hermano activo del ELX200-12, pensado para quienes quieren una caja, un cable y listo.</strong> Un woofer de 15 pulgadas con 1.200W de potencia pico produce 132 dB de SPL máximo con el mismo patrón de cobertura waveguide SST de 90 x 60 grados. QuickSmartDSP ofrece 20 presets, ajustes de subwoofer/paso alto/paso bajo y monitorización visual, mientras que la app QuickSmartMobile controla hasta seis altavozes por Bluetooth para una configuración instantánea.</p><p>Con 18,9 kg y puntos de suspensión M10, el recinto de polipropileno es más ligero que la mayoría de rivales activos de 15 pulgadas y aguelta bien el trabajo móvil. La pega es la de toda caja activa: te comprometes a la etapa y el DSP integrados. Pero para solistas, bandas pequeñas y presentadores que valoran la velocidad por encima de la modularidad, el ELX200-15P ofrece cobertura profesional y comodidad por app sin rack de etapas.</p>`
  }
];

// ═══════════════════════════════════════════════════════════════
// Reviews para live-sound-pa (ids: 105, 494, 152)
// ═══════════════════════════════════════════════════════════════
const LSP_REVIEWS = [
  {
    heading: "EV ZLX-12P-G2: The Lightweight DSP Workhorse",
    heading_es: "EV ZLX-12P-G2: el caballo de trabajo ligero con DSP",
    products: [105],
    content: `<p><strong>The ZLX-12P-G2 proves that a powered speaker can be both light and loud.</strong> At 32.67 lb (14.82 kg), it is the lightest powered box in this guide, yet the 1000W Class-D amplifier driving a 12-inch WECA2128 woofer and 1.4-inch titanium DECA2516 compression driver reaches 127 dB peak. The 90 x 60 degree coverage pattern handles speech and music with equal confidence, and DSP presets for music, live and voice give instant starting points for different applications.</p><p>The input panel — mic/line XLR, RCA and Bluetooth — covers wired and wireless sources without adapters. The trade-off is finish and top-end detail: the G2 generation saves weight with a more cost-conscious cabinet build, so critical listeners will hear the difference against the QSC K12.2. For DJs, presenters and mobile rigs where every pound matters, the ZLX-12P-G2 is the smart default.</p>`,
    content_es: `<p><strong>El ZLX-12P-G2 demuestra que un altavoz activo puede ser ligero y potente a la vez.</strong> Con 32,67 lb (14,82 kg), es la caja activa más ligera de esta guía, pero el amplificador Clase-D de 1000W que mueve un woofer WECA2128 de 12 pulgadas y un driver de compresión de titanio DECA2516 de 1.4 pulgadas alcanza 127 dB de pico. El patrón de cobertura de 90 x 60 grados maneja voz y música con igual solvencia, y los presets DSP para música, directo y voz dan puntos de partida instantáneos para distintas aplicaciones.</p><p>El panel de entradas — XLR mic/línea, RCA y Bluetooth — cubre fuentes con cable y sin adaptadores. El contrapunto es el acabado y el detalle en agudos: la generación G2 ahorra peso con un recinto más austero, así que el oído crítico notará la diferencia frente al QSC K12.2. Para DJs, presentadores y equipos móviles donde cada kilo cuenta, el ZLX-12P-G2 es la opción lógica.</p>`
  },
  {
    heading: "LD Systems ICOA 12 A BT: Coaxial Flexibility in a Single Box",
    heading_es: "LD Systems ICOA 12 A BT: flexibilidad coaxial en una sola caja",
    products: [494],
    content: `<p><strong>The ICOA 12 A BT is the only coaxial speaker in this guide, and that changes the coverage game.</strong> The horn-loaded woofer and rotating BEM-optimised CD horn let you use the cabinet vertically or as a floor monitor without swapping anything — the pattern stays aligned with the audience either way. 300W RMS and 1,200W peak produce 126 dB SPL with DynX DSP providing four presets, three-band EQ and delay for room alignment.</p><p>Bluetooth 4.0 streaming plus two mic/line inputs and a mix output make it a self-contained small PA. At 44 lb (19.95 kg) it is one of the heavier 12-inch powered boxes, and the 90 x 50 degree coverage is tighter than most rivals. But for solo performers, schools and houses of worship that need one speaker to do PA and monitor duty with zero setup decisions, the coaxial design is genuinely clever.</p>`,
    content_es: `<p><strong>El ICOA 12 A BT es el único altavoz coaxial de esta guía, y eso cambia el juego de la cobertura.</strong> El woofer con carga de bocina y el cuerno CD optimizado BEM giratorio permiten usar el recinto en vertical o como monitor de suelo sin cambiar nada — el patrón sigue alineado con el público en ambas posiciones. 300W RMS y 1.200W de pico producen 126 dB de SPL, con el DSP DynX ofreciendo cuatro presets, EQ de tres bandas y retardo para alinear la sala.</p><p>El Bluetooth 4.0 más dos entradas mic/línea y una salida de mezlo lo convierten en un pequeño PA autónomo. Con 44 lb (19,95 kg) es uno de los activos de 12 pulgadas más pesados, y la cobertura de 90 x 50 grados es más estrecha que la de la mayoría de rivales. Pero para solistas, escuelas y casas de culto que necesitan un altavoz que haga de PA y monitor sin decisiones de configuración, el diseño coaxial es genuinamente ingenioso.</p>`
  },
  {
    heading: "Yamaha Stagepas 1K MKII: The One-Box PA for Solo Performers",
    heading_es: "Yamaha Stagepas 1K MKII: el PA de una sola caja para solistas",
    products: [152],
    content: `<p><strong>The Stagepas 1K MKII is a column array, subwoofer and mixer in a single transportable package.</strong> 1100W peak power driving a 12-inch subwoofer and a 10-driver line array gives small venues the throw and clarity of a stacked system without the truck full of gear. The built-in 5-channel digital mixer with SPX effects and one-knob EQ per channel means a singer-songwriter can plug in, tweak one dial and play.</p><p>Bluetooth connectivity handles backing tracks and speech playback, and the whole system weighs under 40 lbs — genuinely one-person load-in. The limitations are real: five channels will not cover a full band, maximum SPL is modest next to the K12.2 or ZLX-12P-G2, and the column design limits horizontal coverage control. But for solo performers, DJs and presenters who value setup speed above raw volume, the Stagepas 1K MKII is hard to beat.</p>`,
    content_es: `<p><strong>El Stagepas 1K MKII es un array de columna, subwoofer y mezclador en un solo paquete transportable.</strong> 1100W de potencia pico moviendo un subwoofer de 12 pulgadas y un array lineal de 10 drivers da a las salas pequeñas la proyección y claridad de un sistema apilado sin el camión lleno de equipo. El mezclador digital integrado de 5 canales con efectos SPX y EQ de una perilla por canal significa que un cantautor puede enchufar, tocar un perilla y tocar.</p><p>La conectividad Bluetooth gestiona pistas de acompañamiento y reproducción de voz, y el sistema entero pesa menos de 18 kg — carga realmente de una sola persona. Las limitaciones son reales: cinco canales no cubren una banda completa, el SPL máximo es modesto junto al K12.2 o el ZLX-12P-G2, y el diseño de columna limita el control de cobertura horizontal. Pero para solistas, DJs y presentadores que valoran la velocidad de montaje por encima del volumen bruto, el Stagepas 1K MKII es difícil de superar.</p>`
  }
];

// === aplicar ===
const g1 = guides.find(x=>x.id==='active-vs-passive-pa');
const g2 = guides.find(x=>x.id==='live-sound-pa');

AVP_REVIEWS.forEach(r=>{
  if (!g1.sections.find(s=>s.heading===r.heading)) {
    g1.sections.push(r);
    console.log('  + active-vs-passive-pa: ' + r.heading);
  } else {
    console.log('  ya existe: ' + r.heading);
  }
});

LSP_REVIEWS.forEach(r=>{
  if (!g2.sections.find(s=>s.heading===r.heading)) {
    g2.sections.push(r);
    console.log('  + live-sound-pa: ' + r.heading);
  } else {
    console.log('  ya existe: ' + r.heading);
  }
});

fs.writeFileSync(BASE+'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nguides.json escrito');

// verificar
const G = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
console.log('\nactive-vs-passive-pa sections: ' + G.find(x=>x.id==='active-vs-passive-pa').sections.length);
console.log('live-sound-pa sections: ' + G.find(x=>x.id==='live-sound-pa').sections.length);