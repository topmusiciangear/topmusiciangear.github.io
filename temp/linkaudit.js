var fs=require('fs');
var path=require('path');
var roots=['data','js','css','.'];
var skipDirs=['node_modules','.git','guides','temp','cache','logs'];
var hits=[];
function walk(dir){
  var es=fs.readdirSync(dir);
  es.forEach(function(e){
    if(e==='.git'||e==='node_modules') return;
    var f=path.join(dir,e);
    var st=fs.statSync(f);
    if(st.isDirectory()){ if(skipDirs.indexOf(e)>-1) return; walk(f); return; }
    if(!/\.(json|js|html|txt|xml|md)$/.test(f)) return;
    if(f.indexOf('guides.json.bak')>-1) return;
    var t=fs.readFileSync(f,'utf8');
    var idx=0;
    while((idx=t.indexOf('midi-keyboards',idx))>-1){
      hits.push(f+' :: '+JSON.stringify(t.slice(Math.max(0,idx-120),idx+120)));
      idx+=14;
      if(hits.length>60) return;
    }
  });
}
roots.forEach(function(r){ try{walk(r)}catch(e){} });
hits.forEach(function(h){console.log(h)});
console.log('TOTAL: '+hits.length);
