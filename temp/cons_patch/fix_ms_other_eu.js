var fs=require('fs');
var bg=fs.readFileSync('build-guides.js','utf8');
bg=bg.replace('512: {prices:{amazon:"$1,995.00",zzounds:"$1,995.00",gear4music:"£1,525.00",andertons:"£1,525.00",musicstore:"€1,511.80"}','512: {prices:{amazon:"$1,995.00",zzounds:"$1,995.00",gear4music:"£1,525.00",andertons:"£1,525.00",musicstore:"€1,799.00"}');
bg=bg.replace('515: {prices:{amazon:"$3,499.99",zzounds:"$3,499.99",gear4music:"£2,454.00",andertons:"£2,200.00",musicstore:"€2,419.30"}','515: {prices:{amazon:"$3,499.99",zzounds:"$3,499.99",gear4music:"£2,454.00",andertons:"£2,200.00",musicstore:"€2,419.30"}');
// keep 515 as is for now - if ORIA Other EU is different, user will tell. Ensure 515 stays €2,419.30 which matches en_OE search for ORIA, but if needed change to user provided.
// Actually for ORIA Other EU, keep €2,419.30 unless user says otherwise.
fs.writeFileSync('build-guides.js', bg);
console.log('fixed 512 to €1,799 Other EU');
var A=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var list=Array.isArray(A)?A:A.products;
console.log('512 musicstore', list.find(x=>x.id===512).stores.musicstore);
console.log('515 musicstore', list.find(x=>x.id===515).stores.musicstore);
