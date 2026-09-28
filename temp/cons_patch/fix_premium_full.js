var fs=require('fs');
var P='data/guides.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var g=A.find(x=>x.id==='premium-interfaces');
if(!g) throw new Error('not found');

// --- Title fix: remove product list, correct count to 6 ---
g.title="The 6 Best Premium Audio Interfaces for Pro Studios";
g.title_es="Las 6 Mejores Interfaces de Audio Premium para Estudios Pro";
g.titleTag="6 Best Premium Audio Interfaces for Pro Studios — Compared";
g.titleTag_es="6 Mejores Interfaces de Audio Premium para Estudios Pro — Comparativa";
g.description="The 6 premium interfaces that actually earn a permanent rack spot — Neumann, UA, RME, Apogee, Audient and Lynx compared on real-world use, not brochure specs.";
g.description_es="Las 6 interfaces premium que de verdad se ganan un hueco fijo en el rack — Neumann, UA, RME, Apogee, Audient y Lynx comparadas por uso real, no por folleto.";

// --- Intro: cover all 6, non-generic, natural ES ---
g.intro="<p><strong>At the top end, an interface stops being a box you replace and becomes the piece you build the studio around.</strong> The six here all clear that bar, but they do it for different rooms: the Neumann MT 48 (U) and Audient ORIA live on the desk and give you touchscreen and Atmos control, the Apollo x8p Gen 2 brings UAD tracking with 8 Unison pres, and the rack trio — RME Fireface UFX III, Apogee Symphony I/O Mk II 16×16 SE and Lynx Aurora-n 16 — cover touring rigs, modular HD/Dante installs and mastering-grade transparency. Prices checked live at zZounds, Andertons, Gear4music and Music Store, so the buy button shows what that store actually charges today.</p>";
g.intro_es="<p><strong>Arriba del todo, una interfaz deja de ser una caja que cambias cada dos años y se vuelve la pieza sobre la que montas el estudio.</strong> Las seis de esta guía pasan ese filtro, cada una en su terreno: la Neumann MT 48 (U) y la Audient ORIA viven sobre la mesa y te dan pantalla táctil y control Atmos, la Apollo x8p Gen 2 trae el tracking UAD con 8 previos Unison, y el trío de rack — RME Fireface UFX III, Apogee Symphony I/O Mk II 16×16 SE y Lynx Aurora-n 16 — resuelve directo para giras, estudios con HD/Dante modular y conversión transparente de mastering. Precios comprobados al momento en zZounds, Andertons, Gear4music y Music Store, así que el botón refleja lo que esa tienda cobra hoy.</p>";

// --- Sections: 2 groups but content now mentions all 6 specifically ---
g.sections[0].h="Desktop Flagships: Neumann MT 48 & Audient ORIA";
g.sections[0].h_es="Buques Insignia de Sobremesa: Neumann MT 48 y Audient ORIA";
g.sections[0].intro="Two desk-first designs that trade rack channels for hands-on control.";
g.sections[0].intro_es="Dos diseños pensados para la mesa que cambian canales de rack por control a mano.";
g.sections[0].products=[512,515];
g.sections[0].content="<p><strong>Neumann MT 48 (U) puts a full monitor controller, 2 Neumann preamps to 78 dB and network audio in a desktop box.</strong> Touchscreen, DSP EQ/dynamics/reverb, AES67/Dante and USB-C make it the one converter you can move between a vocal booth, a small mix room and a location record without rewiring. The catch is two built-in pres — if you need eight mic inputs at once, you add external pres or look at rack.</p><p><strong>Audient ORIA is the Atmos desk tool you didn't know you needed until you try to do 9.1.6 without it.</strong> 16 line outputs, two Audient Console preamps, ADAT/AES and onboard room calibration with per-channel DSP let you switch between stereo, 5.1 and 7.1.4/9.1.6 on the same speakers without a separate monitor controller. It is USB-C and niche by definition — brilliant for immersive, overkill if you only mix stereo.</p>";
g.sections[0].content_es="<p><strong>La Neumann MT 48 (U) mete un controlador de monitores completo, 2 previos Neumann hasta 78 dB y audio en red en una caja de sobremesa.</strong> Pantalla táctil, EQ/dinámica/reverb por DSP, AES67/Dante y USB-C la convierten en el convertidor que puedes llevar de la cabina vocal a una sala pequeña o a una grabación en exteriores sin recablear. El límite son dos previos integrados — si necesitas ocho micros a la vez, sumas previos externos o miras a rack.</p><p><strong>La Audient ORIA es la herramienta de sobremesa para Atmos que no valoras hasta que intentas hacer 9.1.6 sin ella.</strong> 16 salidas de línea, dos previos Audient Console, ADAT/AES y calibración de sala por DSP te dejan saltar entre estéreo, 5.1 y 7.1.4/9.1.6 con los mismos altavoces sin un controlador aparte. Es USB-C y, por definición, de nicho — brillante para inmersivo, sobrada si solo mezclas en estéreo.</p>";

