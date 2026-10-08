const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/guitar-bass-amps.html', 'utf8');
['RB-210', 'Rumble 200', 'Spark LIVE'].forEach(n => {
  let i = -1, k = 0;
  while ((i = h.indexOf(n, i + 1)) >= 0 && k < 4) {
    console.log('## ' + n + ':', h.slice(Math.max(0, i - 140), i + 80).replace(/\n/g, ' '));
    k++;
  }
});
