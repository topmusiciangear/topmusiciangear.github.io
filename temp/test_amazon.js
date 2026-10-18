const H = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Upgrade-Insecure-Requests': '1'
};

const ip = await (await fetch('https://ipinfo.io/json', { headers: { 'User-Agent': 'Mozilla/5.0' } })).json();
console.log('IP: ' + ip.ip + ' | ' + ip.country + ' | ' + ip.city);

const pruebas = [
  ['ASIN B0DFZW2S9G (Mackie CR4.5)', 'https://www.amazon.com/dp/B0DFZW2S9G'],
  ['ASIN B016P9HJIA (Edifier R1280T)', 'https://www.amazon.com/dp/B016P9HJIA'],
  ['Busqueda exacta', 'https://www.amazon.com/s?k=PreSonus+Eris+3.5+2nd+Gen']
];

for (const [etiqueta, url] of pruebas) {
  try {
    const r = await fetch(url, { headers: H, redirect: 'follow' });
    const html = await r.text();
    const bloque = html.match(/a-offscreen[^>]*>([\s\S]{0,60}?)<\/span>/) || html.match(/"priceAmount"\s*:\s*([\d.]+)/) || html.match(/class="a-price"[\s\S]{0,200}?([\d,]+\.\d\d)/);
    const titulo = (html.match(/<title>([^<]{0,90})/) || [])[1] || '';
    const hayCaptcha = /api-services-support@amazon|Enter the characters you see below|Robot Check/i.test(html);
    console.log('--- ' + etiqueta);
    console.log('    status=' + r.status + ' | captcha=' + hayCaptcha + ' | bytes=' + html.length);
    console.log('    titulo: ' + titulo.replace(/\s+/g, ' ').trim().slice(0, 80));
    console.log('    precio: ' + (bloque ? bloque[1].trim().replace(/\s+/g, '') : 'NO ENCONTRADO'));
  } catch (e) {
    console.log('--- ' + etiqueta + ' ERROR ' + e.message);
  }
}
