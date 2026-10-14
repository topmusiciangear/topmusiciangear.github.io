const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

console.log('=== LA GUIA EN CUESTION ===');
d.filter(x => /remote-work|remote work|silent.*compact/i.test(x.id + ' ' + x.title)).forEach(function (g) {
  console.log('  id       : ' + g.id);
  console.log('  title    : ' + JSON.stringify(g.title) + '   [' + g.title.length + ' chars]');
  console.log('  title_es : ' + JSON.stringify(g.title_es) + '   [' + g.title_es.length + ' chars]');
  console.log('  titleTag : ' + JSON.stringify(g.titleTag) + '   [' + (g.titleTag || '').length + ' chars]');
  console.log('  titleTag_es: ' + JSON.stringify(g.titleTag_es) + '   [' + (g.titleTag_es || '').length + ' chars]');
  console.log('  description   [' + (g.description || '').length + ']: ' + JSON.stringify(g.description));
  console.log('  description_es[' + (g.description_es || '').length + ']: ' + JSON.stringify(g.description_es));
  console.log('  featuredSnippet.title_en: ' + JSON.stringify((g.featuredSnippet || {}).title_en || ''));
});

console.log('\n=== lo que se renderiza en el HTML ===');
['guides/remote-work-guitars.html', 'guides/remote-work-guitars_es.html'].forEach(function (f) {
  const p = BASE + f;
  if (!fs.existsSync(p)) { console.log('  ' + f + ': no existe'); return; }
  const h = fs.readFileSync(p, 'utf8');
  const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const og = (h.match(/property="og:title" content="([^"]*)"/) || [])[1] || '';
  const de = (h.match(/name="description" content="([^"]*)"/) || [])[1] || '';
  console.log('  ' + f);
  console.log('      <title>      [' + t.length + ']: ' + JSON.stringify(t));
  console.log('      og:title     [' + og.length + ']: ' + JSON.stringify(og));
  console.log('      description  [' + de.length + ']: ' + JSON.stringify(de));
});