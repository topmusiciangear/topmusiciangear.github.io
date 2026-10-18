const H = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Upgrade-Insecure-Requests': '1'
};

// ASINs ya verificados por recherche previa; null = hay que buscarlo
const objetivos = [
  { nombre: 'PreSonus Eris 3.5 2nd Gen', asin: null, busqueda: 'PreSonus Eris 3.5 2nd Gen' },
  { nombre: 'Mackie CR4.5',                asin: 'B0DFZW2S9G', busqueda: null },
  { nombre: 'M-Audio BX4',                asin: 'B08KXTJX16', busqueda: null },
  { nombre: 'Mackie CR3.5BT',             asin: null, busqueda: 'Mackie CR3.5BT' },
  { nombre: 'JBL 104-BT',                 asin: null, busqueda: 'JBL 104-BT Bluetooth monitors' },
  { nombre: 'Behringer Media 40USB',      asin: null, busqueda: 'Behringer Media 40USB' },
  { nombre: 'Edifier R1280T',             asin: 'B016P9HJIA', busqueda: null }
];

const esperar = ms => new Promise(r => setTimeout(r, ms));

function precioDe(html) {
  const patrones = [
    /<span class="a-offscreen">\s*\$\s?([\d,]+\.?\d{0,2})\s*<\/span>/,
    /a-price-whole">\s*([\d,]+)\s*<\/span>\s*<span class="a-price-decimal">\.(\d{2})/,
    /"priceAmount"\s*:\s*([\d.]+)/
  ];
  for (const re of patrones) {
    const m = html.match(re);
    if (m) return m[2] ? m[1] + '.' + m[2] : m[1];
  }
  return null;
}

function tituloDe(html) {
  const m = html.match(/<title>([^<]*)<\/title>/);
  return m ? m[1].replace(/\s+/g, ' ').replace(/^Amazon\.com:\s*/, '').trim() : '';
}

function esPar(html, titulo) {
  const t = titulo.toLowerCase();
  if (/\bpair\b|\b(2|two)\s*[- ]?(pack|pack)\b|\bset of 2\b/.test(t)) return true;
  if (/\beach\b|\bsingle\b|\b1\s*[- ]?pack\b|\bmonitor,?\s*single\b/.test(t)) return false;
  return null;
}

async function buscarAsin(termino) {
  const url = 'https://www.amazon.com/s?k=' + encodeURIComponent(termino).replace(/%20/g, '+');
  const html = await (await fetch(url, { headers: H })).text();
  // bloques de producto con ASIN y precio
  const bloques = html.split('data-asin="').slice(1);
  const vistos = new Set();
  for (const b of bloques) {
    const asin = b.slice(0, 10);
    if (!/^B0[A-Z0-9]{8}$/.test(asin) || vistos.has(asin)) continue;
    vistos.add(asin);
    const trozo = b.slice(0, 6000);
    const p = precioDe(trozo);
    const t = (trozo.match(/class="[^"]*a-text-normal[^"]*"[^>]*>\s*([\s\S]{0,140}?)</) || [])[1] || '';
    if (p) return { asin, precio: p, tituloBusqueda: t.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() };
  }
  return null;
}

(async () => {
  const ip = await (await fetch('https://ipinfo.io/json', { headers: { 'User-Agent': 'Mozilla/5.0' } })).json();
  console.log('IP de scrapeo: ' + ip.ip + ' (' + ip.country + ', ' + ip.city + ')\n');
  console.log('PRODUCTO                     PRECIO      PAR?   ASIN / TITULO');
  console.log('-'.repeat(100));

  const salida = [];
  for (const o of objetivos) {
    let asin = o.asin, precio = null, titulo = '';
    try {
      if (!asin) {
        const r = await buscarAsin(o.busqueda);
        if (!r) { console.log(pad(o.nombre, 28) + ' SIN RESULTADO'); continue; }
        asin = r.asin; precio = r.precio;
        console.log('  (buscado "' + o.busqueda + '" -> ' + asin + ')');
        await esperar(2500);
      }
      const html = await (await fetch('https://www.amazon.com/dp/' + asin, { headers: H })).text();
      const p = precioDe(html);
      if (p) precio = p;
      titulo = tituloDe(html);
      const par = esPar(html, titulo);
      const ok = precio && Number(String(precio).replace(/,/g, '')) <= 150;
      console.log(
        (o.nombre + '').padEnd(28) +
        ('$' + precio).padEnd(11) +
        String(par === null ? '?' : par ? 'SI' : 'NO/CADA UNO').padEnd(7) +
        (ok ? 'OK ' : '*** OVER 150 *** ') + asin + ' | ' + titulo.slice(0, 58)
      );
      salida.push({ nombre: o.nombre, asin, precio, par, titulo, ok });
    } catch (e) {
      console.log((o.nombre + '').padEnd(28) + ' ERROR ' + e.message);
    }
    await esperar(2500);
  }

  function pad(s, n) { s = String(s); return s.length >= n ? s.slice(0, n) : s + ' '.repeat(n - s.length); }

  console.log('\n--- RESUMEN ---');
  salida.forEach(s => {
    const v = Number(String(s.precio).replace(/,/g, ''));
    console.log((s.nombre + '').padEnd(26) + '$' + String(s.precio).padEnd(10) + (v <= 150 ? 'BAJO $150' : 'PASA DE $150') + '  par=' + s.par);
  });
  const pasan = salida.filter(s => Number(String(s.precio).replace(/,/g, '')) <= 150).length;
  console.log('\nConfirmados por debajo de $150: ' + pasan + '/' + salida.length);
})();
