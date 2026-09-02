var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
var bodyIdx=h.indexOf('<body');
var body=h.substring(bodyIdx);
// Find verdict class in HTML
var idx=0;
var verdicts=[];
while(true){
  idx=body.indexOf('class="verdict',idx);
  if(idx<0)break;
  verdicts.push(idx);
  idx++;
}
console.log('Verdict sections found:',verdicts.length);
if(verdicts.length>0){
  console.log('\nFirst verdict:');
  console.log(body.substring(verdicts[0],verdicts[0]+2000));
}
