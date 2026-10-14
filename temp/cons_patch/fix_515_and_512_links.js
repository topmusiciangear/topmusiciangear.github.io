var fs=require('fs');
var P='data/products.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var list=Array.isArray(A)?A:A.products;

// --- ORIA 515 ---
var o=list.find(x=>x.id===515);
console.log('ORIA before', o.img, Object.keys(o.stores||{}));
o.img='https://r2.gear4music.com/media/52/521064/1200/preview.jpg'; // matches uploaded rack shot
o.stores.gear4music='https://www.gear4music.com/Recording-and-Computers/Audient-ORIA-Interface-and-Immersive-Monitor-Controller-for-Dolby-Atmos/66Y3';
o.stores.amazon='https://www.amazon.com/s?k=Audient+ORIA&tag=topmusicg-20';
o.stores.zzounds='https://www.zzounds.com/item--ADIORIA';
o.stores.andertons='https://www.andertons.co.uk/audient-oria-usb-interface/';
o.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Audient-ORIA/art-PCM0017489-000';
o.stores.reverb='https://reverb.com/marketplace?query=Audient%20ORIA';
// ensure title matches uploaded description
o.title='Audient ORIA Immersive Audio Interface';
o.title_es='Audient ORIA Interfaz Inmersiva';

// --- Neumann 512 - ensure direct links ---
var n=list.find(x=>x.id===512);
console.log('Neumann before amazon', n.stores.amazon);
n.stores.amazon='https://www.amazon.com/dp/B0BTGVGCJN';
n.stores.zzounds='https://www.zzounds.com/item--NEMMT48';
n.stores.andertons='https://www.andertons.co.uk/Neumann-MT-48-Audio-Interface-Universal-PSU-inc-USB-Connection/';
n.stores.gear4music='https://www.gear4music.com/Recording-and-Computers/Neumann-MT48-Premium-Audio-Interface/5E3S';
n.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Neumann-MT-48/art-REC0017584-000';
n.stores.reverb='https://reverb.com/marketplace?query=Neumann%20MT%2048';

fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('products updated');

// --- TEST_SHOP_BTN ---
var bg=fs.readFileSync('build-guides.js','utf8');
var e512='  512: {prices:{amazon:"$1,995.00",zzounds:"$1,995.00",gear4music:"£1,525.00",andertons:"£1,525.00",musicstore:"€1,812.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Neumann-MT48-Premium-Audio-Interface/5E3S",amazon:"https://www.amazon.com/dp/B0BTGVGCJN",andertons:"https://www.andertons.co.uk/Neumann-MT-48-Audio-Interface-Universal-PSU-inc-USB-Connection/"},oos:["zzounds"]},';
var e515='  515: {prices:{amazon:"$3,499.99",zzounds:"$3,499.99",gear4music:"£2,454.00",andertons:"£2,200.00",musicstore:"€2,885.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Audient-ORIA-Interface-and-Immersive-Monitor-Controller-for-Dolby-Atmos/66Y3",andertons:"https://www.andertons.co.uk/audient-oria-usb-interface/",amazon:"https://www.amazon.com/s?k=Audient+ORIA&tag=topmusicg-20"},oos:[]},';
function upsert(id, entry){
  if(bg.indexOf('  '+id+':')>=0){
    var re=new RegExp('  '+id+':\\s*\\{[^]*?\\},\\n');
    bg=bg.replace(re, entry+'\n');
    console.log('replaced '+id);
  } else {
    bg=bg.split('  152:').join(entry+'\n  152:');
    console.log('inserted '+id);
  }
}
upsert('512', e512);
upsert('515', e515);
fs.writeFileSync('build-guides.js', bg);
console.log('build updated, has 512?', bg.indexOf('512:')>0, '515?', bg.indexOf('515:')>0);
