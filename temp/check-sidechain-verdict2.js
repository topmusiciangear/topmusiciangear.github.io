var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
var verdictIdx=h.indexOf('verdict');
if(verdictIdx>=0){
  console.log('Verdict section:');
  console.log(h.substring(verdictIdx,verdictIdx+3000));
}
