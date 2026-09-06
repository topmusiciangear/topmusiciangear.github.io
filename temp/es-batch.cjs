const fs = require('fs');
const path = require('path');
const SRC = 'C:/Users/Daniel/AppData/Local/Temp/opencode/es-dump-plain';
const OUT = 'C:/Users/Daniel/AppData/Local/Temp/opencode/es-dump-batches';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const guidesDir = path.join(SRC, 'guides');
const guideFiles = fs.readdirSync(guidesDir).filter(f => f.endsWith('.txt'));
const BPC = 5; // guides per batch
for (let i = 0; i < guideFiles.length; i += BPC) {
  const chunk = guideFiles.slice(i, i + BPC);
  const outName = 'G' + String(Math.floor(i / BPC) + 1).padStart(2, '0') + '.txt';
  const buf = chunk.map(f => {
    return '========== ARCHIVO: ' + f + ' ==========\n' + fs.readFileSync(path.join(guidesDir, f), 'utf8');
  }).join('\n\n');
  fs.writeFileSync(path.join(OUT, outName), buf, 'utf8');
  console.log(outName, 'chars:', buf.length, 'files:', chunk.length);
}

const prod = fs.readFileSync(path.join(SRC, 'products.txt'), 'utf8');
const prodLines = prod.split('\n').filter(Boolean);
const BPP = 125; // product lines per batch (~42 products)
for (let i = 0; i < prodLines.length; i += BPP) {
  const chunk = prodLines.slice(i, i + BPP);
  const outName = 'P' + String(Math.floor(i / BPP) + 1).padStart(2, '0') + '.txt';
  const buf = '========== PRODUCTOS (desc + desc_es, es y en) ==========\n' + chunk.join('\n') + '\n';
  fs.writeFileSync(path.join(OUT, outName), buf, 'utf8');
  console.log(outName, 'chars:', buf.length, 'lines:', chunk.length);
}