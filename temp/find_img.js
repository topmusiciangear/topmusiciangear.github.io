// Extrae URLs de imagen de una pagina de producto. Uso: node temp/find_img.js <url> [<url> ...]
const https = require('https');
const http = require('http');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

function get(url, depth = 0) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': UA, 'Accept': 'text/html,*/*', 'Accept-Language': 'en-US,en;q=0.9' } }, r => {
      if ([301, 302, 303, 307, 308].includes(r.statusCode) && r.headers.location && depth < 3) {
        r.resume();
        return resolve(get(new URL(r.headers.location, url).href, depth + 1));
      }
      let d = '';
      r.setEncoding('utf8');
      r.on('data', c => d += c);
      r.on('end', () => resolve({ status: r.statusCode, body: d }));
    });
    req.on('error', e => resolve({ status: 0, body: '', error: e.message }));
    req.setTimeout(25000, () => { req.destroy(); resolve({ status: 0, body: '', error: 'timeout' }); });
  });
}

function candidates(html) {
  const out = [];
  const push = (u) => {
    if (!u) return;
    u = u.replace(/\\\//g, '/').replace(/&amp;/g, '&');
    if (!/^https?:/.test(u)) return;
    if (!/\.(jpe?g|png|webp)(\?|$)/i.test(u)) return;
    if (/sprite|logo|icon|flag|badge|pixel|1x1/i.test(u)) return;
    if (!out.includes(u)) out.push(u);
  };
  let m;
  const og = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i.exec(html);
  if (og) push(og[1]);
  const og2 = /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i.exec(html);
  if (og2) push(og2[1]);
  const re = /"(?:hiRes|large|mainUrl|zoomImageUrl|imageUrl|src)"\s*:\s*"(https?:[^"]+?)"/g;
  while ((m = re.exec(html)) && out.length < 40) push(m[1]);
  const re2 = /https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9%+._-]+\.(?:jpg|png)/g;
  while ((m = re2.exec(html)) && out.length < 40) push(m[0]);
  return out.slice(0, 12);
}

(async () => {
  for (const url of process.argv.slice(2)) {
    const r = await get(url);
    console.log('=== ' + url);
    console.log('status ' + r.status + (r.error ? ' ' + r.error : '') + ' len ' + r.body.length);
    candidates(r.body).forEach(u => console.log('  ' + u));
  }
})();
