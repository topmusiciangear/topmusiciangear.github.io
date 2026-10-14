var fs=require('fs');
var P='data/guides.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var g=A.find(x=>x.id==='premium-interfaces');

// Expand verdictProsCons to 5 pros, 4-5 cons, verified specs
g.verdictProsCons=[
  {
    name:"Neumann MT 48 (U) Premium Audio Interface", name_es:"Neumann MT 48 (U) Premium Audio Interface",
    pros:[
      "Reference 136 dB-A AD conversion — Merging-designed, four times the resolution of class rivals",
      "2 Neumann mic pres to 78 dB plus 2 line/instrument ins with -129 dBu EIN; drives ribbons cleanly",
      "Touchscreen + 4 independent monitor mixes and DSP EQ/dynamics/reverb — no app hopping",
      "USB-C plus ADAT/S/PDIF and AES67 (Dante Ready) with Monitor Mission up to 22.2 / 32×16 over USB",
      "Two ultra-low-impedance headphone amps (0.035 Ω) with crossfeed — mix-check without a separate amp"
    ],
    cons:[
      "Only two built-in mic pres — octet sessions need external pres via ADAT or network",
      "Network audio adds setup (ANEMAN, AES67/Dante licence) if you have never run AoIP",
      "MIDI via TRS-to-DIN adapter (Cat. 700261) not included",
      "Desktop format — you trade rack density for hands-on control"
    ],
    pros_es:[
      "Conversión de referencia 136 dB-A — diseño Merging, cuatro veces más resolución que la competencia",
      "2 previos Neumann hasta 78 dB más 2 entradas de línea/instrumento con EIN de -129 dBu; mueve cintas sin ruido",
      "Pantalla táctil + 4 mezclas de monitores independientes y EQ/dinámica/reverb por DSP — sin ir a la app",
      "USB-C más ADAT/S/PDIF y AES67 (Dante Ready) con Monitor Mission hasta 22.2 / 32×16 por USB",
      "Dos amplis de auriculares de impedancia ultrabaja (0,035 Ω) con crossfeed — compruebas mezcla sin otro ampli"
    ],
    cons_es:[
      "Solo dos previos de micro integrados — para ocho micros necesitas previos externos por ADAT o red",
      "El audio en red añade configuración (ANEMAN, licencia AES67/Dante) si nunca has usado AoIP",
      "MIDI por adaptador TRS a DIN (Cat. 700261) no incluido",
      "Formato de sobremesa — cambias densidad de rack por control a mano"
    ]
  },
  {
    name:"Universal Audio Apollo x8p Gen 2", name_es:"Universal Audio Apollo x8p Gen 2",
    pros:[
      "8 Unison mic pres that change impedance/gain structure to match Neve/API/Manley emulations in real time",
      "HEXA Core (6 SHARC) for sub-2 ms realtime UAD plug-ins plus hybrid native DSP in the DAW",
      "Elite Gen 2 conversion: 130 dB D/A, -127 dB THD, Dual-Crystal clocking — monitor path you trust",
      "16×22 I/O (8×14 analog) with DB25, ADAT/S/PDIF and 7.1 surround plus Bass Management",
      "Auto-Gain, Plug-In Scenes and Apollo Monitor Correction by Sonarworks on the DSP itself"
    ],
    cons:[
      "Thunderbolt 3 required for DSP — not class-compliant USB audio",
      "Best UAD plug-ins are add-on cost (Essentials+/Studio+ only bundles a starter set)",
      "1U depth plus fan and DB25 cabling needs rack planning",
      "Headphone knobs are close together on the front panel"
    ],
    pros_es:[
      "8 previos Unison que cambian impedancia y ganancia para clavar Neve/API/Manley en tiempo real",
      "HEXA Core (6 SHARC) para plugins UAD por debajo de 2 ms más DSP nativo híbrido en el DAW",
      "Conversión Gen 2 de elite: 130 dB D/A, -127 dB THD, reloj Dual-Crystal — ruta de monitor en la que confías",
      "16×22 E/S (8×14 analógicas) con DB25, ADAT/S/PDIF y surround 7.1 con gestión de graves",
      "Auto-Gain, escenas de plugins y Monitor Correction de Sonarworks corriendo en el propio DSP"
    ],
    cons_es:[
      "Exige Thunderbolt 3 para usar el DSP — no es audio USB genérico",
      "Los mejores plugins UAD son compra aparte (Essentials+/Studio+ solo traen base)",
      "Fondo 1U con ventilador y cableado DB25 pide planificar rack",
      "Los potes de auriculares quedan muy juntos en el frontal"
    ]
  },
  {
    name:"RME Fireface UFX III", name_es:"RME Fireface UFX III",
    pros:[
      "188 channels with MADI + USB 3.0 — SteadyClock FS holds lock where others drift",
      "TotalMix FX 48-channel mixer with DIGICheck metering and loopback",
      "DURec to USB for standalone multitrack without a laptop",
      "4 hi-Z instrument inputs and 2 ultra-low-latency headphone amps",
      "Drivers that survive a decade of OS updates — RME's long-term support reputation"
    ],
    cons:[
      "TotalMix is deep — first week is a learning curve",
      "Transparent by design, no analogue colour emulation on the pres",
      "2U, cable-dense rear — not a throw-in-a-backpack box",
      "Front display is small versus a full touchscreen"
    ],
    pros_es:[
      "188 canales con MADI + USB 3.0 — SteadyClock FS se queda clavado donde otros se van",
      "Mezclador TotalMix FX de 48 canales con medición DIGICheck y loopback",
      "DURec a USB para multipista autónomo sin portátil",
      "4 entradas hi-Z y dos amplis de auriculares de latencia ínfima",
      "Drivers que sobreviven una década de cambios de sistema — la fama de RME en soporte"
    ],
    cons_es:[
      "TotalMix es profundo — la primera semana tiene curva",
      "Transparente por diseño, sin emulación de color analógico en previos",
      "2U y trasera densa en cableado — no es una caja de llevar en mochila",
      "Pantalla frontal pequeña frente a una táctil completa"
    ]
  },
  {
    name:"Apogee Symphony I/O Mk II 16×16 SE", name_es:"Apogee Symphony I/O Mk II 16×16 SE",
    pros:[
      "Flagship conversion — A/D 124 dB (A-weighted), D/A 131 dB with Perfect Symmetry Circuitry",
      "Modular 16×16 SE (→32×32) — swap Thames/HD/Dante modules at home, plug-and-play",
      "DualView touchscreen plus Symphony Control — deep yet fast to navigate",
      "Daisy-chain 2 chassis for 64 channels; ultra-low 1.35 ms latency at 96 kHz/32 buffer",
      "Constant Current Drive headphone output that stays flat with any load"
    ],
    cons:[
      "Chassis alone ~$3,999 — modules extra and SE ships with no mic pres",
      "Thunderbolt is Mac-centric; HD/Dante installs need option cards",
      "2U, 150 W and deeper chassis than a 1U converter",
      "No MIDI I/O on the chassis itself"
    ],
    pros_es:[
      "Conversión insignia — A/D 124 dB, D/A 131 dB con Perfect Symmetry Circuitry",
      "Modular 16×16 SE (→32×32) — cambias módulos Thames/HD/Dante en casa, plug-and-play",
      "Táctil DualView más Symphony Control — profundo y rápido de navegar",
      "Encadena 2 chasis para 64 canales; latencia 1,35 ms a 96 kHz/32 buffer",
      "Salida de auriculares Constant Current Drive que se mantiene plana con cualquier carga"
    ],
    cons_es:[
      "Solo chasis ~3.999 $ — módulos aparte y la SE viene sin previos",
      "Thunderbolt centrado en Mac; HD/Dante pide tarjetas opcionales",
      "2U, 150 W y chasis más profundo que un conversor 1U",
      "Sin MIDI en el propio chasis"
    ]
  },
  {
    name:"Audient ORIA Immersive Audio Interface", name_es:"Audient ORIA Immersive Audio Interface",
    pros:[
      "Built for Atmos — 16 analogue + 16 AES outs, true 9.1.6 with 530 correction filters and bass management",
      "2 remote-controlled Audient Console pres (60 dB) that work as mic/line/Hi-Z",
      "Advanced Speaker Processing on dual DSP — 32 profiles, per-channel 8-band EQ, trim 0.1 dB, delay 0-75 ms",
      "Sonarworks + Dolby certified integration plus iPad/Stream Deck/Eucon remote",
      "Doubles as standalone monitor controller via ADAT or optional AoIP Dante card"
    ],
    cons:[
      "ADAT halves channels above 48 kHz (SMUX) — 16ch only up to 48 kHz",
      "Word Clock limited to 96 kHz",
      "If you only mix stereo, you pay for immersive you will not use",
      "60-day Sonarworks multichannel licence is trial — €499 to keep it"
    ],
    pros_es:[
      "Nacida para Atmos — 16 analógicas + 16 AES, 9.1.6 real con 530 filtros y gestión de graves",
      "2 previos Console Audient (60 dB) por control remoto que sirven como micro/línea/Hi-Z",
      "Procesado de altavoces en DSP dual — 32 perfiles, EQ 8 bandas por canal, trim 0,1 dB, delay 0-75 ms",
      "Integración Sonarworks + Dolby certificada con remoto iPad/Stream Deck/Eucon",
      "También funciona como controlador solo por ADAT o tarjeta AoIP Dante opcional"
    ],
    cons_es:[
      "ADAT recorta a la mitad por encima de 48 kHz (SMUX) — 16 canales solo hasta 48 kHz",
      "Word Clock limitado a 96 kHz",
      "Si solo mezclas en estéreo, pagas inmersivo que no vas a usar",
      "La licencia multicanal Sonarworks de 60 días es prueba — 499 € para quedártela"
    ]
  },
  {
    name:"Lynx Aurora-n 16 (USB)", name_es:"Lynx Aurora-n 16 (USB)",
    pros:[
      "Hilo-derived conversion with discrete converter per channel pair — crosstalk -130 dB, THD+N -113 dB",
      "SynchroLock 2 clock: 300,000:1 jitter reduction, 5 s lock, 1-in 3-out word clock",
      "LSlot future-proof: swap USB / Thunderbolt / Dante / Pro Tools HD",
      "32-channel microSD recorder (66 h on 2 TB at 32×96k) plus two audiophile headphone amps",
      "Expandable 8→16→24→32 channels — add LM-DIG/LM-PRE4 modules later"
    ],
    cons:[
      "DB25 analogue I/O needs breakout cables (Tascam pinout)",
      "No mic pres in base unit — line converter only",
      "No MIDI I/O",
      "AES digital I/O requires optional LM-DIG module"
    ],
    pros_es:[
      "Conversión derivada de Hilo con convertidor dedicado por par — diafonía -130 dB, THD+N -113 dB",
      "Reloj SynchroLock 2: reducción de jitter 300.000:1, enganche 5 s, word clock 1-in 3-out",
      "LSlot a prueba de futuro: cambia USB / Thunderbolt / Dante / Pro Tools HD",
      "Grabador microSD 32 canales (66 h en 2 TB a 32×96k) y dos amplis de auriculares audiófilos",
      "Ampliable 8→16→24→32 canales — sumas módulos LM-DIG/LM-PRE4 después"
    ],
    cons_es:[
      "E/S analógica por DB25 pide breakout (pinout Tascam)",
      "Sin previos en la unidad base — solo conversor de línea",
      "Sin MIDI",
      "La E/S digital AES pide módulo opcional LM-DIG"
    ]
  }
];

// Also tighten productTable conversion row with exact numbers from research
var r=g.productTable.rows.find(x=>x.label==="Conversion / Clock");
if(r){
  r.values[0].value="A/D 136 dB-A, 192 kHz, Merging tech"; r.values[0].value_es="A/D 136 dB-A, 192 kHz, tecnología Merging";
  r.values[1].value="D/A 130 dB, -127 dB THD, Dual-Crystal"; r.values[1].value_es="D/A 130 dB, -127 dB THD, Dual-Crystal";
  r.values[2].value="D/A 135 dB, SteadyClock FS"; r.values[2].value_es="D/A 135 dB, SteadyClock FS";
  r.values[3].value="A/D 124 dB, D/A 131 dB, PSC"; r.values[3].value_es="A/D 124 dB, D/A 131 dB, PSC";
  r.values[4].value="D/A 126.5 dB, dual DSP"; r.values[4].value_es="D/A 126,5 dB, DSP dual";
  r.values[5].value="A/D -108 dB, D/A -114 dB, 119/121 dB range, HCT"; r.values[5].value_es="A/D -108 dB, D/A -114 dB, 119/121 dB rango, HCT";
}

fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('done expanded to 5+ pros');
