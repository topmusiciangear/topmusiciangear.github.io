var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
function G(id){ return A.find(function(x){return x&&x.id===id;}); }
var o=[];
function tableDump(id){
  var g=G(id); o.push('== '+id);
  o.push('COLS='+JSON.stringify(g.productTable.columns.map(function(c){return c.title;})));
  (g.productTable.rows||[]).forEach(function(r){
    o.push('ROW['+r.label+'/'+(r.label_es||'')+']='+JSON.stringify(r.values.map(function(v){return (v.value||'')+' || '+(v.value_es||'');})));
  });
}
tableDump('open-headphones');
tableDump('guitar-pedals');
(function(){ var g=G('best-monitors'); var r=g.productTable.rows.find(function(x){return /type/i.test(x.label||'');}); o.push('== best-monitors TYPEROW_ES='+JSON.stringify(r.values.map(function(v){return v.value_es;}))); })();
(function(){ var g=G('premium-interfaces'); o.push('== premium FSN='+JSON.stringify(g.featuredSnippet).slice(0,2500)); o.push('FAQT='+g.faqTitle+' || '+g.faqTitle_es); })();
(function(){ var g=G('apollo-vs-babyface'); g.verdictProsCons.forEach(function(v){ if(/apollo/i.test(v.name||'')) o.push('== apollo VPC='+JSON.stringify(v)); }); })();
(function(){ var g=G('katana-vs-dsl'); var s=JSON.stringify(g); ['doce','seis','6 amp','5 tipos','Doce'].forEach(function(t){ var i=s.indexOf(t); if(i>=0)o.push('KAT['+t+'] :: '+s.slice(Math.max(0,i-70),i+70)); }); })();
(function(){ var g=G('blues-junior-vs-ac30'); var s=JSON.stringify(g); ['Jensen','Celestion','A-Type'].forEach(function(t){ var i=s.indexOf(t); if(i>=0)o.push('BJ['+t+'] :: '+s.slice(Math.max(0,i-70),i+70)); }); })();
(function(){ var g=G('stream-deck-plus-xl-vs-razer'); g.sections.forEach(function(s,i){ o.push('== SD SEC'+i+' h='+s.heading); o.push(s.content); o.push(s.content_es); }); })();
(function(){ var g=G('rodecaster-pro2-vs-dlz-creator'); g.sections.forEach(function(s,i){ if(/fader|NDI|Fader/i.test(s.content||'')){ o.push('== DLZ SEC'+i+' h='+s.heading); o.push(s.content); o.push(s.content_es); } }); })();
['best-digital-mixers','best-analog-mixers','best-compact-mixers'].forEach(function(id){
  var g=G(id); o.push('== '+id+' COLS='+JSON.stringify(g.productTable.columns.map(function(c){return c.title;})));
  (g.productTable.rows||[]).forEach(function(r){ if(/preamp|channel|weight|bypass/i.test(r.label||'')) o.push('ROW['+r.label+']='+JSON.stringify(r.values.map(function(v){return (v.value||'')+' || '+(v.value_es||'');})).slice(0,400)); });
});
fs.writeFileSync('temp/cons_patch/lote2b.txt', o.join('\n'),'utf8');
console.log('ok len='+o.join('\n').length);
