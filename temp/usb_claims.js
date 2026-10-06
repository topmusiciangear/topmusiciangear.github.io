const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const g = G.find(x => x.id === 'best-digital-pianos');
const hits = [];
const push = (where, txt) => {
  if (!txt) return;
  const re = /usb[^.]{0,120}/gi;
  let m;
  while ((m = re.exec(txt))) hits.push(where + ' :: ' + m[0].replace(/\s+/g, ' ').slice(0, 130));
};
g.sections.forEach((s, i) => { push('sec' + i + ' EN', s.content); push('sec' + i + ' ES', s.content_es); });
push('conclusion EN', g.conclusion); push('conclusion ES', g.conclusion_es);
(g.verdictProsCons || []).forEach(v => { ['pros', 'cons', 'pros_es', 'cons_es'].forEach(k => (v[k] || []).forEach((t, j) => push('verdict:' + v.name + '.' + k + j, t))); });
const f = g.featuredSnippet;
for (let i = 1; i <= 6; i++) { push('A' + i + ' EN', f['faq_a' + i + '_en']); push('A' + i + ' ES', f['faq_a' + i + '_es']); }
console.log(hits.length ? hits.join('\n') : 'no USB mentions');
