var fs=require('fs'),https=require('https'),http=require('http');
var h=fs.readFileSync('guides/premium-interfaces.html','utf8');
var re=/data-store="([a-z]+)"[^>]*data-aff="([^"]*)"[^>]*href="([^"]*)"/g;
var rows=[];var m;
while((m=re.exec(h))){ rows.push({store:m[1],aff:m[2].slice(0,60),href:m[3].slice(0,110)}); }
// dedupe by href
var seen={};var urls=[];
rows.forEach(r=>{ if(!seen[r.href]){seen[r.href]=1;urls.push(r);} });
console.log('total unique shop hrefs: '+urls.length);
function ck(i){
  if(i>=urls.length){console.log('DONE');return;}
  var u=urls[i];
  var lib=u.href.indexOf('https://')===0?https:http;
  try{
  lib.get(u.href,{headers:{'User-Agent':'Mozilla/5.0'}},function(r){
    var loc=r.headers.location||'';
    console.log(r.statusCode+' '+u.store+' '+u.href.slice(0,80)+(loc?' -> '+String(loc).slice(0,60):''));
    r.resume();r.on('end',function(){ck(i+1);});
  }).on('error',function(e){console.log('ERR '+u.store+' '+u.href.slice(0,80)+' '+e.message);ck(i+1);});
  }catch(e){console.log('EXC '+u.href);ck(i+1);}
}
ck(0);
