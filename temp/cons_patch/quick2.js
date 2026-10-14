var fs=require('fs');
var arr=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
var o=[];
function find(sl){for(var i=0;i<arr.length;i++){var s=String(arr[i].slug||arr[i].id||''); if(s===sl)return arr[i];}return null;}
var port=find('portable-interfaces');
o.push('PORT keys: '+Object.keys(port).join(' | '));
o.push('port productTable: '+(port.productTable?'YES rows='+((port.productTable.rows||[]).length):'NO'));
if(port.productTable){
  o.push('  headers: '+JSON.stringify((port.productTable.headers||[])));
  port.productTable.rows.forEach(function(r,ri){
    o.push('  ROW['+ri+'] label='+JSON.stringify(r.label));
    (r.cells||[]).forEach(function(c,ci){
      var v=String(c.value===undefined?'':c.value);
      var es=i(c.value_es===undefined?'':c.value_es);
      var sus=/[áéíóúñ¿¡]|[vV]oz\/|inst\b|Vintage 610|Bajo coste|Smartgain|loopback|Podcast|streaming|Vocal\+76|2 headphone|ADAT, iD|iD scroll|Voz\/inst|Vocal\+76|ESS|alto rendimiento/.test(v);
      o.push('     c['+ci+'] EN='+JSON.stringify(v)+' | ES='+JSON.stringify(es)+(sus?'    <== ES-in-EN':''));
    });
  });
}
var prem=find('premium-interfaces');
o.push('\nPREM keys: '+Object.keys(prem).join(' | '));
var vs=prem.verdictSideBySide;
o.push('verdictSideBySide typeof: '+(vs===undefined?'UNDEF':(Array.isArray(vs)?'ARRAY len='+vs.length:typeof vs)));
if(vs&&typeof vs==='object'&&!Array.isArray(vs)){o.push('  keys: '+Object.keys(vs).join(' | '));}
o.push('prem comparison headers: '+JSON.stringify((prem.comparison||{}).headers||[]));
o.push('prem products: '+JSON.stringify((prem.products||[]).length));
if(prem.comparison&&prem.comparison.rows){prem.comparison.rows.forEach(function(r,ri){o.push('  ROW['+ri+'] label='+JSON.stringify(r.label)); (r.cells||[]).forEach(function(c,ci){var v=String(c.value===undefined?'':c.value);var sus=/[áéíóúñ¿¡]/i.test(v);o.push('     c['+ci+'] EN='+JSON.stringify(v)+(sus?'  <== ACCENT':'')+' | ES='+JSON.stringify(c.value_es===undefined?'':c.value_es));});});}
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/quick2.txt',o.join('\n'),'utf8');
console.log('ok '+o.length);
function i(x){return x===undefined?'':x;}
