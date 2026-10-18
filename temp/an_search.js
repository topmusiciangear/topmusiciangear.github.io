const H = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept-Language': 'en-GB,en;q=0.9'
};

const buscar = [
  ['Eris 3.5 Gen 2', 'Eris+3.5'],
  ['Mackie CR3-X', 'CR3-X'],
  ['Edifier MR4', 'MR4'],
  ['M-Audio BX3', 'BX3'],
  ['JBL 104-BT', '104-BT'],
  ['Alesis Elevate 4', 'Elevate+4']
];

for (const [nombre, q] of buscar) {
  try {
    const url = 'https://www.andertons.co.uk/search.php?search_query=' + q;
    const r = await fetch(url, { headers: H, redirect: 'follow' });
    const html = await r.text();
    // enlaces de producto dentro de los resultados
    const enlaces = [...new Set([...html.matchAll(/<a[^>]+href="(\/[a-z0-9\-]+\/[a-z0-9\-]+\/?)"[^>]*>([^<]{3,70})</gi)]
      .map(m => m[1] + ' :: ' + m[2].replace(/\s+/g, ' ').trim()))];
    const relevantes = enlaces.filter(e => new RegExp(q.split('+')[0], 'i').test(e)).slice(0, 3);
    console.log('=== ' + nombre + ' (Andertons) -> ' + r.status + ' | resultados: ' + enlaces.length);
    relevantes.forEach(e => console.log('    ' + e));
    if (!relevantes.length && enlaces.length) enlaces.slice(0, 3).forEach(e => console.log('    (otro) ' + e));
  } catch (e) {
    console.log(nombre + ' ERROR ' + e.message);
  }
}