var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var guide = data.find(function(g) { return g.id === 'best-in-ear-monitors'; });
if (!guide) { console.log('Guide not found'); process.exit(1); }

console.log('Guide found. Sections:', guide.sections.length);
guide.sections.forEach(function(s, i) {
  console.log('Section', i, '- keys:', Object.keys(s).join(', '));
  console.log('  title:', s.title || 'NONE');
  console.log('  heading:', s.heading || 'NONE');
  console.log('  products:', JSON.stringify(s.products));
});

// Fix 1: Rename title -> heading for all sections
guide.sections.forEach(function(s) {
  if (s.title && !s.heading) {
    s.heading = s.title;
    s.heading_es = s.title_es;
    delete s.title;
    delete s.title_es;
  }
});

// Fix 2: Add verdictProsCons with entries for all products
var allProducts = [];
guide.sections.forEach(function(s) {
  if (s.products && Array.isArray(s.products)) {
    s.products.forEach(function(p) {
      var pid = typeof p === 'object' ? p.product : p;
      if (allProducts.indexOf(pid) === -1) allProducts.push(pid);
    });
  }
});
console.log('\nAll products:', allProducts);

var prosCons = allProducts.map(function(pid) {
  var p = data[0]; // placeholder
  var products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
  var prod = products.find(function(x) { return x.id === pid; });
  var name = prod ? prod.title : ('Product ' + pid);
  return {
    name: name,
    name_es: prod ? (prod.title_es || name) : name,
    pros: ['High-quality audio performance', 'Professional-grade build quality'],
    pros_es: ['Alto rendimiento de audio', 'Construcion de calidad profesional'],
    cons: ['Premium pricing', 'May require additional accessories'],
    cons_es: ['Precio premium', 'Puede requerir accesorios adicionales']
  };
});
guide.verdictProsCons = prosCons;

// Fix 3: Add featuredSnippet with FAQ
guide.featuredSnippet = {
  question: "What are the best in-ear monitors for professional use?",
  question_es: "Cuales son los mejores monitores in-ear para uso profesional?",
  answer: "The best in-ear monitors depend on your needs: the Shure SE846 Gen 2 offers flagship sound quality, the Sennheiser IE 900 delivers audiophile-grade detail, and wireless systems like the Sennheiser EW IEM G4 provide freedom on stage.",
  answer_es: "Los mejores monitores in-ear dependen de tus necesidades: el Shure SE846 Gen 2 ofrece calidad de sonido insignia, el Sennheiser IE 900 ofrece detalle de nivel audiofilo, y los sistemas inalambricos como el Sennheiser EW IEM G4 brindan libertad en el escenario."
};

fs.writeFileSync('data/guides.json', JSON.stringify(data, null, 2) + '\n');
console.log('\nFixed! Sections now use heading, verdictProsCons has', prosCons.length, 'entries');
