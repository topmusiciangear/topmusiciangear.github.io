// Update fx-plugins sections to include all 13 products
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const g = G.find(x => x.id === 'fx-plugins');

const titles = g.productTable.columns.map(c => c.title);
const ids = titles.map(t => {
  const p = P.find(x => x.title === t);
  return p ? p.id : null;
}).filter(x => x !== null);

g.sections = [
  { heading: 'Creative Effects: Choosing Tools That Inspire', products: [] },
  { heading: 'Is the Soundtoys 5.5 Bundle the Most Creative Effects Collection?', products: [32] },
  { heading: 'Is the Eventide Blackhole the Best Creative Reverb Plugin for Music Production?', products: [238] },
  { heading: 'Cableguys ShaperBox 3: The Ultimate Rhythmic Modulation Suite', products: [374] },
  { heading: 'XLN Audio RC-20 Retro Color: Instant Lo-Fi Character', products: [375] },
  { heading: 'Cableguys HalfTime: Half-Speed and Tape Stop Effects', products: [376] },
  { heading: 'Baby Audio Transit 2: Dual-Engine Creative Delay', products: [377] },
  { heading: 'Devious Machines Infiltrator 2: The Glitch Sequencer', products: [380] },
  { heading: 'iZotope Trash: Multiband Distortion Powerhouse', products: [386] },
  { heading: 'Excite Audio Lifeline Expanse: Evolving Spatial Textures', products: [387] },
  { heading: 'Excite Audio Motion: Harmonic Spectral Animation', products: [394] },
  { heading: 'Arturia Chorus JUN-6: Authentic Juno Chorus', products: [390] },
  { heading: 'D16 Group Repeater Delay: 23 Models of Delay', products: [392] },
  { heading: 'Baby Audio Smooth Operator Pro: Spectral Resonance Control', products: [472] }
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('fx-plugins sections updated with', ids.length, 'products');
console.log('sections:', g.sections.map(s => ({heading: s.heading, products: s.products})));