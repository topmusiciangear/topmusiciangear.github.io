var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='studio-furniture'});
function show(o,path){
  if(typeof o==='string'){
    ['spike','punta','165.99'].forEach(function(w){
      var i=o.indexOf(w);
      if(i>-1) console.log(path+': ...'+o.slice(Math.max(0,i-100),i+120).replace(/\n/g,' ')+'...');
    });
    return;
  }
  if(Array.isArray(o)){o.forEach(function(v,i){show(v,path+'['+i+']')});return;}
  if(o&&typeof o==='object'){Object.keys(o).forEach(function(k){show(o[k],path+'.'+k)});}
}
show(g,'studio-furniture');
