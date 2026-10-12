var fs=require('fs');
var p='data/guides.json';
var d=JSON.parse(fs.readFileSync(p,'utf8'));
var hub=d.find(function(x){return x.id==='best-keyboard'});
var spe=d.find(function(x){return x.id==='midi-keyboards'});
var fails=[];
function assert(c,m){ if(!c) fails.push(m); }
function V(en,es){ return {value:en, value_es:es}; }

// ---- 1. TABLE: +2 cols, +2 values x6 rows ----
var cols=hub.productTable.columns.map(function(c){return c.title});
assert(cols.length===8 && cols[0]==='Nord Stage 4 88','hub cols unexpected');
hub.productTable.columns.push(
  {title:'M-Audio Hammer 88',title_es:'M-Audio Hammer 88'},
  {title:'Native Instruments Kontrol S61 MK3',title_es:'Native Instruments Kontrol S61 MK3'}
);
function row(label, a, b){
  var r=hub.productTable.rows.find(function(x){return x.label===label});
  assert(r,'row missing '+label); assert(r.values.length===8,'row len '+label);
  r.values.push(V(a[0],a[1])); r.values.push(V(b[0],b[1]));
}
row('Type',['MIDI Controller','Controlador MIDI'],['MIDI Controller','Controlador MIDI']);
row('Keys',['88 fully-weighted hammer','88 martillo contrapesado'],['61 semi-weighted, poly aftertouch','61 semi-ponderadas, aftertouch polifónico']);
row('Connectivity',['USB, MIDI Out, 3 pedal inputs','USB, MIDI Out, 3 entradas de pedal'],['USB-C, MIDI In/Out, 4 pedal inputs','USB-C, MIDI In/Out, 4 entradas de pedal']);
row('Weight',['17.5 kg (38.5 lb)','17,5 kg (38,5 lb)'],['6.0 kg (13.2 lb)','6,0 kg (13,2 lb)']);
row('Best For',['Piano practice in the DAW','Practicar piano en el DAW'],['Komplete-based composing','Componer con Komplete']);
row('Estimated Price',['$499–$549','$499–$549'],['$839.95–$849','$839.95–$849']);

// ---- 2. SECTIONS: condensed DAW advice + Hammer + Kontrol ----
hub.sections.push(
{heading:'How to Choose a MIDI Controller for Your DAW',
 heading_es:'Cómo elegir un controlador MIDI para tu DAW',
 content:'<p><strong>A MIDI controller sends notes and control data to your computer — it makes no sound on its own — so the right choice depends on your space, your hands and your music.</strong> Key count sets your range: 25 keys for beats and basslines on the move, 49 as the minimum for chords plus melody, 61 as the sweet spot for two-handed home-studio playing, 88 weighted for pianists with room to spare.</p><p><strong>Match the action and the controls to your workflow.</strong> Synth-action for fast leads and beats, semi-weighted as the all-round compromise, hammer-action for piano technique. Pads and knobs keep beat-making and plugin control off the mouse, and a controller mapped for your main DAW saves hours of setup.</p>',
 content_es:'<p><strong>Un controlador MIDI envía notas y datos a tu ordenador —no suena por sí solo—, así que la elección depende de tu espacio, tus manos y tu música.</strong> El número de teclas marca tu rango: 25 para beats y bajos en marcha, 49 como mínimo para acordes más melodía, 61 como punto ideal para tocar con ambas manos en casa, 88 contrapesadas para pianistas con sitio de sobra.</p><p><strong>Ajusta la acción y los controles a tu forma de trabajar.</strong> Acción de sinte para leads rápidos y beats, semipesada como término medio versátil, martillo para técnica pianística. Pads y mandos mantienen los beats y los plugins fuera del ratón, y un controlador mapeado para tu DAW principal ahorra horas de configuración.</p>'},
{heading:'Best 88-Key Weighted Controller: M-Audio Hammer 88',
 heading_es:'Mejor controlador contrapesado de 88 teclas: M-Audio Hammer 88',
 products:[325],
 content:'<p><strong>For pianists who practise technique inside a production room, the <strong>M-Audio Hammer 88</strong> puts 88 fully-weighted hammer-action keys in front of your virtual instruments at a working price.</strong> USB bus power with class-compliant operation, 5-pin MIDI output, pitch and modulation wheels, sustain, soft and expression pedal inputs and four zones for splits and layers keep the piano core front and centre.</p><p><strong>Why it dominates:</strong> realistic grand-piano feel with no drivers to install — plus the cheapest serious route to 88 weighted keys. The trade-offs are honest: no pads, faders, screen or aftertouch, no onboard sounds or speakers, and at 38.5 lb it lives on a sturdy stand, not in a gig bag.</p>',
 content_es:'<p><strong>Para pianistas que trabajan la técnica en la sala de producción, el <strong>M-Audio Hammer 88</strong> pone 88 teclas de martillo contrapesadas delante de tus instrumentos virtuales a precio de trabajo.</strong> Alimentación por USB sin drivers, salida MIDI de cinco pines, ruedas de pitch y modulación, entradas de sustain, sordina y expresión y cuatro zonas para capas y divisiones, con el piano como centro.</p><p><strong>Por qué domina:</strong> tacto de cola realista sin instalar nada, y la vía más barata a 88 teclas contrapesadas serias. Los trueques son honestos: sin pads, faders, pantalla ni aftertouch, sin sonidos ni altavoces, y con 17,5 kg vive en un soporte firme, no en una funda.</p>'},
{heading:'Best Premium 61-Key Controller: Native Instruments Kontrol S61 MK3',
 heading_es:'Mejor controlador premium de 61 teclas: Native Instruments Kontrol S61 MK3',
 products:[14],
 content:'<p><strong>For composers living inside Komplete, the <strong>Native Instruments Kontrol S61 MK3</strong> pairs a premium Fatar semi-weighted keybed with polyphonic aftertouch and a workflow built around finding sounds fast.</strong> The RGB Light Guide shows scales, chords and key zones above the keys, NKS tag browsing loads instruments from the hardware, and Smart Play chords, scales and arpeggiator keep ideas moving across USB-C with MIDI In/Out and four pedal inputs.</p><p><strong>Why it dominates:</strong> the fastest preset-to-performance loop in the NI ecosystem on a firm, responsive 61-key action. The trade-offs are honest: it costs about twice the KeyLab Essential, it only earns that premium inside the Native Instruments world, and there are no pads or faders for drum programming and mixing.</p>',
 content_es:'<p><strong>Para compositores metidos en Komplete, el <strong>Native Instruments Kontrol S61 MK3</strong> une un teclado Fatar semipesado premium con aftertouch polifónico y un flujo pensado para encontrar sonidos rápido.</strong> La Light Guide RGB muestra escalas, acordes y zonas sobre las teclas, la navegación NKS por etiquetas carga instrumentos desde el hardware, y los Smart Play de acordes, escalas y arpegiador mantienen las ideas en marcha por USB-C con MIDI In/Out y cuatro entradas de pedal.</p><p><strong>Por qué domina:</strong> el ciclo más rápido de preset a interpretación dentro del ecosistema NI sobre 61 teclas firmes y receptivas. Los trueques son honestos: cuesta alrededor del doble que el KeyLab Essential, solo compensa dentro del mundo Native Instruments, y no hay pads ni faders para programar batería y mezclar.</p>'}
);

