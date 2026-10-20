const https = require('https');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const urls = [
  'https://thumbs.static-thomann.de/thumb/padthumb1200x1200/pics/prod/111216.jpg',
  'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/prod/111216.jpg',
  'https://thumbs.static-thomann.de/thumb/orig/pics/prod/111216.jpg',
  'https://www.thomann.de/thumb/opengraph/pics/prod/111216.jpg',
];
let i = 0;
const next = () => {
  if (i >= urls.length) return;
  const u = urls[i++];
  https.get(u, { headers: { 'User-Agent': UA } }, r => {
    const chunks = [];
    r.on('data', c => chunks.push(c));
    r.on('end', () => {
      const b = Buffer.concat(chunks);
      let dim = '';
      if (b.length > 100) {
        // leer dimensiones JPEG
        for (let p = 2; p < b.length - 9;) {
          if (b[p] !== 0xFF) { p++; continue; }
          const mk = b[p + 1];
          const len = b.readUInt16BE(p + 2);
          if (mk >= 0xC0 && mk <= 0xCF && mk !== 0xC4 && mk !== 0xC8 && mk !== 0xCC) {
            dim = b.readUInt16BE(p + 7) + 'x' + b.readUInt16BE(p + 5);
            break;
          }
          p += 2 + len;
        }
      }
      console.log(r.statusCode, (b.length / 1024).toFixed(0) + 'KB', dim, u);
      next();
    });
  }).on('error', e => { console.log('ERR', e.message, u); next(); });
};
next();
