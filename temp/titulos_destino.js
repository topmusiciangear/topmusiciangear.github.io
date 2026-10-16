const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['best-electric-guitars-2026', 'compact-rhythm-devices', 'budget-usb-mics'].forEach(id => {
  const x = g.find(y => y.id === id);
  console.log(id + '\n  EN: ' + x.title + '\n  ES: ' + x.title_es);
});
// anchors actuales de best-grooveboxes
const t = JSON.stringify(g);
[...new Set(t.match(/<a href="\/guides\/best-grooveboxes(_es)?\.html"[^>]*>([\s\S]*?)<\/a>/g) || [])].forEach(m => {
  const a = m.match(/>([\s\S]*?)<\/a>/)[1].replace(/<[^>]+>/g, '').trim();
  console.log('anchor grooveboxes: "' + a + '"');
});
