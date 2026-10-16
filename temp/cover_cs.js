const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/channel-strip-plugins.html', 'guides/channel-strip-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const m = h.match(/og:image" content="([^"]+)/);
  console.log(f + ': ' + (m ? m[1] : 'FALTA'));
});
