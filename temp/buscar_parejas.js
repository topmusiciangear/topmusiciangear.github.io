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

async function buscar(termino) {
  const url = 'https://www.amazon.com/s?k=' + encodeURIComponent(termino).replace(/%20/g, '+');
  const r = await fetch(url, { headers: H });
  const html = await r.text();
  const info = { q: termino, status: r.status, bytes: html.length, items: [] };
  const bloques = html.split('data-asin="').slice(1);
  const vistos = new Set();
  for (const b of bloques) {
    let asin = b.slice(0, 10);
    if (!/^B0[A-Z0-9]{8}$/.test(asin) || vistos.has(asin)) continue;
    vistos.add(asin);
    const trozo = b.slice(0, 8000);
    let t = ((trozo.match(/a-text-normal[^>]*>\s*([\s\S]{0,170}?)</) || [])[1] || '')
      .replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
    let p = precioDe(trozo);
    if (!t) continue;
    info.items.push({ asin, precio: p, titulo: t });
  }
  return info;
}

(async () => {
  const ip = await (await fetch('https://ipinfo.io/json', { headers: { 'User-Agent': 'Mozilla/5.0' } })).json();
  console.log('IP: ' + ip.ip + ' (' + ip.country + ')');
  console.log('Buscando pares de monitores entre $80 y $150...\n');

  const consultas = [
    'studio monitors pair',
    'budget studio monitors',
    'powered studio monitor speakers pair bluetooth',
    '4 inch studio monitor pair'
  ];

  const candidatos = new Map();

  for (const q of consultas) {
    const r = await buscar(q);
    console.log('[' + q + '] status=' + r.status + ' bytes=' + r.bytes + ' items=' + r.items.length);
    if (r.bytes < 20000) console.log('   (Amazon esta limitando esta IP)');
    for (const it of r.items) {
      if (!it.precio) continue;
      const v = Number(String(it.precio).replace(/,/g, ''));
      const esPar = /\bpair\b|sold as pair|\bset of 2\b|\(pair\)|\b2[- ]?pack\b/i.test(it.titulo);
      const esUno = /\beach\b|\bsingle\b|\bmonitor speaker only\b/i.test(it.titulo);
      const yaEsta = candidatos.has(it.asin);
      if (v >= 79 && v <= 150 && (esPar || (!esUno && !yaEsta))) {
        candidatos.set(it.asin, { asin: it.asin, precio: v, titulo: it.titulo, par: esPar });
      }
    }
    await pausa(6000);
  }

  const lista = [...candidatos.values()].sort((a, b) => a.precio - b.precio);
  console.log('\n=== CANDIDATOS $79-$150 (se marca PAR si el titulo lo dice) ===\n');
  lista.forEach(c => {
    console.log('  $' + String(c.precio).padEnd(8) + (c.par ? 'PAR ' : '?   ') + c.asin + ' | ' + c.titulo.slice(0, 92));
  });
  console.log('\ntotal candidatos: ' + lista.length + ' | marcados como par: ' + lista.filter(c => c.par).length);
})();
