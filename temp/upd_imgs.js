const fs = require('fs');
// verify second URL + apply both photos
Promise.all([
  fetch('https://r2.gear4music.com/media/115/1157962/1200/preview.jpg', { method: 'HEAD', signal: AbortSignal.timeout(30000) }).then(r => ({ id: 568, status: r.status, ct: r.headers.get('content-type') })).catch(e => ({ id: 568, err: e.message }))
]).then(res => {
  console.log(JSON.stringify(res));
  if (res[0].status !== 200) throw new Error('KDP120 img not 200');
  const pFile = 'data/products.json';
  const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
  const p565 = P.find(x => x.id === 565);
  const p568 = P.find(x => x.id === 568);
  p565.img = 'https://r2.gear4music.com/media/84/845942/1200/preview.jpg';
  p568.img = 'https://r2.gear4music.com/media/115/1157962/1200/preview.jpg';
  fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
  console.log('photos updated: 565 + 568');
});
