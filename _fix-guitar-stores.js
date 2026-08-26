var p=JSON.parse(require('fs').readFileSync('data/products.json','utf8'));

// 270 Donner HUSH-I EVO2 - remove musicstore (Not Available)
var p270=p.find(function(x){return x.id===270});
p270.price=219.99;
delete p270.stores.musicstore;

// 272 Yamaha SLG200S - remove gear4music, musicstore (Not Available)
var p272=p.find(function(x){return x.id===272});
p272.price=879.99;
delete p272.stores.gear4music;
delete p272.stores.musicstore;

// 273 Yamaha SLG200N - remove gear4music, musicstore (Not Available)
var p273=p.find(function(x){return x.id===273});
p273.price=879.99;
delete p273.stores.gear4music;
delete p273.stores.musicstore;

// 274 Traveler Guitar Ultra-Light Steel - remove gear4music, musicstore (Not Available)
var p274=p.find(function(x){return x.id===274});
p274.price=239.99;
delete p274.stores.gear4music;
delete p274.stores.musicstore;

// 275 Traveler Guitar Ultra-Light Nylon - remove gear4music, musicstore (Not Available)
var p275=p.find(function(x){return x.id===275});
p275.price=329.99;
delete p275.stores.gear4music;
delete p275.stores.musicstore;

// 295 Enya Nova Go Sonic - remove musicstore (Not Available)
var p295=p.find(function(x){return x.id===295});
p295.price=295.99;
delete p295.stores.musicstore;

// 296 Lava Music Lava ME 4 - remove musicstore (Not Available)
var p296=p.find(function(x){return x.id===296});
p296.price=699;
delete p296.stores.musicstore;

require('fs').writeFileSync('data/products.json',JSON.stringify(p,null,2));
console.log('done');
