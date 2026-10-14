var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
function G(id){ return A.find(function(x){return x&&x.id===id;}); }
var changed=0;
function set(obj,key,val,tag){ if(obj[key]!==val){ obj[key]=val; changed++; } }

// ---- 1. GLOBAL safe label_es map (comparison rows + featuredSnippet specs) ----
var LABEL_MAP={
  "Rango Din\u00e1mico":"Rango din\u00e1mico",
  "Tasa de Muestreo":"Tasa de muestreo",
  "Frecuencia de Muestreo":"Frecuencia de muestreo",
  "Ganancia de Preamplificador":"Ganancia de preamplificador",
  "Caracter\u00edsticas Especiales":"Caracter\u00edsticas especiales",
  "Ideal Para":"Ideal para"
};
A.forEach(function(g){
  if(g.comparison&&g.comparison.rows) g.comparison.rows.forEach(function(r){
    if(LABEL_MAP[r.label_es]){ r.label_es=LABEL_MAP[r.label_es]; changed++; }
  });
  if(g.featuredSnippet&&Array.isArray(g.featuredSnippet.specs)) g.featuredSnippet.specs.forEach(function(s){
    if(LABEL_MAP[s.label_es]){ s.label_es=LABEL_MAP[s.label_es]; changed++; }
  });
});

// ---- 2. GLOBAL product-name corruption: "pro fS" -> "Pro FS" in ES strings ----
function fixProFs(s){ return String(s||'').replace(/pro fS/g,'Pro FS'); }
A.forEach(function(g){
  ['title_es','titleTag_es'].forEach(function(k){ if(typeof g[k]==='string'&&/pro fS/.test(g[k])){ g[k]=fixProFs(g[k]); changed++; } });
  if(g.sections) g.sections.forEach(function(sec){
    ['h_es','heading_es'].forEach(function(k){ if(typeof sec[k]==='string'&&/pro fS/.test(sec[k])){ sec[k]=fixProFs(sec[k]); changed++; } });
  });
  var fsn=g.featuredSnippet;
  if(fsn){ Object.keys(fsn).forEach(function(k){ if(typeof fsn[k]==='string'&&/pro fS/.test(fsn[k])){ fsn[k]=fixProFs(fsn[k]); changed++; } }); }
});

// ---- 3. rme-vs-motu ----
var r=G('rme-vs-motu');
if(r){
  set(r,'titleTag_es','Interfaz de audio: \u00bfvale la pena pagar m\u00e1s?');
  if(r.featuredSnippet){
    set(r.featuredSnippet,'key1_es','Drivers legendarios y estabilidad SteadyClock FS');
    set(r.featuredSnippet,'key2_es','DAC ESS Sabre32 Ultra y loopback por hardware');
    set(r.featuredSnippet,'faq_q1_es','Soy ingeniero de sesi\u00f3n y no quiero que un driver falle a mitad de grabaci\u00f3n \u2014 \u00bfvale la pena pagar 4 veces m\u00e1s por el RME que por el MOTU por esa tranquilidad?');
  }
}

// ---- 4. premium-interfaces ----
var p=G('premium-interfaces');
if(p){
  set(p,'title_es','Las 6 mejores interfaces de audio premium para estudios pro (2026)');
  set(p,'titleTag_es','6 mejores interfaces de audio premium para estudios pro (2026) \u2014 Comparativa');
  if(p.featuredSnippet) set(p.featuredSnippet,'title_es','Interfaces premium comparadas: 6 elecciones insignia');
  var H={
    0:'Por qu\u00e9 pagas en una interfaz premium',
    1:'\u00bfEs la Neumann MT 48 la mejor interfaz premium de sobremesa para audio en red?',
    2:'\u00bfEs la Audient ORIA el mejor controlador inmersivo para Dolby Atmos?',
    3:'\u00bfEs la Universal Audio Apollo x8p Gen 2 la mejor interfaz para grabar con UAD?',
    4:'\u00bfEs la RME Fireface UFX III la interfaz m\u00e1s fiable para giras?',
    5:'\u00bfEs la Apogee Symphony I/O Mk II 16\u00d716 SE la mejor interfaz modular para estudios que crecen?',
    6:'\u00bfEs la Lynx Aurora-n 16 (USB) el mejor conversor para mastering transparente?'
  };
  if(p.sections) p.sections.forEach(function(sec,i){ if(H[i]!==undefined&&sec.h_es!==H[i]){ sec.h_es=H[i]; changed++; } });
}

fs.writeFileSync('data/guides.json', JSON.stringify(A,null,2),'utf8');
console.log('changed_fields='+changed);
