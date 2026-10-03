// Site-wide check: no raw guide-JSON visible outside <script> blocks, EN+ES.
const fs = require('fs');
const G = require('../data/guides.json');
let bad = [];
G.forEach(g => {
  [g.id + '.html', g.id + '_es.html'].forEach(f => {
    let h;
    try { h = fs.readFileSync('guides/' + f, 'utf8'); } catch (e) { bad.push(f + ' MISSING FILE'); return; }
    const noScripts = h.replace(/<script[\s\S]*?<\/script>/g, '');
    const needle = '{"id":"' + g.id + '"';
    if (noScripts.indexOf(needle) > -1) bad.push(f + ' RAW JSON DUMP');
    if (noScripts.indexOf('{"id":') > -1) bad.push(f + ' OTHER RAW JSON?');
  });
});
console.log(bad.length ? bad.join('\n') : 'SITE CLEAN: 310 pages, no raw JSON dumps');