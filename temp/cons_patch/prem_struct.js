var fs=require('fs');
var A=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
var g=null,i2=0;
for(var i=0;i<A.length;i++){if(String(A[i].slug||A[i].id||'')==='premium-interfaces'){g=A[i];i2=i;break;}}
var O=['premium idx='+i2+' title='+JSON.stringify(g.title)];
O.push('ALL KEYS: '+Object.keys(g).join(' | '));
function probeArr(v,base,seen){
  if(!Array.isArray(v))return;if(!v.length)return;
  var sample=v[0];
  if(sample&&typeof sample==='object'){
    var sks=Object.keys(sample);
    var hasImg=sks.some(function(k){return /image|img|photo|pic/i.test(k);});
    var hasName=sks.some(function(k){return /name|title|product|model/i.test(k);});
    if(hasName||hasImg){
      O.push(base+' ARRAY['+v.length+'] sample keys=['+sks.join(',')+']');
      v.slice(0,12).forEach(function(p,pi){
        var nm=String(p.name||p.title||p.productName||'');
        var imgs=sks.filter(function(k){return /image|img|photo|pic/i.test(k)&&p[k]!==undefined;}).map(function(k){return k+'='+String(p[k]).slice(0,80);});
        O.push('   ['+pi+'] '+JSON.stringify(nm)+' | imgs: '+(imgs.length?imgs.join(' ; '):'(none)'));
      });
    }
  }
}
function scan(o,base){
  if(!o||typeof o!=='object')return;
  if(Array.isArray(o)){probeArr(o,base);o.forEach(function(v){scan(v,base);});return;}
  Object.keys(o).forEach(function(k){var v=o[k];if(v&&typeof v==='object')scan(v,base+'.'+k);});
}
scan(g,'');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/prem_struct.txt',O.join('\n'),'utf8');
console.log('wrote '+O.length);
