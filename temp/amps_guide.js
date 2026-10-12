var fs=require('fs');
var p='data/guides.json';
var d=JSON.parse(fs.readFileSync(p,'utf8'));
var g=d.find(function(x){return x.id==='best-mic-for-guitar-amps'});
var fails=[];
function assert(c,m){ if(!c) fails.push(m); }
function V(en,es){ return {value:en, value_es:es}; }

// --- featuredProducts ---
assert(JSON.stringify(g.featuredProducts)==='[5,1,51]','featured unexpected: '+JSON.stringify(g.featuredProducts));
g.featuredProducts=[5,634,635,636,211,51,1];

// --- table columns ---
var cols=g.productTable.columns.map(function(c){return c.title});
assert(cols.join('|')==='Shure SM57|Sennheiser MD 421 Kompakt|Shure SM7B','cols unexpected');
g.productTable.columns.push(
  {title:'Sennheiser e906',title_es:'Sennheiser e906'},
  {title:'Audix i5',title_es:'Audix i5'},
  {title:'Shure Beta 57A',title_es:'Shure Beta 57A'},
  {title:'Beyerdynamic M 201 TG',title_es:'Beyerdynamic M 201 TG'}
);

// --- table rows: append 4 values each (order: e906, i5, Beta57A, M201) ---
function row(label, vals){ // vals: [ [en,es] x4 ]
  var r=g.productTable.rows.find(function(x){return x.label===label});
  assert(r,'row missing: '+label);
  assert(r.values.length===3,'row len unexpected '+label+': '+r.values.length);
  vals.forEach(function(v){ r.values.push(V(v[0],v[1])); });
}
row('Best For',[
  ['No-stand amp miking','Grabar el ampli sin soporte'],
  ['Loud rock & metal','Rock y metal a todo volumen'],
  ['Hot output, less hiss','Más señal, menos siseo'],
  ['Isolation & accuracy','Aislamiento y fidelidad']
]);
row('Estimated Price',[
  ['~$219','~$219'],
  ['$94.63–$105','$94.63–$105'],
  ['~$159','~$159'],
  ['$349.99','$349.99']
]);
row('Type',[
  ['Dynamic (moving coil), passive','Dinámico (bobina móvil), pasivo'],
  ['Dynamic (moving coil), passive','Dinámico (bobina móvil), pasivo'],
  ['Dynamic (moving coil), passive','Dinámico (bobina móvil), pasivo'],
  ['Dynamic (moving coil), passive','Dinámico (bobina móvil), pasivo']
]);
row('Polar Pattern',[
  ['Supercardioid','Supercardioide'],
  ['Cardioid','Cardioide'],
  ['Supercardioid','Supercardioide'],
  ['Hypercardioid','Hipercardioide']
]);
row('Frequency Response',[
  ['40 Hz – 18 kHz','40 Hz – 18 kHz'],
  ['50 Hz – 16 kHz','50 Hz – 16 kHz'],
  ['50 Hz – 16 kHz','50 Hz – 16 kHz'],
  ['40 Hz – 18 kHz','40 Hz – 18 kHz']
]);
row('Sensitivity',[
  ['2.2 mV/Pa','2.2 mV/Pa'],
  ['1.6 mV/Pa','1.6 mV/Pa'],
  ['-51 dBV/Pa (2.8 mV)','–51 dBV/Pa (2.8 mV)'],
  ['1.2 mV/Pa (-58 dBV)','1.2 mV/Pa (–58 dBV)']
]);
row('Self-Noise',[
  ['N/A (passive dynamic)','N/D (dinámico pasivo)'],
  ['N/A (passive dynamic)','N/D (dinámico pasivo)'],
  ['N/A (passive dynamic)','N/D (dinámico pasivo)'],
  ['N/A (passive dynamic)','N/D (dinámico pasivo)']
]);
row('Max SPL',[
  ['Not published','No publicado'],
  ['>140 dB','>140 dB'],
  ['Not published','No publicado'],
  ['Not published','No publicado']
]);
row('Output Impedance',[
  ['350 Ω','350 Ω'],
  ['280 Ω','280 Ω'],
  ['150 Ω rated (290 Ω actual)','150 Ω nominales (290 Ω reales)'],
  ['200 Ω (min. load 1 kΩ)','200 Ω (carga mín. 1 kΩ)']
]);
row('Signal-to-Noise Ratio',[
  ['Not published','No publicado'],
  ['Not published','No publicado'],
  ['Not published','No publicado'],
  ['Not published','No publicado']
]);
row('Dynamic Range',[
  ['Not published','No publicado'],
  ['Not published','No publicado'],
  ['Not published','No publicado'],
  ['Not published','No publicado']
]);
row('THD at Max SPL',[
  ['Not published','No publicado'],
  ['Not published','No publicado'],
  ['Not published','No publicado'],
  ['Not published','No publicado']
]);
row('Capsule / Diaphragm',[
  ['Dynamic element, shock-mounted','Elemento dinámico con suspensión'],
  ['VLM Type B dynamic capsule','Cápsula dinámica VLM tipo B'],
  ['Dynamic element, neodymium magnet','Elemento dinámico, imán de neodimio'],
  ['Moving-coil, hostaphan diaphragm','Bobina móvil, diafragma hostaphan']
]);
row('Pad & High-Pass Filter',[
  ['3-position presence switch','Interruptor de presencia de 3 posiciones'],
  ['None','Ninguno'],
  ['None','Ninguno'],
  ['None','Ninguno']
]);
row('Phantom Power',[
  ['None required','No requiere'],
  ['None required','No requiere'],
  ['None required','No requiere'],
  ['None required','No requiere']
]);
row('Dimensions',[
  ['55 × 34 × 134 mm','55 × 34 × 134 mm'],
  ['141 × 38 mm','141 × 38 mm'],
  ['Not published','No publicado'],
  ['147 × 24 mm','147 × 24 mm']
]);
row('Weight',[
  ['140 g','140 g'],
  ['248 g','248 g'],
  ['275 g','275 g'],
  ['228 g','228 g']
]);

