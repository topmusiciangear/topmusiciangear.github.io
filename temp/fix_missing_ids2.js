const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));

// Fix beginner-guitar
const guide1 = g.find(x => x.id === 'beginner-guitar');
if (guide1) {
  // Fix featuredProducts
  if (guide1.featuredProducts) {
    guide1.featuredProducts = guide1.featuredProducts.map(id => id === 102 ? 314 : id);
    console.log('beginner-guitar featuredProducts:', JSON.stringify(guide1.featuredProducts));
  }
  // Fix sections
  if (guide1.sections) {
    guide1.sections.forEach((s, i) => {
      if (s.products) {
        const old = s.products.includes(102);
        s.products = s.products.map(id => id === 102 ? 314 : id);
        if (old) console.log('  Section ' + i + ' products fixed:', JSON.stringify(s.products));
      }
    });
  }
}

// Fix best-acoustic-guitars-for-beginners
const guide2 = g.find(x => x.id === 'best-acoustic-guitars-for-beginners');
if (guide2) {
  if (guide2.featuredProducts) {
    guide2.featuredProducts = guide2.featuredProducts.map(id => id === 102 ? 314 : id);
    console.log('best-acoustic-guitars-for-beginners featuredProducts:', JSON.stringify(guide2.featuredProducts));
  }
  if (guide2.sections) {
    guide2.sections.forEach((s, i) => {
      if (s.products) {
        const old = s.products.includes(102);
        s.products = s.products.map(id => id === 102 ? 314 : id);
        if (old) console.log('  Section ' + i + ' products fixed:', JSON.stringify(s.products));
      }
    });
  }
}

// Fix best-reverb-delay: id 100 → 97
const guide3 = g.find(x => x.id === 'best-reverb-delay');
if (guide3) {
  if (guide3.featuredProducts) {
    guide3.featuredProducts = guide3.featuredProducts.map(id => id === 100 ? 97 : id);
    console.log('best-reverb-delay featuredProducts:', JSON.stringify(guide3.featuredProducts));
  }
  if (guide3.sections) {
    guide3.sections.forEach((s, i) => {
      if (s.products) {
        const old = s.products.includes(100);
        s.products = s.products.map(id => id === 100 ? 97 : id);
        if (old) console.log('  Section ' + i + ' products fixed:', JSON.stringify(s.products));
      }
    });
  }
}

// Fix guitar-pedals: id 100 → 97, id 99 → 96
const guide4 = g.find(x => x.id === 'guitar-pedals');
if (guide4) {
  if (guide4.featuredProducts) {
    guide4.featuredProducts = guide4.featuredProducts.map(id => id === 100 ? 97 : (id === 99 ? 96 : id));
    console.log('guitar-pedals featuredProducts:', JSON.stringify(guide4.featuredProducts));
  }
  if (guide4.sections) {
    guide4.sections.forEach((s, i) => {
      if (s.products) {
        const old = s.products.includes(100) || s.products.includes(99);
        s.products = s.products.map(id => id === 100 ? 97 : (id === 99 ? 96 : id));
        if (old) console.log('  Section ' + i + ' products fixed:', JSON.stringify(s.products));
      }
    });
  }
}

fs.writeFileSync(p, JSON.stringify(g, null, 2), 'utf8');
console.log('data/guides.json actualizado');
