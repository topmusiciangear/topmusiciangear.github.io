const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/guitar-bass-amps.html', 'utf8');
['1,079', '1,199', '1,219'].forEach(n => {
  let i = -1, k = 0;
  while ((i = h.indexOf(n, i + 1)) >= 0 && k < 4) {
    console.log('## ' + n + ':', h.slice(Math.max(0, i - 130), i + 30).replace(/\n/g, ' '));
    k++;
  }
  if (k === 0) console.log('## ' + n + ': ABSENT');
});
