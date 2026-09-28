var fs=require('fs');
var s=fs.readFileSync('deals.html','utf8');
var startIdx = s.indexOf('<div class="deals-stores">');
var endIdx = s.indexOf('</div>', startIdx);
while(endIdx>=0){
  var nextOpen = s.indexOf('<div class="deals-stores">', endIdx+1);
  var nextClose = s.indexOf('</div>', endIdx+1);
  if(nextOpen<0 || nextClose<nextOpen){
    break;
  }
  endIdx = nextClose;
}
var before = s.slice(0, endIdx);
var after = s.slice(endIdx);
var hollyland = '<a href="https://www.hollyland.com/" target="_blank" rel="noopener noreferrer sponsored" class="deals-store" style="--store-color:#1e40af"><img src="img/hollyland-icon.png" alt="Hollyland" width="20" height="20"><span>Hollyland</span></a>';
var newS = before + hollyland + after;
fs.writeFileSync('deals.html', newS, 'utf8');
console.log('deals.html updated with Hollyland');