const fs=require('fs');
const path='C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const p=JSON.parse(fs.readFileSync(path,'utf8'));
const arr=Array.isArray(p)?p:p.products;
if(arr.find(x=>x.id===1054)){console.log('exists');process.exit(0);}
arr.push({
  id:1054,
  title:'Focal Shape 65',
  title_es:'Focal Shape 65',
  brand:'Focal',
  category:'monitors',
  price:699,
  rating:4.5,
  reviews:0,
  badge:'recommended',
  desc:'Nearfield monitor with dual side-firing passive radiators instead of a traditional bass-reflex port, Flax cone and Class AB amplification. Extremely detailed, organic and fatigue-free, ideal for wall-adjacent placement.',
  desc_es:'Monitor de campo cercano con dos radiadores pasivos laterales en lugar de puerto bass-reflex tradicional, cono Flax y amplificación Clase AB. Muy detallado, orgánico y sin fatiga, ideal incluso pegado a la pared.',
  img:'img/products/567ac4d00a.webp',
  stores:{
    musicstore:'https://www.musicstore.com/en_OE/EUR/Focal-Shape-65/art-REC0013085-000',
    andertons:'https://www.andertons.co.uk/focal-shape-65-active-nearfield-monitor-each/?search_query=%20Focal%20Shape%2065',
    gear4music:'https://www.gear4music.com/Recording-and-Computers/Focal-Shape-65-Studio-Monitor-Single/1XMT',
    zzounds:'https://www.zzounds.com/item--FOLFOPROSHAPE65?siid=255201',
    amazon:'https://www.amazon.com/dp/B06Y2B4Q45?lv=shuf&channelId=500&plpRedirect=mhFallback&th=1'
  },
  unit:'each',
  unit_es:'cada uno',
  score:9.4
});
fs.writeFileSync(path, JSON.stringify(Array.isArray(p)?arr:{...p,products:arr}, null, 2));
console.log('added');