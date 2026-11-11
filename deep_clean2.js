const fs=require('fs');
const guides=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const removeIds=[136,200,61,472,7];
function cleanHtml(html){
  if(!html) return html;
  // Remove paragraphs that start with em dash or hyphen after optional empty strong
  let out=html.replace(/<p>\s*<strong>\s*<\/strong>\s*[—-]\s*[^<]*<\/p>/gi,'');
  out=out.replace(/<p>\s*[—-]\s*[^<]*<\/p>/gi,'');
  // Remove any paragraph containing product id name patterns
  return out;
}
for(const g of guides){
  const fields=['intro','intro_es','conclusion','conclusion_es','verdict','verdict_es','description','description_es'];
  for(const f of fields){
    if(g[f]) g[f]=cleanHtml(g[f]);
  }
  // productTable columns
  if(g.productTable && Array.isArray(g.productTable.columns)){
    const before=g.productTable.columns.length;
    g.productTable.columns=g.productTable.columns.filter(col=>{
      const t=(col.title||'').toLowerCase();
      const te=(col.title_es||'').toLowerCase();
      if(t.includes('gibson')||te.includes('gibson')) return false;
      if(t.includes('les paul')||te.includes('les paul')) return false;
      // also filter by id if column has id? Not present.
      return true;
    });
    // rows need same length; trim values
    for(const row of g.productTable.rows||[]){
      if(Array.isArray(row.values)){
        row.values=row.values.slice(0,g.productTable.columns.length);
      }
    }
  }
  // sections headings pattern
  if(Array.isArray(g.sections)){
    g.sections=g.sections.filter(s=>{
      const h=(s.heading||'')+' '+(s.heading_es||'');
      if(/gibson|les paul/i.test(h)) return false;
      return true;
    });
  }
}
fs.writeFileSync('data/guides.json', JSON.stringify(guides,null,2));
console.log('deep clean done');
