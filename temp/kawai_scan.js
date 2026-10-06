const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const g = G.find(x => x.id === 'best-digital-pianos');
const sec = g.sections.find(s => (s.products || []).includes(568));
console.log('=== SEC EN ===');
console.log(sec.content);
console.log('\n=== SEC ES ===');
console.log(sec.content_es);
// all Kawai/KDP mentions
const hits = [];
const scan = (where, txt) => {
  if (!txt) return;
  const lines = String(txt).split(/<\/p>|\\n|\. /);
  lines.forEach(l => { if (/kawai|kdp120/i.test(l)) hits.push(where + ' :: ' + l.replace(/<[^>]+>/g, '').trim().slice(0, 160)); });
};
g.sections.forEach((s, i) => { scan('sec' + i + ' EN', s.content); scan('sec' + i + ' ES', s.content_es); });
scan('intro EN', g.intro); scan('intro ES', g.intro_es);
scan('conclusion EN', g.conclusion); scan('conclusion ES', g.conclusion_es);
scan('verdict EN', g.verdict); scan('verdict ES', g.verdict_es);
scan('desc EN', g.description); scan('desc ES', g.description_es);
const f = g.featuredSnippet;
Object.keys(f).forEach(k => scan('fsn.' + k, f[k]));
console.log('\n=== KAWAI HITS ===');
console.log(hits.length ? hits.join('\n') : 'none');
