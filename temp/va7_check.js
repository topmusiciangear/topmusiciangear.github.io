const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/vocalign-vs-revoice-pro.html', 'guides/vocalign-vs-revoice-pro_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const m = h.match(/og:image" content="([^"]+)/);
  const ok = ['108/1089402', '6H7Q', '216', '155'].map(k => k + ':' + (h.includes(k) ? 'OK' : 'FALTA'));
  console.log(f + ' cover=' + (m ? m[1].slice(0, 60) : 'FALTA') + ' | ' + ok.join(' '));
});