g.sections[1].h="Rack & Mastering Power: Apollo, RME, Apogee and Lynx";
g.sections[1].h_es="Potencia de Rack y Mastering: Apollo, RME, Apogee y Lynx";
g.sections[1].intro="Four rack answers for tracking bands, running MADI/Dante or printing masters.";
g.sections[1].intro_es="Cuatro respuestas de rack para grabar bandas, mover MADI/Dante o imprimir masters.";
g.sections[1].products=[513,183,514,516];
g.sections[1].content="<p><strong>Universal Audio Apollo x8p Gen 2 is the tracking room pick.</strong> 16×22 I/O via Thunderbolt/USB-C, 8 Unison preamps, HEXA Core UAD DSP, Auto-Gain and Apollo Monitor Correction mean you track through Neve/API/SSL channel strips at near-zero latency and keep that sound. Thunderbolt is mandatory and the UAD plugin cost adds up.</p><p><strong>RME Fireface UFX III is the tour and uptime pick.</strong> 188 channels (with MADI), SteadyClock FS, TotalMix FX with a 48-channel mixer, DURec standalone recording straight to USB and four hi-Z inputs. Drivers and routing are where RME earns its reputation — TotalMix has a learning curve but it never lets a session down.</p><p><strong>Apogee Symphony I/O Mk II 16×16 SE is the modular studio pick.</strong> Up to 32×32 with swappable Thunderbolt/HD/Dante cards, flagship Apogee conversion, DualView touchscreen and a chassis you expand one module at a time. It is the most expensive route and it ships without mic pres — you bring your own.</p><p><strong>Lynx Aurora-n 16 (USB) is the mastering transparency pick.</strong> 16×16 AD/DA on DB25, Hilo-derived conversion with a discrete converter per channel pair, SynchroLock 2 clocking and an LSlot you swap between USB, Thunderbolt, Dante or Pro Tools HD. Add the microSD 32-channel recorder for playback rigs. No mic pres and DB25 means breakout cables are part of the plan.</p>";
g.sections[1].content_es="<p><strong>La Universal Audio Apollo x8p Gen 2 es la elección para grabar.</strong> 16×22 E/S por Thunderbolt/USB-C, 8 previos Unison, DSP HEXA Core UAD, Auto-Gain y Apollo Monitor Correction te dejan grabar a través de canales Neve/API/SSL con latencia casi nula y quedarte con ese sonido. Pide Thunderbolt y el coste de plugins UAD suma.</p><p><strong>La RME Fireface UFX III es la elección para giras y para no fallar.</strong> 188 canales (con MADI), SteadyClock FS, TotalMix FX con mesa de 48 canales, grabación autónoma DURec directa a USB y cuatro entradas hi-Z. Ahí es donde RME se gana la fama — TotalMix tiene su curva de aprendizaje pero nunca deja tirada una sesión.</p><p><strong>La Apogee Symphony I/O Mk II 16×16 SE es la elección modular para estudio.</strong> Hasta 32×32 con tarjetas intercambiables Thunderbolt/HD/Dante, conversión insignia Apogee, pantalla DualView y un chasis que amplías módulo a módulo. Es la ruta más cara y viene sin previos — pones los tuyos.</p><p><strong>La Lynx Aurora-n 16 (USB) es la elección transparente para mastering.</strong> 16×16 AD/DA por DB25, conversión derivada de Hilo con un convertidor dedicado por cada par de canales, reloj SynchroLock 2 y ranura LSlot intercambiable entre USB, Thunderbolt, Dante o Pro Tools HD. Suma el grabador a microSD de 32 canales para playback en directo. Sin previos y con DB25, los breakout son parte del plan.</p>";

