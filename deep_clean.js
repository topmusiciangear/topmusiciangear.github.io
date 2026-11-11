const fs=require('fs');
const guides=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const prodMap=new Map(products.map(p=>[p.id,p.title]));
const removeIds=[136,200,61,472,7];
const removeTitles=new Set(removeIds.map(id=>prodMap.get(id)).filter(Boolean));

for(const g of guides){
  // sections
  if(g.sections){
    g.sections=g.sections.filter(s=>{
      const ids=(s.products||[]);
      const hasRemove=ids.some(id=>removeIds.includes(id));
      // also check heading contains title
      const heading=(s.heading||'')+' '+(s.heading_es||'');
      const hasTitleRemove=[...removeTitles].some(t=>heading.toLowerCase().includes(t.toLowerCase()));
      return !hasRemove && !hasTitleRemove;
    });
  }
  // featuredProducts
  if(g.featuredProducts){
    g.featuredProducts=g.featuredProducts.filter(id=>!removeIds.includes(id));
  }
  // verdictProsCons
  if(g.verdictProsCons){
    g.verdictProsCons=g.verdictProsCons.filter(v=>{
      const name=(v.name||'')+' '+(v.name_es||'');
      return ![...removeTitles].some(t=>name.toLowerCase().includes(t.toLowerCase()));
    });
  }
  // productTable columns
  if(g.productTable && g.productTable.columns){
    g.productTable.columns=g.productTable.columns.filter(col=>{
      const t=(col.title||'')+' '+(col.title_es||'');
      return ![...removeTitles].some(ti=>t.toLowerCase().includes(ti.toLowerCase()));
    });
  }
  // verdict text cleanup: remove <span class="product-name">Product</span> blocks
  if(g.verdict){
    let v=g.verdict;
    for(const t of removeTitles){
      const re=new RegExp(`<span class="product-name">\\s*${t.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\\\$&')}\\s*</span>[^<]*<[^>]+>[^<]*`, 'gi');
      // simpler: remove sentences containing product name
      const pattern=new RegExp(`<[^>]*>${t}[^<]*</[^>]+>`, 'gi');
      v=v.replace(pattern,'');
    }
    g.verdict=v;
  }
}
fs.writeFileSync('data/guides.json', JSON.stringify(guides,null,2));
console.log('done');
