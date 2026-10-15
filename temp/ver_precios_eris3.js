const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
// cabeceras de navegador completo: a veces con esto pasa el reto de Cloudflare
const H = ['-A', UA,
  '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  '-H', 'Accept-Language: en-GB,en;q=0.9',
  '-H', 'Accept-Encoding: gzip, deflate, br',
  '--compressed',
  '-H', 'Sec-Fetch-Dest: document', '-H', 'Sec-Fetch-Mode: navigate',
  '-H', 'Sec-Fetch-Site: none', '-H', 'Sec-Fetch-User: ?1',
  '-H', 'Upgrade-Insecure-Requests: 1'];

function probar(etiqueta, url, regex) {
  try {
    const r = execFileSync('curl.exe', ['-s', '-L', '--max-time', '50', '-w', '\n__C__%{http_code}'].concat(H, [url]),
      { windowsHide: true, maxBuffer: 1 << 27 }).toString();
    const c = (r.match(/__C__(\d+)/) || [])[1];
    console.log('\n--- ' + etiqueta + '  [http ' + c + ', ' + r.length + 'b] ---');
    if (c !== '200') { console.log('  no accesible'); return; }
    const v = [...new Set([...r.matchAll(regex)].map(m => m[0]))];
    console.log('  ' + (v.length ? v.slice(0, 10).join(' | ') : '(sin importes)'));
    const ld = [...new Set([...r.matchAll(/"price"\s*:\s*"?([0-9.]+)"?[^}]*?"priceCurrency"\s*:\s*"([A-Z]{3})"/g)].map(m => m[1] + ' ' + m[2]))];
    if (ld.length) console.log('  JSON-LD: ' + ld.slice(0, 6).join(' | '));
  } catch (e) { console.log('\n--- ' + etiqueta + '  ERROR: ' + e.message.slice(0, 60)); }
}

probar('G4M .com (UK)', 'https://www.gear4music.com/Recording-and-Computers/PreSonus-Eris-Studio-5/5S8A', /£\s?[0-9][0-9.,]*/g);
probar('G4M .co.uk', 'https://www.gear4music.co.uk/Recording-and-Computers/PreSonus-Eris-Studio-5/5S8A', /£\s?[0-9][0-9.,]*/g);
probar('Music Store', 'https://www.musicstore.com/en_OE/EUR/PreSonus-Eris-Studio-5/art-REC0016445-000', /€\s?[0-9][0-9.,]*/g);
probar('Amazon', 'https://www.amazon.com/dp/B0C88X4VB4', /\$\s?[0-9][0-9.,]*/g);
probar('Andertons', 'https://www.andertons.co.uk/presonus-eris-studio-5-in-black/', /£\s?[0-9][0-9.,]*/g);
