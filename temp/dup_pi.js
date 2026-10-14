const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'premium-interfaces');
const norm = t => String(t || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().replace(/[“”"']/g, '');
const sents = t => norm(t).split(/(?<=[.!?])\s+/).filter(s => s.split(' ').length >= 6);
const texts = {};
(g.sections || []).forEach((s, i) => {
  if (!s) return;
  const tag = (s.h || s.heading || 'sec' + i).slice(0, 45);
  ['a', 'content'].forEach(k => { if (s[k]) texts['SEC' + i + '.' + k + '|' + tag] = s[k]; });
});
texts['INTRO'] = g.intro; texts['VERDICT'] = g.verdict; texts['CONCLUSION'] = g.conclusion;
const keys = Object.keys(texts);
for (let i = 0; i < keys.length; i++) {
  for (let j = i + 1; j < keys.length; j++) {
    const A = sents(texts[keys[i]]), B = new Set(sents(texts[keys[j]]));
    const shared = A.filter(s => B.has(s));
    if (shared.length) {
      console.log('=== DUPLICADO: ' + keys[i] + '  <=>  ' + keys[j] + ' (' + shared.length + ' frases) ===');
      shared.slice(0, 3).forEach(s => console.log('  "' + s.slice(0, 140) + '"'));
    }
  }
}
console.log('fin auditoria EN');
// ES
const textsEs = {};
(g.sections || []).forEach((s, i) => {
  if (!s) return;
  const tag = (s.h_es || s.heading_es || 'sec' + i).slice(0, 45);
  ['a_es', 'content_es'].forEach(k => { if (s[k]) textsEs['SEC' + i + '.' + k + '|' + tag] = s[k]; });
});
const k2 = Object.keys(textsEs);
for (let i = 0; i < k2.length; i++) {
  for (let j = i + 1; j < k2.length; j++) {
    const A = sents(textsEs[k2[i]]), B = new Set(sents(textsEs[k2[j]]));
    const shared = A.filter(s => B.has(s));
    if (shared.length) {
      console.log('=== DUPLICADO ES: ' + k2[i] + '  <=>  ' + k2[j] + ' (' + shared.length + ') ===');
      shared.slice(0, 3).forEach(s => console.log('  "' + s.slice(0, 140) + '"'));
    }
  }
}
console.log('fin auditoria ES');
