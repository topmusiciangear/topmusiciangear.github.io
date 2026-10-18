const H = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Upgrade-Insecure-Requests': '1'
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
const tituloDe = html => ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '').replace(/\s+/g, ' ').replace(/^Amazon\.com:\s*/, '').trim();

async function buscar(termino, debeContener, debeExcluir) {
  const url = 'https://www.amazon.com/s?k=' + encodeURIComponent(termino).replace(/%20/g, '+');
  const html = await (await fetch(url, { headers: H })).text();
  const bloques = html.split('data-asin="').slice(1);
  const vistos = new Set(), found = [];
  for (const b of bloques) {
    const asin = b.slice(0, 10);
    if (!/^B0[A-Z0-9]{8}$/.test(asin) || vistos.has(asin)) continue;
    vistos.add(asin);
    const trozo = b.slice(0, 7000);
    const t = ((trozo.match(/class="[^"]*a-text-normal[^"]*"[^>]*>\s*([\s\S]{0,160}?)</) || [])[1] || '').replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
    if (!t) continue;
    const ok = debeContener.every(r => r.test(t)) && (debeExcluir || []).every(r => !r.test(t));
    const p = precioDe(trozo);
    if (ok && p) found.push({ asin, precio: p, titulo: t });
    if (found.length >= 3) break;
  }
  return found;
}

const casos = [
  { nombre: 'Mackie CR3.5BT', q: ['Mackie CR3.5BT'],
    cont: [/CR3\.5BT/i, /Mackie/i], exc: [/replacement|cord|cover|case|stand\b/i] },
  { nombre: 'JBL 104-BT', q: ['JBL 104-BT reference monitors', 'JBL One 104BT'],
    cont: [/104[-\s]?BT/i, /JBL/i], exc: [/soundbar|subwoofer|replacement|cord|cover|stand\b/i] },
  { nombre: 'Behringer Media 40USB', q: ['Behringer Media 40USB monitor speakers', 'Behringer STUDIO 50USB'],
    cont: [/Behringer/i, /40USB|50USB/i], exc: [/replacement|cord|cover|case/i] }
];

(async () => {
  for (const c of casos) {
    console.log('\n=== ' + c.nombre + ' ===');
    let ok = false;
    for (const q of c.q) {
      const res = await buscar(q, c.cont, c.exc);
      res.forEach(r => {
        const v = Number(String(r.precio).replace(/,/g, ''));
        const par = /\bpair\b|\bset of 2\b|\b2[- ]?pack\b|\(2\)/i.test(r.titulo) ? 'SI' : (/\beach\b|\bsingle\b/i.test(r.titulo) ? 'NO' : '?');
        console.log('  $' + r.precio.padEnd(9) + (v <= 150 ? 'OK   ' : 'OVER ') + c.nombre.padEnd(22) + par.padEnd(3) + r.asin + ' | ' + r.titulo.slice(0, 62));
        if (v <= 150) ok = true;
      });
      await esperar(2500);
      if (ok) break;
    }
    if (!ok) console.log('  -> NINGUN resultado valido por debajo de $150');
  }
})();
