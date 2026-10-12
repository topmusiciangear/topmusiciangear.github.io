var fs=require('fs');
var p='data/guides.json';
var d=JSON.parse(fs.readFileSync(p,'utf8'));
var g=d.find(function(x){return x.id==='best-keyboard'});
var fails=[];
function assert(c,m){ if(!c) fails.push(m); }
function V(en,es){ return {value:en, value_es:es}; }
assert(g.productTable.rows.length===6,'rows unexpected: '+g.productTable.rows.length);
assert(g.productTable.columns.length===10,'cols unexpected');
var ci=g.productTable.rows.findIndex(function(r){return r.label==='Connectivity'});
assert(ci>-1,'Connectivity row missing');
var sounds={label:'Sounds',label_es:'Sonidos',values:[
  V('3 engines: Piano/Organ/Synth','3 motores: piano/órgano/sinte'),
  V('24 voices, CFX + VRM Lite','24 voces, CFX + VRM Lite'),
  V('321 tones, SuperNATURAL','321 sonidos, SuperNATURAL'),
  V('None (Analog Lab software)','Ninguno (software Analog Lab)'),
  V('None (controller)','Ninguno (controlador)'),
  V('None (controller)','Ninguno (controlador)'),
  V('None (controller)','Ninguno (controlador)'),
  V('1,154 tones, ZEN-Core','1.154 sonidos, ZEN-Core'),
  V('None (controller)','Ninguno (controlador)'),
  V('None (Komplete software)','Ninguno (software Komplete)')
]};
var speakers={label:'Speakers',label_es:'Altavoces',values:[
  V('No','No'),
  V('Yes, 7 W x 2','Sí, 7 W x 2'),
  V('Yes, 11 W x 2','Sí, 11 W x 2'),
  V('No','No'),V('No','No'),V('No','No'),V('No','No'),
  V('Yes, built-in stereo','Sí, estéreo integrados'),
  V('No','No'),V('No','No')
]};
assert(sounds.values.length===10&&speakers.values.length===10,'val counts');
g.productTable.rows.splice(ci,0,sounds,speakers);
assert(g.productTable.rows.length===8,'rows after');
if(fails.length){ console.log('FAIL:\n'+fails.join('\n')); process.exit(1); }
fs.writeFileSync(p,JSON.stringify(d,null,2));
console.log('TABLE ROWS ADDED OK: '+g.productTable.rows.map(function(r){return r.label}).join(' | '));
