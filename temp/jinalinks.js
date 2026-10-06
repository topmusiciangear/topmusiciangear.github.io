const https = require('https');
const target = process.argv[2];
const filter = process.argv[3] || '';
const url = 'https://r.jina.ai/' + target;
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const m = d.match(/https:\/\/www\.gear4music\.com\/(?:[a-z]{2}\/en\/)?[A-Za-z0-9\-]+\/[A-Za-z0-9\-]+\/[A-Z0-9]{4}/g) || [];
    let uniq = [...new Set(m)];
    if (filter) uniq = uniq.filter(u => u.toLowerCase().includes(filter.toLowerCase()));
    console.log('status', r.statusCode, 'len', d.length, 'hits', uniq.length);
    uniq.slice(0, 40).forEach(u => console.log(' ', u));
  });
}).on('error', e => console.log('ERR', e.message));
