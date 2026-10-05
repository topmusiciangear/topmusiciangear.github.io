const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
// For every built HTML guide (EN), check each section that lists products:
// does it render at least one guide-section-img?
const files = fs.readdirSync(DIR + 'guides').filter(f => f.endsWith('.html') && !f.endsWith('_es.html'));
let badGuides = 0, badSecs = 0;
const details = [];
files.forEach(f => {
  const gid = f.replace('.html', '');
  const g = G.find(x => x.id === gid);
  if (!g) return;
  const h = fs.readFileSync(DIR + 'guides/' + f, 'utf8');
  const parts = h.split('<h2 class="guide-section-heading"');
  const Ui = (g.sections || []).map((s, i) => ({ i, prods: (s.products || []).length, skip: !!s.skipMedia }));
  for (let k = 1; k < parts.length; k++) {
    const p = parts[k];
    const hasImg = /class="guide-section-img/.test(p);
    const sec = Ui[k - 1];
    if (sec && sec.prods > 0 && !sec.skip && !hasImg) {
      badSecs++;
      const key = gid;
      if (!details.find(d => d.g === key)) { details.push({ g: key, secs: [] }); badGuides++; }
      details.find(d => d.g === key).secs.push('S' + (k) + ':' + (g.sections[k - 1].heading || '').slice(0, 50) + ' [' + (g.sections[k - 1].products || []).join(',') + ']');
    }
  }
});
console.log('guides with photo-less product sections: ' + badGuides + ' | sections: ' + badSecs);
details.forEach(d => { console.log('\n##### ' + d.g); d.secs.forEach(s => console.log('  ' + s)); });
fs.writeFileSync(DIR + 'temp/photo_sitewide.json', JSON.stringify(details, null, 1));