var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
function G(id){ return A.find(function(x){return x&&x.id===id;}); }
var fixed=0;

function fixInText(obj, field, search, replace){
  if(obj[field] && obj[field].includes(search)){
    obj[field] = obj[field].split(search).join(replace);
    fixed++;
    return true;
  }
  return false;
}

// 1. rme-vs-motu: fix "class-compliant, so you plug it in and record — no drivers needed" for RME (section 4: Windows or Mac)
var rme = G('rme-vs-motu');
if(rme && rme.sections){
  var sec4 = rme.sections.find(function(s){return /Windows or Mac|Windows o Mac/i.test(s.heading||'');});
  if(sec4){
    // EN: "class-compliant, so you plug it in and record — no drivers needed"
    fixInText(sec4, 'content', 'class-compliant, so you plug it in and record — no drivers needed', 'class-compliant on Mac (plug in and record), but on Windows RME\'s own drivers are required for full low-latency performance');
    fixInText(sec4, 'content_es', 'class-compliant, la conectas y grabas — sin drivers', 'class-compliant en Mac (conectas y grabas), pero en Windows los drivers propios de RME son necesarios para rendimiento de baja latencia completo');
    // Also fix "external power supply" con
    var vpc = rme.verdictProsCons.find(function(v){return /Babyface/i.test(v.name||'');});
    if(vpc){
      vpc.cons = (vpc.cons||[]).map(function(c){return c.replace(/Requires an external power supply — the USB connection alone does not power it/,'USB bus-powered — no external power supply needed').replace(/Requiere una fuente de alimentación externa — la conexión USB por sí sola no lo alimenta/,'Alimentación por USB — no necesita fuente externa');});
      vpc.cons_es = (vpc.cons_es||[]).map(function(c){return c.replace(/Requiere una fuente de alimentación externa — la conexión USB por sí sola no lo alimenta/,'Alimentación por USB — no necesita fuente externa');});
    }
  }
}