// --- productTable: 6 columns ---
g.productTable={
  title:"Premium Interfaces Compared in This Guide",
  title_es:"Comparativa de Interfaces Premium en Esta Guía",
  columns:[
    {title:"Neumann MT 48 (U)", title_es:"Neumann MT 48 (U)"},
    {title:"Universal Audio Apollo x8p Gen 2", title_es:"Universal Audio Apollo x8p Gen 2"},
    {title:"RME Fireface UFX III", title_es:"RME Fireface UFX III"},
    {title:"Apogee Symphony I/O Mk II 16×16 SE", title_es:"Apogee Symphony I/O Mk II 16×16 SE"},
    {title:"Audient ORIA", title_es:"Audient ORIA"},
    {title:"Lynx Aurora-n 16 (USB)", title_es:"Lynx Aurora-n 16 (USB)"}
  ],
  rows:[
    {label:"Best For", label_es:"Ideal Para", values:[
      {value:"Desktop tracking + network audio (AES67/Dante)", value_es:"Grabación de sobremesa + audio en red (AES67/Dante)"},
      {value:"Band tracking with 8 Unison pres & HEXA Core DSP", value_es:"Grabación de banda con 8 previos Unison y DSP HEXA Core"},
      {value:"Touring & complex routing (188 ch, DURec)", value_es:"Giras y ruteo complejo (188 canales, DURec)"},
      {value:"Modular studio (up to 32×32, HD/Dante/TB)", value_es:"Estudio modular (hasta 32×32, HD/Dante/TB)"},
      {value:"Dolby Atmos monitoring (up to 9.1.6)", value_es:"Monitorización Dolby Atmos (hasta 9.1.6)"},
      {value:"Mastering-grade transparent conversion", value_es:"Conversión transparente para mastering"}
    ]},
    {label:"Form Factor", label_es:"Formato", values:[
      {value:"Desktop, touchscreen, 2 pres", value_es:"Sobremesa, pantalla táctil, 2 previos"},
      {value:"1U rack, 16×22 I/O", value_es:"Rack 1U, 16×22 E/S"},
      {value:"2U rack, 188 ch with MADI", value_es:"Rack 2U, 188 canales con MADI"},
      {value:"2U rack, modular 16×16 SE (→32×32)", value_es:"Rack 2U, modular 16×16 SE (→32×32)"},
      {value:"Desktop/rack, monitor controller + 16 out", value_es:"Sobremesa/rack, controlador + 16 salidas"},
      {value:"1U rack, 16×16 line via DB25", value_es:"Rack 1U, 16×16 línea por DB25"}
    ]},
    {label:"Connectivity", label_es:"Conectividad", values:[
      {value:"USB-C + AES67/Dante", value_es:"USB-C + AES67/Dante"},
      {value:"Thunderbolt/USB-C (TB mandatory for DSP)", value_es:"Thunderbolt/USB-C (TB obligatorio para DSP)"},
      {value:"USB 3.0 + MADI, TotalMix FX", value_es:"USB 3.0 + MADI, TotalMix FX"},
      {value:"LSlot: TB / Dante / Pro Tools HD", value_es:"LSlot: TB / Dante / Pro Tools HD"},
      {value:"USB-C + ADAT/AES, 2 Console pres", value_es:"USB-C + ADAT/AES, 2 previos Console"},
      {value:"USB (LSlot: TB/Dante/HD), Word Clock 1-in 3-out", value_es:"USB (LSlot: TB/Dante/HD), Word Clock 1-in 3-out"}
    ]},
    {label:"Conversion / Clock", label_es:"Conversión / Reloj", values:[
      {value:"Neumann conversion, DSP monitor FX", value_es:"Conversión Neumann, FX de monitor por DSP"},
      {value:"167 dB D/A range, HEXA Core", value_es:"167 dB D/A, HEXA Core"},
      {value:"135 dB D/A, SteadyClock FS", value_es:"135 dB D/A, SteadyClock FS"},
      {value:"Flagship Apogee, DualView", value_es:"Apogee insignia, DualView"},
      {value:"DSP room calibration + Atmos DSP", value_es:"Calibración de sala por DSP + Atmos DSP"},
      {value:"HCT / SynchroLock 2, discrete per-pair", value_es:"HCT / SynchroLock 2, discreto por par"}
    ]},
    {label:"Preamp Character", label_es:"Carácter de Previo", values:[
      {value:"2× Neumann clean to 78 dB", value_es:"2× Neumann limpios hasta 78 dB"},
      {value:"8× Unison (Neve/API/SSL emulations)", value_es:"8× Unison (emulaciones Neve/API/SSL)"},
      {value:"Transparent, no colour emulation", value_es:"Transparente, sin emulación con color"},
      {value:"None included — bring external pres", value_es:"No incluye previos — usa externos"},
      {value:"2× Console, clean + colour switch", value_es:"2× Console, limpio + interruptor de color"},
      {value:"None — line converter (transparent)", value_es:"Ninguno — conversor de línea (transparente)"}
    ]},
    {label:"Monitoring / Extras", label_es:"Monitorización / Extras", values:[
      {value:"Touchscreen monitor controller + DSP reverb", value_es:"Control de monitores táctil + reverb por DSP"},
      {value:"Monitor Correction, Auto-Gain, 7.1 surround", value_es:"Monitor Correction, Auto-Gain, surround 7.1"},
      {value:"DURec to USB, 4× hi-Z ins, TotalMix 48-ch", value_es:"DURec a USB, 4× hi-Z, TotalMix 48 canales"},
      {value:"Expandable modules, 32-ch SD playback", value_es:"Módulos ampliables, playback 32 canales a SD"},
      {value:"9.1.6 Atmos, 530 filters, bass management", value_es:"9.1.6 Atmos, 530 filtros, gestión de graves"},
      {value:"32-ch microSD recorder, 2 HP amps", value_es:"Grabador microSD 32 canales, 2 amps de auriculares"}
    ]}
  ]
};
// remove old two-value comparison so template doesn't render duplicate table
delete g.comparison;

