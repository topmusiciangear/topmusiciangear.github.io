const G = require('../data/guides.json');
const P = require('../data/products.json');
const g = (id) => G.find(x => x.id === id);
const J = (v) => JSON.stringify(v);
// KH80 + 8010 full paragraphs with placeholders
['best-monitors-for-small-rooms'].forEach(id => {
  const gg = g(id);
  gg.sections.forEach((s, i) => {
    if (/each|most expensive/i.test(s.content || '')) {
      console.log('### ' + id + ' sec' + i + ' EN: ' + (s.content || '').replace(/\s+/g, ' '));
      console.log('### ' + id + ' sec' + i + ' ES: ' + (s.content_es || '').replace(/\s+/g, ' '));
    }
  });
});
// ES mates
console.log('### sm57-vs-sm58 sec3 ES: ' + g('sm57-vs-sm58').sections[3].content_es.replace(/\s+/g, ' '));
console.log('### budget-monitors conclusion: ' + g('budget-monitors').conclusion.replace(/\s+/g, ' '));
console.log('### budget-monitors conclusion_es: ' + g('budget-monitors').conclusion_es.replace(/\s+/g, ' '));
// KH750 price
const kh = P.find(p => /KH 750/i.test(p.title));
console.log('KH750:', kh ? kh.id + ' ' + kh.title + ' $' + kh.price : 'MISSING');
// Apollo product title
P.filter(p => /Apolloциями|Apollo/i.test(p.title) && /x16/i.test(p.title)).forEach(p => console.log('apollo:', p.id, JSON.stringify(p.title)));
// MX5 / Flex Prime
P.filter(p => /Flex Prime|^.*MX5/i.test(p.title)).forEach(p => console.log('mx:', p.id, JSON.stringify(p.title), p.price));
const me = g('me90-vs-mx5');
console.log('me90 secs:', me.sections.map(s => (s.heading || '').slice(0, 50) + ' prods=' + JSON.stringify(s.products)));
console.log('me90 intro_es:', J(me.intro_es));
const v = me.verdictProsCons || [];
v.forEach(x => console.log('me90V', J(x.name), '| pros_es:', J(x.pros_es), '| cons_es:', J(x.cons_es)));
// ts9 fragment + looper intro + jbl exact + best-interface table labels
console.log('ts9 intro_es:', J(g('ts9-vs-bd2').intro_es));
console.log('looper intro_es:', J(g('best-looper-pedals').intro_es));
console.log('jbl verdict_es:', J(g('jbl-vs-kali').verdict_es));
console.log('best-interface intro_es head:', J((g('best-interface').intro_es || '').slice(0, 600)));
// scarlett-vs-ssl sec2 ES full + budget-headphones strings
console.log('ssl sec2 ES:', g('scarlett-vs-ssl').sections[2].content_es.replace(/\s+/g, ' '));
const bh = g('budget-headphones');
console.log('bh intro_es:', J(bh.intro_es));
console.log('bh verdict_es:', J(bh.verdict_es));
// hd490 con
const hd = g('hd490-pro-vs-dt990');
(hd.verdictProsCons || []).forEach(x => console.log('hd', J(x.name), J(x.cons_es)));
// wireless intercom title/verdict
const wi = g('wireless-intercom-systems');
console.log('wi title_es:', J(wi.title_es), '| verdict_es:', J(wi.verdict_es));
// fender-bass sec1 es snippet
console.log('fenderbass s1:', g('fender-bass-guide').sections[1].content_es.replace(/\s+/g, ' ').slice(0, 500));
// sm7b strings
const nt = g('sm7b-vs-nt1');
console.log('nt intro_es:', J(nt.intro_es), '| verdict_es:', J(nt.verdict_es));
// stream-controllers EN + sec2 es
const sc = g('stream-controllers');
console.log('sc intro:', J(sc.intro));
console.log('sc s2 es:', J(sc.sections[2].content_es));
// beginner-guitar action strings
const bg = g('beginner-guitar');
console.log('bg s0:', J((bg.sections[0].content_es || '').slice(0, 300)));
console.log('bg s1:', J((bg.sections[1].content_es || '').slice(0, 300)));