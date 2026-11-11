const fs=require('fs');
const guides=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const prodMap=new Map(products.map(p=>[p.id,{title:p.title,title_es:p.title_es||p.title}]));
const removeIds=[136,200,61,472,7];
const removeInfo=removeIds.map(id=>prodMap.get(id)).filter(Boolean);
const names=new Set(removeInfo.flatMap(p=>[p.title,p.title_es]));

function stripParagraphsWithName(str){
  if(typeof str!=='string') return str;
  // Remove <p>...</p> containing any name
  let out=str;
  // Remove paragraphs containing product name in span or plain
  for(const name of names){
    const esc=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const re=new RegExp(`<p[^>]*>[^<]*<span class="product-name">[^<]*${esc}[^<]*</span>[^<]*</p>`, 'gi');
    // also plain
    const re2=new RegExp(`<p[^>]*>[^<]*${esc}[^<]*</p>`, 'gi');
    out=out.replace(re,'');
    out=out.replace(re2,'');
  }
  return out;
}

function cleanString(s){
  if(typeof s!=='string') return s;
  let out=s;
  // Remove product names
  for(const {title,title_es} of removeInfo){
    const re=new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');
    out=out.replace(re,'');
    if(title_es && title_es!==title){
      const re2=new RegExp(title_es.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');
      out=out.replace(re2,'');
    }
  }
  // Clean paragraphs
  out=stripParagraphsWithName(out);
  // Collapse spaces
  out=out.replace(/\s{2,}/g,' ');
  return out;
}

function cleanGuide(g){
  // sections filter
  if(Array.isArray(g.sections)){
    g.sections=g.sections.filter(s=>{
      const ids=Array.isArray(s.products)?s.products:[];
      if(ids.some(id=>removeIds.includes(id))) return false;
      const heading=(s.heading||'')+' '+(s.heading_es||'');
      if([...names].some(n=>heading.toLowerCase().includes(n.toLowerCase()))) return false;
      if(s.content) s.content=cleanString(s.content);
      if(s.content_es) s.content_es=cleanString(s.content_es);
      return true;
    });
  }
  if(Array.isArray(g.featuredProducts)){
    g.featuredProducts=g.featuredProducts.filter(id=>!removeIds.includes(id));
  }
  if(Array.isArray(g.verdictProsCons)){
    g.verdictProsCons=g.verdictProsCons.filter(v=>{
      const n=(v.name||'')+' '+(v.name_es||'');
      return ![...names].some(name=>n.toLowerCase().includes(name.toLowerCase()));
    });
  }
  if(g.productTable && Array.isArray(g.productTable.columns)){
    g.productTable.columns=g.productTable.columns.filter(col=>{
      const t=(col.title||'')+' '+(col.title_es||'');
      return ![...names].some(name=>t.toLowerCase().includes(name.toLowerCase()));
    });
  }
  const fields=['intro','intro_es','conclusion','conclusion_es','verdict','verdict_es','description','description_es'];
  for(const f of fields){
    if(g[f]) g[f]=cleanString(g[f]);
  }
  // FAQs fields
  for(const f of Object.keys(g)){
    if(f.startsWith('faq_') && typeof g[f]==='string'){
      g[f]=cleanString(g[f]);
    }
  }
  return g;
}

const cleaned=guides.map(cleanGuide);
fs.writeFileSync('data/guides.json', JSON.stringify(cleaned,null,2));
console.log('done');
