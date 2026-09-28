var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var P=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var PC={}; P.forEach(function(p){ PC[p.id]=p; });
function nm(id){ return PC[id]?id+'='+PC[id].title+' $'+PC[id].price:'id'+id+'=?'; }
var o=[];
[341,343,356,361,266,264,327,419,420,421,23,441,442,155,156,185,25,26,200,128,508,52,262,263,363].forEach(function(id){ o.push(nm(id)); });
// scarlett-vs-motu + digitakt comparison rows
[['scarlett-vs-motu',null],['digitakt-ii-vs-tr8s',null]].forEach(function(pair){
  var g=A.find(function(x){return x&&x.id===pair[0];});
  o.push('--- '+pair[0]+' CMP ---');
  (g.comparison.rows||[]).forEach(function(r,i){ o.push('row'+i+'='+JSON.stringify(r)); });
});
fs.writeFileSync('temp/cons_patch/lote1b.txt', o.join('\n'),'utf8');
console.log('ok');
