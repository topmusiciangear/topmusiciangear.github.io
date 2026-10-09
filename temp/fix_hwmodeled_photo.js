const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-plugins');
const s = guide.sections.find(x => (x.heading || '') === 'Hardware-Modeled Plugins');
if (!s) { console.log('section not found'); process.exit(1); }
['content', 'content_es'].forEach(k => {
  if (s[k]) s[k] = s[k].replace(/^<div class="guide-section-imgs">[\s\S]*?<\/div><\/div>/, '');
});
// Clean duplicated phrases in EN
if (s.content) {
  s.content = s.content.replace('check attack needs before buying the fast attack and coloration of the original FET compressor', 'check attack needs before buying');
  s.content = s.content.replace('models simultaneous boost and attenuation for Pultec-style tone shaping the Pultec equalizer\'s ability to boost and attenuate the same frequency simultaneously', 'models simultaneous boost and attenuation for Pultec-style tone shaping');
}
console.log('content starts:', s.content.slice(0, 120));
console.log('content_es starts:', s.content_es.slice(0, 120));
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
