const fs=require('fs');
const txt=fs.readFileSync('guides/best-digital-pianos.html','utf8');
const idx=124876;
console.log(txt.slice(idx-200, idx+400));
