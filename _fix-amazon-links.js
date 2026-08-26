var p=JSON.parse(require('fs').readFileSync('data/products.json','utf8'));

// 270 Donner HUSH-I EVO2 - Amazon B0G1BVR8ZM (Black) correct
var p270=p.find(function(x){return x.id===270});
p270.stores.amazon='https://www.amazon.com/dp/B0G1BVR8ZM';

// 272 Yamaha SLG200S - Amazon B00XPHLJAK (TBS) correct
var p272=p.find(function(x){return x.id===272});
p272.stores.amazon='https://www.amazon.com/dp/B00XPHLJAK';

// 273 Yamaha SLG200N - Amazon B00XPHMIFA (TBS) correct
var p273=p.find(function(x){return x.id===273});
p273.stores.amazon='https://www.amazon.com/dp/B00XPHMIFA';

// 274 Traveler Ultra-Light Steel - Amazon B00LJP7H3I (Black) correct
var p274=p.find(function(x){return x.id===274});
p274.stores.amazon='https://www.amazon.com/dp/B00LJP7H3I';

// 275 Traveler Ultra-Light Nylon - Amazon B07XLZMDBZ (Mahogany) correct
var p275=p.find(function(x){return x.id===275});
p275.stores.amazon='https://www.amazon.com/dp/B07XLZMDBZ';

// 295 Enya Nova Go Sonic - Amazon B0CTTDFCWR (Black) correct
var p295=p.find(function(x){return x.id===295});
p295.stores.amazon='https://www.amazon.com/dp/B0CTTDFCWR';

// 296 Lava ME 4 - Amazon B0CDLXWMNL (36" Space Gray) correct
var p296=p.find(function(x){return x.id===296});
p296.stores.amazon='https://www.amazon.com/dp/B0CDLXWMNL';

require('fs').writeFileSync('data/products.json',JSON.stringify(p,null,2));

// Verify
[270,272,273,274,275,295,296].forEach(function(id){
  var prod=p.find(function(x){return x.id===id});
  console.log(id, prod.title);
  console.log('  amazon:', prod.stores.amazon);
});