// --- sections: drop PD200X (idx5) + XM8500 (idx6), fix sec0 products, append 4 ---
assert(/Maono PD200X/.test(g.sections[5].heading),'sec5 unexpected: '+g.sections[5].heading);
assert(/Behringer XM8500/.test(g.sections[6].heading),'sec6 unexpected: '+g.sections[6].heading);
g.sections.splice(5,2);
assert(JSON.stringify(g.sections[0].products)==='[5,1,51,277,330]','sec0 products unexpected');
g.sections[0].products=[5,1,51,634,635,636,211];

g.sections.push(
{heading:'Hang It and Forget It: Is the e906 the Easiest Amp Mic to Place?',
 heading_es:'Cuélgalo y olvídate: ¿es el e906 el micro de ampli más fácil de colocar?',
 products:[634],
 content:'<strong>The Sennheiser e906 solves amp miking as a placement problem first: its flat body hangs over the cabinet by its own cable, so there is no stand eating floor space in a small room.</strong> A supercardioid dynamic capsule with fast transient response keeps the tone direct and punchy, and the 3-position presence switch (Bright, Moderate, Dark) voices the top end at the mic instead of in your DAW. It runs 40 Hz – 18 kHz over XLR with 2.2 mV/Pa of output. The honest limits: it is a specialist — a cab-voiced tool that feels wrong on podcast vocals — and at around $219 it costs twice the SM57 while still needing an interface. If you want the fastest path from amp to record-ready tone, the e906 is the easiest mic here.',
 content_es:'<strong>El Sennheiser e906 resuelve la grabación de amplis empezando por la colocación: su cuerpo plano se cuelga de la pantalla con su propio cable, sin trípode ocupando sitio en una habitación pequeña.</strong> La cápsula dinámica supercardioide de respuesta rápida mantiene el tono directo y contundente, y el interruptor de presencia de 3 posiciones (brillante, medio, oscuro) ajusta los agudos en el micro en vez de en el DAW. Trabaja de 40 Hz a 18 kHz por XLR con 2,2 mV/Pa de salida. Los límites honestos: es un especialista — una herramienta pensada para pantallas que no encaja en voces de podcast — y por unos $219 cuesta el doble que el SM57 ATA y sigue necesitando interfaz. Si quieres el camino más corto del ampli al tono listo para grabar, el e906 es el micro más fácil de esta lista.'},
{heading:'Louder Than Loud: Is the Audix i5 the Metal Player\u2019s SM57 Alternative?',
 heading_es:'Más fuerte que fuerte: ¿es el Audix i5 la alternativa al SM57 para el metal?',
 products:[635],
 content:'<strong>The Audix i5 is the USA-made workhorse for players who run their amps hot: a cardioid dynamic that handles over 140 dB without distortion and reproduces it clear, with no EQ needed.</strong> The VLM Type B capsule covers 50 Hz – 16 kHz with a forward, punchy character that sits dense high-gain guitars right in the mix, and at around $99 street it undercuts the classics. The honest limits: one cardioid pattern and zero switches, so what you hear is what you get; it needs an XLR interface like everything serious here; and that aggressive forward voice is less at home on mellow jazz cleans. If your amps live past noon on the gain knob, the i5 is the value pick.',
 content_es:'<strong>El Audix i5 es el caballo de batalla hecho en EE. UU. para quien lleva el ampli al límite: un dinámico cardioide que soporta más de 140 dB sin distorsionar y lo reproduce con claridad, sin ecualizar.</strong> La cápsula VLM tipo B cubre de 50 Hz a 16 kHz con un carácter directo y contundente que sienta las guitarras con mucha ganancia en la mezcla, y por unos $99 en la calle cuesta menos que los clásicos. Los límites honestos: un solo patrón cardioide y cero interruptores, lo que oyes es lo que hay; necesita interfaz XLR como todo lo serio de esta lista; y esa voz agresiva queda menos en casa en limpios suaves de jazz. Si tus amplis viven con la ganancia pasada del mediodía, el i5 es la compra inteligente.'},
{heading:'More Gain, Less Hiss: Is the Beta 57A the Fix for Budget Interfaces?',
 heading_es:'Más señal, menos siseo: ¿es el Beta 57A la solución para interfaces económicas?',
 products:[636],
 content:'<strong>The Shure Beta 57A is the SM57 evolved for home recording: its neodymium magnet puts out about 5 dB more signal (-51 vs -56 dBV/Pa), so a budget interface never runs its preamp wide open.</strong> Less cranked gain means less electrical hiss behind your riffs. The supercardioid pattern isolates better from the sides than the SM57, and the tailored response adds warmth with extended, lively highs. The honest limits: those lively highs can bite on already-bright amps; there are no switches to tame them; it needs XLR like the rest; and at around $159 it costs notably more than the classic. If your interface hisses before your tone gets loud enough, the Beta 57A is the fix.',
 content_es:'<strong>El Shure Beta 57A es el SM57 evolucionado para grabar en casa: su imán de neodimio entrega unos 5 dB más de señal (-51 frente a -56 dBV/Pa) y tu interfaz económica nunca trabaja con el previo a tope.</strong> Menos ganancia al límite significa menos siseo eléctrico detrás de tus riffs. El patrón supercardioide aísla mejor por los lados que el SM57, y la respuesta ajustada suma calidez con agudos extendidos y vivos. Los límites honestos: esos agudos vivos pueden morder en amplis ya brillantes; no hay interruptores para domarlos; necesita XLR como los demás; y por unos $159 cuesta bastante más que el clásico. Si tu interfaz sisea antes de que tu tono suene bastante alto, el Beta 57A es la solución.'},
{heading:'Hypercardioid Isolation: Is the M 201 TG the Most Honest Amp Mic?',
 heading_es:'Aislamiento hipercardioide: ¿es el M 201 TG el micro de ampli más fiel?',
 products:[211],
 content:'<strong>The Beyerdynamic M 201 TG is the precision instrument of this list: a hypercardioid dynamic whose extremely tight pattern hears the cone and almost nothing else — ideal in an untreated room with street noise and wall echo.</strong> The hostaphan diaphragm gives it condenser-like transient fidelity, and the largely linear 40 Hz – 18 kHz response with a smooth treble lift reproduces your rig instead of reshaping it. The honest limits: 1.2 mV/Pa is a quiet output that wants a strong, clean preamp; the tight pattern punishes sloppy placement; there are no switches; and at around $350 it is the luxury pick. If you want the most faithful picture of your amp, the M 201 TG is the reference.',
 content_es:'<strong>El Beyerdynamic M 201 TG es el instrumento de precisión de esta lista: un dinámico hipercardioide con un patrón tan cerrado que oye el cono y casi nada más, ideal en una sala sin tratar con ruido de la calle y eco de paredes.</strong> El diafragma hostaphan le da una fidelidad de transitorios casi de condensador, y la respuesta de 40 Hz a 18 kHz, mayormente plana con un realce suave de agudos, reproduce tu equipo en vez de remodelarlo. Los límites honestos: 1,2 mV/Pa es una salida baja que pide un previo solvente y limpio; el patrón cerrado castiga la colocación descuidada; no hay interruptores; y por unos $350 es la opción de lujo. Si quieres la imagen más fiel de tu ampli, el M 201 TG es la referencia.'}
);

