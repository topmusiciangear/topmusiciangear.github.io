const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-mic-for-guitar-amps');
console.log('CONC anchors:');
[...s.conclusion_es.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => console.log('  ' + m[1] + '  =>  "' + m[2] + '"'));
console.log('sm57-vs-md421 title_es: ' + g.find(y => y.id === 'sm57-vs-md421').title_es);
