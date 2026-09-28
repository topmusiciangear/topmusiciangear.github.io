var fs=require('fs');
var A=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
var AL=[]
function getG(slug){for(var i=0;i<A.length;i++){var s=String(A[i].slug||A[i].id||'');if(s===slug)return {g:A[i],i:i};}return null;}
['portable-interfaces','premium-interfaces'].forEach(function(slug){
 var f=getG(slug);AL.push('\n##### '+slug+' '+(f?'idx='+f.i:'NOT FOUND')+' #####');
 if(!f)return;var g=f.g;
 AL.push('keys: '+Object.keys(g).join('|'));
 var tabs=[];Object.keys(g).forEach(function(k){var v=g[k];if(v&&typeof v==='object'&&(v.rows||v.cells)&&/(table|comp|prod)/i.test(k)&&!Array.isArray(v))tabs.push(k);});
 AL.push('table-like keys: '+tabs.join('|'));
 tabs.forEach(function(tk){var t=g[tk];
   AL.push('  '+tk+': headers='+JSON.stringify(t.headers||[])+' | headers_es='+JSON.stringify(t.headers_es||[])+' | nrows='+((t.rows||[]).length));
   (t.rows||[]).forEach(function(r,ri){AL.push('    ROW['+ri+'] '+JSON.stringify(r.label)+'/'+JSON.stringify(r.label_es||''));
     (r.cells||r.values||[]).forEach(function(c,ci){var v=String(c.value===undefined?'':c.value);var ve=c.value_es===undefined?'':String(c.value_es);
       var eslike=/[áéíóúñ¿¡]|Voz\/inst|inst con|Bajo coste|Smartgain|Vintage 610|Vocal\+76|2 headphone|iD scroll|Podcast\/|streaming|loopback|Bajo coste alto|ESS|vintage|Smartgain, loopback|Podcast|Vocal|iD scroll|ADAT|loopback,|inst\.|Vintage 610|con Vintage|alto rendimiento|2 headphone|iD scroll/i.test(v);
       AL.push('      c['+ci+'] EN='+JSON.stringify(v)+(eslike?'  <== ES-in-EN!!':'')+' | ES='+JSON.stringify(ve));
     });});
 });
 var vsk=Object.keys(g).filter(function(k)/verdict/i.test(k));AL.push('verdict keys: '+vsk.join('|'));
 vsk.forEach(function(k){var v=g[k];AL.push('  '+k+' = '+(Array.isArray(v)?'ARRAY len='+v.length:(v&&typeof v==='object'?'OBJECT keys='+Object.keys(v).join('|'):'scalar')));});
});
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/clean_probe.txt',AL.join('\n'),'utf8');
console.log('wrote '+AL.length+' lines');
