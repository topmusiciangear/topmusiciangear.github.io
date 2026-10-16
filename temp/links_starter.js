const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
console.log('=== secciones de starter-studio (para anclar links) ===');
s.sections.forEach((sec, i) => {
  const txt = (sec.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('\n[' + i + '] ' + sec.heading + '  (' + txt.split(' ').length + ' palabras)');
});
console.log('\n\n=== guias candidatas para enlazar ===');
['best-interface', 'budget-interfaces', 'scarlett-vs-ssl', 'best-microphone', 'budget-mics', 'best-monitors-for-small-rooms', 'budget-monitors', 'best-headphones', 'studio-furniture', 'best-condenser-mics'].forEach(id => {
  const x = g.find(y => y.id === id);
  if (x) console.log('  ' + id.padEnd(30) + (x.title || '').slice(0, 55) + '  |  ' + (x.title_es || '').slice(0, 50));
  else console.log('  ' + id + '  NO EXISTE');
});
