const fs = require('fs');
// for each guide: sections whose heading names a product but show no photo of it
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function normHead(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
const STOP = new Set(['audio','pro','live','series','edition','mk','the','and','vs','for','your','studio','best','what','which','with','from','how','why','es','el','la','los','las','para','una','un','mejor','del','de','y','o','a','en','que','como','cuando','donde','cual','son','se','su','this','that','are','is','do','does','should','buy','get','use']);
['budget-mics'].forEach(id => {
  const g = G.find(x => x.id === id);
  const f = 'guides/' + id + '.html';
  const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/' + f, 'utf8');
  // split by section headings
  const parts = h.split('guide-section-heading" id="sec-');
  parts.slice(1).forEach((part, k) => {
    const title = (part.match(/^(\d+)">([^<]+)</) || [])[2] || '?';
    const hasImg = part.includes('guide-section-imgs"><img');
    console.log('sec' + (k + 1), hasImg ? 'FOTO' : 'SIN-FOTO', '-', title);
  });
});