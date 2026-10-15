// 1) bytes reales de la imagen del 360
// 2) og:image de las paginas de Gear4Music (espejo .de/en, que no da 403)
const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

function curl(args) {
  return execFileSync('curl.exe', ['-s', '-L', '--max-time', '40', '-A', UA].concat(args), { windowsHide: true, maxBuffer: 1 << 26 }).toString();
}

console.log('=== 360 · cabecera real ===');
try {
  const h = curl(['-I', 'https://static.flymusic.ro/img/p/1/0/0/8/2/4/100824-superlarge_default.jpg']);
  console.log(h.split(/\r?\n/).filter(l => /HTTP|content-type|content-length/i.test(l)).join('\n'));
} catch (e) { console.log('  error: ' + e.message); }

console.log('\n=== og:image en Gear4Music (espejo .de) ===');
const paginas = [
  ['Shure MV6', 'https://www.gear4music.de/en/PA-DJ-and-Lighting/Shure-MV6-USB-Gaming-Microphone/6OHD'],
  ['Keeley Caverns V2', 'https://www.gear4music.de/en/Guitar-Pedals/Keeley-Caverns-Delay-Reverb-V2/']
];
paginas.forEach(([nom, url]) => {
  console.log('\n--- ' + nom + ' ---');
  try {
    const html = curl(['-o', '-', '-w', '\n__CODE__%{http_code}', url]);
    const code = (html.match(/__CODE__(\d+)/) || [])[1];
    const og = [...html.matchAll(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/g)].map(m => m[1]);
    const og2 = [...html.matchAll(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/g)].map(m => m[1]);
    console.log('  http: ' + code + '   (' + html.length + ' bytes)');
    const todos = [...new Set(og.concat(og2))];
    console.log('  og:image: ' + (todos.length ? todos.join('\n            ') : '(ninguna)'));
  } catch (e) { console.log('  error: ' + e.message); }
});
