const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const g = guides.find(x=>x.id==='beat-making');
console.log('### ' + g.title);
const t = g.productTable;
console.log('\ncolumnas (' + t.columns.length + '):');
t.columns.forEach((c,i)=>console.log('  ' + i + '. ' + c.title + (c.title_es ? '  ||ES: ' + c.title_es : '')));
console.log('\nfilas:');
t.rows.forEach(r=>console.log('  ' + r.label.padEnd(20) + r.values.map(v=>v.value).join(' ~ ')));

console.log('\n\nSECCIONES (' + g.sections.length + '):');
g.sections.forEach((s,i)=>{
  console.log('\n  [' + i + '] ' + (s.heading||s.h));
  console.log('      ES: ' + (s.heading_es||s.h_es));
  console.log('      products=' + JSON.stringify(s.products||[]));
  if (i===0 || i===6) {
    console.log('      EN> ' + String(s.content||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(0,600));
    console.log('      ES> ' + String(s.content_es||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(0,600));
  }
});

console.log('\n\nVEREDICTOS (' + g.verdictProsCons.length + '):');
g.verdictProsCons.forEach((v,i)=>{
  const p = v.name||v.title;
  console.log('\n  ' + i + '. ' + p);
  if (/MPC Live III|MPC Sample/.test(p)) {
    console.log('     pros: ' + v.pros.join(' / '));
    console.log('     cons: ' + v.cons.join(' / '));
    console.log('     pros_es: ' + v.pros_es.join(' / '));
    console.log('     cons_es: ' + v.cons_es.join(' / '));
  }
});