const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
let issues = 0;
guides.forEach(g => {
  const vpc = g.verdictProsCons || [];
  // Check if any verdictProsCons entry has name but no name_es or vice versa
  vpc.forEach((v, i) => {
    if (v.name && !v.name_es) { console.log('MISSING name_es in', g.id, 'vpc', i); issues++; }
    if (!v.name && v.name_es) { console.log('MISSING name in', g.id, 'vpc', i); issues++; }
  });
  // Check sections count
  const secs = g.sections || [];
  // Check productTable columns count vs rows values count
  if (g.productTable) {
    const cols = g.productTable.columns || [];
    const rows = g.productTable.rows || [];
    rows.forEach((r, ri) => {
      const vals = r.values || [];
      if (vals.length !== cols.length) {
        console.log('MISMATCH columns/values in', g.id, 'row', ri, 'cols', cols.length, 'vals', vals.length);
        issues++;
      }
    });
  }
  // Check faq count
  const faq = g.faq || [];
  // faq is array of objects with q/a and q_es/a_es
  faq.forEach((f, i) => {
    if (f.q && !f.q_es) { console.log('MISSING q_es in', g.id, 'faq', i); issues++; }
    if (!f.q && f.q_es) { console.log('MISSING q in', g.id, 'faq', i); issues++; }
  });
});
console.log('Total issues:', issues);
