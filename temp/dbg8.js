var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
// find product card containing e906 image
var imgIdx=en.indexOf('e_906_product_shot');
console.log('img at '+imgIdx);
var cardStart=en.lastIndexOf('guide-product-card', imgIdx);
console.log(en.slice(cardStart-50, imgIdx+2200).replace(/\n/g,' ').slice(0,2800));