// --- verdictProsCons +4 ---
g.verdictProsCons.push(
{name:'Sennheiser e906',name_es:'Sennheiser e906',
 pros:['Flat body hangs over the cab — no stand needed','3-position presence switch voices treble at the mic','Supercardioid capsule with fast, punchy transients','Purpose-built for guitar amps, stage and studio'],
 pros_es:['El cuerpo plano se cuelga de la pantalla, sin soporte','El interruptor de presencia de 3 posiciones ajusta los agudos en el micro','Cápsula supercardioide con transitorios rápidos y contundentes','Diseñado para amplis de guitarra, directo y estudio'],
 cons:['Hyper-specialized — weak choice for voice or podcast','No pad or HPF beyond the voicing switch','Needs an XLR interface, no USB path','Around twice the price of an SM57'],
 cons_es:['Hiperespecializado: mala opción para voz o podcast','Sin pad ni filtro más allá del interruptor de voz','Necesita interfaz XLR, sin salida USB','Cuesta alrededor del doble que un SM57']},
{name:'Audix i5',name_es:'Audix i5',
 pros:['Handles over 140 dB without distortion','Clear, punchy reproduction with no EQ needed','Designed and assembled in the USA','Street price around $99'],
 pros_es:['Soporta más de 140 dB sin distorsionar','Reproducción clara y contundente sin ecualizar','Diseñado y montado en EE. UU.','Precio de calle alrededor de $99'],
 cons:['Single cardioid pattern, no switches at all','Needs an XLR interface','Forward character suits high gain more than mellow cleans','Live-stage looks, no studio frills'],
 cons_es:['Un solo patrón cardioide, ningún interruptor','Necesita interfaz XLR','El carácter directo encaja mejor en alta ganancia que en limpios suaves','Estética de directo, sin lujos de estudio']},
{name:'Shure Beta 57A',name_es:'Shure Beta 57A',
 pros:['About 5 dB hotter than the SM57 — less interface hiss','Supercardioid pattern isolates better from the sides','Tailored warmth with extended lively highs','Rugged Shure build with improved handling-noise control'],
 pros_es:['Unos 5 dB más caliente que el SM57: menos siseo de la interfaz','El patrón supercardioide aísla mejor por los lados','Calidez ajustada con agudos extendidos y vivos','Construcción robusta Shure con mejor control del ruido de manejo'],
 cons:['Lively highs can bite on bright amps','No switches to tame the top end','Needs an XLR interface','Costs notably more than the SM57'],
 cons_es:['Los agudos vivos pueden morder en amplis brillantes','Sin interruptores para domar los agudos','Necesita interfaz XLR','Cuesta bastante más que el SM57']},
{name:'Beyerdynamic M 201 TG',name_es:'Beyerdynamic M 201 TG',
 pros:['Hypercardioid pattern ignores untreated-room echo','Largely linear response — reproduces the rig faithfully','Hostaphan diaphragm with condenser-like transient fidelity','Superb off-axis rejection for noisy surroundings'],
 pros_es:['El patrón hipercardioide ignora el eco de salas sin tratar','Respuesta mayormente plana: reproduce el equipo con fidelidad','Diafragma hostaphan con fidelidad de transitorios casi de condensador','Rechazo fuera de eje excelente en entornos ruidosos'],
 cons:['Quiet 1.2 mV/Pa output wants a strong clean preamp','Tight pattern punishes sloppy placement','No switches or voicing options','Premium price around $350'],
 cons_es:['La salida baja de 1,2 mV/Pa pide un previo solvente y limpio','El patrón cerrado castiga la colocación descuidada','Sin interruptores ni opciones de voz','Precio premium de unos $350']}
);

