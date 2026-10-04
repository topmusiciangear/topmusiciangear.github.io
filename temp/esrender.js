const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/portable-interfaces_es.html', 'utf8');
const labels = [...h.matchAll(/<td class="label">([^<]+)<\/td>/g)].map(m => m[1]);
console.log('row labels ES page:', labels.join(' | '));