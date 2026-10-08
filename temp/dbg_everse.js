const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/live-sound-pa.html', 'utf8');
['ELEEVERSE12US', 'everse-12-potable-speaker', 'PAH0023691', '866', '1,069'].forEach(n => {
  const i = h.indexOf(n);
  console.log(n, i >= 0 ? 'PRESENT @' + i + ': ' + h.slice(Math.max(0, i - 100), i + 60).replace(/\n/g, ' ') : 'ABSENT');
});
