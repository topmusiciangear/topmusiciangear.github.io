var fs=require('fs');
var s=fs.readFileSync('guides/best-interface.html','utf8');
var idx=s.indexOf('data-store="amazon"');
while(idx>=0){
  console.log('Amazon at:', idx, s.slice(idx, idx+800));
  idx=s.indexOf('data-store="amazon"', idx+1);
}