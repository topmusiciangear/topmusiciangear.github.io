const fs=require('fs');
const R='C:/Users/Daniel/projects/topmusiciangear/data';
const pg=JSON.parse(fs.readFileSync(R+'/products.json','utf8'));
const PS=Array.isArray(pg)?pg:(pg.products||[]);
[53,54,55,262,263].forEach(id=>{
  const p=PS.find(x=>x&&x.id===id);
  if(!p){console.log(id+' FALTA');return}
  const sk=Object.keys(p).filter(k=>/spec|specs|feature|key|chan|preamp|sample|bit|connect|latenc|price|title|img|io|din|rating|i\/o/i.test(k));
  console.log('\n['+id+'] '+(p.title||p.name||''));
  console.log('  sk='+JSON.stringify(sk));
});
