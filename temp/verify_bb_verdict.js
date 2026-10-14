const fs = require('fs');
const h = fs.readFileSync('guides/beginner-bass-guitars.html', 'utf8');
const he = fs.readFileSync('guides/beginner-bass-guitars_es.html', 'utf8');
const strip = (s) => s.replace(/<[^>]+>/g, '');
const checks = [
  ['veredicto BB234 EN', h.includes('best overall beginner bass')],
  ['veredicto TMB30 EN', h.includes('short-scale P/J comfort')],
  ['veredicto Bronco EN', h.includes('cheapest start')],
  ['veredicto BB234 ES', he.includes('mejor bajo para principiantes en general')],
  ['veredicto TMB30 ES', he.includes('comodidad P/J en escala corta')],
  ['conclusion escala corta EN', h.includes('30-inch basses with lower string tension')],
  ['conclusion escala corta ES', he.includes('bajos de 30 pulgadas')],
  ['heading viejo fuera EN', !h.includes('Fender Bass Guide</h2>') && !h.includes('>Fender Bass Guide<')],
  ['heading viejo fuera ES', !he.includes('>Guía de bajos Fender<')],
  ['heading nuevo EN', h.includes('Two Shapes of Tone')],
  ['heading nuevo ES', he.includes('dos formas de tono')],
  ['snippet sin numero EN', h.includes('Best Bass Guitars for Beginners') && !h.includes('5 Best Bass Guitars for Beginners')],
  ['snippet sin numero ES', he.includes('Mejores bajos para principiantes') && !he.includes('5 mejores bajos para principiantes')],
  ['snippet frase rota fuera', !strip(h).includes('real, present resonance at.')],
  ['10 tarjetas producto', (h.match(/class="guide-product-card"/g) || []).length === 10],
  ['10 columnas tabla', (h.match(/<th[^>]*>/g) || []).length >= 11]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);