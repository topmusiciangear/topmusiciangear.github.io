var fs=require('fs');
var s=fs.readFileSync('affiliate-disclosure.html','utf8');
var idx = s.indexOf('<div class="partner"><strong>zZounds</strong>');
if(idx>=0){
  console.log('Found at:', idx);
  console.log('Context:', s.slice(idx, idx+150));
}