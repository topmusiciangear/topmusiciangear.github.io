var p=JSON.parse(require('fs').readFileSync('data/products.json','utf8'));

// Restore deleted stores with empty URLs so they show "Not Available"
var p270=p.find(function(x){return x.id===270});
p270.stores.musicstore='';

var p272=p.find(function(x){return x.id===272});
p272.stores.gear4music='';
p272.stores.musicstore='';

var p273=p.find(function(x){return x.id===273});
p273.stores.gear4music='';
p273.stores.musicstore='';

var p274=p.find(function(x){return x.id===274});
p274.stores.gear4music='';
p274.stores.musicstore='';

var p275=p.find(function(x){return x.id===275});
p275.stores.gear4music='';
p275.stores.musicstore='';

var p295=p.find(function(x){return x.id===295});
p295.stores.musicstore='';

var p296=p.find(function(x){return x.id===296});
p296.stores.musicstore='';

require('fs').writeFileSync('data/products.json',JSON.stringify(p,null,2));
console.log('done');
