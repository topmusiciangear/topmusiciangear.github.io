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
guide.sections.forEach(sec=>{
  if(sec.products && sec.products.length===1){
    const pid=sec.products[0];
    const prod=products.find(p=>p.id===pid);
    if(prod){
      prod.desc=stripHtml(sec.content||'');
      prod.desc_es=stripHtml(sec.content_es||'');
      console.log('updated',pid,prod.title);
    }
  }
});
fs.writeFileSync(productsPath, JSON.stringify(products,null,2));
console.log('done');
