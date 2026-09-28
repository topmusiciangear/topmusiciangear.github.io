var fs=require('fs');
var A=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
var MAP={
 'Neumann MT 48':'https://r2.gear4music.com/media/91/914604/1200/preview.jpg',
 'Universal Audio Apollo x8p Gen 2':'https://r2.gear4music.com/media/113/1138813/1200/preview.jpg',
 'Apogee Symphony I/O Mk II 16x16':'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/2550/9078/102768-APOGEE-SYMPHONY-IO-MkII-FRONT-VIEW__05827.1714742907.jpg?c=1',
 'Audient ORIA':'https://r2.gear4music.com/media/103/1036441/1200/preview.jpg'
};
var O=[];
function hasPhoto(url){return url&&/^https?:/.test(String(url));}
var anyApp=false;
A.forEach(function(g,gi){
 if(String(g.slug||g.id||'')!=='premium-interfaces')return;
 O.push('guide premium idx='+gi+' title='+JSON.stringify(g.title)+' | keys: '+Object.keys(g).join('|'));
 var prods=g.products||[];
 O.push('  products: '+prods.length);
 prods.forEach(function(p,pi){
   var nm=String(p.name||'');
   var en=p.image||'';
   var es=p.image_es===undefined?'':String(p.image_es);
   O.push('    ['+pi+'] '+JSON.stringify(nm)+' | img='+JSON.stringify(en)+' | img_es='+JSON.stringify(es));
   var key=null;
   Object.keys(MAP).forEach(function(k){if(nm.indexOf(k)>=0)key=k;});
   if(!key)return;
   var url=MAP[key];
   O.push('       => MATCH '+key+' -> SET '+url);
   p.image=url;
   if(p.image_es!==undefined)p.image_es=url;
   if(hasPhoto(en)!==url||en!==url)anyApp=true;
   O.push('       NEW img='+JSON.stringify(p.image)+' img_es='+JSON.stringify(p.image_es));
 });
});
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json',JSON.stringify(A,null,2),'utf8');
O.push('\nanApplied='+anyApp);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/img_patch_out.txt',O.join('\n'),'utf8');
console.log('done lines='+O.length);