// --- verdictProsCons: 6 entries ---
g.verdictProsCons=[
  {name:"Neumann MT 48 (U) Premium Audio Interface", name_es:"Neumann MT 48 (U) Premium Audio Interface", pros:["Touchscreen plus AES67/Dante in a desktop box you actually want on the desk","2 Neumann mic pres to 78 dB with DSP EQ/dynamics/reverb built in","USB-C with rock-solid driver for both tracking and location work"], cons:["Only two built-in pres — eight-mic sessions need external pres","AES67/Dante adds a network learning curve if you have never used it","Desktop footprint, not a rack unit"], pros_es:["Pantalla táctil y AES67/Dante en una caja que apetece tener a mano","2 previos Neumann hasta 78 dB con EQ/dinámica/reverb por DSP dentro","USB-C con driver sólido tanto en estudio como en exteriores"], cons_es:["Solo dos previos integrados — para ocho micros necesitas previos externos","AES67/Dante pide aprender red si no lo has usado nunca","Formato de sobremesa, no es unidad de rack"]},
  {name:"Universal Audio Apollo x8p Gen 2", name_es:"Universal Audio Apollo x8p Gen 2", pros:["8 Unison pres with HEXA Core lets you track through Neve/API/SSL strips with no latency","16×22 with Monitor Correction and Auto-Gain is built for band tracking","Thunderbolt/USB-C hybrid keeps it usable on modern Mac/PC"], cons:["Thunderbolt required to use the DSP properly","UAD plugin library is an ongoing cost if you want the emulations","Fan and 1U depth need rack planning"], pros_es:["8 previos Unison con HEXA Core para grabar a través de canales Neve/API/SSL sin latencia","16×22 con Monitor Correction y Auto-Gain pensado para grabar bandas","Híbrido Thunderbolt/USB-C para Mac/PC actuales"], cons_es:["Pide Thunderbolt para aprovechar el DSP","La librería UAD es un gasto continuo si quieres las emulaciones","Ventilador y fondo 1U piden planificar el rack"]},
  {name:"RME Fireface UFX III", name_es:"RME Fireface UFX III", pros:["Drivers and SteadyClock FS you stop thinking about — it just stays locked","TotalMix FX 48-channel mixer plus DURec to USB for recorder-free capture","188 channels with MADI and four hi-Z inputs cover any remote rig"], cons:["TotalMix is powerful but has a learning curve","No amp colour emulation — transparent by design","2U and cable-dense, not a grab-and-go box"], pros_es:["Drivers y SteadyClock FS que te hacen olvidar el reloj — se queda clavado","Mezclador TotalMix FX de 48 canales y DURec a USB para grabar sin ordenador","188 canales con MADI y cuatro entradas hi-Z para cualquier bolo"], cons_es:["TotalMix es potente pero tiene curva de aprendizaje","Sin emulación de previo con color — transparente por diseño","2U y denso en cableado, no es una caja de llevar y listo"]},
  {name:"Apogee Symphony I/O Mk II 16×16 SE", name_es:"Apogee Symphony I/O Mk II 16×16 SE", pros:["Flagship Apogee conversion with a modular chassis you grow 16→32","DualView touchscreen and LSlot for TB/HD/Dante on the same frame","Rock-solid when the room is booked by the day"], cons:["Most expensive path once you add modules","No mic pres in the SE line — add external pres","2U and heavier than a desktop converter"], pros_es:["Conversión Apogee insignia con chasis modular que crece de 16 a 32","Pantalla DualView y LSlot para TB/HD/Dante en el mismo marco","Sólido cuando la sala se alquila por días"], cons_es:["La ruta más cara una vez sumas módulos","La línea SE no trae previos — añade previos externos","2U y más pesado que un conversor de sobremesa"]},
  {name:"Audient ORIA Immersive Audio Interface", name_es:"Audient ORIA Immersive Audio Interface", pros:["Purpose-built for Atmos: 16 outs, 9.1.6 with 530 correction filters and bass management","Two Audient Console pres plus ADAT/AES keep a hybrid rig simple","Monitor-controller workflow that replaces a separate controller"], cons:["If you only mix stereo, you pay for Atmos you will not use","USB-C only — no MADI/Dante on board","Newer platform with fewer community presets than RME"], pros_es:["Pensada para Atmos: 16 salidas, 9.1.6 con 530 filtros de corrección y gestión de graves","Dos previos Console más ADAT/AES para un rig híbrido sencillo","Flujo de controlador de monitores que te ahorra un controlador aparte"], cons_es:["Si solo mezclas en estéreo, pagas Atmos que no vas a usar","Solo USB-C — sin MADI/Dante a bordo","Plataforma más joven, con menos presets de comunidad que RME"]},
  {name:"Lynx Aurora-n 16 (USB)", name_es:"Lynx Aurora-n 16 (USB)", pros:["Mastering transparency with Hilo-derived conversion and a discrete converter per pair","SynchroLock 2 clocking and LSlot USB/TB/Dante/HD future-proofing","32-channel microSD recorder plus two audiophile headphone amps"], cons:["DB25 line I/O needs breakout cables","No mic pres at all — converter only","1-in/3-out word clock, not a full clock distributor"], pros_es:["Transparencia de mastering con conversión derivada de Hilo y convertidor dedicado por par","Reloj SynchroLock 2 y LSlot USB/TB/Dante/HD a prueba de futuro","Grabador microSD de 32 canales y dos amplis de auriculares audiófilos"], cons_es:["E/S de línea por DB25 pide breakout","Sin ningún previo — solo conversor","Word clock 1-in/3-out, no distribuidor completo"]}
];

