const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/starter-studio_es.html', 'utf8');
const m = d.indexOf('openReviewModal(684)');
const seg = d.slice(m, m + 25000);
[...seg.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>/g)].slice(0, 8).forEach(r => {
  console.log('[' + r[1] + '] ' + r[0].slice(0, 220));
});
