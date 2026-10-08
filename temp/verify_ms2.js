const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-live-subwoofers.html', 'utf8');
['PAH0023624', 'PAH0022714'].forEach(n => {
  const i = h.indexOf(n);
  console.log(n, i >= 0 ? 'PRESENT: ' + h.slice(Math.max(0, i - 160), i + 60).replace(/\n/g, ' ') : 'ABSENT');
});
