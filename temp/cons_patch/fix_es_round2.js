var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
// Cap -> low. ONLY pure common Spanish words. Brands/product/EN terms excluded.
var PAIRS=[
["Para","para"],["Audio","audio"],["Frecuencia","frecuencia"],["Cu\u00e1l","cu\u00e1l"],
["M\u00e1ximo","m\u00e1ximo"],["M\u00e1xima","m\u00e1xima"],["M\u00e1s","m\u00e1s"],["Menos","menos"],
["Estudio","estudio"],["Estudios","estudios"],["Din\u00e1mico","din\u00e1mico"],
["Micr\u00f3fonos","micr\u00f3fonos"],["Micr\u00f3fono","micr\u00f3fono"],
["Mejor","mejor"],["Mejores","mejores"],["Esta","esta"],["Estos","estos"],["Estas","estas"],["Este","este"],
["Muestreo","muestreo"],["Grabaci\u00f3n","grabaci\u00f3n"],["Propio","propio"],["Sonido","sonido"],
["Cada","cada"],["Guitarras","guitarras"],["Guitarra","guitarra"],["Cuerpo","cuerpo"],["Escala","escala"],
["Qu\u00e9","qu\u00e9"],["Monitores","monitores"],["Monitor","monitor"],["Los","los"],["Las","las"],
["Precio","precio"],["Precios","precios"],["Destacada","destacada"],["Salida","salida"],["Salidas","salidas"],
["Sistemas","sistemas"],["Sistema","sistema"],["Principiantes","principiantes"],["Incluidos","incluidos"],
["Interfaz","interfaz"],["Interfaces","interfaces"],["Ideal","ideal"],["Ac\u00fastica","ac\u00fastica"],
["Ac\u00fastico","ac\u00fastico"],["Ac\u00fasticas","ac\u00fasticas"],["Mezcla","mezcla"],["Escenario","escenario"],
["Econ\u00f3micos","econ\u00f3micos"],["Econ\u00f3mico","econ\u00f3mico"],["Econ\u00f3mica","econ\u00f3mica"],["Econ\u00f3micas","econ\u00f3micas"],
["Bater\u00eda","bater\u00eda"],["Pedales","pedales"],["Pedal","pedal"],["Digital","digital"],["Digitales","digitales"],
["Activo","activo"],["Activos","activos"],["Activa","activa"],["Activas","activas"],
["Banda","banda"],["Bandas","bandas"],["M\u00e1stil","m\u00e1stil"],["Entrada","entrada"],["Entradas","entradas"],
["Bajo","bajo"],["Bajos","bajos"],["Desde","desde"],["Amplificadores","amplificadores"],["Amplificador","amplificador"],
["Amplis","amplis"],["Diapas\u00f3n","diapas\u00f3n"],["El\u00e9ctrica","el\u00e9ctrica"],["El\u00e9ctricas","el\u00e9ctricas"],["El\u00e9ctricos","el\u00e9ctricos"],
["Teclados","teclados"],["Teclado","teclado"],["Auriculares","auriculares"],["Auricular","auricular"],
["Cinta","cinta"],["Condensador","condensador"],["Condensadores","condensadores"],
["Inal\u00e1mbrico","inal\u00e1mbrico"],["Inal\u00e1mbricos","inal\u00e1mbricos"],["Inal\u00e1mbrica","inal\u00e1mbrica"],
["Mezcladores","mezcladores"],["Mezcladoras","mezcladoras"],["Mezclador","mezclador"],["Mezcladora","mezcladora"],
["Producci\u00f3n","producci\u00f3n"],["Comparativa","comparativa"],["Comparadas","comparadas"],["Gu\u00eda","gu\u00eda"],
["Elegir","elegir"],["Eliges","eliges"],["Voces","voces"],["Voz","voz"],["Efectos","efectos"],["Efecto","efecto"],
["Presupuesto","presupuesto"],["Directo","directo"],["Directa","directa"],["Casa","casa"],["Casero","casero"],["Casera","casera"],
["Hogar","hogar"],["Baratos","baratos"],["Caros","caros"],["Relaci\u00f3n","relaci\u00f3n"],["Calidad","calidad"],
["Port\u00e1tiles","port\u00e1tiles"],["Port\u00e1til","port\u00e1til"],["Compacta","compacta"],["Compactos","compactos"],
["Vivo","vivo"],["Cerrados","cerrados"],["Cerrado","cerrado"],["Abiertos","abiertos"],["Abierto","abierto"],["Abiertas","abiertas"],
["Profesional","profesional"],["Profesionales","profesionales"],["Vers\u00e1til","vers\u00e1til"],["Moderno","moderno"],
["Pastillas","pastillas"],["Puente","puente"],["G\u00e9nero","g\u00e9nero"],["Duelo","duelo"],["Diferencias","diferencias"],["Diferencia","diferencia"],
["Insignia","insignia"],["Controlador","controlador"],["Inmersivo","inmersivo"],["Sobremesa","sobremesa"],["Modular","modular"],
["Crecen","crecen"],["Conversor","conversor"],["Transparente","transparente"],["Fiable","fiable"],
["Grabar","grabar"],["Pagar","pagar"],["Vale","vale"],["Pena","pena"],["Simult\u00e1neos","simult\u00e1neos"],
["Todo","todo"],["Todos","todos"],["Todas","todas"],["Con","con"],["Sin","sin"],["Por","por"],["En","en"],["De","de"],
["La","la"],["El","el"],["Un","un"],["Una","una"],["Que","que"],["C\u00f3mo","c\u00f3mo"],["Y","y"],["O","o"],
["Solo","solo"],["Ambos","ambos"],["Ambas","ambas"],["Tres","tres"],["V\u00edas","v\u00edas"],["Dormitorio","dormitorio"],
["Jazz","jazz"],["Blues","blues"],["Rock","rock"],["Funk","funk"],["G\u00e9neros","g\u00e9neros"],
["Sobre","sobre"],["Tras","tras"],["Entre","entre"],["Hasta","hasta"],["Durante","durante"]
];
var COMMON={}; PAIRS.forEach(function(p){COMMON[p[0]]=p[1];});
// brand phrases containing common words -> protect
var BRANDS=["Universal Audio","Kali Audio","Adam Audio","ADAM Audio","Focal Audio"];
function sentCase(s){
  if(typeof s!=='string') return {v:s,c:0};
  var PH={};
  var w=s;
  BRANDS.forEach(function(b,i){
    var k='\u0001B'+i+'\u0001';
    if(w.indexOf(b)>=0){ PH[k]=b; w=w.split(b).join(k); }
  });
  var parts=w.split(/(\s+)/);
  var wi=0, c=0;
  for(var i=0;i<parts.length;i++){
    var t=parts[i];
    if(/^\s*$/.test(t)) continue;
    var m=t.match(/^([\u00bf\u00a1\(\["']*)(.+?)([.,;:!?\)\]"']*)$/);
    if(!m){ wi++; continue; }
    var pre=m[1], core=m[2], post=m[3];
    if(/^\u0001B\d+\u0001$/.test(core)){ wi++; continue; }
    if(wi>0 && COMMON[core] && !/\d/.test(core) && core!==core.toUpperCase()){
      parts[i]=pre+COMMON[core]+post; c++;
    }
    wi++;
  }
  var out=parts.join('');
  Object.keys(PH).forEach(function(k){ out=out.split(k).join(PH[k]); });
  return {v:out,c:c};
}
var FSN_KEYS=['title_es','key1_es','key2_es','best1_es','best2_es','faq_q1_es','faq_q2_es','faq_q3_es','faq_q4_es','faq_q5_es'];
var total=0, perGuide={};
function applyStr(gid, obj, key){
  if(typeof obj[key]!=='string') return;
  var r=sentCase(obj[key]);
  if(r.c>0){ obj[key]=r.v; total+=r.c; perGuide[gid]=(perGuide[gid]||0)+r.c; }
}
A.forEach(function(g){
  applyStr(g.id,g,'title_es');
  applyStr(g.id,g,'titleTag_es');
  var fsn=g.featuredSnippet;
  if(fsn&&typeof fsn==='object') FSN_KEYS.forEach(function(k){ applyStr(g.id,fsn,k); });
  if(g.sections) g.sections.forEach(function(sec){ applyStr(g.id,sec,'h_es'); applyStr(g.id,sec,'heading_es'); });
  if(Array.isArray(g.faq)) g.faq.forEach(function(f){ applyStr(g.id,f,'q_es'); });
});
// ---- explicit semantic fixes ----
function G(id){ return A.find(function(x){return x&&x.id===id;}); }
function set(g,key,val){ if(g&&g[key]!==val){ g[key]=val; total++; perGuide[g.id]=(perGuide[g.id]||0)+1; } }
var r=G('rme-vs-motu');
set(r,'titleTag_es','Interfaz de audio de gama media vs premium: \u00bfvale la pena?');
var b=G('budget-mics');
set(b,'titleTag_es','Los 23 mejores micr\u00f3fonos econ\u00f3micos XLR');
var pm=G('pro-monitors');
set(pm,'titleTag_es','ADAM S3H vs Focal Trio11 Be: duelo de tres v\u00edas');
var sv=G('scarlett-vs-volt');
if(sv){ if(typeof sv.title_es==='string'&&/uA Volt/.test(sv.title_es)){ sv.title_es=sv.title_es.replace(/uA Volt/g,'UA Volt'); total++; } }
var pj=G('precision-vs-jazz');
set(pj,'title_es','P-Bass vs J-Bass: \u00bfcu\u00e1l bajo Fender es el tuyo?');
var sm=G('sm57-vs-md421');
set(sm,'titleTag_es','SM57 vs MD 421 Kompakt: \u00bfmicr\u00f3fono para amplis y bater\u00eda?');
fs.writeFileSync('data/guides.json', JSON.stringify(A,null,2),'utf8');
var rep=['word_changes='+total,'guides_touched='+Object.keys(perGuide).length];
Object.keys(perGuide).sort().forEach(function(k){ rep.push(k+': '+perGuide[k]); });
fs.writeFileSync('temp/cons_patch/r2_report.txt', rep.join('\n'),'utf8');
console.log('words='+total+' guides='+Object.keys(perGuide).length);
