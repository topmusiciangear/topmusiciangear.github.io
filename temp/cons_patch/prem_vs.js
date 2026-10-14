var fs=require('fs');
var A=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'))||[];
var O=[];
function findG(sl){for(var i=0;i<A.length;i++){if(String(A[i].slug||A[i].id||'')===sl)return{i:i,g:A[i]};}return null;}
var f=findG('premium-interfaces');
O.push('premium idx='+(f?f.i:'NOTFOUND'));
if(f){var g=f.g;
 O.push('keys='+Object.keys(g).join('|'));
 var c=g.comparison||null;
 O.push('comparison?'+(c?'YES':'NO'));
 if(c){O.push('c.keys='+Object.keys(c).join('|'));
  O.push('c.headers='+JSON.stringify(c.headers));
  O.push('c.headers_es='+JSON.stringify(c.headers_es));
  var rs=c.rows||[];O.push('rows='+rs.length);
  rs.forEach(function(r,ri){O.push(' ROW'+ri+' label='+JSON.stringify(r.label)+' /'+JSON.stringify(r.label_es));
   (r.cells||[]).forEach(function(c2,ci){O.push('   c'+ci+' EN='+JSON.stringify(String(c2.value===undefined?'':c2.value))+' ES='+JSON.stringify(c2.value_es===undefined?'':String(c2.value_es)));});
  });
 }
 var vs=g.verdictSideBySide||null;
 O.push('\nverdictSideBySide?'+(vs?'YES type='+(Array.isArray(vs)?'ARRAY':typeof vs):'NO'));
 if(vs&&!Array.isArray(vs)){O.push(' vs.keys='+Object.keys(vs).join('|'));
  Object.keys(vs).forEach(function(k){var v=vs[k];O.push('   vs.'+k+' = '+(Array.isArray(v)?'ARRAY len='+v.length:(v&&typeof v==='object'?'OBJ keys='+Object.keys(v).join('|'):JSON.stringify(v))));});
 }
 var pt=g.productTable||null;
 O.push('\nproductTable?'+(pt?'YES':'NO'));
 if(pt){O.push(' pt.headers='+JSON.stringify(pt.headers));O.push(' pt.headers_es='+JSON.stringify(pt.headers_es));
  (pt.rows||[]).forEach(function(r,ri){O.push('  ptROW'+ri+' label='+JSON.stringify(r.label)+'/'+JSON.stringify(r.label_es));});}
}
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/prem_vs.txt',O.join('\n'),'utf8');
console.log('wrote '+O.length);
