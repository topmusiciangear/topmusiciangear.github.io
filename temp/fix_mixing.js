const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = G.find(x => x.id === 'mixing-plugins');
const rep1 = (txt, from, to) => {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 70));
  return txt.split(from).join(to);
};
// ---------- TABLE ----------
const t = g.productTable;
if (t.columns[3].title !== 'Native Instruments Kontakt 8') throw new Error('col3 changed');
t.columns.splice(3, 1);
t.rows.forEach(r => r.values.splice(3, 1));
console.log('Kontakt column removed, cols now:', t.columns.length);
const trow = l => t.rows.find(rr => rr.label === l);
let r = trow('Type');
const ffi = t.columns.findIndex(c => c.title === 'FabFilter Total Bundle');
if (r.values[ffi].value !== '30+ plug-ins (EQ, comp, reverb, sat, limiter)') throw new Error('FF type changed');
r.values[ffi].value = '14 plug-ins (EQ, comp, reverb, sat, limiter)';
r.values[ffi].value_es = '14 plugins (EQ, comp, reverb, sat, limitador)';
r = trow('Copy Protection');
if (r.values[ffi].value !== 'License file') throw new Error('FF license changed');
r.values[ffi].value = 'License key';
r.values[ffi].value_es = 'Clave de licencia';
r = trow('Latency');
const oi = t.columns.findIndex(c => c.title === 'iZotope Ozone 12 Advanced');
if (r.values[oi].value !== 'Low') throw new Error('Ozone latency changed');
r.values[oi].value = 'High';
r.values[oi].value_es = 'Alta';
console.log('table cells fixed');
// ---------- SECTIONS: remove Kontakt sec ----------
const si = g.sections.findIndex(s => (s.products || []).includes(28));
if (si < 0) throw new Error('Kontakt section not found');
if (!g.sections[si].content.includes('Kontakt 8 is the sampler platform')) throw new Error('wrong section');
g.sections.splice(si, 1);
console.log('Kontakt section removed');
// ---------- VERDICT entry ----------
const vi = g.verdictProsCons.findIndex(v => v.name === 'Native Instruments Kontakt 8');
if (vi < 0) throw new Error('Kontakt verdict missing');
g.verdictProsCons.splice(vi, 1);
console.log('Kontakt verdict removed');
// ---------- FAQ: delete Q3, renumber ----------
const f = g.featuredSnippet;
['q', 'a'].forEach(p => ['_en', '_es'].forEach(sfx => {
  if (!f['faq_' + p + '3' + sfx].includes('Kontakt')) throw new Error('Q3 not Kontakt: ' + p + sfx);
  delete f['faq_' + p + '3' + sfx];
}));
for (let i = 4; i <= 5; i++) {
  ['q', 'a'].forEach(p => ['_en', '_es'].forEach(sfx => {
    f['faq_' + p + (i - 1) + sfx] = f['faq_' + p + i + sfx];
    delete f['faq_' + p + i + sfx];
  }));
}
if (!f.faq_q3_en.includes('Smooth Operator')) throw new Error('renumber failed');
console.log('FAQ renumbered, now:', Object.keys(f).filter(k => /^faq_q\d+_en$/.test(k)).length, 'Q');
// ---------- CONCLUSION + featured ----------
g.conclusion = rep1(g.conclusion, ' Include Kontakt 8 when you need a universe of sounds.', '');
g.conclusion_es = rep1(g.conclusion_es, ' Incluye Kontakt 8 cuando necesites un universo de sonidos.', '');
g.featuredProducts = g.featuredProducts.filter(id => id !== 28);
if (g.featuredProducts.includes(28)) throw new Error('28 still featured');
console.log('conclusion + featured fixed');
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
