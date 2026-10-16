const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Add productTable and verdictProsCons to each new plugin guide
const updates = {
  'best-synth-vsts': {
    productTable: {
      headers: ['Product', 'Price', 'Best For', 'Synthesis', 'Presets'],
      rows: [
        { label: 'Pigments 7', val: '$199', val2: 'Visual synthesis', val3: 'Wavetable + Granular + VA', val4: '1,000+' },
        { label: 'Diva', val: '$179', val2: 'Analog warmth', val3: 'Virtual Analog', val4: '1,200+' },
        { label: 'Phase Plant', val: '$199', val2: 'Sound design', val3: 'Semi-modular', val4: '400+' },
        { label: 'Avenger 2', val: '$249', val2: 'EDM production', val3: 'Wavetable + Sample + FM', val4: '3,000+' },
        { label: 'Serum', val: '$189', val2: 'Bass music', val3: 'Wavetable', val4: '1,400+' },
        { label: 'Massive X', val: '$199', val2: 'Aggressive sound', val3: 'Wavetable', val4: '1,000+' }
      ]
    }
  },
  'best-midi-theory-plugins': {
    productTable: {
      headers: ['Product', 'Price', 'Best For', 'Key Feature', 'DAW Integration'],
      rows: [
        { label: 'Scaler 3', val: '$99', val2: 'Theory learning', val3: 'Key detection + chords', val4: 'MIDI out' },
        { label: 'Captain Plugins Epic', val: '$99', val2: 'Songwriting', val3: '5-plugin suite', val4: 'MIDI out' },
        { label: 'Loop Engine 3', val: '$130.08', val2: 'Groove creation', val3: 'Loop sequencing', val4: 'MIDI export' },
        { label: 'Playbeat 4', val: '$89', val2: 'Drum patterns', val3: 'AI genre detection', val4: 'MIDI out' },
        { label: 'Orb Suite 3', val: '$99', val2: 'AI composition', val3: '4 AI plugins', val4: 'MIDI out' },
        { label: 'PitchMap', val: '$149', val2: 'Pitch manipulation', val3: 'Polyphonic pitch mapping', val4: 'Real-time' }
      ]
    }
  },
  'best-piano-keyboard-vsts': {
    productTable: {
      headers: ['Product', 'Price', 'Best For', 'Type', 'Sound Count'],
      rows: [
        { label: 'Keyscape', val: '$399', val2: 'Ultimate variety', val3: 'Sampled', val4: '500+' },
        { label: 'Kontakt 8', val: '$299', val2: 'Sampler platform', val3: 'Sampler', val4: 'Library-dependent' },
        { label: 'V Collection 11 Pro', val: '$699', val2: 'Vintage keyboards', val3: 'Modeled', val4: '12,000+' },
        { label: 'Addictive Keys', val: '$99', val2: 'Pop and lo-fi', val3: 'Sampled', val4: '3 instruments' },
        { label: 'Pianoteq 9 Pro', val: '$399', val2: 'Physical modeling', val3: 'Modeled', val4: '12 packs' },
        { label: 'Augmented Piano', val: '$149', val2: 'Cinematic', val3: 'Hybrid', val4: '24 preparations' }
      ]
    }
  },
  'best-guitar-plugins': {
    productTable: {
      headers: ['Product', 'Price', 'Best For', 'Amp Models', 'Key Feature'],
      rows: [
        { label: 'AmpliTube 5', val: '$199.99', val2: 'Variety', val3: '400+', val4: 'Tonex integration' },
        { label: 'BIAS FX 2', val: '$299', val2: 'Tone matching', val3: '100+', val4: 'ToneCloud' },
        { label: 'UAD Sound City', val: '$149', val2: 'Rock room', val3: '1 room', val4: 'Legendary studio' },
        { label: 'TH-U Premium', val: '$269', val2: 'All genres', val3: '15', val4: 'Fluid IR' },
        { label: 'Amp Room', val: '$99', val2: 'Clean tones', val3: '4 suites', val4: 'Scandinavian' },
        { label: 'bx_rockrack V3', val: '$199', val2: 'Rock/Metal', val3: '8', val4: 'Tolerance Modeling' }
      ]
    }
  },
  'best-audio-repair-plugins': {
    productTable: {
      headers: ['Product', 'Price', 'Best For', 'Key Feature', 'Type'],
      rows: [
        { label: 'RX 12 Standard', val: '$199', val2: 'Spectral repair', val3: 'Spectral editor', val4: 'Suite' },
        { label: 'Soothe3', val: '$249', val2: 'Resonance control', val3: 'AI detection', val4: 'Dynamic' },
        { label: 'smart:deess', val: '$129', val2: 'De-essing', val3: 'Neural network', val4: 'AI-powered' },
        { label: 'Restoration Suite 2', val: '$99', val2: 'Budget repair', val3: '4 tools', val4: 'Suite' },
        { label: 'Chameleon', val: '$249', val2: 'Reverb removal', val3: 'Neural reverb analysis', val4: 'AI-powered' },
        { label: 'UNVEIL', val: '$269', val2: 'De-reverb', val3: 'De-mixing', val4: 'Standalone' }
      ]
    }
  },
  'autotune-vs-melodyne': {
    productTable: {
      headers: ['Product', 'Price', 'Best For', 'Processing', 'Polyphonic'],
      rows: [
        { label: 'AutoTune 2026', val: '$250', val2: 'Live + effect', val3: 'Real-time', val4: 'No' },
        { label: 'Melodyne 5 Essential', val: '$99', val2: 'Surgical editing', val3: 'Offline', val4: 'Yes (Studio)' }
      ]
    }
  },
  'ozone-vs-fabfilter': {
    productTable: {
      headers: ['Product', 'Price', 'Best For', 'Modules', 'AI Features'],
      rows: [
        { label: 'Ozone 12 Advanced', val: '$499', val2: 'AI-assisted mastering', val3: '20', val4: 'Master Assistant' },
        { label: 'FabFilter Mastering Bundle', val: '$519', val2: 'Surgical manual control', val3: '4 plugins', val4: 'None' }
      ]
    }
  },
  'vocalign-vs-revoice-pro': {
    productTable: {
      headers: ['Product', 'Price', 'Best For', 'Track Count', 'Workflow'],
      rows: [
        { label: 'VocAlign 7 Pro', val: '$249', val2: 'Quick alignment', val3: '2-10', val4: 'Plugin (ARA)' },
        { label: 'Revoice Pro', val: '$499', val2: 'Large-scale projects', val3: '20+', val4: 'Standalone' }
      ]
    }
  }
};

let updated = 0;
guides.forEach(guide => {
  const u = updates[guide.id];
  if (u) {
    if (u.productTable) {
      guide.productTable = u.productTable;
    }
    updated++;
    console.log('Added productTable to: ' + guide.id);
  }
});

guides.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nUpdated ' + updated + ' guides with productTable');
