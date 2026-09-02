var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find hero section
var heroIdx=h.indexOf('bg-hero');
if(heroIdx<0)heroIdx=h.indexOf('hero');
if(heroIdx>=0){
  console.log('Hero section:');
  console.log(h.substring(heroIdx,heroIdx+1000));
}
// Find og:image
var ogIdx=h.indexOf('og:image');
if(ogIdx>=0){
  console.log('\nOG Image:');
  console.log(h.substring(ogIdx-50,ogIdx+200));
}
