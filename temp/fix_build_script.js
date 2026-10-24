const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let content = fs.readFileSync(path, 'utf8');

// FIX 1: Cambiar qualifiedIds para incluir TODOS los featuredProducts, no solo los que tienen ofertas
// Buscar la línea: const qualifiedIds = allProductIds.filter(function(pid) {
content = content.replace(
  `const qualifiedIds = allProductIds.filter(function(pid) {
    const pp = products.find(function(pr) { return pr.id === pid; });
    if (!pp) return false;
    if (tmgOffers(pp, 'https://topmusiciangear.com/guides/' + guide.id + '.html')) return true;
    if (reviewStats(pid)) return true;
    if (reviews.some(function(r) { return r.productId === pid; })) return true;
    return false;
  });`,
  `const qualifiedIds = allProductIds; // Incluir TODOS los productos en JSON-LD, no solo los con ofertas`
);

console.log('FIX 1 aplicado: qualifiedIds ahora incluye todos los productos');

// FIX 2: Arreglar tmgOffers para que devuelva ofertas aunque no tengan precio (para JSON-LD)
// y generar al menos un offer con URL aunque no tenga precio
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', content);
console.log('FIX 1 guardado');

// FIX 3: Arreglar guideCutImg para no usar placeholder 14a827c6a3.webp
// Buscar function guideCutImg
let content2 = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const lines2 = content2.split('\n');

for(let i=0; i<lines2.length; i++) {
  if (lines2[i].includes('function guideCutImg')) {
    console.log('guideCutImg en línea:', i);
    for(let j=i; j<i+20; j++) {
      console.log(j + ': ' + lines2[j]);
    }
    break;
  }
}