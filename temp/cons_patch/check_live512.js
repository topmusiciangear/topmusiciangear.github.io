var https=require('https');
https.get('https://topmusiciangear.com/data/products.json',{headers:{'User-Agent':'Mozilla/5.0'}}, r=>{
 let d=''; r.on('data',c=>d+=c); r.on('end',()=>{
  var A=JSON.parse(d);
  var list=Array.isArray(A)?A:A.products;
  var p=list.find(x=>x.id===512);
  console.log('live 512', p? p.img : 'not found', p? Object.keys(p.stores||{}).join(','):'' );
  var q=list.find(x=>x.id===515);
  console.log('live 515', q? q.img : 'not found');
 });
}).on('error',e=>console.log(e));
