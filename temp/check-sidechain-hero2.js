var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find hero content
var heroIdx=h.indexOf('hero-inner');
if(heroIdx>=0){
  console.log('Hero inner content:');
  console.log(h.substring(heroIdx,heroIdx+2000));
}
