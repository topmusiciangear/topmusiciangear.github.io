const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
// 1. drum-machine: ES fields back to Spanish
let dm = G.find(x => x.id === 'best-drum-machine');
['intro_es', 'description_es'].forEach(f => {
  if (typeof dm[f] === 'string') dm[f] = dm[f].split('beatmaking').join('creación de beats');
});
if (dm.featuredSnippet && typeof dm.featuredSnippet.text_es === 'string') {
  dm.featuredSnippet.text_es = dm.featuredSnippet.text_es.split('beatmaking').join('creación de beats');
}
// 2. wireless: EN fields back to English
let w = G.find(x => x.id === 'wireless-intercom-systems');
(w.sections || []).forEach(s => {
  if (typeof s.content === 'string') s.content = s.content.split('inalámbrico real').join('true-wireless');
});
['verdict', 'description'].forEach(f => {
  if (typeof w[f] === 'string') w[f] = w[f].split('inalámbrico real').join('true-wireless');
});
if (w.featuredSnippet) {
  Object.keys(w.featuredSnippet).forEach(k => {
    if (!/_es$/.test(k) && typeof w.featuredSnippet[k] === 'string') {
      w.featuredSnippet[k] = w.featuredSnippet[k].split('inalámbrico real').join('true-wireless');
    }
  });
}
(w.faq || []).forEach(f => {
  ['q', 'a'].forEach(k => { if (typeof f[k] === 'string') f[k] = f[k].split('inalámbrico real').join('true-wireless'); });
});
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
// verify
const s1 = JSON.stringify(dm);
const s2 = JSON.stringify(w);
console.log('drum ES beatmaking left:', (s1.match(/beatmaking/g) || []).length, '(EN ones expected ~4)');
console.log('wireless inalámbrico left:', (s2.match(/inalámbrico real/g) || []).length, '(ES ones expected)');
console.log('wireless true-wireless:', (s2.match(/true-wireless/g) || []).length);