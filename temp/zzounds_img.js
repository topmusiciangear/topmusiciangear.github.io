// Descarga las fotos de zZounds usando un navegador real (el CDN da 403 a Node).
// Uso: node temp/zzounds_img.js
// Guarda img/products/<md5(URL catalogo)>.webp y actualiza temp/img_map.json
const fs = require('fs');
const crypto = require('crypto');
const { chromium } = require('playwright');

const TARGETS = [
  {
    page: 'https://www.zzounds.com/a--925521/item--AUTAT875R',
    catalog: 'https://cf1.zzounds.com/media/productmedia/fit%2C1200by1200/quality%2C85/at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg',
    match: /at875r/i,
  },
  {
    page: 'https://www.zzounds.com/a--925521/item--SENMKH50P48',
    catalog: 'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/SennheiserFullWidth-033977c33d261eb2ee34a674b455d34d.jpg',
    match: /mkh|SennheiserFullWidth/i,
  },
  {
    page: 'https://www.zzounds.com/item--KEECAVERNSV2',
    catalog: 'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/CavernsFaceNewLogoHiRes-5c215819a8740c25e8c220cdcb52b2b5.jpg',
    match: /caverns/i,
  },
];

(async () => {
  const map = JSON.parse(fs.readFileSync('temp/img_map.json', 'utf8'));
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1400, height: 1000 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  });

  for (const t of TARGETS) {
    const page = await ctx.newPage();
    try {
      await page.goto(t.page, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(2500);
      const dataUrl = await page.evaluate(async (re) => {
        const rx = new RegExp(re, 'i');
        const imgs = [...document.querySelectorAll('img')]
          .map(i => ({ src: i.currentSrc || i.src, w: i.naturalWidth, h: i.naturalHeight }))
          .filter(o => o.src && o.w > 200 && o.h > 200)
          .sort((a, b) => b.w * b.h - a.w * a.h);
        const pick = imgs.find(o => rx.test(o.src)) || imgs[0];
        if (!pick) return null;
        const resp = await fetch(pick.src);
        const buf = await resp.arrayBuffer();
        let bin = '';
        const bytes = new Uint8Array(buf);
        for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
        return { src: pick.src, w: pick.w, h: pick.h, b64: btoa(bin) };
      }, t.match.source);

      if (!dataUrl) { console.log('SIN IMAGEN: ' + t.page); continue; }
      const key = crypto.createHash('md5').update(t.catalog).digest('hex').slice(0, 10);
      const out = 'img/products/' + key + '.webp';
      const tmp = 'temp/zz_' + key + '.bin';
      fs.writeFileSync(tmp, Buffer.from(dataUrl.b64, 'base64'));
      console.log(key, dataUrl.w + 'x' + dataUrl.h, dataUrl.src.slice(0, 90));
      map[t.catalog] = out;
      fs.writeFileSync('temp/img_map.json', JSON.stringify(map, null, 1));
      console.log('  -> ' + tmp + ' (convertir luego)');
    } catch (e) {
      console.log('ERROR ' + t.page + ': ' + e.message);
    } finally {
      await page.close();
    }
  }
  await browser.close();
})();