// ---- 3. VERDICTS: copy SPE 325/14 with weight/typo fixes ----
var v325=spe.verdictProsCons.find(function(v){return /Hammer 88/.test(v.name)});
var v14=spe.verdictProsCons.find(function(v){return /Kontrol S61/.test(v.name)});
assert(v325&&v14,'SPE verdicts missing');
var c325=JSON.parse(JSON.stringify(v325));
c325.pros=c325.pros.map(function(s){return s.replace(/^ it's the cheapest/,"It's the cheapest")});
var c14=JSON.parse(JSON.stringify(v14));
c14.pros=c14.pros.map(function(s){return s.split('in a 10.6 lb (4.8 kg) body').join('in a 13.2 lb (6 kg) body')});
c14.pros_es=c14.pros_es.map(function(s){return s.split('en un cuerpo de 4,8 kg').join('en un cuerpo de 6 kg')});
c14.cons=c14.cons.map(function(s){return s.replace(/^ it's twice/,"It's twice")});
hub.verdictProsCons.push(c325,c14);

// ---- 4. related + conclusion + section See-also: drop midi-keyboards links ----
assert(hub.relatedGuides.indexOf('midi-keyboards')>-1,'hub related missing midi');
hub.relatedGuides=hub.relatedGuides.map(function(r){return r==='midi-keyboards'?'best-stage-keyboards':r});
var midiAnchor=/ ?<a class="guide-link-btn" href="\/guides\/midi-keyboards(_es)?\.html">[^<]*<\/a>/g;
var nConc=((hub.conclusion||'').match(midiAnchor)||[]).length;
hub.conclusion=(hub.conclusion||'').replace(midiAnchor,'');
hub.conclusion_es=(hub.conclusion_es||'').replace(midiAnchor,'');
assert(nConc>0,'conclusion midi anchor not found');
var nSec=0;
hub.sections.forEach(function(s){
  ['content','content_es'].forEach(function(k){
    if(s[k]){ var m=(s[k].match(midiAnchor)||[]).length; nSec+=m; s[k]=s[k].replace(midiAnchor,''); }
  });
});
assert(nSec>0,'section midi anchors not found ('+nSec+')');

if(fails.length){ console.log('FAIL:\n'+fails.join('\n')); process.exit(1); }
fs.writeFileSync(p,JSON.stringify(d,null,2));
console.log('HUB MOVE OK | conclusion anchors removed: '+nConc+' | section anchors removed: '+nSec);
