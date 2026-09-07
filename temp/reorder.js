const fs = require('fs');
const guidesPath = './data/guides.json';
const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
const guide = guides.find((g) => g.id === 'studio-subwoofers-setup');

// User's confirmed ideal order:
// 1. KH 810 II (468), 2. ATC SCS120 Pro (470), 3. Focal Sub12 (479),
// 4. Genelec 7370A (480), 5. Barefoot MicroSub45 (481), 6. KH 750 DSP (337)
const desiredOrder = [468, 470, 479, 480, 481, 337];

// Get the product sections (those with a non-empty products array), reorder them
const productSections = guide.sections.filter((s) => s.products && s.products.length > 0);
const eduSections = guide.sections.filter((s) => !(s.products && s.products.length > 0));

const reordered = desiredOrder.map((id) => {
  const sec = productSections.find((s) => s.products[0] === id);
  if (!sec) throw new Error('No section for product id ' + id);
  return sec;
});

// Rebuild: [crawl], [reordered products], [crossover], [phase]
const newSections = [...eduSections.filter((s) => s.heading.includes('Crawl') || s.heading.includes('Position')), ...reordered, ...eduSections.filter((s) => !s.heading.includes('Crawl') && !s.heading.includes('Position'))];

guide.sections = newSections;
guide.featuredProducts = desiredOrder;

fs.writeFileSync(guidesPath, JSON.stringify(guides, null, 2));
console.log('Sections reordered to user ideal list.');
guide.sections.forEach((s, i) => console.log(i, ':', s.heading, '->', JSON.stringify(s.products)));
console.log('featuredProducts:', JSON.stringify(guide.featuredProducts));
