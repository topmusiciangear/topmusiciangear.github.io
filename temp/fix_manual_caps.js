// Fixes manuales a forma final en data/guides.json (raw split/join, sin round-trip JSON)
// - typo "Sona como" -> "suena como" (best-synth-vsts)
// - typo "nT-USB" -> "NT-USB" (budget-usb-mics)
// - gramática "que traducen tus mezclas" -> "que traduce tus mezclas" (best-monitors HS8)
// - género "El Suite" -> "la suite" + Title Case final (ozone-vs-fabfilter, vocalign-vs-revoice-pro)
// - "de Piano" -> "de piano" genérico (best-piano-keyboard-vsts, NO producto "Grand Piano")
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
const raw = fs.readFileSync(p, 'utf8');

const fixes = [
  // [id (solo para log), ANTES, DESPUÉS]
  ['best-synth-vsts s1', 'u-he Diva: La Emulación Analógica que Sona como Hardware', 'u-he Diva: la emulación analógica que suena como hardware'],
  ['budget-usb-mics s7', '¿Es el Rode nT-USB mini el mejor micro USB premium compacto?', '¿Es el Rode NT-USB mini el mejor micro USB premium compacto?'],
  ['best-monitors s4', 'Yamaha HS8: El estándar honesto que traducen tus mezclas', 'Yamaha HS8: el estándar honesto que traduce tus mezclas'],
  ['ozone-vs-fabfilter s0', 'iZotope Ozone 12 Advanced: El Suite Asistido por IA que Masteriza Tu Track por Ti', 'iZotope Ozone 12 Advanced: la suite asistida por IA que masteriza tu track por ti'],
  ['ozone-vs-fabfilter s1', 'FabFilter Mastering Bundle: El Kit del Ingeniero Quirúrgico para Control de Precisión', 'FabFilter Mastering Bundle: el kit del ingeniero quirúrgico para control de precisión'],
  ['vocalign-vs-revoice-pro s1', 'Synchro Arts Revoice Pro 5: El Suite Independiente para Proyectos Vocales a Gran Escala', 'Synchro Arts Revoice Pro 5: la suite independiente para proyectos vocales a gran escala'],
  ['best-piano-keyboard-vsts s1', 'Native Instruments Kontakt 8: La Plataforma de Muestreo donde Viven las Mejores Bibliotecas de Piano', 'Native Instruments Kontakt 8: la plataforma de muestreo donde viven las mejores bibliotecas de piano'],
  ['best-piano-keyboard-vsts s4', 'Native Instruments Noire: Intimidad de Piano de Fieltro para Cine y Ambient', 'Native Instruments Noire: intimidad de piano de fieltro para cine y ambient'],
];

let out = raw;
let ok = 0, fail = 0;
for (const [id, before, after] of fixes) {
  const needle = '"' + JSON.stringify(before).slice(1, -1) + '"';
  const n = out.split(needle).length - 1;
  if (n !== 1) { fail++; console.log('FAIL (' + n + ' apariciones): ' + id); continue; }
  out = out.split(needle).join('"' + JSON.stringify(after).slice(1, -1) + '"');
  ok++;
  console.log('OK: ' + id);
}
JSON.parse(out); // validación
if (fail) { console.log('FALLOS: ' + fail + ' — no se escribe nada'); process.exit(1); }
fs.writeFileSync(p, out, 'utf8');
console.log('ESCRITO: ' + ok + ' fixes aplicados');
