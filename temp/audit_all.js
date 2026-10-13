var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var ps=JSON.parse(fs.readFileSync('data/products.json','utf8'));
function t(id){var p=ps.find(function(x){return x.id===id});return p?p.title:'MISSING-'+id;}
console.log('=== A. GUIDES WHERE TABLE/VPC PRODUCTS LACK SECTIONS ===');
d.forEach(function(g){
  var secPids={};
  (g.sections||[]).forEach(function(s){(s.products||[]).forEach(function(p){secPids[p]=1;});});
  var tableTitles=g.productTable?(g.productTable.columns||[]).map(function(c){return c.title}):[];
  var vpcNames=(g.verdictProsCons||[]).map(function(p){return p.name;});
  // map table/vpc names back to pids via catalog title match
  function pidOf(name){
    var p=ps.find(function(x){return x.title===name||x.title_es===name});
    return p?p.id:null;
  }
  var missingSecTable=tableTitles.filter(function(nm){var id=pidOf(nm);return id&&!secPids[id];});
  var missingSecVpc=vpcNames.filter(function(nm){var id=pidOf(nm);return id&&!secPids[id];});
  // featured not in sections
  var featMissing=(g.featuredProducts||[]).filter(function(id){return !secPids[id];});
  if(missingSecTable.length||missingSecVpc.length||featMissing.length){
    console.log('--- '+g.id+' ---');
    if(missingSecTable.length)console.log('  table-without-section: '+missingSecTable.join(' | '));
    if(missingSecVpc.length)console.log('  vpc-without-section: '+missingSecVpc.join(' | '));
    if(featMissing.length)console.log('  featured-without-section: '+featMissing.map(t).join(' | '));
    console.log('  sections cover: '+Object.keys(secPids).map(function(id){return t(+id);}).join(' | '));
  }
});
console.log('');
console.log('=== B. VS GUIDES PRODUCT COUNT (must be exactly 2) ===');
d.filter(function(g){return /-vs-/i.test(g.id);}).forEach(function(g){
  var s={};
  (g.sections||[]).forEach(function(x){(x.products||[]).forEach(function(p){s[p]=1;});});
  var ids=Object.keys(s);
  var vpcN=(g.verdictProsCons||[]).length;
  var cols=g.productTable?(g.productTable.columns||[]).length:0;
  var flag=(ids.length!==2||vpcN!==2)?'  <-- INTRUDER/MISMATCH':'';
  console.log(g.id+': sections cover '+ids.length+' ['+ids.map(t).join(' | ')+'] vpc='+vpcN+' cols='+cols+flag);
});
