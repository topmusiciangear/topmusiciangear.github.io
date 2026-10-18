const H = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9'
};
const esperar = ms => new Promise(r => setTimeout(r, ms));

function precioDe(html) {
  const m1 = html.match(/<span class="a-offscreen">\s*\$\s?([\d,]+\.?\d{0,2})\s*<\/span>/);
  if (m1) return m1[1];
  const m2 = html.match(/a-price-whole">\s*([\d,]+)\s*<\/span>\s*<span class="a-price-decimal">\.(\d{2})/);
  if (m2) return m2[1] + '.' + m2[2];
  const m3 = html.match(/"priceAmount"\s*:\s*([\d.]+)/);
  return m3 ? m3[1] : null;
}

const lista = [
  ['B0DFZQGZ37', 'Mackie CR3.5BT'],
  ['B0DFZZ5ZZY', 'Mackie CR3.5 (sin BT)'],
  ['B07ZR2G296', 'JBL 104-BT negro'],
  ['B08KXVYGSF', 'M-Audio BX3'],
  ['B0DFZW2S9G', 'Mackie CR4.5'],
  ['B08KXTJX16', 'M-Audio BX4'],
  ['B016P9HJIA', 'Edifier R1280T']
];

(async () => {
  const ip = await (await fetch('https://ipinfo.io/json', { headers: { 'User-Agent': 'Mozilla/5.0' } })).json();
  console.log('IP: ' + ip.ip + ' (' + ip.country + ')\n');
  const res = [];
  for (const [asin, nombre] of lista) {
    try {
      const r = await fetch('https://www.amazon.com/dp/' + asin, { headers: H });
      const html = await r.text();
      const titulo = ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '').replace(/\s+/g, ' ').replace(/^Amazon\.com:\s*/, '').trim();
      const p = precioDe(html);
      let sinStock = /Currently unavailable/i.test(html);
      const esPar = /\bpair\b|sold as pair|\(2\)|set of 2/i.test(titulo);
      const esUno = /\beach\b|\bsingle\b|\(1\)/i.test(titulo);
      const v = p ? Number(String(p).replace(/,/g, '')) : null;
      const veredicto = v === null ? '??' : (v <= 150 ? 'OK' : 'OVER');
      console.log(nombre.padEnd(24) + ('$' + (p || '--')).padEnd(10) + veredicto.padEnd(6) +
        (sinStock ? 'NO DISPONIBLE  ' : '') + (esPar ? 'PAR' : esUno ? 'CADA UNO' : '?') + '  ' + asin);
      console.log('    ' + titulo.slice(0, 105));
      res.push({ nombre, asin, precio: p, veredicto, par: esPar });
    } catch (e) {
      console.log(nombre.padEnd(24) + ' ERROR ' + e.message);
    }
    await esperar(4000);
  }

  console.log('\n===== LOS QUE PASAN EL FILTRO DE $150 EL PAR =====');
  res.filter(r => r.veredicto === 'OK').forEach(r => console.log('  OK  ' + r.nombre.padEnd(24) + '$' + r.precio + '  ' + r.asin));
  console.log('\n===== LOS QUE NO =====');
  res.filter(r => r.veredicto !== 'OK').forEach(r => console.log('  --  ' + r.nombre.padEnd(24) + '$' + (r.precio || '--') + '  ' + r.asin));
})();
