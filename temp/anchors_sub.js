const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-live-subwoofers'));
console.log('anchors conclusion:');
[...t.matchAll(/<a[^>]*href=\\"([^\\]+)\\"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
  console.log('  ' + m[1] + '  texto: "' + m[2] + '"');
});
