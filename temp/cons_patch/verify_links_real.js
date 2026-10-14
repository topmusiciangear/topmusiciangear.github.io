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
console.log('TEST_SHOP_BTN entries:', Object.keys(TEST).length);

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
  if(!prod) return;
  
  if(cfg.urls){
    Object.keys(cfg.urls).forEach(function(store){
      var url = cfg.urls[store];
      if(!url) return;
      
      // 1. Double-wrapped affiliate links
      if((url.match(/awin1\.com\/cread\.php/g)||[]).length > 1){
        issues.push(pid+' | '+store+' | DOUBLE AWIN: '+url);
      }
      if((url.match(/anrdoezrs\.net/g)||[]).length > 1){
        issues.push(pid+' | '+store+' | DOUBLE CJ: '+url);
      }
      if((url.match(/pxf\.io/g)||[]).length > 1){
        issues.push(pid+' | '+store+' | DOUBLE PXF: '+url);
      }
      
      // 2. Wrong domain for store
      var dom = domains[store];
      if(dom && url.indexOf(dom)<0){
        issues.push(pid+' | '+store+' | WRONG DOMAIN: '+url);
      }
      
      // 3. Search URLs instead of product URLs (for non-oos/na)
      var isOOS = cfg.oos && cfg.oos.includes(store);
      var isNA = cfg.na && cfg.na.includes(store);
      if(!isOOS && !isNA){
        if(url.indexOf('/search')>=0 || url.indexOf('SearchText')>=0 || url.indexOf('?q=')>=0 || url.indexOf('s?k=')>=0){
          // Might be a search fallback - flag for review
          issues.push(pid+' | '+store+' | SEARCH URL (not product): '+url);
        }
      }
      
      // 4. Amazon ASIN pattern check
      if(store==='amazon' && url.indexOf('/dp/')<0 && url.indexOf('/gp/product/')<0 && !isOOS && !isNA){
        if(url.indexOf('amazon.')>=0 && url.indexOf('tag=')>=0){
          // Might be search URL
          issues.push(pid+' | amazon | NO ASIN IN URL: '+url);
        }
      }
      
      // 5. zZounds item-- pattern
      if(store==='zzounds' && url.indexOf('item--')<0 && url.indexOf('productreview--')<0 && !isOOS && !isNA){
        issues.push(pid+' | zzounds | NO ITEM CODE: '+url);
      }
      
      // 6. Andertons should be pxf.io with ?u=
      if(store==='andertons' && url.indexOf('pxf.io')>=0 && url.indexOf('?u=')<0 && !isOOS && !isNA){
        issues.push(pid+' | andertons | MISSING ?u= PARAM: '+url);
      }
    });
  }
});

fs.writeFileSync('temp/cons_patch/link_real_issues.txt', issues.join('\n'),'utf8');
console.log('Total URL issues: '+issues.length);
if(issues.length>0) console.log(issues.slice(0,60).join('\n'));