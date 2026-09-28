var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var P=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var PC={}; P.forEach(function(p){ PC[p.id]=p; });
var R=[];
function flag(gid, kind, msg){ R.push(gid+' ['+kind+'] '+msg); }

// ---------- A. TITLE vs PRODUCTS ----------
A.forEach(function(g){
  var title=(g.title||'')+' | '+(g.title_es||'');
  // A1. count in title vs columns
  var m=title.match(/(\d+)\s*(mejores|best|top|claves|formas|ways|ideas|preguntas|consejos|accesorios|plugins|models|modelos)/i)
      || (g.title_es||'').match(/^(los|las)\s+(\d+)/i)
      || (g.title||'').match(/\b(\d+)\s+(best|top)\b/i);
  var n=null;
  if(m){ n=parseInt(m[1]||m[2],10); }
  else { var m2=(g.title_es||'').match(/(los|las)\s+(\d+)/i); if(m2) n=parseInt(m2[2],10); }
  var ncols=(g.productTable&&g.productTable.columns)?g.productTable.columns.length:0;
  var nfeat=(g.featuredProducts||[]).length;
  if(n&&ncols&&n!==ncols) flag(g.id,'COUNT', 'title says '+n+' but table has '+ncols+' cols (feat '+nfeat+')');
  // A2. vs guides: both sides present?
  if(/\bvs\.?\b/i.test(g.title||'')||/\bvs\.?\b/i.test(g.title_es||'')){
    var sides=(g.title||'').split(/vs\.?/i);
    if(sides.length>=2){
      var pool=((g.productTable&&g.productTable.columns||[]).map(function(c){return c.title;}).join(' ')+' '+(g.featuredProducts||[]).map(function(id){return PC[id]?PC[id].title:'';}).join(' ')).toLowerCase();
      sides.forEach(function(s,ix){
        if(ix>1) return;
        var toks=s.replace(/[^a-zA-Z0-9'\- ]/g,' ').split(/\s+/).filter(function(w){return w.length>2 && !/^(the|best|which|for|wins|pro|vs|interface|mic|guitar|monitor|duel|compared|vs|tube|combo|you|your|para|mejor|cu[aá]l|una|los|las|con|sin|por|que|del|para)$/i.test(w);});
        var key=toks.slice(0,3).filter(function(w){return /[A-Z0-9]/.test(w[0])||/\d/.test(w);});
        if(key.length===0) key=toks.slice(0,2);
        var hit=key.some(function(k){return pool.indexOf(k.toLowerCase())>=0;});
        if(!hit&&key.length) flag(g.id,'VS-MATCH','side "'+s.trim().slice(0,40)+'" key('+key.join('/')+') not in products');
      });
    }
  }
  // A3. tier vs catalog prices
  var feat=(g.featuredProducts||[]).map(function(id){return PC[id];}).filter(Boolean);
  var prices=feat.map(function(p){return p.price;}).filter(function(x){return typeof x==='number';});
  if(prices.length){
    var mx=Math.max.apply(null,prices), mn=Math.min.apply(null,prices);
    if(/budget|econ[oó]mi|barat|cheap/i.test(title)&&mx>600) flag(g.id,'TIER','budget-title but max catalog price $'+mx);
    var cap=(title.match(/under\s*\$(\d+)/i)||title.match(/menos de\s*\$(\d+)/i));
    if(cap){ var over=prices.filter(function(p){return p>parseInt(cap[1],10);}); if(over.length) flag(g.id,'TIER','cap $'+cap[1]+' but prices '+over.join(',')); }
    if(/premium|lujo|insignia|flagship|gama alta/i.test(title)&&mn<150) flag(g.id,'TIER','premium-title but min catalog price $'+mn);
  }
});

// ---------- B. TABLES ----------
A.forEach(function(g){
  var t=g.productTable;
  if(t&&t.columns){
    var nc=t.columns.length;
    (t.rows||[]).forEach(function(r,ix){
      var nv=(r.values||[]).length;
      if(nv!==nc) flag(g.id,'TABLE','row['+ix+'] "'+(r.label||'?').slice(0,30)+'" has '+nv+' values vs '+nc+' cols');
      (r.values||[]).forEach(function(v,cx){
        var s=((v.value||'')+' '+(v.value_es||'')).trim();
        if(!s||/^(undefined|null|\?|tbd|\(\)|-)$/i.test(s)) flag(g.id,'TABLE','row "'+(r.label||'?').slice(0,25)+'" col'+cx+' empty/placeholder');
      });
      if(/Ideal Para|Rango Din[aá]mico|Tasa de Muestreo|Frecuencia de Muestreo|Ganancia de Preamplificador|Caracter[ií]sticas Especiales/.test(r.label_es||'')) flag(g.id,'TABLE-TC','label_es TitleCase: '+r.label_es);
    });
    // price row vs catalog
    (t.rows||[]).forEach(function(r){
      if(/precio|price/i.test(r.label||'')){
        (r.values||[]).forEach(function(v,cx){
          var col=(t.columns||[])[cx];
          var amt=String(v.value||'').replace(/[^0-9.]/g,'');
          if(amt&&col){
            var pid=(g.featuredProducts||[])[cx];
            var cat=pid&&PC[pid]?PC[pid].price:null;
            if(cat&&Math.abs(parseFloat(amt)-cat)>Math.max(1,cat*0.02)) flag(g.id,'PRICE','table $'+amt+' vs catalog $'+cat+' ('+col.title+')');
          }
        });
      }
    });
  }
  if(g.comparison&&g.comparison.rows){
    g.comparison.rows.forEach(function(r,ix){
      ['val1','val2'].forEach(function(k){
        if(!String(r[k]||'').trim()) flag(g.id,'CMP','row['+ix+'] '+(r.label||'?')+' '+k+' empty');
      });
      if((r.val1&&!r.val1_es)||(r.val2&&!r.val2_es)) flag(g.id,'CMP','row['+ix+'] '+(r.label||'?')+' missing _es (EN+ES rule)');
    });
  }
});

// ---------- C. PROS/CONS ----------
var seen={};
A.forEach(function(g){
  (g.verdictProsCons||[]).forEach(function(v){
    var pros=v.pros||[], cons=v.cons||[];
    if(!pros.length) flag(g.id,'PC','no pros: '+(v.name||'?').slice(0,40));
    if(!cons.length) flag(g.id,'PC','no cons: '+(v.name||'?').slice(0,40));
    pros.forEach(function(p){ cons.forEach(function(c){ if(p&&c&&p.trim()===c.trim()) flag(g.id,'PC','same text in pros+cons: '+p.slice(0,50)); }); });
    pros.concat(cons).forEach(function(t){
      if(!t) return;
      var k=t.trim().toLowerCase();
      seen[k]=seen[k]||{n:0,guides:{}};
      seen[k].n++; seen[k].guides[g.id]=1;
    });
  });
});
Object.keys(seen).forEach(function(k){
  if(seen[k].n>=4&&k.length>20) flag('GLOBAL','PC-BOILER','"'+k.slice(0,60)+'..." reused x'+seen[k].n+' in '+Object.keys(seen[k].guides).slice(0,6).join(','));
});

// ---------- D. FAQ near-duplicates ----------
function norm(s){ return String(s||'').toLowerCase().replace(/[^a-z0-9áéíóúñü ]/gi,' ').replace(/\s+/g,' ').trim(); }
function jac(a,b){
  var A={},B={},ia=norm(a).split(' '),ib=norm(b).split(' ');
  ia.forEach(function(w){A[w]=1;}); ib.forEach(function(w){B[w]=1;});
  var inter=0,uni=0;
  Object.keys(A).forEach(function(w){ if(B[w])inter++; });
  uni=Object.keys(A).length+Object.keys(B).length-inter;
  return uni?inter/uni:0;
}
A.forEach(function(g){
  var qs=[];
  var f=g.featuredSnippet;
  if(f) for(var i=1;i<=5;i++){ if(f['faq_q'+i+'_en'])qs.push('fsn_en'+i+':'+f['faq_q'+i+'_en']); if(f['faq_q'+i+'_es'])qs.push('fsn_es'+i+':'+f['faq_q'+i+'_es']); }
  (g.faq||[]).forEach(function(q,ix){ if(q.q)qs.push('faq_en'+ix+':'+q.q); if(q.q_es)qs.push('faq_es'+ix+':'+q.q_es); });
  for(var a=0;a<qs.length;a++) for(var b=a+1;b<qs.length;b++){
    var ka=qs[a].split(':')[0], kb=qs[b].split(':')[0];
    if(ka.slice(0,3)!==kb.slice(0,3)||ka.replace(/[0-9]/g,'')!==kb.replace(/[0-9]/g,'')) {
      // only compare same-lang pairs
      var la=ka.indexOf('_es')>=0?'es':'en', lb=kb.indexOf('_es')>=0?'es':'en';
      if(la!==lb) continue;
      var j=jac(qs[a].split(':').slice(1).join(':'),qs[b].split(':').slice(1).join(':'));
      if(j>=0.55) flag(g.id,'FAQ-DUP',ka+' ~ '+kb+' (j='+j.toFixed(2)+')');
    }
  }
});

var kinds={};
R.forEach(function(r){ var k=(r.match(/\[(.*?)\]/)||[])[1]; kinds[k]=(kinds[k]||0)+1; });
var out=['TOTAL FLAGS: '+R.length,'BY KIND: '+JSON.stringify(kinds),''].concat(R);
fs.writeFileSync('temp/cons_patch/audit_report.txt', out.join('\n'),'utf8');
console.log('flags='+R.length+' kinds='+JSON.stringify(kinds));
