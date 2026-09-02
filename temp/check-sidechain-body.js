var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find the body tag and extract content
var bodyStart=h.indexOf('<body');
var bodyEnd=h.indexOf('</body>');
if(bodyStart>=0 && bodyEnd>=0){
  var body=h.substring(bodyStart,bodyEnd);
  // Find hero section
  var heroIdx=body.indexOf('hero-inner');
  if(heroIdx>=0){
    console.log('Hero HTML:');
    console.log(body.substring(heroIdx,heroIdx+1500));
  }
}
