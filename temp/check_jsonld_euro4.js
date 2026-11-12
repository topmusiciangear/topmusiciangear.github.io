const fs = require('fs');
const html = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-drum-machine_es.html', 'utf8');
const ldMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
let hasEuro = false;
ldMatch.forEach((block, i) => {
  const content = block.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
  if (content.includes('euro')) {
    hasEuro = true;
    const idx = content.indexOf('euro');
    console.log('Block ' + i + ' has euro:', content.slice(idx - 40, idx + 20));
  }
});
console.log('No euro in JSON-LD:', !hasEuro);
console.log('Has dolar in JSON-LD:', ldMatch.some(b => b.includes('dólar')));
