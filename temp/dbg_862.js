const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/live-sound-pa.html', 'utf8');
['862', '322'].forEach(n => {
  let i = -1, k = 0;
  while ((i = h.indexOf(n, i + 1)) >= 0 && k < 6) {
    console.log('## ' + n + ':', h.slice(Math.max(0, i - 120), i + 40).replace(/\n/g, ' '));
    k++;
  }
});
