const https = require('https');
const urls = [
  'https://r2.gear4music.com/media/127/1274870/1200/preview.jpg',
  'https://r2.gear4music.com/media/109/1096267/1200/preview.jpg',
  'https://r2.gear4music.com/media/98/986319/1200/preview_1.jpg'
];
urls.forEach(u => {
  https.get(u, res => {
    const chunks = [];
    res.on('data', c => { chunks.push(c); if (Buffer.concat(chunks).length > 16) res.destroy(); });
    res.on('end', () => {
      const b = Buffer.concat(chunks).slice(0, 12);
      const hex = [...b].map(x => x.toString(16).padStart(2, '0')).join(' ');
      console.log(u.split('/').pop(), '->', hex, '| jpeg:', b[0] === 0xff && b[1] === 0xd8, '| png:', b.slice(1, 4).toString() === 'PNG');
    });
    res.on('error', () => {});
  }).on('error', e => console.log(u, 'ERR', e.message));
});
