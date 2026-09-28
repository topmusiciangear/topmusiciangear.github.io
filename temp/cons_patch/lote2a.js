var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
function G(id){ return A.find(function(x){return x&&x.id===id;}); }
var o=[];
function show(id, fn){ var g=G(id); if(!g){o.push('== '+id+' MISSING');return;} o.push('== '+id); fn(g); }
// 1. best-monitors Type row
show('best-monitors',function(g){ (g.productTable.rows||[]).forEach(function(r){ if(/type|tipo/i.test(r.label||'')) o.push('TYPEROW='+JSON.stringify(r.values.map(function(v){return v.value;}))); }); o.push('COLS='+JSON.stringify(g.productTable.columns.map(function(c){return c.title;}))); });
// 2. open-headphones DT990 cable + HD560S sens
show('open-headphones',function(g){ (g.productTable.rows||[]).forEach(function(r){ if(/cable|sensitiv/i.test(r.label||'')) o.push('ROW['+r.label+']='+JSON.stringify(r.values.map(function(v){return v.value;}))); }); });
// 3. Apollo 167dB strings
show('pro-interfaces',function(g){ var s=JSON.stringify(g); var i=s.indexOf('167dB'); o.push('CTX='+s.slice(Math.max(0,i-120),i+80)); });
show('premium-interfaces',function(g){ var s=JSON.stringify(g); ['167dB','x16 Gen 2'].forEach(function(t){ var i=s.indexOf(t); if(i>=0) o.push(t+' CTX='+s.slice(Math.max(0,i-100),i+60)); }); });
// 4. rme-vs-motu VPC babyface
show('rme-vs-motu',function(g){ (g.verdictProsCons||[]).forEach(function(v){ if(/babyface/i.test(v.name||'')) o.push('VPC='+JSON.stringify(v)); }); });
// 5. apollo-vs-babyface headphone
show('apollo-vs-babyface',function(g){ (g.verdictProsCons||[]).forEach(function(v){ if(/apollo/i.test(v.name||'')) o.push('VPC='+JSON.stringify(v).slice(0,700)); }); });
// 6. katana claims
show('katana-vs-dsl',function(g){ var s=JSON.stringify(g); ['twelve amp','100W/50W','5-inch','1x12','50W / 25W'].forEach(function(t){ var i=s.indexOf(t); if(i>=0)o.push(t+' :: '+s.slice(Math.max(0,i-80),i+80)); }); });
// 7. blues junior
show('blues-junior-vs-ac30',function(g){ var s=JSON.stringify(g); ['Jensen','40-watt','40W','15-watt','15W'].forEach(function(t){ var i=s.indexOf(t); if(i>=0)o.push(t+' :: '+s.slice(Math.max(0,i-80),i+80)); }); });
// 8. bypass claims
show('guitar-pedals',function(g){ (g.productTable.rows||[]).forEach(function(r){ if(/bypass/i.test(r.label||'')) o.push('BYPASS='+JSON.stringify(r.values.map(function(v){return v.value;}))); }); });
show('best-overdrive-distortion',function(g){ (g.productTable.rows||[]).forEach(function(r){ if(/bypass/i.test(r.label||'')) o.push('BYPASS='+JSON.stringify(r.values.map(function(v){return v.value;}))); o.push('COLS='+JSON.stringify(g.productTable.columns.map(function(c){return c.title;}))); }); });
// 9. stream deck keys/dials + DLZ
show('stream-deck-plus-xl-vs-razer',function(g){ var s=JSON.stringify(g); ['36 physical','8x4','six tactile','4 dials','dials'].forEach(function(t){ var i=s.indexOf(t); if(i>=0)o.push(t+' :: '+s.slice(Math.max(0,i-80),i+80)); }); });
show('rodecaster-pro2-vs-dlz-creator',function(g){ var s=JSON.stringify(g); ['nine 100mm','faders','NDI'].forEach(function(t){ var i=s.indexOf(t); if(i>=0)o.push(t+' :: '+s.slice(Math.max(0,i-80),i+80)); }); });
// 10. X32/MG10/ProFX/SQ specs
show('best-live-sound-mixers',function(g){ (g.productTable.rows||[]).forEach(function(r){ if(/preamp|channel|weight|peso/i.test(r.label||'')) o.push('ROW['+r.label+']='+JSON.stringify(r.values.map(function(v){return v.value;})).slice(0,300)); }); o.push('COLS='+JSON.stringify(g.productTable.columns.map(function(c){return c.title;}))); });
fs.writeFileSync('temp/cons_patch/lote2a.txt', o.join('\n'),'utf8');
console.log('ok len='+o.join('\n').length);
