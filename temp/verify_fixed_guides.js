const fs = require('fs');
const ids = ['budget-interfaces', 'hs8-vs-rokit-7', 'rme-vs-motu', 'blues-junior-vs-ac30', 'katana-vs-dsl', 'best-digital-mixers'];
let ok = true;
ids.forEach(id => {
  [id + '.html', id + '_es.html'].forEach(f => {
    const h = fs.readFileSync('guides/' + f, 'utf8');
    const dump = h.indexOf('{"id":"' + id + '"') > -1;
    const m = h.match(/<div class="guide-detail-intro"><p>([\s\S]{0,120})/);
    const introHead = m ? m[1].replace(/\s+/g, ' ').slice(0, 100) : 'NO INTRO FOUND';
    if (dump) ok = false;
    console.log((dump ? 'DUMP!! ' : 'ok ') + f + ' | intro: ' + introHead);
  });
});
console.log(ok ? 'ALL CLEAN' : 'STILL BROKEN');