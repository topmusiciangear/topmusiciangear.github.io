var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find body content
var bodyIdx=h.indexOf('<body');
if(bodyIdx>=0){
  var body=h.substring(bodyIdx);
  // Find first 2000 chars of body
  console.log('Body start:');
  console.log(body.substring(0,2000));
}
