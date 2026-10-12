var fs=require('fs');
['guides/slg200s-vs-gs-mini.html','guides/slg200s-vs-gs-mini_es.html'].forEach(function(f){
  console.log(f+' => '+fs.readFileSync(f,'utf8').match(/<title>[\s\S]*?<\/title>/)[0]);
});
