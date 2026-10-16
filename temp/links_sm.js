const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-monitors-for-small-rooms');
const t = JSON.stringify(s);
[...new Set([...t.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]{0,80})/g)].map(m => m[1] + '  ::  ' + m[2]))].forEach(x => console.log('  ' + x));
['monitor-setup', 'best-headphones', 'jbl-305p-vs-kali', 'adam-a7v-vs-genelec'].forEach(id => {
  const d = g.find(y => y.id === id);
  console.log(id + ': ' + (d ? d.title_es : 'NO EXISTE'));
});
console.log('\nEN headings con d3v/LP-UNF/MTM/iLoud:');
s.sections.forEach((sec, i) => console.log('  [' + i + '] ' + sec.heading));
