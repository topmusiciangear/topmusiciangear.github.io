var fs=require('fs');
var files=['sidechain-modulation-plugins','sidechain-modulation-plugins_es','beatmaker-plugins','beatmaker-plugins_es'];
files.forEach(function(f){
  var html=fs.readFileSync('guides/'+f+'.html','utf8');
  var imgCount=(html.match(/<img /g)||[]).length;
  var naCount=(html.match(/No disponible/g)||[]).length;
  var brokenHref=html.indexOf('href="undefined"')>=0;
  var hasIA=/[^A-Z]iA[^A-Z]/.test(html);
  console.log(f+':');
  console.log('  Images:',imgCount);
  console.log('  NA rows:',naCount);
  console.log('  Broken hrefs:',brokenHref);
  console.log('  iA found:',hasIA);
});
