const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/best-audio-repair-plugins.html', 'guides/best-audio-repair-plugins_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const m = h.match(/og:image" content="([^"]+)/);
  const ms = h.includes('art-PCM0018851-000');
  const price = h.match(/musicstore[^€]*€[\d.,]+/i);
  console.log(f + ': ' + (m ? m[1] : 'FALTA') + ' | MSlink:' + ms + ' | ' + (price ? price[0].slice(0, 60) : 'sin precio MS visible'));
});
