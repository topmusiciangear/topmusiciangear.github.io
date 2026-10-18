const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'))
  .find(x => x.id === 'best-home-studio-speakers');
console.log('FAQs en guides.json: ' + (g.faq || []).length);

const en = fs.readFileSync(B + 'guides/best-home-studio-speakers.html', 'utf8');
const es = fs.readFileSync(B + 'guides/best-home-studio-speakers_es.html', 'utf8');
[['EN', en], ['ES', es]].forEach(([l, s]) => {
  const fi = s.search(/class="guide-faq"/);
  const bloque = fi >= 0 ? s.slice(fi, fi + 40000) : '';
  const fin = bloque.search(/<\/section>|guide-related/);
  const faq = fin > 0 ? bloque.slice(0, fin) : bloque;
  console.log(l + ': items=' + (faq.match(/guide-faq-item/g) || []).length +
    ' | botones=' + (faq.match(/guide-faq-question/g) || []).length);
  const k = en.indexOf('knob');
  if (l === 'EN') {
    let p = -1, n = 0;
    while ((p = s.indexOf('knob', p + 1)) >= 0 && n < 6) {
      console.log('   knob -> ...' + s.slice(Math.max(0, p - 110), p + 60).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ') + '...');
      n++;
    }
  }
});