const https = require('https');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const urls = [
  'https://images.musicstore.de/images/1600/sennheiser-mkh-50-p48_1_REC0014199-000.jpg',
  'https://images.musicstore.de/images/1600/sennheiser-mkh-50-p48_2_REC0014199-000.jpg',
  'https://images.musicstore.de/images/1600/sennheiser-mkh-50-p48-studio-kondensatormikrofon_1_REC0014199-000.jpg',
  'https://images.musicstore.de/images/640/sennheiser-mkh-50-p48_1_REC0014199-000.jpg',
  'https://images.musicstore.de/images/1600/audio-technica-at875r_1_REC0000000-000.jpg',
];
let i = 0;
const next = () => {
  if (i >= urls.length) return;
  const u = urls[i++];
  https.get(u, { headers: { 'User-Agent': UA } }, r => {
    console.log(r.statusCode, r.headers['content-type'], u.split('/').pop());
    r.resume();
    r.on('end', next);
  }).on('error', e => { console.log('ERR', e.message, u); next(); });
};
next();
