var fs=require('fs'),https=require('https');
var h=fs.readFileSync('guides/premium-interfaces.html','utf8');
var re=/(data-store="(?:amazon|gear4music)"[^>]*href="([^"]*)"|href="([^"]*)"[^>]*data-store="(?:amazon|gear4music)")/g;
var urls={},m;
while((m=re.exec(h))){ var u=(m[2]||m[3]||'').replace(/&amp;/g,'&'); if(u) urls[u]=1; }
urls=Object.keys(urls);
console.log('amz/g4m hrefs: '+urls.length);
urls.forEach(u=>console.log(' ',u.slice(0,100)));
function ck(i){
  if(i>=urls.length){console.log('DONE');return;}
  https.get(urls[i],{headers:{'User-Agent':'Mozilla/5.0'}},function(r){
    console.log(r.statusCode+' '+urls[i].slice(0,90));
    r.resume();r.on('end',function(){ck(i+1);});
  }).on('error',function(e){console.log('ERR '+urls[i].slice(0,90));ck(i+1);});
}
ck(0);
