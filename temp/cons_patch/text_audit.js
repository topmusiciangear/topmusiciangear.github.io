var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var P=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var PC={}; P.forEach(function(p){ PC[p.id]=p; });

var issues=[];

function add(gid, field, type, msg, snippet){
  issues.push(gid+' | '+field+' | '+type+' | '+msg+' | "'+snippet.slice(0,80)+'"');
}

A.forEach(function(g){
  var id=g.id;
  var txt_en = (g.intro||'') + ' ' + (g.verdict||'') + ' ' + (g.conclusion||'');
  var txt_es = (g.intro_es||'') + ' ' + (g.verdict_es||'') + (g.conclusion_es||'');
  var sections = g.sections||[];
  sections.forEach(function(s,i){
    txt_en += ' ' + (s.content||'');
    txt_es += ' ' + (s.content_es||'');
  });

  // 1. Price mentions in prose vs catalog
  var price_matches_en = txt_en.match(/\$[\d,]+\.?\d*/g)||[];
  var price_matches_es = txt_es.match(/[\$€£][\d,]+\.?\d*/g)||[];
  price_matches_en.concat(price_matches_es).forEach(function(pm){
    var val = parseFloat(pm.replace(/[^\d.]/g,''));
    // Check if this price matches any featured product
    var feat = (g.featuredProducts||[]).map(function(pid){return PC[pid]?PC[pid].price:null;}).filter(Boolean);
    var close = feat.some(function(fp){ return Math.abs(fp-val) < Math.max(5, fp*0.05); });
    if(!close && val > 10){
      add(id, 'prose', 'PRICE-MISMATCH', 'Price '+pm+' not matching any featured product ('+feat.join(',')+')', pm);
    }
  });

  // 2. Spec numbers in prose that might be wrong
  var spec_patterns = [
    {re:/\b(\d+(?:\.\d+)?)\s*(?:w|W|watts?)\b/gi, label:'wattage'},
    {re:/\b(\d+(?:\.\d+)?)\s*(?:ohm|Ω)\b/gi, label:'impedance'},
    {re:/\b(\d+(?:\.\d+)?)\s*dB\b/gi, label:'dB'},
    {re:/\b(\d+(?:\.\d+)?)\s*(?:Hz|kHz|MHz)\b/gi, label:'frequency'},
    {re:/\b(\d+(?:\.\d+)?)\s*(?:ms|milliseconds?)\b/gi, label:'latency'},
    {re:/\b(\d+(?:\.\d+)?)\s*(?:kg|lb|lbs)\b/gi, label:'weight'},
  ];
  spec_patterns.forEach(function(sp){
    var matches = txt_en.match(sp.re)||[];
    matches.forEach(function(m){
      // Just flag for review - hard to auto-verify
    });
  });

  // 3. Common translation issues in ES
  var es_issues = [
    {re:/\bgrabar a un DAW\b/gi, fix:'grabar en un DAW', desc:'"a un DAW" -> "en un DAW"'},
    {re:/\bvia USB\b/gi, fix:'vía USB', desc:'"via" sin tilde'},
    {re:/\bvia Bluetooth\b/gi, fix:'vía Bluetooth', desc:'"via" sin tilde'},
    {re:/\bvia Thunderbolt\b/gi, fix:'vía Thunderbolt', desc:'"via" sin tilde'},
    {re:/\bcancelacion\b/gi, fix:'cancelación', desc:'falta tilde'},
    {re:/\bconfiguracion\b/gi, fix:'configuración', desc:'falta tilde'},
    {re:/\bopcion\b/gi, fix:'opción', desc:'falta tilde'},
    {re:/\binformacion\b/gi, fix:'información', desc:'falta tilde'},
    {re:/\bsolucion\b/gi, fix:'solución', desc:'falta tilde'},
    {re:/\bversion\b/gi, fix:'versión', desc:'falta tilde'},
    {re:/\bcondicion\b/gi, fix:'condición', desc:'falta tilde'},
    {re:/\brazon\b/gi, fix:'razón', desc:'falta tilde'},
    {re:/\bfuncion\b/gi, fix:'función', desc:'falta tilde'},
    {re:/\baplicacion\b/gi, fix:'aplicación', desc:'falta tilde'},
    {re:/\bseleccion\b/gi, fix:'selección', desc:'falta tilde'},
    {re:/\bdescripcion\b/gi, fix:'descripción', desc:'falta tilde'},
    {re:/\bmicrofono\b/gi, fix:'micrófono', desc:'falta tilde'},
    {re:/\bcancelación de ruido\b/gi, fix:'cancelación de ruido', desc:'ok'},
    {re:/\bes el mejor para\b/gi, fix:'es ideal para', desc:'"es el mejor para" suena literal'},
    {re:/\ba un (DAW|Mac|iPad|iPhone|PC)\b/gi, fix:'en un $1', desc:'"a un DAW" -> "en un DAW"'},
    {re:/\bplug.and.play\b/gi, fix:'plug-and-play', desc:'formato'},
    {re:/\bclass.compliant\b/gi, fix:'class-compliant', desc:'formato'},
    {re:/\bmid.range\b/gi, fix:'gama media', desc:'anglicismo'},
    {re:/\bhigh.end\b/gi, fix:'gama alta', desc:'anglicismo'},
    {re:/\blow.end\b/gi, fix:'gama baja', desc:'anglicismo'},
    {re:/\bpro.audio\b/gi, fix:'audio pro', desc:'anglicismo'},
    {re:/\bhome.studio\b/gi, fix:'home studio', desc:'anglicismo'},
    {re:/\bwork.flow\b/gi, fix:'flujo de trabajo', desc:'anglicismo'},
    {re:/\bset.up\b/gi, fix:'configuración', desc:'anglicismo'},
    {re:/\bgear\b/gi, fix:'equipo', desc:'anglicismo'},
    {re:/\brig\b/gi, fix:'equipo/rack', desc:'anglicismo'},
  ];
  es_issues.forEach(function(ei){
    var matches = txt_es.match(ei.re);
    if(matches){
      matches.forEach(function(m){
        add(id, 'prose_es', 'TRANSLATION', ei.desc+' | found: "'+m+'" | suggested: "'+ei.fix+'"', m);
      });
    }
  });

  // 4. Contradictions between prose and table
  // Check if prose says "X has Y" but table says different
  if(g.productTable && g.productTable.rows){
    var priceRow = g.productTable.rows.find(function(r){return /precio|price/i.test(r.label||'');});
    if(priceRow){
      priceRow.values.forEach(function(v,cx){
        var col = g.productTable.columns[cx];
        if(col && v.value){
          var prodName = col.title;
          var priceInTable = v.value;
          // Check if prose mentions different price for this product
          var re = new RegExp(prodName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'[^$]*?(\\$[\\d,]+)', 'i');
          var match = txt_en.match(re) || txt_es.match(re);
          if(match){
            var priceInProse = match[1];
            var valTable = parseFloat(priceInTable.replace(/[^\d.]/g,''));
            var valProse = parseFloat(priceInProse.replace(/[^\d.]/g,''));
            if(valTable && valProse && Math.abs(valTable-valProse) > Math.max(1, valTable*0.05)){
              add(id, 'prose', 'PRICE-CONTRA', 'Prose price '+priceInProse+' vs table '+priceInTable+' for '+prodName, match[0].slice(0,80));
            }
          }
        }
      });
    }
  }

  // 5. "Best for" / "Ideal para" inconsistencies
  if(g.productTable && g.productTable.rows){
    var bfRow = g.productTable.rows.find(function(r){return /best for|ideal para/i.test(r.label||'');});
    if(bfRow){
      bfRow.values.forEach(function(v,cx){
        var col = g.productTable.columns[cx];
        if(col && v.value){
          var prodName = col.title;
          var bestFor = v.value;
          // Check if prose contradicts
          var re = new RegExp(prodName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'[^\\.]*?(best for|ideal para|ideal for|mejor para)', 'i');
        }
      });
    }
  }

// 6. Check featuredSnippet specs vs productTable
  if(g.featuredSnippet && g.featuredSnippet.specs && Array.isArray(g.featuredSnippet.specs)){
    g.featuredSnippet.specs.forEach(function(spec){
      var label = spec.label_en || spec.label_es;
      var val1 = spec.val1 || spec.v1;
      var val2 = spec.val2 || spec.v2;
      // Could cross-check with productTable rows
    });
  }
});

fs.writeFileSync('temp/cons_patch/text_issues.txt', issues.join('\n'),'utf8');
console.log('Total issues found: '+issues.length);
if(issues.length>0) console.log(issues.slice(0,30).join('\n'));