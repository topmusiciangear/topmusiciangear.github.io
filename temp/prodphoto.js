const fs = require('fs');
[['best-drum-machine', 'Roland TR-8S'], ['best-grooveboxes', 'Roland TR-8S'], ['best-daw-for-beginners', 'Ableton Live 12 Suite'], ['best-headphones-for-mixing', 'Audio-Technica ATH-M50x']].forEach(function([id, prod]) {
  const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/' + id + '.html', 'utf8');
  const parts = h.split('guide-section-heading" id="sec-');
  const withPhoto = [];
  parts.slice(1).forEach((part, k) => {
    const tm = part.match(/^\d+">([^<]+)</);
    const title = tm ? tm[1] : '?';
    if (part.includes('guide-section-imgs"><img') && part.includes('alt="' + prod)) withPhoto.push('sec' + (k + 1) + ':' + title.slice(0, 40));
  });
  console.log(id, prod, '=> foto en:', withPhoto.length ? withPhoto.join(' | ') : 'NINGUNA');
});