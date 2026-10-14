var fs=require('fs');
var P='data/products.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var list=Array.isArray(A)?A:A.products;
var n=list.find(x=>x.id===512);
n.img='https://r2.gear4music.com/media/91/914607/1200/preview.jpg';
n.stores.gear4music='https://www.gear4music.com/Recording-and-Computers/Neumann-MT48-Premium-Audio-Interface/5E3S';
n.stores.amazon='https://www.amazon.com/dp/B0BTGVGCJN';
n.stores.zzounds='https://www.zzounds.com/item--NEMMT48';
n.stores.andertons='https://www.andertons.co.uk/Neumann-MT-48-Audio-Interface-Universal-PSU-inc-USB-Connection/';
n.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Neumann-MT-48/art-REC0017584-000';
n.stores.reverb='https://reverb.com/marketplace?query=Neumann%20MT%2048';
var o=list.find(x=>x.id===515);
o.img='https://r2.gear4music.com/media/103/1036441/1200/preview.jpg';
o.stores.gear4music='https://www.gear4music.com/Recording-and-Computers/Audient-ORIA-Interface-and-Immersive-Monitor-Controller-for-Dolby-Atmos/66Y3';
o.stores.amazon='https://www.amazon.com/s?k=Audient+ORIA&tag=topmusicg-20';
o.stores.zzounds='https://www.zzounds.com/item--ADIORIA';
o.stores.andertons='https://www.andertons.co.uk/audient-oria-usb-interface/';
o.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Audient-ORIA/art-PCM0017489-000';
o.stores.reverb='https://reverb.com/marketplace?query=Audient%20ORIA';
fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('products fixed');

// fix build prices - ensure exact match
var bg=fs.readFileSync('build-guides.js','utf8');
function repl(id, entry){
  var re=new RegExp('  '+id+':\\s*\\{[\\s\\S]*?\\},\\n');
  if(re.test(bg)){
    bg=bg.replace(re, entry+'\n');
    console.log('replaced '+id);
  } else {
    bg=bg.split('  152:').join(entry+'\n  152:');
    console.log('inserted '+id);
  }
}
repl('512','  512: {prices:{amazon:"$1,995.00",zzounds:"$1,995.00",gear4music:"£1,525.00",andertons:"£1,525.00",musicstore:"€1,812.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Neumann-MT48-Premium-Audio-Interface/5E3S",amazon:"https://www.amazon.com/dp/B0BTGVGCJN",andertons:"https://www.andertons.co.uk/Neumann-MT-48-Audio-Interface-Universal-PSU-inc-USB-Connection/",zzounds:"https://www.zzounds.com/item--NEMMT48"},oos:["zzounds"]},');
repl('515','  515: {prices:{amazon:"$3,499.99",zzounds:"$3,499.99",gear4music:"£2,454.00",andertons:"£2,200.00",musicstore:"€2,885.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Audient-ORIA-Interface-and-Immersive-Monitor-Controller-for-Dolby-Atmos/66Y3",andertons:"https://www.andertons.co.uk/audient-oria-usb-interface/",amazon:"https://www.amazon.com/s?k=Audient+ORIA&tag=topmusicg-20",zzounds:"https://www.zzounds.com/item--ADIORIA"},oos:[]},');
fs.writeFileSync('build-guides.js', bg);
console.log('build fixed');
