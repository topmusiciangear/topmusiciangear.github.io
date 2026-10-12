var fs=require('fs');
['guides/slg200s-vs-gs-mini.html','guides/slg200s-vs-gs-mini_es.html','guides/best-bass-home-office.html','guides/best-bass-home-office_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  console.log(f+' => '+h.match(/<title>[\s\S]*?<\/title>/)[0]);
});
