const fs=require('fs');
const txt=fs.readFileSync('guides/best-digital-pianos.html','utf8');
const re=/href="https:\/\/www\.awin1\.com\/cread\.php\?[^"]*"[^>]*>/g;
let m;
while(m=re.exec(txt)){
  console.log(m[0].slice(0,300));
}
