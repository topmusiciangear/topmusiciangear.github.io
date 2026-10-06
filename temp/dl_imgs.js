const https = require('https');
const fs = require('fs');
const list = [
  ['565', 'https://r2.gear4music.com/media/84/845938/1200/preview.jpg'],
  ['566', 'https://r2.gear4music.com/media/105/1052154/1200/preview.jpg'],
  ['567', 'https://r2.gear4music.com/media/139/1392781/1200/preview_1.jpg'],
  ['568', 'https://r2.gear4music.com/media/126/1263603/1200/preview.jpg'],
  ['569', 'https://r2.gear4music.com/media/46/468553/1200/preview_2.jpg'],
  ['570', 'https://r2.gear4music.com/media/108/1089098/1200/preview.jpg'],
  ['571', 'https://r2.gear4music.com/media/70/705149/1200/preview.jpg'],
  ['572', 'https://r2.gear4music.com/media/64/643027/1200/preview.jpg']
];
function dl(id, url) {
  return new Promise(res => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.gear4music.com/' } }, r => {
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => {
        const b = Buffer.concat(chunks);
        fs.writeFileSync('temp/pimg_' + id + '.jpg', b);
        console.log(id, r.statusCode, b.length, 'bytes');
        res();
      });
    }).on('error', e => { console.log(id, 'ERR', e.message); res(); });
  });
}
(async () => { for (const [id, u] of list) await dl(id, u); })();
