const fs = require('fs');
// count rendered FAQ items per Top Gear guide (EN+ES)
const ids = ['pro-headphones','pro-microphones','pro-monitors','pro-interfaces','pro-guitars','pro-basses','pro-synths','pro-drum-machines','pro-plugins','pro-live-sound','pro-mixers','pro-daw','beat-making','premium-interfaces'];
ids.forEach(id => {
  ['guides/' + id + '.html', 'guides/' + id + '_es.html'].forEach(f => {
    const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/' + f, 'utf8');
    const n = (h.match(/class="guide-faq-item"/g) || []).length;
    const ld = h.includes('"FAQPage"') ? 'JSONLD ok' : 'JSONLD MISSING';
    console.log(f, 'faqs=' + n, ld);
  });
});