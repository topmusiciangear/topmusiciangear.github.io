const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const pid = id => { const x = p.find(y => y.id === id); return x || null; };

// Expected category mapping for each guide
const guideExpectedCategories = {
  // MIDI Keyboards
  'midi-keyboards': ['keyboards'],
  'midi-controllers': ['keyboards', 'controllers'],
  
  // Interfaces
  'best-interface': ['interfaces'],
  'portable-interfaces': ['interfaces'],
  'budget-interfaces': ['interfaces'],
  'streaming-interfaces': ['interfaces'],
  
  // Headphones
  'best-headphones': ['headphones'],
  'open-headphones': ['headphones'],
  'budget-headphones': ['headphones'],
  'tracking-headphones': ['headphones'],
  'best-headphones-for-mixing': ['headphones'],
  
  // Monitors
  'best-monitors': ['monitors'],
  'budget-monitors': ['monitors'],
  'best-monitors-for-small-rooms': ['monitors'],
  'monitor-setup': ['monitors', 'accessories'],
  
  // Microphones
  'best-microphone': ['microphones'],
  'budget-mics': ['microphones'],
  'usb-mics': ['microphones'],
  'stage-mics': ['microphones'],
  'tube-ribbon-mics': ['microphones'],
  'best-mic-for-podcasting': ['microphones'],
  'best-mic-for-guitar-amps': ['microphones'],
  'mics-for-creators': ['microphones'],
  'best-instrument-mics': ['microphones'],
  'wireless-lapel-mics': ['microphones'],
  'best-shotgun-mics': ['microphones'],
  
  // DAW
  'daw-guide': ['daw'],
  'best-daw-for-beginners': ['daw'],
  
  // Plugins
  'best-plugins': ['plugins'],
  'mixing-plugins': ['plugins'],
  'fx-plugins': ['plugins'],
  'vocal-plugins': ['plugins'],
  'channel-strip-plugins': ['plugins'],
  
  // Amps
  'guitar-bass-amps': ['amps'],
  'best-practice-amps': ['amps'],
  'best-bass-amps': ['amps'],
  
  // Pedals
  'guitar-pedals': ['pedals'],
  'best-overdrive-distortion': ['pedals'],
  'best-reverb-delay': ['pedals'],
  'best-looper-pedals': ['pedals'],
  'best-multi-effects-pedals': ['pedals'],
  
  // Guitars
  'best-electric-guitar': ['guitars'],
  'best-electric-guitars-2026': ['guitars'],
  'best-beginner-electric-guitar': ['guitars'],
  'beginner-guitar': ['guitars'],
  'acoustic-guitars-guide': ['guitars'],
  'best-guitar-home-office': ['guitars'],
  'best-parlor-guitars': ['guitars'],
  'fender-guide': ['guitars'],
  
  // Bass
  'precision-vs-jazz': ['basses'],
  'fender-bass-guide': ['basses'],
  'beginner-bass-guitars': ['basses'],
  'best-electric-under-500': ['basses'],
  'budget-bass-like-expensive': ['basses'],
  
  // Keyboards
  'best-keyboard': ['keyboards'],
  'best-digital-pianos': ['keyboards'],
  'best-synthesizers': ['keyboards'],
  
  // Drum machines / samplers
  'best-drum-machine': ['drum_machines'],
  'best-samplers-drum-computers': ['drum_machines'],
  'best-grooveboxes': ['drum_machines'],
  'best-hardware-samplers': ['drum_machines'],
  
  // Mixers
  'live-sound-pa': ['mixers', 'speakers'],
  'best-digital-mixers': ['mixers'],
  'best-analog-mixers': ['mixers'],
  'best-compact-mixers': ['mixers'],
  'best-live-sound-mixers': ['mixers'],
  
  // PA / Speakers
  'best-pa-speakers': ['speakers'],
  'budget-pa-systems': ['speakers'],
  'best-live-subwoofers': ['speakers'],
  'stage-wedges': ['speakers'],
  
  // Streaming
  'stream-controllers': ['streaming'],
  
  // Comparisons (check both products are same category)
  'sm57-vs-sm58': ['microphones'],
  'scarlett-vs-ssl': ['interfaces'],
  'dt770-vs-dt990': ['headphones'],
  'hs8-vs-rokit-7': ['monitors'],
  'm50x-vs-mdr7506': ['headphones'],
  'best-electric-guitar': ['guitars'],
  'apollo-vs-babyface': ['interfaces'],
  'scarlett-vs-volt': ['interfaces'],
  'audient-vs-motu': ['interfaces'],
  'rme-vs-motu': ['interfaces'],
  'adam-vs-genelec': ['monitors'],
  'jbl-vs-kali': ['monitors'],
  'hd490-pro-vs-dt990': ['headphones'],
  'm50x-vs-dt770': ['headphones'],
  'k371-vs-mdr7506': ['headphones'],
  'sm7b-vs-nt1': ['microphones'],
  'sm57-vs-md421': ['microphones'],
  'c414-vs-u87': ['microphones'],
  're20-vs-sm7b': ['microphones'],
  'ew100-vs-ulxd': ['microphones'],
  'zlx-vs-k12': ['speakers'],
  'dxr-vs-prx': ['speakers'],
  'player-strat-vs-pacifica': ['guitars'],
  'american-pro-vs-les-paul': ['guitars'],
  'martin-d28-vs-taylor-314': ['guitars'],
  'ableton-vs-fl-studio': ['daw'],
  'pro-tools-vs-cubase': ['daw'],
  'blues-junior-vs-ac30': ['amps'],
  'katana-vs-dsl': ['amps'],
  'fabfilter-vs-ozone': ['plugins'],
  'nord-stage-4-vs-montage-m8x': ['keyboards'],
  'digitakt-ii-vs-tr8s': ['drum_machines'],
  'yamaha-mg-vs-behringer-xenyx': ['mixers'],
  'active-vs-passive-pa': ['speakers'],
  'budget-pa-systems': ['speakers'],
  'precision-vs-jazz': ['basses'],
  'fender-bass-guide': ['basses'],
  'scarlett-vs-motu': ['interfaces'],
  'ableton-vs-logic': ['daw'],
  'xr18-vs-m32r': ['mixers'],
  'xr18-vs-cq18t': ['mixers'],
  'me90-vs-mx5': ['pedals'],
  'nx912-vs-pxm12mp': ['speakers'],
  'rodecaster-pro2-vs-dlz-creator': ['streaming'],
  'stream-deck-plus-xl-vs-razer': ['streaming'],
  'rode-wireless-pro-vs-dji-mic-2': ['microphones'],
  'ew-iem-g4-twin-vs-psm300': ['microphones'],
  'ie900-vs-se846': ['headphones'],
  'ts9-vs-bd2': ['pedals'],
  'atc-vs-genelec': ['monitors'],
  'kh750-vs-7050c': ['monitors'],
};

let issues = [];

g.forEach(hub => {
  const expected = guideExpectedCategories[hub.id];
  if (!expected) {
    // Hub — check each section
    return;
  }
  
  const guideTitle = hub.title || hub.id;
  const allProducts = new Set();
  hub.sections.forEach(s => {
    (s.products || []).forEach(id => allProducts.add(id));
  });
  
  allProducts.forEach(id => {
    const prod = pid(id);
    if (!prod) return;
    const cat = prod.category;
    if (!expected.includes(cat)) {
      issues.push(`${hub.id} | "${prod.title}" (${cat}) — expected: ${expected.join(',')}`);
    }
  });
});

console.log('=== PRODUCTS WITH WRONG CATEGORY ===');
issues.forEach(i => console.log(i));
console.log(`\nTotal issues: ${issues.length}`);
