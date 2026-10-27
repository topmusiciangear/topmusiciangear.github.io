const fs=require('fs');
const txt=fs.readFileSync('guides/best-mic-for-podcasting.html','utf8');
const idx=txt.indexOf('href="https://www.awin1.com/cread.php?');
console.log(txt.slice(idx, idx+150));
