const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'premium-interfaces');

// Blindaje: confirmar mapa de secciones antes de operar
const exp = { 1: [512], 2: [515], 3: [513], 4: [183], 5: [676], 6: [677], 7: [512], 8: [515], 9: [513], 10: [183], 11: [676], 12: [677] };
Object.keys(exp).forEach(k => {
  if (JSON.stringify((g.sections[k] || {}).products) !== JSON.stringify(exp[k])) die('seccion ' + k + ' no es la esperada');
});
console.log('mapa verificado: blurbs 1-6 + reviews 7-12');

const rep = (s, oldEn, newEn, oldEs, newEs) => {
  if (!s.content.includes(oldEn)) die('EN no coincide: ' + oldEn.slice(0, 50));
  s.content = s.content.split(oldEn).join(newEn);
  if (!s.content_es.includes(oldEs)) die('ES no coincide: ' + oldEs.slice(0, 50));
  s.content_es = s.content_es.split(oldEs).join(newEs);
};

// 1. MT48: headphone amps + Monitor Mission
rep(g.sections[7],
  'The brief reads as desktop recording fused with networked infrastructure.',
  'The brief reads as desktop recording fused with networked infrastructure. Two ultra-low-impedance headphone amps with crossfeed plus Monitor Mission scaling (up to 22.2, 128 AoIP sources) complete a desk that also runs a vocal booth or a location rig.',
  'El programa funde grabación de sobremesa e infraestructura en red.',
  'El programa funde grabación de sobremesa e infraestructura en red. Dos amplis de auriculares de impedancia ultrabaja con crossfeed más Monitor Mission (hasta 22.2, 128 fuentes AoIP) completan un sobremesa que también tira de una cabina vocal o un remoto.');
// 2. ORIA: outs con rele + remoto + trial
rep(g.sections[8],
  'while ADAT and AES expand the digital edges.',
  'while ADAT and AES expand the digital edges. Two relayed stereo outs, iPad/Stream Deck/Eucon remote and 60 dB Console pres cover switching and tracking — note the multichannel Sonarworks licence is a 60-day trial.',
  'mientras ADAT y AES expanden los bordes digitales.',
  'mientras ADAT y AES expanden los bordes digitales. Dos salidas estéreo con relé, remoto iPad/Stream Deck/Eucon y previos Console de 60 dB cubren conmutación y grabación; ojo: la licencia multicanal de Sonarworks es trial de 60 días.');
// 3. Apollo: TB3 obligatorio + plugins aparte
rep(g.sections[9],
  'the preamp-plus-processing density impresses.',
  'the preamp-plus-processing density impresses. Thunderbolt 3 is mandatory and the best UAD plug-ins cost extra — budget both in.',
  'la densidad previos-proceso impresiona.',
  'la densidad previos-proceso impresiona. Thunderbolt 3 es obligatorio y los mejores plugins UAD cuestan aparte: presupuesta ambos.');
// 4. UFX: DIGICheck + loopback + HP amps
rep(g.sections[10],
  'four hi-Z instrument inputs welcome guitars without extra boxes.',
  'four hi-Z instrument inputs welcome guitars without extra boxes. DIGICheck metering, loopback and two low-latency headphone amps complete the package.',
  'cuatro entradas hi-Z reciben guitarras sin cajas extra.',
  'cuatro entradas hi-Z reciben guitarras sin cajas extra. Medición DIGICheck, loopback y dos amplis de auriculares de baja latencia completan el paquete.');
// 5. Horizon: ASP8024-HE
rep(g.sections[11],
  'packs David Dearden-designed discrete pres with 75 dB gain, Smartgain',
  'packs David Dearden-designed discrete pres straight from the ASP8024-HE console, with 75 dB gain, Smartgain',
  'monta previos discretos de David Dearden con 75 dB, Smartgain',
  'monta previos discretos de David Dearden directos de la consola ASP8024-HE, con 75 dB, Smartgain');
// 6. Orion: cues casi mezcladas + CPU libre
rep(g.sections[12],
  'make it the hybrid-studio hub.',
  'make it the hybrid-studio hub where bands track with finished-sounding cues and the CPU stays free.',
  'lo vuelven el hub del estudio híbrido.',
  'lo vuelven el hub del estudio híbrido donde las bandas graban con cues casi mezcladas y la CPU queda libre.');
console.log('fusiones aplicadas EN+ES');

// Eliminar blurbs 1-6, conservar SEC0 general + reviews
g.sections = [g.sections[0], ...g.sections.slice(7)];
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('secciones finales:', g.sections.length);
g.sections.forEach((s, i) => console.log(' [' + i + '] ' + (s.h || s.heading || '?').slice(0, 60) + ' prod=' + JSON.stringify(s.products)));
