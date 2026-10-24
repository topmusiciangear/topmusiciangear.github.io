const https = require('https');

https.get('https://topmusiciangear.com/guides/best-monitors.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Buscar botones de compra
    const buyBtns = data.match(/data-store="[^"]+"/g);
    console.log('Botones de compra (data-store):', buyBtns ? buyBtns.length : 0);
    if (buyBtns) {
      const stores = [...new Set(buyBtns.map(s => s.match(/data-store="([^"]+)"/)[1]))];
      console.log('Tiendas únicas:', stores);
    }
    
    // Buscar enlaces de compra
    const buyLinks = data.match(/href="https?:\/\/[^"]*musicstore[^"]*"/g);
    console.log('Enlaces Music Store:', buyLinks ? buyLinks.length : 0);
    if (buyLinks) console.log('Ejemplos:', buyLinks.slice(0,3));
    
    // Buscar botones con clase shop-btn
    const shopBtns = data.match(/class="shop-btn[^"]*"/g);
    console.log('Botones shop-btn:', shopBtns ? shopBtns.length : 0);
  });
}).on('error', (e) => console.error('Error:', e.message));