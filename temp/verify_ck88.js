var fs=require('fs');
var h=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
var ck=h.lastIndexOf('Yamaha CK88');
var seg=h.slice(ck,ck+14000);
var rows=seg.match(/data-store=\\?"(\w+)\\?"[^>]*data-price=\\?'([^']*)\\?'/g) || seg.match(/data-store="(\w+)"[\s\S]{0,1500}?data-price='([^']*)'/g);
console.log('--- CK88 card store rows ---');
var re=/data-store="(\w+)"[\s\S]{0,2000}?data-price='([^']*)'/g, m, seen={};
while((m=re.exec(seg)) && Object.keys(seen).length<8){ if(!seen[m[1]]){ seen[m[1]]=m[2]; console.log(m[1]+' => '+m[2]); } if(m.index>9000) break; }
