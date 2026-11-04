const fs=require('fs');
const txt=fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\products.json','utf8');
const idx=txt.indexOf('"id": 9003');
if(idx>-1){
  console.log('found at', idx);
  console.log(txt.substring(idx, idx+500));
} else {
  console.log('not found');
}
