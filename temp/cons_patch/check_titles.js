var fs=require('fs');
function get(f){
  var h=fs.readFileSync(f,'utf8');
  var t=h.match(/<title>([\s\S]*?)<\/title>/);
  var h1=h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  console.log(f);
  console.log(' TITLE:', t?t[1].slice(0,120):'none');
  console.log(' H1:', h1?h1[1].replace(/<[^>]+>/g,'').slice(0,150):'none');
}
get('guides/premium-interfaces.html');
get('guides/premium-interfaces_es.html');
