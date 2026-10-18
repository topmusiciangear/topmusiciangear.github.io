const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const url = 'https://www.pluginboutique.com/product/3-Studio-Tools/93-Music-Theory-Tools/11756-reMIDI-4';
const H = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36', 'Accept-Language': 'en-GB,en;q=0.9' };
(async () => {
  const ip = await (await fetch('https://ipinfo.io/json', { headers: { 'User-Agent': 'Mozilla/5.0' } })).json();
  console.log('IP: ' + ip.ip + ' | ' + ip.country + ' | ' + ip.city);
  const html = await (await fetch(url, { headers: H, redirect: 'follow' })).text();
  const b = html.match(/otpPrice[\s\S]{0,900}?<\/div>/);
  if (!b) return console.log('sin bloque de precio');
  const s = b[0].replace(/<span[^>]*line-through[\s\S]*?<\/span>/g, '');
  const m = s.match(/>\s*([\u20AC$£])\s?([\d.,]+)\s*</);
  console.log('reMIDI 4 -> ' + (m ? m[1] + m[2] : '?'));
  if (m && m[1] === '\u00A3') {
    const f = JSON.parse(fs.readFileSync(B + 'temp/pb_precios_GB.json', 'utf8'));
    f.productos = f.productos.filter(x => x.id !== 1008);
    f.productos.push({ id: 1008, title: 'SongWish reMIDI 4', precio: { simbolo: '\u00A3', valor: parseFloat(m[2].replace(/,/g, '')) } });
    fs.writeFileSync(B + 'temp/pb_precios_GB.json', JSON.stringify(f, null, 2), 'utf8');
    console.log('anadido a pb_precios_GB.json');
  }
})();