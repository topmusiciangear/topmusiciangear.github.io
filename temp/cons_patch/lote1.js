var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var P=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var PC={}; P.forEach(function(p){ PC[p.id]=p; });
function normT(s){ return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim(); }
function pidByTitle(t){
  var nt=normT(t), best=null;
  P.forEach(function(p){
    var pt=normT(p.title);
    if(pt===nt) best=p.id;
  });
  if(best!==null) return best;
  P.forEach(function(p){
    var pt=normT(p.title);
    if(pt.indexOf(nt)>=0||nt.indexOf(pt)>=0){ if(best===null) best=p.id; }
  });
  return best;
}
var ids=['best-shotgun-mics','best-acoustic-guitars-for-beginners','best-wireless-iems','streaming-interfaces','mics-for-creators','best-samplers-drum-computers','best-mic-for-podcasting','best-mic-for-guitar-amps','best-grooveboxes','best-bass-amps','budget-interfaces','midi-keyboards','m50x-vs-mdr7506','best-daw-for-beginners','stream-controllers','best-reverb-delay','scarlett-vs-motu','digitakt-ii-vs-tr8s','budget-bass-like-expensive','pro-guitars','pro-basses'];
var o=[];
ids.forEach(function(id){
  var g=A.find(function(x){return x&&x.id===id;});
  if(!g){ o.push('== '+id+' MISSING'); return; }
  o.push('== '+id+' | title='+g.title);
  o.push('FEAT='+JSON.stringify(g.featuredProducts||[]));
  o.push('COLS='+JSON.stringify((g.productTable&&g.productTable.columns||[]).map(function(c){return c.title;})));
  o.push('COLIDS='+JSON.stringify((g.productTable&&g.productTable.columns||[]).map(function(c){return pidByTitle(c.title);})));
  o.push('SECPRODS='+JSON.stringify(g.sections.map(function(s){return s.products||[];})));
  o.push('VPC='+JSON.stringify((g.verdictProsCons||[]).map(function(v){return v.name;})));
});
fs.writeFileSync('temp/cons_patch/lote1.txt', o.join('\n'),'utf8');
console.log('ok');
