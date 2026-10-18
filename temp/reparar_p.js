const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

function reparar(cont) {
  const cuerpos = cont.split('</p>').join('').split('<p>').map(x => x.trim()).filter(Boolean);
  return cuerpos.map(c => '<p>' + c + '</p>').join('');
}

// 1) diagnostico BEFORE en todas las secciones
console.log('=== ANTES ===');
let rotas = 0;
g.sections.forEach((s, i) => {
  ['content', 'content_es'].forEach(k => {
    const c = s[k] || '';
    const a = (c.match(/<p>/g) || []).length, b = (c.match(/<\/p>/g) || []).length;
    if (a !== b) { rotas++; console.log('  ROTA  [' + i + '].' + k + '  <p>=' + a + ' </p>=' + b); }
  });
});
console.log('  secciones rotas: ' + rotas);

// 2) reparar solo las que esten desbalanceadas
let reparadas = 0;
g.sections.forEach(s => {
  ['content', 'content_es'].forEach(k => {
    const c = s[k] || '';
    const a = (c.match(/<p>/g) || []).length, b = (c.match(/<\/p>/g) || []).length;
    if (a !== b && a > 0) { s[k] = reparar(c); reparadas++; }
  });
});

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');

// 3) verificacion AFTER en TODA la guia
console.log('');
console.log('=== DESPUES ===');
const g2 = JSON.parse(fs.readFileSync(rg, 'utf8')).find(x => x.id === 'best-home-studio-speakers');
let malas = 0;
g2.sections.forEach((s, i) => {
  ['content', 'content_es'].forEach(k => {
    const c = s[k] || '';
    const a = (c.match(/<p>/g) || []).length, b = (c.match(/<\/p>/g) || []).length;
    if (a !== b) { malas++; console.log('  ROTA  [' + i + '].' + k + '  <p>=' + a + ' </p>=' + b); }
  });
});
console.log('  reparadas: ' + reparadas + ' | secciones rotas ahora: ' + malas);
const st = x => String(x).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
console.log('');
console.log('EN(3): ' + st(g2.sections[7].content.split('</p>')[3]));
console.log('');
console.log('ES(3): ' + st(g2.sections[7].content_es.split('</p>')[3]));