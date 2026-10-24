const https = require('https');
const url = 'https://topmusiciangear.com/guides/best-monitors.html';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    
    const products = ['JBL 305P', 'Kali Audio LP-6', 'KRK Rokit 7', 'Yamaha HS8', 'Adam Audio A7V', 'Genelec 8010A', 'Neumann KH 80', 'Genelec 8351B', 'Kali IN-UNF', 'Kali LP-UNF', 'Focal Shape 65'];
    
    products.forEach(name => {
      const regex = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const count = (data.match(regex) || []).length;
      if (count > 0) console.log(name + ': ' + count + ' ocurrencias');
    });
    
    const ldMatches = data.match(/"position": \d+, "item": \{/g);
    console.log('\nJSON-LD positions:', ldMatches ? ldMatches.length : 0);
    
    const imgMatches = data.match(/img\/products\/[^"]+\.webp/g);
    console.log('\nImagenes:', imgMatches ? imgMatches.length : 0);
    if (imgMatches) imgMatches.forEach((img, i) => console.log('  ' + i + ': ' + img));
  });
}).on('error', (e) => console.error('Error:', e.message));