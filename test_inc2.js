const fs=require('fs');
const f='best-mic-for-podcasting.html';
const txt=fs.readFileSync('guides/'+f,'utf8');
console.log(txt.indexOf('href="https://www.awin1.com/cread.php?') !== -1);
