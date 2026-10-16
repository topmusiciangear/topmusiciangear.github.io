const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/vocal-plugins.html', 'guides/vocal-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const m = h.match(/og:image" content="([^"]+)/);
  console.log(f + ': ' + (m ? m[1] : 'FALTA'));
});
