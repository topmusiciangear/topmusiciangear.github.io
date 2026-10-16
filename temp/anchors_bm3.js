const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-monitors');
const parts = [];
parts.push(['INTRO', s.intro_es]);
s.sections.forEach((x, i) => parts.push(['SEC' + i, x.content_es]));
parts.push(['CONC', s.conclusion_es]);
parts.forEach(([label, txt]) => {
  [...txt.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].forEach(m => {
    console.log(label + ' | ' + m[1] + '  =>  "' + m[2] + '"');
  });
});
