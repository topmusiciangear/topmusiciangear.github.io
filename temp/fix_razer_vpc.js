var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// Fix Razer Seiren V3 Pro (index 7)
g.verdictProsCons[7] = {
  name: 'Razer Seiren V3 Pro',
  name_es: 'Razer Seiren V3 Pro',
  pros: [
    'Ultra-low self-noise (14 dBA) — among the quietest USB condensers for clean vocal capture',
    'Up to 192 kHz / 24-bit sample rates — high-res capture for streaming and post-production',
    '1 x 25 mm condenser capsule with 20 Hz – 20 kHz response — detailed, full-range sound',
    'Tap-to-mute sensor with LED status + analog gain knob — tactile control without software',
    'Supercardioid-like directivity (tight cardioid) — excellent rear rejection for noisy desks'
  ],
  pros_es: [
    'Auto-ruido ultra-bajo (14 dBA) — de los condensadores USB más silenciosos para captura vocal limpia',
    'Hasta 192 kHz / 24-bit de tasa de muestreo — captura de alta resolución para streaming y post-producción',
    'Cápsula condensadora de 1 x 25 mm con respuesta 20 Hz – 20 kHz — sonido detallado y de rango completo',
    'Sensor tap-to-mute con LED + perilla analógica de ganancia — control táctil sin software',
    'Directividad supercardioide (cardioide cerrada) — excelente rechazo trasero para escritorios ruidosos'
  ],
  cons: [
    'Cardioid only — no multi-pattern (omni, figure-8, stereo) like the Yeti or G-Track Pro',
    'Razer Synapse required for advanced EQ, compressor, and noise gate settings',
    'Premium price (~$159) for a single-pattern condenser; the G-Track Pro adds interface + multi-pattern for similar money',
    'Included desktop stand is bulky and non-adjustable; a boom arm is recommended for proper positioning',
    'No XLR output — cannot migrate to a professional analog interface later'
  ],
  cons_es: [
    'Solo cardioide — sin multi-patrón (omni, figura-8, estéreo) como el Yeti o G-Track Pro',
    'Razer Synapse requerido para EQ avanzado, compresor y noise gate',
    'Precio premium (~$159) para un condensador de un solo patrón; el G-Track Pro añade interfaz + multi-patrón por precio similar',
    'Soporte de escritorio incluido es voluminoso y no ajustable; se recomienda brazo articulado para posicionamiento correcto',
    'Sin salida XLR — no se puede migrar a interfaz analógica profesional después'
  ]
};

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('Fixed Razer Seiren V3 Pro VPC');
console.log('Pros:', g.verdictProsCons[7].pros.length);
console.log('Cons:', g.verdictProsCons[7].cons.length);