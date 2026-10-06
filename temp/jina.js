const https = require('https');
const target = process.argv[2];
const url = 'https://r.jina.ai/' + target;
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const m = d.match(/r2\.gear4music\.com\/media\/[^ )"'\\]+/g);
    console.log('status', r.statusCode, 'len', d.length);
    console.log('imgs', m ? JSON.stringify([...new Set(m)].slice(0, 8)) : 'none');
  });
}).on('error', e => console.log('ERR', e.message));
