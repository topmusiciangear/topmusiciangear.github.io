// Verificacion final de la tabla nueva en el HTML
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

['starter-studio.html', 'starter-studio_es.html'].forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  console.log('\n' + '='.repeat(72));
  console.log('  ' + f);
  console.log('='.repeat(72));

  const tbl = d.match(/<table[\s\S]*?<\/table>/);
  if (tbl) {
    [...tbl[0].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].forEach(r => {
      const c = [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
      if (c.length) console.log('  ' + c.map(x => x.slice(0, 34).padEnd(34)).join(' | '));
    });
  }
  console.log('\n  tarjetas: ' + (d.match(/guide-product-card-title/g) || []).length);
  console.log('  Rokit 5 G5: ' + (d.match(/Rokit 5 G5/g) || []).length + ' menciones');
  console.log('  JBL 305P: ' + (d.match(/305P/g) || []).length + ' menciones');
  ['$1,003', '$1,113', '$1,393', '$1.003', '$1.113', '$1.393', '$605', '$925'].forEach(p => {
    const n = (d.match(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    if (n) console.log('  ' + String(n).padStart(3) + 'x ' + p);
  });
  console.log('  "Solo auriculares": ' + (d.match(/Solo auriculares/g) || []).length);
});
