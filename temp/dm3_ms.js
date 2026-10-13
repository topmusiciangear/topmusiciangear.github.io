var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
var old='  411: { prices: { amazon: "$1,799.99", zzounds: "$1,799.99", andertons: "£1,399.00", gear4music: "£1,447.00", musicstore: "€1,427.70" } },';
var nw='  411: { prices: { amazon: "$1,799.99", zzounds: "$1,799.99", andertons: "£1,399.00", gear4music: "£1,447.00", musicstore: "€1,699.00" } },';
if(src.indexOf(old)===-1){console.log('OLD 411 NOT FOUND');process.exit(1);}
src=src.replace(old,nw);
fs.writeFileSync(b,src);
console.log('411 musicstore -> 1699 DONE');