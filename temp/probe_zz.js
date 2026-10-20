const https = require('https');
const URL0 = 'https://cf1.zzounds.com/media/productmedia/fit%2C1200by1200/quality%2C85/at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg';

const variants = [
  { name: 'referer zzounds + full UA', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36', 'Referer': 'https://www.zzounds.com/', 'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8', 'Accept-Language': 'en-US,en;q=0.9', 'Sec-Fetch-Dest': 'image', 'Sec-Fetch-Mode': 'no-cors', 'Sec-Fetch-Site': 'cross-site' } },
  { name: 'sin referer', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36', 'Accept': 'image/*,*/*;q=0.8' } },
  { name: 'curl UA', headers: { 'User-Agent': 'curl/8.4.0', 'Accept': '*/*' } },
  { name: 'googlebot', headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' } },
];

let i = 0;
const next = () => {
  if (i >= variants.length) return;
  const v = variants[i++];
  https.get(URL0, { headers: v.headers }, r => {
    console.log(r.statusCode, r.headers['content-type'], '|', v.name);
    r.resume();
    r.on('end', next);
  }).on('error', e => { console.log('ERR', e.message, v.name); next(); });
};
next();
