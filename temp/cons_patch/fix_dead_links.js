var fs=require('fs');
// 1. products.json: remove dead/unverified store URLs
var P='data/products.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var list=Array.isArray(A)?A:A.products;
var a=list.find(x=>x.id===514);
delete a.stores.amazon; // B07QBQCJ8T = 404 dead
delete a.stores.zzounds; // APOSYM16X16SE = guessed, unverified (only 32x32 page confirmed)
delete a.stores.musicstore; // was search placeholder
delete a.stores.gear4music; // was search placeholder
var l=list.find(x=>x.id===516);
delete l.stores.amazon; // B08YDL9Y3M = 404 dead
delete l.stores.zzounds; // LYNAURORAN16USB = guessed, unverified (only old LYNAURORA16 confirmed, discontinued)
delete l.stores.musicstore; // was search placeholder
delete l.stores.gear4music; // was search placeholder
delete l.stores.andertons; // was search placeholder
fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('514 stores now:', Object.keys(a.stores).join(','));
console.log('516 stores now:', Object.keys(l.stores).join(','));

// 2. TEST_SHOP_BTN: 514 keep only verified Andertons; 516 remove (no verified prices); Apollo MS fix
var bg=fs.readFileSync('build-guides.js','utf8');
bg=bg.replace('  514: {prices:{amazon:"$5,995.00",andertons:"£5,015.00"},urls:{amazon:"https://www.amazon.com/dp/B07QBQCJ8T",andertons:"https://www.andertons.co.uk/apogee-symphony-i-o-mkii-thunderbolt-chassis-with-16x16-module/"},oos:[]},','  514: {prices:{andertons:"£5,015.00"},urls:{andertons:"https://www.andertons.co.uk/apogee-symphony-i-o-mkii-thunderbolt-chassis-with-16x16-module/"},oos:[]},');
bg=bg.replace('  516: {prices:{amazon:"$4,050.00"},urls:{amazon:"https://www.amazon.com/dp/B08YDL9Y3M"},oos:[]},','');
bg=bg.replace('musicstore:"€3,599.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Apollo-x8p-Gen-2-Essentialsand-Edition/6P0K"','musicstore:"€3,399.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Apollo-x8p-Gen-2-Essentialsand-Edition/6P0K"');
fs.writeFileSync('build-guides.js', bg);
console.log('has514', bg.indexOf('  514:')>=0, 'has516', bg.indexOf('  516:')>=0);
console.log('apollo MS now €3,399?', bg.indexOf('musicstore:"€3,399.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Apollo-x8p-Gen-2-Essentialsand-Edition/6P0K"')>=0);
