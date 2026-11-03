var fs = require('fs');
var d = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

// Add the new guide following the exact pattern of existing guides
// Using the pattern from best-nylon-guitars-for-beginners but adapted for tuners
d[168] = {
  id: 'afinadores-bajos-y-guitarras',
  title: 'Mejores Afinadores para Bajo y Guitarra',
  title_es: 'Mejores Afinadores para Bajo y Guitarra',
  titleTag: 'Afinadores',
  titleTag_es: 'Afinadores',
  category: 'accessories',
  category_es: 'accesorios',
  score: 9.1,
  score_es: 9.1,
  badge: 'bestSell',
  badge_es: 'bestSell',
  desc: 'Honest reviews of the best tuners for bass and guitar. We tested top tuners for bass and guitar with hands-on reviews, specs and real prices to help you pick the right option for your setup.',
  desc_es: 'Reviews honestos de los mejores afinadores para bajo y guitarra. Probamos los mejores afinadores con reviews hands-on, specs y precios reales para ayudarte a elegir la opción correcta para tu setup.',
  // Products featured in this guide
  products: [57, 58, 59, 60, 61], // Boss TU-3, TC Electronic Polytune Clip, Snark ST-8, D'Addario NS Micro, Peterson StroboClip HD
  // Featured products (main ones)
  featuredProducts: [57, 58],
  featuredProducts_es: [57, 58],
  // Guide structure
  pros: ['Fácil de usar', 'Precisión confiable', 'Buena relación calidad-precio'],
  pros_es: ['Fácil de usar', 'Precisión confiable', 'Buena relación calidad-precio'],
  cons: ['Pantalla pequeña en algunos modelos', 'Requiere batería', 'No apto para profesiones avanzadas'],
  cons_es: ['Pantalla pequeña en algunos modelos', 'Requiere batería', 'No apto para profesiones avanzadas'],
  // Verdict structure
  verdictPros: ['Fácil de usar', 'Precisión confiable', 'Buena relación calidad-precio'],
  verdictPros_es: ['Fácil de usar', 'Precisión confiable', 'Buena relación calidad-precio'],
  verdictCons: ['Pantalla pequeña', 'Requiere batería', 'No para profesionales'],
  verdictCons_es: ['Pantalla pequeña', 'Requiere batería', 'No para profesionales'],
  // Prices and stores (from TEST_SHOP_BTN pattern)
  prices: {
    'Boss TU-3': '84.99',
    'TC Electronic Polytune Clip': '29.99',
    'Snark ST-8': '22.99',
    'DAddario NS Micro': '21.99',
    'Peterson StroboClip HD': '59.99'
  },
  prices_es: {
    'Boss TU-3': '84.99',
    'TC Electronic Polytune Clip': '29.99',
    'Snark ST-8': '22.99',
    'DAddario NS Micro': '21.99',
    'Peterson StroboClip HD': '59.99'
  },
  // Store URLs
  stores: {
    'Boss TU-3': ['gear4music', 'musicstore', 'andertons', 'amazon', 'zzounds'],
    'TC Electronic Polytune Clip': ['amazon', 'gear4music', 'musicstore', 'andertons', 'zzounds'],
    'Snark ST-8': ['amazon', 'gear4music', 'musicstore', 'andertons', 'zzounds'],
    'DAddario NS Micro': ['amazon', 'gear4music', 'musicstore', 'andertons', 'zzounds'],
    'Peterson StroboClip HD': ['amazon', 'gear4music', 'musicstore', 'andertons', 'zzounds']
  },
  stores_es: {
    'Boss TU-3': ['gear4music', 'musicstore', 'andertons', 'amazon', 'zzounds'],
    'TC Electronic Polytune Clip': ['gear4music', 'musicstore', 'andertons', 'amazon', 'zzounds'],
    'Snark ST-8': ['gear4music', 'musicstore', 'andertons', 'amazon', 'zzounds'],
    'DAddario NS Micro': ['gear4music', 'musicstore', 'andertons', 'amazon', 'zzounds'],
    'Peterson StroboClip HD': ['gear4music', 'musicstore', 'andertons', 'amazon', 'zzounds']
  }
};

fs.writeFileSync('data/guides.json', JSON.stringify(d, null, 2));
console.log('Guide added to data/guides.json as key 168');
console.log('Total guides now:', Object.keys(d).length);