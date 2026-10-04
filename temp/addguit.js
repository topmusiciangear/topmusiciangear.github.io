const fs = require('fs');
const PF = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const P = require(PF);
P.push({
  id: 553, title: 'Fender CN-60S Nylon', title_es: 'Fender CN-60S Nylon',
  brand: 'Fender', category: 'guitars', price: 230, rating: 4.5, reviews: 132,
  desc: 'A nylon-string crossover that pairs soft, easy nylon with a narrow 43mm steel-string-style neck — no wide-classical stretch. Solid spruce top over mahogany back and sides, walnut board and rolled edges. The most comfortable first nylon for small hands and electric converts.',
  desc_es: 'Una crossover de nylon que combina la suavidad de las cuerdas de nylon con un mástil estrecho de 43 mm estilo acústica — sin la apertura de una clásica tradicional. Tapa sólida de abeto, fondo y aros de caoba, diapasón de nogal y bordes redondeados. La primera nylon más cómoda para manos pequeñas y quienes vienen de la eléctrica.',
  img: 'https://r2.gear4music.com/media/71/719445/1200/preview.jpg',
  stores: {
    gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Fender-CN-60S-Nylon-Walnut-Fingerboard-Natural/2VXD',
    amazon: 'https://www.amazon.com/dp/B07K2JLS56'
  }
});
P.push({
  id: 554, title: 'Takamine GC1 Classical', title_es: 'Takamine GC1 Clásica',
  brand: 'Takamine', category: 'guitars', price: 349, rating: 4.6, reviews: 203,
  desc: 'A traditional classical built like a tank: fan-braced spruce top, mahogany back and sides, mahogany neck with adjustable two-way truss rod, laurel board and 650mm scale. Holds tuning through temperature and humidity swings — the indestructible student workhorse.',
  desc_es: 'Una clásica tradicional construida como un tanque: tapa de abeto con varetaje de abanico, fondo y aros de caoba, mástil de caoba con alma ajustable de doble acción, diapasón de laurel y escala de 650 mm. Mantiene la afinación ante cambios de temperatura y humedad — la compañera indestructible del estudiante.',
  img: 'https://r2.gear4music.com/media/52/527882/1200/preview.jpg',
  stores: {
    gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Takamine-GC1-Classical-Guitar-Natural/1FSN',
    amazon: 'https://www.amazon.com/dp/B00EOADUTU',
    zzounds: 'https://www.zzounds.com/a--925521/item--TAKGC1'
  }
});
fs.writeFileSync(PF, JSON.stringify(P, null, 2));
console.log('products 553+554 added');