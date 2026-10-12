var fs=require('fs');
var p='data/guides.json';
var d=JSON.parse(fs.readFileSync(p,'utf8'));
var g=d.find(function(x){return x.id==='budget-usb-mics'});
var fails=[];
function assert(cond,msg){ if(!cond){ fails.push(msg); } }

// 1. TABLE Best For: Q2U <-> SoloCast swap of the "Professional podcasting" slot
var bf=g.productTable.rows.find(function(r){return r.label==='Best For'});
assert(bf,'Best For row missing');
assert(bf.values[0].value==='First podcast mic','Q2U Best For unexpected: '+bf.values[0].value);
assert(bf.values[11].value==='Professional podcasting','SoloCast Best For unexpected: '+bf.values[11].value);
bf.values[0].value='Professional podcasting'; bf.values[0].value_es='Podcasting profesional';
bf.values[11].value='Gaming & streaming'; bf.values[11].value_es='Gaming y streaming';

// 2. SECTION 10 rewrite (was describing a Rode mic)
var s10=g.sections[10];
assert(/Is the HyperX SoloCast/.test(s10.heading),'section 10 heading unexpected: '+s10.heading);
s10.content='<strong>The HyperX SoloCast is HyperX\'s no-frills compact USB condenser for gamers and streamers.</strong> It\'s a cardioid electret condenser running up to 16-bit/48 kHz over USB-C, with a tap-to-mute sensor, LED status indicator and driver-free plug-and-play. The honest limits: there\'s no headphone jack for live monitoring and no gain control on the body — level is handled in software — and as a condenser it picks up more room than a dynamic in untreated spaces. If you want a simple, good-looking mic for calls, Discord and basic streaming, the SoloCast is the compact pick.';
s10.content_es='<strong>El SoloCast es el condensador USB compacto y sin complicaciones de HyperX para gamers y streamers.</strong> Es un condensador de electreto cardioide que trabaja hasta 16 bits/48 kHz por USB-C, con sensor de silencio táctil, indicador LED de estado y conexión directa sin drivers. Los límites honestos: no tiene salida de auriculares para monitorizar en directo ni control de ganancia en el cuerpo — el nivel se ajusta por software — y como condensador capta más sala que un dinámico en espacios sin tratar. Si quieres un micro sencillo y atractivo para llamadas, Discord y streaming básico, el SoloCast es la opción compacta.';

// 3. SECTION 3: SoloCast 2 has NO headphone jack (only the 2 Pro does) — fix false sentence
var s3=g.sections[3];
var old3='and unlike the original, the SoloCast 2 adds a headphone jack with zero-latency monitoring.';
assert(s3.content.indexOf(old3)>-1,'section 3 EN sentence not found');
s3.content=s3.content.split(old3).join('and like the original there is no headphone jack on the body — you monitor through your computer, not the mic.');
var old3es='y a diferencia del original, el 2 añade una salida de auriculares con monitorización de latencia cero.';
assert((s3.content_es||'').indexOf(old3es)>-1,'section 3 ES sentence not found');
s3.content_es=s3.content_es.split(old3es).join('y como el original no trae salida de auriculares en el cuerpo — monitorizas desde el ordenador, no desde el micro.');

// 4. VERDICT SoloCast (original is 16-bit/48kHz max, not 24/96)
var v=g.verdictProsCons.find(function(x){return x.name==='HyperX SoloCast USB Condenser Microphone'});
assert(v,'SoloCast verdict missing');
var pi=(v.pros||[]).indexOf('24-bit/96kHz Hi-Res audio — studio-level detail');
assert(pi>-1,'SoloCast verdict pro not found: '+JSON.stringify(v.pros));
v.pros[pi]='Up to 16-bit/48 kHz audio over USB-C';
var pName='HyperX SoloCast USB Condenser Microphone';
var vEs=g.verdictProsCons.find(function(x){return x.name===pName});
var pj=(vEs.pros_es||[]).indexOf('Audio Hi-Res de 24 bits/96 kHz — detalle de nivel de estudio');
assert(pj>-1,'SoloCast verdict pro_es not found');
vEs.pros_es[pj]='Audio de hasta 16 bits/48 kHz por USB-C';

if(fails.length){ console.log('FAIL:\n'+fails.join('\n')); process.exit(1); }
fs.writeFileSync(p,JSON.stringify(d,null,2));
console.log('ALL FIXES APPLIED OK');
