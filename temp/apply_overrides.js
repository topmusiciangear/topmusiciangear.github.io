const fs = require('fs');
const cur = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const overrides = {
  7: { en: "The ultimate rock machine, with Burstbucker pickups, a mahogany body topped with maple, and that unmistakable Les Paul sustain.", es: "La máquina de rock definitiva: pastillas Burstbucker, cuerpo de caoba con tapa de arce y ese inconfundible sustain Les Paul." },
  19: { en: "The industry standard for mixing: an 8-inch cone woofer, a 1-inch dome tweeter, and room control for accurate monitoring.", es: "El estándar de la industria para mezcla: woofer de cono de 8 pulgadas, tweeter de domo de 1 pulgada y control de sala para monitoreo preciso." },
  21: { en: "A cutting-edge 2-way monitor with an X-ART ribbon tweeter, exceptional transient response, deep bass, and precise 3D imaging.", es: "Monitor de 2 vías de vanguardia con tweeter de cinta X-ART, respuesta transitoria excepcional, graves profundos e imagen 3D precisa." },
  33: { en: "The ultimate rhythm machine, combining authentic 808, 909, and 707 sounds with sample import and advanced sequencing features.", es: "La máquina de ritmo definitiva: sonidos auténticos de 808, 909 y 707 combinados con importación de samples y secuenciación avanzada." },
  166: { en: "An iconic Beatle bass, the very model played by Paul McCartney: a hollow body that stays incredibly lightweight, with a warm, woody tone.", es: "Icónico bajo Beatle, el mismo modelo tocado por Paul McCartney: cuerpo hueco que lo mantiene increíblemente ligero, con un tono cálido y amaderado." },
  357: { en: "A white penguin-styled parlor with gold hardware, a Fishman Presys III pickup with tuner, and a punchy arched-maple voice.", es: "Parlor estilo pingüino blanco con herrajes dorados, pastilla Fishman Presys III con afinador y una voz arqueada de maple contundente." },
  429: { en: "A premium compact USB condenser with two pickup patterns, 24-bit audio, and zero-latency headphone monitoring for streaming.", es: "Condensador USB premium compacto con dos patrones de captación, audio de 24 bits y monitoreo de auriculares sin latencia para streaming." },
  430: { en: "A budget USB condenser kit with boom arm, pop filter, and shock mount, everything needed for a complete streaming setup.", es: "Kit de micrófono USB condensador económico con brazo, filtro pop y soporte antivibraciones: todo lo necesario para streaming completo." },
  512: { en: "A desktop USB-C AES67/Dante interface with 2 Neumann mic preamps to 78dB, a touchscreen, and DSP EQ, dynamics, and reverb.", es: "Interfaz USB-C AES67/Dante de escritorio con 2 previos Neumann hasta 78dB, pantalla táctil y DSP de EQ, dinámica y reverb." },
  513: { en: "A rack 16x22 TB3 USB-C interface with 8 Unison preamps, HEXA Core UAD DSP, Apollo Monitor Correction, Auto-Gain, and 7.1 surround.", es: "Interfaz de rack 16x22 TB3 USB-C con 8 previos Unison, HEXA Core UAD DSP, Apollo Monitor Correction, Auto-Gain y 7.1." },
  617: { en: "A pocket-size creative sampler with a granular engine, USB-C audio and MIDI, a rechargeable battery, and Roland master effects.", es: "Sampler creativo de bolsillo con motor granular, audio y MIDI USB-C, batería recargable y los efectos maestros de Roland." },
  1001: { en: "A powerful wavetable and granular synth with a visual modulation matrix, dual engines, and 104 different filter types for sound design.", es: "Sintetizador potente de wavetable y granular, con matriz de modulación visual, dos motores y 104 tipos de filtro para diseño sonoro." },
  1003: { en: "A semi-modular softsynth with three flexible oscillator lanes, over 40 modulation generators, and 300+ snapin effects for endless sound design.", es: "Softsint semi-modular con tres pistas de oscilador flexibles, más de 40 generadores de modulación y más de 300 efectos snap-in." },
  1010: { en: "An AI-powered drum pattern generator with smart genre detection, velocity control, and one-click pattern variation for instant beats.", es: "Generador de patrones de batería con IA, detección inteligente de género, control de velocidad y variación de patrones en un clic." },
  1020: { en: "An all-in-one amp modeler, FX suite, and virtual cabinet engine with component-level amps and studio-grade DynIR cabinets.", es: "Modelador de amplificadores, suite de efectos y motor de altavoces virtuales en uno, con amps a nivel de componente y cajas DynIR de estudio." },
  1023: { en: "Official Marshall amps, cabs, and pedals inside Softube Amp Room, including the platform's built-in studio effects for authentic tone.", es: "Amplificadores, cajas y pedales oficiales de Marshall dentro de Softube Amp Room, incluida la plataforma con efectos de estudio." },
  1025: { en: "The industry standard for audio repair: spectral editing, dialogue de-noise, de-reverb, de-essing, and music rebalance in one suite.", es: "El estándar del sector en reparación de audio: edición espectral, reducción de ruido en diálogos, eliminación de reverb, de-esser y reequilibrio musical." },
  1028: { en: "Four specialized restoration tools, DeNoise 2, DeHum 2, DeClick 2, and DeReverb 2, in an effective and affordable noise-reduction suite.", es: "Cuatro herramientas especializadas, DeNoise 2, DeHum 2, DeClick 2 y DeReverb 2, en una suite de reducción de ruido eficaz y asequible." },
  1030: { en: "A de-mixing-based de-reverb processor that surgically removes room acoustics from recordings made in problematic spaces.", es: "Procesador de eliminación de reverb basado en demix que quita de forma quirúrgica la acústica de la sala en grabaciones de espacios problemáticos." },
  1034: { en: "Pro-Q 3, Pro-L 2, Pro-C 2, and Pro-MB: surgical EQ, limiting, compression, and multiband processing for mastering and mixing.", es: "Pro-Q 3, Pro-L 2, Pro-C 2 y Pro-MB: EQ quirúrgico, limitador, compresión y procesamiento multibanda para masterizar y mezclar." },
  1038: { en: "A true-peak limiter for broadcast and streaming, offering surgical transparency with inter-sample peak detection for clean delivery.", es: "Limitador de pico real para radio y streaming, con transparencia total gracias a la detección de picos entre muestras en la entrega final." },
  1039: { en: "A complete vocal production bundle: natural pitch correction and industry-standard timing alignment in one package for polished vocals.", es: "Paquete completo de producción vocal: corrección de afinación natural y alineación temporal estándar del sector en un solo paquete." }
};

