var p=JSON.parse(require('fs').readFileSync('data/products.json','utf8'));

// 270 Donner HUSH-I EVO2 - add zzounds, reverb, gear4music, andertons (all Not Available)
var p270=p.find(function(x){return x.id===270});
p270.stores.zzounds='';
p270.stores.reverb='';
p270.stores.gear4music='';
p270.stores.andertons='';

// 272 Yamaha SLG200S - add zzounds, gear4music, musicstore
var p272=p.find(function(x){return x.id===272});
p272.stores.zzounds='';
p272.stores.gear4music='https://www.gear4music.com/Guitar-and-Bass/Yamaha-SLG200S-Steel-String-Silent-Guitar/2B4W';
p272.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Yamaha-SLG200S-Silent-Guitar-Natural/art-GIT0025194-000';

// 273 Yamaha SLG200N - add zzounds, reverb, gear4music, musicstore
var p273=p.find(function(x){return x.id===273});
p273.stores.zzounds='';
p273.stores.reverb='';
p273.stores.gear4music='https://www.gear4music.com/Guitar-and-Bass/Yamaha-SLG200N-Nylon-String-Silent-Guitar/2B4X';
p273.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Yamaha-SLG200N-Silent-Guitar-Natural/art-GIT0025195-000';

// 274 Traveler Ultra-Light Steel - add zzounds, andertons, musicstore
var p274=p.find(function(x){return x.id===274});
p274.stores.zzounds='';
p274.stores.gear4music='https://www.gear4music.com/Guitar-and-Bass/Traveler-Ultra-Light-Acoustic-Steel-Maple/47KR';
p274.stores.andertons='';
p274.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Traveler-Guitar-Ultra-Light-Acoustic-Steel-Antique-Brown/art-GIT0038449-000';

// 275 Traveler Ultra-Light Nylon - add reverb, gear4music, andertons, musicstore
var p275=p.find(function(x){return x.id===275});
p275.stores.reverb='';
p275.stores.gear4music='https://www.gear4music.com/Guitar-and-Bass/Traveler-Ultra-Light-Nylon-Acoustic-Mahogany/47LD';
p275.stores.andertons='';
p275.stores.musicstore='https://www.musicstore.com/en_OE/EUR/Traveler-Guitar-Ultra-Light-Nylon-Mahogany-Natural/art-GIT0038450-000';

// 295 Enya Nova Go Sonic - add zzounds, reverb, gear4music, andertons, musicstore
var p295=p.find(function(x){return x.id===295});
p295.stores.zzounds='';
p295.stores.reverb='';
p295.stores.gear4music='';
p295.stores.andertons='';
p295.stores.musicstore='';

// 296 Lava ME 4 - add zzounds, reverb, gear4music, musicstore
var p296=p.find(function(x){return x.id===296});
p296.stores.zzounds='';
p296.stores.reverb='';
p296.stores.gear4music='';
p296.stores.musicstore='';

require('fs').writeFileSync('data/products.json',JSON.stringify(p,null,2));

// Verify
[270,272,273,274,275,295,296].forEach(function(id){
  var prod=p.find(function(x){return x.id===id});
  console.log(id,prod.title,'$'+prod.price);
  Object.keys(prod.stores).forEach(function(s){
    console.log(' ',s,':',prod.stores[s]||'(empty)');
  });
});
