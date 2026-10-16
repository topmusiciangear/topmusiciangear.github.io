const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-synth-vsts', 'best-midi-theory-plugins', 'best-piano-keyboard-vsts',
 'best-guitar-plugins', 'best-audio-repair-plugins', 'autotune-vs-melodyne',
 'ozone-vs-fabfilter', 'vocalign-vs-revoice-pro'].forEach(id => {
  ['en', 'es'].forEach(lang => {
    const f = B + 'guides/' + id + (lang === 'es' ? '_es' : '') + '.html';
    const h = fs.readFileSync(f, 'utf8');
    const cards = (h.match(/guide-product-card\b/g) || []).length;
    const undef = (h.match(/undefined/g) || []).length;
    const pbBtn = (h.match(/pluginboutique\.com/g) || []).length;
    const tblCols = (h.match(/<th/g) || []).length;
    const emptyCell = (h.match(/<t[dh]><\/t[dh]>|<t[dh]>-<\/t[dh]>/g) || []).length;
    console.log(id + ' [' + lang + ']: cards=' + cards + ' undefined=' + undef + ' PBrefs=' + pbBtn + ' th=' + tblCols + ' emptyCells=' + emptyCell);
  });
});
