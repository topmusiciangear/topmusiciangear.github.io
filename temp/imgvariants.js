const https = require('https');
function head(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      res.resume();
      resolve({ url, status: res.statusCode });
    });
    req.on('error', (e) => resolve({ url, status: 'ERR', err: e.message }));
    req.setTimeout(12000, () => { req.destroy(); resolve({ url, status: 'TIMEOUT' }); });
  });
}
(async () => {
  const refs = [76055, 341169];
  for (const ref of refs) {
    const mainDir = String(ref).slice(0, -4) || ref;
    const s = String(ref);
    const variants = [
      `media/${s}/1200/preview.jpg`,
      `media/${s}/650/preview.jpg`,
      `media/${s}/650/web.jpg`,
      `media/${s}/320/preview.jpg`,
      `media/${s}/1200/web.jpg`,
      `media/${mainDir}/${s}/650/web.jpg`,
      `media/${mainDir}/${s}/650/preview.jpg`,
      `media/${mainDir}/${s}/1200/web.jpg`,
      `media/${mainDir}/${s}/800/preview.jpg`,
      `media/${mainDir}/${s}/1000/preview.jpg`,
      `media/${mainDir}/${s}/2000/preview.jpg`,
      `media/${mainDir}/${s}/main.jpg`,
      `media/${mainDir}/${s}/preview.jpg`,
      `media/${s}/preview.jpg`,
      `media/${s}/main/main.jpg`,
      `media/${mainDir}/4/${s}/1200/preview.jpg`,
      `media/${mainDir}/3/${s}/1200/preview.jpg`,
      `media/${s}/4/1200/preview.jpg`,
    ];
    for (const v of variants) {
      const r = await head('https://r2.gear4music.com/' + v);
      if (r.status !== 404 && r.status !== 'ERR' && r.status !== 'TIMEOUT') console.log(ref, r.status, v);
      console.log(ref, r.status, v);
    }
  }
})();