const fs = require('fs');
const files = ['temp/part1.json','temp/part2.json','temp/part3.json','temp/part4.json','temp/part5.json','temp/part6.json'];
let all = [];
for (const f of files) { all = all.concat(JSON.parse(fs.readFileSync(f, 'utf8'))); }
// coverage check
const cov = JSON.parse(fs.readFileSync('temp/coverage.json', 'utf8'));
const wanted = ['best-plugins','usb-mics','portable-interfaces','budget-monitors','studio-subwoofers','fender-guide','guitar-pedals','live-sound-pa'];
const miss = {};
for (const c of cov) { if (wanted.includes(c.guide)) miss[c.guide] = c.missing; }
const got = {};
for (const e of all) { got[e.g] = got[e.g] || []; got[e.g].push(e.sec.products[0]); }
for (const g of wanted) {
  const needIds = miss[g].map(s => parseInt(s.split(':')[0], 10)).filter(n => !isNaN(n));
  const haveIds = (got[g] || []).slice().sort((a,b)=>a-b);
  const needSorted = needIds.slice().sort((a,b)=>a-b);
  console.log(g + ' need=[' + needSorted.join(',') + '] have=[' + haveIds.join(',') + ']');
}
// extra pronoun/superlative scan
let hits = [];
for (const e of all) {
  const en = e.sec.content, es = e.sec.content_es;
  const check = (txt, rx, label) => { if (rx.test(txt)) hits.push(e.g + ':' + e.sec.products[0] + ' ' + label); };
  check(es, /\bmejor\b/i, 'mejor-ES');
  check(es, /\bperfect[oa]s?\b/i, 'perfecto-ES');
  check(es, /\bdefinitiv[oa]s?\b/i, 'definitivo-ES');
  check(es, /\bimbatible/i, 'imbatible-ES');
  check(es, /\bnuestr[oa]s?\b/i, 'nuestro-ES');
  check(en, /\bhe\b/i, 'he-EN');
  check(en, /\bhim\b|\bhis\b/i, 'him/his-EN');
  check(en, /\bmy\b/i, 'my-EN');
  // heading format
  if (!/: A Closer Look$/.test(e.sec.heading)) hits.push(e.g + ':' + e.sec.products[0] + ' BAD-HEADING-EN');
  if (!/: an\u00e1lisis detallado$/.test(e.sec.heading_es)) hits.push(e.g + ':' + e.sec.products[0] + ' BAD-HEADING-ES');
}
console.log(hits.length ? hits.join('\n') : 'EXTRA SCAN CLEAN');
