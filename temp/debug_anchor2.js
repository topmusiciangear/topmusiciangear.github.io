const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')));
[...new Set([...t.matchAll(/<a href=\\"\/guides\/compact-rhythm-devices(_es)?\.html\\"[^>]*>([\s\S]*?)<\/a>/g)].map(m => m[2].replace(/<[^>]+>/g, '').trim()))].forEach(a => console.log('anchor: "' + a + '"'));
