var fs=require('fs');
var s=fs.readFileSync('guides/best-interface.html','utf8');
// Find all Amazon in shop-more-list sections
var idx=s.indexOf('shop-more-list');
while(idx>=0){
  var next=s.indexOf('shop-more-list', idx+1);
  if(next<0) next=s.length;
  var section=s.slice(idx, next);
  var idx2=section.indexOf('data-store="amazon"');
  if(idx2>=0){
    console.log('=== FOUND Amazon in dropdown ===');
    console.log(section.slice(section.indexOf('data-store="amazon"'), 500));
    console.log('---');
  }
  idx=next;
}