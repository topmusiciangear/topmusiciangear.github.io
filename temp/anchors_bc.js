const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'bridge-cast-x-vs-rodecaster-pro2');
console.log('anchors CONCLUSION:');
[...s.conclusion_es.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => console.log('  ' + m[1] + ' => "' + m[2] + '"'));
console.log('(fin)');
