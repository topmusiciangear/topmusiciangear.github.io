// Comprobar las 104 imagenes que NO son del CDN de Gear4Music
// Marcamos como rotas las que no devuelven 2xx + image/*
const { execFile } = require('child_process');
const fs = require('fs');
const lista = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/otros_imgs.json', 'utf8'));

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const CONC = 8;

function probar(x) {
  return new Promise(res => {
    execFile('curl.exe', ['-s', '-L', '-o', 'NUL', '--max-time', '25',
      '-w', '%{http_code}|%{content_type}|%{size_download}',
      '-A', UA, x.img],
      { windowsHide: true, maxBuffer: 1 << 20 },
      (e, out) => {
        const [code, type, size] = (out || '|||').split('|');
        const esImg = /^image\//i.test(type || '');
        res({ ...x, code: code || 'ERR', type: type || '?', size: Number(size || 0), ok: code.startsWith('2') && esImg });
      });
  });
}

(async () => {
  const res = [];
  for (let i = 0; i < lista.length; i += CONC) {
    res.push(...await Promise.all(lista.slice(i, i + CONC).map(probar)));
    process.stdout.write('\r  probadas ' + Math.min(i + CONC, lista.length) + '/' + lista.length + '   ');
  }
  console.log('\n');

  const rotas = res.filter(x => !x.ok);
  const bien = res.length - rotas.length;

  console.log('=== RESULTADO ===');
  console.log('  correctas: ' + bien + '/' + res.length);
  console.log('  rotas    : ' + rotas.length + '/' + res.length);

  console.log('\n=== ROTAS (revisar) ===');
  rotas.forEach(x => {
    let d = ''; try { d = new URL(x.img).hostname; } catch (e) {}
    console.log('  ' + String(x.id).padStart(4) + '  ' + (x.code + ' ' + (x.type || '')).padEnd(28) + d);
    console.log('       ' + x.t);
  });

  fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/imgs_rotas.json',
    JSON.stringify(rotas, null, 1));
  console.log('\n  guardadas en temp/imgs_rotas.json');
})();
