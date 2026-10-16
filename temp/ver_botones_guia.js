const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/starter-studio_es.html', 'utf8');
const re = /<a href="(\/guides\/[^"]+)" class="guide-link-btn">([^<]+)<\/a>/g;
const b = [...d.matchAll(re)];
console.log('botones de guia en ES: ' + b.length);
b.forEach(m => console.log('  ' + m[1] + '  ::  ' + m[2].slice(0, 55)));
