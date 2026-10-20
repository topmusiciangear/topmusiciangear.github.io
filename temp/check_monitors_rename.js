const fs = require('fs');
for (const f of ['guides/best-studio-monitors-under-150.html', 'guides/best-studio-monitors-under-150_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
  const can = (h.match(/rel="canonical" href="([^"]+)"/) || [])[1];
  console.log(f);
  console.log('  title:', t);
  console.log('  h1:', (h1 || '').replace(/<[^>]+>/g, '').trim());
  console.log('  canonical:', can);
  console.log('  Edifier:', (h.match(/Edifier/gi) || []).length, '| Alesis:', (h.match(/Alesis/g) || []).length, '| has 9.5:', h.includes('9.5'));
}
const files = fs.readdirSync('guides').filter(x => x.endsWith('.html') && !x.startsWith('best-home-studio-speakers'));
let hits = 0;
for (const f of files) {
  const h = fs.readFileSync('guides/' + f, 'utf8');
  if (h.includes('best-home-studio-speakers')) { hits++; console.log('OLD LINK IN', f); }
}
console.log('guides linking old url:', hits);
