const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
['1031:', '1032:', '1030:'].forEach(k => {
  const i = bg.indexOf(k);
  console.log('--- ' + k + (i < 0 ? ' NO' : ' ' + JSON.stringify(bg.slice(i, i + 200))));
});
