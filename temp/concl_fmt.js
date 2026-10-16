const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const GIFT_EN = '<span style="color:#f59e0b;font-size:13px">Selected Plugin Boutique purchases include a free gift — choose from a selection based on your spending level <a href="https://www.pluginboutique.com/articles/2073?a_aid=6a01e859cbe1a" target="_blank" rel="noopener noreferrer">Learn more</a></span>';
const GIFT_ES = '<span style="color:#f59e0b;font-size:13px">Ciertas compras en Plugin Boutique incluyen un regalo gratuito — elige entre una selección según cuánto gastes <a href="https://www.pluginboutique.com/articles/2073?a_aid=6a01e859cbe1a" target="_blank" rel="noopener noreferrer">Más información</a></span>';
function convert(html, gift, label) {
  const links = [...html.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)]
    .filter(m => !m[1].includes('articles/2073'));
  html = html.replace(/<div class="guide-related-links">[\s\S]*?<\/div><\/div>/g, '');
  html = html.replace(/<div class="guide-related-links">[\s\S]*?<\/div>/g, '');
  html = html.split(GIFT_EN).join('').split(GIFT_ES).join('');
  html = html.replace(/\s+/g, ' ').trim();
  const btns = links.map(m => '<a href="' + m[1] + '" class="guide-link-btn">' + m[2] + '</a>').join(' ');
  return html + ' <p>' + label + btns + '</p>\n\n' + gift;
}
['best-audio-repair-plugins', 'best-guitar-plugins', 'best-midi-theory-plugins',
 'best-piano-keyboard-vsts', 'best-synth-vsts', 'ozone-vs-fabfilter',
 'vocalign-vs-revoice-pro'].forEach(id => {
  const g = guides.find(x => x.id === id);
  const nEn = (g.conclusion.match(/guide-related-link"/g) || []).length;
  const nEs = (g.conclusion_es.match(/guide-related-link"/g) || []).length;
  g.conclusion = convert(g.conclusion, GIFT_EN, '');
  g.conclusion_es = convert(g.conclusion_es, GIFT_ES, 'También te interesa: ');
  console.log(id + ': links EN=' + nEn + ' ES=' + nEs);
});
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('conversiones OK');
