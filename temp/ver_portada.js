const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/best-home-studio-speakers.html', 'guides/best-home-studio-speakers_es.html'].forEach(f => {
  const s = fs.readFileSync(B + f, 'utf8');
  const og = (s.match(/og:image[^>]*content="([^"]*)"/) || [])[1];
  const tw = (s.match(/twitter:image[^>]*content="([^"]*)"/) || [])[1];
  const imgs = [...new Set(s.match(/r2\.gear4music\.com\/media\/[^"?]*\.jpg/g) || [])];
  console.log('--- ' + f);
  console.log('  og:image      : ' + (og || 'NO'));
  console.log('  twitter:image : ' + (tw || 'NO'));
  console.log('  fotos de producto en la pagina: ' + imgs.length);
  imgs.forEach(i => console.log('    ' + i));
});
