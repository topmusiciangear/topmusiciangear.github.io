const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id]=p);

['sidechain-modulation-plugins'].forEach(id => {
  const g = guides.find(x=>x.id===id);
  console.log('\n############ ' + id + '  (' + g.title + ')');
  const ids = new Set();
  (g.featuredProducts||[]).forEach(i=>ids.add(i));
  (g.sections||[]).forEach(s=>(s.products||[]).forEach(i=>ids.add(i)));
  console.log('\nTARJETAS (' + ids.size + '):');
  [...ids].forEach(i => { const p = byId[i]; console.log('   id ' + i + '  ' + (p?p.title:'??') + '  | $' + (p?p.price:'?') + ' | ' + Object.keys((p&&p.stores)||{}).join(',')); });
  console.log('\nfeaturedProducts: ' + JSON.stringify(g.featuredProducts));
  console.log('\nSECCIONES (' + g.sections.length + '):');
  g.sections.forEach((s,i)=>console.log('  ' + i + '. ' + (s.heading||s.h) + '\n       products=' + JSON.stringify(s.products)));
  if (g.productTable) {
    console.log('\nTABLA (' + g.productTable.columns.length + ' col): ' + g.productTable.columns.map((c,i)=>i+':'+c.title).join(' | '));
    g.productTable.rows.forEach(r=>console.log('   ' + r.label.padEnd(22) + r.values.map(v=>v.value).join(' ~ ')));
  } else console.log('\n(sin productTable)');
  console.log('\nVEREDICTOS (' + (g.verdictProsCons||[]).length + '):');
  (g.verdictProsCons||[]).forEach(v=>console.log('   * ' + (v.name||v.title)));
  console.log('\nverdict (texto):\n' + String(g.verdict).slice(0,700));
  console.log('\nconclusion:\n' + String(g.conclusion).replace(/<[^>]+>/g,' ').slice(0,700));
});