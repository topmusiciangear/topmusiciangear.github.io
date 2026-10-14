var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var P=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var PC={}; P.forEach(function(p){ PC[p.id]=p; });
var BG=fs.readFileSync('build-guides.js','utf8');

// Find TEST_SHOP_BTN block by finding the opening and matching braces
var idx = BG.indexOf('TEST_SHOP_BTN');
if(idx<0) idx = BG.indexOf('const TEST_SHOP_BTN');
if(idx<0) idx = BG.indexOf('var TEST_SHOP_BTN');
if(idx<0){ console.log('TEST_SHOP_BTN not found'); process.exit(1); }

// Find the opening brace
var braceIdx = BG.indexOf('{', idx);
if(braceIdx<0){ console.log('No opening brace'); process.exit(1); }

// Parse balanced braces
var brace=0, endIdx=-1;
for(var i=braceIdx;i<BG.length;i++){
  if(BG[i]==='{') brace++;
  else if(BG[i]==='}'){ brace--; if(brace===0){ endIdx=i; break; } }
}
if(endIdx<0){ console.log('No matching closing brace'); process.exit(1); }

var block = BG.slice(braceIdx, endIdx+1);
console.log('Block length:', block.length);
console.log('First 200:', block.slice(0,200));

// Now eval the block as an object literal
var TEST;
try{
  TEST = eval('('+block+')');
  console.log('Parsed TEST_SHOP_BTN entries:', Object.keys(TEST).length);
}catch(e){
  console.log('Eval failed:', e.message);
  process.exit(1);
}

// Check each entry
var issues=[];
var domains={
  'amazon':'amazon.',
  'zzounds':'zzounds.com',
  'andertons':'andertonsmusiccompany.pxf.io',
  'gear4music':'gear4music.com',
  'musicstore':'musicstore.com',
  'reverb':'reverb.com',
  'pluginboutique':'pluginboutique.com',
  'hollyland':'hollyland.com',
};
Object.keys(TEST).forEach(function(pid){
  var cfg = TEST[pid];
  var prod = PC[pid];
  if(!prod){
    issues.push(pid+' | MISSING in products.json');
    return;
  }
  // Check prices match catalog (approximate)
  if(cfg.prices){
    Object.keys(cfg.prices).forEach(function(store){
      var btnPrice = cfg.prices[store];
      var catPrice = prod.price;
      if(typeof catPrice==='number' && btnPrice){
        var btnVal = parseFloat(String(btnPrice).replace(/[^\d.]/g,''));
        if(btnVal && Math.abs(btnVal-catPrice) > Math.max(1, catPrice*0.15)){
          issues.push(pid+' | PRICE MISMATCH '+store+': btn='+btnPrice+' cat=$'+catPrice);
        }
      }
    });
  }
  // Check URLs have store domain
  if(cfg.urls){
    Object.keys(cfg.urls).forEach(function(store){
      var url = cfg.urls[store];
      var dom = domains[store];
      if(dom && url && url.indexOf(dom)<0){
        issues.push(pid+' | URL DOMAIN MISMATCH '+store+': '+url);
      }
      // Check for double-wrapped affiliate links
      if(url && (url.match(/awin1\.com\/cread\.php/g)||[]).length > 1){
        issues.push(pid+' | DOUBLE AWIN WRAP '+store+': '+url.slice(0,100));
      }
      if(url && (url.match(/anrdoezrs\.net/g)||[]).length > 1){
        issues.push(pid+' | DOUBLE CJ WRAP '+store+': '+url.slice(0,100));
      }
      if(url && (url.match(/pxf\.io/g)||[]).length > 1){
        issues.push(pid+' | DOUBLE PXF WRAP '+store+': '+url.slice(0,100));
      }
    });
  }
  // Check oos/na arrays have valid stores
  var validStores=['amazon','zzounds','andertons','gear4music','musicstore','reverb','pluginboutique','hollyland'];
  if(cfg.oos){
    cfg.oos.forEach(function(s){
      if(!validStores.includes(s)){
        issues.push(pid+' | OOS unknown store: '+s);
      }
    });
  }
  if(cfg.na){
    cfg.na.forEach(function(s){
      if(!validStores.includes(s)){
        issues.push(pid+' | NA unknown store: '+s);
      }
    });
  }
});

fs.writeFileSync('temp/cons_patch/link_price_issues.txt', issues.join('\n'),'utf8');
console.log('Total issues: '+issues.length);
if(issues.length>0) console.log(issues.slice(0,80).join('\n'));
else console.log('No issues found');