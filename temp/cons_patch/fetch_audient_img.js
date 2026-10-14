var https=require('https');
var url='https://audient.com/products/monitor-controllers/oria/overview/';
https.get(url,{headers:{'User-Agent':'Mozilla/5.0'}}, r=>{
  let d=''; r.on('data',c=>d+=c); r.on('end',()=>{
    let m=d.match(/https:\/\/audient\.com\/wp-content\/uploads\/[^"]+\.(png|jpg|webp)/gi);
    console.log(m?m.slice(0,5).join('\n'):'no match');
    let og=d.match(/og:image[^>]*content="([^"]+)"/i);
    console.log('og', og?og[1]:'none');
    require('fs').writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/audient_fetch.html', d.slice(0,6000));
  });
}).on('error',e=>console.log(e));
