const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));

const bm = g.find(x => x.id === 'budget-mics');
console.log('1) featuredSnippet.title_en: "' + bm.featuredSnippet.title_en + '"');

const usb = g.find(x => x.id === 'budget-usb-mics');
['intro', 'intro_es'].forEach(k => {
  const m = (usb[k] || '').match(/.{0,60}23 Best Budget.{0,60}/);
  console.log('2) budget-usb-mics.' + k + ': ' + (m ? '...' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '...' : '(no)'));
});

const rib = g.find(x => x.id === 'best-ribbon-mics');
const t = JSON.stringify(rib);
[...new Set(t.match(/.{0,80}23 Best Budget.{0,80}/g) || [])].forEach(m =>
  console.log('3) best-ribbon-mics: ...' + m.replace(/<[^>]+>/g, ' ').replace(/\\"/g, '"').replace(/\s+/g, ' ').trim().slice(0, 170) + '...'));
