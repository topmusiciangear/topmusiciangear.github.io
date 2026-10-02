// 1. Catalog renames (official Sennheiser spacing). 2. Copy verdicts across guides.
// 3. Hand-write verdicts with no source anywhere.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });

// 1. Renames
[['Sennheiser e906', 'Sennheiser e 906'], ['Sennheiser e604', 'Sennheiser e 604']].forEach(([a, b]) => {
  const p = P.find(x => x.title === a);
  if (p) { p.title = b; p.title_es = b; console.log('renamed catalog: ' + a + ' -> ' + b); }
});
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));

// 2. Copy verdicts
const copy = (dstId, title, srcId) => {
  const dst = G.find(x => x.id === dstId), src = G.find(x => x.id === srcId);
  if (dst.verdictProsCons.some(v => v.name === title)) return;
  const v = src.verdictProsCons.find(x => x.name === title);
  if (!v) { console.log('COPY FAIL ' + dstId + ' <- ' + srcId + ' : ' + title); return; }
  dst.verdictProsCons.push(JSON.parse(JSON.stringify(v)));
};
[
  ['starter-studio', 'Maono PD200X Dynamic Microphone', 'budget-usb-mics'],
  ['starter-studio', 'Aston Microphones Shield GN Pop Filter', 'studio-furniture'],
  ['starter-studio', 'Rode NT1 Signature Series', 'best-condenser-mics'],
  ['starter-studio', 'K&M 210/2 Mic Stand', 'studio-furniture'],
  ['starter-studio', 'Mogami Gold Studio XLR Cable', 'studio-furniture'],
  ['starter-studio', 'G4M Acoustics Squarewave Acoustic Treatment Panels (4-Pack)', 'studio-furniture'],
  ['best-interface', 'Rode Rodecaster Duo', 'streaming-interfaces'],
  ['best-interface', 'Roland Bridge Cast X', 'streaming-interfaces'],
  ['best-microphone', 'AKG C414 XLII', 'best-condenser-mics'],
  ['best-microphone', 'Rode NT1 Signature Series', 'best-condenser-mics'],
  ['best-microphone', 'MXL R144', 'best-ribbon-mics'],
  ['best-microphone', 'Royer R-121', 'best-ribbon-mics'],
  ['best-plugins', 'Universal Audio UAD Ultimate 14', 'channel-strip-plugins'],
  ['usb-mics', 'Maono PD200X Dynamic Microphone', 'budget-usb-mics'],
  ['usb-mics', 'Rode XCM-50 Compact USB Condenser Microphone', 'pro-microphones'],
  ['usb-mics', 'FIFINE AmpliGame AM8 Dynamic USB Microphone', 'budget-usb-mics'],
  ['usb-mics', 'Maono PM461 USB Microphone', 'budget-usb-mics'],
  ['usb-mics', 'TONOR TC-777 USB Microphone', 'budget-usb-mics'],
  ['usb-mics', 'Rode PodMic USB', 'best-mic-for-podcasting'],
  ['usb-mics', 'HyperX QuadCast 2', 'mics-for-creators'],
  ['usb-mics', 'Rode NT-USB Mini Studio Condenser Microphone', 'budget-usb-mics'],
  ['portable-interfaces', 'Audient iD14 MkII', 'best-interface'],
  ['guitar-pedals', 'Strymon BigSky MX', 'best-reverb-delay'],
  ['beginner-guitar', 'Enya Nova Go Sonic Smart Electric Guitar', 'best-beginner-electric-guitar'],
  ['beginner-guitar', 'Squier Sonic Mustang', 'best-beginner-electric-guitar'],
  ['best-mic-for-guitar-amps', 'Maono PD200X Dynamic Microphone', 'budget-usb-mics'],
  ['best-digital-mixers', 'Soundcraft Ui24R', 'best-32-channel-digital-mixers'],
  ['best-digital-mixers', 'PreSonus StudioLive 32SC', 'best-32-channel-digital-mixers'],
  ['active-vs-passive-pa', 'JBL EON712 Powered Speaker', 'live-sound-pa'],
  ['active-vs-passive-pa', 'EV ELX200-15P Powered Speaker', 'best-pa-speakers'],
  ['beat-making', 'Akai MPC Live III', 'pro-drum-machines'],
  ['beat-making', 'Akai MPC Sample', 'pro-drum-machines'],
  ['best-electric-guitars-2026', 'Strandberg Boden Essential 6', 'best-electric-guitar'],
  ['best-electric-guitars-2026', 'Ibanez AZ2402 Prestige', 'best-electric-guitar'],
  ['best-electric-guitars-2026', 'ESP E-II Eclipse DB', 'best-electric-guitar'],
  ['best-in-ear-monitors', 'Sennheiser IE 900', 'ie900-vs-se846'],
  ['best-in-ear-monitors', 'Sennheiser ew IEM G4-TWIN-E', 'ew-iem-g4-twin-vs-psm300']
].forEach(([d, t, s]) => copy(d, t, s));

