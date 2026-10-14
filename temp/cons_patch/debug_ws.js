var fs=require('fs');
var s=fs.readFileSync('affiliate-disclosure.html','utf8');
var idx = s.indexOf('<div class="partner"><strong>zZounds</strong>');
if(idx>=0){
  var context = s.slice(idx, idx+200);
  console.log('Context with char codes:');
  for(var i=0;i<context.length;i++){
    var c = context[i];
    var code = context.charCodeAt(i);
    if(code===10) console.log(i+': NL('+code+')');
    else if(code===32) console.log(i+': SP('+code+')');
    else if(code===9) console.log(i+': TAB('+code+')');
    else if(code===13) console.log(i+': CR('+code+')');
    else console.log(i+': '+c+'('+code+')');
  }
}