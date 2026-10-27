const fs=require('fs');
const txt=fs.readFileSync('guides/best-mic-for-podcasting.html','utf8');
console.log(txt.includes('href="https://www.awin1.com/cread.php?'));
