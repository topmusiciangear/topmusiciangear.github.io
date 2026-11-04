const fs=require('fs');
const txt=fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\build-guides.js','utf8');
const start=txt.indexOf('const TEST_SHOP_BTN = {');
const end=txt.indexOf('};', start);
console.log('start', start, 'end', end);
console.log(txt.substring(end-200, end+200));
