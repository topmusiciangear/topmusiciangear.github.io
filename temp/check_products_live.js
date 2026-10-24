const https = require('https');

https.get('https://topmusiciangear.com/guides/best-monitors.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const ldMatches = data.match(/"position": \d+, "item": \{/g);
    console.log('JSON-LD positions:', ldMatches ? ldMatches.length : 0);
    
    const products = ['JBL 305P', 'Kali Audio LP-6', 'KRK Rokit 7', 'Yamaha HS8', 'Adam Audio A7V', 'Genelec 8010A', 'Neumann KH 80', 'Genelec 8351B', 'Kali IN-UNF', 'Kali LP-UNF', 'Focal Shape 65'];
    products.forEach(name => {
      const regex = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const count = (data.match(regex) || []).length;
      console.log(name + ': ' + count + ' ocurrencias');
    });
  });
}).on('error', (e) => console.error('Error:', e.message));