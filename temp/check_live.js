const https = require('https');

const url = 'https://topmusiciangear.com/guides/best-monitors.html';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    
    // Buscar productos en el HTML live
    const products = ['JBL 305P', 'Kali Audio LP-6', 'KRK Rokit 7', 'Yamaha HS8', 'Adam Audio A7V', 'Genelec 8010A', 'Neumann KH 80', 'Genelec 8351B', 'Kali IN-UNF', 'Kali LP-UNF', 'Focal Shape 65'];
    
    products.forEach(name => {
      const regex = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const count = (data.match(new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
      if (count > 0) console.log(name + ': ' + count + ' ocurrencias');
    });
    
    // Verificar JSON-LD
    const idx = data.indexOf('Kali Audio LP-6 V2');
    if (idx > 0) {
      console.log('\n=== LIVE KALI LP-6 V2 ===');
      console.log(data.substring(idx - 100, idx + 300));
    }
  });
}).on('error', (e) => {
  console.error('Error:', e.message);
});