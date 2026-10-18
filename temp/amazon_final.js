const H = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9'
};
const pausa = ms => new Promise(r => setTimeout(r, ms));

function precioDe(html) {
  const m1 = html.match(/<span class="a-offscreen">\s*\$\s?([\d,]+\.?\d{0,2})\s*<\/span>/);
  if (m1) return m1[1];
  const m2 = html.match(/a-price-whole">\s*([\d,]+)\s*<\/span>\s*<span class="a-price-decimal">\.(\d{2})/);
  if (m2) return m2[1] + '.' + m2[2];
  return null;
}

const lista = [
  ['B0DGXTBQTY', 'Edifier MR3 (negro)'],
  ['B00GP56OYA', 'PreSonus Eris E4.5 (par)'],
  ['B0DGXRC7MP', 'Edifier MR3 (blanco)']
];

(async () => {
  const ip = await (await fetch('https://ipinfo.io/json', { headers: { 'User-Agent': 'Mozilla/5.0' } })).json();
  console.log('IP: ' + ip.ip + ' (' + ip.country + ')\n');
  for (const [asin, nombre] of lista) {
    const r = await fetch('https://www.amazon.com/dp/' + asin, { headers: H });
    const html = await r.text();
    const titulo = ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '').replace(/\s+/g, ' ').replace(/^Amazon\.com:\s*/, '').trim();
    const p = precioDe(html);
    console.log(nombre.padEnd(26) + ('$' + (p || '??')).padEnd(10) + 'bytes=' + String(html.length).padEnd(9));
    console.log('    ' + titulo.slice(0, 100));
    await pausa(5000);
  }
})();
