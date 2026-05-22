const fs = require('fs');
let p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const found = {
  // From webs searches - confirmed product pages
  52: 'https://www.musik-produktiv.de/electro-voice-re20-2707014.html',
  51: 'https://www.musik-produktiv.de/sennheiser-md-421-ii.html',
  50: 'https://www.musik-produktiv.de/shure-sm58-lce.html',
  22: 'https://www.musik-produktiv.de/genelec-8040-bpm.html',
  117: 'https://www.musik-produktiv.de/kali-audio-lp-6-2nd-wave.html',
  68: 'https://www.musik-produktiv.de/fender-cd-60s-nat-10130873.html',
  105: 'https://www.musik-produktiv.de/electro-voice-zlx-12p-g2.html',
  73: 'https://www.musik-produktiv.de/vox-ac30c2-custom.html',
  56: 'https://www.musik-produktiv.de/beyerdynamic-dt-990-pro-80-ohm.html',
  16: 'https://www.musik-produktiv.de/universal-audio-apollo-twin-x-duo-usb-he.html',
  6: 'https://www.musik-produktiv.de/fender-american-professional-ii-stratocaster-rw-roasted-pine.html',
  61: 'https://www.musik-produktiv.de/fender-player-ii-stratocaster-hss-rw-3-tone-sunburst.html',
  62: 'https://www.musik-produktiv.de/fender-player-ii-telecaster-mn-black.html',
  18: 'https://www.musik-produktiv.de/solid-state-logic-ssl-2-interface.html',
  99: 'https://www.musik-produktiv.de/dunlop-535q-cry-baby-multi-wah.html',
  24: 'https://www.musik-produktiv.de/sennheiser-hd-25.html', // HD-25 is closest HD model on site
};

// Apply only if product currently has search URL
let count = 0;
for (const [id, url] of Object.entries(found)) {
  const prod = p.find(x => x.id === parseInt(id));
  if (prod && prod.stores.musikproduktiv === 'https://www.musik-produktiv.de/search') {
    prod.stores.musikproduktiv = url;
    count++;
    console.log(`✅ [${id}] ${prod.title.substring(0,45)}`);
  } else {
    console.log(`❌ [${id}] not found or already set`);
  }
}

fs.writeFileSync('data/products.json', JSON.stringify(p, null, 2));
console.log(`\nApplied ${count} URL fixes`);

// Show remaining
const remaining = p.filter(x => x.stores.musikproduktiv === 'https://www.musik-produktiv.de/search');
console.log(`\nRemaining search URLs: ${remaining.length}`);
remaining.forEach(x => console.log(`  [${x.id}] ${x.title.substring(0,50)}`));
