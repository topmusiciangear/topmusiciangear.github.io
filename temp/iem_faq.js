const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
for (const gid of ['best-wireless-iems', 'best-in-ear-monitors']) {
  const g = G.find(x => x.id === gid);
  if (!g) { console.log(gid, 'NOT FOUND'); continue; }
  console.log('######## ' + gid);
  const f = g.featuredSnippet || {};
  const keys = Object.keys(f).filter(k => /^faq_/.test(k)).sort();
  console.log('FAQ keys:', keys.length);
  keys.forEach(k => console.log(' ' + k + ': ' + String(f[k]).slice(0, 220)));
  console.log('CONCLUSION EN:', (g.conclusion || '').slice(0, 900));
  console.log('CONCLUSION ES:', (g.conclusion_es || '').slice(0, 900));
}
