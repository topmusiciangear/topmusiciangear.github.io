const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'))
  .find(x => x.id === 'best-home-studio-speakers');
const st = s => String(s).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const desde = parseInt(process.argv[2] || '0', 10);
const hasta = parseInt(process.argv[3] || '3', 10);
for (let i = desde; i < Math.min(hasta, g.sections.length); i++) {
  console.log('===== [' + i + '] ' + g.sections[i].heading_es);
  g.sections[i].content_es.split('</p>').map(st).filter(Boolean)
    .forEach((p, j) => console.log('  (' + (j + 1) + ') ' + p));
  console.log('');
}