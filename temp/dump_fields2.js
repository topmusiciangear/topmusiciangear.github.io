// dump_fields2.js — celdas/campos exactos que faltan para el fixer
const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const prods = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const byId = {}; g.forEach(x => { byId[x.id] = x; });
const P = []; const out = t => P.push(t);
const sect = (id, i) => (byId[id] && byId[id].sections[i]) || {};

out('=== best-electric-guitars-2026 s2 content EN ===\n' + sect('best-electric-guitars-2026', 2).content);
out('=== best-electric-guitars-2026 s8 content EN ===\n' + sect('best-electric-guitars-2026', 8).content);
const cell = (id, r, i, k) => (((byId[id].productTable || {}).rows || [])[r] || {}).values?.[i]?.[k];
out('=== cells ===');
out('beginner-bass-guitars rows[0].values[8] EN: ' + JSON.stringify(cell('beginner-bass-guitars', 0, 8, 'value')));
out('beginner-bass-guitars rows[0].values[8] ES: ' + JSON.stringify(cell('beginner-bass-guitars', 0, 8, 'value_es')));
out('best-5-string-basses rows[0].values[5] EN: ' + JSON.stringify(cell('best-5-string-basses', 0, 5, 'value')));
out('best-5-string-basses rows[0].values[5] ES: ' + JSON.stringify(cell('best-5-string-basses', 0, 5, 'value_es')));
out('best-electric-guitars-2026 rows[0].values[2] EN: ' + JSON.stringify(cell('best-electric-guitars-2026', 0, 2, 'value')));
out('best-electric-guitars-2026 rows[0].values[2] ES: ' + JSON.stringify(cell('best-electric-guitars-2026', 0, 2, 'value_es')));
out('best-instrument-mics rows[0].values[13] EN: ' + JSON.stringify(cell('best-instrument-mics', 0, 13, 'value')));
out('best-instrument-mics rows[0].values[13] ES: ' + JSON.stringify(cell('best-instrument-mics', 0, 13, 'value_es')));
const bi = byId['best-in-ear-monitors'];
out('=== best-in-ear s1 headings ===\nEN: ' + JSON.stringify(bi.sections[1].heading) + '\nES: ' + JSON.stringify(bi.sections[1].heading_es));
out('=== pro-guitars s0 EN ===\n' + sect('pro-guitars', 0).content);
const vp = byId['vocal-plugins'].featuredSnippet || {};
out('=== vocal-plugins featuredSnippet ===');
Object.entries(vp).forEach(([k, v]) => { if (typeof v === 'string' && (/faq_a4|text/.test(k))) out(k + ': ' + v); });
const pv = id => prods.find(x => String(x.id) === String(id)) || {};
['bestFor'].forEach(k => {
  ['613', '127', '97', '604', '543', '1004', '681'].forEach(id => {
    const b = pv(id)[k];
    out('P' + id + ' bestFor: ' + JSON.stringify(b));
  });
});
out('P631 badge: ' + JSON.stringify(pv('631').badge) + ' | P631 desc: ' + JSON.stringify((pv('631').desc || '').slice(0, 300)));
out('P630 desc_es: ' + JSON.stringify(pv('630').desc_es));
out('P613 desc_es full: ' + JSON.stringify(pv('613').desc_es));
out('P554 desc full EN: ' + JSON.stringify(pv('554').desc));
out('P554 desc_es full: ' + JSON.stringify(pv('554').desc_es));
out('P467 desc full EN: ' + JSON.stringify(pv('467').desc));
out('P233 desc_es full: ' + JSON.stringify(pv('233').desc_es));
out('P631 desc_es full: ' + JSON.stringify(pv('631').desc_es));
out('P8 desc full EN: ' + JSON.stringify(pv('8').desc));
out('P456 desc_es full: ' + JSON.stringify(pv('456').desc_es));
out('P237 desc EN full: ' + JSON.stringify(pv('237').desc));
out('P127 bestFor EN/ES ya arriba');
fs.writeFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/fields2.txt', P.join('\n\n'));
console.log('ok, bloques=' + P.length);