// 3. Hand-written (no verdict anywhere)
const GV = (id, v) => G.find(x => x.id === id).verdictProsCons.push(v);
const xm8500 = VD('Behringer XM8500 Ultravoice Dynamic Microphone',
  ['Legendary $20 SM58-class performance', 'Cardioid pattern with good feedback rejection', 'Rugged build that survives gig bags', 'Best first vocal mic, period'],
  ['More handling noise than an SM58', 'Less top-end clarity than premium dynamics', 'No on/off switch version standard', 'Clip and pouch feel cheap'],
  ['Legendario rendimiento clase SM58 por $20', 'Patrón cardioide con buen rechazo feedback', 'Construcción robusta que aguanta fundas', 'Mejor primer micro vocal, punto'],
  ['Más ruido de manejo que un SM58', 'Menos claridad aguda que dinámicos premium', 'Sin versión estándar con interruptor', 'Clip y funda se sienten baratos']);
['starter-studio', 'usb-mics', 'best-mic-for-guitar-amps'].forEach(id => GV(id, JSON.parse(JSON.stringify(xm8500))));
GV('best-plugins', VD('TDR Kotelnikov GE',
  ['Mastering-grade wideband bus compression', 'Delta oversampling with zero latency option', 'FDRC peak-crest control tames harshness', 'Free version covers most needs'],
  ['Dense interface, tweaker-oriented', 'Subtle by design — no character color', 'No external sidechain input on all formats', 'Manual required to grasp FDRC'],
  ['Compresión de bus wideband grado mastering', 'Sobremuestreo delta con opción cero latencia', 'Control FDRC pico-cresta doma aspereza', 'Versión gratis cubre casi todo'],
  ['Interfaz densa, orientada a tweakers', 'Sutil por diseño — sin color de carácter', 'Sin entrada sidechain externa en todos formatos', 'Manual necesario para entender FDRC']));
GV('best-digital-mixers', VD('Soundcraft Ui16',
  ['16 channels mixed from any browser — no app install', 'Built-in WiFi plus Ethernet for reliability', 'dbx compression and Lexicon FX onboard', 'Cheapest multi-channel digital mixing'],
  ['Built-in WiFi is weak — bring an external router', 'Basic preamps next to Ui24R', 'Tablet-only control, no physical surface', 'Limited routing versus Ui24R'],
  ['16 canales desde cualquier navegador — sin instalar app', 'WiFi integrado más Ethernet para fiabilidad', 'Compresión dbx y FX Lexicon a bordo', 'Mezcla digital multicanal más barata'],
  ['WiFi integrado flojo — trae router externo', 'Preamps básicos frente al Ui24R', 'Control solo tablet, sin superficie física', 'Ruteo limitado frente al Ui24R']));
