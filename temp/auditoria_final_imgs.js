// Re-auditar TODAS las imagenes del catalogo (576), no solo las no-G4M
const { execFileSync, execFile } = require('child_process');
const fs = require('fs');
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const conImg = p.filter(x => x.img);

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const CONC = 10;

function probar(x) {
  return new Promise(res => {
    execFile('curl.exe', ['-s', '-L', '-o', 'NUL', '--max-time', '30',
      '-w', '%{http_code}|%{content_type}|%{size_download}', '-A', UA, x.img],
      { windowsHide: true, maxBuffer: 1 << 20 },
      (e, out) => {
        const [c, t, s] = (out || '|||').split('|');
        res({ id: x.id, t: x.title, dom: (() => { try { return new URL(x.img).hostname; } catch (er) { return '?'; } })(),
               code: c || 'ERR', ct: t || '?', bytes: Number(s || 0), ok: /^2/.test(c || '') && /^image\//i.test(t || '') });
      });
  });
}

(async () => {
  const res = [];
  for (let i = 0; i < conImg.length; i += CONC) {
    res.push(...await Promise.all(conImg.slice(i, i + CONC).map(probar)));
    process.stdout.write('\r  ' + Math.min(i + CONC, conImg.length) + '/' + conImg.length + '   ');
  }
  console.log('\n');

  const rotas = res.filter(x => !x.ok);
  console.log('=== AUDITORIA COMPLETA DE IMAGENES ===');
  console.log('  productos con imagen : ' + conImg.length);
  console.log('  correctas            : ' + (res.length - rotas.length));
  console.log('  rotas                : ' + rotas.length);

  if (rotas.length) {
    console.log('\n=== ROTAS ===');
    rotas.forEach(x => console.log('  ' + String(x.id).padStart(4) + '  ' + (x.code + ' ' + x.ct).padEnd(30) + x.dom + '  |  ' + x.t));
  } else {
    console.log('\n  Ninguna. Las 576 imagenes cargan.');
  }

  // resumen por dominio
  const dom = {};
  res.forEach(x => { (dom[x.dom] = dom[x.dom] || { ok: 0, mal: 0 })[x.ok ? 'ok' : 'mal']++; });
  console.log('\n=== por dominio (ok/rotas) ===');
  Object.entries(dom).sort((a, b) => (b[1].mal - a[1].mal) || (b[1].ok + b[1].mal - a[1].ok - a[1].mal))
    .forEach(([d, v]) => console.log('  ' + (v.mal ? 'ROTO ' : '     ') + d.padEnd(34) + v.ok + '/' + (v.ok + v.mal)));
})();
