// premium-interfaces: fix all verdicts per user feedback + add Antelope Galaxy 32
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'premium-interfaces');

// Add Antelope Galaxy 32
g.productTable.columns.push(W('Antelope Audio Galaxy 32 Synergy Core'));

// Update rows - add Antelope column
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const put = (label, arr) => rows[label].values.push(...arr);

put('Best For', [V('Mastering-grade conversion + FPGA FX', 'Conversión mastering + FX FPGA')]);
put('Form Factor', [V('1U Rack', '1U Rack')]);
put('Connectivity', [V('Thunderbolt 3 / USB-C / MADI / ADAT', 'Thunderbolt 3 / USB-C / MADI / ADAT')]);
put('Conversion / Clock', [V('Atomic clock + FPGA DSP', 'Reloj atómico + DSP FPGA')]);
put('Preamp Character', [V('None (line-level converter)', 'Ninguno (convertidor nivel línea)')]);
put('Monitoring / Extras', [V('64 Synergy Core effects, MADI/ADAT', '64 efectos Synergy Core, MADI/ADAT')]);

// Fix all verdicts
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Neumann MT 48 (U)',
    ['Shared conversion with Merging Technologies = reference grade', '136 dB dynamic range — desktop interface benchmark', 'Touchscreen for standalone routing/monitoring', 'Dante/AES67 + MADI + ADAT + USB-C'],
    ['Touchscreen can feel cramped for complex routing sessions, forces computer software'],
    ['Conversión compartida con Merging Technologies = grado referencia', '136 dB rango dinámico — referencia interfaces escritorio', 'Pantalla táctil para routing/monitoreo standalone', 'Dante/AES67 + MADI + ADAT + USB-C'],
    ['Pantalla táctil puede quedarse justa en sesiones routing complejas, obliga a usar software PC']),
  VD('Universal Audio Apollo x8p Gen 2',
    ['Gen 2 HEXA Core DSP: 6 cores, massive UAD plugin power', 'Elite preamps with Unison technology', 'Thunderbolt 3 native on Windows & Mac', 'Auto-Gain, Relay Switching, LUFS metering'],
    ['Requires physical Thunderbolt 3/4 port on motherboard (common PC confusion with USB-C)'],
    ['Gen 2 HEXA Core DSP: 6 núcleos, poder UAD masivo', 'Preamps élite con tecnología Unison', 'Thunderbolt 3 nativo en Windows y Mac', 'Auto-Gain, Relay Switching, medición LUFS'],
    ['Requiere puerto Thunderbolt 3/4 físico en placa base (confusión común PC con USB-C)']),
  VD('RME Fireface UFX III',
    ['Legendary driver stability — sessions never crash', 'TotalMix FX = most powerful routing matrix', 'MADI + ADAT + AES + Analog all in 1U', 'SteadyClock FS = ultra-low jitter'],
    ['Rear panel cable density is extreme due to massive connectivity'],
    ['Estabilidad drivers legendaria — sesiones nunca caen', 'TotalMix FX = matriz routing más potente', 'MADI + ADAT + AES + Analógico todo en 1U', 'SteadyClock FS = jitter ultra-bajo'],
    ['Densidad cables panel trasero extrema por inmensa conectividad']),
  VD('Apogee Symphony I/O Mk II 16x16 SE',
    ['16x16 analog I/O line-level conversion, reference grade', 'Special Edition ~$6,999 complete (chassis ~$3,999 + modules)'],
    ['Zero mic preamps included — purely line-level AD/DA converter unless preamp module purchased separately'],
    ['16x16 I/O analógico conversión nivel línea, grado referencia', 'Special Edition ~$6,999 completa (chasis ~$3,999 + módulos)'],
    ['Cero preamplificadores micrófono incluidos — puramente convertidor AD/DA nivel línea salvo compra módulo previos aparte']),
  VD('Audient ORIA Immersive Audio Interface',
    ['Only interface built for Dolby Atmos / immersive calibration', 'DSP room correction processor included', '7.1.4 / 9.1.6 monitoring from single unit', 'ADAT + Dante + USB-C, monitor controller built-in'],
    ['Massive premium paid for DSP calibration wasted if not expanding to 7.1.4+ immersive'],
    ['Única interfaz hecha para calibración Dolby Atmos / inmersivo', 'Procesador DSP corrección sala incluido', 'Monitoreo 7.1.4 / 9.1.6 desde una unidad', 'ADAT + Dante + USB-C, controlador monitor integrado'],
    ['Prima enorme por DSP calibración desperdiciada si no expandes a 7.1.4+ inmersivo']),
  VD('Lynx Aurora-n 16 TB3',
    ['SynchroLock 2 clock = mastering-grade jitter performance', 'Thunderbolt 3 = massive bandwidth, ultra-low latency vs USB', '16x16 analog, ADAT, MADI optional', 'Legendary Lynx transparency'],
    ['Premium price, Thunderbolt 3 required'],
    ['Reloj SynchroLock 2 = jitter rendimiento mastering', 'Thunderbolt 3 = ancho banda masivo, latencia ultra-baja vs USB', '16x16 analógico, ADAT, MADI opcional', 'Transparencia legendaria Lynx'],
    ['Precio premium, Thunderbolt 3 requerido']),
  VD('Antelope Audio Galaxy 32 Synergy Core',
    ['32 channels conversion in 1U rack', 'Atomic clock precision + Synergy Core FPGA/DSP', '64 hardware effects emulate classics without CPU hit', 'Thunderbolt 3 / USB-C / MADI / ADAT'],
    ['Complex ecosystem (AFX Control), steep learning curve', 'Premium price for 1U'],
    ['32 canales conversión en 1U rack', 'Reloj atómico + Synergy Core FPGA/DSP', '64 efectos hardware emulan clásicos sin tocar CPU', 'Thunderbolt 3 / USB-C / MADI / ADAT'],
    ['Ecosistema complejo (AFX Control), curva aprendizaje pronunciada', 'Precio premium para 1U'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('premium-interfaces: cols=' + g.productTable.columns.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));