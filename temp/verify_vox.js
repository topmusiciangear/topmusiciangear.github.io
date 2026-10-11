var fs = require('fs');
var s = fs.readFileSync('deals_es.html', 'utf8');
var i = s.indexOf('Vox AC30');
var seg = s.slice(i, i + 3000);
var m = seg.match(/anrdoezrs\.net\/click-101857888-10439229\?url=([^"']+)/);
console.log('Vox href -> ' + (m ? decodeURIComponent(m[1]) : 'NOT FOUND'));
