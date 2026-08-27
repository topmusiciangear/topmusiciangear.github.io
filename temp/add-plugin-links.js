var fs = require('fs');
var p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

var updates = [
  // Gear4Music links
  { id: 383, store: 'gear4music', url: 'https://www.gear4music.com/Recording-and-Computers/Sonible-SmartEQ-4/65LT' },
  { id: 389, store: 'gear4music', url: 'https://www.gear4music.com/Recording-and-Computers/Eventide-H3000-Band-Delays-MKII/6EQU' },
  { id: 390, store: 'gear4music', url: 'https://www.gear4music.com/Recording-and-Computers/Arturia-Chorus-JUN-6/5GAL' },
  { id: 375, store: 'gear4music', url: 'https://www.gear4music.com/Recording-and-Computers/XLN-Audio-RC-20-Retro-Color/3NGQ' },
  { id: 377, store: 'gear4music', url: 'https://www.gear4music.com/Recording-and-Computers/Baby-Audio-Transit-2/6RY2' },
  { id: 392, store: 'gear4music', url: 'https://www.gear4music.com/Recording-and-Computers/D16-Group-Repeater-Vintage-Modelled-Delay/3XWM' },
  // Music Store links
  { id: 384, store: 'musicstore', url: 'https://www.musicstore.com/en_US/USD/Sonible-Smart-limit-License-Code/art-PCM0017210-000' },
  { id: 392, store: 'musicstore', url: 'https://www.musicstore.com/en_US/USD/D16-Group-Repeater-License-Code/art-PCM0015075-000' },
  // Reverb links
  { id: 389, store: 'reverb', url: 'https://reverb.com/marketplace?query=Eventide+H3000+Band+Delays' },
  { id: 392, store: 'reverb', url: 'https://reverb.com/marketplace?query=D16+Group+Repeater' },
];

var count = 0;
updates.forEach(function(u) {
  var prod = p.find(function(x) { return x.id === u.id; });
  if (prod) {
    if (!prod.stores) prod.stores = {};
    if (!prod.stores[u.store]) {
      prod.stores[u.store] = u.url;
      count++;
      console.log('Added: ID', u.id, u.store);
    } else {
      console.log('Already exists: ID', u.id, u.store);
    }
  }
});

console.log('\nTotal added:', count);
fs.writeFileSync('data/products.json', JSON.stringify(p, null, 2), 'utf8');
console.log('Saved products.json');