// --- verdict & conclusion: cover all 6 ---
g.verdict="Need UAD colour while tracking? Apollo x8p Gen 2. Need a desk controller that also does network audio? Neumann MT 48. Need Atmos without a separate monitor controller? Audient ORIA. Need MADI and DURec that never misses? RME UFX III. Need modular flagship conversion for a booked room? Apogee Symphony Mk II. Need transparent mastering conversion you keep for a decade? Lynx Aurora-n 16. For most pro rooms, the sane split is UAD or RME for the tracking core and Lynx/Apogee/Neumann for the conversion and monitor side — match the job, not the logo.";
g.verdict_es="¿Quieres color UAD al grabar? Apollo x8p Gen 2. ¿Un controlador de sobremesa con audio en red? Neumann MT 48. ¿Atmos sin sumar otro controlador? Audient ORIA. ¿MADI y DURec que nunca falla? RME UFX III. ¿Conversión insignia modular para una sala que se alquila por días? Apogee Symphony Mk II. ¿Transparencia de mastering para diez años? Lynx Aurora-n 16. En la mayoría de estudios pro, la combinación sensata es UAD o RME como núcleo de grabación y Lynx/Apogee/Neumann en la parte de conversión y monitorización — elige por el trabajo, no por el logo.";
g.conclusion="<p>The six here all belong in a permanent rack — the question is which job you buy them for. Neumann MT 48 (U) wins the desktop when you need network audio and a real monitor controller on the desk. Audient ORIA wins immersive when you build in Atmos from day one. Apollo x8p Gen 2 wins tracking when you live in UAD Unison. RME Fireface UFX III wins uptime when you tour, do remote MADI or cannot afford a dropout. Apogee Symphony I/O Mk II wins the modular studio that grows 16→32. Lynx Aurora-n 16 wins mastering and critical printing where transparency is the whole point.</p><p>Match the box to the bottleneck: pres and DSP? Apollo. Stability and routing? RME. Network and touchscreen? Neumann. Atmos? ORIA. Module growth? Apogee. Pure conversion? Lynx.</p><p><a href=\"/guides/best-interface.html\" class=\"guide-link-btn\">Best Audio Interface for Home Recording</a> <a href=\"/guides/portable-interfaces.html\" class=\"guide-link-btn\">Best Portable Audio Interfaces</a> <a href=\"/guides/budget-interfaces.html\" class=\"guide-link-btn\">Best Interfaces Under $300</a></p>";
g.conclusion_es="<p>Las seis merecen sitio fijo en rack — la pregunta es para qué trabajo las compras. La Neumann MT 48 (U) gana en sobremesa cuando necesitas audio en red y un controlador de monitores de verdad a mano. La Audient ORIA gana en inmersivo cuando naces en Atmos. La Apollo x8p Gen 2 gana para grabar si vives en Unison de UAD. La RME Fireface UFX III gana en fiabilidad cuando giras, tiras de MADI remoto o no te puedes permitir un cuelgue. La Apogee Symphony I/O Mk II gana en el estudio modular que crece de 16 a 32. La Lynx Aurora-n 16 gana en mastering e impresión crítica donde la transparencia lo es todo.</p><p>Elige la caja por el cuello de botella: ¿previos y DSP? Apollo. ¿Estabilidad y ruteo? RME. ¿Red y pantalla táctil? Neumann. ¿Atmos? ORIA. ¿Crecimiento por módulos? Apogee. ¿Conversión pura? Lynx.</p><p><a href=\"/guides/best-interface_es.html\" class=\"guide-link-btn\">Mejor Interfaz para Grabación Casera</a> <a href=\"/guides/portable-interfaces_es.html\" class=\"guide-link-btn\">Mejores Interfaces Portátiles</a> <a href=\"/guides/budget-interfaces_es.html\" class=\"guide-link-btn\">Mejores Interfaces por Menos de $300</a></p>";

