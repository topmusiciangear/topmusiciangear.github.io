const https = require('https');
const url = 'https://www.andertons.co.uk/search.php?search_query=KRK+Rokit+7+G5';
https.get(url, {timeout: 15000, headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    // Find product links containing rokit
    const re = /href="(\/[^"]*rokit[^"]*g5[^"]*)"/gi;
    let m;
    while ((m = re.exec(body)) !== null) {
      console.log('LINK:', m[1]);
    }
    // Also find any product cards
    const re2 = /href="(\/[^"]*krk[^"]*)"/gi;
    while ((m = re2.exec(body)) !== null) {
      console.log('KRK:', m[1]);
    }
  });
}).on('error', e => console.error(e.message));
