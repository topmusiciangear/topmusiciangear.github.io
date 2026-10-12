var fs=require('fs');
var en=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
var ai=en.lastIndexOf('Korg-Grandstage-X-Stage-Piano');
var seg=en.slice(ai,ai+2200);
var m=seg.match(/shop-price' data-price='([^']*)'>(.*?)<\/span><\/span><\/a>/);
console.log('ANDERTONS ROW PRICE: '+JSON.stringify(m&&m[0].slice(0,200)));
console.log('Agotado in segment: '+(seg.indexOf('Agotado')>-1));
