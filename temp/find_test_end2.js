const fs=require('fs');
const txt=fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\build-guides.js','utf8');
const start=txt.indexOf('const TEST_SHOP_BTN = {');
const end=txt.indexOf('};', start);
const snippet=txt.substring(end-500, end+100);
console.log(snippet);
