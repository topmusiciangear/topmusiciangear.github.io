const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
['best-looper-pedals','best-reverb-delay','best-wireless-iems','wireless-intercom-systems','stream-controllers','mixing-plugins','best-acoustic-guitars-for-beginners','best-stage-keyboards','best-drum-machine','best-multi-effects-pedals'].forEach(id=>{
  const g = guides.find(x=>x.id===id);
  console.log('\n############ ' + id);
  console.log('columnas (' + (g.productTable?g.productTable.columns.length:0) + '): ' + (g.productTable?g.productTable.columns.map(c=>c.title).join(' | '):'-'));
  console.log('filas: ' + (g.productTable?g.productTable.rows.length:0));
  console.log('veredictos (' + (g.verdictProsCons||[]).length + '): ' + (g.verdictProsCons||[]).map(v=>v.name||v.title).join(' | '));
  console.log('productos usados: ' + [...new Set((g.sections||[]).flatMap(s=>s.products||[]).concat(g.featuredProducts||[]))].join(','));
});