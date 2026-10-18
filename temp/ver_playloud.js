const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const todo = JSON.stringify(g);

console.log('=== OCURRENCIAS DE "PLAY LOUD" / "TOCAS FUERTE" ===');
['play loud', 'tocas fuerte', 'play it loud', 'suena fuerte'].forEach(k => {
  const n = (todo.split(k).length - 1);
  console.log('  ' + k + ': ' + n);
});

// contexto
const idx = todo.indexOf('play loud');
if (idx >= 0) console.log('\nEN: ...' + todo.slice(Math.max(0, idx - 130), idx + 90) + '...');
const idx2 = todo.indexOf('tocas fuerte');
if (idx2 >= 0) console.log('ES: ...' + todo.slice(Math.max(0, idx2 - 150), idx2 + 80) + '...');
