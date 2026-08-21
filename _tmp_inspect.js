const g = require('./data/guides.json');
['best-wireless-iems', 'best-parlor-guitars'].forEach(k => {
  const x = g.find(q => q.id === k);
  console.log('==== ' + k);
  console.log('productTable.title:', x.productTable && x.productTable.title, '|', x.productTable && x.productTable.title_es);
  if (x.productTable) {
    console.log('headers:', JSON.stringify(x.productTable.headers || x.productTable.columns));
    x.productTable.rows.forEach(r => console.log('  row:', r.label, '|', r.label_es, '| vals:', r.values.map(v => v.value).join(' / ').slice(0, 100)));
  }
  console.log('verdictProsCons:');
  (x.verdictProsCons || []).forEach(v => console.log('  -', v.name, '|', v.name_es, '| pros:', (v.pros || []).length, '| cons:', (v.cons || []).length));
  console.log('orden secciones:');
  x.sections.forEach(s => { const t = s.products ? s.products.join(',') : '-'; console.log('   ', (s.title || '').slice(0, 60), '| ids:', t); });
});
