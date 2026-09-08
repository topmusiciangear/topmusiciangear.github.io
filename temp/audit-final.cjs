const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const prod = Array.isArray(p) ? p : (p.products || []);
const byId = id => prod.find(q => q.id === id);

function refsFor(ids) {
  for (const id of ids) {
    const hits = g.filter(q => {
      const s = JSON.stringify(q);
      const re = new RegExp('(?<=[,\\[])' + id + '(?=[,\\]])');
      return re.test(s);
    }).map(q => q.id);
    console.log('id ' + id + ' (' + (byId(id) ? byId(id).title : '??') + ') referenced in guides: ' + (hits.join(', ') || 'NONE'));
  }
}

refsFor([486, 487, 488, 489, 490, 491, 492]);

const mix = g.find(q => q.id === 'best-digital-mixers');
if (mix && mix.productTable) {
  console.log('\nbest-digital-mixers productTable cols: ' + mix.productTable.columns.map(c => c.title).join(' | '));
  console.log('rows: ' + mix.productTable.rows.map(r => r.label).join(' | '));
} else {
  console.log('\nbest-digital-mixers: no productTable');
}

const gho = g.find(q => q.id === 'best-guitar-home-office');
if (gho) {
  console.log('\nbest-guitar-home-office sections products:');
  (gho.sections || []).forEach((s, i) => console.log('  sec' + i + ': ' + JSON.stringify((s.products || []))));
  console.log('featuredProducts: ' + JSON.stringify(gho.featuredProducts || []));
  console.log('cols: ' + (gho.productTable ? gho.productTable.columns.map(c => c.title).join(' | ') : 'NONE'));
}