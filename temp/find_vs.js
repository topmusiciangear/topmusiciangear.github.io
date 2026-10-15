const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
console.log('=== guias cuyo titulo menciona Lewitt o LCT1040 ===');
guides.filter(g => /lewi|lct1040/i.test((g.title||'') + ' ' + (g.title_es||''))).forEach(g => {
  console.log('  ' + g.id + ' | ' + g.title + ' | ES: ' + g.title_es);
  const ids = new Set(); (g.featuredProducts||[]).forEach(i=>ids.add(i)); g.sections.forEach(s=>(s.products||[]).forEach(i=>ids.add(i)));
  const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
  const arr = Array.isArray(P)?P:P.products;
  console.log('      productos: ' + [...ids].map(i=>{const p=arr.find(x=>x.id===i);return p?p.title:i;}).join(' | '));
  console.log('      veredictos: ' + (g.verdictProsCons||[]).map(v=>v.name||v.title).join(' | '));
  console.log('      tabla: ' + (g.productTable ? g.productTable.columns.map(c=>c.title).join(' | ') : 'sin productTable'));
  const f = g.featuredSnippet||{};
  if (f.name1_en) console.log('      tabla vs: ' + f.name1_en + ' | ' + f.name2_en);
});
console.log('\n=== guias cuyo titulo menciona ADAM S3H o Focal Trio11 ===');
guides.filter(g => /adam s3h|trio11/i.test((g.title||'') + ' ' + (g.title_es||'') + ' ' + (g.id||''))).forEach(g => {
  console.log('  ' + g.id + ' | ' + g.title + ' | ES: ' + g.title_es);
  const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
  const arr = Array.isArray(P)?P:P.products;
  const ids = new Set(); (g.featuredProducts||[]).forEach(i=>ids.add(i)); g.sections.forEach(s=>(s.products||[]).forEach(i=>ids.add(i)));
  console.log('      productos: ' + [...ids].map(i=>{const p=arr.find(x=>x.id===i);return p?p.title:i;}).join(' | '));
  console.log('      veredictos: ' + (g.verdictProsCons||[]).map(v=>v.name||v.title).join(' | '));
  console.log('      tabla: ' + (g.productTable ? g.productTable.columns.map(c=>c.title).join(' | ') : 'sin productTable'));
  const f = g.featuredSnippet||{};
  if (f.name1_en) console.log('      tabla vs: ' + f.name1_en + ' | ' + f.name2_en);
});
console.log('\n=== todas las guias vs con MAS de 2 productos ===');
guides.filter(g => /-vs-/.test(g.id)).forEach(g => {
  const ids = new Set(); (g.featuredProducts||[]).forEach(i=>ids.add(i)); g.sections.forEach(s=>(s.products||[]).forEach(i=>ids.add(i)));
  if (ids.size > 2) console.log('  ' + g.id.padEnd(34) + ids.size + ' productos | ' + g.title);
});