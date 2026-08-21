const fs = require('fs');
const https = require('https');

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': '*/*' }, timeout: 40000 }, res => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && redirects < 4) {
        res.resume();
        return resolve(get(new URL(res.headers.location, url).toString(), redirects + 1));
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

const TARGETS = {
  339: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Sennheiser-MKH-416-Shotgun-Microphone-Bundle/2ZHB',
  340: null, 341: null, 342: null, 345: null, 346: null,
  267: null,
  349: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Sennheiser-EW-IEM-G4-Wireless-In-Ear-Monitor-System-GB-Band/2B9S',
  266: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Sennheiser-EW-IEM-G4-Wireless-Twin-In-Ear-Monitor-System-E-Band/2BBW',
  347: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Xvive-U4-Wireless-In-Ear-Monitor-System/4P0B',
  348: 'https://www.gear4music.com/PA-DJ-and-Lighting/Xvive-U4R4-Wireless-In-Ear-Monitor-System-with-4-Receivers/4P0I',
  351: 'https://www.gear4music.com/PA-DJ-and-Lighting/LD-Systems-U508-IEM-In-Ear-Monitoring-System/2Y37',
  350: null,
  352: 'https://www.gear4music.com/us/en/Guitar-and-Bass/Gretsch-G9500-Jim-Dandy-Flat-Top-Acoustic-2-Color-Sunburst/PWS',
  353: 'https://www.gear4music.com/us/en/Guitar-and-Bass/Yamaha-CSF1M-Travel-Guitar-Vintage-Natural/2BNV',
  354: 'https://www.gear4music.com/us/en/Guitar-and-Bass/PRS-SE-P20E-Parlour-Electro-Acoustic-Fire-Red-Burst-2026/7N4Y',
  355: 'https://www.gear4music.com/Guitar-and-Bass/Epiphone-L-00-Studio-Electro-Acoustic-Vintage-Sunburst/UFL',
  356: 'https://www.gear4music.com/Guitar-and-Bass/Fender-CP-60S-Parlor-Acoustic-Guitar-Natural/2KPW',
  357: 'https://www.gear4music.com/us/en/Guitar-and-Bass/Gretsch-G5021E-Rancher-Penguin-Parlor-Electro-Acoustic-Black/4N6S'
};

(async () => {
  const products = require('./data/products.json');
  let out = fs.existsSync('_tmp_images.json') ? JSON.parse(fs.readFileSync('_tmp_images.json', 'utf8')) : {};
  for (const [id] of Object.entries(TARGETS)) {
    const pid = Number(id);
    if (out[pid] && out[pid].img) { console.log(pid + ' ya listo'); continue; }
    const p = products.find(x => x.id === pid);
    let url = TARGETS[pid] || (p && p.stores && p.stores.gear4music) || null;
    if (!url) { console.log(pid + ' sin URL G4M'); continue; }
    process.stdout.write(pid + ' ' + (p ? p.title.slice(0, 35) : '') + ' ... ');
    try {
      const r = await get('https://r.jina.ai/' + url);
      const m = r.body.match(/r2\.gear4music\.com\/media\/\d+\/\d+\/1200\/preview\.jpg/);
      if (m) {
        const img = 'https://' + m[0];
        let cdn = 'skip';
        try { const c = await get(img); cdn = c.status; } catch (e) { cdn = 'ERR'; }
        out[pid] = { img, cdn };
        console.log('OK ' + m[0].split('/media/')[1] + ' [cdn ' + cdn + ']');
      } else { out[pid] = { img: null }; console.log('SIN IMAGEN (' + r.status + ')'); }
    } catch (e) { console.log('ERROR ' + e.message); }
    fs.writeFileSync('_tmp_images.json', JSON.stringify(out, null, 1));
    await new Promise(r => setTimeout(r, 1200));
  }
  console.log('\nListo.');
})();
