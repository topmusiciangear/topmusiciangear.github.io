var fs=require('fs');
var s=fs.readFileSync('guides/best-interface.html','utf8');
// Search for Amazon in dropdown rows (class contains deals-store or similar, not shop-btn-primary)
var regex=/<a[^>]*data-store="amazon"[^>]*>/g;
var match;
while((match=regex.exec(s))!==null){
  var start=match.index;
  var end=s.indexOf('</a>', start);
  if(end>=0){
    var snippet=s.slice(start, end+4);
    if(snippet.indexOf('shop-btn-primary')<0){
      console.log('=== DROPDOWN Amazon ===');
      console.log(s.slice(match.index, match.index+800));
      console.log('---');
    }
  }
}