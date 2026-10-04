const fs = require('fs');
function check(id, prod) {
  const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/' + id + '.html', 'utf8');
  const parts = h.split('guide-section-heading" id="sec-');
  const out = [];
  parts.slice(1).forEach((part, k) => {
    const tm = part.match(/^\d+">([^<]+)</);
    const title = tm ? tm[1] : '?';
    // cut at next section start to exclude grid/faqs
    const endNext = part.indexOf('guide-section-heading" id="sec-');
    const body = endNext > -1 ? part.slice(0, endNext) : part.slice(0, 9000);
    const m = body.match(/guide-section-imgs"><img[^>]*alt="([^"]+)"/);
    if (m && m[1].includes(prod)) out.push('sec' + (k + 1) + ':' + title.slice(0, 45));
  });
  console.log(id, '|', prod, '=> foto en su sección:', out.length ? out.join(' | ') : 'NINGUNA');
}
check('best-drum-machine', 'Roland TR-8S');
check('best-grooveboxes', 'Roland TR-8S');
check('best-daw-for-beginners', 'Ableton Live 12 Suite');
check('best-headphones-for-mixing', 'Audio-Technica ATH-M50x');