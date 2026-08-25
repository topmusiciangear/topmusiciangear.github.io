const fs = require('fs');
const https = require('https');
const http = require('http');
const sharp = require('sharp');

const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function download(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function checkBackground(url) {
  const buf = await download(url);
  const img = sharp(buf);
  const meta = await img.metadata();
  const w = meta.width;
  const h = meta.height;

  // Sample a 10px strip along each edge
  const edges = [
    { left: 0, top: 0, width: w, height: 10 },        // top
    { left: 0, top: h - 10, width: w, height: 10 },   // bottom
    { left: 0, top: 0, width: 10, height: h },        // left
    { left: w - 10, top: 0, width: 10, height: h },   // right
  ];

  let totalDark = 0;
  let totalPixels = 0;

  for (const region of edges) {
    const { data } = await img
      .clone()
      .extract(region)
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 3) {
      const r = data[i], g = data[i+1], b = data[i+2];
      const brightness = (r + g + b) / 3;
      totalPixels++;
      if (brightness < 60) totalDark++;
    }
  }

  const darkRatio = totalDark / totalPixels;
  return darkRatio;
}

async function main() {
  const results = [];
  for (const prod of p) {
    if (!prod.img) continue;
    try {
      const ratio = await checkBackground(prod.img);
      if (ratio > 0.5) {
        results.push({ id: prod.id, title: prod.title, ratio: (ratio * 100).toFixed(1) + '%', img: prod.img });
      }
      process.stdout.write(`Checked ${prod.id} ${prod.title} -> ${(ratio*100).toFixed(1)}% dark\r`);
    } catch (e) {
      // skip
    }
  }
  console.log('\n\nProducts with dark/black background (>50% dark edges):');
  results.forEach(r => console.log(`  ${r.id} | ${r.title} | ${r.ratio} dark | ${r.img}`));
  console.log(`\nTotal: ${results.length}`);
}

main();
