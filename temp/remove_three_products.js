var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function R(s,a,b){ if(s.indexOf(a)===-1){fails.push('NOT FOUND: '+a.slice(0,70));return s;} return s.replace(a,b); }

var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='streaming-interfaces';});

// 1. Remove sections for Apollo Twin X (id 16), Arturia MiniFuse 2 OTG (id 328), Audient iD14 MkII (id 53)
g.sections=g.sections.filter(function(s){
  var products=s.products||[];
  return !(products.includes(16) || products.includes(328) || products.includes(53));
});

console.log('Sections after filter:',g.sections.length);

// 2. Update productTable columns - remove Apollo Twin X, MiniFuse 2 OTG, iD14 MkII
g.productTable.columns=g.productTable.columns.filter(function(c){
  return !['Universal Audio Apollo Twin X Gen 2','Arturia MiniFuse 2 OTG','Audient iD14 MkII'].includes(c.title);
});

console.log('Columns after filter:',g.productTable.columns.length,g.productTable.columns.map(function(c){return c.title;}).join(', '));

// 3. Update productTable rows - remove corresponding values
g.productTable.rows.forEach(function(row){
  // Keep only first 6 values (Rodecaster Duo, Bridge Cast X, EVO 4, Volt 276, Zoom P4next)
  row.values=row.values.slice(0,6);
});

console.log('Rows updated, first row values count:',g.productTable.rows[0].values.length);

// 4. Update featuredProducts - remove 16, 328, 53
g.featuredProducts=g.featuredProducts.filter(function(id){return ![16,328,53].includes(id);});
console.log('featuredProducts:',g.featuredProducts);

// 5. Update verdict - remove Apollo Twin X, iD14, Scarlett mentions
g.verdict=R(g.verdict,'Apollo Twin X is the UAD tracking pick, iD14 the console-value pick, Scarlett 2i2 the beginner standard.','');
g.verdict=g.verdict.trim().replace(/\s+$/,'');
g.verdict_es=R(g.verdict_es,'Apollo Twin X es la opción UAD, iD14 la de valor con consola, Scarlett 2i2 el estándar principiante.','');
g.verdict_es=g.verdict_es.trim().replace(/\s+$/,'');

console.log('Verdict EN:',g.verdict);
console.log('Verdict ES:',g.verdict_es);

// 6. Update FAQ - remove MiniFuse 2 OTG references
var F=g.featuredSnippet;
F.faq_a3_en=R(F.faq_a3_en,'With the MiniFuse 2 OTG, yes: its second USB-C port exists exactly for that. Connect an iPhone or Android and both mic inputs stay live through its built-in hub. Everything else here targets PC and console; if your stream runs from a phone, this is the only unit that does it properly without dongles.','The Zoom PodTrak P4next can work as a USB interface for mobile streaming with the right adapter. For dedicated mobile streaming, consider a phone-first interface.');
F.faq_a3_es=R(F.faq_a3_es,'Con el MiniFuse 2 OTG, sí: su segundo puerto USB-C existe justo para eso. Enchufas el iPhone o el Android y los dos micrófonos siguen activos gracias a su hub integrado. El resto de unidades de la lista están pensadas para PC y consola; si tu directo sale del teléfono, esta es la única que lo hace bien y sin adaptadores.','El Zoom PodTrak P4next puede funcionar como interfaz USB para streaming móvil con el adaptador adecuado. Para streaming móvil dedicado, considera una interfaz pensada para teléfono.');

// 7. Update conclusion - ensure no references to removed products (already clean but verify)
g.conclusion=R(g.conclusion,'Apollo Twin X is the UAD tracking pick, iD14 the console-value pick, Scarlett 2i2 the beginner standard.','');
g.conclusion_es=R(g.conclusion_es,'Apollo Twin X es la opción UAD, iD14 la de valor con consola, Scarlett 2i2 el estándar principiante.','');

// 8. Update section 0 products list - remove 16, 328, 53
var sec0=g.sections[0];
sec0.products=sec0.products.filter(function(id){return ![16,328,53].includes(id);});
console.log('Section 0 products:',sec0.products);

// 9. Update Volt 276 section products - remove 16 (Apollo was listed there)
var voltSec=g.sections.find(function(s){return s.products && s.products.includes(263);});
if(voltSec){
  voltSec.products=voltSec.products.filter(function(id){return id!==16;});
  console.log('Volt section products:',voltSec.products);
}

// 10. Update featuredSnippet text to reflect current lineup (4 main units)
F.text_en=R(F.text_en,'The Rodecaster Duo is the most complete streaming console with two Revolution previos, a touchscreen and SMART pads. The Roland Bridge Cast X pairs a dual-bus mixer with HDMI capture for console gamers. The Audient EVO 4 is the smart budget interface with Smartgain auto-level setup and loopback, and the Universal Audio Volt 276 adds analog 1176-style compression. All four perform in live streams.','The Rodecaster Duo is the most complete streaming console with two Revolution preamps, a touchscreen and SMART pads. The Roland Bridge Cast X pairs a dual-bus mixer with HDMI capture for console gamers. The Audient EVO 4 is the smart budget interface with SmartGain auto-level setup and loopback, the Universal Audio Volt 276 adds analog 1176-style compression, and the Zoom PodTrak P4next is a portable recorder with 4 XLR inputs and sound pads. All perform in live streams.');
F.text_es=R(F.text_es,'El Rodecaster Duo es la consola de streaming más completa con dos previolificadores Revolution, pantalla táctil y pads SMART. El Roland Bridge Cast X combina un mezclador de doble bus con captura HDMI para gamers de consola. El Audient EVO 4 es la interfaz económica inteligente con ajuste automático de nivel Smartgain y loopback, y el Universal Audio Volt 276 añade compresión analógica estilo 1176. Los cuatro funcionan en streams en directo.','El Rodecaster Duo es la consola de streaming más completa con dos previos Revolution, pantalla táctil y pads SMART. El Roland Bridge Cast X combina un mezclador de doble bus con captura HDMI para gamers de consola. El Audient EVO 4 es la interfaz económica inteligente con ajuste automático SmartGain y loopback, el Universal Audio Volt 276 añade compresión analógica estilo 1176, y el Zoom PodTrak P4next es una grabadora portátil con 4 entradas XLR y pads de sonido. Todas funcionan en streams en directo.');

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('Guide updated');

if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');