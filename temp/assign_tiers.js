const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// ============================================================
// SISTEMA DE TIERS REALES
// Basado en: precio, reviews de usuarios, specs, posición de mercado
// ============================================================

const TIER_MAP = {
  // MONITORES - Flagship profesional
  'Genelec 8351B SAM 3-Way Coaxial Studio Monitor': 9.8,
  'Neumann KH 80 DSP': 9.7,
  'Adam Audio A7V': 9.6,
  'Focal Trio11 Be': 9.5,
  'Genelec 7370A SAM 12" Smart Active Studio Subwoofer': 9.5,
  'ATC SCS120 Pro': 9.5,
  'Barefoot Sound MicroSub45 Dual-Force 8" Active Studio Subwoofer (Pair)': 9.5,
  
  // MONITORES - Excelente (nearfield profesional)
  'Yamaha HS8': 9.4,
  'Kali Audio LP-6 V2': 9.3,
  'Mackie CR4.5': 9.2,
  'Adam Audio T5V': 9.2,
  'Genelec 8010A': 9.2,
  'Yamaha HS8S': 9.1,
  'Kali Audio IN-8 V2': 9.1,
  'Mackie MR624': 9.1,
  
  // MONITORES - Muy bueno
  'Mackie CR3.5': 8.9,
  'PreSonus Eris 3.5 2nd Gen': 8.9,
  'Yamaha HS5': 8.9,
  'Genelec 7050C': 8.9,
  'PreSonus Eris E4.5': 8.8,
  'M-Audio BX3': 8.8,
  'Mackie Thump215XT': 8.8,
  'JBL EON718S': 8.8,
  
  // MONITORES - Bueno
  'Behringer Truth 3.5 BT': 8.5,
  'M-Audio BX4': 8.5,
  'PreSonus Eris Studio 5': 8.5,
  'Yamaha DBR12': 8.5,
  'JBL PRX918XLF': 8.5,
  'Alto Professional TS412': 8.5,
  'EV ELX200-12': 8.5,
  'Mackie SRT215': 8.5,
  'Turbosound Flashline TFX122M-AN': 8.5,
  'Yamaha DHR12': 8.5,
  
  // MONITORES - Budget/Entry
  'Edifier R1280T': 8.0,
  'Yamaha MG16XU': 8.3,
  'Behringer FLOW 8': 8.2,
  
  // AURICULARES - Flagship
  'Audeze MM-500': 9.8,
  'Sennheiser HD 650': 9.6,
  'Beyerdynamic DT 1990 Pro': 9.5,
  'Neumann NDH 30': 9.5,
  
  // AURICULARES - Excelente
  'Audio-Technica ATH-M50x': 9.2,
  'Sony MDR-7506': 9.1,
  'Beyerdynamic DT 770 Pro': 9.1,
  'Shure SRH440A': 9.0,
  'Focal Listen Professional': 9.0,
  'Audio-Technica ATH-M70x': 9.0,
  'Shure SRH840A': 9.0,
  
  // AURICULARES - Bueno
  'AKG K371': 8.7,
  'Samson SR850': 8.5,
  'Shure SRH240A': 8.4,
  'Audio-Technica ATH-M20x': 8.3,
  
  // INTERFACES - Flagship
  'Universal Audio Apollo Twin X Gen 2': 9.7,
  'RME Babyface Pro FS': 9.7,
  'Antelope Orion Studio Synergy Core': 9.6,
  
  // INTERFACES - Excelente
  'SSL 2+ MKII': 9.3,
  'MOTU M4': 9.2,
  'Audient iD14 MkII': 9.2,
  'Universal Audio Volt 2': 9.1,
  'Audient EVO 4': 9.0,
  
  // INTERFACES - Bueno
  'Focusrite Scarlett 2i2 4th Gen': 8.8,
  'MOTU M2': 8.8,
  'Audient Horizon 8P': 8.8,
  'SSL UF1': 8.7,
  'PreSonus Studio 24c': 8.6,
  'Behringer U-Phoria UMC1820': 8.5,
  'Arturia MiniFuse 2': 8.7,
  'IK Multimedia AXE I/O': 8.6,
  
  // PLUGINS - Suite/Collection
  'FabFilter Total Bundle': 9.7,
  'Soundtoys 5.5 Bundle': 9.5,
  'iZotope Ozone 12 Advanced': 9.4,
  'FabFilter Mastering Bundle': 9.4,
  'Arturia V Collection 11 Pro': 9.1,
  'XLN Audio Addictive Keys': 8.8,
  'Native Instruments Noire': 8.7,
  'Native Instruments Kontakt 8': 9.2,
  'MeldaProduction MeldwayGrand': 8.5,
  
  // PLUGINS - Individual
  'FabFilter Pro-Q 4': 9.6,
  'Scaler 3': 8.8,
  'Zynaptiq PitchMap': 8.9,
  'Synchro Arts Revoice Pro 5': 9.0,
  'Sonnox VoxDoubler': 8.7,
  'iZotope Nectar 4 Advanced': 9.1,
  'Baby Audio Smooth Operator Pro': 8.9,
  'Brainworx bx_clipper': 8.8,
  'Mastering The Mix REFERENCE 3': 8.9,
  'W.A. Production Loop Engine 3': 8.5,
  'Audiomodern Playbeat 4': 8.6,
  'SongWish reMIDI 4': 8.5,
  
  // DRUM MACHINES / SAMPLERS
  'Elektron Digitakt II': 9.2,
  'Elektron Analog Rytm': 9.0,
  'Akai MPC One G2': 8.8,
  'Roland SP-404MKII': 8.9,
  'Native Instruments Maschine+': 8.8,
  'Teenage Engineering EP-133 K.O. II': 8.6,
  'Roland AIRA Compact T-8': 8.5,
  'Novation Circuit Rhythm': 8.5,
  
  // SYNTHESIZERS
  'Sequential Prophet-10': 9.3,
  'Sequential OB-6': 9.2,
  'Moog Muse': 9.1,
  'Sequential Take 5': 8.7,
  'ASM Hydrasynth Keyboard': 8.9,
  'Korg Minilogue XD': 8.6,
  'Behringer DeepMind 12': 8.3,
  'Arturia MicroFreak': 8.6,
  
  // GUITARS - Premium
  'Gibson Les Paul Standard \'60s': 9.3,
  'Fender American Professional II Stratocaster': 9.2,
  'Fender American Ultra II Stratocaster': 9.2,
  'Music Man StingRay Special': 9.1,
  'Dingwall Combustion 5-String Bass': 9.2,
  'PRS SE Custom 24': 8.9,
  
  // GUITARS - Entry
  'Yamaha Pacifica 112V': 8.6,
  'Squier Classic Vibe \'50s Stratocaster': 8.5,
  'Squier Affinity Series Stratocaster': 8.3,
  'Squier Affinity Series Precision Bass PJ': 8.4,
  'Squier Classic Vibe \'70s Jazz Bass V': 8.5,
  'Squier Debut Series Stratocaster': 8.2,
  'Gretsch G9500 Jim Dandy': 8.5,
  'Gretsch G5021E Rancher Penguin Parlor': 8.3,
  'Gretsch G2220 Junior Jet Bass II': 8.4,
  'Epiphone Les Paul Special-I': 8.3,
  'Epiphone DR-100': 8.2,
  'Fender CN-60S': 8.2,
  'Fender Highway Series Parlor': 8.4,
  'Fender Mustang GTX100': 8.4,
  'Fender Champion II 25': 8.2,
  'Fender Tone Master Deluxe Reverb': 8.8,
  'Fender Player II Stratocaster HSS': 8.7,
  'Fender Player II Precision Bass': 8.8,
  'Fender Player II Jazz Bass': 8.8,
  'Fender Player II Telecaster': 8.7,
  'Fender Player II Mustang Bass PJ': 8.6,
  'Fender Player II Jazzmaster': 8.6,
  'Ibanez AZ2402 Prestige': 8.9,
  'Ibanez SR505E': 8.7,
  'Ibanez GSR205B Gio Bass': 8.4,
  'Ibanez GSRM20 Mikro Bass': 8.3,
  'Ibanez Gio GRG121DX': 8.2,
  'Ibanez TMB30 Talman': 8.2,
  'Ibanez AW54': 8.3,
  'Ibanez GSR200': 8.3,
  'ESP LTD B-204SM': 8.4,
  'Schecter Stiletto Stealth 4': 8.5,
  'Schecter Stiletto Stealth-5': 8.5,
  'Jackson JS1X Concert Bass Minion': 8.2,
  'Jet Guitars JS-300': 8.2,
  'Yamaha FG800': 8.4,
  'Yamaha FS800': 8.3,
  'Yamaha FGX800C': 8.4,
  'Yamaha C40': 8.2,
  'Yamaha CSF1M': 8.3,
  'Yamaha SLG200S': 8.4,
  'Yamaha FG820': 8.4,
  'Yamaha FS820': 8.3,
  'Yamaha A5R ARE': 8.9,
  'Yamaha YC88': 8.9,
  'Roland RD-2000 EX': 8.9,
  'Casio Privia PX-S1100': 8.5,
  'Roland FP-10': 8.4,
  'Yamaha P-225': 8.4,
  'Yamaha Arius YDP-146': 8.5,
  'Yamaha Clavinova CLP-835': 8.7,
  'Casio Privia PX-S1100 (new)': 8.5,
  
  // PEDALS
  'Ibanez TS9 Tube Screamer': 8.8,
  'Boss BD-2 Blues Driver': 8.5,
  'ProCo RAT 2': 8.4,
  'Fulltone OCD v2': 8.4,
  'Wampler Tumnus Deluxe': 8.5,
  'JHS Morning Glory V4': 8.4,
  'MXR M104 Distortion+': 8.4,
  'Boss DD-8 Delay digital': 8.7,
  'Boss TU-3 Afinador cromático': 8.8,
  'TC Electronic Hall of Fame 2': 9.3,
  'Strymon TimeLine': 8.9,
  'Strymon BigSky MX': 8.9,
  'Source Audio Nemesis': 8.5,
  'Eventide TimeFactor': 8.6,
  'Boss RV-200': 8.3,
  'Electro-Harmonix Nano Small Stone': 8.2,
  'MXR Phase 95': 7.4,
  'Strymon BigSky MX (reverb)': 8.9,
  'Electro-Harmonix 720 Stereo Looper': 8.3,
  'Boss RC-500': 8.6,
  'Boss RC-600': 8.4,
  'Boss RC-5 Loop Station': 8.5,
  'TC Electronic Ditto X4 Looper': 8.5,
  'Strymon TimeLine (delay)': 8.9,
  'Ibanez TS9 (new)': 8.8,
  'Boss TU-3 (new)': 8.8,
  'Boss BD-2 (new)': 8.5,
  'Boss DD-8 (new)': 8.7,
  'TC Electronic Hall of Fame 2 (new)': 9.3,
  'Strymon TimeLine (new)': 8.9,
  'Strymon BigSky MX (new)': 8.9,
  'Source Audio Nemesis (new)': 8.5,
  'Eventide TimeFactor (new)': 8.6,
  'Boss RV-200 (new)': 8.3,
  'Electro-Harmonix Nano Small Stone (new)': 8.2,
  'MXR Phase 95 (new)': 7.4,
  'Electro-Harmonix 720 Stereo Looper (new)': 8.3,
  'Boss RC-500 (new)': 8.6,
  'Boss RC-600 (new)': 8.4,
  'Boss RC-5 Loop Station (new)': 8.5,
  'TC Electronic Ditto X4 Looper (new)': 8.5,
};

// Asignar a products.json
products.forEach(p => {
  const key = p.title || p.title_es;
  if (TIER_MAP[key]) p.score = TIER_MAP[key];
});

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('\nProductos sin score: ' + products.filter(p => p.score === undefined).length);