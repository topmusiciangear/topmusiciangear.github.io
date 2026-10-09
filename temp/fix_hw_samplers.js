const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-hardware-samplers');
const cols = guide.productTable.columns.map(c => c.title);

console.log('Current cols:', cols.join(' | '));

const colData = {
  'Teenage Engineering EP-133 K.O. II': [
    "Pocket sketching and punch-in performance FX",
    "~$299",
    "Pocket Sampler / Composer",
    "4 groups x 99 patterns",
    "128 MB internal (999 slots)",
    "Multi-track step / real-time",
    "6 master FX + 12 punch-in FX",
    "0.62 kg"
  ],
  'Akai MPC Live III': [
    "Mobile production with Stems and 3D expression",
    "$1,699",
    "Portable Standalone Workstation",
    "32 plugin + 16 stereo audio",
    "8 GB RAM / 128 GB storage",
    "Linear arranger / step / clip matrix",
    "MPC3 Pro FX pack, XYFX",
    "3.9 kg"
  ],
  'Polyend Tracker Mini': [
    "Analytical composition and surgical precision",
    "$799",
    "Portable Tracker Workstation",
    "8 audio + 8 synth/MIDI",
    "400 MB per project / 20 GB internal",
    "Tracker vertical, parameter locks",
    "Reverb, delay, chorus, bitcrush, compressor, overdrive",
    "0.35 kg"
  ]
};

guide.productTable.rows.forEach((row, ri) => {
  Object.keys(colData).forEach(colTitle => {
    const ci = cols.indexOf(colTitle);
    const vals = colData[colTitle];
    if (ci >= 0 && vals) {
      if (!row.values[ci]) {
        row.values[ci] = { value: vals[ri], value_es: vals[ri] };
      } else {
        row.values[ci].value = vals[ri];
        row.values[ci].value_es = vals[ri];
      }
    }
  });
});

const sectionImgs = {
  615: 'https://r2.gear4music.com/media/81/813616/1200/preview.jpg',
  188: 'https://r2.gear4music.com/media/94/946706/1200/preview.jpg',
  625: 'https://r2.gear4music.com/media/92/927463/1200/preview.jpg'
};

guide.sections.forEach(s => {
  const pid = s.products && s.products[0];
  if (sectionImgs[pid] && !s.content.includes('<img')) {
    s.content = `<div class="guide-section-imgs"><img src="${sectionImgs[pid]}" alt="${s.heading}" class="guide-section-img lb-img" style="cursor:zoom-in"><div class="guide-video-thumb guide-video-placeholder" aria-hidden="true"></div></div>` + s.content;
    console.log('Added img to section:', s.heading);
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
