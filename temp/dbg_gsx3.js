var fs=require('fs');
var en=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
// Grandstage MS row: find musicstore link with Wooden-stand, then its price span
var mi=en.indexOf('Wooden-stand');
console.log('MS ROW: '+JSON.stringify(en.slice(mi,mi+700)));
// Grandstage Andertons row price: find Korg-Grandstage-X-Stage-Piano href (dropdown), then price
var ai=en.lastIndexOf('Korg-Grandstage-X-Stage-Piano');
console.log('AND ROW: '+JSON.stringify(en.slice(ai,ai+700)));
