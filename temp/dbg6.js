var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
var sb=fs.readFileSync('js/shop-buttons.js','utf8');
console.log('shop-buttons.js has 634: '+(sb.indexOf('634:')>-1)+' 635: '+(sb.indexOf('635:')>-1)+' 636: '+(sb.indexOf('636:')>-1));
// find e906 buy button (primary) — search 'Buy at' near Sennheiser e906 card
var i=en.indexOf('data-pid="634"');
console.log('data-pid 634 at: '+i);
if(i>-1) console.log(en.slice(i,i+2500).replace(/\n/g,' ').slice(0,2500));
else {
  var j=en.indexOf('Sennheiser e906</div>');
  console.log('alt anchor: '+j);
}
