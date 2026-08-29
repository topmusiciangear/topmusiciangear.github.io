const fs=require('fs');
const file='C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let c=fs.readFileSync(file,'utf8');
const stores='(gear4music|zzounds|reverb|amazon|andertons|musicstore|pluginboutique)';
c=c.replace(new RegExp('(prices: \\{)'+stores+'(\\s*:)','g'),'$1 $2$3');
c=c.replace(new RegExp(',\\s{2,}'+stores+'\\s*:','g'),', $1:');
fs.writeFileSync(file,c,'utf8');
console.log('normalized');
