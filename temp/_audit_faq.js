const g = require('../data/guides.json');
const b = g.find(x => x.id === 'blx288-vs-ewd');
console.log(JSON.stringify(b.verdictProsCons, null, 1).slice(0, 1200));
const stat = {};
let maxEn = 0, maxEs = 0, maxPlain = 0;
for (const x of g) {
  let e = 0, s = 0, p = 0;
  for (const k of Object.keys(x)) {
    const me = /^faq_q(\d+)_en$/.exec(k); if (me) e = Math.max(e, +me[1]);
    const ms = /^faq_q(\d+)_es$/.exec(k); if (ms) s = Math.max(s, +ms[1]);
    const mp = /^faq_q(\d+)$/.exec(k); if (mp) p = Math.max(p, +mp[1]);
  }
  maxEn = Math.max(maxEn, e); maxEs = Math.max(maxEs, s); maxPlain = Math.max(maxPlain, p);
  const sparse = s > 0 && e > 0 && s !== e;
  const missingEs = e > 0 && s === 0;
  if (sparse || missingEs) stat[x.id] = ['EN:' + e + ' ES:' + s, 'plain:' + p];
  else if (e === 0 && s === 0 && p === 0) stat[x.id] = ['NO-FAQ'];
}
console.log('maxEn', maxEn, 'maxEs', maxEs, 'maxPlain', maxPlain);
console.log('guides incongruentes:', Object.keys(stat).length);
console.log(Object.entries(stat).slice(0, 15).map(x => x[0] + ' => ' + x[1].join(' ')).join('\n'));