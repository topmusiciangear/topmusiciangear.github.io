const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const h = execFileSync('curl.exe', ['-s', '-L', '--max-time', '50', '-A', UA,
  '-H', 'Accept-Language: en-GB,en;q=0.9', '--compressed',
  'https://www.amazon.com/dp/B0C88X4VB4'], { windowsHide: true, maxBuffer: 1 << 27 }).toString();

const titulo = ((h.match(/<span[^>]+id="productTitle"[^>]*>([\s\S]*?)<\/span>/) || [])[1] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
console.log('titulo Amazon : ' + titulo);

// precio principal
const pp = (h.match(/<span[^>]+class="a-price[^"]*"[^>]*>[\s\S]{0,400}?<span[^>]+class="a-offscreen">([^<]+)<\/span>/) || [])[1];
console.log('precio caja   : ' + (pp || '(no encontrado)'));

const i = h.indexOf('a-price-whole');
console.log('\ncontexto del precio:');
console.log('  ' + h.slice(Math.max(0, i - 260), i + 220).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

const disp = (h.match(/id="availability"[^>]*>([\s\S]{0,200}?)</) || [])[1] || '';
console.log('\ndisponibilidad: ' + disp.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());

const marca = (h.match(/"brand"\s*:\s*"([^"]+)"/) || [])[1];
console.log('marca en JSON-LD: ' + (marca || 'n/d'));
