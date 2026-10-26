const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const c=fs.readFileSync(B+'js/guide-scores.js','utf8');
const s=c.indexOf(' "best-keyboard": {');
const e=c.indexOf(' },', s)+3;
console.log(c.slice(s,e));