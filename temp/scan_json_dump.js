const G = require('../data/guides.json');
const bad = [];
G.forEach(g => {
  ['intro', 'intro_es', 'conclusion', 'conclusion_es', 'verdict', 'verdict_es', 'description', 'description_es'].forEach(f => {
    const v = g[f];
    if (typeof v === 'string' && v.indexOf('{"id":') > -1) bad.push(g.id + '.' + f + ' len=' + v.length);
  });
  (g.sections || []).forEach((s, i) => {
    ['content', 'content_es', 'heading', 'heading_es'].forEach(f => {
      const v = s[f];
      if (typeof v === 'string' && v.indexOf('{"id":') > -1) bad.push(g.id + '.sections[' + i + '].' + f);
    });
  });
  (g.faq || []).forEach((fq, i) => {
    ['q', 'a', 'q_es', 'a_es'].forEach(f => {
      const v = fq[f];
      if (typeof v === 'string' && v.indexOf('{"id":') > -1) bad.push(g.id + '.faq[' + i + '].' + f);
    });
  });
});
console.log(bad.length ? bad.join('\n') : 'clean');