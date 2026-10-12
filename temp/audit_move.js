var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var hub=d.find(function(x){return x.id==='best-keyboard'});
var spe=d.find(function(x){return x.id==='midi-keyboards'});
console.log('HUB featured: '+JSON.stringify(hub.featuredProducts));
console.log('HUB table cols: '+hub.productTable.columns.map(function(c){return c.title}).join(' | '));
console.log('HUB rows: '+hub.productTable.rows.map(function(r){return r.label}).join(' | '));
console.log('HUB verdicts: '+(hub.verdictProsCons||[]).map(function(v){return v.name}).join(' | '));
console.log('HUB related: '+JSON.stringify(hub.relatedGuides));
console.log('HUB conclusion: '+(hub.conclusion||'').slice(0,800));
console.log('HUB verdict: '+(hub.verdict||'').slice(0,800));
console.log('--- SPE sec0 (DAW advice):');
console.log((spe.sections[0].content||'(none)').slice(0,2000));
console.log('--- SPE verdicts: '+(spe.verdictProsCons||[]).map(function(v){return v.name}).join(' | '));
console.log('--- SPE conclusion: '+(spe.conclusion||'').slice(0,600));
var ps=JSON.parse(fs.readFileSync('data/products.json','utf8'));
[325,14].forEach(function(id){
  var p=ps.find(function(x){return x.id===id});
  console.log('--- PROD '+id+': '+p.title+' $'+p.price+' stores:'+Object.keys(p.stores||{}).join(','));
});
var src=fs.readFileSync('build-guides.js','utf8');
[325,14].forEach(function(id){
  console.log('BUTTON '+id+': '+(src.indexOf('\n  '+id+': {')>-1?'EXISTS':'MISSING'));
});
// stage keyboards already in catalog?
var keys=ps.filter(function(p){return /nord|stage|electro|yc61|ck88|fantom|juno|kross|nautilus|dexibell|kurzweil|yc88|cp88|roland rd|rd-2000|fp-90|semi-weighted|workstation/i.test(p.title||'')});
keys.forEach(function(p){console.log('STAGE-CAND: '+p.id+': '+p.title+' $'+p.price);});
