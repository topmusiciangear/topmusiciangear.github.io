const fs=require('fs');
const txt=fs.readFileSync('guides/best-mic-for-podcasting.html','utf8');
const re=/href="https:\/\/www\.awin1\.com\/cread\.php\?[^"]*ued=/;
console.log(re.test(txt));
