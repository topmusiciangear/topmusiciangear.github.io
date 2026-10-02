const fs = require('fs');
const h = fs.readFileSync('temp/ehb.html', 'utf8');
const m = h.match(/og:image[^>]*content=(["'])(.*?)\1/);
console.log('G4M IMG: ' + (m ? m[2] : 'SIN (' + h.length + 'b)'));
const p = h.match(/"price":"([0-9.]+)"/);
console.log('price hint: ' + (p ? p[1] : '?'));
console.log('title: ' + (h.match(/<title>([^<]{0,120})/) || ['', '?'])[1]);
