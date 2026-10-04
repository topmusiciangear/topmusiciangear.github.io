const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/beat-making.html', 'utf8');
const re = /id="sec-(\d+)"[^>]*>([^<]*)|guide-section-imgs"><img src="([^"]+)" alt="([^"]+)"/g;
let m;
while ((m = re.exec(h))) {
  if (m[1]) console.log('SEC' + m[1] + ': ' + m[2]);
  else console.log('   FOTO: ' + m[4] + ' | ' + m[3].slice(-38));
}