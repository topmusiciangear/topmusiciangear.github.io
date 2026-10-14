var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var PAIRS=[
["Para","para"],["Audio","audio"],["Frecuencia","frecuencia"],["Cu\u00e1l","cu\u00e1l"],
["Mejor","mejor"],["Mejores","mejores"],["Lo","lo"],["Del","del"],["De","de"],["En","en"],
["Esta","esta"],["Cada","cada"],["Qu\u00e9","qu\u00e9"],["Los","los"],["Las","las"],["El","el"],
["Precio","precio"],["Salida","salida"],["Salidas","salidas"],["Ideal","ideal"],
["Mezcla","mezcla"],["Bater\u00eda","bater\u00eda"],["Bajo","bajo"],["Bajos","bajos"],
["Entradas","entradas"],["Grabaci\u00f3n","grabaci\u00f3n"],["Comparativa","comparativa"],
["Duelo","duelo"],["Medio","medio"],["Potencia","potencia"],["Respuesta","respuesta"],
["M\u00e1ximo","m\u00e1ximo"],["Cejuela","cejuela"],["Banda","banda"],["Sintonizaci\u00f3n","sintonizaci\u00f3n"],
["Simultaneos","simult\u00e1neos"],["Incluidos","incluidos"],["Incluido","incluido"],
["Frecuencia","frecuencia"],["Muestreo","muestreo"],["Latencia","latencia"],
["Rango","rango"],["Din\u00e1mico","din\u00e1mico"],["Caracter\u00edsticas","caracter\u00edsticas"],
["Especiales","especiales"],["Preamplificador","preamplificador"],["Frecuencia","frecuencia"]
];
var COMMON={}; PAIRS.forEach(function(p){COMMON[p[0]]=p[1];});
var BRANDS=["Universal Audio","Kali Audio","Adam Audio","ADAM Audio","Focal Audio","Plugin Boutique"];
function sentCase(s){
  if(typeof s!=='string') return {v:s,c:0};
  var PH={}, w=s;
  BRANDS.forEach(function(b,i){ var k='\u0001B'+i+'\u0001'; if(w.indexOf(b)>=0){ PH[k]=b; w=w.split(b).join(k); } });
  var parts=w.split(/(\s+)/), wi=0, c=0;
  for(var i=0;i<parts.length;i++){
    var t=parts[i]; if(/^\s*$/.test(t)) continue;
    var m=t.match(/^([\u00bf\u00a1\(\["']*)(.+?)([.,;:!?\)\/"'\u00d7]*)$/);
    if(!m){ wi++; continue; }
    var pre=m[1], core=m[2], post=m[3];
    if(/^\u0001B\d+\u0001$/.test(core)){ wi++; continue; }
    if(wi>0 && COMMON[core] && !/\d/.test(core) && core!==core.toUpperCase()){ parts[i]=pre+COMMON[core]+post; c++; }
    wi++;
  }
  var out=parts.join('');
  Object.keys(PH).forEach(function(k){ out=out.split(k).join(PH[k]); });
  return {v:out,c:c};
}
var total=0, guides=0;
function fixLabel(gid, obj){
  if(typeof obj.label_es!=='string') return;
  var r=sentCase(obj.label_es);
  if(r.c>0){ obj.label_es=r.v; total+=r.c; guides++; }
}
A.forEach(function(g){
  if(g.comparison&&g.comparison.rows) g.comparison.rows.forEach(function(r){ fixLabel(g.id,r); });
  if(g.productTable&&g.productTable.rows) g.productTable.rows.forEach(function(r){ fixLabel(g.id,r); });
  var fsn=g.featuredSnippet;
  if(fsn&&Array.isArray(fsn.specs)) fsn.specs.forEach(function(s){ fixLabel(g.id,s); });
});
// val_es fill for comparison rows (copy + micro-translations)
var filled=0;
function esVal(v){
  if(typeof v!=='string') return v;
  return v.replace(/\bNone\b/g,'Ninguno').replace(/\bYes\b/g,'S\u00ed').replace(/\beach\b/g,'cada uno');
}
A.forEach(function(g){
  if(g.comparison&&g.comparison.rows) g.comparison.rows.forEach(function(r){
    ['val1','val2','val3','val4','val5'].forEach(function(k){
      var ke=k+'_es';
      if(r[k]!==undefined&&r[ke]===undefined){ r[ke]=esVal(r[k]); filled++; }
    });
  });
});
// orphan 152 out of budget-pa-systems
var pa=A.find(function(x){return x&&x.id==='budget-pa-systems';});
if(pa&&pa.featuredProducts&&pa.featuredProducts.indexOf(152)>=0){
  pa.featuredProducts=pa.featuredProducts.filter(function(id){return id!==152;});
  total++; guides++;
  console.log('152 removed from budget-pa-systems feat');
}
fs.writeFileSync('data/guides.json', JSON.stringify(A,null,2),'utf8');
console.log('label_words='+total+' val_es_filled='+filled);
