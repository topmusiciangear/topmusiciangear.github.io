var fs=require('fs');
var bg=fs.readFileSync('build-guides.js','utf8');
var e514='  514: {prices:{amazon:"$5,995.00",zzounds:"$5,995.00",gear4music:"£5,015.00",andertons:"£5,015.00",musicstore:"€5,999.00"},urls:{amazon:"https://www.amazon.com/dp/B07QBQCJ8T",andertons:"https://www.andertons.co.uk/apogee-symphony-i-o-mkii-thunderbolt-chassis-with-16x16-module/",gear4music:"https://www.gear4music.com/search?q=Apogee%20Symphony%20I%2FO%20Mk%20II%2016x16"},oos:[]},';
var e516='  516: {prices:{amazon:"$4,050.00",zzounds:"$4,050.00",gear4music:"£3,849.00",andertons:"£3,849.00",musicstore:"€4,199.00"},urls:{amazon:"https://www.amazon.com/dp/B08YDL9Y3M",gear4music:"https://www.gear4music.com/search?q=Lynx%20Aurora-n%2016%20USB",andertons:"https://www.andertons.co.uk/search?search_query=Lynx%20Aurora-n%2016"},oos:[]},';
function upsert(id, entry){
  if(bg.indexOf('  '+id+':')>=0){
    var re=new RegExp('  '+id+':\\s*\\{[\\s\\S]*?\\},\\n');
    bg=bg.replace(re, entry+'\n');
    console.log('replaced '+id);
  } else {
    bg=bg.split('  515:').join(entry+'\n  515:');
    console.log('inserted '+id);
  }
}
upsert('514', e514);
upsert('516', e516);
fs.writeFileSync('build-guides.js', bg);
console.log('done');

// Also add store links to products.json for completeness
var P='data/products.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var list=Array.isArray(A)?A:A.products;
var a=list.find(x=>x.id===514);
a.stores.gear4music='https://www.gear4music.com/search?q=Apogee%20Symphony%20I%2FO%20Mk%20II%2016x16';
a.stores.andertons='https://www.andertons.co.uk/apogee-symphony-i-o-mkii-thunderbolt-chassis-with-16x16-module/';
a.stores.zzounds='https://www.zzounds.com/item--APOSYM16X16SE';
a.stores.musicstore='https://www.musicstore.com/en_OE/EUR/search?SearchText=Apogee%20Symphony%20I%2FO%20Mk%20II';
a.stores.reverb='https://reverb.com/marketplace?query=Apogee%20Symphony%20I%2FO%20Mk%20II%2016x16';
var l=list.find(x=>x.id===516);
l.stores.gear4music='https://www.gear4music.com/search?q=Lynx%20Aurora-n%2016%20USB';
l.stores.andertons='https://www.andertons.co.uk/search?search_query=Lynx%20Aurora-n%2016';
l.stores.zzounds='https://www.zzounds.com/item--LYNAURORAN16USB';
l.stores.musicstore='https://www.musicstore.com/en_OE/EUR/search?SearchText=Lynx%20Aurora-n%2016';
l.stores.reverb='https://reverb.com/marketplace?query=Lynx%20Aurora-n%2016';
fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('products stores updated');
