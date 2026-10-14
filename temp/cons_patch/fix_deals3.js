var fs=require('fs');
var s=fs.readFileSync('deals.html','utf8');
// Find the deals-stores div and its closing
var startIdx = s.indexOf('<div class="deals-stores">');
if(startIdx<0){ console.log('start not found'); process.exit(1); }
var endIdx = s.indexOf('</div>', startIdx);
while(endIdx>=0){
  var nextOpen = s.indexOf('<div class="deals-stores">', endIdx+1);
  var nextClose = s.indexOf('</div>', endIdx+1);
  if(nextOpen<0 || nextClose<nextOpen){
    // This is the closing of our div
    break;
  }
  endIdx = nextClose;
}
console.log('start:', startIdx, 'end:', endIdx);
var content = s.slice(startIdx, endIdx+6);
console.log('content:', content.slice(0, 500));
console.log('...');
console.log(content.slice(-500));