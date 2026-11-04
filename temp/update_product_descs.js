const fs=require('fs');
const productsPath='C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\products.json';
const guidesPath='C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json';
let products=JSON.parse(fs.readFileSync(productsPath,'utf8'));
let guides=JSON.parse(fs.readFileSync(guidesPath,'utf8'));
const guide=guides.find(g=>g.id==='tuners-bass-guitar');
if(!guide){ console.log('guide not found'); process.exit(1); }
function stripHtml(html){
  return html.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
}
const map={};
guide.sections.forEach(sec=>{
  if(sec.products && sec.products.length){
    sec.products.forEach(pid=>{
      map[pid]={
        en: stripHtml(sec.content||''),
        es: stripHtml(sec.content_es||'')
      };
    });
  }
});
Object.entries(map).forEach(([pid,descObj])=>{
  const id=Number(pid);
  const prod=products.find(p=>p.id===id);
  if(prod){
    // keep existing title etc.
    prod.desc=descObj.en;
    prod.desc_es=descObj.es;
    console.log('updated',id,prod.title);
  }
});
fs.writeFileSync(productsPath, JSON.stringify(products,null,2));
console.log('done');
