const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'portable-interfaces');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// Anchors SEC0 SEC1: EN hrefs -> ES + titulos
swap('href=\\"/guides/best-interface.html\\" class=\\"guide-link-btn\\">Guía de mejores interfaces de audio</a>',
  'href=\\"/guides/best-interface_es.html\\" class=\\"guide-link-btn\\">Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('href=\\"/guides/best-interface.html\\" class=\\"guide-link-btn\\">Mejores interfaces de audio</a>',
  'href=\\"/guides/best-interface_es.html\\" class=\\"guide-link-btn\\">Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('href=\\"/guides/budget-interfaces.html\\" class=\\"guide-link-btn\\">Mejores interfaces económicas</a>',
  'href=\\"/guides/budget-interfaces_es.html\\" class=\\"guide-link-btn\\">Mejores interfaces de audio por menos de $300</a>');
swap('href=\\"/guides/scarlett-vs-volt.html\\" class=\\"guide-link-btn\\">Scarlett 2i2 vs UA Volt 2</a>',
  'href=\\"/guides/scarlett-vs-volt_es.html\\" class=\\"guide-link-btn\\">Scarlett 2i2 vs UA Volt 2: interfaz económica</a>');
swap('href=\\"/guides/audient-vs-motu.html\\" class=\\"guide-link-btn\\">Audient iD14 vs MOTU M2</a>',
  'href=\\"/guides/audient-vs-motu_es.html\\" class=\\"guide-link-btn\\">Audient iD14 vs MOTU M2: duelo de interfaces USB-C</a>');
// Texto profundo
swap('backstage en un concierto, o en casa de un amigo', 'tras el escenario en un concierto o en casa de un amigo');
swap('El peaje es la complejidad: TotalMix premia el estudio', 'El precio es la complejidad: TotalMix premia el estudio');
swap('El aparato seduce a creadores móviles que emiten sets', 'La interfaz seduce a creadores móviles que emiten sets');
swap('con 44.1 o 48 kHz en rutas OTG', 'con 44,1 o 48 kHz en rutas OTG');
swap('mientras loopback, MIDI y salidas DC-coupled extienden la caja entre streaming',
  'mientras loopback, MIDI y salidas DC-coupled extienden la caja hacia streaming');
swap('y el bus USB elimina cazas de alimentador', 'y el bus USB elimina la búsqueda de alimentador');
swap('Mismo cuerpo portable alimentado por bus', 'Mismo cuerpo portátil alimentado por bus');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
