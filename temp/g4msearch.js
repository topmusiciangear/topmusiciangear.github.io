const https = require('https');
const q = process.argv[2];
const url = 'https://r.jina.ai/https://www.gear4music.com/search?SearchText=' + encodeURIComponent(q);
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const m = d.match(/https:\/\/www\.gear4music\.com\/[A-Za-z0-9\-\/]+\/[A-Z0-9]{4}/g) || [];
    const uniq = [...new Set(m)];
    console.log('status', r.statusCode, 'hits', uniq.length);
    uniq.slice(0, 25).forEach(u => console.log(' ', u));
  });
}).on('error', e => console.log('ERR', e.message));
