var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// Rebuild productTable.rows with proper specs for 9 columns
// Column order: MV7+, Wave:3, AT2040USB, Profile, NT1 5th Gen, NT-USB+, QuadCast S, Seiren V3 Pro, G-Track Pro
g.productTable.rows = [
  {
    label: 'Best For',
    label_es: 'Ideal para',
    values: [
      { value: 'Pro streaming & podcasting with XLR backup', value_es: 'Streaming y podcast pro con respaldo XLR' },
      { value: 'Content creators wanting Wave Link mixing', value_es: 'Creadores que quieren mezcla Wave Link' },
      { value: 'Budget broadcast-style dynamic USB mic', value_es: 'Micrófono dinámico USB estilo broadcast económico' },
      { value: 'Plug-and-play streaming with hardware controls', value_es: 'Streaming conectar-y-usar con controles físicos' },
      { value: 'Versatile studio vocals, 32-bit float safety', value_es: 'Vocales de estudio versátiles, seguridad 32-bit float' },
      { value: 'Streamers upgrading from Yeti, internal APHEX DSP', value_es: 'Streamers que vienen de Yeti, DSP APHEX interno' },
      { value: 'Gaming/streaming with RGB and tap-to-mute', value_es: 'Gaming/streaming con RGB y silencio al toque' },
      { value: 'Gaming/streaming, high sample rate, RGB', value_es: 'Gaming/streaming, alta tasa de muestreo, RGB' },
      { value: 'Pro gaming/streaming, dual interface + mic', value_es: 'Gaming/streaming pro, doble interfaz + mic' }
    ]
  },
  {
    label: 'Estimated Price',
    label_es: 'Precio estimado',
    values: [
      { value: '~$199–$299', value_es: '~$199–$299' },
      { value: '~$119.99', value_es: '~$119.99' },
      { value: '~$159', value_es: '~$159' },
      { value: '~$199', value_es: '~$199' },
      { value: '~$219', value_es: '~$219' },
      { value: '~$169', value_es: '~$169' },
      { value: '~$139', value_es: '~$139' },
      { value: '~$159', value_es: '~$159' },
      { value: '~$149', value_es: '~$149' }
    ]
  },
  {
    label: 'Type',
    label_es: 'Tipo',
    values: [
      { value: 'Dynamic (moving coil), USB-C + XLR', value_es: 'Dinámico (bobina móvil), USB-C + XLR' },
      { value: 'Condenser (electret), USB', value_es: 'Condensador (electret), USB' },
      { value: 'Dynamic (moving coil), USB-C', value_es: 'Dinámico (bobina móvil), USB-C' },
      { value: 'Condenser (pre-polarized), USB', value_es: 'Condensador (pre-polarizado), USB' },
      { value: 'Condenser (1-inch LDC), XLR + USB-C', value_es: 'Condensador (LDC 1 pulg), XLR + USB-C' },
      { value: 'Condenser, cardioid, USB-C', value_es: 'Condensador, cardioide, USB-C' },
      { value: 'Condenser, cardioid, USB', value_es: 'Condensador, cardioide, USB' },
      { value: 'Condenser, cardioid, USB-C', value_es: 'Condensador, cardioide, USB-C' },
      { value: 'Condenser, cardioid, USB-C', value_es: 'Condensador, cardioide, USB-C' }
    ]
  },
  {
    label: 'Polar Pattern',
    label_es: 'Patrón Polar',
    values: [
      { value: 'Cardioid', value_es: 'Cardioide' },
      { value: 'Cardioid', value_es: 'Cardioide' },
      { value: 'Hypercardioid', value_es: 'Hipercardioide' },
      { value: 'Cardioid', value_es: 'Cardioide' },
      { value: 'Cardioid', value_es: 'Cardioide' },
      { value: 'Cardioid', value_es: 'Cardioide' },
      { value: 'Cardioid', value_es: 'Cardioide' },
      { value: 'Cardioid', value_es: 'Cardioide' },
      { value: 'Cardioid', value_es: 'Cardioide' }
    ]
  },
  {
    label: 'Frequency Response',
    label_es: 'Respuesta en Frecuencia',
    values: [
      { value: '50 Hz – 16 kHz', value_es: '50 Hz – 16 kHz' },
      { value: '70 Hz – 20 kHz', value_es: '70 Hz – 20 kHz' },
      { value: '80 Hz – 16 kHz', value_es: '80 Hz – 16 kHz' },
      { value: '20 Hz – 20 kHz', value_es: '20 Hz – 20 kHz' },
      { value: '20 Hz – 20 kHz', value_es: '20 Hz – 20 kHz' },
      { value: '20 Hz – 20 kHz', value_es: '20 Hz – 20 kHz' },
      { value: '20 Hz – 20 kHz', value_es: '20 Hz – 20 kHz' },
      { value: '20 Hz – 20 kHz', value_es: '20 Hz – 20 kHz' },
      { value: '20 Hz – 20 kHz', value_es: '20 Hz – 20 kHz' }
    ]
  },
  {
    label: 'Sensitivity',
    label_es: 'Sensibilidad',
    values: [
      { value: 'XLR: -55 dBV/Pa; USB: -33 dBFS', value_es: 'XLR: -55 dBV/Pa; USB: -33 dBFS' },
      { value: '-25 dBFS (min gain)', value_es: '-25 dBFS (ganancia mín)' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: '-10 dBFS @ 80 dB SPL (max gain)', value_es: '-10 dBFS @ 80 dB SPL (ganancia máx)' },
      { value: '-32 dB re 1 V/Pa (25 mV)', value_es: '-32 dB re 1 V/Pa (25 mV)' },
      { value: '-34 dBV/Pa (20 mV)', value_es: '-34 dBV/Pa (20 mV)' },
      { value: '-36 dBV/Pa (16 mV)', value_es: '-36 dBV/Pa (16 mV)' },
      { value: '-38 dBV/Pa (12.6 mV)', value_es: '-38 dBV/Pa (12.6 mV)' },
      { value: '-36 dBV/Pa (16 mV)', value_es: '-36 dBV/Pa (16 mV)' }
    ]
  },
  {
    label: 'Self-Noise',
    label_es: 'Auto-ruido',
    values: [
      { value: 'N/A (dynamic)', value_es: 'N/A (dinámico)' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: 'N/A (dynamic)', value_es: 'N/A (dinámico)' },
      { value: '34 dB(A) SPL (min gain)', value_es: '34 dB(A) SPL (ganancia mín)' },
      { value: '4 dBA', value_es: '4 dBA' },
      { value: '14 dB-A (A-weighted)', value_es: '14 dB-A (ponderado A)' },
      { value: '24 dB-A', value_es: '24 dB-A' },
      { value: '14 dB-A', value_es: '14 dB-A' },
      { value: '14 dB-A', value_es: '14 dB-A' }
    ]
  },
  {
    label: 'Max SPL',
    label_es: 'SPL Máximo',
    values: [
      { value: '128 dB (USB output)', value_es: '128 dB (salida USB)' },
      { value: '120 dB SPL (140 dB with Clipguard)', value_es: '120 dB SPL (140 dB con Clipguard)' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: '125 dB SPL (min gain)', value_es: '125 dB SPL (ganancia mín)' },
      { value: '142 dB SPL', value_es: '142 dB SPL' },
      { value: '118 dB SPL', value_es: '118 dB SPL' },
      { value: '120 dB', value_es: '120 dB' },
      { value: '120 dB', value_es: '120 dB' },
      { value: '120 dB', value_es: '120 dB' }
    ]
  },
  {
    label: 'Output Impedance',
    label_es: 'Impedancia de Salida',
    values: [
      { value: '350 Ω (XLR)', value_es: '350 Ω (XLR)' },
      { value: 'N/A (USB)', value_es: 'N/A (USB)' },
      { value: 'N/A (USB)', value_es: 'N/A (USB)' },
      { value: 'N/A (USB)', value_es: 'N/A (USB)' },
      { value: '100 Ω', value_es: '100 Ω' },
      { value: '16 Ω', value_es: '16 Ω' },
      { value: '16 Ω', value_es: '16 Ω' },
      { value: '16 Ω', value_es: '16 Ω' },
      { value: '16 Ω', value_es: '16 Ω' }
    ]
  },
  {
    label: 'Signal-to-Noise Ratio',
    label_es: 'Relación Señal/Ruido',
    values: [
      { value: 'Not published', value_es: 'No publicado' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: '74 dB', value_es: '74 dB' },
      { value: '72 dB', value_es: '72 dB' },
      { value: '82 dB', value_es: '82 dB' },
      { value: '76 dB', value_es: '76 dB' }
    ]
  },
  {
    label: 'Dynamic Range',
    label_es: 'Rango Dinámico',
    values: [
      { value: 'Not published', value_es: 'No publicado' },
      { value: '95 dB (115 dB with Clipguard)', value_es: '95 dB (115 dB con Clipguard)' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: '126 dB via USB 32-bit float', value_es: '126 dB vía USB 32-bit float' },
      { value: '97 dB', value_es: '97 dB' },
      { value: '96 dB', value_es: '96 dB' },
      { value: '106 dB', value_es: '106 dB' },
      { value: '100 dB', value_es: '100 dB' }
    ]
  },
  {
    label: 'THD at Max SPL',
    label_es: 'THD a SPL Máx',
    values: [
      { value: 'Not published', value_es: 'No publicado' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: '<1%', value_es: '<1%' },
      { value: '<1%', value_es: '<1%' },
      { value: '<0.5%', value_es: '<0.5%' },
      { value: '<1%', value_es: '<1%' }
    ]
  },
  {
    label: 'Capsule / Diaphragm',
    label_es: 'Cápsula / Diafragma',
    values: [
      { value: 'Dynamic moving-coil (size not disclosed)', value_es: 'Dinámico bobina móvil (tamaño no revelado)' },
      { value: '17 mm electret', value_es: '17 mm electret' },
      { value: 'Dynamic moving-coil (size not disclosed)', value_es: 'Dinámico bobina móvil (tamaño no revelado)' },
      { value: 'Cardioid condenser capsule (size not published)', value_es: 'Cápsula condensador cardioide (tamaño no publicado)' },
      { value: 'HF6 1-inch gold-sputtered condenser', value_es: 'HF6 condensador 1 pulg gold-sputtered' },
      { value: '0.5" (12.7 mm) condenser', value_es: '0.5" (12,7 mm) condensador' },
      { value: '1 x 25 mm condenser', value_es: '1 x 25 mm condensador' },
      { value: '1 x 25 mm condenser', value_es: '1 x 25 mm condensador' },
      { value: '1 x 25 mm condenser', value_es: '1 x 25 mm condensador' }
    ]
  },
  {
    label: 'Pad & High-Pass Filter',
    label_es: 'Pad y Filtro Paso-Alto',
    values: [
      { value: 'DSP HPF (75/150 Hz), limiter, compressor, Auto-Level', value_es: 'DSP HPF (75/150 Hz), limiter, compresor, Auto-Level' },
      { value: 'Clipguard anti-distortion; low-cut in Wave Link', value_es: 'Clipguard anti-distorsión; low-cut en Wave Link' },
      { value: '80 Hz low-cut', value_es: '80 Hz low-cut' },
      { value: 'Gain/mix/headphone controls, mute', value_es: 'Controles ganancia/mezcla/auriculares, mute' },
      { value: 'DSP HPF (75/150 Hz), compressor, gate, APHEX (USB)', value_es: 'DSP HPF (75/150 Hz), compresor, gate, APHEX (USB)' },
      { value: 'DSP: HPF, compressor, noise gate, APHEX Aural Exciter + Big Bottom', value_es: 'DSP: HPF, compresor, noise gate, APHEX Aural Exciter + Big Bottom' },
      { value: 'Software -10 dB pad', value_es: 'Software pad -10 dB' },
      { value: 'Software -10 dB pad', value_es: 'Software pad -10 dB' },
      { value: 'Software -10 dB pad, HPF', value_es: 'Software pad -10 dB, HPF' }
    ]
  },
  {
    label: 'Phantom Power',
    label_es: 'Alimentación Phantom',
    values: [
      { value: 'USB bus power; phantom-protected XLR', value_es: 'Alimentación USB bus; XLR protegido contra phantom' },
      { value: 'USB bus power', value_es: 'Alimentación USB bus' },
      { value: 'USB power (5 V)', value_es: 'Alimentación USB (5 V)' },
      { value: 'USB bus power', value_es: 'Alimentación USB bus' },
      { value: '+48 V (XLR); 5 V (USB)', value_es: '+48 V (XLR); 5 V (USB)' },
      { value: 'USB bus power (5 V)', value_es: 'Alimentación USB bus (5 V)' },
      { value: 'USB powered', value_es: 'Alimentado por USB' },
      { value: 'USB powered', value_es: 'Alimentado por USB' },
      { value: 'USB powered', value_es: 'Alimentado por USB' }
    ]
  },
  {
    label: 'Dimensions',
    label_es: 'Dimensiones',
    values: [
      { value: '169.5 × 90 mm', value_es: '169,5 × 90 mm' },
      { value: '153 × 66 × 40 mm', value_es: '153 × 66 × 40 mm' },
      { value: '145 × 52 mm', value_es: '145 × 52 mm' },
      { value: 'Ø50 × 152 mm (mic)', value_es: 'Ø50 × 152 mm (mic)' },
      { value: '52 × 52 × 189 mm', value_es: '52 × 52 × 189 mm' },
      { value: '184 × 62 × 50 mm', value_es: '184 × 62 × 50 mm' },
      { value: '180 x 60 x 60 mm', value_es: '180 x 60 x 60 mm' },
      { value: '160 x 55 x 50 mm', value_es: '160 x 55 x 50 mm' },
      { value: '160 x 55 x 50 mm', value_es: '160 x 55 x 50 mm' }
    ]
  },
  {
    label: 'Weight',
    label_es: 'Peso',
    values: [
      { value: '573 g', value_es: '573 g' },
      { value: '280 g (mic + mount)', value_es: '280 g (mic + soporte)' },
      { value: '600 g', value_es: '600 g' },
      { value: 'Not published', value_es: 'No publicado' },
      { value: '308 g', value_es: '308 g' },
      { value: '540 g (mic); 730 g with accessories', value_es: '540 g (mic); 730 g con accesorios' },
      { value: '254 g', value_es: '254 g' },
      { value: '280 g', value_es: '280 g' },
      { value: '280 g', value_es: '280 g' }
    ]
  }
];

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('Table rebuilt with proper specs for 9 columns');
console.log('Rows:', g.productTable.rows.length);
g.productTable.rows.forEach(function(r) { console.log(r.label, '->', r.values.length, 'values'); });