var fs=require('fs');
['guides/best-guitar-home-office.html','guides/best-guitar-home-office_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  var m=h.match(/<title>[\s\S]*?<\/title>/);
  console.log(f+' => '+m[0]);
});
