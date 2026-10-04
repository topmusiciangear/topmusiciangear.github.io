const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const G = JSON.parse(raw);
G.filter(g => g.aboutName === 'Top Gear' && g.id !== 'beat-making' && g.id !== 'pro-headphones').forEach(g => {
  const val = g.featuredSnippet.faq_a1_es;
  const key = '"faq_a1_es": "' + val.slice(0, 30);
  const i = raw.indexOf(key);
  if (i < 0) { console.log(g.id, 'ANCHOR MISSING'); return; }
  const endPos = i + key.length + (val.length - 30);
  console.log(g.id, '=> after value:', JSON.stringify(raw.slice(endPos, endPos + 12)));
});