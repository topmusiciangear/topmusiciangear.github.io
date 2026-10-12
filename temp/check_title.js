var fs=require('fs');
var h=fs.readFileSync('guides/budget-usb-mics.html','utf8');
var m=h.match(/<title>[\s\S]*?<\/title>/);
console.log('TITLE: '+m[0]);
var og=h.match(/og:title[\s\S]{0,300}/);
console.log('OG: '+og[0].slice(0,300));
