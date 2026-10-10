const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-monitors-for-small-rooms');
const R = (s, a, b) => {
  if (!s.includes(a)) console.log('MISS: ' + a.slice(0, 70));
  return s.split(a).join(b);
};
guide.conclusion = R(guide.conclusion, '<p><a href="/guides/hs8-vs-rokit-7.html" class="guide-link-btn">HS8 vs Rokit 7 G5</a>', '');
const sn = guide.featuredSnippet;
sn.text_en = R(sn.text_en, 'the Kali LP-6 V2 for 6.5-inch low end, the KRK Rokit 7 G5, and compact desktop systems', 'the Kali LP-6 V2 for 6.5-inch low end, the Yamaha HS5 as the honest reference, and compact desktop systems');
sn.text_es = R(sn.text_es, 'el Kali LP-6 V2 para graves de 6.5 pulgadas, los KRK Rokit 7 G5 y sistemas compactos de escritorio', 'el Kali LP-6 V2 para graves de 6.5 pulgadas, el Yamaha HS5 como referencia honesta y sistemas compactos de escritorio');
const jbl = guide.verdictProsCons.find(v => v.name.includes('JBL'));
jbl.cons = jbl.cons.map(t => R(t, 'Less bass and headroom than the KRK Rokit 7 G5 for loud hip-hop or rock sessions', 'Less bass and headroom than bigger 6.5-inch monitors for loud hip-hop or rock sessions'));
jbl.cons_es = jbl.cons_es.map(t => R(t, 'Menos graves y headroom que el KRK Rokit 7 G5 para sesiones fuertes de hip-hop o rock', 'Menos graves y headroom que monitores más grandes de 6.5 pulgadas para sesiones fuertes de hip-hop o rock'));
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
const left = JSON.stringify(guide).split('Rokit').length - 1;
console.log('Remaining Rokit mentions: ' + left);
if (left > 0) throw new Error('still remain');
console.log('Done.');
