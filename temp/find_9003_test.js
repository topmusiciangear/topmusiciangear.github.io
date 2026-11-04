const fs=require('fs');
const txt=fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\build-guides.js','utf8');
const idx=txt.indexOf('9003:');
if(idx>-1){
  console.log(txt.substring(idx, idx+600));
} else {
  console.log('not found');
}
