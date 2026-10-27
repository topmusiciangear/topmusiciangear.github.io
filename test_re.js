const fs=require('fs');
const f='guides/best-digital-pianos.html';
const txt=fs.readFileSync(f,'utf8');
const pxf=/href="https:\/\/andertonsmusiccompany\.pxf\.io\/[^"]*\?[^"]*u=/;
const awin=/href="https:\/\/www\.awin1\.com\/cread\.php\?[^"]*ued=/;
const cj=/href="https:\/\/www\.anrdoezrs\.net\/click-[^"]*\?[^"]*url=/;
console.log('pxf',pxf.test(txt));
console.log('awin',awin.test(txt));
console.log('cj',cj.test(txt));
