var fs=require('fs');
var P='data/products.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var list=Array.isArray(A)?A:A.products;
var l=list.find(x=>x.id===516);
l.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Lynx-Studio-Technology-Aurora-n-16-USB/art-REC0013406-000';
fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('516 MS direct set');

var bg=fs.readFileSync('build-guides.js','utf8');
// 514: Andertons is OutOfStock -> oos (keeps £5,015 + direct URL, clickable Agotado)
bg=bg.replace('  514: {prices:{andertons:"£5,015.00"},urls:{andertons:"https://www.andertons.co.uk/apogee-symphony-i-o-mkii-thunderbolt-chassis-with-16x16-module/"},oos:[]},','  514: {prices:{andertons:"£5,015.00"},urls:{andertons:"https://www.andertons.co.uk/apogee-symphony-i-o-mkii-thunderbolt-chassis-with-16x16-module/"},oos:["andertons"]},');
// 516: new entry, MusicStore direct (discontinued page opens) as clickable oos, no fake price
var e516='  516: {prices:{},urls:{musicstore:"https://www.musicstore.com/en_OE/EUR/Lynx-Studio-Technology-Aurora-n-16-USB/art-REC0013406-000"},oos:["musicstore"]},';
if(bg.indexOf('  516:')>=0){ console.log('516 already present?!'); }
else { bg=bg.split('  515:').join(e516+'\n  515:'); console.log('516 entry added'); }
fs.writeFileSync('build-guides.js', bg);
console.log('done');
