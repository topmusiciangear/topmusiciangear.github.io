const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
const s = JSON.stringify(g);
let i = -1;
while ((i = s.indexOf('DL32S', i + 1)) > -1) console.log('...' + s.slice(Math.max(0, i - 70), i + 50).replace(/\s+/g, ' '));
console.log('===== Ui24R section/verdict/faq =====');
g.sections.forEach((sn, n) => {
  const t = JSON.stringify(sn);
  if (/Ui24R/.test((sn.heading || ''))) {
    console.log('SEC' + n + ' EN: ' + (sn.content || '').replace(/\s+/g, ' '));
    console.log('SEC' + n + ' ES: ' + (sn.content_es || '').replace(/\s+/g, ' '));
  }
});
(g.verdictProsCons || []).forEach(v => {
  if (/Ui24R/.test(v.name)) console.log('VERDICT Ui24R: ' + JSON.stringify(v));
});
Object.keys(g.featuredSnippet || {}).filter(k => /^faq_/.test(k)).forEach(k => {
  if (/DL32S|Ui24R|32 buses|3U|Dante/.test(g.featuredSnippet[k])) console.log(k + ': ' + JSON.stringify(g.featuredSnippet[k]).slice(0, 400));
});