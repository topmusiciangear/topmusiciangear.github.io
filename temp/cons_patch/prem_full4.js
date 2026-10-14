var fs=require('fs');
var A=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
var g=null;A.forEach(function(x){if(String(x.slug||x.id||'')==='premium-interfaces')g=x;});
var O=['premium found: '+(g?'YES':'NO')];
if(g){
  O.push('top keys: '+Object.keys(g).join('|'));
  function scan(o,path){
    if(!o||typeof o!=='object')return;
    if(Array.isArray(o)){
      o.forEach(function(v,vi){scan(v,path+'['+vi+']');});
      return;
    }
    var nm=String(o.name||o.title||o.productName||'');
    var hasImg=o.image!==undefined||o.imageUrl!==undefined||o.img!==undefined||o.image_es!==undefined;
    if(Array.isArray(o.products)){O.push(path+'.products[] len='+o.products.length);scan(o.products,path+'.products');}
    if(hasImg||nm){
      var imKey=null;
      if(o.image!==undefined)imKey='image';
      else if(o.imageUrl!==undefined)imKey='imageUrl';
      else if(o.img!==undefined)imKey='img';
      O.push(path+' NAME='+JSON.stringify(nm)+(imKey?' | '+imKey+'='+JSON.stringify(o[imKey]):'')+' | hasImage_es='+(o.image_es!==undefined?'YES':'no'));
    }
    Object.keys(o).forEach(function(k){var v=o[k];if(v&&typeof v==='object')scan(v,path+'.'+k);});
  }
  scan(g,'g');
}
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/prem_full4.txt',O.join('\n'),'utf8');
console.log('wrote '+O.length);
