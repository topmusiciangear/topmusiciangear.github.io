const fs = require('fs');
['guides/precision-vs-jazz.html', 'guides/precision-vs-jazz_es.html'].forEach(f => {
  const b = fs.readFileSync(f, 'utf8');
  const m = b.match(/og:image[^>]*content="([^"]+)"/);
  console.log(f + ': ' + (m ? m[1].slice(0, 75) : 'SIN OG'));
});
