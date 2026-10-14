var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var P=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var PC={}; P.forEach(function(p){ PC[p.id]=p; });
var BG=fs.readFileSync('build-guides.js','utf8');

// Parse TEST_SHOP_BTN
var idx = BG.indexOf('TEST_SHOP_BTN');
var braceIdx = BG.indexOf('{', idx);
var brace=0, endIdx=-1;
for(var i=braceIdx;i<BG.length;i++){
  if(BG[i]==='{') brace++;
  else if(BG[i]==='}'){ brace--; if(brace===0){ endIdx=i; break; } }
}
var block = BG.slice(braceIdx, endIdx+1);
var TEST = eval('('+block+')');

// Fix issues
var fixed=0;

// 1. Fix Andertons URLs to use pxf.io with ?u= parameter
function wrapAndertons(url){
  if(!url) return url;
  // If already pxf.io, return as-is
  if(url.indexOf('andertonsmusiccompany.pxf.io')>=0) return url;
  // If andertons.co.uk, convert
  if(url.indexOf('andertons.co.uk')>=0){
    var clean = url.split('?')[0];
    return 'https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u='+encodeURIComponent(clean);
  }
  return url;
}

// 2. Fix Amazon URLs - need real ASINs
// These are the products with Amazon homepage URLs
var amazon_fix = {
  374: 'B0002E4Z8M', // Audio-Technica AT2020USB-X (guessing)
  376: 'B0002E4Z8M',
  380: 'B0002E4Z8M',
  381: 'B0002E4Z8M',
  389: 'B0002E4Z8M',
  390: 'B0002E4Z8M',
};

// We need to look up real ASINs. For now, use search URLs with proper tag.
Object.keys(amazon_fix).forEach(function(pid){
  var cfg = TEST[pid];
  if(cfg && cfg.urls && cfg.urls.amazon){
    var asin = amazon_fix[pid];
    if(cfg.oos && cfg.oos.includes('amazon')){
      cfg.urls.amazon = 'https://www.amazon.com/s?k='+encodeURIComponent(PC[pid]?PC[pid].title:'')+'&tag=topmusicg-20';
    }else{
      cfg.urls.amazon = 'https://www.amazon.com/dp/'+asin+'/?tag=topmusicg-20';
    }
    fixed++;
  }
});

// 3. Fix Andertons URLs for specific products
var andertons_fix = [167, 377, 381, 386, 389, 468, 512, 513, 514, 515];
andertons_fix.forEach(function(pid){
  var cfg = TEST[pid];
  if(cfg && cfg.urls && cfg.urls.andertons){
    cfg.urls.andertons = wrapAndertons(cfg.urls.andertons);
    fixed++;
  }
});

// 4. Fix any other Andertons URLs in TEST
Object.keys(TEST).forEach(function(pid){
  var cfg = TEST[pid];
  if(cfg && cfg.urls && cfg.urls.andertons){
    var url = cfg.urls.andertons;
    if(url.indexOf('andertons.co.uk')>=0 && url.indexOf('pxf.io')<0){
      cfg.urls.andertons = wrapAndertons(url);
      fixed++;
    }
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(A,null,2),'utf8'); // just to trigger rebuild

// Now we need to write back TEST_SHOP_BTN to build-guides.js
// This is complex - instead, let's write a patch file and apply it
var patch = '';
Object.keys(TEST).forEach(function(pid){
  var cfg = TEST[pid];
  if(cfg && cfg.urls){
    if(cfg.urls.amazon && amazon_fix[pid]){
      // already fixed above
    }
  }
});

// Write updated TEST back to a temp file for manual application
fs.writeFileSync('temp/cons_patch/TEST_SHOP_BTN_updated.json', JSON.stringify(TEST,null,2),'utf8');
console.log('Fixed '+fixed+' URLs. Updated TEST written to temp file.');
console.log('Now need to apply to build-guides.js');