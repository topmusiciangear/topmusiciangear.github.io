const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'best-microphone');
const log = [];

// ============================================================
// ERROR FACTUAL: el AT2020USB-X NO tiene salida XLR.
// Ficha oficial de Audio-Technica: "Output Connector: USB Type-C".
// El unico conector de salida es USB-C; los accesorios que incluye son
// soporte, adaptador de rosca y cable USB-C. No hay XLR en ningun sitio.
// Esto es ademas lo que distingue a este micro del Rode PodMic USB y el
// Samson Q2U, que SI lo tienen.
// ============================================================
const oldEn = 'it delivers clean condenser sound with both USB and XLR outputs, so you can start simple and upgrade your chain later without buying a new mic';
const oldEs = 'ofrece sonido de condensador de calidad de estudio con salidas USB y XLR, así que puedes empezar de forma sencilla y mejorar tu cadena sin comprar un micrófono nuevo';

const newEn = 'it delivers clean studio-grade condenser sound over USB-C with a real headphone mix control, no interface needed. It is USB-only, so if you want an XLR to move to a studio later, the Rode PodMic USB or the Samson Q2U are the picks';
const newEs = 'ofrece sonido de condensador de calidad de estudio por USB-C con una perilla de mezcla real en los auriculares, sin necesidad de interfaz. Es solo USB, así que si quieres un XLR para pasar a un estudio más adelante, las opciones son el Rode PodMic USB o el Samson Q2U';

const s = g.sections[2];
if (s.content.indexOf(oldEn) === -1) throw new Error('texto EN no encontrado (aborto)');
if (s.content_es.indexOf(oldEs) === -1) throw new Error('texto ES no encontrado (aborto)');

s.content = s.content.replace(oldEn, newEn);
s.content_es = s.content_es.replace(oldEs, newEs);
log.push('best-microphone / section "USB Microphones: Plug-and-Play for Creators"');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// verificacion
const all = JSON.stringify(guides);
console.log('CAMBIOS (' + log.length + '):');
log.forEach(l => console.log('  - ' + l));
console.log('');
console.log('EN ahora:');
console.log('  ' + s.content.replace(/<[^>]+>/g, '').split('The Audio-Technica')[1]);
console.log('');
console.log('ES ahora:');
console.log('  ' + s.content_es.replace(/<[^>]+>/g, '').split('El Audio-Technica')[1]);
console.log('');
console.log('=== control: el AT2020USB-X ya no aparece con XLR en ninguna guia ===');
guides.forEach(function (x) {
  const t = JSON.stringify(x);
  const re = /[^"]{0,120}AT2020USB-X[^"]{0,160}XLR[^"]{0,80}/gi;
  const m = t.match(re);
  if (m) { m.forEach(h => console.log('  [!!] ' + x.id + ': ' + h.slice(0, 190))); }
});
console.log('  (sin salida = OK)');