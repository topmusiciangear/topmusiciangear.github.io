const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'best-home-studio-speakers');
function tableOf(lang) {
  const intro = lang === 'es' ? (g.intro_es || g.intro) : g.intro;
  const m = intro.match(/<table[\s\S]*?<\/table>/);
  return m ? m[0] : 'NO TABLE IN INTRO';
}
for (const lang of ['en', 'es']) {
  const t = tableOf(lang);
  console.log('=== ' + lang + ' table len ' + t.length + ' ===');
  const ths = (t.match(/<th[^>]*>[\s\S]*?<\/th>/g) || []).map(x => x.replace(/<[^>]+>/g, '').trim());
  console.log('HEADERS:', JSON.stringify(ths));
  const rows = (t.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || []);
  rows.forEach((r, i) => {
    const cells = (r.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/g) || []).map(x => x.replace(/<[^>]+>/g, '').trim());
    console.log(i + ': ' + JSON.stringify(cells));
  });
  console.log('');
}
console.log('productTable rendered anywhere?', /productTable/.test(fs.readFileSync('build-guides.js', 'utf8')) ? 'referenced in build' : 'not referenced');
