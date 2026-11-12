// temp/verify_qf_pages.js — verifica quickfacts traducidos en páginas generadas
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const es = fs.readFileSync(B + 'best-condenser-mics_es.html', 'utf8');
const en = fs.readFileSync(B + 'best-condenser-mics.html', 'utf8');
const count = (s, re) => (s.match(re) || []).length;
for (const [name, html] of [['ES', es], ['EN', en]]) {
  console.log('== ' + name);
  console.log('Cardioide:', count(html, /Cardioide/g), '| Condensador:', count(html, /Condensador/g));
  console.log('qf-value Cardioid EN:', count(html, /qf-value">Cardioid/g), '| qf-value Condenser EN:', count(html, /qf-value">Condenser/g));
  console.log('Hipercardioide:', count(html, /Hipercardioide/g), '| Figura de 8:', count(html, /Figura de 8/g), '| macOS y Windows:', count(html, /macOS y Windows/g));
}
const ag = fs.readFileSync(B + 'acoustic-guitars-guide_es.html', 'utf8');
console.log('== acoustic ES: Abeto macizo:', count(ag, /Abeto macizo/g), '| Palo rosa:', count(ag, /Palo rosa/g), '| 645 mm:', count(ag, /645 mm/g), '| 648 mm:', count(ag, /648 mm/g), '| Solid spruce:', count(ag, /Solid spruce/g));
