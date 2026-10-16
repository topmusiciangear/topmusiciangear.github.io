const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/repitch-vs-melodyne.html', 'guides/repitch-vs-melodyne_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const m = h.match(/<meta property="og:image" content="([^"]+)"/);
  console.log(f + ' og:image = ' + (m ? m[1] : 'FALTA'));
});
