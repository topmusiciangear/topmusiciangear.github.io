var fs=require('fs');
var P='data/products.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var list=Array.isArray(A)?A:A.products;
var p=list.find(x=>x.id===512);
if(!p) throw new Error('512 not found');
p.image='https://r2.gear4music.com/media/91/914607/1200/preview.jpg';
p.stores=p.stores||{};
p.stores.gear4music='https://www.gear4music.com/Recording-and-Computers/Neumann-MT48-Premium-Audio-Interface/5E3S';
p.stores.amazon='https://www.amazon.com/Neumann-MT-48-US-Connectivity/dp/B0BTGVGCJN';
p.stores.andertons='https://www.andertons.co.uk/Neumann-MT-48-Audio-Interface-Universal-PSU-inc-USB-Connection/';
p.stores.zzounds='https://www.zzounds.com/item--NEMMT48';
p.stores.reverb='https://reverb.com/marketplace?query=Neumann%20MT%2048';
p.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Neumann-MT-48/art-REC0017584-000';
p.title='Neumann MT 48 (U) Premium Audio Interface';
fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('done products 512');

// Update TEST_SHOP_BTN in build-guides.js
var bg=fs.readFileSync('build-guides.js','utf8');
var entry="  512: {prices:{amazon:\"$1,995.00\",zzounds:\"$1,995.00\",gear4music:\"£1,525.00\",andertons:\"£1,525.00\",musicstore:\"€1,812.00\"},urls:{gear4music:\"https://www.gear4music.com/Recording-and-Computers/Neumann-MT48-Premium-Audio-Interface/5E3S\",amazon:\"https://www.amazon.com/Neumann-MT-48-US-Connectivity/dp/B0BTGVGCJN\",andertons:\"https://www.andertons.co.uk/Neumann-MT-48-Audio-Interface-Universal-PSU-inc-USB-Connection/\"},oos:[\"zzounds\"]},";
if(bg.indexOf('512:')>=0){
  bg=bg.replace(/512:\s*\{[^}]+\},?/, entry);
  console.log('replaced existing 512 entry');
} else {
  // insert after 146 entry
  bg=bg.replace(/(146:\s*\{[^}]+\},)/, '$1\n'+entry);
  console.log('inserted new 512 entry');
}
fs.writeFileSync('build-guides.js', bg);
console.log('done build-guides');
