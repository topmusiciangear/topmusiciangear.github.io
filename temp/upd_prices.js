var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// ---------- products.json ----------
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var f=ps.find(function(x){return x.id===645;});
f.stores.musicstore='https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued='+encodeURIComponent('https://www.musicstore.com/en_OE/EUR/Focal-Alpha-65-Evo/art-REC0015459-000');
f.stores.zzounds='https://www.zzounds.com/a--925521/item--FOLALPHA65EVO';
var iso=ps.find(function(x){return x.id===646;});
iso.stores.musicstore='https://www.musicstore.com/en_OE/EUR/IsoAcoustics-ISO-200/art-REC0013752-000';
iso.stores.andertons='https://www.andertons.co.uk/isoacoustics-200-stands-pair-black/';
iso.stores.gear4music='https://www.gear4music.com/Recording-and-Computers/IsoAcoustics-ISO-200-Stands-Pair/2I7W';
iso.img='https://r2.gear4music.com/media/36/367081/1200/preview.jpg';
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products updated');

// ---------- TEST_SHOP_BTN ----------
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
function replaceBlock(id,newBlock){
  var key='\n  '+id+': {';
  var i=src.indexOf(key);
  assert(i>-1,'BLOCK '+id+' NOT FOUND');
  if(i===-1)return;
  var j=src.indexOf('{',i),depth=0,k=j;
  while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
  var end=k+1;if(src[end]===',')end++;
  src=src.slice(0,i)+'\n'+newBlock+src.slice(end);
  console.log('block '+id+' replaced');
}
replaceBlock(645,'  645: {\n    prices: {\n      gear4music: "£277.00",\n      andertons: "£275.00",\n      musicstore: "€304.00",\n      zzounds: "$429.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Focal-Alpha-65-Evo-Active-Studio-Monitor/3T37",\n      andertons: "https://www.andertons.co.uk/focal-alpha-65-evo-active-studio-monitor-each/",\n      amazon: "https://www.amazon.com/Focal-Professional-Alpha-Studio-Monitors/dp/B0989ZV9BH",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/Focal-Alpha-65-Evo/art-REC0015459-000",\n      zzounds: "https://www.zzounds.com/item--FOLALPHA65EVO"\n    },\n    oos: [\n      "andertons"\n    ]\n  },');
replaceBlock(646,'  646: {\n    prices: {\n      musicstore: "€169.00",\n      zzounds: "$156.00",\n      andertons: "£132.00",\n      gear4music: "£149.00"\n    },\n    urls: {\n      amazon: "https://www.amazon.com/IsoAcoustics-ISO-200-Isolation-Stands-Monitors/dp/B07D7K4Q54",\n      zzounds: "https://www.zzounds.com/item--ISOISO200",\n      musicstore: "https://www.musicstore.com/en_OE/EUR/IsoAcoustics-ISO-200/art-REC0013752-000",\n      andertons: "https://www.andertons.co.uk/isoacoustics-200-stands-pair-black/",\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/IsoAcoustics-ISO-200-Stands-Pair/2I7W"\n    }\n  },');
replaceBlock(59,'  59: {\n    prices: {\n      gear4music: "£82.20",\n      musicstore: "€70.00"\n    },\n    urls: {\n      zzounds: "https://www.zzounds.com/a--925521/item--KMS26754"\n    },\n    oos: [\n      "zzounds"\n    ]\n  },');
fs.writeFileSync(b,src);
console.log('TEST updated');

// ---------- table price rows (USD): Focal $429, ISO $156 ----------
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='monitor-setup'});
var priceRow=g.productTable.rows.find(function(r){return r.label==='Price (USD)';});
assert(priceRow,'price row missing');
priceRow.values[2].value='$429 each';priceRow.values[2].value_es='$429 c/u';
priceRow.values[3].value='$156 pair';priceRow.values[3].value_es='$156 par';
fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('table updated');
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');
