const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
['best-compact-mixers.html', 'best-compact-mixers_es.html'].forEach(f => {
  const d = fs.readFileSync(B + f, 'utf8');
  const t = ((d.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').trim();
  const h1 = ((d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '').trim();
  console.log(f + '\n  title: ' + t + '\n  h1: ' + h1);
});
