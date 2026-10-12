var fs=require('fs');
var files=fs.readdirSync('guides').filter(function(f){return /\.html$/.test(f)});
var july=0, oct=0, bad=[];
files.forEach(function(f){
  var h=fs.readFileSync('guides/'+f,'utf8');
  var m=h.match(/guide-author-box-name">([^<]*)/);
  if(!m){ bad.push(f+':NO-BYLINE'); return; }
  var t=m[1];
  if(/October 2026|Octubre 2026/.test(t)){ oct++; }
  else { july++; if(bad.length<10) bad.push(f+':['+t+']'); }
});
console.log('files: '+files.length+' october: '+oct+' other: '+july);
console.log(bad.join('\n'));
var gho=fs.readFileSync('guides/best-guitar-home-office.html','utf8');
var ghoes=fs.readFileSync('guides/best-guitar-home-office_es.html','utf8');
console.log('EN title: '+gho.match(/<title>[\s\S]*?<\/title>/)[0]);
console.log('ES title: '+ghoes.match(/<title>[\s\S]*?<\/title>/)[0]);
