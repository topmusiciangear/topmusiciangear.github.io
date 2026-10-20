const https = require('https');
https.get('https://raw.githubusercontent.com/topmusiciangear/topmusiciangear.github.io/main/guides/j48-vs-rndi_es.html', (r) => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    // Find the product cards section
    const start = d.indexOf('¿Qué productos hay en esta guía?');
    const end = d.indexOf('</div>', start + 1000);
    if (start > 0) {
      const section = d.slice(start, end + 1000);
      // Find score badges in this section
      const badges = section.match(/guide-product-card-rating-num">[0-9.]+/g);
      console.log('Product card badges:', badges);
    }
    // Also search for "Nuestra nota"
    const nota = d.match(/Nuestra nota[^<]*9\.[45]/g);
    console.log('Nuestra nota:', nota);
    // Find aria-label with score
    const aria = d.match(/aria-label="[^"]*9\.[45][^"]*"/g);
    console.log('Aria labels:', aria);
  });
});