const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/';
const html = fs.readFileSync(path + 'guides/best-microphone.html', 'utf8');

// Extract all JSON-LD blocks
const ldMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
let allProducts = [];
ldMatch.forEach((block, i) => {
  const content = block.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
  try {
    const json = JSON.parse(content);
    // Collect product names from ItemList
    if (json.itemListElement) {
      json.itemListElement.forEach(item => {
        if (item.name) allProducts.push({ source: 'ItemList', name: item.name, price: item.offers ? item.offers.price : null });
      });
    }
    // Collect product names from @graph
    if (json['@graph']) {
      json['@graph'].forEach(item => {
        if (item['@type'] === 'Product' && item.name) {
          allProducts.push({ source: '@graph', name: item.name, price: item.offers ? (item.offers.price || item.offers.lowPrice) : null });
        }
      });
    }
  } catch (e) {}
});

console.log('Products in JSON-LD: ' + allProducts.length);
allProducts.forEach(p => {
  const inHtml = html.includes(p.name);
  console.log('  ' + (inHtml ? '✓' : '✗') + ' [' + p.source + '] ' + p.name + (p.price ? ' ($' + p.price + ')' : ''));
  if (!inHtml) console.log('    NOT FOUND IN HTML!');
});

// Check Article description
const articleBlock = ldMatch[0];
const articleJson = JSON.parse(articleBlock.replace(/<script[^>]*>/, '').replace(/<\/script>/, ''));
console.log('\nArticle headline: ' + articleJson.headline);
console.log('Headline in HTML: ' + html.includes(articleJson.headline));
console.log('Article about: ' + JSON.stringify(articleJson.about));
console.log('Article description in HTML: ' + html.includes(articleJson.description));
