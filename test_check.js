const fs=require('fs');
const txt=fs.readFileSync('guides/best-digital-pianos.html','utf8');
const re=/href="https:\/\/andertonsmusiccompany\.pxf\.io\/[^"]*\?[^"]*u=/;
console.log('andertons', re.test(txt));
const re2=/href="https:\/\/www\.awin1\.com\/cread\.php\?[^"]*ued=/;
console.log('awin', re2.test(txt));
const re3=/href="https:\/\/www\.anrdoezrs\.net\/click-[^"]*\?[^"]*url=/;
console.log('cj', re3.test(txt));
