const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

function ver(titulo, valor) {
  console.log('\n\n########## ' + titulo + ' ##########');
  console.log(valor.replace(/<\/p>/g, '</p>\n'));
}

// 1) seccion del SM57 (limites) — el "necessary Adelantan"
const sm57 = guia.sections.find(s => (s.content_es || '').indexOf('Necessary Adelantan') > -1);
ver('SECCION SM57 · EN', sm57.content);
ver('SECCION SM57 · ES', sm57.content_es);

// 2) seccion Rokit 7 — el woofer de ocho pulgadas
const rok = guia.sections.find(s => (s.content_es || '').indexOf('woofer de ocho pulgadas') > -1);
ver('SECCION ROKIT · EN', rok.content);
ver('SECCION ROKIT · ES', rok.content_es);

// 3) seccion del MDR-7506 — amplificador y traduccion
const mdr = guia.sections.find(s => (s.content_es || '').indexOf('por traducción') > -1);
ver('SECCION MDR · EN', mdr.content);
ver('SECCION MDR · ES', mdr.content_es);

// 4) seccion M20x — la minuscula tras punto
const m20 = guia.sections.find(s => (s.content_es || '').indexOf('plana, honesta, sin color') > -1);
ver('SECCION M20X · EN', m20.content);
ver('SECCION M20X · ES', m20.content_es);

// 5) veredicto del SM57 — los 250 ohmios
const vp = guia.verdictProsCons.find(v => JSON.stringify(v).indexOf('250 ohms') > -1 || JSON.stringify(v).indexOf('250 ohmios') > -1);
ver('VEREDICTO SM57 · EN', 'PROS: ' + JSON.stringify(vp.pros) + '\nCONS: ' + JSON.stringify(vp.cons));
ver('VEREDICTO SM57 · ES', 'PROS: ' + JSON.stringify(vp.pros_es) + '\nCONS: ' + JSON.stringify(vp.cons_es));

// 6) veredicto del MDR — serves
const vm = guia.verdictProsCons.find(v => JSON.stringify(v).indexOf('serves') > -1);
ver('VEREDICTO MDR · EN', JSON.stringify(vm.pros));
ver('VEREDICTO MDR · ES', JSON.stringify(vm.pros_es));

// 7) seccion Auto Gain — wish suerte y el | suelto
const ag = guia.sections.find(s => (s.content_es || '').indexOf('te wish suerte') > -1);
ver('SECCION AUTO GAIN · ES', ag.content_es);
