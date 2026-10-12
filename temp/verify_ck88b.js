var fs=require('fs');
var h=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
var ck=h.lastIndexOf('Yamaha CK88');
var seg=h.slice(ck,ck+20000);
var i=seg.indexOf('data-store="musicstore"');
console.log('MS row found: '+(i>-1));
if(i>-1) console.log(JSON.stringify(seg.slice(i,i+1500)).slice(0,700));
var z=seg.indexOf('data-store="zzounds"');
if(z>-1){ var m=seg.slice(z,z+1500).match(/data-price='([^']*)'/); console.log('zzounds price: '+(m&&m[1])); }
