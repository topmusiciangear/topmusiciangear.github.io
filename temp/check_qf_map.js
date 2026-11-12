// temp/check_qf_map.js — verifica cobertura de QF_ES_MAP sobre facts[].value
const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const m = src.match(/var QF_ES_MAP = (\{[\s\S]*?\n\});/);
if (!m) { console.log('MAP NO ENCONTRADO'); process.exit(1); }
const map = eval('(' + m[1] + ')');
console.log('map entries:', Object.keys(map).length);

const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const prods = Array.isArray(P) ? P : (P.products || []);
const uniq = new Set();
for (const p of prods) for (const f of (p.facts || [])) if (typeof f.value === 'string') uniq.add(f.value);

// Nombres propios/designaciones/formatos que se dejan INTENCIONALMENTE en inglés
const keep = [
  'AA / USB', 'Agathis', 'Bluetooth, USB', 'Concert', 'Delay', 'Dreadnought', 'EUCON', 'Groovebox',
  'Digital', 'Grand Auditorium', 'Harmonic Spectral Processor', 'HSS', 'HH', 'SSS', 'SS', 'Loop station', 'Looper',
  'Lobar', 'MCU/HUI', 'MCU/HUI/Logic', 'Mackie Control/HUI', 'Meranti', 'Nyatoh', 'Okoume', 'Sapelli',
  'Omni', 'Orchestra Model', 'Overdrive', 'Phaser', 'Player split coil P', 'Session View, Max for Live',
  'Shotgun', 'Slope-shoulder', 'Super Jumbo', 'Thunderbolt/USB-C', 'True bypass', 'True bypass / trails',
  'Ultra II Noiseless P + J', 'Ultra II Noiseless Vintage J', 'V-Mod II split coil', 'V-Piano + SuperNATURAL',
  'Split P + J (Dynamix)', 'Diamond SuperRock MM + Diamond P', 'USB', 'USB-C', 'XLR', 'USB/XLR',
  'VST/AU/AAX', 'Wavetable + granular', 'Waves License Center', 'Native Access', 'ZEN-Core + V-Piano + ACB',
  'Nylon', 'Dual 8.6 x 4 in obround', '200W (100W standalone)',
  '1/4" TRS in, XLR out', '1/4" in + thru, XLR out', '1/4" in, XLR + 1/4" out, FX loop',
  '2x 1/4" in + thru, 2x XLR out', '2x USB-A, USB-B, 4x MIDI out',
  'AES50, USB, 16 out', 'USB, AES50, 16 out', 'Standalone + VST3/AU/AAX',
  'PHA-4 Standard (escapement)', 'GHC (Graded Hammer Compact)', 'GHS (no escapement)',
  'GrandTouch-E (escapement)', 'GrandTouch-S (escapement)', 'Smart Scaled Hammer Action',
  // --- segundo lote de Keeps ---
  'Modified 0', '2 Unison', '8× Unison', '7" MLM', 'EVS-18L 18"', '6.5" Slatefiber',
  'Thunderbolt 3', 'USB 2.0', 'USB 2.0 (Type-B)', 'USB 3.0 + MADI', 'USB-C (USB 2.0)', 'Thunderbolt 3 + USB',
  'VST2/VST3/AU/AAX', 'VST2/VST3/AU/AAX/CLAP', 'VST3/AU/AAX + ARA', 'VST3/AU/AAX', 'VST/VST3/AU/AAX',
  'VST2/AU/AAX (no VST3/CLAP)', 'VST3/AU/AAX via Kontakt', 'iLok', 'MPC3 Pro FX pack, XYFX',
  'ACB 808/909/606 + TB-303', 'AN-X + AWM2 + FM-X',
  'USB 2x2', 'USB 2x4 24-bit/192kHz', 'USB 4x4 24-bit/96kHz', 'USB 18x18, network',
  'USB 48x48, AES50, SD', 'USB 64x64 + SD', 'USB 64x64, AVB, SD', '32x32 USB',
  'USB-C, Ethernet', 'USB-C, MIDI Out', 'USB-C, SD, USB drive', 'USB, Ethernet', 'USB, MIDI',
  'USB-C audio/MIDI, MIDI I/O', 'USB-C audio/MIDI, MIDI I/O, SD slot', 'USB-C, MIDI I/O, sync I/O',
  'USB-C, MIDI In/Out/Thru, sync out', 'USB-A/B, MIDI, WiFi, Bluetooth', 'USB-A/B, MIDI I/O, WiFi, Link',
  'USB-C + ADAT/AES', 'USB-C + OTG USB-C + USB-A hub', 'Dual USB-C, HDMI, XLR combo',
  'Dual USB-C, BT, WiFi, microSD', 'Wi-Fi, Ethernet, USB multitrack', 'USB, Bluetooth, TRRS call, SD',
  'Single USB-C, HDMI in, USB-C hub', 'USB, 2x dSnake, tablet', 'USB-C + AES67/RAVENNA',
  'Wi-Fi, USB, 6 aux', '32-bit/192kHz ESS', '24-bit/48 kHz', 'Omni 20 Hz – 20 kHz', 'A/D 136 dBA',
  '16 MIDAS', '16 MIDAS PRO', '24 Midas PRO', '16 XMAX-R', '12 Soundcraft', '8 Ghost', '20 Studer',
  '7 Onyx', '6 XENYX', '8 x Ultra-HDDA', '4 x GSPre', '8 x HiVolt', '4 x SuperAnalogue (+72dB)',
  '10x D-PRE', '16 D-PRE', '4 D-PRE', '2× Neumann, 78 dB',
  '20 aux + LR', '16 aux + LR', '16 FlexMix + LR', '16 FlexMixes + 4 FX',
  '24 mix + 8 matrix', '16 mix + 6 matrix', '12 mix + 8 matrix',
  '1.35 lbs (612 g)', '1.8 lbs (816 g)', '~2.9 kg (6.4 lbs)', '~3.6 kg (7.9 lbs)', '21.7 kg (47 lbs 14 oz)',
  '16 GB RAM / 256 GB NVMe SSD', '4 GB RAM / 32 GB + 64 GB SD', '8GB internal + microSD'.replace('8GB internal + microSD','__NEVER__'),
  // speaker / pickup / action model names
  '1x12" Jensen C-12N', '2x12" Celestion G12M Greenback', '1x12" Celestion V-Type',
  '1x10" Voice of the World', '1x12" Jensen Neo', '1x12" Celestion', '1x15" custom Lavoce',
  '1 x 10" Special Design', '1 x 8" Orange', '2x10" + 1" tweeter', '2x10" + piezo tweeter',
  '1x12" + tweeter', '1x10" + tweeter',
  '2x V-Mod II J single coils', '2x Fender alnico J', '2x YGD humbuckers', '2x ProBucker 760 humbuckers',
  '2x Marcus Vintage-J Revolution', '2x ESP SB-4 humbuckers', '2x Bartolini BH2',
  '2x Marcus Pure-H humbuckers', '2x Steinberger humbuckers', '2x G&L MFD humbuckers',
  '2x Marcus Revolution single-coil', '2x Player Alnico 5 J', 'Alnico 5 split P + single J',
  'YGD V5 P/J (Alnico V)', 'YGD Custom V5 Alnico V PJ', 'Bartolini BH2', 'V-Mod II x2', '2x single-coil',
  '1/4" in; XLR + 2x 1/4" outs',
  '88 PHA-50 hybrid wood', '88 PHA-50 hybrid + channel AT', '88 NW-GH3 wooden graded',
  '88 RH3 hammer', '88 GHS graded hammer'
];
const keepSet = new Set(keep.filter(Boolean));
// rangos de frecuencia / specs numéricas puras
const neutral = /^\s*[\d~≥≤<>\-–±°.x×\s]*(hz|khz|mhz|ghz|db|dba|dbfs|spl|rms|w|kw|v|ma|mah|ms|mm|cm|kg|g|lb|lbs|oz|in|"|u|aux|lr|usb|sd|adat|aes|madi|avb|wifi|bluetooth|ethernet|d-dance|ess|nvme|ssd|clap|au|aax|vst|ara|bar|pole)[\s\S]*$/i;
const left = [...uniq].filter(v => /[a-zA-Z]{3,}/.test(v) && map[v.trim()] === undefined && !keepSet.has(v) && !neutral.test(v));
console.log('SIN TRADUCIR (' + left.length + '):');
console.log(left.join('\n'));