GV('best-digital-mixers', VD('Yamaha DM3 Standard',
  ['Console-grade D-PRE preamps in compact format', '9-inch touchscreen plus one-knob control', 'USB 18x18 multitrack recording', 'Yamaha reliability and support network'],
  ['Dante costs extra — step up to DM3-D', 'Single touchscreen for everything', 'No motorized faders at this size', 'Limited onboard FX versus bigger desks'],
  ['Preamps D-PRE grado consola en formato compacto', 'Táctil 9" más control de una perilla', 'Grabación multipista USB 18x18', 'Fiabilidad Yamaha y red de soporte'],
  ['Dante cuesta extra — sube al DM3-D', 'Una sola táctil para todo', 'Sin faders motorizados en este tamaño', 'FX a bordo limitados frente a mesas grandes']));
GV('best-digital-mixers', VD('Behringer WING Compact',
  ['Full WING processing engine in smaller footprint', 'Touchscreen plus motorized faders', '8 Midas Pro preamps, 48-channel USB', 'Expansion cards for Dante/MADI/Waves'],
  ['Premium jump over the X32 line', 'Deep menu system with learning curve', 'Still large for fly-date rigs', 'Overkill under 16 channels'],
  ['Motor WING completo en huella menor', 'Táctil más faders motorizados', '8 preamps Midas Pro, USB 48 canales', 'Tarjetas expansión Dante/MADI/Waves'],
  ['Salto premium sobre la línea X32', 'Sistema de menús profundo con curva', 'Grande aún para rigs de avión', 'Excesivo bajo 16 canales']));
GV('best-in-ear-monitors', VD('Xvive U4R4 Wireless IEM System (4 Receivers)',
  ['Four receivers in one box — whole band covered', 'License-free 2.4 GHz, no coordination', 'Under 5 ms latency, 107 dB range', 'Cheapest way to put four musicians on ears'],
  ['Single shared mix for all four receivers', '2.4 GHz shares band with venue Wi-Fi', 'Mono only, no stereo image', 'Plastic build across the system'],
  ['Cuatro receptores en una caja — banda completa cubierta', '2,4 GHz sin licencia, sin coordinación', 'Menos de 5 ms latencia, 107 dB rango', 'Forma más barata de poner cuatro músicos en ears'],
  ['Una sola mezcla compartida para los cuatro', '2,4 GHz comparte banda con Wi-Fi del local', 'Solo mono, sin imagen estéreo', 'Plástico en todo el sistema']));
GV('best-in-ear-monitors', VD('Phenyx Pro PTM-10 UHF Stereo IEM System',
  ['True stereo UHF wireless at budget price', 'Rack-mountable transmitter with LCD', 'Multiple receiver packs available', 'UHF avoids crowded 2.4 GHz band'],
  ['Stock earphones are basic — budget an upgrade', 'RF robustness below Sennheiser/Shure tier', 'Plasticky bodypacks', 'Limited frequency agility in cities'],
  ['Inalámbrico UHF estéreo real a precio presupuesto', 'Transmisor enrackable con LCD', 'Múltiples petacas disponibles', 'UHF evita la saturada banda 2,4 GHz'],
  ['Auriculares stock básicos — planea mejora', 'Robustez RF bajo el nivel Sennheiser/Shure', 'Petacas plásticas', 'Agilidad de frecuencia limitada en ciudad']));
GV('stream-controllers', VD('Elgato Wave XLR Pro',
  ['Dual XLR inputs with 80 dB ultralow-noise gain', '48V phantom on both channels', 'Wave Link software mixer with submixes', 'Headphone out with direct monitoring'],
  ['Wave Link needed for deep control', 'Single USB-C to computer', 'Pricey next to single-channel interfaces', 'No MIDI I/O'],
  ['Duales entradas XLR con 80 dB ganancia ultralimpia', 'Phantom 48V en ambos canales', 'Mezclador Wave Link con submezclas', 'Salida auriculares con monitoreo directo'],
  ['Wave Link necesario para control profundo', 'Un solo USB-C al ordenador', 'Caro frente a interfaces monocanal', 'Sin MIDI I/O']));

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('done');
