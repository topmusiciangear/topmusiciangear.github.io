const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
console.log('anchors INTRO+SEC5:');
[...s.intro.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => console.log('  INTRO ' + m[1] + ' => "' + m[2] + '"'));
s.sections.forEach((x, i) => {
  [...x.content.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
    const id = m[1].replace('/guides/', '').replace('.html', '');
    const dest = g.find(y => y.id === id);
    if (!dest || dest.title !== m[2]) console.log('  SEC' + i + ' ' + m[1] + ' => "' + m[2] + '" TITULO: "' + (dest ? dest.title : 'NO EXISTE') + '"');
  });
});
console.log('(solo se muestran los que no coinciden)');
