const fs=require('fs');
const file='C:\\Users\\Daniel\\projects\\topmusiciangear\\js\\guide-scores.js';
let txt=fs.readFileSync(file,'utf8');
txt=txt.replace(/"TC Electronic PolyTune Clip":/g,'"TC Electronic Polytune Clip":');
fs.writeFileSync(file,txt);
console.log('fixed');
