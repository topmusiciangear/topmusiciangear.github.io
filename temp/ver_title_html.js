const fs = require('fs');
['starter-studio.html', 'starter-studio_es.html'].forEach(f => {
  const d = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/' + f, 'utf8');
  const t = (d.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const h1 = ((d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '').trim();
  const meta = (d.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  console.log(f);
  console.log('  <title> (' + t.length + '): ' + t);
  console.log('  <h1>    (' + h1.length + '): ' + h1);
  console.log('  desc    (' + meta.length + '): ' + meta);
  console.log('  sufijo de marca anadido: ' + (t !== t.split('|')[0].trim() && t.includes('|') ? 'SI -> ' + t : 'no'));
  console.log('');
});
