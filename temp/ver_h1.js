const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const limpio = s => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

['guides/best-home-studio-speakers.html', 'guides/best-home-studio-speakers_es.html'].forEach(f => {
  const s = fs.readFileSync(B + f, 'utf8');
  const h1 = (s.match(/<h1[^>]*>([\s\S]{0,400}?)<\/h1>/) || [])[1] || '';
  const meta = (s.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '?';
  const og = (s.match(/<meta property="og:description" content="([^"]*)"/) || [])[1] || '?';
  console.log('=== ' + f);
  console.log('  H1   : ' + limpio(h1).slice(0, 130));
  console.log('  META : (' + meta.length + ') ' + meta.slice(0, 170));
  console.log('  OG   : (' + og.length + ') ' + og.slice(0, 170));
});
