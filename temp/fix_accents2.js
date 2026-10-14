const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/bbl_step1.js';
let s = fs.readFileSync(f, 'utf8');
const map = {
  mastil: 'mástil', habitat: 'hábitat', minima: 'mínima', mas: 'más',
  sesion: 'sesión', pediran: 'pedirán', exotico: 'exótico'
};
// solo dentro de literales de contenido ES: aplica global (el archivo es solo este swap)
let n = 0;
Object.keys(map).forEach(w => {
  const re = new RegExp('(?<![A-Za-zÁÉÍÓÚÑáéíóúñ])' + w + '(?![A-Za-zÁÉÍÓÚÑáéíóúñ])', 'g');
  const c = (s.match(re) || []).length;
  if (c) { s = s.replace(re, map[w]); n += c; }
});
fs.writeFileSync(f, s, 'utf8');
console.log('tildes aplicadas: ' + n);
const left = s.match(/[a-záéíóúñ]*(?:mastil|habitat|minima|mas|sesion|pediran|exotico)[a-záéíóúñ]*/gi);
console.log('restantes: ' + JSON.stringify([...new Set(left || [])]));