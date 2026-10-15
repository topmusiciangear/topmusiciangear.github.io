const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

// el enlace de afiliado de zZounds tal cual sale en la pagina
const aff = 'https://www.anrdoezrs.net/click-101857888-10439229?url=https%3A%2F%2Fwww.zzounds.com%2Fitem--PRSERISSTUDIO5';
const r = execFileSync('curl.exe', ['-s', '-L', '-o', '-', '--max-time', '60', '-A', UA,
  '-w', '\n__FINAL__%{url_effective}\n__CODE__%{http_code}', aff],
  { windowsHide: true, maxBuffer: 1 << 27 }).toString();

const final = (r.match(/__FINAL__(.*)/) || [])[1] || '';
const code = (r.match(/__CODE__(\d+)/) || [])[1] || '';
const titulo = ((r.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/\s+/g, ' ').trim();

console.log('  codigo final : ' + code);
console.log('  url final    : ' + final.slice(0, 110));
console.log('  titulo       : ' + titulo.slice(0, 80));
console.log('  apunta al item correcto: ' + (/item--PRSERISSTUDIO5/.test(final) ? 'SI' : 'NO'));
console.log('  es pagina de error     : ' + (/not found|404/i.test(titulo) ? 'SI' : 'no'));
const p = [...new Set([...r.matchAll(/\$[0-9]{2,4}\.[0-9]{2}/g)].map(m => m[0]))];
console.log('  precio en destino: ' + (p.length ? p.slice(0, 5).join(' | ') : '(n/d)'));
