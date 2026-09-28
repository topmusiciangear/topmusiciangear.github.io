var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var P=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var PC={}; P.forEach(function(p){ PC[p.id]=p; });

var issues=[];

function add(gid, field, type, msg, snippet){
  issues.push(gid+' | '+field+' | '+type+' | '+msg+' | "'+snippet.slice(0,100)+'"');
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

  // 1. Translation issues in ES - ONLY real ones (not false positives like "home studio")
  var real_es_issues = [
    {re:/\bgrabar a un (DAW|Mac|iPad|iPhone|PC)\b/gi, desc:'"a un DAW" -> "en un DAW"'},
    {re:/\bvia (USB|Bluetooth|Thunderbolt|Wi.?Fi)\b/gi, desc:'"via" -> "vía"'},
    {re:/\bcancelacion\b/gi, desc:'falta tilde: cancelación'},
    {re:/\bconfiguracion\b/gi, desc:'falta tilde: configuración'},
    {re:/\bopcion\b/gi, desc:'falta tilde: opción'},
    {re:/\binformacion\b/gi, desc:'falta tilde: información'},
    {re:/\bsolucion\b/gi, desc:'falta tilde: solución'},
    {re:/\bversion\b/gi, desc:'falta tilde: versión'},
    {re:/\bcondicion\b/gi, desc:'falta tilde: condición'},
    {re:/\brazon\b/gi, desc:'falta tilde: razón'},
    {re:/\bfuncion\b/gi, desc:'falta tilde: función'},
    {re:/\baplicacion\b/gi, desc:'falta tilde: aplicación'},
    {re:/\bseleccion\b/gi, desc:'falta tilde: selección'},
    {re:/\bdescripcion\b/gi, desc:'falta tilde: descripción'},
    {re:/\bmicrofono\b/gi, desc:'falta tilde: micrófono'},
    {re:/\bes el mejor para\b/gi, desc:'"es el mejor para" -> "es ideal para"'},
    {re:/\ba un (DAW|Mac|iPad|iPhone|PC)\b/gi, desc:'"a un DAW" -> "en un DAW"'},
    {re:/\bplug.and.play\b/gi, desc:'formato: plug-and-play'},
    {re:/\bclass.compliant\b/gi, desc:'término técnico: class-compliant (ok mantener)'},
    {re:/\bmid.range\b/gi, desc:'anglicismo: "gama media"'},
    {re:/\bhigh.end\b/gi, desc:'anglicismo: "gama alta"'},
    {re:/\blow.end\b/gi, desc:'anglicismo: "gama baja"'},
    {re:/\bpro.audio\b/gi, desc:'anglicismo: "audio pro"'},
    {re:/\bwork.flow\b/gi, desc:'anglicismo: "flujo de trabajo"'},
    {re:/\bset.up\b/gi, desc:'anglicismo: "configuración"'},
    {re:/\bgear\b/gi, desc:'anglicismo: "equipo"'},
    {re:/\brig\b/gi, desc:'anglicismo: "equipo/rack"'},
  ];
  real_es_issues.forEach(function(ei){
    var matches = txt_es.match(ei.re);
    if(matches){
      matches.forEach(function(m){
        add(id, 'prose_es', 'TRANSLATION', ei.desc+' | found: "'+m+'"', m);
      });
    }
  });

  // 2. Price in prose that contradicts table for SAME product
  if(g.productTable && g.productTable.rows){
    var priceRow = g.productTable.rows.find(function(r){return /precio|price/i.test(r.label||'');});
    if(priceRow){
      priceRow.values.forEach(function(v,cx){
        var col = g.productTable.columns[cx];
        if(col && v.value){
          var prodName = col.title;
          var priceInTable = v.value;
          // Only check if product name appears in prose near a price
          var re = new RegExp(prodName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'[^$€£]{0,80}[\\$€£][\\d,]+', 'gi');
          var match = txt_en.match(re) || txt_es.match(re);
          if(match){
            var priceInProse = match[0].match(/[\$€£][\d,]+/);
            if(priceInProse){
              var valTable = parseFloat(priceInTable.replace(/[^\d.]/g,''));
              var valProse = parseFloat(priceInProse[0].replace(/[^\d.]/g,''));
              if(valTable && valProse && Math.abs(valTable-valProse) > Math.max(5, valTable*0.1)){
                add(id, 'prose', 'PRICE-CONTRA', 'Prose '+priceInProse[0]+' vs table '+priceInTable+' for '+col.title, match[0].slice(0,100));
              }
            }
          }
        }
      });
    }
  }

  // 3. "Best for" / "Ideal para" contradictions
  if(g.productTable && g.productTable.rows){
    var bfRow = g.productTable.rows.find(function(r){return /best for|ideal para/i.test(r.label||'');});
    if(bfRow){
      bfRow.values.forEach(function(v,cx){
        var col = g.productTable.columns[cx];
        if(col && v.value){
          var prodName = col.title;
          var bestForTable = v.value;
          var re = new RegExp(prodName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'[^\\.]{0,100}?(best for|ideal para|ideal for|mejor para)[^\\.]{0,50}', 'gi');
          var match = txt_en.match(re) || txt_es.match(re);
          if(match && !match[0].toLowerCase().includes(bestForTable.toLowerCase().slice(0,20))){
            add(id, 'prose', 'BESTFOR-CONTRA', 'Table says "'+bestForTable+'" but prose says different for '+col.title, match[0].slice(0,100));
          }
        }
      });
    }
  }

  // 4. Technical contradictions: specific known wrong claims
  var known_wrong = [
    {guide:'best-monitors', re:/front.ported/gi, desc:'HS8 is rear-ported, not front-ported'},
    {guide:'hs8-vs-rokit-7', re:/front.ported/gi, desc:'HS8 is rear-ported'},
    {guide:'katana-vs-dsl', re:/twelve amp|12 amp/gi, desc:'Katana 50 has 6 amp types, not 12'},
    {guide:'katana-vs-dsl', re:/100W.*50W.*0\.5W/gi, desc:'Katana 50 is 50W/25W/0.5W, not 100W/50W'},
    {guide:'katana-vs-dsl', re:/5.inch|5.inch speaker/gi, desc:'Katana 50 has 1x12" speaker, not 5"'},
    {guide:'blues-junior-vs-ac30', re:/40.watt|40W/gi, desc:'Blues Junior IV is 15W, not 40W'},
    {guide:'rme-vs-motu', re:/class.compliant.*no drivers/gi, desc:'RME requires drivers for low latency'},
    {guide:'apollo-vs-babyface', re:/dual headphone outputs/gi, desc:'Apollo Twin X has single headphone output'},
    {guide:'scarlett-vs-motu', re:/Air mode all.or.nothing/gi, desc:'Air is selectable per channel on 4th Gen'},
    {guide:'budget-interfaces', re:/built.in 76 compressor/gi, desc:'Volt 2 has no 76 compressor (only Volt 276)'},
    {guide:'best-monitors', re:/IN.8 V2.*2.way|8010A.*3.way/gi, desc:'IN-8 V2 is 3-way, 8010A is 2-way'},
    {guide:'open-headphones', re:/DT 990 Pro.*Detachable.*coiled/gi, desc:'DT 990 Pro has fixed coiled cable, not detachable'},
    {guide:'rme-vs-motu', re:/external power supply|USB connection alone does not power/gi, desc:'Babyface Pro FS is USB bus-powered'},
    {guide:'best-live-sound-mixers', re:/X32 Compact.*32 MIDAS preamps/gi, desc:'X32 Compact has 16 MIDAS preamps'},
    {guide:'best-digital-mixers', re:/X32 Compact.*32 MIDAS preamps/gi, desc:'X32 Compact has 16 MIDAS preamps'},
    {guide:'katana-vs-dsl', re:/5.inch|5.inch speaker/gi, desc:'Katana 50 has 1x12" speaker'},
    {guide:'budget-interfaces', re:/Volt 2.*76 compressor/gi, desc:'Volt 2 has no 76 compressor'},
  ];
  known_wrong.forEach(function(kw){
    if(kw.guide===id){
      var match = txt_en.match(kw.re) || txt_es.match(kw.re);
      if(match){
        add(id, 'prose', 'TECH-ERROR', kw.desc+' | found: "'+match[0]+'"', match[0].slice(0,100));
      }
    }
  });

  // 5. EN/ES consistency: same claim in both languages
  // Check if EN has a specific claim that ES doesn't (or vice versa)
  var en_sentences = txt_en.split(/[.!?]+/).filter(function(s){return s.trim().length>20;});
  var es_sentences = txt_es.split(/[.!?]+/).filter(function(s){return s.trim().length>20;});
  // Only flag if one language has a specific technical claim the other lacks
  // (simplified: just count sentences)
  if(Math.abs(en_sentences.length - es_sentences.length) > 5){
    add(id, 'prose', 'EN-ES-LENGTH', 'EN sentences: '+en_sentences.length+' ES: '+es_sentences.length, 'length mismatch');
  }
});

var filtered = issues.filter(function(i){
  // Filter out low-priority
  return !i.includes('TRANSLATION') || i.includes('falta tilde') || i.includes('vía') || i.includes('a un DAW') || i.includes('es ideal para');
});

fs.writeFileSync('temp/cons_patch/text_issues2.txt', filtered.join('\n'),'utf8');
console.log('Total issues (filtered): '+filtered.length);
if(filtered.length>0) console.log(filtered.slice(0,50).join('\n'));