var fs=require('fs');
var f='C:/Users/Daniel/.local/share/opencode/tool-output/tool_134b87e44001LeK9VXnL6ALiQO';
var h=fs.readFileSync(f,'utf8');
var m=h.match(/og:image[^>]{0,300}/);
console.log('OG:',m&&m[0]);
var imgs={};
var re=/https:\/\/m\.media-amazon\.com\/images\/I\/([A-Za-z0-9+\-_%]+?)\._[^"'\s]*/g;
var x;var n=0;
while((x=re.exec(h))&&n<30){console.log(x[0].slice(0,120));n++;}