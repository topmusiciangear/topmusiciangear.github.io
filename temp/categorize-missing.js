const fs = require('fs');

const missing = [
  [392, 'D16 Repeater Delay'], [61, 'TDR Kotelnikov GE'], [161, 'Sterling StingRay Ray4'],
  [162, 'Epiphone Thunderbird 60s'], [163, 'Sire Marcus Miller V5'], [164, 'Schecter Stiletto Stealth 4'],
  [177, 'Audeze LCD-MX4'], [222, 'ATC SCM25A Pro'], [246, 'Elgato Wave XLR MK2'], [251, 'Hollyland Lark M2'],
  [268, 'Sennheiser IE 900'], [277, 'Maono PD200X'], [278, 'FIFINE K688'], [279, 'FIFINE AM8'],
  [286, 'Audio-Technica AT2040USB'], [293, 'Yamaha THR10II'], [300, 'Kali WS-6.2'],
  [309, 'Squier Debut Stratocaster'], [317, 'Strandberg Boden Essential'], [326, 'Sire Marcus Miller V3'],
  [329, 'Rode Procaster'], [335, 'Korg SoundLink MW-1608'], [344, 'Deity S-Mic 3'],
  [350, 'Phenyx Pro PTM-10'], [352, 'Gretsch G9500 Jim Dandy'], [357, 'Gretsch Rancher Penguin'],
  [360, 'Sennheiser MKH 50'], [373, 'Oeksound Soothe3'], [374, 'Cableguys ShaperBox 3'],
  [376, 'Cableguys HalfTime'], [378, 'Sonnox VoxDoubler'], [379, 'Brainworx bx_console SSL 4000'],
  [380, 'Devious Machines Infiltrator 2'], [382, 'Plugin Boutique Scaler 3'],
  [385, 'Mastering The Mix MIXVAULT'], [387, 'Excite Audio Lifeline Expanse'],
  [388, 'Universal Audio Century Tube'], [389, 'Eventide H3000 Band Delays'],
  [390, 'Arturia Chorus JUN-6'], [391, 'Minimal Audio Cluster Delay'],
  [393, 'QuikQuak Pitchwheel'], [394, 'Excite Audio Motion Harmonic'],
  [411, 'Yamaha DM3'], [419, 'Sennheiser HD 280 PRO'], [420, 'Shure SRH440A'],
  [421, 'Focal Listen Professional'], [422, 'Sennheiser HD 600'], [423, 'Audio-Technica ATH-R70x'],
  [424, 'Neumann NDH 30'], [425, 'Hifiman Sundara'], [426, 'Sennheiser HD 560S'],
  [427, 'Audio-Technica ATH-R30x'], [428, 'Samson SR850'], [432, 'Elgato Wave DX'],
  [433, 'Samson Q9U'], [436, 'MAONO PD100'], [437, 'FIFINE K669D'],
  [439, 'HyperX SoloCast'], [450, 'Whirlwind IMP 2'],
];

// Categorize by likely availability
const categories = {
  'Plugins (sold on Plugin Boutique, not Music Store)': [373,374,376,378,379,380,382,385,387,388,389,390,391,393,394],
  'Budget USB/streaming mics (likely not on Music Store)': [277,278,279,284,286,289,290,436,437,439],
  'Niche/expensive': [177,222,317,335,161,162,163,164],
  'Might exist on Music Store': [61,161,162,163,164,246,251,268,293,300,309,326,329,344,350,352,357,360,411,419,420,421,422,423,424,425,426,427,428,432,433,450],
};

console.log('Total missing:', missing.length);
console.log('\nBy category:');
for (const [cat, ids] of Object.entries(categories)) {
  console.log('  ' + cat + ': ' + ids.length + ' products');
  ids.forEach(id => {
    const item = missing.find(m => m[0] === id);
    if (item) console.log('    BTN:' + id + ' | ' + item[1]);
  });
}
