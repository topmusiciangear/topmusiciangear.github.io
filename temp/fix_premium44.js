// premium-interfaces: min 4 pros + 4 cons per verdict (new fixed rule).
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });

G.find(x => x.id === 'premium-interfaces').verdictProsCons = [
  VD('Neumann MT 48 (U)',
    ['Shared conversion with Merging Technologies = reference grade', '136 dB dynamic range — desktop interface benchmark', 'Touchscreen for standalone routing/monitoring', 'Dante/AES67 + MADI + ADAT + USB-C'],
    ['Touchscreen feels cramped for complex routing, forces computer software', 'Premium desktop price for the channel count', 'Dante/AES67 network setup overkill for stereo-only rooms', 'No UAD-style onboard DSP plugin ecosystem'],
    ['Conversión compartida con Merging Technologies = grado referencia', '136 dB rango dinámico — referencia interfaces escritorio', 'Pantalla táctil para routing/monitoreo standalone', 'Dante/AES67 + MADI + ADAT + USB-C'],
    ['Pantalla táctil justa para routing complejo, obliga a software PC', 'Precio desktop premium para el conteo de canales', 'Red Dante/AES67 excesiva para salas solo estéreo', 'Sin ecosistema DSP de plugins estilo UAD']),
  VD('Universal Audio Apollo x8p Gen 2',
    ['Gen 2 HEXA Core DSP: 6 cores, massive UAD plugin power', 'Elite preamps with Unison technology', 'Thunderbolt 3 native on Windows & Mac', 'Auto-Gain, Relay Switching, LUFS metering'],
    ['Requires physical Thunderbolt 3/4 port (common PC confusion with USB-C)', 'UAD plugins cost extra on top of the hardware', 'Internal fan audible in very quiet rooms', 'Locked to UA Console + UAD-2 ecosystem'],
    ['Gen 2 HEXA Core DSP: 6 núcleos, poder UAD masivo', 'Preamps élite con tecnología Unison', 'Thunderbolt 3 nativo en Windows y Mac', 'Auto-Gain, Relay Switching, medición LUFS'],
    ['Requiere puerto Thunderbolt 3/4 físico (confusión común PC con USB-C)', 'Plugins UAD cuestan extra sobre el hardware', 'Ventilador interno audible en salas silenciosas', 'Atado al ecosistema UA Console + UAD-2']),
  VD('RME Fireface UFX III',
    ['Legendary driver stability — sessions never crash', 'TotalMix FX = most powerful routing matrix', 'MADI + ADAT + AES + Analog all in 1U', 'SteadyClock FS = ultra-low jitter'],
    ['Rear panel cable density is extreme from massive connectivity', 'TotalMix FX has a steep learning curve', 'Premium price for the channel count', 'Rack-only form factor, no desktop version'],
    ['Estabilidad drivers legendaria — sesiones nunca caen', 'TotalMix FX = matriz routing más potente', 'MADI + ADAT + AES + Analógico todo en 1U', 'SteadyClock FS = jitter ultra-bajo'],
    ['Densidad cables trasera extrema por inmensa conectividad', 'TotalMix FX tiene curva aprendizaje pronunciada', 'Precio premium para el conteo de canales', 'Solo formato rack, sin versión escritorio']),
  VD('Apogee Symphony I/O Mk II 16x16 SE',
    ['16x16 analog I/O line-level conversion, reference grade', 'Special Edition ~$6,999 complete (chassis ~$3,999 + modules)', 'Legendary Apogee conversion clarity', 'Thunderbolt plus optional Dante/SoundGrid/HDX connectivity'],
    ['Zero mic preamps — purely line-level AD/DA unless preamp module added', 'Modular pricing escalates fast once configured', 'Mac-centric workflow, limited Windows story', 'Overkill unless running a booked commercial room'],
    ['16x16 I/O analógico nivel línea, grado referencia', 'Special Edition ~$6,999 completa (chasis ~$3,999 + módulos)', 'Claridad de conversión Apogee legendaria', 'Thunderbolt más conectividad opcional Dante/SoundGrid/HDX'],
    ['Cero preamps — puro AD/DA nivel línea salvo módulo previos', 'Precio modular escala rápido al configurar', 'Flujo Mac-céntrico, historia Windows limitada', 'Excesivo salvo sala comercial con reservas']),
  VD('Audient ORIA Immersive Audio Interface',
    ['Only interface built for Dolby Atmos / immersive calibration', 'DSP room correction processor included', '7.1.4 / 9.1.6 monitoring from single unit', 'ADAT + Dante + USB-C, monitor controller built-in'],
    ['Massive premium for DSP calibration wasted without 7.1.4+ expansion', 'Premium price over stereo monitor controllers', 'Calibration mic workflow has a learning curve', 'Deep functions live in software, not the front panel'],
    ['Única interfaz para calibración Dolby Atmos / inmersivo', 'Procesador DSP corrección sala incluido', 'Monitoreo 7.1.4 / 9.1.6 desde una unidad', 'ADAT + Dante + USB-C, controlador monitor integrado'],
    ['Prima enorme por DSP desperdiciada sin expansión 7.1.4+', 'Precio premium sobre controladores estéreo', 'Flujo micrófono calibración con curva aprendizaje', 'Funciones profundas en software, no en panel frontal']),
  VD('Lynx Aurora-n 16 TB3',
    ['SynchroLock 2 clock = mastering-grade jitter performance', 'Thunderbolt 3 = massive bandwidth, ultra-low latency vs USB', '16x16 analog, ADAT, MADI optional', 'Legendary Lynx transparency'],
    ['Premium price for conversion alone', 'Thunderbolt 3 only — no USB fallback on this version', 'No onboard DSP effects or monitor-controller features', 'MADI/Dante expansion via paid option cards'],
    ['Precio premium solo por conversión', 'Solo Thunderbolt 3 — sin respaldo USB en esta versión', 'Sin efectos DSP ni funciones controlador monitor', 'Expansión MADI/Dante vía tarjetas opcionales de pago']),
  VD('Antelope Audio Galaxy 32 Synergy Core',
    ['32 channels conversion in 1U rack', 'Atomic clock precision + Synergy Core FPGA/DSP', '64 hardware effects emulate classics without CPU hit', 'Thunderbolt 3 / USB-C / MADI / ADAT'],
    ['Complex ecosystem (AFX Control), steep learning curve', 'Premium price for 1U', 'AFX2DAW required to use FPGA FX inside the DAW', '32 channels demand serious cabling/patchbay planning'],
    ['32 canales conversión en 1U rack', 'Reloj atómico + Synergy Core FPGA/DSP', '64 efectos hardware emulan clásicos sin tocar CPU', 'Thunderbolt 3 / USB-C / MADI / ADAT'],
    ['Ecosistema complejo (AFX Control), curva pronunciada', 'Precio premium para 1U', 'AFX2DAW requerido para usar FPGA FX dentro del DAW', '32 canales exigen cableado/patchbay serios'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'premium-interfaces');
const bad = g.verdictProsCons.filter(v => v.pros.length < 4 || v.cons.length < 4 || v.pros_es.length < 4 || v.cons_es.length < 4);
console.log('verdicts=' + g.verdictProsCons.length + ' below-min=' + bad.map(v => v.name).join(','));
