const fs = require('fs');
const guidesContent = fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json', 'utf8');
const guides = JSON.parse(guidesContent);

const targetIds = [
  "best-stage-keyboards",
  "best-synth-vsts",
  "best-synthesizers",
  "best-wireless-iems",
  "blues-junior-vs-ac30",
  "blx288-vs-ewd",
  "bridge-cast-x-vs-rodecaster-pro2",
  "budget-bass-like-expensive",
  "budget-headphones",
  "budget-interfaces",
  "budget-mics",
  "budget-monitors",
  "budget-pa-systems",
  "budget-usb-mics",
  "c414-vs-u87",
  "channel-strip-plugins",
  "compact-rhythm-devices",
  "daw-guide",
  "di-box",
  "digitakt-ii-vs-tr8s",
  "dt770-vs-dt990"
];

const targetGuides = guides.filter(g => targetIds.includes(g.id));
targetGuides.forEach(g => {
  console.log('=== ' + g.id + ' ===');
  console.log('title_es: ' + g.title_es);
  const products = new Set();
  g.sections.forEach(s => {
    if (s.products) s.products.forEach(p => products.add(p));
  });
  if (g.featuredProducts) g.featuredProducts.forEach(p => products.add(p));
  console.log('products: ' + Array.from(products).join(', '));
  console.log('');
});