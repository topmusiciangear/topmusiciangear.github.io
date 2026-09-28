var fs=require('fs');
var s=fs.readFileSync('build-guides.js','utf8');
s=s.replace('515: {prices:{amazon:"$3,499.99",zzounds:"$3,499.99",gear4music:"£2,454.00",andertons:"£2,200.00",musicstore:"€2,419.30"}','515: {prices:{amazon:"$3,499.99",zzounds:"$3,499.99",gear4music:"£2,454.00",andertons:"£2,200.00",musicstore:"€3,239.00"}');
fs.writeFileSync('build-guides.js', s);
console.log('fixed 515 to 3239');
