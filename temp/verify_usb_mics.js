var fs = require('fs');
var h = fs.readFileSync('guides/usb-mics.html', 'utf8');

// Check table headers
var ths = h.match(/<th[^>]*class="product-table-cell"[^>]*>([^<]+)<\/th>/g);
if (ths) {
  console.log('Table columns (' + ths.length + '):');
  ths.forEach(function(t) { console.log(' -', t.replace(/<[^>]+>/g, '').trim()); });
} else {
  console.log('No product table headers found');
}

// Check sections
var sections = h.match(/<h2[^>]*>([^<]+)<\/h2>/g);
if (sections) {
  console.log('\nSections (' + sections.length + '):');
  sections.forEach(function(s) { console.log(' -', s.replace(/<[^>]+>/g, '').trim().slice(0, 70)); });
}

// Check verdict cards
var vpc = h.match(/class="verdict-card"/g);
console.log('\nVerdict cards:', vpc ? vpc.length : 0);

// Check for old products in visible content (not JSON-LD)
var visible = h.replace(/<script[\s\S]*?<\/script>/g, '');
console.log('\nVisible content checks:');
console.log(' Yeti section:', visible.indexOf('The Classic That Started It All') > -1 ? 'STILL PRESENT' : 'removed');
console.log(' AM8 section:', visible.indexOf('FIFINE AmpliGame AM8') > -1 ? 'STILL PRESENT' : 'removed');
console.log(' PM461 VPC:', visible.indexOf('Maono PM461') > -1 ? 'STILL PRESENT' : 'removed');
console.log(' NT-USB+ section:', visible.indexOf('NT-USB+') > -1 ? 'present' : 'MISSING');
console.log(' MV6 section:', visible.indexOf('Shure MV6') > -1 ? 'present' : 'MISSING');
console.log(' AT2020USB-XP VPC:', visible.indexOf('AT2020USB-XP') > -1 ? 'present' : 'MISSING');
console.log(' Lyra note:', visible.indexOf('AKG Lyra') > -1 ? 'present' : 'MISSING');
