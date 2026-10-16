const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// 30 new products for the 5 plugin guides
const newProducts = [
  // Guide 1: Synth VSTs
  { id: 1001, brand: 'Arturia', name: 'Pigments 7', price: 199, category: 'plugins', subcategory: 'synth', stores: { pluginboutique: 'https://www.pluginboutique.com/product/1-Instruments/4-Synth/11867-Pigments-7' }, image: 'https://www.arturia.com/images/products/pigments-7/pigments-7-main.jpg', desc: 'A powerful wavetable and granular synth with a visual modulation matrix, dual engines, and 104 filter types.' },
  { id: 1002, brand: 'u-he', name: 'Diva', price: 179, category: 'plugins', subcategory: 'synth', stores: { pluginboutique: 'https://www.pluginboutique.com/product/1-Instruments/4-Synth/1396-Diva' }, image: 'https://u-he.com/images/products/diva/diva-front.jpg', desc: 'Virtual analog synthesizer emulating five decades of classic synths through circuit-level modeling of oscillators, filters, and envelopes.' },
  { id: 1003, brand: 'Kilohearts', name: 'Phase Plant', price: 199, category: 'plugins', subcategory: 'synth', stores: { pluginboutique: 'https://www.pluginboutique.com/product/1-Instruments/4-Synth/5391-Phase-Plant' }, image: 'https://kilohearts.com/images/products/phase-plant/phase-plant.jpg', desc: 'Semi-modular softsynth with three flexible oscillator lanes, 40+ modulation generators, and over 300 snapin effects.' },
  { id: 1004, brand: 'Vengeance Sound', name: 'VPS Avenger 2', price: 249, category: 'plugins', subcategory: 'synth', stores: { pluginboutique: 'https://www.pluginboutique.com/product/1-Instruments/4-Synth/11545-VPS-Avenger-2' }, image: 'https://www.vengeance-sound.com/images/plugins/avenger2/avenger2.jpg', desc: 'Massive workstation synth combining wavetable, sample, FM, and virtual analog with 12 oscillators, 8-step envelopes, and 3000+ presets.' },
  { id: 1005, brand: 'Xfer Records', name: 'Serum', price: 189, category: 'plugins', subcategory: 'synth', stores: { pluginboutique: 'https://www.pluginboutique.com/product/1-Instruments/4-Synth/7761-Serum' }, image: 'https://xferrecords.com/images/serum/serum-front.jpg', desc: 'The industry-standard wavetable synth for bass music, EDM, and sound design. Visual editing, high-quality filters, and distortion.' },
  { id: 1006, brand: 'Native Instruments', name: 'Massive X', price: 199, category: 'plugins', subcategory: 'synth', stores: { pluginboutique: 'https://www.pluginboutique.com/product/1-Instruments/4-Synth/10604-MASSIVE-X' }, image: 'https://www.native-instruments.com/fileadmin/ni_media/products/software/massive-x/assets/massive-x-hero.jpg', desc: 'Successor to the legendary Massive. Two wavetable oscillators, 10 wavetable modes, and a deep modulation system for aggressive sound design.' },

  // Guide 2: MIDI & Theory
  { id: 1007, brand: 'Scaler Music', name: 'Scaler 3', price: 99, category: 'plugins', subcategory: 'midi', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/93-Music-Theory-Tools/14563-Scaler-3' }, image: 'https://www.scalermusic.com/images/scaler-3/scaler-3-hero.jpg', desc: 'Music theory workstation that detects your key and suggests chord progressions, basslines, melodies, and arpeggios in real time.' },
  { id: 1008, brand: 'Mixed In Key', name: 'Captain Plugins Epic', price: 99, category: 'plugins', subcategory: 'midi', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/93-Music-Theory-Tools/14112-Captain-Plugins-Epic' }, image: 'https://mixedinkey.com/images/captain-plugins/captain-plugins-epic.jpg', desc: 'Five-plugin composition suite: Captain Chords, Captain Melody, Captain Bass, Captain Arpeggio, and Captain Deep. Write full songs without music theory.' },
  { id: 1009, brand: 'W.A. Production', name: 'Loop Engine 3', price: 130.08, category: 'plugins', subcategory: 'midi', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/93-Music-Theory-Tools/13923-Loop-Engine-3' }, image: 'https://www.waproduction.com/images/products/loop-engine-3/loop-engine-3.jpg', desc: 'Loop sequencer and groove generator with intelligent pattern creation, multi-track looping, and drag-and-drop MIDI export.' },
  { id: 1010, brand: 'Audiomodern', name: 'Playbeat 4', price: 89, category: 'plugins', subcategory: 'midi', stores: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/24-Sequencer/14265-Playbeat-4' }, image: 'https://audiomodern.com/images/products/playbeat-4/playbeat-4.jpg', desc: 'AI-powered drum pattern generator with smart genre detection, velocity control, and one-click pattern variation.' },
  { id: 1011, brand: 'Orb Plugins', name: 'Orb Producer Suite 3', price: 99, category: 'plugins', subcategory: 'midi', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/93-Music-Theory-Tools/15024-Orb-Producer-Suite-3' }, image: 'https://www.landr.com/images/plugins/producer-suite-3/orb-producer-suite-3.jpg', desc: 'Four AI-powered plugins (Melody, Bass, Arpeggios, Chords) that generate musical ideas based on your key, scale, and style choices.' },
  { id: 1012, brand: 'Zynaptiq', name: 'PitchMap', price: 149, category: 'plugins', subcategory: 'midi', stores: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/35-Pitch-Shifter/2701-PITCHMAP' }, image: 'https://www.zynaptiq.com/images/products/pitchmap/pitchmap.jpg', desc: 'World\'s first real-time polyphonic pitch mapper. Change individual notes within a mixed audio signal and route them to a MIDI keyboard.' },

  // Guide 3: Piano VSTs
  { id: 1013, brand: 'Spectrasonics', name: 'Keyscape', price: 399, category: 'plugins', subcategory: 'piano', stores: { pluginboutique: 'https://www.pluginboutique.com/product/1-Instruments/55-Kontakt-Instrument/13201-Keyscape' }, image: 'https://www.spectrasonics.net/images/products/keyscape/keyscape-main.jpg', desc: 'The definitive virtual keyboard collection. 500+ sounds from rare and collector grand pianos, uprights, electric pianos, organs, and harpsichords.' },
  { id: 1014, brand: 'Native Instruments', name: 'Kontakt 8', price: 299, category: 'plugins', subcategory: 'piano', stores: { pluginboutique: 'https://www.pluginboutique.com/product/1-Instruments/55-Kontakt-Instrument/13195-Kontakt-8' }, image: 'https://www.native-instruments.com/fileadmin/ni_media/products/software/kontakt-8/assets/kontakt-8-hero.jpg', desc: 'The industry-standard sampler platform. Runs the world\'s best piano libraries with advanced scripting, effects, and time-stretching.' },
  { id: 1015, brand: 'Arturia', name: 'V Collection 11 Pro', price: 699, category: 'plugins', subcategory: 'piano', stores: { pluginboutique: 'https://www.pluginboutique.com/product/81-Bundles/58-Instrument-Bundles/14665-V-Collection-11-Pro' }, image: 'https://www.arturia.com/images/products/v-collection-11-pro/v-collection-11-pro-main.jpg', desc: '45 meticulously modeled instruments: vintage electric pianos, acoustic grands, organs, and analog synths. 12,000+ presets with Analog Lab Pro included.' },
  { id: 1016, brand: 'XLN Audio', name: 'Addictive Keys', price: 99, category: 'plugins', subcategory: 'piano', stores: { pluginboutique: 'https://www.pluginboutique.com/product/1-Instruments/64-Virtual-Instruments/1191-Addictive-Keys-Studio-Grand' }, image: 'https://www.xlnaudio.com/images/products/addictive-keys/addictive-keys.jpg', desc: 'Studio grand, upright, and electric piano with mic mixing, effects, and envelope control. Great for pop, lo-fi, and singer-songwriter productions.' },
  { id: 1017, brand: 'Modartt', name: 'Pianoteq 9 Pro', price: 399, category: 'plugins', subcategory: 'piano', stores: { pluginboutique: 'https://www.pluginboutique.com/product/1-Instruments/55-Kontakt-Instrument/15147-Pianoteq-9-Pro' }, image: 'https://www.modartt.com/images/products/pianoteq/pianoteq-9.jpg', desc: 'Physically modeled piano (no samples). Ultra-lightweight, responsive dynamics, customizable string resonance, and 12 instrument packs included.' },
  { id: 1018, brand: 'UVI', name: 'Augmented Piano', price: 149, category: 'plugins', subcategory: 'piano', stores: { pluginboutique: 'https://www.pluginboutique.com/product/1-Instruments/64-Virtual-Instruments/9804-Augmented-GRAND-PIANO' }, image: 'https://www.uvi.net/images/products/augmented-piano/augmented-piano.jpg', desc: 'A 1909 Pleyel grand piano meets abstract synthesis. 24 preparations blend real piano samples with processed and synthesized layers for cinematic soundtracks.' },

  // Guide 4: Guitar Plugins
  { id: 1019, brand: 'IK Multimedia', name: 'AmpliTube 5', price: 199.99, category: 'plugins', subcategory: 'guitar', stores: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/18-Amp-Simulator/12669-AmpliTube-5' }, image: 'https://www.ikmultimedia.com/images/products/amplitube-5/amplitube-5-max.jpg', desc: 'Massive amp and pedal emulation suite with 400+ gear models, 10,000+ presets, and Tonex integration for real captured tones.' },
  { id: 1020, brand: 'Positive Grid', name: 'BIAS FX 2', price: 299, category: 'plugins', subcategory: 'guitar', stores: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/18-Amp-Simulator/13826-BIAS-FX-2' }, image: 'https://www.positivegrid.com/images/products/bias-fx-2/bias-fx-2.jpg', desc: 'Tone matching and amp modeling with cloud community, ToneCloud with 100,000+ presets, and Split Signal Path for dual amp rigs.' },
  { id: 1021, brand: 'Universal Audio', name: 'UAD Sound City Studios', price: 149, category: 'plugins', subcategory: 'guitar', stores: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/11503-UAD-Sound-City-Studios-Plugin' }, image: 'https://www.uaudio.com/images/products/uad-sound-city-studios/uad-sound-city-studios.jpg', desc: 'Legendary rock room emulation. Vintage mics, custom British console, outboard gear, and the famous reverb chamber of Sound City Studios Studio A.' },
  { id: 1022, brand: 'Overloud', name: 'TH-U Premium', price: 269, category: 'plugins', subcategory: 'guitar', stores: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/18-Amp-Simulator/14809-TH-U-Premium' }, image: 'https://www.overloud.com/images/products/th-u/th-u.jpg', desc: 'All-in-one guitar suite with 15 amp models, Fluid IR processing, amp modeling, and 89 effects. One of the fastest and most accurate modelers.' },
  { id: 1023, brand: 'Softube', name: 'Amp Room', price: 99, category: 'plugins', subcategory: 'guitar', stores: { pluginboutique: 'https://www.pluginboutique.com/meta_product/2-Effects/18-Amp-Simulator/6861-Softube-Amp-Room' }, image: 'https://www.softube.com/images/products/amp-room/amp-room.jpg', desc: 'Scandinavian clean and high-gain amp sim. Vintage, Metal, Bass, and Marshall suites with classic amps, cabs, stompboxes, and effects.' },
  { id: 1024, brand: 'Brainworx', name: 'bx_rockrack V3', price: 199, category: 'plugins', subcategory: 'guitar', stores: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/18-Amp-Simulator/14955-bx-rockrack-V3' }, image: 'https://www.plugin-alliance.com/images/products/bx_rockrack_v3/bx_rockrack_v3.jpg', desc: '8 amp emulations from Marshall, Mesa Boogie, and ENGL. Clean to Metal with 40 recording chains, multiple mic positions, and FX.' },

  // Guide 5: Audio Repair
  { id: 1025, brand: 'iZotope', name: 'RX 12 Standard', price: 199, category: 'plugins', subcategory: 'restoration', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/51-Audio-Restoration-/14642-iZotope-RX-12-Standard' }, image: 'https://www.izotope.com/images/products/rx/rx-12/rx-12-standard.jpg', desc: 'The industry standard for audio repair. Spectral editing, dialogue de-noise, de-reverb, de-ess, and music rebalance.' },
  { id: 1026, brand: 'Oeksound', name: 'Soothe3', price: 249, category: 'plugins', subcategory: 'restoration', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/51-Audio-Restoration-/16734-Soothe3' }, image: 'https://oeksound.com/images/products/soothe3/soothe3.jpg', desc: 'The most famous dynamic resonance suppressor. AI-driven detection smooths harsh resonances in real time without artifacts.' },
  { id: 1027, brand: 'Sonible', name: 'smart:deess', price: 129, category: 'plugins', subcategory: 'restoration', stores: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/59-De-Esser/11480-smart-deess' }, image: 'https://www.sonible.com/images/products/smart-deess/smart-deess.jpg', desc: 'AI-powered de-esser that identifies sibilance and plosives in real time and adjusts processing automatically for natural results.' },
  { id: 1028, brand: 'Acon Digital', name: 'Restoration Suite 2', price: 99, category: 'plugins', subcategory: 'restoration', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/51-Audio-Restoration-/5791-Restoration-Suite-2' }, image: 'https://www.acondigital.com/images/products/restoration-suite-2/restoration-suite-2.jpg', desc: 'Four specialized tools: DeNoise 2, DeHum 2, DeClick 2, and DeReverb 2. Effective and affordable noise reduction suite.' },
  { id: 1029, brand: 'Accentize', name: 'Chameleon', price: 249, category: 'plugins', subcategory: 'restoration', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/51-Audio-Restoration-/15322-Chameleon' }, image: 'https://www.accentize.com/images/products/chameleon/chameleon.jpg', desc: 'Neural network-based reverb analysis. Estimates and models the exact reverb content of any recording, then removes or replaces it.' },
  { id: 1030, brand: 'Zynaptiq', name: 'UNVEIL', price: 269, category: 'plugins', subcategory: 'restoration', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/51-Audio-Restoration-/9020-UNVEIL' }, image: 'https://www.zynaptiq.com/images/products/unveil/unveil.jpg', desc: 'De-mixing-based de-reverb processor. Surgical removal of room acoustics from recordings made in problematic spaces.' },
];

// Load existing products
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// Check for duplicates
const existingIds = new Set(products.map(p => p.id));
const existingNames = new Set(products.map(p => (p.brand + ' ' + p.name).toLowerCase()));
const added = [];
const skipped = [];

newProducts.forEach(np => {
  const key = (np.brand + ' ' + np.name).toLowerCase();
  if (existingIds.has(np.id) || existingNames.has(key)) {
    skipped.push(np.brand + ' ' + np.name);
  } else {
    products.push(np);
    added.push(np.id + ' | ' + np.brand + ' ' + np.name + ' | $' + np.price);
  }
});

// Sort by ID
products.sort((a, b) => a.id - b.id);

// Write back
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');

console.log('Products added: ' + added.length);
added.forEach(a => console.log('  ' + a));
if (skipped.length) {
  console.log('\nSkipped (duplicates): ' + skipped.length);
  skipped.forEach(s => console.log('  ' + s));
}
console.log('\nTotal products in catalog: ' + products.length);
