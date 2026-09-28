var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var P=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var PC={}; P.forEach(function(p){ PC[p.id]=p; });
function normT(s){ return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim(); }
// map table columns to product ids by normalized title
var o=[];
A.forEach(function(g){
  var t=g.productTable;
  if(!t||!t.columns||!t.columns.length) return;
  var priceRow=(t.rows||[]).find(function(r){return /precio|price/i.test(r.label||'');});
  if(!priceRow) return;
  t.columns.forEach(function(c,cx){
    var nt=normT(c.title);
    var pid=(g.featuredProducts||[]).find(function(id){ return PC[id]&&normT(PC[id].title)===nt; });
    if(!pid){ // try contains match
      pid=(g.featuredProducts||[]).find(function(id){ return PC[id]&&(normT(PC[id].title).indexOf(nt)>=0||nt.indexOf(normT(PC[id].title))>=0); });
    }
    var v=priceRow.values&&priceRow.values[cx]?priceRow.values[cx].value:'';
    var amt=String(v||'').replace(/[^0-9.]/g,'');
    if(pid&&amt){
      var cat=PC[pid].price;
      if(typeof cat==='number'&&Math.abs(parseFloat(amt)-cat)>Math.max(1,cat*0.03)){
        o.push(g.id+' :: table $'+amt+' vs catalog $'+cat+' ('+PC[pid].title+')');
      }
    } else if(amt&&!pid){
      o.push(g.id+' :: col "'+c.title+'" price $'+amt+' (no feat match to verify)');
    }
  });
});
fs.writeFileSync('temp/cons_patch/audit_price2.txt', o.length?o.join('\n'):'ALL TABLE PRICES MATCH CATALOG');
console.log('mismatches='+o.length);
