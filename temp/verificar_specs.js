const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

console.log('=== DESCRIPCIONES DEL CATALOGO ===\n');
[674, 3, 297, 25, 609, 20].forEach(id => {
  const x = p.find(y => y.id === id);
  console.log('  ' + id + '  ' + x.title);
  console.log('      EN: ' + x.desc.slice(0, 300));
  console.log('      ES: ' + x.desc_es.slice(0, 300));
  console.log('');
});

console.log('=== ENCABEZADOS CON CIFRAS QUE HAY QUE VERIFICAR ===\n');
s.sections.forEach((sec, i) => {
  const h = (sec.heading || '') + ' || ' + (sec.heading_es || '');
  if (/\$[\d,]+|\d[\d,]*\s?(dB|Hz|W|kg|W\b)|dB-A/.test(h)) {
    console.log('  [' + i + '] EN: ' + sec.heading);
    console.log('       ES: ' + sec.heading_es);
  }
});

console.log('\n=== "dB-A" vs "dBA" en la guia ===');
const t = JSON.stringify(s);
console.log('  "dB-A" : ' + (t.match(/dB-A/g) || []).length + ' usos');
console.log('  "dBA"  : ' + (t.match(/\bdBA\b/g) || []).length + ' usos');
console.log('\n  frases con "dB-A":');
(t.match(/[^"\\]{0,80}dB-A[^"\\]{0,80}/g) || []).forEach(x => console.log('    ...' + x.trim() + '...'));

console.log('\n=== cifras sueltas sin verificar en la guia ===');
['$3,000', '$3.000', 'a third of', 'por un tercio', 'collapsible frame', 'chasis plegable',
 '30 mm', '30 millimeters', 'treinta milímetros', '4-inch woofer', 'woofer de 4 pulgadas',
 '140W', '140 W', 'limit gain', 'limitar la ganancia']
  .forEach(k => {
    const n = (t.split(k).length - 1);
    if (n) console.log('  ' + String(n).padStart(3) + '  "' + k + '"');
  });
