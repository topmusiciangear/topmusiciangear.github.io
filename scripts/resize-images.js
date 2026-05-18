const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = 'C:\\pinokio\\api\\ace-step-ui.pinokio.git';
const GUIDES_FILE = path.join(ROOT, 'js', 'guides.js');
const IMG_DIR = path.join(ROOT, 'img');

async function main() {
  const content = fs.readFileSync(GUIDES_FILE, 'utf-8');
  const imageRegex = /"image":\s*"img\/([^"]+)"/g;
  const matchedFiles = new Set();
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    matchedFiles.add(match[1]);
  }

  const files = [...matchedFiles].sort();
  const results = [];

  for (const file of files) {
    const filePath = path.join(IMG_DIR, file);
    if (!fs.existsSync(filePath)) {
      results.push({ file, oldSize: '-', newSize: '-', status: 'SKIPPED (not found)' });
      continue;
    }
    const oldStat = fs.statSync(filePath);
    const oldSize = oldStat.size;
    const inputBuffer = fs.readFileSync(filePath);
    const img = sharp(inputBuffer);
    const metadata = await img.metadata();
    if (metadata.width <= 800 && metadata.height <= 800) {
      results.push({ file, oldSize, newSize: oldSize, status: 'SKIPPED (already <= 800px)' });
      continue;
    }
    const outputBuffer = await img.resize(800).toBuffer();
    fs.writeFileSync(filePath, outputBuffer);
    const newStat = fs.statSync(filePath);
    const newSize = newStat.size;
    const saved = (((oldSize - newSize) / oldSize) * 100).toFixed(1);
    results.push({ file, oldSize, newSize, status: `RESIZED (saved ${saved}%)` });
  }

  console.log('=== Results ===');
  for (const r of results) {
    const oldStr = typeof r.oldSize === 'number' ? (r.oldSize / 1024).toFixed(1) + ' KB' : r.oldSize;
    const newStr = typeof r.newSize === 'number' ? (r.newSize / 1024).toFixed(1) + ' KB' : r.newSize;
    console.log(`${r.status.padEnd(30)} ${r.file.padEnd(35)} ${oldStr} → ${newStr}`);
  }
}

main().catch(console.error);
