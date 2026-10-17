const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const sobre = [];
guides.forEach(g => {
  [['EN', g.title], ['ES', g.title_es]].forEach(([k, t]) => {
    if (t && t.length > 60) sobre.push({ id: g.id, lang: k, len: t.length, titulo: t });
  });
});
console.log('titulos > 60 caracteres: ' + sobre.length + ' de ' + (guides.length * 2) + '\n');
sobre.forEach(x => console.log(x.lang + ' ' + String(x.len).padStart(3) + 'c  ' + x.id + '\n      ' + x.titulo));
// propuestas solo para los 5 que he tocado
const TOCADOS = ['best-audio-repair-plugins', 'best-guitar-plugins', 'best-midi-theory-plugins', 'best-piano-keyboard-vsts', 'best-synth-vsts'];
console.log('\nde los ya tocados: ' + TOCADOS.length);