// --- conclusion + verdict rewrite (were USB-guide copy-paste) ---
g.conclusion='The Shure SM57 is still the reference — cheap, honest and indestructible. If placement in a small room is your pain, the Sennheiser e906 hangs over the cab and removes the stand from the equation. For loud rock and metal on a budget, the Audix i5 takes over 140 dB at around $99. If your budget interface hisses, the Shure Beta 57A\u2019s hotter output fixes it at the source. For the most faithful picture of your rig in an untreated room, the Beyerdynamic M 201 TG is the reference. The Sennheiser MD 421 Kompakt adds low-end depth and the Shure SM7B adds warm broadcast weight when the budget allows. <p><a href="/guides/best-microphone.html" class="guide-link-btn">Best Microphones</a> <a href="/guides/budget-mics.html" class="guide-link-btn">Best Budget Microphones</a> <a href="/guides/sm57-vs-md421.html" class="guide-link-btn">SM57 vs MD421</a></p>';
g.conclusion_es='El Shure SM57 sigue siendo la referencia: barato, honesto e indestructible. Si la colocación en una habitación pequeña es tu problema, el Sennheiser e906 se cuelga de la pantalla y elimina el soporte de la ecuación. Para rock y metal a todo volumen con poco presupuesto, el Audix i5 soporta más de 140 dB por unos $99. Si tu interfaz económica sisea, la salida más caliente del Shure Beta 57A lo arregla en origen. Para la imagen más fiel de tu equipo en una sala sin tratar, el Beyerdynamic M 201 TG es la referencia. El Sennheiser MD 421 Kompakt suma profundidad de graves y el Shure SM7B suma peso cálido de broadcast cuando el presupuesto lo permite. <p><a href="/guides/best-microphone_es.html" class="guide-link-btn">Mejores micrófonos</a> <a href="/guides/budget-mics_es.html" class="guide-link-btn">Mejores micrófonos económicos</a> <a href="/guides/sm57-vs-md421_es.html" class="guide-link-btn">SM57 vs MD421</a></p>';
g.verdict='The SM57 is the default. The e906 is the easiest to place, the i5 is the loud-value pick, the Beta 57A is the hiss fix for weak preamps, the M 201 TG is the isolation reference, the MD 421 Kompakt is the low-end depth pick and the SM7B is the warm premium option.';
g.verdict_es='El SM57 es la opción por defecto. El e906 es el más fácil de colocar, el i5 es la compra de valor para volumen alto, el Beta 57A es la solución contra el siseo de previos flojos, el M 201 TG es la referencia de aislamiento, el MD 421 Kompakt es la opción de profundidad de graves y el SM7B es la opción premium cálida.';

if(fails.length){ console.log('FAIL:\n'+fails.join('\n')); process.exit(1); }
fs.writeFileSync(p,JSON.stringify(d,null,2));
console.log('GUIDE SURGERY OK');
