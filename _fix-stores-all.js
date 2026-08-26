var p=JSON.parse(require('fs').readFileSync('data/products.json','utf8'));

// 270 - add missing stores
var p270=p.find(function(x){return x.id===270});
p270.stores.zzounds=p270.stores.zzounds||'';
p270.stores.reverb=p270.stores.reverb||'';
p270.stores.gear4music=p270.stores.gear4music||'';
p270.stores.andertons=p270.stores.andertons||'';

// 272 - add missing stores
var p272=p.find(function(x){return x.id===272});
p272.stores.zzounds=p272.stores.zzounds||'';

// 273 - add missing stores
var p273=p.find(function(x){return x.id===273});
p273.stores.zzounds=p273.stores.zzounds||'';
p273.stores.reverb=p273.stores.reverb||'';

// 274 - add missing stores
var p274=p.find(function(x){return x.id===274});
p274.stores.zzounds=p274.stores.zzounds||'';
p274.stores.gear4music=p274.stores.gear4music||'';
p274.stores.andertons=p274.stores.andertons||'';
p274.stores.musicstore=p274.stores.musicstore||'';

// 275 - add missing stores
var p275=p.find(function(x){return x.id===275});
p275.stores.reverb=p275.stores.reverb||'';
p275.stores.gear4music=p275.stores.gear4music||'';
p275.stores.andertons=p275.stores.andertons||'';
p275.stores.musicstore=p275.stores.musicstore||'';

// 295 - add missing stores
var p295=p.find(function(x){return x.id===295});
p295.stores.zzounds=p295.stores.zzounds||'';
p295.stores.reverb=p295.stores.reverb||'';
p295.stores.gear4music=p295.stores.gear4music||'';
p295.stores.andertons=p295.stores.andertons||'';
p295.stores.musicstore=p295.stores.musicstore||'';

// 296 - add missing stores
var p296=p.find(function(x){return x.id===296});
p296.stores.zzounds=p296.stores.zzounds||'';
p296.stores.reverb=p296.stores.reverb||'';
p296.stores.gear4music=p296.stores.gear4music||'';
p296.stores.musicstore=p296.stores.musicstore||'';

require('fs').writeFileSync('data/products.json',JSON.stringify(p,null,2));

// Verify
[270,272,273,274,275,295,296].forEach(function(id){
  var prod=p.find(function(x){return x.id===id});
  console.log(id,prod.title,'$'+prod.price);
  Object.keys(prod.stores).forEach(function(s){
    console.log(' ',s,':',prod.stores[s]||'(empty)');
  });
});
