const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
let raw=fs.readFileSync(B+'data/products_original.json','utf16le');
if(raw.charCodeAt(0)===0xFEFF) raw=raw.slice(1);
const orig=JSON.parse(raw);
function firstSentence(s){
  s=s.trim();
  const idx=Math.max(s.indexOf('.'), s.indexOf('!'), s.indexOf('?'));
  if(idx>0 && idx<s.length-1) return s.slice(0,idx+1);
  return s;
}
const lens=orig.map(p=>firstSentence(p.desc||'').length);
console.log('max first sentence EN:', Math.max(...lens));
console.log('min:', Math.min(...lens));
const long=orig.filter(p=>firstSentence(p.desc||'').length>160);
console.log('products with first sentence >160:', long.length);
for(const p of long.slice(0,10)) console.log(p.id, p.title, firstSentence(p.desc).length);