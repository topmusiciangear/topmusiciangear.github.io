const fs = require('fs');
const p = 'index.html';
const h = fs.readFileSync(p, 'utf8');
console.log('has CRLF:', h.indexOf('\r\n') !== -1);
const lines = h.split('\n');
const re = /^(\s*)<a class="nav-dd-link" href="https:\/\/www\.amazon\.com\/gp\/new-releases\/musical-instruments\?tag=topmusicg-20".*?Amazon<\/a>$/;
let n = 0;
lines.forEach((l, i) => {
  if (l.indexOf('amazon.com/gp/new-releases') !== -1) {
    n++;
    console.log((i + 1) + ' match=' + re.test(l) + ' len=' + l.length + ' tail=' + JSON.stringify(l.slice(-30)));
  }
});
console.log('total amazon nav lines:', n);