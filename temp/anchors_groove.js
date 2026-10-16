const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const t = JSON.stringify(g);
[...new Set(t.match(/<a href="\/guides\/compact-rhythm-devices(_es)?\.html"[^>]*>([\s\S]*?)<\/a>/g) || [])].forEach(m => {
  const a = m.match(/>([\s\S]*?)<\/a>/)[1].replace(/<[^>]+>/g, '').trim();
  console.log('anchor: "' + a + '"');
});