// 2. katana-vs-dsl: fix "twelve amp" -> "six amp", "100W/50W/0.5W" -> "50W/25W/0.5W", "5-inch" -> "1x12\""
var kat = G('katana-vs-dsl');
if(kat){
  // Intro
  fixInText(kat, 'intro', 'twelve amp characters', 'six amp types');
  fixInText(kat, 'intro_es', 'doce caracteres de amplificador', 'seis tipos de amplificador');
  fixInText(kat, 'intro', '100W/50W/0.5W', '50W/25W/0.5W');
  fixInText(kat, 'intro_es', '100W/50W/0.5W', '50W/25W/0.5W');
  fixInText(kat, 'intro', '5-inch speaker', '1x12" speaker');
  fixInText(kat, 'intro_es', 'altavoz de 5 pulgadas', 'altavoz de 12 pulgadas');
  // Section 1 (Katana)
  var sec1 = kat.sections.find(function(s){return /Katana/i.test(s.heading||'');});
  if(sec1){
    fixInText(sec1, 'content', 'twelve amp characters', 'six amp types');
    fixInText(sec1, 'content_es', 'doce caracteres de amplificador', 'seis tipos de amplificador');
    fixInText(sec1, 'content', '100W/50W/0.5W', '50W/25W/0.5W');
    fixInText(sec1, 'content_es', '100W/50W/0.5W', '50W/25W/0.5W');
    fixInText(sec1, 'content', '5-inch speaker', '1x12" speaker');
    fixInText(sec1, 'content_es', 'altavoz de 5 pulgadas', 'altavoz de 12 pulgadas');
  }
  // VPC
  var vpcKat = kat.verdictProsCons.find(function(v){return /Katana/i.test(v.name||'');});
  if(vpcKat){
    vpcKat.pros = (vpcKat.pros||[]).map(function(p){return p.replace(/twelve amp types/gi,'six amp types').replace(/100W.*50W.*0\.5W/gi,'50W / 25W / 0.5W');});
    vpcKat.pros_es = (vpcKat.pros_es||[]).map(function(p){return p.replace(/doce caracteres de amplificador/gi,'seis tipos de amplificador').replace(/100W.*50W.*0\.5W/gi,'50W / 25W / 0.5W').replace(/5.pulgadas|5\"|5-inch/gi,'12 pulgadas');});
    vpcKat.cons = (vpcKat.cons||[]).map(function(c){return c.replace(/5.inch speaker|5-inch/gi,'1x12" speaker');});
    vpcKat.cons_es = (vpcKat.cons_es||[]).map(function(c){return c.replace(/altavoz de 5 pulgadas|5.pulgadas/gi,'altavoz de 12 pulgadas');});
  }
  // VPC DSL - already correct
}

// 3. blues-junior-vs-ac30: "40-watt" -> "15-watt"
var bj = G('blues-junior-vs-ac30');
if(bj){
  fixInText(bj, 'intro', '40-watt output', '15-watt output');
  fixInText(bj, 'intro_es', '40-watt', '15-watt');
  fixInText(bj, 'intro', '40W', '15W');
  fixInText(bj, 'intro_es', '40W', '15W');
  // Section
  var sec = bj.sections.find(function(s){return /Blues Junior/i.test(s.heading||'');});
  if(sec){
    fixInText(sec, 'content', '40-watt output', '15-watt output');
    fixInText(sec, 'content_es', '40-watt', '15-watt');
    fixInText(sec, 'content', '40W', '15W');
    fixInText(sec, 'content_es', '40W', '15W');
  }
  // VPC
  var vpcBJ = bj.verdictProsCons.find(function(v){return /Blues Junior/i.test(v.name||'');});
  if(vpcBJ){
    vpcBJ.pros = (vpcBJ.pros||[]).map(function(p){return p.replace(/40-watt output/gi,'15-watt output').replace(/40W/gi,'15W');});
    vpcBJ.pros_es = (vpcBJ.pros_es||[]).map(function(p){return p.replace(/40-watt/gi,'15-watt').replace(/40W/gi,'15W');});
  }
}

// 4. best-monitors: IN-8 V2 / 8010A type (already fixed in table, but check prose)
var bm = G('best-monitors');
if(bm){
  // Section for IN-8 V2
  var secIN8 = bm.sections.find(function(s){return /IN-8/i.test(s.heading||'');});
  if(secIN8){
    fixInText(secIN8, 'content', '2-way', '3-way');
    fixInText(secIN8, 'content_es', 'Biamplificado de 2 vías', 'Triamplificado de 3 vías');
  }
  var sec8010 = bm.sections.find(function(s){return /8010/i.test(s.heading||'');});
  if(sec8010){
    fixInText(sec8010, 'content', '3-way', '2-way');
    fixInText(sec8010, 'content_es', 'Triamplificado de 3 vías', 'Biamplificado de 2 vías');
  }
}

// 5. open-headphones: DT 990 cable (already fixed in table, check prose)
var oh = G('open-headphones');
if(oh){
  var secDT = oh.sections.find(function(s){return /DT 990/i.test(s.heading||'');});
  if(secDT){
    fixInText(secDT, 'content', 'Detachable (coiled', 'Fixed 3m coiled');
    fixInText(secDT, 'content_es', 'Desmontable (en espiral', 'Fijo 3 m en espiral');
  }
}

// 6. best-live-sound-mixers / best-digital-mixers: X32 preamps in prose
['best-live-sound-mixers','best-digital-mixers'].forEach(function(id){
  var g = G(id);
  if(g){
    // Check all sections for "32 MIDAS preamps" for X32
    g.sections.forEach(function(s){
      fixInText(s, 'content', '32 MIDAS preamps', '16 MIDAS preamps (32 channels total)');
      fixInText(s, 'content_es', '32 previos MIDAS', '16 previos MIDAS (32 canales totales)');
    });
    // VPC
    var vpcX32 = g.verdictProsCons.find(function(v){return /X32 Compact/i.test(v.name||'');});
    if(vpcX32){
      vpcX32.pros = (vpcX32.pros||[]).map(function(p){return p.replace(/32 MIDAS preamps/gi,'16 MIDAS preamps (32 channels total)');});
      vpcX32.pros_es = (vpcX32.pros_es||[]).map(function(p){return p.replace(/32 previos MIDAS/gi,'16 previos MIDAS (32 canales totales)');});
      vpcX32.cons = (vpcX32.cons||[]).map(function(c){return c.replace(/32 MIDAS preamps/gi,'16 MIDAS preamps (32 channels total)');});
      vpcX32.cons_es = (vpcX32.cons_es||[]).map(function(c){return c.replace(/32 previos MIDAS/gi,'16 previos MIDAS (32 canales totales)');});
    }
  }
});

// 7. best-reverb-delay: DD-8 and HOF2 stereo (already in table, check prose)
var brd = G('best-reverb-delay');
if(brd){
  brd.sections.forEach(function(s){
    fixInText(s, 'content', 'mono in/out', 'stereo in/out');
    fixInText(s, 'content_es', 'mono in/out', 'estéreo in/out');
  });
}

// 8. best-digital-mixers / best-compact-mixers: "Best For" prose mismatches (minor, just ensure consistency)

// 9. best-beginner-electric-guitar: BESTFOR-CONTRA - minor, prose just elaborates table

// 10. best-ribbon-mics: BESTFOR-CONTRA - minor

// 11. scarlett-vs-motu: "Air mode all-or-nothing" -> "Air selectable per channel"
var sv = G('scarlett-vs-motu');
if(sv){
  sv.sections.forEach(function(s){
    fixInText(s, 'content', 'Air mode all-or-nothing both inputs', 'Air selectable per channel on 4th Gen');
    fixInText(s, 'content_es', 'Air mode all-or-nothing both inputs', 'Air seleccionable por canal en 4ª Gen');
  });
  var vpcSc = sv.verdictProsCons.find(function(v){return /Scarlett/i.test(v.name||'');});
  if(vpcSc){
    vpcSc.cons = (vpcSc.cons||[]).map(function(c){return c.replace(/Air mode all.or.nothing both inputs/gi,'Air selectable per channel on 4th Gen');});
    vpcSc.cons_es = (vpcSc.cons_es||[]).map(function(c){return c.replace(/Air mode all.or.nothing both inputs/gi,'Air seleccionable por canal en 4ª Gen');});
  }
}

// 12. budget-interfaces: Volt 2 76 compressor
var bi = G('budget-interfaces');
if(bi){
  bi.sections.forEach(function(s){
    fixInText(s, 'content', 'built-in 76 compressor', 'no 76 compressor (only Volt 276 has it)');
    fixInText(s, 'content_es', '76 compressor incorporado', 'sin 76 compressor (solo Volt 276 lo tiene)');
  });
}

// 13. hs8-vs-rokit-7: front-ported -> rear-ported
var hvr = G('hs8-vs-rokit-7');
if(hvr){
  hvr.sections.forEach(function(s){
    fixInText(s, 'content', 'front-ported', 'rear-ported');
    fixInText(s, 'content_es', 'puerto frontal', 'puerto trasero');
  });
}

// 14. budget-pa-systems: Alto TS412 power/SPL (table fixed, check prose)
var bpa = G('budget-pa-systems');
if(bpa){
  bpa.sections.forEach(function(s){
    fixInText(s, 'content', '2000W peak', '2500W peak');
    fixInText(s, 'content_es', '2000W pico', '2500W pico');
    fixInText(s, 'content', '129dB', '132dB');
    fixInText(s, 'content_es', '129dB', '132dB');
  });
  // DBR12
  bpa.sections.forEach(function(s){
    fixInText(s, 'content', '2000W peak', '1000W peak');
    fixInText(s, 'content_es', '2000W pico', '1000W pico');
  });
  // Thump215XT driver
  bpa.sections.forEach(function(s){
    fixInText(s, 'content', '1.4-inch HF', '1-inch compression driver');
    fixInText(s, 'content_es', '1.4 pulgadas HF', 'driver de compresión de 1 pulgada');
  });
}

// 15. Translation fixes: "a un DAW" -> "en un DAW" in several guides
['rode-wireless-pro-vs-dji-mic-2','mics-for-creators','streaming-interfaces','best-mic-for-podcasting'].forEach(function(id){
  var g = G(id);
  if(g){
    ['intro_es','verdict_es','conclusion_es'].forEach(function(f){
      if(g[f]) g[f] = g[f].replace(/\ba un (DAW|Mac|iPad|iPhone|PC)\b/gi, 'en un $1');
    });
    g.sections.forEach(function(s){
      if(s.content_es) s.content_es = s.content_es.replace(/\ba un (DAW|Mac|iPad|iPhone|PC)\b/gi, 'en un $1');
    });
  }
});

// 16. "es el mejor para" -> "es ideal para"
A.forEach(function(g){
  ['intro_es','verdict_es','conclusion_es'].forEach(function(f){
    if(g[f]) g[f] = g[f].replace(/\bes el mejor para\b/gi, 'es ideal para');
  });
  g.sections.forEach(function(s){
    if(s.content_es) s.content_es = s.content_es.replace(/\bes el mejor para\b/gi, 'es ideal para');
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(A,null,2),'utf8');
console.log('Critical text fixes applied: '+fixed);