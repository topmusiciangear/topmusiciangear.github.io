const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const usos = [...s.matchAll(/\.faqs?\b/g)].map(m => m.index);
console.log('usos de .faq(s): ' + usos.length);
usos.slice(0, 10).forEach(i => {
  console.log('\n--- ' + i + ' ---');
  console.log(s.slice(Math.max(0, i - 260), i + 200).replace(/\n\s*\n/g, '\n'));
});
console.log('\n--- claves de faqBase ---');
const ini = s.indexOf('var faqBase = {');
const fin = s.indexOf('\n};', ini);
const bloque = s.slice(ini, fin);
[...bloque.matchAll(/^\s{2}([a-z_]+):\s*\[/gm)].forEach(m => console.log('  ' + m[1]));
