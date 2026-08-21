const fs = require('fs');
const https = require('https');

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': '*/*' }, timeout: 45000 }, res => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && redirects < 4) {
        res.resume();
        const next = new URL(res.headers.location, url).toString();
        return resolve(get(next, redirects + 1));
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function head(url) {
  try {
    const r = await get(url);
    return r.status;
  } catch (e) { return 'ERR ' + e.message; }
}

(async () => {
  const products = require('./data/products.json');
  const targets = [];
  // existentes con link G4M (shotguns + PSM300)
  products.forEach(p => {
    if (p.stores && p.stores.gear4music) targets.push({ id: p.id, name: p.title, url: p.stores.gear4music });
  });
  // nuevos links encontrados por el metodo Google
  const nuevos = {
    349: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Sennheiser-EW-IEM-G4-Wireless-In-Ear-Monitor-System-GB-Band/2B9S',
    266: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Sennheiser-EW-IEM-G4-Wireless-Twin-In-Ear-Monitor-System-E-Band/2BBW',
    347: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Xvive-U4-Wireless-In-Ear-Monitor-System/4P0B',
    348: 'https://www.gear4music.com/PA-DJ-and-Lighting/Xvive-U4R4-Wireless-In-Ear-Monitor-System-with-4-Receivers/4P0I',
    351: 'https://www.gear4music.com/PA-DJ-and-Lighting/LD-Systems-U508-IEM-In-Ear-Monitoring-System/2Y37',
    352: 'https://www.gear4music.com/us/en/Guitar-and-Bass/Gretsch-G9500-Jim-Dandy-Flat-Top-Acoustic-2-Color-Sunburst/PWS',
    353: 'https://www.gear4music.com/us/en/Guitar-and-Bass/Yamaha-CSF1M-Travel-Guitar-Vintage-Natural/2BNV',
    354: 'https://www.gear4music.com/us/en/Guitar-and-Bass/PRS-SE-P20E-Parlour-Electro-Acoustic-Fire-Red-Burst-2026/7N4Y',
    355: 'https://www.gear4music.com/Guitar-and-Bass/Epiphone-L-00-Studio-Electro-Acoustic-Vintage-Sunburst/UFL',
    356: 'https://www.gear4music.com/Guitar-and-Bass/Fender-CP-60S-Parlor-Acoustic-Guitar-Natural/2KPW',
    357: 'https://www.gear4music.com/us/en/Guitar-and-Bass/Gretsch-G5021E-Rancher-Penguin-Parlor-Electro-Acoustic-Black/4N6S'
  };
  Object.entries(nuevos).forEach(([id, url]) => {
    if (!targets.find(t => t.id === Number(id))) {
      const p = products.find(x => x.id === Number(id));
      targets.push({ id: Number(id), name: p ? p.title : id, url });
    }
  });

  const out = {};
  for (const t of targets) {
    process.stdout.write(t.id + ' ' + t.name.slice(0, 40) + ' ... ');
    try {
      const r = await get('https://r.jina.ai/' + t.url);
      const re = /r2\.gear4music\.com\/media\/\d+\/\d+\/1200\/preview\.jpg/g;
      const m = r.body.match(re);
      if (m && m.length) {
        const img = 'https://' + m[0];
        const st = await head(img);
        out[t.id] = { img, cdn: st };
        console.log('OK ' + m[0].split('/media/')[1] + ' [cdn ' + st + ']');
      } else {
        out[t.id] = { img: null };
        console.log('SIN IMAGEN (status ' + r.status + ', len ' + r.body.length + ')');
      }
    } catch (e) {
      out[t.id] = { img: null, err: e.message };
      console.log('ERROR ' + e.message);
    }
    await new Promise(r => setTimeout(r, 1500));
  }
  fs.writeFileSync('_tmp_images.json', JSON.stringify(out, null, 1));
  console.log('\nGuardado en _tmp_images.json');
})();
