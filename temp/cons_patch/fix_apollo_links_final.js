var fs=require('fs');
var P='data/products.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var p=A.find(x=>x.id===513);
p.stores.gear4music='https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Apollo-x8p-Gen-2-Essentialsand-Edition/6P0K';
p.stores.andertons='https://www.andertons.co.uk/apollo-x8p-gen-2-ess/';
p.stores.amazon='https://www.amazon.com/dp/B0DC12V1GS';
p.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Universal-Audio-Apollo-x8p-Gen2-Studio-/art-PCM0018210-000';
p.stores.zzounds='https://www.zzounds.com/item--UADX8PG2E';
p.stores.reverb='https://reverb.com/marketplace?query=Universal%20Audio%20Apollo%20x8p%20Gen%202';
fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('513 stores fixed');

var bg=fs.readFileSync('build-guides.js','utf8');
var entry='  513: {prices:{amazon:"$3,499.00",zzounds:"$3,499.00",gear4music:"£2,899.00",andertons:"£2,899.00",musicstore:"€3,599.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Apollo-x8p-Gen-2-Essentialsand-Edition/6P0K",andertons:"https://www.andertons.co.uk/apollo-x8p-gen-2-ess/",amazon:"https://www.amazon.com/dp/B0DC12V1GS",zzounds:"https://www.zzounds.com/item--UADX8PG2E",musicstore:"https://www.musicstore.com/en_OE/EUR/Universal-Audio-Apollo-x8p-Gen2-Studio-/art-PCM0018210-000"},oos:[]},';
bg=bg.replace(/  513:\s*\{[\s\S]*?\},\n/, entry+'\n');
fs.writeFileSync('build-guides.js', bg);
console.log('build 513 fixed');
