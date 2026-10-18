const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const scores = {
  // best-monitors
  'JBL 305P MkII': 8.5,
  'Kali Audio LP-6 V2': 8.8,
  'KRK Rokit 7 G5': 8.2,
  'Yamaha HS8': 8.7,
  'Adam Audio A7V': 9.0,
  'Kali Audio IN-8 V2': 8.9,
  'Genelec 8010A': 9.2,
  'Neumann KH 80 DSP': 9.3,
  'Genelec 8351B': 9.5,
  'Kali Audio WS-6.2': 8.6,
  'Kali Audio IN-UNF': 8.4,
  'Kali Audio LP-UNF': 8.3,
  // best-home-studio-speakers
  'Mackie CR4.5': 8.6,
  'PreSonus Eris 3.5 2nd Gen': 8.4,
  'M-Audio BX4': 8.2,
  'Mackie CR3.5': 8.3,
  'Behringer Truth 3.5 BT': 8.1,
  'Edifier R1280T': 7.8,
  // budget-monitors
  'PreSonus Eris E3.5': 8.3,
  'Mackie CR3-X': 8.1,
  'Behringer Truth B2031A': 7.9,
  'M-Audio BX3': 7.7,
  'Samson Resolv SE5': 7.5,
  // best-monitors-for-small-rooms
  'ADAM Audio T5V': 8.9,
  'Genelec 8020D': 9.1,
  'Neumann KH 120 II': 9.4,
  'Kali Audio LP-UNF': 8.4,
  'iLoud Micro Monitor Pro': 8.2,
  'iLoud MTM MKII': 8.7,
  'ADAM Audio D3V': 8.6,
  // best-5-inch-monitors
  'Focal Alpha 50 Evo': 9.0,
  'Dynaudio BM5 mkIII': 9.1,
  'PMC Result6': 9.3,
  // best-compact-monitors
  'IK Multimedia iLoud MTM': 8.8,
  'PreSonus Eris E4.5': 8.0,
  // wireless-intercom-systems
  'Hollyland Solidcom C1': 8.7,
  'Hollyland Solidcom C1 Pro': 8.9,
  'Hollyland Solidcom SE': 8.5,
  'Retevis RT29': 7.2,
  // best-mic-for-podcasting
  'Shure SM7B': 9.4,
  'Rode Procaster': 8.9,
  'Electro-Voice RE20': 9.2,
  'Shure MV7': 8.6,
  'Rode PodMic': 8.4,
  // best-condenser-mics
  'Neumann U 87 Ai': 9.8,
  'Neumann TLM 103': 9.3,
  'AKG C414 XLII': 9.5,
  'Rode NT1 5th Gen': 8.7,
  'Audio-Technica AT4050': 8.8,
  // best-instrument-mics
  'Shure SM57': 9.0,
  'Sennheiser e 906': 8.7,
  'Audix i5': 8.5,
  'Beyerdynamic M 201 TG': 8.6,
  'AKG D40': 7.9,
  // stage-mics
  'Shure SM58': 9.1,
  'Sennheiser e 935': 8.8,
  'Telefunken M80': 9.0,
  'Audix OM7': 8.6,
  'Electro-Voice ND767a': 8.3,
  // wireless-lapel-mics
  'Rode Wireless GO II': 8.8,
  'DJI Mic 2': 8.9,
  'Hollyland Lark M2': 8.6,
  'Sennheiser XS Lav USB-C': 8.2,
  // budget-usb-mics
  'Blue Yeti': 8.2,
  'Audio-Technica AT2020USB-X': 8.5,
  'Rode NT-USB+': 8.7,
  'Elgato Wave:3': 8.4,
  'HyperX QuadCast S': 8.0,
  // best-electric-guitar
  'Fender Player II Stratocaster': 8.6,
  'Gibson Les Paul Standard 50s': 9.2,
  'PRS SE Custom 24': 8.8,
  'Ibanez AZ2204': 8.5,
  'Yamaha Pacifica 612VIIX': 8.4,
  // beginner-bass-guitars
  'Squier Affinity P Bass': 8.0,
  'Yamaha TRBX174': 8.2,
  'Ibanez GSR200': 8.1,
  'Sterling by Music Man SUB Ray4': 8.3,
  'Epiphone EB-0': 7.8,
  // best-bass-under-700
  'Fender Player II Jazz Bass': 8.7,
  'Ibanez SR300E': 8.5,
  'Yamaha TRBX305': 8.4,
  'Schecter Stiletto Studio-4': 8.3,
  'Cort Artisan B4': 8.2,
  // best-bass-amps
  'Ampeg SVT-3PRO': 9.0,
  'Fender Rumble 500': 8.5,
  'Markbass Little Marcus': 8.8,
  'Darkglass Microtubes 900': 9.2,
  'Orange Terror Bass 500': 8.6,
  // best-5-string-basses
  'Fender Player II Jazz Bass V': 8.8,
  'Ibanez SR505E': 8.6,
  'Yamaha BB435': 8.5,
  'Dingwall NG-3': 9.3,
  'Warwick RockBass Corvette': 8.4,
  // best-guitar-plugins
  'Neural DSP Quad Cortex': 9.4,
  'Universal Audio UAD': 9.1,
  'Softube Amp Room': 8.9,
  'IK Multimedia AmpliTube 5': 8.5,
  'Native Instruments Guitar Rig 7': 8.7,
  // fx-plugins
  'Soundtoys 5': 9.5,
  'FabFilter Pro-Q 4': 9.6,
  'Valhalla VintageVerb': 9.3,
  'iZotope Ozone 11': 9.1,
  'Soundtoys Decapitator': 9.2,
  // best-daw
  'Ableton Live 12 Suite': 9.3,
  'Logic Pro': 9.2,
  'Pro Tools Studio': 8.9,
  'FL Studio 21': 8.8,
  'Studio One 6': 8.7,
  // best-audio-interface
  'Universal Audio Apollo Twin X': 9.4,
  'RME Babyface Pro FS': 9.5,
  'MOTU M4': 8.9,
  'SSL 2+': 8.7,
  'Focusrite Scarlett 2i2 4th Gen': 8.4,
  // best-midi-controller
  'Arturia KeyLab Essential 88': 8.6,
  'Native Instruments Komplete Kontrol S88': 8.9,
  'Novation SL MkIII 61': 8.5,
  'Nektar Panorama T6': 8.2,
  // best-studio-headphones
  'Audeze MM-500': 9.3,
  'Sennheiser HD 650': 9.2,
  'Beyerdynamic DT 1990 Pro': 9.0,
  'Audio-Technica ATH-M50x': 8.5,
  'Sony MDR-7506': 8.2,
  // best-in-ear-monitors
  'Sennheiser IE 600': 9.4,
  '64 Audio U12t': 9.5,
  'Campfire Audio Andromeda': 9.3,
  'Shure SE846 Gen2': 9.1,
  'Moondrop Blessing 3': 8.8,
  // best-live-sound-mixers
  'Allen & Heath SQ-6': 9.3,
  'Midas M32': 9.2,
  'Behringer Wing': 8.9,
  'DiGiCo SD9': 9.4,
  'Yamaha CL5': 9.1,
  // best-pa-speakers
  'JBL EON712': 8.6,
  'QSC K12.2': 8.9,
  'Electro-Voice ELX200-12P': 8.5,
  'Mackie Thump212': 8.2,
  'RCF ART 712-A': 8.8,
  // best-compact-mixers
  'Zoom LiveTrak L-12': 8.4,
  'Soundcraft Notepad-12FX': 8.2,
  'Mackie ProFX12v3': 8.3,
  'Allen & Heath ZEDi-10FX': 8.5,
  'Yamaha MG10XU': 8.1,
  // stage-wedges
  'JBL JRX212': 7.8,
  'QSC K12.2': 8.9,
  'Meyer Sound UPJunior': 9.3,
  'L-Acoustics X12': 9.4,
  // best-drum-machine
  'Elektron Digitakt II': 9.2,
  'Elektron Analog Rytm': 9.0,
  'Akai MPC One+': 8.8,
  'Roland TR-8S': 8.7,
  'Korg Electribe 2': 8.1,
  // best-samplers-drum-computers
  'Akai MPC X SE': 9.1,
  'Elektron Octatrack MKII': 9.0,
  'Pioneer DJ DJS-1000': 8.6,
  'Roland SP-404 MKII': 8.8,
  // best-synths
  'Sequential Prophet-5 Rev4': 9.6,
  'Moog One': 9.4,
  'ASM Hydrasynth Deluxe': 9.1,
  'Korg Opsix': 8.7,
  'Arturia PolyBrute': 8.9,
};

let added = 0;
p.forEach(prod => {
  if (prod.score !== undefined) return;
  const key = Object.keys(scores).find(k => prod.title && prod.title.includes(k));
  if (key) {
    prod.score = scores[key];
    added++;
    console.log('  ' + prod.id + ': ' + prod.title + ' -> ' + prod.score);
  }
});

fs.writeFileSync(B + 'data/products.json', JSON.stringify(p, null, 2), 'utf8');
console.log('\nTotal productos con score añadido: ' + added);