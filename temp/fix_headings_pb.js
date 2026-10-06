const fs = require('fs');

// 1) Section headings: name the products (fixes gaps_loose "unnamed" audit, better SEO)
const H = [
  {
    en: 'Best Ultra-Compact Digital Pianos: Casio PX-S1100 and Roland FP-10',
    es: 'Los mejores pianos digitales ultracompactos: Casio PX-S1100 y Roland FP-10'
  },
  {
    en: 'Best Mid-Range Portable Digital Pianos: Roland FP-30X and Yamaha P-225',
    es: 'Los mejores pianos portátiles de gama media: Roland FP-30X y Yamaha P-225'
  },
  {
    en: 'Best Console Digital Pianos with Furniture: Roland RP107, Kawai KDP120 and Yamaha YDP-166',
    es: 'Los mejores pianos de mueble para casa: Roland RP107, Kawai KDP120 y Yamaha YDP-166'
  }
];
const gFile = 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const gd = G.find(x => x.id === 'best-digital-pianos');
let si = 0;
gd.sections.forEach(s => {
  if (si >= H.length) return;
  if ((s.products || []).length === 0) return;
  if (s.heading.indexOf('Ultra-Compact') > -1) { s.heading = H[0].en; s.heading_es = H[0].es; si++; }
  else if (s.heading.indexOf('Mid-Range') > -1) { s.heading = H[1].en; s.heading_es = H[1].es; si++; }
  else if (s.heading.indexOf('Console Digital Pianos with Furniture') > -1) { s.heading = H[2].en; s.heading_es = H[2].es; si++; }
});
if (si !== 3) throw new Error('expected 3 headings patched, got ' + si);
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('headings patched');

// 2) pb_verify_data whitelist: new product entries 555-572 + approved 410 change
const pFile = 'temp/pb_verify_data.js';
let s = fs.readFileSync(pFile, 'utf8');
const before = s;
s = s.replace(
  "const ADDED_OK = ['518', '527', '528', '529', '530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '540', '541', '542', '543', '544', '545', '546', '547', '548', '549', '550', '551', '552', '553', '554'];",
  "const ADDED_OK = ['518', '527', '528', '529', '530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '540', '541', '542', '543', '544', '545', '546', '547', '548', '549', '550', '551', '552', '553', '554', '555', '556', '557', '558', '559', '560', '561', '563', '564', '565', '566', '567', '568', '569', '570', '571', '572'];"
);
if (s === before) throw new Error('ADDED_OK replace failed');
const before2 = s;
s = s.replace(
  "  '480': { 'prices.gear4music': [undefined, '£2,910.00'], 'urls.gear4music': [undefined, 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FGenelec-7370A-Smart-Active-Monitoring-Subwoofer-Dark-Grey%2F1MYN'] },\n};",
  "  '480': { 'prices.gear4music': [undefined, '£2,910.00'], 'urls.gear4music': [undefined, 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FGenelec-7370A-Smart-Active-Monitoring-Subwoofer-Dark-Grey%2F1MYN'] },\n  '410': { 'prices.zzounds': ['$1,499.00', '$999.00'], 'prices.gear4music': ['£719.00', '£730.00'] },\n};"
);
if (s === before2) throw new Error('APPROVED_NON_PB replace failed');
fs.writeFileSync(pFile, s);
console.log('410 approved');
