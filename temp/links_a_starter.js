const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const porId = {};
g.forEach(x => { porId[x.id] = x; });

// seccion -> guia destino (una por tema, al final de la seccion, estilo guide-link-btn)
const MAPA = { 2: 'scarlett-vs-ssl', 10: 'budget-interfaces', 4: 'best-interface', 12: 'best-microphone', 13: 'budget-mics', 3: 'best-monitors-for-small-rooms', 17: 'budget-monitors', 14: 'best-headphones', 5: 'best-condenser-mics', 18: 'studio-furniture' };

Object.entries(MAPA).forEach(([sec, dest]) => {
  const d = porId[dest];
  if (!d) { console.log('  FALLA destino inexistente: ' + dest); return; }
  const btnEN = '<p><a href="/guides/' + dest + '.html" class="guide-link-btn">' + d.title + '</a></p>';
  const btnES = '<p><a href="/guides/' + dest + '_es.html" class="guide-link-btn">' + d.title_es + '</a></p>';
  if (s.sections[sec].content.includes('/guides/' + dest + '.html')) { console.log('  ya estaba sec[' + sec + '] -> ' + dest); return; }
  s.sections[sec].content += btnEN;
  s.sections[sec].content_es += btnES;
  console.log('  ok  sec[' + sec + '] -> ' + dest);
});
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
