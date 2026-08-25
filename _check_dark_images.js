const fs = require('fs');
const https = require('https');
const http = require('http');

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

// Check dominant color at corners of image
function isDarkBackground(buf) {
  // Find JPEG/PNG data and check pixel samples
  // For simplicity, check if the image file has very dark bytes in the header area
  // A better approach: check the first few rows for dark pixels
  const hex = buf.toString('hex');
  // Count dark pixels (R,G,B all < 50) vs light pixels in first 10% of data
  let darkCount = 0;
  let lightCount = 0;
  for (let i = 0; i < buf.length; i++) {
    const val = buf[i];
    if (val < 50) darkCount++;
    else if (val > 200) lightCount++;
  }
  // If dark pixels dominate significantly, it's likely a dark image
  return darkCount > lightCount * 3;
}

async function main() {
  const issues = [];
  for (const prod of p) {
    if (!prod.img) continue;
    try {
      const buf = await download(prod.img);
      if (isDarkBackground(buf)) {
        issues.push(`${prod.id} | ${prod.title} | ${prod.img}`);
      }
    } catch (e) {
      // skip failed downloads
    }
  }
  console.log('Products with likely dark/black background:');
  issues.forEach(i => console.log(i));
  console.log(`\nTotal: ${issues.length}`);
}

main();
