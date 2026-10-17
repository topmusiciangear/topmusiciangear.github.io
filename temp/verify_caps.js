const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const casos = [
  ['best-midi-theory-plugins_es.html', 'Mejores plugins de MIDI y teoría musical para acelerar tu flujo de trabajo'],
  ['best-piano-keyboard-vsts_es.html', 'Mejores VST de piano y teclado virtual para producción en estudio'],
  ['best-synth-vsts_es.html', 'Mejores VST de sintetizador: estándares para productores modernos'],
  ['best-audio-repair-plugins_es.html', 'Mejores plugins de reparación de audio y restauración de ruido'],
  ['best-guitar-plugins_es.html', 'Mejores plugins de guitarra y simuladores de amplificador'],
  ['repitch-vs-melodyne_es.html', 'Melodyne: el editor quirúrgico que hace que lo perfecto suene natural'],
  ['best-synth-vsts.html', 'Best Synth VSTs: Industry Standards for Modern Producers'],
  ['repitch-vs-melodyne.html', 'Synchro Arts RePitch 2 Standard: Which Pitch Editor to Buy?']
];
casos.forEach(([f, esperado]) => {
  const h = fs.readFileSync(B + 'guides/' + f, 'utf8');
  const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const og = (h.match(/property="og:title" content="([^"]*)"/) || [])[1] || '';
  console.log(f.padEnd(38) + 'title: ' + (t === esperado ? 'OK' : '-> "' + t + '"'));
  console.log(' '.repeat(39) + 'og: ' + (og === esperado ? 'OK' : '-> "' + og + '"'));
});
// ninguna mayuscula sneilimitada en titulos ES
const caps = [];
['best-midi-theory-plugins', 'best-synth-vsts', 'best-piano-keyboard-vsts', 'best-audio-repair-plugins', 'best-guitar-plugins', 'best-multi-effects-pedals'].forEach(id => {
  const h = fs.readFileSync(B + 'guides/' + id + '_es.html', 'utf8');
  const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (/\b[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+/.test(t)) caps.push(id + ': ' + t);
});
console.log('\ntitulos ES con dos mayusculas seguidas: ' + caps.length);
caps.forEach(c => console.log('  ' + c));