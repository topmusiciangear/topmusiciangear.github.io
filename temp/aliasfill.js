const fs = require('fs');
const lib = require('C:/Users/Daniel/projects/topmusiciangear/temp/rangelib.js');
const { P, rangeFor } = lib;
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
// explicit aliases: table/VS display name -> catalog id
const ALIAS = {
  'Genelec 8351B': 331, 'Elgato Wave DX': 432, 'Samson Q9U XLR/USB': 433,
  'AKG P120 Large-Diaphragm': 434, 'Behringer B 906': 435, 'Behringer XM8500 Ultravoice': 330,
  'FIFINE K669D XLR': 437, 'Samson Q2U USB/XLR': 276, 'FIFINE AmpliTank K688': 278,
  'Maono PD200X Dynamic': 277, 'Rode NT1 Signature': 297, 'Samson C01 Studio': 438,
  'Sennheiser EW-D Dual': 93, 'Taylor PS14ce': 455,
  'iLoud Micro Monitor Pro': 302, 'iLoud MTM MKII': 308, 'Enya Nova Go Sonic': 295,
  'Yamaha THR10II': 293, 'Orange Crush Bass 50': 484, 'Darkglass DG210A Microtubes 500': 485,
  'Darkglass DG210A': 485, 'Yamaha THR30II': 503,
  'MKH 416': 339, 'NTG5': 340, 'MKE 600': 342, 'AT875R': 358, 'S-Mic 3': 344,
  'VideoMic NTG': 345, 'VideoMic GO II': 359, 'MKE 400': 346, 'MKH 50': 360,
  'PSM 300': 267, 'G4-TWIN': 266, 'U4R4': 348, 'PTM-10': 350, 'XSW IEM': 362,
  'Jim Dandy': 352, 'CSF1M': 353, 'SE P20e': 354, 'L-00 Studio': 355, 'CP-60S': 356,
  'Rancher Penguin': 357, 'Xvive U4 Wireless': 347,
  'SOLIDCOM C1 Pro': 510, 'SOLIDCOM SE PRO': 511,
  'Neumann MT 48 (U)': 512, 'Audient ORIA': 515,
  'DJI Mic 3': 249, 'DJI Mic Mini 2': 254, 'FIFINE AmpliGame AM8': 279,
  'Rode NT-USB Mini': 292, 'Blue Yeti Nano': 429, 'FIFINE AmpliGame A6V': 289,
  'Ibanez AW54 Artwood': 460, 'QSC KS118': 233, 'Sire Marcus Miller V5R': 326,
  'Lewitt LCT 1040': 187, 'Sennheiser XSW IEM': 362, 'RØDECaster Pro II': 248,
  'Sennheiser EW-D 835-S Vocal Set': 95, 'Epiphone DR-100 Acoustic': 461, 'Yamaha FS800 Acoustic': 315,
  'Audio-Technica AT2020USB-X': 291, 'EW IEM G4': 349, 'Xvive U4': 347,
  'Sennheiser EW IEM G4': 349, 'SOLIDCOM C1': 509, 'NI Komplete 26 Ultimate': 123,
  'Neumann KH 810 II': 468, 'ATC SCS120 Pro': 470, 'Focal Sub12': 479,
  'Genelec 7370A SAM': 480, 'Barefoot Sound MicroSub45': 481, 'Genelec 7050C': 338,
  'Neumann KH 750 DSP': 337, 'Radial J48 MK2': 445, 'D16 Repeater': 392,
  'Behringer XR18': 145
};
let filled = 0;
function fillCell(obj, key, colTitle) {
  const cur = obj[key] || '';
  const isDash = cur === '—';
  const isExact = /^\$\s*[\d,]+(?:\.\d+)?\s*$/.test(cur);
  if (!isDash && !isExact) return;
  const id = ALIAS[colTitle];
  if (!id) return;
  const r = rangeFor(id);
  if (!r) return;
  obj[key] = r;
  filled++;
}
G.forEach(g => {
  if (g.productTable) {
    const cols = g.productTable.columns.map(c => c.title);
    const pr = (g.productTable.rows || []).find(r => /estim/i.test(r.label || ''));
    if (pr) pr.values.forEach((v, i) => {
      fillCell(v, 'value', cols[i]);
      fillCell(v, 'value_es', cols[i]);
    });
  }
  if (g.comparison && g.featuredSnippet) {
    const row = (g.comparison.rows || []).find(r => /estim/i.test(r.label || ''));
    if (row) {
      const map = { val1: g.featuredSnippet.name1_en, val2: g.featuredSnippet.name2_en, val1_es: g.featuredSnippet.name1_en, val2_es: g.featuredSnippet.name2_en };
      Object.keys(map).forEach(k => {
        if (row[k] === '—' && ALIAS[map[k]]) {
          const r = rangeFor(ALIAS[map[k]]);
          if (r) { row[k] = r; filled++; }
        }
      });
    }
  }
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('alias cells filled:', filled);