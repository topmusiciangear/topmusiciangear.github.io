var fs=require('fs');
var P='data/guides.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var g=A.find(x=>x.id==='premium-interfaces');

g.sections=[
  {
    h:"Is the Neumann MT 48 the Best Desktop Premium Interface for Network Audio?",
    h_es:"¿Es la Neumann MT 48 la Mejor Interfaz Premium de Sobremesa para Audio en Red?",
    intro:"Desktop reference conversion with a real monitor controller you touch.",
    intro_es:"Conversión de referencia de sobremesa con un controlador de verdad que tocas.",
    content:"<p><strong>The Neumann MT 48 (U) is the only desktop interface here that gives you a full monitor controller with touchscreen plus AES67/Dante network audio in the same box.</strong> Two Neumann preamps to 78 dB with 136 dB-A conversion, four monitor outs, two ultra-low-impedance headphone amps with crossfeed, and Merging DSP (4-band EQ + dynamics + reverb) let you track, cue and monitor without opening an app. Add ADAT/S/PDIF, MIDI/GPIO and Monitor Mission (up to 22.2, 32×16 over USB, 128 AoIP sources) and you can run a vocal booth, a small mix room and a location rig without rewiring. Two pres is the limit — for eight mics at once you bring external pres.</p>",
    content_es:"<p><strong>La Neumann MT 48 (U) es la única de sobremesa que te da un controlador de monitores completo con pantalla táctil y audio en red AES67/Dante en la misma caja.</strong> Dos previos Neumann hasta 78 dB con conversión 136 dB-A, cuatro salidas de monitor, dos amplis de auriculares de impedancia ultrabaja con crossfeed y DSP Merging (EQ 4 bandas + dinámica + reverb) te dejan grabar, enviar cue y monitorizar sin abrir una app. Suma ADAT/S/PDIF, MIDI/GPIO y Monitor Mission (hasta 22.2, 32×16 por USB, 128 fuentes AoIP) y llevas la misma caja de la cabina vocal a una sala pequeña o a exteriores sin recablear. El límite son dos previos — para ocho micros a la vez sumas previos externos.</p>",
    products:[512]
  },
  {
    h:"Is the Audient ORIA the Best Immersive Monitor Controller for Dolby Atmos?",
    h_es:"¿Es la Audient ORIA el Mejor Controlador Inmersivo para Dolby Atmos?",
    intro:"The Atmos desk tool that replaces a separate monitor controller.",
    intro_es:"La herramienta de sobremesa para Atmos que te ahorra un controlador aparte.",
    content:"<p><strong>The Audient ORIA is the purpose-built Atmos interface and monitor controller you didn't know you needed until you try to do 9.1.6 without it.</strong> 16 analogue + 16 AES outs, two relayed stereo outs, two Audient Console pres (60 dB, mic/line/Hi-Z), 126.5 dB D/A and dual-DSP Advanced Speaker Processing (32 profiles, 8-band EQ per channel, trim 0.1 dB, delay 0–75 ms, bass management) let you switch stereo/5.1/7.1.4/9.1.6 on the same speakers. Sonarworks + Dolby certified, plus iPad/Stream Deck/Eucon remote. It is USB-C only via ADAT or optional Dante AoIP — brilliant for immersive, overkill if you only mix stereo, and the multichannel Sonarworks licence is a 60-day trial.</p>",
    content_es:"<p><strong>La Audient ORIA es el controlador e interfaz inmersiva hecho a propósito para Atmos que no valoras hasta que intentas hacer 9.1.6 sin él.</strong> 16 analógicas + 16 AES, dos estéreo dedicadas con relé, dos previos Console Audient (60 dB, micro/línea/Hi-Z), 126,5 dB D/A y procesado dual Advanced Speaker Processing (32 perfiles, EQ 8 bandas por canal, trim 0,1 dB, delay 0–75 ms, gestión de graves) te dejan saltar entre estéreo/5.1/7.1.4/9.1.6 con los mismos altavoces. Certificada Sonarworks + Dolby, con remoto iPad/Stream Deck/Eucon. Es USB-C por ADAT o tarjeta opcional AoIP Dante — brillante para inmersivo, sobrada si solo mezclas en estéreo, y la licencia multicanal de Sonarworks son 60 días de prueba.</p>",
    products:[515]
  },
  {
    h:"Is the Universal Audio Apollo x8p Gen 2 the Best Tracking Interface for UAD Users?",
    h_es:"¿Es la Universal Audio Apollo x8p Gen 2 la Mejor Interfaz para Grabar con UAD?",
    intro:"Eight Unison pres, HEXA Core and 16×22 for full-band tracking.",
    intro_es:"Ocho previos Unison, HEXA Core y 16×22 para grabar una banda entera.",
    content:"<p><strong>The Apollo x8p Gen 2 is the tracking room pick when you live in UAD.</strong> 16×22 I/O, eight Unison preamps that change impedance and gain to behave like Neve/API/Manley, HEXA Core (6 SHARC) for sub-2 ms realtime plug-ins, 130 dB D/A with Dual-Crystal clocking, and Apollo Monitor Correction by Sonarworks running on the DSP itself. DB25, ADAT/S/PDIF, 7.1 with Bass Management, Auto-Gain and Plug-In Scenes in Console make a drum kit or band take feel effortless. Thunderbolt 3 is mandatory and the best UAD plug-ins are add-on cost — budget that in.</p>",
    content_es:"<p><strong>La Apollo x8p Gen 2 es la elección para grabar cuando vives en UAD.</strong> 16×22 E/S, ocho previos Unison que cambian impedancia y ganancia para comportarse como Neve/API/Manley, HEXA Core (6 SHARC) para plugins en tiempo real por debajo de 2 ms, 130 dB D/A con reloj Dual-Crystal y Monitor Correction de Sonarworks corriendo en el propio DSP. DB25, ADAT/S/PDIF, 7.1 con gestión de graves, Auto-Gain y escenas de plugins en Console hacen que grabar batería o banda sea fluido. Pide Thunderbolt 3 y los mejores plugins UAD son compra aparte — cuéntalo en el presupuesto.</p>",
    products:[513]
  },
  {
    h:"Is the RME Fireface UFX III the Best Tour-Proof Interface for Reliability?",
    h_es:"¿Es la RME Fireface UFX III la Interfaz Más Fiable para Giras?",
    intro:"188 channels, SteadyClock FS and DURec when the show cannot stop.",
    intro_es:"188 canales, SteadyClock FS y DURec cuando el bolo no puede parar.",
    content:"<p><strong>The RME Fireface UFX III is the uptime pick.</strong> 94 analogue/digital channels expandable to 188 with MADI over USB 3.0, SteadyClock FS that stays locked where others drift, TotalMix FX 48-channel mixer with DIGICheck metering and loopback, DURec direct-to-USB multitrack without a laptop, four hi-Z instrument inputs and two low-latency headphone amps. Drivers that survive a decade of OS updates — TotalMix is deep at first, but it never lets a session down. Transparent by design, no colour emulation, and a 2U cable-dense rear you plan your rack around.</p>",
    content_es:"<p><strong>La RME Fireface UFX III es la elección para no fallar.</strong> 94 canales analógico/digital ampliables a 188 con MADI por USB 3.0, SteadyClock FS que se queda clavado donde otros se van, mesa TotalMix FX de 48 canales con medición DIGICheck y loopback, DURec directo a USB para multipista sin portátil, cuatro entradas hi-Z y dos amplis de auriculares de baja latencia. Drivers que sobreviven una década de actualizaciones — TotalMix es profundo al principio, pero nunca deja tirada una sesión. Transparente por diseño, sin emulación de color, y trasera densa 2U que pide planificar el rack.</p>",
    products:[183]
  },
  {
    h:"Is the Apogee Symphony I/O Mk II 16×16 SE the Best Modular Interface for Growing Studios?",
    h_es:"¿Es la Apogee Symphony I/O Mk II 16×16 SE la Mejor Interfaz Modular para Estudios que Crecen?",
    intro:"Flagship conversion in a chassis you expand 16→32→64.",
    intro_es:"Conversión insignia en un chasis que amplías de 16 a 32 y 64.",
    content:"<p><strong>The Apogee Symphony I/O Mk II 16×16 SE is the modular studio pick.</strong> Flagship Apogee conversion (A/D 124 dB, D/A 131 dB with Perfect Symmetry Circuitry), 16×16 SE on two DB25s per module, DualView touchscreen and Symphony Control, and an LSlot you swap between Thunderbolt, Pro Tools HD and Dante. Build 16×16 today, add a second SE for 32×32, daisy-chain two chassis for 64 channels at 1.35 ms @96 kHz/32 buffer, and keep Constant Current Drive headphones flat with any load. Chassis alone is ~$3,999 and SE ships with no mic pres — you bring your own and choose modules at home, plug-and-play.</p>",
    content_es:"<p><strong>La Apogee Symphony I/O Mk II 16×16 SE es la elección modular para estudio.</strong> Conversión Apogee insignia (A/D 124 dB, D/A 131 dB con Perfect Symmetry Circuitry), 16×16 SE por dos DB25 por módulo, táctil DualView y Symphony Control, con LSlot intercambiable entre Thunderbolt, Pro Tools HD y Dante. Monta 16×16 hoy, suma otra SE para 32×32, encadena dos chasis para 64 canales a 1,35 ms a 96 kHz/32 buffer y mantén auriculares Constant Current Drive planos con cualquier carga. Solo chasis ~3.999 $ y la SE viene sin previos — pones los tuyos y eliges módulos en casa, plug-and-play.</p>",
    products:[514]
  },
  {
    h:"Is the Lynx Aurora-n 16 (USB) the Best Mastering Converter for Transparency?",
    h_es:"¿Es la Lynx Aurora-n 16 (USB) el Mejor Conversor para Mastering Transparente?",
    intro:"Hilo-derived, discrete per-pair conversion with SynchroLock 2.",
    intro_es:"Derivado de Hilo, discreto por par, con SynchroLock 2.",
    content:"<p><strong>The Lynx Aurora-n 16 (USB) is the mastering transparency pick.</strong> 16×16 AD/DA via DB25 at 24-bit/192 kHz with Hilo Converter Technology, a discrete converter per channel pair for crosstalk down to -130 dB and THD+N to -113 dB, SynchroLock 2 clock with 300,000:1 jitter reduction and 5 s lock (1-in 3-out word clock), LSlot future-proof for USB/Thunderbolt/Dante/Pro Tools HD, and a 32-channel microSD recorder that does 66 hours on 2 TB at 32×96k plus two audiophile headphone amps. Expandable 8→16→24→32 with LM-DIG/LM-PRE4 modules. DB25 needs breakout cables and AES I/O needs the optional LM-DIG — no mic pres, converter only.</p>",
    content_es:"<p><strong>La Lynx Aurora-n 16 (USB) es la elección transparente para mastering.</strong> 16×16 AD/DA por DB25 a 24-bit/192 kHz con tecnología Hilo, convertidor dedicado por cada par para diafonía -130 dB y THD+N -113 dB, reloj SynchroLock 2 con reducción de jitter 300.000:1 y enganche 5 s (word clock 1-in 3-out), LSlot a prueba de futuro para USB/Thunderbolt/Dante/Pro Tools HD y grabador microSD 32 canales que hace 66 horas en 2 TB a 32×96k más dos amplis de auriculares audiófilos. Ampliable 8→16→24→32 con módulos LM-DIG/LM-PRE4. DB25 pide breakout y la E/S AES pide el LM-DIG opcional — sin previos, solo conversor.</p>",
    products:[516]
  }
];

fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('done 6 sections');
