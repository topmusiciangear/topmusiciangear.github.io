const fs=require('fs');
const path='./data/products.json';
let data=JSON.parse(fs.readFileSync(path,'utf8'));
const newProducts=[
{
  "id":1066,
  "title":"Solid State Logic SSL Native Channel Strip 2",
  "title_es":"Solid State Logic SSL Native Channel Strip 2",
  "brand":"Solid State Logic",
  "category":"plugins",
  "price":149,
  "rating":4.7,
  "reviews":1200,
  "badge":"topQuality",
  "desc":"Official SSL channel strip with modern digital precision, anti-cramping EQ and Over-Easy compressor.",
  "desc_es":"Channel strip oficial de SSL con precisión digital moderna, EQ anti-cramping y compresor Over-Easy.",
  "img":"img/products/default-plugin.webp",
  "stores":{"pluginboutique":"https://www.pluginboutique.com/product/8653-SSL-Native-Channel-Strip-2?a_aid=6a01e859cbe1a"}
},
{
  "id":1067,
  "title":"Lindell Audio 80 Series",
  "title_es":"Lindell Audio 80 Series",
  "brand":"Lindell Audio",
  "category":"plugins",
  "price":199,
  "rating":4.6,
  "reviews":800,
  "badge":"topQuality",
  "desc":"Neve 8028 analog emulation with 1073/1084 modules and 2254 compressor.",
  "desc_es":"Emulación analógica Neve 8028 con módulos 1073/1084 y compresor 2254.",
  "img":"img/products/default-plugin.webp",
  "stores":{"pluginboutique":"https://www.pluginboutique.com/search?q=Lindell+Audio+80+Series&a_aid=6a01e859cbe1a"}
},
{
  "id":1068,
  "title":"Universal Audio UAD API Vision Channel Strip",
  "title_es":"Universal Audio UAD API Vision Channel Strip",
  "brand":"Universal Audio",
  "category":"plugins",
  "price":299,
  "rating":4.8,
  "reviews":950,
  "badge":"topQuality",
  "desc":"API console emulation with Proportional Q EQ and fast VCA compressor, Unison preamp.",
  "desc_es":"Emulación de consola API con EQ Proportional Q y compresor VCA rápido, previo Unison.",
  "img":"img/products/default-plugin.webp",
  "stores":{"pluginboutique":"https://www.pluginboutique.com/search?q=UAD+API+Vision+Channel+Strip&a_aid=6a01e859cbe1a"}
},
{
  "id":1069,
  "title":"Waves Scheps Omni Channel 2",
  "title_es":"Waves Scheps Omni Channel 2",
  "brand":"Waves",
  "category":"plugins",
  "price":299,
  "rating":4.9,
  "reviews":2100,
  "badge":"topQuality",
  "desc":"Modular channel strip by Andrew Scheps with interchangeable modules and Thump saturation.",
  "desc_es":"Channel strip modular de Andrew Scheps con módulos intercambiables y saturación Thump.",
  "img":"img/products/default-plugin.webp",
  "stores":{"pluginboutique":"https://www.pluginboutique.com/search?q=Waves+Scheps+Omni+Channel+2&a_aid=6a01e859cbe1a"}
},
{
  "id":1070,
  "title":"Waves Magma Tube Channel Strip",
  "title_es":"Waves Magma Tube Channel Strip",
  "brand":"Waves",
  "category":"plugins",
  "price":149,
  "rating":4.4,
  "reviews":600,
  "badge":"",
  "desc":"Vintage tube channel strip with asymmetric drive and optical compressor.",
  "desc_es":"Channel strip de válvulas vintage con drive asimétrico y compresor óptico.",
  "img":"img/products/default-plugin.webp",
  "stores":{"pluginboutique":"https://www.pluginboutique.com/search?q=Waves+Magma+Tube+Channel+Strip&a_aid=6a01e859cbe1a"}
}
];
data.push(...newProducts);
fs.writeFileSync(path, JSON.stringify(data,null,2).replace(/\n/g,'\r\n'),'utf8');
console.log('Added',newProducts.length,'products');
