var fs=require('fs');
var path=require('path');
var idx=path.join(__dirname,'index.html');
var ver=path.join(__dirname,'version.txt');
var t=Math.random().toString(36).slice(2,10);
var h=fs.readFileSync(idx,'utf8');
var jsVer=(h.match(/app\.min\.js\?v=([a-z0-9]+)/)||[])[1];
['index.html','es/index.html','about.html'].forEach(function(rel){
  var p=path.join(__dirname,rel);
  if(!fs.existsSync(p)) return;
  var c=fs.readFileSync(p,'utf8');
  c=c.replace(/app\.min\.js\?v=[a-z0-9]+/g,'app.min.js?v='+t);
  c=c.replace(/shop-buttons\.js\?v=[a-z0-9]+/g,'shop-buttons.js?v='+t);
  c=c.replace(/style\.min\.css\?v=[a-z0-9]+/g,'style.min.css?v='+t);
  fs.writeFileSync(p,c);
});
fs.writeFileSync(ver,t);
console.log('Version updated to: '+t+(jsVer?' (was '+jsVer+')':''));
