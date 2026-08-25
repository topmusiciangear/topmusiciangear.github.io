const fs = require('fs');
const path = require('path');
const g = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'guides.json'), 'utf8'));

const hubProducts = {
  'best-electric-guitar': {
    0: [309, 310, 103, 312]  // Squier Debut, Squier Affinity, Yamaha Pacifica, PRS SE
  },
  'beginner-guitar': {
    0: [309, 310, 103, 313]  // Squier Debut, Squier Affinity, Pacifica, Sonic Mustang
  },
  'beginner-bass-guitars': {
    0: [157, 326, 159, 164]  // Squier CV Jazz, Sire V3, Yamaha TRBX304, Schecter Stiletto
  },
  'best-interface': {
    0: [15, 54, 18, 53]  // Scarlett 2i2, MOTU M2, SSL 2+, Audient iD14
  },
  'portable-interfaces': {
    0: [15, 54, 53]  // Scarlett 2i2, MOTU M2, Audient iD14
  },
  'streaming-interfaces': {
    0: [239, 240, 327]  // Rodecaster Duo, Bridge Cast X, Maono E2
  },
  'best-monitors': {
    0: [19, 117, 116, 21]  // Yamaha HS8, Kali LP-6, JBL 305P, Adam A7V
  },
  'best-headphones': {
    0: [23, 56, 25, 24]  // DT 770, DT 990, ATH-M50x, HD 490 Pro
  },
  'open-headphones': {
    0: [24, 56, 23]  // HD 490 Pro, DT 990, DT 770 (for comparison)
  },
  'best-drum-machine': {
    0: [33, 128, 256]  // TR-8S, TR-6S, MPC One G2
  },
  'best-samplers-drum-computers': {
    0: [127, 256, 255]  // Digitakt II, MPC One G2, SP-404MKII
  },
  'best-plugins': {
    0: [62]  // FabFilter Pro-Q 4
  },
  'guitar-bass-amps': {
    0: [72, 75]  // Boss Katana 50, Ampeg Rocket Bass
  },
  'guitar-pedals': {
    0: []  // No pedal products in DB that match
  },
  'live-sound-pa': {
    0: [106, 116]  // QSC K12.2, JBL 305P (as reference)
  },
  'best-digital-mixers': {
    0: [145]  // Behringer XR18
  },
  'daw-guide': {
    0: [110, 111, 112, 113]  // Ableton, Logic, FL Studio, Pro Tools
  },
  'mics-for-creators': {
    0: [276, 292, 195]  // Samson Q2U, Rode NT-USB Mini, Elgato Wave:3
  },
  'best-mic-for-podcasting': {
    0: [1, 276, 197]  // SM7B, Samson Q2U, Rode PodMic
  }
};

Object.entries(hubProducts).forEach(([id, sectionProducts]) => {
  const guide = g.find(x => x.id === id);
  if (!guide) { console.log('SKIP:', id); return; }
  
  Object.entries(sectionProducts).forEach(([sectionIdx, productIds]) => {
    const section = guide.sections[parseInt(sectionIdx)];
    if (!section) { console.log('SKIP section:', id, sectionIdx); return; }
    if (!section.products) section.products = [];
    
    productIds.forEach(pid => {
      if (!section.products.includes(pid)) {
        section.products.push(pid);
        console.log('ADDED:', id, '→', pid);
      }
    });
  });
});

fs.writeFileSync(path.join(__dirname, 'data', 'guides.json'), JSON.stringify(g, null, 2), 'utf8');
console.log('\nDONE: Products added to hubs');
