const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

function par(k, v) {
  if (!v) { console.log('\n--- ' + k + ' --- (vacio)'); return; }
  console.log('\n\n========== ' + k + ' ==========');
  console.log(v.replace(/<\/?p[^>]*>/g, '\n'));
}
par('intro', guia.intro);
par('intro_es', guia.intro_es);
par('description', guia.description);
par('description_es', guia.description_es);
par('conclusion', guia.conclusion);
par('conclusion_es', guia.conclusion_es);

// secciones 1 y 6
[1, 6].forEach(i => {
  const s = guia.sections[i];
  console.log('\n\n========== sections[' + i + '] · ' + s.heading + ' ==========');
  console.log('--- EN ---\n' + (s.content || '').replace(/<\/?p[^>]*>/g, '\n'));
  console.log('\n--- ES ---\n' + (s.content_es || '').replace(/<\/?p[^>]*>/g, '\n'));
});

// FAQ
const faq = guia.productTable ? null : null;
const claves = Object.keys(guia);
console.log('\n\nclaves: ' + claves.join(', '));
// buscar el FAQ en la guia (puede estar dentro de build-guides, no en el JSON)
const raw = fs.readFileSync(BASE + 'data/guides.json', 'utf8');
const m = raw.match(/"faq\w*":\s*\[[\s\S]{0,6000}?SM57[\s\S]{0,6000}?\]/);
console.log('\n=== FAQ en el JSON ===');
console.log(m ? m[0].slice(0, 1500) : '(no hay FAQ en guides.json -> esta en build-guides.js)');

// la tabla: fila Micrófono y fila Total
const t = guia.productTable;
console.log('\n\n=== TABLA: filas ===');
t.rows.forEach((r, i) => console.log('  [' + i + '] ' + r.label + ' | ' + r.label_es));
