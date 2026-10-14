const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
[['best-microphone.html', 'SM58'], ['best-microphone_es.html', 'SM58']].forEach(([f, w]) => {
  const h = fs.readFileSync(B + f, 'utf8');
  let i = h.indexOf(w);
  while (i > -1) {
    console.log(f + ': ...' + h.slice(Math.max(0, i - 90), i + 40).replace(/\n/g, ' ') + '...');
    i = h.indexOf(w, i + 1);
  }
});