const urls = [
  'https://www.gear4music.com/Recording-and-Computers/Arturia-Pigments-7/7VVT',
  'https://www.zzounds.com/item--ARAPIGMENTS',
  'https://www.andertons.co.uk/arturia-pigments-7-esd-xmp/',
  'https://www.musicstore.com/en_OE/EUR/Arturia-Pigments-7/art-PCM0018718-000'
];
Promise.all(urls.map(u =>
  fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } })
    .then(async r => {
      const t = await r.text();
      const m = t.match(/<title>([^<]{0,100})/);
      console.log(r.status + ' ' + u.slice(8, 30) + ' | ' + (m ? m[1].trim().slice(0, 70) : 'sin titulo'));
    })
    .catch(e => console.log('ERROR ' + u.slice(8, 30) + ': ' + e.message))
)).then(() => console.log('listo'));
