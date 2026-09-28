var fs=require('fs');
var A=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
var MAP={
 'neumann mt 48':'https://r2.gear4music.com/media/91/914604/1200/preview.jpg',
 'universal audio apollo x8p':'https://r2.gear4music.com/media/113/1138813/1200/preview.jpg',
 'apogee symphony':'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/2550/9078/102768-APOGEE-SYMPHONY-IO-MkII-FRONT-VIEW__05827.1714742907.jpg?c=1',
 'audient oria':'https://r2.gear4music.com/media/103/1036441/1200/preview.jpg'
};
function low(s){return String(s||'').toLowerCase().replace(/\s+/g,' ').trim();}
function normImg(u){return String(u||'').replace(/\/1200\/preview\.jpg.*/,'').replace(/\/preview\.jpg.*/,'').replace(/media\/media/,'media');}
var O=[];var hits=0;var changed=0;
function walkProducts(list,where){
 if(!Array.isArray(list))return;
 list.forEach(function(p,pi){
   var name=String(p.name||p.title||p.productName||'');
   var key=null;Object.keys(MAP).forEach(function(k){if(low(name).indexOf(k)>=0)key=k;});
   if(!key)return;
   var img=p.image!==undefined?String(p.image):'';
   var img_es=p.image_es!==undefined?String(p.image_es):img;
   var curLow=low(img);
   var target=MAP[key];
   var same=curLow===low(target)||curLow===low(target).replace(/\?.*$/,'');
   O.push(where+'['+pi+'] '+JSON.stringify(name)+' prop='+((p.image!==undefined)?'has-image':(p.imageUrl!==undefined?'imageUrl':(p.img!==undefined?'img':'NOIMGKEY')))+' cur='+JSON.stringify(img)+' -> '+JSON.stringify(target)+(same?'  (SAME, skip)':''));
   hits++;
   if(same)return;
   p.image=target;if(p.image_es!==undefined)p.image_es=target;else if(p.imageUrl!==undefined)p.imageUrl=target;else if(p.img!==undefined)p.img=target;
   changed++;
   O.push('     *APPLIED* now='+JSON.stringify(p.image)+' es='+JSON.stringify(p.image_es));
 });
}
A.forEach(function(g,gi){
 var slug=String(g.slug||g.id||'');
 if(slug!=='premium-interfaces')return;
 O.push('## guide idx='+gi+' slug='+slug);
 Object.keys(g).forEach(function(k){
   var v=g[k];
   if(v&&typeof v==='object'){
     if(Array.isArray(v)&&v.length&&(v[0].name||v[0].title)&&(v[0].image!==undefined||v[0].imageUrl!==undefined||v[0].img!==undefined)){walkProducts(v,'  '+k);return;}
     if(v.columns&&Array.isArray(v.columns)){v.columns.forEach(function(c,ci){if(c&&(c.name||c.title)&&(c.image!==undefined||c.imageUrl!==undefined||c.img!==undefined)){walkProducts([c],'  '+k+'.columns');}});}
     if(v.products&&Array.isArray(v.products))walkProducts(v.products,'  '+k+'.products');
     if(v.items&&Array.isArray(v.items))walkProducts(v.items,'  '+k+'.items');
   }
 });
});
O.push('\nTOTAL matches='+hits+' | changed='+changed);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/img_fix_out.txt',O.join('\n'),'utf8');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json',JSON.stringify(A,null,2),'utf8');
console.log('done hits='+hits+' changed='+changed);
