const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const ids = ['best-synth-vsts','best-midi-theory-plugins','best-piano-keyboard-vsts','best-guitar-plugins','best-audio-repair-plugins','autotune-vs-melodyne','ozone-vs-fabfilter','vocalign-vs-revoice-pro'];

ids.forEach(id => {
  const gd = guides.find(g => g.id === id);
  console.log('=== ' + id + ' ===');
  // 1. sections products
  const noProd = gd.sections.filter(s => !s.products || !s.products.length);
  console.log('sections: ' + gd.sections.length + ' | without products[]: ' + noProd.length);
  noProd.forEach(s => console.log('  MISSING: ' + (s.heading || '').substring(0, 60)));
  // 2. table vs featured
  const cols = (gd.productTable && gd.productTable.columns) ? gd.productTable.columns.length : 0;
  const feat = (gd.featuredProducts || []).length;
  console.log('table columns: ' + cols + ' | featuredProducts: ' + feat + (cols === feat ? ' OK' : ' MISMATCH'));
  // 3. verdict names
  const noName = (gd.verdictProsCons || []).filter(v => !v.name);
  console.log('verdicts: ' + (gd.verdictProsCons || []).length + ' | without name: ' + noName.length);
  // 4. product images
  (gd.featuredProducts || []).forEach(pid => {
    const p = products.find(x => x.id === pid);
    if (!p) console.log('  product ' + pid + ' NOT IN CATALOG');
    else if (!p.img) console.log('  product ' + pid + ' (' + p.title + ') MISSING img');
  });
  console.log('');
});