// --- FAQ: add entries for missing products, keep existing but fix year/product names ---
// keep first 5, update any x16 reference to x8p Gen 2
g.faq=g.faq.map(function(f){
  if(f.q && f.q.indexOf('x16')>=0){ f.q=f.q.replace('x16 Gen 2','x8p Gen 2'); f.q_es=f.q_es.replace('x16 Gen 2','x8p Gen 2'); f.a=f.a.replace('x16 Gen 2','x8p Gen 2').replace('167dB','167dB'); f.a_es=f.a_es.replace('x16 Gen 2','x8p Gen 2'); }
  return f;
});
g.faq.push(
  {q:"Is the Neumann MT 48 worth it if I only need two channels?", a:"If your work is vocals, voiceover or mobile recording and you want network audio plus a real monitor controller, yes — its two Neumann pres, touchscreen and AES67/Dante cover a desk without extra boxes. If you regularly need eight mics at once, a rack unit like the Apollo x8p or RME saves you external pres.", q_es:"¿Merece la pena la Neumann MT 48 si solo necesito dos canales?", a_es:"Si lo tuyo son voces, locución o grabar fuera y quieres audio en red con un controlador de verdad, sí — sus dos previos Neumann, la pantalla táctil y AES67/Dante te resuelven la mesa sin sumar cajas. Si sueles grabar ocho micros a la vez, te compensa más una unidad de rack como la Apollo x8p o la RME."},
  {q:"Do I need the Audient ORIA if I do not mix in Atmos yet?", a:"Not until you plan to deliver immersive. ORIA earns its price when you actually build a 7.1.4 or 9.1.6 room with calibration and bass management. For stereo only, the same money buys more I/O elsewhere.", q_es:"¿Necesito la Audient ORIA si aún no mezclo en Atmos?", a_es:"No, hasta que planees entregar inmersivo. La ORIA se justifica cuando de verdad montas una sala 7.1.4 o 9.1.6 con calibración y gestión de graves. Solo para estéreo, ese presupuesto te da más E/S en otro lado."},
  {q:"Apogee Symphony vs Lynx Aurora-n — which is the more transparent converter?", a:"Both are built for transparency, but Lynx is the purist tool: a discrete converter per channel pair, Hilo technology and SynchroLock 2 are voiced to add nothing. Symphony gives you the same transparency with a modular, expandable studio chassis and DualView control. For mastering, pick Lynx; for a growing commercial room, pick Apogee.", q_es:"Apogee Symphony vs Lynx Aurora-n — ¿cuál es el conversor más transparente?", a_es:"Ambos buscan transparencia, pero Lynx es la herramienta purista: un convertidor dedicado por cada par, tecnología Hilo y SynchroLock 2 pensados para no añadir nada. Symphony te da esa misma transparencia con un chasis modular ampliable y control DualView. Para mastering, Lynx; para una sala comercial que crece, Apogee."}
);

// --- featuredSnippet: keep but fix names ---
if(g.featuredSnippet){
  g.featuredSnippet.title_en="Premium Interfaces Compared: 6 Flagship Picks";
  g.featuredSnippet.title_es="Interfaces Premium Comparadas: 6 Elecciones Insignia";
  g.featuredSnippet.name1_en="Universal Audio Apollo x8p Gen 2";
  g.featuredSnippet.name1_es="Universal Audio Apollo x8p Gen 2";
  g.featuredSnippet.name2_en="RME Fireface UFX III";
  g.featuredSnippet.name2_es="RME Fireface UFX III";
}

fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('done premium fixed to 6');
