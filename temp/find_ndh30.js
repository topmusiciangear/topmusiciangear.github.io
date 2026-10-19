const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

for (const gid of ['open-headphones', 'best-headphones', 'tracking-headphones']) {
  const g = guides.find(x => x.id === gid);
  if (!g) continue;
  (g.sections || []).forEach((s, i) => {
    if (/NDH 30/i.test(s.heading || '')) {
      console.log('=== ' + gid + ' :: ' + s.heading + ' ===');
      console.log((s.content || '').replace(/<[^>]+>/g, ''));
    }
  });
  const vpc = (g.verdictProsCons || []).find(v => /NDH 30/i.test(v.name || ''));
  if (vpc) {
    console.log('\n=== ' + gid + ' :: veredicto NDH 30 ===');
    console.log('pros:', vpc.pros);
    console.log('cons:', vpc.cons);
  }
}