let count = 0;
for (const p of cur) {
  const o = overrides[p.id];
  if (o) {
    p.desc = o.en;
    p.desc_es = o.es;
    count++;
  }
}
// re-apply HD490
const c24 = cur.find(p => p.id === 24);
c24.title = 'Sennheiser HD 490 Pro';
c24.title_es = 'Sennheiser HD 490 Pro';
c24.price = 399;
c24.stores = {
  amazon: 'https://www.amazon.co.uk/dp/B0CP6C4J5W',
  zzounds: 'https://www.zzounds.com/item--SENHD490PRO',
  gear4music: 'https://www.gear4music.com/us/en/Recording-and-Computers/Sennheiser-HD-490-Pro-Open-Back-Headphones/65EU',
  musicstore: 'https://www.musicstore.com/en_OE/EUR/Sennheiser-HD-490-Pro/art-REC0016604-000',
  andertons: 'https://www.andertons.co.uk/sennheiser-hd-490-pro-headphones'
};

// fix HD490 desc to be natural (full first two sentences)
c24.desc = 'Modern open-back reference for mixing. Ultra-precise 38mm drivers, wide dimensional soundstage, switchable mixing and producing ear pads, and the dearVR MIX-SE plugin for confident mix translation.';
c24.desc_es = 'Referencia abierta moderna para mezcla. Drivers de 38mm ultraprecisos, escenario sonoro amplio y con profundidad, almohadillas intercambiables de mezcla y producción, y el plugin dearVR MIX-SE para una traducción de mezcla segura.';

fs.writeFileSync('data/products.json', JSON.stringify(cur, null, 2));
console.log('overrides applied:', count);