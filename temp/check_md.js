const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'martin-d28-vs-taylor-314');
console.log('SEC3 actual:');
[...s.sections[3].content_es.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => console.log('  ' + m[1] + ' => "' + m[2] + '"'));
