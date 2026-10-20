// Genera temp/harness.html con una rejilla de recortes para revisarlos sin la web.
// Uso: node temp/harness.js <salida.html> <archivo1.webp> [archivo2.webp ...]
const fs = require('fs');
const path = require('path');

const [out, ...files] = process.argv.slice(2);
const tiles = files.map(f => {
  const abs = path.resolve(f).replace(/\\/g, '/');
  return `<figure><div class="tile"><img src="file:///${abs}"></div><figcaption>${path.basename(f)}</figcaption></figure>`;
}).join('\n');

fs.writeFileSync(out, `<!doctype html><meta charset="utf-8">
<style>
  body{margin:0;background:#181818;font:12px/1.3 Arial;color:#bbb;display:flex;flex-wrap:wrap;gap:14px;padding:14px}
  figure{margin:0;width:300px}
  .tile{width:300px;height:225px;background:rgba(255,255,255,.28);border-radius:14px;display:flex;align-items:center;justify-content:center;overflow:hidden}
  img{max-width:100%;max-height:100%;object-fit:contain;padding:10px;box-sizing:border-box}
  figcaption{text-align:center;padding-top:4px}
</style>
${tiles}`, 'utf8');
console.log('ok ' + out + ' (' + files.length + ')');
