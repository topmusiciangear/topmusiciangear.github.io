const fs=require('fs');
const c=fs.readFileSync('build-guides.js','utf8');
const start=c.indexOf('const TEST_SHOP_BTN = {');
const ob=c.indexOf('{', start);
let depth=0, end=-1;
for(let i=ob;i<c.length;i++){ if(c[i]==='{')depth++; else if(c[i]==='}'){depth--; if(depth===0){end=i;break;}} }
console.log('object ends at', end);
const pre=c.slice(0,start).split('\n').slice(-3).join('\n');
console.log('CONTEXT BEFORE OBJ:\n', pre);
console.log('TAIL:\n', JSON.stringify(c.slice(end-160, end+20)));
