const https = require('https');
https.get('https://api.github.com/repos/topmusiciangear/topmusiciangear.github.io/pages/builds', {headers:{'User-Agent':'node'}}, (res) => {
  let d = ''; res.on('data', c => d += c); res.on('end', () => {
    try {
      const b = JSON.parse(d);
      if (Array.isArray(b) && b.length > 0) {
        b.slice(0, 5).forEach(x => console.log(x.commit.slice(0,8), x.status, x.updated_at));
      } else {
        console.log('Response:', d.slice(0, 300));
      }
    } catch(e) { console.log('Parse error:', e.message); }
  });
});